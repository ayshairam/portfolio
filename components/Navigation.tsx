"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { cn, NAV_ITEMS } from "@/lib/utils";

/** Minimal header: name left, links right; full-screen red menu on mobile. */
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = NAV_ITEMS.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-[background-color,backdrop-filter] duration-500",
        scrolled && !open ? "bg-ink/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="font-body text-[0.72rem] font-medium uppercase tracking-[0.12em] text-paper">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "link-line font-body text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-colors",
                  active === item.href ? "text-red" : "text-paper/80 hover:text-paper",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {profile.email ? (
          <a href={`mailto:${profile.email}`} className="link-line hidden font-body text-[0.72rem] text-paper/80 hover:text-paper xl:inline">
            {profile.email}
          </a>
        ) : (
          <span className="hidden xl:inline" />
        )}

        <button
          type="button"
          className="relative z-[95] -mr-2 p-2 text-paper lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="red-band on-red fixed inset-0 z-[91] flex flex-col justify-between px-[var(--pad-x)] pb-10 pt-24 lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="relative z-10 flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-bebas text-[clamp(3rem,15vw,6rem)] leading-[0.95] text-paper"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="relative z-10 flex flex-col gap-2 font-body text-sm text-paper">
              <a href={profile.links.linkedin.href} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={profile.links.github.href} target="_blank" rel="noopener noreferrer">GitHub</a>
              {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
