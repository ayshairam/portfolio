"use client";

import { useEffect } from "react";
import { getGsap, MOTION_OK } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

/**
 * One place for every scroll-driven effect. Sections opt in with data
 * attributes, so components stay declarative:
 *   data-reveal="chars|words|clip|fade|stagger"  data-parallax="0.15"
 *   data-draw (SVG paths)  data-grow (SVG bars)  data-band (red bands)
 */
export function ScrollFX() {
  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    const off = onReady(() => {
      mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

        q("[data-reveal='chars'], [data-reveal='words']").forEach((el) => {
          if (el.closest("[data-hero]")) return;
          const units = el.querySelectorAll(".split-unit");
          gsap.fromTo(
            units,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 1.05,
              ease: "expo.out",
              stagger: el.dataset.reveal === "chars" ? 0.028 : 0.07,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        q("[data-reveal='clip']").forEach((el) => {
          const inner = el.querySelector("[data-reveal-inner]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } });
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" });
          if (inner) tl.fromTo(inner, { scale: 1.28 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0.1);
        });

        q("[data-reveal='fade']").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
          );
        });

        q("[data-reveal='stagger']").forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll("[data-stagger-item]"),
            { autoAlpha: 0, x: -14 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        q("[data-parallax]").forEach((el) => {
          const amount = parseFloat(el.dataset.parallax ?? "0.15");
          gsap.fromTo(
            el,
            { yPercent: -amount * 50 },
            {
              yPercent: amount * 50,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        q<SVGPathElement>("[data-draw]").forEach((path) => {
          const len = path.getTotalLength();
          gsap.fromTo(
            path,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 2.4,
              ease: "power2.inOut",
              scrollTrigger: { trigger: path.ownerSVGElement ?? path, start: "top 80%", once: true },
            },
          );
        });

        q<SVGElement>("[data-grow]").forEach((bar, i) => {
          gsap.fromTo(
            bar,
            { scaleX: 0, transformOrigin: "0% 50%" },
            {
              scaleX: 1,
              duration: 1.2,
              delay: i * 0.05,
              ease: "expo.out",
              scrollTrigger: { trigger: bar.ownerSVGElement ?? bar, start: "top 80%", once: true },
            },
          );
        });

        q("[data-band]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 32% 0% 32%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: 0.6 },
            },
          );
        });
      });

      // fonts/images can shift layout after load
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    return () => {
      off();
      mm?.revert();
    };
  }, []);

  return null;
}
