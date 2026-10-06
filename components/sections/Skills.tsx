import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { skills, skillsIntro } from "@/data/skills";

/**
 * Reference: script kicker over a light heading, paragraph left, red brush
 * circle right. Skills themselves are set as big condensed type, grouped.
 */
export function Skills({ image }: { image: string | null }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section overflow-hidden">
      <div className="wrap grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionTitle id="skills-title" kicker="technical" lead="Skills" />
          <p className="t-body mt-8" data-reveal="fade">
            {skillsIntro}
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-[min(80vw,26rem)] md:col-span-5 md:w-full md:max-w-[30rem]" aria-hidden="true">
          <div className="brush red-band absolute inset-[4%] rounded-full" data-parallax="0.12" />
          {image ? (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <Image src={image} alt="" fill sizes="(min-width: 768px) 30vw, 80vw" className="object-cover object-top" />
            </div>
          ) : (
            <p className="absolute inset-0 flex items-center justify-center font-bebas text-[clamp(5rem,13vw,11rem)] leading-none text-ink">
              AI/ML
            </p>
          )}
        </div>
      </div>

      <div className="wrap mt-[clamp(4rem,8vw,7rem)]">
        {skills.map((group) => (
          <div key={group.name} className="grid gap-4 border-t border-white/12 py-8 md:grid-cols-12 md:gap-8 md:py-10">
            <h3 className="font-title text-[clamp(1.1rem,1.6vw,1.5rem)] uppercase tracking-[0.06em] text-red md:col-span-3 md:pt-2">{group.name}</h3>
            <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1 md:col-span-9" data-reveal="stagger">
              {group.items.map((item, i) => (
                <li key={item} data-stagger-item className="flex items-baseline gap-5">
                  <span className="font-bebas text-[clamp(2rem,4.6vw,4.4rem)] leading-[1] text-paper transition-colors duration-300 hover:text-red">
                    {item}
                  </span>
                  {i < group.items.length - 1 && (
                    <span aria-hidden="true" className="font-bebas text-[clamp(1.4rem,3vw,2.6rem)] text-red-deep">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
