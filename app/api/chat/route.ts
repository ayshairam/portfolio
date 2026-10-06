import { buildKnowledge, SYSTEM_PROMPT } from "@/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };
type Provider =
  | { kind: "openai-compatible"; baseUrl: string; apiKey: string; model: string; name: string }
  | { kind: "ollama"; baseUrl: string; model: string; name: string };

const MAX_MESSAGES = 10;
const MAX_CHARS = 600;
const WINDOW_MS = 60_000;
const MAX_REQ_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

/**
 * Picks the AI provider from environment variables (server-side only).
 *  1. AI_API_KEY (+ optional AI_BASE_URL, AI_MODEL) — any OpenAI-compatible API.
 *     Defaults to Groq's free tier.
 *  2. OPENAI_API_KEY — OpenAI (paid).
 *  3. OLLAMA_BASE_URL — local Ollama (development only).
 */
function provider(): Provider | null {
  const env = process.env;
  if (env.AI_API_KEY) {
    return {
      kind: "openai-compatible",
      name: "custom",
      apiKey: env.AI_API_KEY,
      baseUrl: (env.AI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, ""),
      model: env.AI_MODEL || "openai/gpt-oss-20b",
    };
  }
  if (env.OPENAI_API_KEY) {
    return {
      kind: "openai-compatible",
      name: "openai",
      apiKey: env.OPENAI_API_KEY,
      baseUrl: "https://api.openai.com/v1",
      model: env.OPENAI_MODEL || "gpt-4o-mini",
    };
  }
  if (env.OLLAMA_BASE_URL) {
    return { kind: "ollama", name: "ollama", baseUrl: env.OLLAMA_BASE_URL.replace(/\/$/, ""), model: env.OLLAMA_MODEL || "llama3" };
  }
  return null;
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQ_PER_WINDOW;
}

function sanitize(body: unknown): Msg[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const raw = (body as { messages: unknown[] }).messages.slice(-MAX_MESSAGES);
  const out: Msg[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    out.push({ role, content: content.slice(0, MAX_CHARS) });
  }
  return out.length && out[out.length - 1].role === "user" ? out : null;
}

/** Lets the client show an "unavailable" state without exposing any config. */
export async function GET() {
  return Response.json({ available: provider() !== null });
}

export async function POST(req: Request) {
  const p = provider();
  if (!p) return Response.json({ error: "unavailable" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let messages: Msg[] | null = null;
  try {
    messages = sanitize(await req.json());
  } catch {
    /* fall through */
  }
  if (!messages) return Response.json({ error: "bad_request" }, { status: 400 });

  const chat = [{ role: "system", content: SYSTEM_PROMPT + buildKnowledge() }, ...messages];

  let upstream: Response;
  try {
    upstream =
      p.kind === "ollama"
        ? await fetch(`${p.baseUrl}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: p.model, messages: chat, stream: true, options: { temperature: 0.2 } }),
            signal: AbortSignal.timeout(60_000),
          })
        : await fetch(`${p.baseUrl}/chat/completions`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${p.apiKey}` },
            body: JSON.stringify({ model: p.model, messages: chat, temperature: 0.2, max_tokens: 600, stream: true }),
            signal: AbortSignal.timeout(30_000),
          });
  } catch (err) {
    console.error("[chat] network", err instanceof Error ? err.message : err);
    return Response.json({ error: "upstream" }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error(`[chat] ${p.name} ${upstream.status}`, detail.slice(0, 300));
    const status = upstream.status === 429 ? 429 : 502;
    return Response.json({ error: status === 429 ? "rate_limited" : "upstream" }, { status });
  }

  // Re-stream only the answer text (plain UTF-8 chunks) to the browser.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const raw of lines) {
            const line = raw.trim();
            if (!line) continue;
            let text = "";
            if (p.kind === "ollama") {
              try {
                text = (JSON.parse(line) as { message?: { content?: string } }).message?.content ?? "";
              } catch {
                /* partial line */
              }
            } else if (line.startsWith("data:")) {
              const data = line.slice(5).trim();
              if (data === "[DONE]") continue;
              try {
                const json = JSON.parse(data) as { choices?: { delta?: { content?: string | null } }[] };
                text = json.choices?.[0]?.delta?.content ?? "";
              } catch {
                /* ignore keep-alives / partial data */
              }
            }
            if (text) controller.enqueue(encoder.encode(text));
          }
        }
      } catch (err) {
        console.error("[chat] stream", err instanceof Error ? err.message : err);
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
