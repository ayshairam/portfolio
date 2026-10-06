import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="wrap flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-paper">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-bebas text-xl tracking-[0.12em] text-grey">
          AI Engineer <span className="text-red">/</span> Software Developer <span className="text-red">/</span> Builder
        </p>
        <a href="#home" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper/80 hover:text-red">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
