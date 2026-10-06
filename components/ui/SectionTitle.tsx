import { SplitText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  /** White part of the title. */
  lead: string;
  /** Red part of the title (the reference's two-tone headings). */
  accent?: string;
  /** Small red italic word above, like the reference's "personal". */
  kicker?: string;
  className?: string;
  as?: "h2" | "h3";
  stacked?: boolean;
  font?: "title" | "bold";
};

export function SectionTitle({ id, lead, accent, kicker, className, as: Tag = "h2", stacked, font = "title" }: Props) {
  const base = font === "bold" ? "font-body font-bold uppercase leading-[0.95] text-[clamp(2.4rem,6vw,6rem)] tracking-[-0.01em]" : "t-section";
  return (
    <Tag id={id} className={cn(base, className)} data-reveal="chars">
      {kicker && (
        <span className="t-script mb-1 block normal-case" aria-hidden="true">
          {kicker}
        </span>
      )}
      <SplitText text={lead} />
      {accent && (
        <>
          {stacked ? <br /> : " "}
          <SplitText text={accent} className="text-red" />
        </>
      )}
    </Tag>
  );
}
