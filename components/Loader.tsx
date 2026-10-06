"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { markReady } from "@/lib/ready";
import { profile } from "@/data/profile";

const DURATION = 1500; // ms — short on purpose
const KEY = "aysha-loader-seen";

/** Cinematic intro: name, role, a red progress line, then a red/black wipe. */
export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked — just play it */
    }
    const total = reduce || seen ? 350 : DURATION;
    document.body.classList.add("is-locked");

    let raf = 0;
    let timer = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else timer = window.setTimeout(() => {
        markReady();
        setVisible(false);
      }, reduce || seen ? 0 : 480);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.body.classList.remove("is-locked");
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.classList.remove("is-locked");
      }}
    >
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${profile.name}'s portfolio`}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            aria-hidden="true"
            className="red-band absolute inset-x-0 bottom-0"
            initial={{ height: "0%" }}
            animate={{ height: progress >= 100 ? "100%" : `${progress * 0.04}%` }}
            transition={{ duration: progress >= 100 ? 0.5 : 0.2, ease: [0.76, 0, 0.24, 1] }}
          />
          <div className="relative text-center">
            <p className="overflow-hidden">
              <motion.span
                className="t-portfolio block !text-[clamp(2.6rem,10vw,9rem)] !tracking-[0.18em]"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {profile.name}
              </motion.span>
            </p>
            <p className="mt-4 overflow-hidden">
              <motion.span
                className="block font-bebas text-[clamp(1.2rem,2.4vw,2rem)] tracking-[0.35em] text-paper"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {profile.roles[0]}
              </motion.span>
            </p>
          </div>
          <div className="absolute bottom-[12vh] left-1/2 w-[min(320px,70vw)] -translate-x-1/2">
            <div className="h-px w-full bg-white/15">
              <div className="h-px bg-red shadow-[0_0_12px_#E00000]" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-right font-body text-xs tabular-nums text-grey">{progress}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
