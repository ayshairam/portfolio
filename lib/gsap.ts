"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Media query used everywhere so reduced-motion users get static layouts. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
