import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { experience } from "@/data/experience";

/**
 * Reference: offset frames with white L-lines on the left, bold WORK /
 * EXPERIENCE with uppercase copy on the right. Here the frames carry the
 * AML monitoring flow, step by step.
 */
export function Experience() {
  const featured = experience.find((e) => e.featured);
  const others = experience.filter((e) => !e.featured);

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-8">
        {featured?.flow && (
          <figure className="md:col-span-6 lg:col-span-5" aria-label="Transaction monitoring flow">
            <ol className="relative space-y-4" data-reveal="stagger">
              {featured.flow.map((step, i) => (
                <li
                  key={step}
                  data-stagger-item
                  className="l-frame relative w-[72%] bg-surface px-5 py-4 md:w-[78%] md:px-6 md:py-5"
                  style={{ marginLeft: `${i * 5.5}%` }}
                >
                  <span className="font-body text-[0.65rem] font-medium tracking-[0.2em] text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-bebas text-[clamp(1.8rem,3.4vw,3.2rem)] leading-none text-paper">{step}</p>
                  {i < featured.flow!.length - 1 && (
                    <span aria-hidden="true" className="absolute -bottom-4 right-8 h-4 w-px bg-red" />
                  )}
                </li>
              ))}
            </ol>
            <figcaption className="mt-8 text-xs uppercase tracking-[0.14em] text-grey">
              Every transaction, from creation to investigation
            </figcaption>
          </figure>
        )}

        <div className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <SectionTitle id="experience-title" lead="Work" accent="Experience" stacked font="bold" />
          {featured && (
            <article className="mt-10">
              <h3 className="font-bebas text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.95] text-paper" data-reveal="fade">
                {featured.company}
              </h3>
              <p className="mt-2 flex flex-wrap gap-x-4 font-title text-sm uppercase tracking-[0.06em] text-red" data-reveal="fade">
                <span>{featured.role}</span>
                <span className="text-grey">{featured.period}</span>
              </p>
              <p className="t-caps mt-8" data-reveal="fade">
                {featured.intro}
              </p>
              <ul className="mt-6 space-y-4" data-reveal="stagger">
                {featured.points.map((p) => (
                  <li key={p} data-stagger-item className="t-caps flex gap-4 text-paper/85">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-red" />
                    {p}
                  </li>
                ))}
              </ul>
              {featured.repo && (
                <a href={featured.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-10 text-paper">
                  View the code <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(opens GitHub in a new tab)</span>
                </a>
              )}
            </article>
          )}

          {others.map((e) => (
            <article key={e.company} className="mt-14 border-t border-white/12 pt-8" data-reveal="fade">
              <h3 className="font-bebas text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none text-paper">{e.company}</h3>
              <p className="mt-2 flex flex-wrap gap-x-4 font-title text-xs uppercase tracking-[0.06em] text-red">
                <span>{e.role}</span>
                <span className="text-grey">{e.period}</span>
              </p>
              <p className="t-caps mt-4 text-paper/75">{[e.intro, ...e.points].join(" ")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
