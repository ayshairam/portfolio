import "server-only";
import fs from "node:fs";
import path from "node:path";
import { projects } from "@/data/projects";
import type { AssetMap } from "@/types";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** True when the file exists (and isn't empty) under /public. */
export function exists(publicPath: string): boolean {
  try {
    const p = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
    return fs.statSync(p).size > 0;
  } catch {
    return false;
  }
}

/** Returns the first candidate that exists in /public, or null. */
function first(...candidates: string[]): string | null {
  return candidates.find(exists) ?? null;
}

const variants = (base: string) => [".png", ".webp", ".jpg", ".jpeg"].map((ext) => base + ext);

/**
 * Checks which optional media exist so components never request a missing
 * file (no 404s, no crashes). Runs at build time for the static page — after
 * adding assets, restart `npm run dev` or rebuild.
 */
export function getAssets(): AssetMap {
  const heroCutout = first("/images/aysha-hero.png", "/images/aysha-hero.webp");
  const hero = heroCutout ?? first(...variants("/images/aysha-hero"));

  const projectImages: AssetMap["projectImages"] = {};
  const projectVideos: AssetMap["projectVideos"] = {};
  for (const p of projects) {
    const base = p.image.replace(/\.(jpe?g|png|webp)$/i, "");
    projectImages[p.slug] = first(p.image, ...variants(base));
    projectVideos[p.slug] = p.video && exists(p.video) ? p.video : null;
  }

  return {
    heroImage: hero,
    heroIsCutout: Boolean(heroCutout),
    aboutImage: first(...variants("/images/aysha-about")),
    skillsImage: first(...variants("/images/aysha-skills")),
    educationImage: first(...variants("/images/education")),
    contactImage: first(...variants("/images/aysha-contact")),
    projectImages,
    projectVideos,
    voiceIntro: first("/audio/aysha-intro.mp3", "/audio/aysha-intro.m4a", "/audio/aysha-intro.wav"),
    resume: first("/resume/Aysha-Iram-Resume.pdf"),
  };
}

/** Keeps only the photos whose files are actually present. */
export function presentPhotos<T extends { src: string }>(photos: T[] | undefined): T[] {
  return (photos ?? []).filter((p) => exists(p.src));
}
