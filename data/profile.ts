import type { Profile } from "@/types";

/**
 * Single source of truth for identity + contact details.
 * Everything here is also fed to the portfolio chatbot, so only put
 * verified information in this file.
 */
export const profile: Profile = {
  name: "Aysha Iram",
  firstName: "Aysha",
  lastName: "Iram",
  roles: ["AI Engineer", "Software Developer", "AI/ML Builder"],
  tagline:
    "Machine learning across computer vision, NLP and risk modelling — taken from experiment to working system.",
  location: "Bengaluru, Karnataka",
  // Taken from Aysha's resume. Set to "" to hide email everywhere.
  email: "ayshairam29@gmail.com",
  about:
    "I am Aysha Iram, an Artificial Intelligence & Data Science engineer focused on building intelligent systems, AI applications and software products.",
  aboutExtended:
    "My work sits where models meet real systems: fine-tuning and comparing vision models with attention-map interpretability, building dense and sparse retrieval pipelines for grounded question answering, and designing transaction-risk models that explain why every alert was raised. Python is my primary language; I also work in Java, C and JavaScript.",
  links: {
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aysha-iram-80785a335/",
      handle: "in/aysha-iram",
    },
    github: {
      label: "GitHub",
      href: "https://github.com/ayshairam",
      handle: "github.com/ayshairam",
    },
  },
  // Change to your production domain after deploying (used for SEO + sitemap).
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aysha-iram.vercel.app",
  voiceIntroTitle: "Hey, this is Aysha",
};
