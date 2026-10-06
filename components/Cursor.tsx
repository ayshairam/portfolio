"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

/** Dot + ring. The ring grows over anything clickable. Desktop only. */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
      setHover(Boolean((e.target as Element | null)?.closest?.(INTERACTIVE)));
    };
    const leave = () => setShown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150]" style={{ opacity: shown ? 1 : 0 }}>
      <motion.div className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper" style={{ x, y }} />
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-red"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hover ? 68 : 34,
          height: hover ? 68 : 34,
          backgroundColor: hover ? "rgba(224,0,0,0.18)" : "rgba(224,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
