"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { education } from "@/data/experience";
import { profile } from "@/data/profile";
import { getGsap, MOTION_OK } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { cn } from "@/lib/utils";

type Props = { image: string | null; isCutout: boolean };

/**
 * Reference composition: tracked red PORTFOLIO, a red gradient band across
 * the frame, the portrait standing in front of both, the role in huge white
 * condensed type underneath.
 */
export function Hero({ image, isCutout }: Props) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    let off = () => {};

    mm.add(MOTION_OK, () => {
      const word = el.querySelectorAll("[data-h='word'] .split-unit");
      const band = el.querySelector("[data-h='band']");
      const portrait = el.querySelector("[data-h='portrait']");
      const role = el.querySelectorAll("[data-h='role'] .split-unit");
      const fades = el.querySelectorAll("[data-h='fade']");

      gsap.set(word, { yPercent: 115 });
      gsap.set(band, { clipPath: "inset(0% 50% 0% 50%)" });
      gsap.set(portrait, { autoAlpha: 0, y: 80, scale: 1.04 });
      gsap.set(role, { yPercent: 115 });
      gsap.set(fades, { autoAlpha: 0, y: 20 });

      off = onReady(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.25 });
        tl.to(band, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
          .to(word, { yPercent: 0, duration: 1.2, stagger: 0.045 }, 0.35)
          .to(portrait, { autoAlpha: 1, y: 0, scale: 1, duration: 1.6 }, 0.6)
          .to(role, { yPercent: 0, duration: 1.1, stagger: 0.03 }, 0.9)
          .to(fades, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 1.2);
      });

      // scroll parallax — portrait drifts up, the word lags behind
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to(el.querySelector("[data-h='word']"), { yPercent: 35, ease: "none", scrollTrigger: st });
      gsap.to(el.querySelector("[data-h='portrait-wrap']"), { yPercent: -10, ease: "none", scrollTrigger: st });

      // subtle depth on mouse move (desktop)
      if (window.matchMedia("(hover: hover)").matches) {
        const pw = el.querySelector("[data-h='portrait-wrap']");
        const wd = el.querySelector("[data-h='word-wrap']");
        const px = gsap.quickTo(pw, "x", { duration: 1.2, ease: "power3.out" });
        const wx = gsap.quickTo(wd, "x", { duration: 1.4, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const n = e.clientX / window.innerWidth - 0.5;
          px(n * 22);
          wx(n * -14);
        };
        el.addEventListener("pointermove", move);
        return () => el.removeEventListener("pointermove", move);
      }
    });

    return () => {
      off();
      mm.revert();
    };
  }, []);

  const word = "Portfolio";
  const role = profile.roles[0];

  return (
    <section id="home" ref={root} data-hero aria-labelledby="hero-title" className="relative overflow-hidden">
      <h1 id="hero-title" className="sr-only">
        {profile.name} — {profile.roles.join(", ")}. Portfolio.
      </h1>

      <div className="relative h-[100svh] min-h-[560px] max-h-[1100px]">
        {/* the red band */}
        <div data-h="band" aria-hidden="true" className="red-band absolute inset-x-0 bottom-[7%] top-[42%] md:top-[40%]" />

        {/* PORTFOLIO */}
        <div data-h="word-wrap" aria-hidden="true" className="absolute inset-x-0 top-[17%] flex justify-center md:top-[13%]">
          <p data-h="word" className="t-portfolio mr-[-0.14em] whitespace-nowrap">
            {[...word].map((ch, i) => (
              <span key={i} className="split-mask">
                <span className="split-unit">{ch}</span>
              </span>
            ))}
          </p>
        </div>

        {/* portrait — stands in front of the word and the band */}
        <div
          data-h="portrait-wrap"
          className="absolute bottom-[7%] left-1/2 z-10 h-[64%] w-[min(78vw,30rem)] -translate-x-1/2 md:h-[80%] md:w-[min(40vw,34rem)] md:-translate-x-[58%]"
        >
          <div data-h="portrait" className="relative h-full w-full">
            {image ? (
              <Image
                src={image}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 78vw"
                className={cn("object-bottom", isCutout ? "object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]" : "feather object-cover")}
              />
            ) : (
              <Placeholder file="/images/aysha-hero.png" label="Hero portrait" variant="portrait" />
            )}
          </div>
        </div>

        {/* small editorial tag on the band, like the reference */}
        <p
          data-h="fade"
          className="absolute bottom-[10%] right-[var(--pad-x)] z-20 hidden max-w-[22rem] text-right font-body text-[0.72rem] uppercase leading-relaxed tracking-[0.12em] text-paper/90 md:block"
        >
          {education[0].degree}
          <br />
          <span className="text-paper/60">{education[0].institution}</span>
        </p>

        {/* scroll cue */}
        <a
          href="#about"
          data-h="fade"
          className="absolute bottom-[1.2%] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-body text-[0.62rem] uppercase tracking-[0.3em] text-grey md:left-[var(--pad-x)] md:translate-x-0"
        >
          <span className="sr-only">Scroll to About</span>
          <span aria-hidden="true">Scroll</span>
          <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-white/15 md:hidden">
            <span className="scroll-line absolute inset-0 bg-red" />
          </span>
        </a>
      </div>

      {/* AI ENGINEER + tagline */}
      <div className="wrap relative pb-[clamp(4rem,9vw,8rem)] pt-[clamp(2rem,4vw,3.5rem)] text-center">
        <p data-h="role" className="t-mega text-paper" aria-hidden="true">
          {role.split(" ").map((w, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {[...w].map((ch, ci) => (
                <span key={ci} className="split-mask">
                  <span className="split-unit">{ch}</span>
                </span>
              ))}
              {wi === 0 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </p>
        <p data-h="fade" className="mx-auto mt-6 max-w-[44ch] font-title text-[clamp(0.85rem,1.1vw,1rem)] uppercase leading-relaxed tracking-[0.08em] text-paper/85">
          {profile.tagline}
        </p>
        <p data-h="fade" className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-bebas text-[clamp(1.4rem,2.6vw,2.4rem)] tracking-[0.06em] text-grey">
          {profile.roles.slice(1).map((r, i) => (
            <span key={r} className="flex items-center gap-4">
              {i > 0 && <span aria-hidden="true" className="text-red">/</span>}
              {r}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
