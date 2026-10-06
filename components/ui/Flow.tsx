import { cn } from "@/lib/utils";

type Props = {
  steps: string[];
  label: string;
  tone?: "black" | "red";
  className?: string;
};

/** Horizontal, wrapping architecture chain: STEP → STEP → STEP. */
export function Flow({ steps, label, tone = "black", className }: Props) {
  const onRed = tone === "red";
  return (
    <figure className={cn("w-full", className)} data-reveal="stagger">
      <figcaption className={cn("t-label mb-5", onRed ? "text-paper/80" : "text-red")}>{label}</figcaption>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-4" aria-label={label}>
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3" data-stagger-item>
            <span
              className={cn(
                "flex items-baseline gap-2 border px-3.5 py-2 font-bebas text-[clamp(1.1rem,1.6vw,1.6rem)] uppercase leading-none tracking-wide",
                onRed ? "border-ink/60 bg-ink text-paper" : "border-white/20 bg-surface text-paper",
              )}
            >
              <span className={cn("font-body text-[0.62rem] font-medium", onRed ? "text-red" : "text-red")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className={cn("text-lg", onRed ? "text-ink" : "text-red")}>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
