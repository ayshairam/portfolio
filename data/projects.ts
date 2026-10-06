import type { MinorProject, Project } from "@/types";

/**
 * Featured case studies. Only verified facts — no invented metrics.
 * Images/videos are optional: missing files fall back to designed placeholders.
 */
export const projects: Project[] = [
  {
    slug: "icu-sentinel",
    title: "ICU",
    titleAccent: "Sentinel",
    summary:
      "Real-time ICU monitoring that checks signal quality before it raises an alert, so a loose probe becomes a device alert, not a false clinical emergency.",
    problem:
      "Bedside monitors raise a constant stream of alarms, and a loose sensor or noisy reading can look exactly like a patient getting worse. Clinicians need to know whether an alert is real, and why it fired.",
    solution:
      "ICU Sentinel ingests bedside vitals through one API and grades every sample's signal quality (plausibility, flatline, noise, staleness, packet gaps) before any rule runs. Physiological rules use only reliable samples; unreliable ones raise a technical alert instead. Every alert carries a \"Why this alert?\" explanation and moves through an audited acknowledge, escalate and resolve workflow in a live ICU command centre.",
    technology: [
      "Python",
      "Django",
      "Django REST Framework",
      "Django Channels + Redis",
      "WebSockets",
      "MySQL / MariaDB",
      "FHIR R4",
      "Chart.js",
      "Docker + nginx",
    ],
    flowLabel: "How an alert is verified",
    flow: ["Bedside vitals", "Ingestion API", "Signal quality", "Alert rules", "Why this alert?", "Acknowledge · escalate · resolve"],
    image: "/projects/icu-sentinel.jpg",
    video: "/videos/icu-sentinel.mp4",
    leadVisual: true,
    galleryTint: true,
    gallery: [
      {
        src: "/projects/icu-sentinel.jpg",
        alt: "ICU Sentinel command centre with simulated patients across two ICUs",
        caption: "ICU command centre, live simulated patients",
      },
      {
        src: "/projects/icu-sentinel-why-alert.jpg",
        alt: "ICU Sentinel alert detail with the Why this alert explanation, escalation steps and history",
        caption: "\"Why this alert?\" with exact values, thresholds and signal quality",
      },
      {
        src: "/projects/icu-sentinel-monitor.jpg",
        alt: "ICU Sentinel patient monitor with live vitals, ten-minute trends, early-warning risk and active alerts",
        caption: "Patient monitor: live vitals, trends, early-warning risk",
      },
    ],
    repo: "https://github.com/ayshairam/icu-sentinel",
    note: "Research prototype, not a medical device. All screens show simulated patients from the built-in simulator. Backed by 228 automated tests; an ML risk model runs in shadow mode only and never drives alerts.",
    tone: "black",
    visual: "signal",
  },
  {
    slug: "educational-atlas",
    title: "Educational",
    titleAccent: "Atlas",
    summary: "Optimised RAG model for knowledge-intensive tasks.",
    problem:
      "General-purpose language models answer textbook questions fluently but without grounding, so there is no way to trace an answer back to the material it should come from.",
    solution:
      "A retrieval-augmented QA pipeline over 4 open textbooks (2,300+ chunks): PDF parsing and chunking, dense retrieval with MiniLM embeddings and FAISS alongside a TF-IDF sparse baseline, and grounded answer generation with a local Llama 3 model.",
    technology: [
      "React",
      "Node.js",
      "MongoDB / PostgreSQL",
      "Ollama",
      "Llama 3",
      "Hugging Face",
      "Sentence-Transformers",
      "FAISS",
    ],
    flowLabel: "Architecture",
    flow: ["User", "Query", "Retrieval", "Vector search", "RAG", "LLM", "Answer"],
    image: "/projects/educational-atlas.jpg",
    repo: "https://github.com/ayshairam/RAG-Model",
    tone: "red",
    visual: "rag",
  },
  {
    slug: "aml",
    title: "Retail Banking",
    titleAccent: "& AML Monitoring",
    summary:
      "Full-stack retail banking with a configurable, explainable anti-money-laundering transaction monitoring engine.",
    context: "Built as Software Developer Trainee, Commonwealth Bank of Australia",
    problem:
      "Customers need to self-serve everyday banking while a compliance team must spot and investigate unusual activity — and understand exactly why each transaction was flagged.",
    solution:
      "Every transaction is evaluated the moment it is created by a configurable rule engine (large transaction, high frequency, structuring) and an explainable 0–100 risk score. Alerts land in a compliance dashboard with a review workflow; admins tune rules at runtime with no deploy.",
    technology: ["React", "Node.js", "Express", "MongoDB", "JWT + role-based access", "Automated testing"],
    flowLabel: "System flow",
    flow: ["Customers", "Accounts", "Transactions", "AML rules", "Risk", "Alerts", "Dashboard"],
    image: "/projects/aml.jpg",
    video: "/videos/aml.mp4",
    leadVisual: true,
    galleryTint: true,
    repo: "https://github.com/ayshairam/Retail-Banking-AML-Transaction-Monitoring",
    note: "Backed by 112 automated unit and integration tests, idempotent transfers with rollback, and full audit logging. Screenshots show the repository's demo seed data.",
    gallery: [
      { src: "/projects/aml.jpg", alt: "AML compliance dashboard with customers, suspicious transactions and open alerts", caption: "Compliance dashboard" },
      { src: "/projects/aml-why-flagged.jpg", alt: "AML alert detail explaining why a transaction was flagged, with a risk score breakdown", caption: "Why it was flagged — rule explanation and risk breakdown" },
      { src: "/projects/aml-rules.jpg", alt: "AML rule management screen with high-frequency, large-transaction and structuring rules", caption: "Rules tuned at runtime, no deploy" },
      { src: "/projects/aml-alerts.jpg", alt: "AML alert queue listing triggered rules, risk and status", caption: "Alert queue for investigation" },
    ],
    tone: "black",
    visual: "aml",
  },
  {
    slug: "trinetra",
    title: "Trinetra",
    summary:
      "AI Bitcoin transaction monitoring for Smart India Hackathon 2026, problem statement SIH26146.",
    context: "Selected by the college to represent DBIT at SIH 2026 · Team Sentinels",
    problem:
      "Bitcoin is pseudonymous and illicit flows hide inside ordinary traffic. The blockchain shows what moved, but not where it entered the network — and investigators need leads they can check, often on air-gapped machines.",
    solution:
      "An offline pipeline links network data (IP, ASN, timing) with blockchain data (wallets, transactions), resolves addresses into entities and ranks them with an XGBoost model into an explainable lead queue with per-alert SHAP reasons. Every feature family is ablation-tested.",
    technology: ["Python", "XGBoost", "SHAP", "DuckDB", "FastAPI"],
    flowLabel: "Investigation pipeline",
    flow: ["Network layer", "Blockchain layer", "Entity resolution", "XGBoost ranking", "SHAP reasons", "Lead queue"],
    image: "/projects/trinetra.jpg",
    mediaAspect: "2000 / 773",
    repo: "https://github.com/ayshairam/Trinetra",
    gallery: [
      { src: "/projects/trinetra-graph.jpg", alt: "Trinetra link analysis graph around a selected entity", caption: "Link analysis around a flagged entity" },
      { src: "/projects/trinetra-metrics.jpg", alt: "Trinetra detection quality panel on the synthetic benchmark", caption: "Detection quality — synthetic benchmark, not real-world accuracy" },
    ],
    note: "Runs on synthetic data from its own generator; detection figures measure recovery of injected patterns, not real-world accuracy. Fully offline and reproducible, with 171 automated tests.",
    tone: "black",
    visual: "chain",
  },
];

/** Smaller, verified projects shown as an index after the case studies. */
export const moreProjects: MinorProject[] = [
  {
    title: "Real-Time Behavioural Surveillance",
    summary:
      "Final-year project in progress: Kafka ingests multi-camera CCTV frames, Spark Structured Streaming runs YOLOv8n and MediaPipe BlazePose per frame, and a 2-layer LSTM classifies 30-frame pose sequences.",
    stack: ["YOLOv8", "MediaPipe", "LSTM", "Spark", "Kafka"],
  },
  {
    title: "Plant Disease — ViT vs CNN",
    summary:
      "Fine-tuned ViT-Base/16 and ResNet18 on the Beans dataset, with CLS-token attention maps to interpret ViT predictions; ResNet18 reached 97.7% test accuracy.",
    stack: ["PyTorch", "Hugging Face"],
    repo: "https://github.com/ayshairam/Vision-Transformers-",
  },
  {
    title: "MindCare",
    summary:
      "SIH 2025 project: a Django-based mental health support platform with AI assistance, knowledge resources, personalised dashboards and peer support.",
    stack: ["Django", "Python"],
    repo: "https://github.com/ayshairam/MindCare",
  },
];
