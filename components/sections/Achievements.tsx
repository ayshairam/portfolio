import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { achievements, certifications } from "@/data/achievements";
import { exists, presentPhotos } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Reference: "THESE ARE / CERTIFICATIONS" centred, an event photograph, then
 * a full-bleed red band carrying the certificates. Here the achievements are
 * a dated, newest-first timeline with their own photographs.
 * Photos are grayscale (to stay in the black/red palette) and turn to colour
 * on hover/focus; each one opens full size.
 */
export function Achievements() {
  const wins = achievements.filter((a) => a.result === "1st place").length;
  const selections = achievements.filter((a) => a.title.includes("Smart India Hackathon")).length;

  return (
    <section id="achievements" aria-labelledby="achievements-title" className="section pb-0">
      <div className="wrap text-center">
        <SectionTitle id="achievements-title" kicker="these are" lead="Achievements" className="flex flex-col items-center" />
        <p className="t-caps mx-auto mt-8 text-center" data-reveal="fade">
          {wins} first places, {selections} Smart India Hackathon selections, and MindCare presented to EY employees.
        </p>
      </div>

      <ol className="wrap mt-[clamp(3rem,7vw,6rem)]">
        {achievements.map((a, i) => {
          const photos = presentPhotos(a.photos);
          const showYear = i === 0 || achievements[i - 1].year !== a.year;
          const [lead, ...rest] = photos;
          const isWin = a.result === "1st place";

          return (
            <li
              key={a.date + a.title}
              className={cn("grid gap-6 border-t py-10 md:grid-cols-12 md:gap-8 md:py-14", showYear ? "border-red/60" : "border-white/12")}
            >
              <div className="md:col-span-3">
                {showYear && (
                  <p className="font-display text-[clamp(4rem,9vw,8.5rem)] font-light leading-[0.82] tracking-[0.04em] text-red" aria-hidden="true">
                    {a.year}
                  </p>
                )}
                <p className={cn("text-xs uppercase tracking-[0.16em] text-grey", showYear && "mt-4")}>
                  <time>{a.date}</time>
                </p>
                <p
                  className={cn(
                    "mt-3 inline-block px-2.5 py-1 font-body text-[0.68rem] font-semibold uppercase tracking-[0.12em]",
                    isWin ? "bg-red text-paper" : "border border-white/30 text-paper/85",
                  )}
                >
                  {a.result}
                </p>
              </div>

              <div className={cn(lead ? "md:col-span-4" : "md:col-span-7")} data-reveal="fade">
                <h3 className="font-bebas text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95] text-paper">{a.title}</h3>
                <p className="mt-3 font-title text-sm uppercase leading-snug tracking-[0.04em] text-red">{a.event}</p>
                {a.place && <p className="mt-1 text-sm text-grey">{a.place}</p>}
                <p className="t-body mt-5 text-[0.95rem]">{a.detail}</p>
              </div>

              {lead && (
                <div className="md:col-span-5">
                  <PhotoLink photo={lead} className="aspect-[3/2]" sizes="(min-width: 768px) 40vw, 92vw" reveal />
                  {rest.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {rest.map((p) => (
                        <PhotoLink key={p.src} photo={p} className="aspect-[4/3]" sizes="(min-width: 768px) 20vw, 46vw" />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="red-band on-red mt-[clamp(3rem,6vw,5rem)] py-[clamp(3.5rem,7vw,6rem)]" data-band>
        <div className="wrap relative z-10">
          <h3 className="font-title text-[clamp(1.6rem,3vw,2.8rem)] uppercase leading-none text-paper">Certifications</h3>
          <p className="mt-3 max-w-[50ch] text-sm text-paper/85">Hover or focus a certificate to see it in colour. Select it to open the original.</p>
          <div className="-mx-[var(--pad-x)] mt-10 overflow-hidden md:mx-0 md:overflow-visible">
          <ul className="rail flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--pad-x)] pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {certifications.map((c) => {
              const img = c.image && exists(c.image) ? c.image : null;
              return (
                <li key={c.title} className="relative w-[78vw] shrink-0 snap-start sm:w-[44vw] md:w-auto">
                  {img ? (
                    <a
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-paper p-2 shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
                    >
                      <span className="relative block aspect-[1.414/1] overflow-hidden bg-paper">
                        <Image
                          src={img}
                          alt={`${c.title} certificate, ${c.issuer}`}
                          fill
                          sizes="(min-width: 768px) 30vw, 78vw"
                          className="object-contain grayscale transition-[filter] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                        />
                      </span>
                      <span className="sr-only">(opens full size in a new tab)</span>
                    </a>
                  ) : (
                    <div className="flex aspect-[1.414/1] flex-col justify-end bg-paper p-5 text-ink">
                      <p className="font-title text-[0.7rem] uppercase tracking-[0.18em] text-red-deep">Certificate</p>
                    </div>
                  )}
                  <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-paper/80">
                    {c.kind}
                    {c.date ? ` · ${c.date}` : ""}
                  </p>
                  <p className="mt-1 font-bebas text-[clamp(1.4rem,2vw,1.9rem)] leading-[1] text-paper">{c.title}</p>
                  <p className="mt-1 text-xs text-paper/80">{c.issuer}</p>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoLink({
  photo,
  className,
  sizes,
  reveal,
}: {
  photo: { src: string; alt: string; position?: string };
  className: string;
  sizes: string;
  reveal?: boolean;
}) {
  return (
    <a
      href={photo.src}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group relative block overflow-hidden bg-surface", className)}
      {...(reveal ? { "data-reveal": "clip" } : {})}
    >
      <span className="absolute inset-0 block" {...(reveal ? { "data-reveal-inner": "" } : {})}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          style={photo.position ? { objectPosition: photo.position } : undefined}
          className="object-cover contrast-[1.08] grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:grayscale-0"
        />
      </span>
      <span className="sr-only">(opens full size in a new tab)</span>
    </a>
  );
}
