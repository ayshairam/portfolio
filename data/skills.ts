import type { SkillGroup } from "@/types";

/** Grouped skills — no ratings, just what Aysha works with. */
export const skills: SkillGroup[] = [
  {
    name: "AI / ML",
    items: [
      "Python", "Machine Learning", "Deep Learning", "RAG", "LLMs", "Hugging Face",
      "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "FAISS", "Ollama",
    ],
  },
  {
    name: "Development",
    items: ["React", "Next.js", "Node.js", "Express", "Django", "FastAPI", "REST APIs", "Java", "C"],
  },
  {
    name: "Data",
    items: ["MongoDB", "PostgreSQL", "SQLite", "SQL", "DuckDB", "Pandas", "NumPy", "Power BI", "Tableau"],
  },
  {
    name: "Tools",
    items: ["Git", "GitHub", "Docker", "VS Code", "Jupyter"],
  },
];

export const skillsIntro =
  "Strong in Python, with hands-on work across computer vision, NLP and risk modelling — and the evaluation habits that go with it: precision, recall and F1, ablation studies and probability calibration.";
