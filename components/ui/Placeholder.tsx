import { cn } from "@/lib/utils";

type Props = {
  /** Path the owner should drop the real file into. */
  file: string;
  label: string;
  className?: string;
  variant?: "portrait" | "window" | "plain";
};

/**
 * Designed stand-in for a missing photo. Never a fake person — just a frame
 * with a quiet note showing exactly where the real file goes.
 */
export function Placeholder({ file, label, className, variant = "plain" }: Props) {
  return (
    <div
      role="img"
      aria-label={`${label} — photo coming soon`}
      className={cn(cn("relative flex h-full w-full items-end overflow-hidden", variant === "portrait" ? "bg-transparent" : "bg-surface"), className)}
    >
      {variant === "window" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.10) 0 34px, transparent 34px 52px), radial-gradient(80% 70% at 30% 20%, rgba(255,255,255,0.18), transparent 70%)",
          }}
        />
      )}
      {variant === "portrait" && (
        <svg aria-hidden="true" viewBox="0 0 300 420" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-0 h-[92%] w-full">
          <path
            d="M150 40c40 0 66 30 66 72 0 30-12 52-26 66 52 14 92 50 104 112l6 130H0l6-130c12-62 52-98 104-112-14-14-26-36-26-66 0-42 26-72 66-72Z"
            fill="rgba(0,0,0,0.55)"
            stroke="rgba(255,255,255,0.22)"
            strokeDasharray="4 6"
          />
        </svg>
      )}
      <div aria-hidden="true" className="absolute inset-3 border border-white/10" />
      <span aria-hidden="true" className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-red" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-red" />
      <p className="relative z-10 m-6 font-body text-[0.7rem] leading-snug tracking-wide text-grey/80">
        <span className="block font-title text-sm uppercase text-paper">{label}</span>
        public{file}
      </p>
    </div>
  );
}
