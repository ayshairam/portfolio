import { achievements, certifications } from "@/data/achievements";
import { education, experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { moreProjects, projects } from "@/data/projects";
import { skills } from "@/data/skills";

/**
 * Serialises the verified portfolio data into plain text for the chatbot.
 * The model is instructed to answer ONLY from this text.
 */
export function buildKnowledge(): string {
  const lines: string[] = [];
  lines.push(`NAME: ${profile.name}`);
  lines.push(`ROLES: ${profile.roles.join(", ")}`);
  lines.push(`LOCATION: ${profile.location}`);
  lines.push(`ABOUT: ${profile.about} ${profile.aboutExtended}`);
  lines.push(`LINKS: LinkedIn ${profile.links.linkedin.href} | GitHub ${profile.links.github.href}`);
  if (profile.email) lines.push(`EMAIL: ${profile.email}`);

  lines.push("\nEDUCATION:");
  for (const e of education)
    lines.push(`- ${e.degree}, ${e.institution} (${e.detail}), ${e.period}${e.score ? `, ${e.score}` : ""}`);

  lines.push("\nEXPERIENCE:");
  for (const x of experience)
    lines.push(`- ${x.role} at ${x.company} (${x.period}). ${x.intro} ${x.points.join(" ")}`);

  lines.push("\nFEATURED PROJECTS:");
  for (const p of projects) {
    lines.push(`- ${[p.title, p.titleAccent].filter(Boolean).join(" ")}: ${p.summary}`);
    if (p.context) lines.push(`  Context: ${p.context}`);
    lines.push(`  Problem: ${p.problem}`);
    lines.push(`  Solution: ${p.solution}`);
    lines.push(`  Technology: ${p.technology.join(", ")}`);
    lines.push(`  ${p.flowLabel}: ${p.flow.join(" -> ")}`);
    if (p.note) lines.push(`  Note: ${p.note}`);
    if (p.repo) lines.push(`  Repository: ${p.repo}`);
  }

  lines.push("\nOTHER PROJECTS:");
  for (const m of moreProjects) lines.push(`- ${m.title}: ${m.summary} (${m.stack.join(", ")})`);

  lines.push("\nSKILLS:");
  for (const g of skills) lines.push(`- ${g.name}: ${g.items.join(", ")}`);

  lines.push("\nACHIEVEMENTS:");
  for (const a of achievements)
    lines.push(`- ${a.date} — ${a.result}: ${a.title} (${a.event}${a.place ? `, ${a.place}` : ""}). ${a.detail}`);

  lines.push("\nCERTIFICATIONS:");
  for (const c of certifications)
    lines.push(`- ${c.title} — ${c.issuer}${c.date ? `, ${c.date}` : ""} (${c.kind})`);

  return lines.join("\n");
}

export const SYSTEM_PROMPT = `You are the portfolio assistant for ${profile.name}. You answer visitors' questions about her projects, skills, education and experience.

Rules:
- Answer ONLY with facts stated in the PORTFOLIO DATA below. Never add outside knowledge about her.
- Never invent or guess grades, salary, employers, achievements, certifications, project statistics, users, business impact or personal details. If the data doesn't say, reply that the portfolio doesn't cover it and suggest contacting her via LinkedIn.
- Refer to her as "Aysha" in the third person. Keep answers short: 2–5 sentences, plain text, no markdown headings.
- For "why hire her" questions, argue only from the listed projects, skills and experience.
- Politely decline unrelated requests (coding help, general trivia, anything off-topic).

PORTFOLIO DATA:
`;
