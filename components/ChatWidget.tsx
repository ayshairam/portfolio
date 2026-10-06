"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { SUGGESTED } from "@/lib/fallback-answers";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };
type Status = "unknown" | "live" | "offline";

const GREETING = `Hi 👋\nI'm ${profile.firstName}'s AI assistant.\n\nAsk me anything about ${profile.firstName}'s projects, skills, education or experience.`;

/**
 * Floating "Ask Aysha's AI". Talks to /api/chat (server-side key only).
 * Without a configured provider it switches to pre-written answers built
 * from the same verified data, and says so.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("unknown");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const inputId = useId();

  useEffect(() => {
    if (!open || status !== "unknown") return;
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d: { available?: boolean }) => setStatus(d.available ? "live" : "offline"))
      .catch(() => setStatus("offline"));
  }, [open, status]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const offlineAnswer = (q: string) => {
    const hit = SUGGESTED.find((s) => s.q.toLowerCase() === q.trim().toLowerCase());
    return hit
      ? hit.a()
      : `The live assistant isn't switched on right now, so I can only answer the suggested questions. You can also reach ${profile.firstName} on LinkedIn.`;
  };

  const ask = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");

    if (status === "offline") {
      setMessages([...next, { role: "assistant", content: offlineAnswer(q) }]);
      return;
    }

    setBusy(true);
    setStreaming(false);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (r.status === 503) {
        setStatus("offline");
        setMessages([...next, { role: "assistant", content: offlineAnswer(q) }]);
        return;
      }

      const isStream = r.ok && r.body && (r.headers.get("content-type") ?? "").startsWith("text/plain");
      if (!isStream) {
        const d = (await r.json().catch(() => ({}))) as { error?: string };
        const msg =
          d.error === "rate_limited"
            ? "That's a lot of questions at once. Wait a minute and try again."
            : "The assistant couldn't answer just now. Try again, or pick a suggested question.";
        setMessages([...next, { role: "assistant", content: msg }]);
        return;
      }

      // Realtime: show the answer as it streams in.
      const reader = r.body!.getReader();
      const decoder = new TextDecoder();
      let text = "";
      setStreaming(true);
      setMessages([...next, { role: "assistant", content: "" }]);
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        const current = text;
        setMessages([...next, { role: "assistant", content: current }]);
      }
      text += decoder.decode();
      setMessages([
        ...next,
        { role: "assistant", content: text.trim() || "The assistant couldn't answer just now. Try again, or pick a suggested question." },
      ]);
    } catch {
      setMessages([...next, { role: "assistant", content: offlineAnswer(q) }]);
    } finally {
      setBusy(false);
      setStreaming(false);
    }
  };

  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.content));
  const suggestions = SUGGESTED.filter((s) => !asked.has(s.q));

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="aysha-chat"
        className={cn(
          "fixed bottom-4 right-4 z-[100] flex items-center gap-2.5 border border-red bg-ink px-4 py-3 font-body text-[0.72rem] font-medium uppercase tracking-[0.12em] text-paper shadow-[0_0_30px_rgba(224,0,0,0.25)] transition-colors hover:bg-red sm:bottom-6 sm:right-6",
          open && "bg-red",
        )}
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red ring-1 ring-paper" />
        </span>
        {open ? "Close" : `Ask ${profile.firstName}'s AI`}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="aysha-chat"
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            className="fixed inset-x-3 bottom-20 top-20 z-[100] flex flex-col border border-white/15 bg-ink sm:inset-x-auto sm:right-6 sm:top-auto sm:h-[min(600px,calc(100svh-8rem))] sm:w-[400px]"
            initial={{ opacity: 0, y: 24, clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, y: 16, clipPath: "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <header className="red-band flex items-center justify-between px-5 py-4">
              <h2 id={titleId} className="relative z-10 font-bebas text-2xl leading-none tracking-wide text-paper">
                Ask {profile.firstName}&apos;s AI
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative z-10 p-1 text-paper"
                aria-label="Close assistant"
              >
                <X size={20} />
              </button>
            </header>

            {status === "offline" && (
              <p className="border-b border-white/10 bg-surface px-5 py-3 text-xs leading-relaxed text-grey" role="status">
                The live assistant isn&apos;t switched on. Suggested questions still get verified answers.
              </p>
            )}

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
              <Bubble role="assistant" text={GREETING} />
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} text={m.content} />
              ))}
              {busy && !streaming && (
                <p className="flex items-center gap-1.5 text-xs text-grey" role="status">
                  <span className="sr-only">Thinking</span>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-red motion-safe:animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </p>
              )}
              {suggestions.length > 0 && !busy && (
                <ul className="flex flex-col items-start gap-2 pt-1" aria-label="Suggested questions">
                  {suggestions.map((s) => (
                    <li key={s.q}>
                      <button
                        type="button"
                        onClick={() => ask(s.q)}
                        className="border border-white/20 px-3 py-1.5 text-left text-xs text-paper transition-colors hover:border-red hover:text-red"
                      >
                        {s.q}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <label htmlFor={inputId} className="sr-only">
                Ask a question about {profile.firstName}
              </label>
              <input
                id={inputId}
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={600}
                placeholder={`Ask about ${profile.firstName}'s work`}
                className="min-w-0 flex-1 bg-surface px-3 py-3 text-sm text-paper placeholder:text-grey/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-red"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="bg-red p-3 text-paper transition-opacity disabled:opacity-40"
                aria-label="Send question"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, text }: { role: Msg["role"]; text: string }) {
  const me = role === "user";
  return (
    <div className={cn("flex", me ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[85%] whitespace-pre-line px-4 py-3 text-sm leading-relaxed",
          me ? "bg-red text-paper" : "bg-surface text-paper/90",
        )}
      >
        <span className="sr-only">{me ? "You: " : "Assistant: "}</span>
        {text || <span className="text-grey">…</span>}
      </p>
    </div>
  );
}
