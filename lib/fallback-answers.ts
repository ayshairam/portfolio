import { achievements } from "@/data/achievements";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

const byslug = (slug: string) => projects.find((p) => p.slug === slug);
const name = (slug: string) => {
  const p = byslug(slug);
  return p ? [p.title, p.titleAccent].filter(Boolean).join(" ") : slug;
};

/**
 * Pre-written answers built from the data files. Used when no AI provider is
 * configured, so the suggested questions still work.
 */
export const SUGGESTED: { q: string; a: () => string }[] = [
  {
    q: "What projects has Aysha built?",
    a: () =>
      `Featured: ${projects.map((p) => name(p.slug)).join(", ")}. Each is a full case study in the Projects section, and more is on GitHub (${profile.links.github.href}).`,
  },
  {
    q: "Tell me about ICU Sentinel.",
    a: () => {
      const p = byslug("icu-sentinel")!;
      return `${p.summary} ${p.solution}`;
    },
  },
  {
    q: "What is Educational Atlas?",
    a: () => {
      const p = byslug("educational-atlas")!;
      return `${p.summary} ${p.solution}`;
    },
  },
  {
    q: "What technologies does Aysha know?",
    a: () => skills.map((g) => `${g.name}: ${g.items.join(", ")}.`).join(" "),
  },
  {
    q: "Tell me about her AML project.",
    a: () => {
      const p = byslug("aml")!;
      return `${p.context}. ${p.solution} ${p.note ?? ""}`.trim();
    },
  },
  {
    q: "Why should I hire Aysha?",
    a: () => {
      const cba = experience.find((e) => e.featured);
      const wins = achievements
        .filter((a) => a.result === "1st place")
        .map((a) => `first place at ${a.event.split(",")[0]} (${a.title})`)
        .join(" and ");
      return `She takes models from experiment to working system — RAG pipelines, vision models with interpretability, and explainable risk scoring. ${cba ? `As ${cba.role} at ${cba.company} she built an AML monitoring system backed by 112 automated tests.` : ""} ${wins ? `She has won ${wins}.` : ""} Her Trinetra work was selected for Smart India Hackathon 2026.`;
    },
  },
];
