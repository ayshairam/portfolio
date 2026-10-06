"use client";

/** Tiny pub/sub so sections can start their intro once the loader leaves. */
const EVENT = "portfolio:ready";

export function markReady() {
  if (typeof window === "undefined") return;
  (window as Window & { __portfolioReady?: boolean }).__portfolioReady = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onReady(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if ((window as Window & { __portfolioReady?: boolean }).__portfolioReady) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
