import { GraduationCap } from "lucide-react";
import Image from "next/image";
import { SplitText } from "@/components/ui/SplitText";
import { education } from "@/data/experience";

/** Reference: red "about" over a huge EDUCATION that overlaps a centred photo. */
export function Education({ image }: { image: string | null }) {
  const [main, ...rest] = education;
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="red-rule mb-[var(--section-y)]" aria-hidden="true" />
      <div className="wrap relative grid items-end gap-10 md:grid-cols-12">
        <div className="relative md:col-span-5 md:col-start-4">
          <div data-reveal="clip" className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
            <div data-reveal-inner className="absolute inset-0">
              {image ? (
                <Image src={image} alt="Graduation and academic photo" fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
              ) : (
                <div role="img" aria-label="Education photo coming soon" className="relative flex h-full w-full items-center justify-center">
                  <GraduationCap aria-hidden="true" className="h-1/3 w-1/3 text-red" strokeWidth={0.7} />
                  <span className="absolute bottom-5 left-5 text-[0.7rem] text-grey/70">public/images/education.jpg</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2
          id="education-title"
          className="t-section pointer-events-none relative z-10 -mt-[0.6em] md:absolute md:bottom-[18%] md:left-[var(--pad-x)] md:mt-0 md:text-[clamp(3.5rem,8vw,8.5rem)]"
          data-reveal="chars"
        >
          <span className="t-script mb-1 block normal-case">academic</span>
          <SplitText text="Education" />
        </h2>

        <div className="md:col-span-4 md:col-start-9 md:pb-4">
          <p className="font-bebas text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95] text-paper" data-reveal="fade">
            {main.degree}
          </p>
          <p className="mt-3 font-title text-lg uppercase tracking-[0.04em] text-red" data-reveal="fade">
            {main.institution}
          </p>
          <dl className="mt-6 space-y-1 text-sm text-grey" data-reveal="fade">
            <div className="flex gap-2"><dt className="sr-only">University</dt><dd>{main.detail}</dd></div>
            <div className="flex gap-2"><dt className="sr-only">Years</dt><dd>{main.period}</dd></div>
            {main.score && <div className="flex gap-2"><dt className="sr-only">Score</dt><dd className="text-paper">{main.score}</dd></div>}
          </dl>
          {rest.map((e) => (
            <div key={e.degree} className="mt-8 border-t border-white/12 pt-5 text-sm" data-reveal="fade">
              <p className="text-paper">{e.degree}</p>
              <p className="text-grey">
                {e.institution}, {e.detail} · {e.period}
                {e.score ? ` · ${e.score}` : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
