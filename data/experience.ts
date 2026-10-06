import type { EducationEntry, ExperienceEntry } from "@/types";

/** Only responsibilities stated in Aysha's resume. No confidential details. */
export const experience: ExperienceEntry[] = [
  {
    company: "Commonwealth Bank",
    role: "Software Developer Trainee",
    period: "Jul 2026 – Jan 2027",
    featured: true,
    intro:
      "Retail banking and anti-money-laundering transaction monitoring — every transaction evaluated the moment it is created, every alert explained.",
    points: [
      "Built a Retail Banking & AML Transaction Monitoring System with a configurable rule engine — large transaction, high frequency and structuring rules.",
      "Explainable 0–100 risk scoring for every flagged transaction.",
      "Backed by 112 automated unit and integration tests, idempotent transfers with rollback, and full audit logging.",
    ],
    flow: ["Transaction", "Rule engine", "Risk analysis", "Alert", "Investigation"],
    repo: "https://github.com/ayshairam/Retail-Banking-AML-Transaction-Monitoring",
  },
  {
    company: "Languify",
    role: "AI with Python Intern",
    period: "Aug 2024 – Sep 2024",
    featured: false,
    intro: "Applied machine learning with Keras, Pandas and Vision Transformers.",
    points: [
      "Built and evaluated applied ML models; wrote preprocessing and experiment scripts and compared results across metrics to verify model quality.",
    ],
  },
];

/** Grades are taken from the resume. Remove `score` to hide them. */
export const education: EducationEntry[] = [
  {
    degree: "B.E. Artificial Intelligence & Data Science",
    institution: "Don Bosco Institute of Technology",
    detail: "Bengaluru · Visvesvaraya Technological University",
    period: "2023 – 2027",
    score: "CGPA 8.5",
  },
  {
    degree: "Class 12 · PCMC",
    institution: "Scholars PU College",
    detail: "Bengaluru",
    period: "2022",
    score: "94.5%",
  },
];
