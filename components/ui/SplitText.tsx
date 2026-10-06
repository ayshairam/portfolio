import { cn } from "@/lib/utils";

type Props = {
  text: string;
  /** "chars" for display headings, "words" for longer lines. */
  by?: "chars" | "words";
  className?: string;
  unitClassName?: string;
};

/**
 * Renders text as masked units that ScrollFX animates upward.
 * Screen readers get the plain text via an sr-only copy.
 */
export function SplitText({ text, by = "chars", className, unitClassName }: Props) {
  const words = text.split(" ");
  return (
    <span className={cn("inline", className)} data-split>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {by === "chars" ? (
            [...word].map((ch, ci) => (
              <span key={ci} className="split-mask">
                <span className={cn("split-unit", unitClassName)}>{ch}</span>
              </span>
            ))
          ) : (
            <span className="split-mask">
              <span className={cn("split-unit", unitClassName)}>{word}</span>
            </span>
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
