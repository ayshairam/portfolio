import { ArrowUpRight } from "lucide-react";
import { ProjectMedia } from "@/components/ProjectMedia";
import { Flow } from "@/components/ui/Flow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SplitText } from "@/components/ui/SplitText";
import { moreProjects, projects } from "@/data/projects";
import { presentPhotos } from "@/lib/assets";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AssetMap, Project } from "@/types";

/** Reference: "RECENT PROJECT", objective/strategy columns, big screenshots. */
export function Projects({ assets }: { assets: AssetMap }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative pt-[var(--section-y)]">
      <div className="red-rule mb-[var(--section-y)]" aria-hidden="true" />
      <div className="wrap flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionTitle id="projects-title" lead="Selected" accent="Projects" stacked />
        <p className="t-caps max-w-[36ch] md:text-right" data-reveal="fade">
          Four case studies, from bedside signals to blockchain investigations.
        </p>
      </div>

      <div className="mt-[clamp(3rem,7vw,6rem)]">
        {projects.map((p, i) => (
          <ProjectCase
            key={p.slug}
            project={p}
            index={i}
            image={p.leadVisual ? null : (assets.projectImages[p.slug] ?? null)}
            video={p.leadVisual ? null : (assets.projectVideos[p.slug] ?? null)}
          />
        ))}
      </div>

      <div className="wrap pb-[var(--section-y)] pt-[clamp(3rem,6vw,5rem)]">
        <h3 className="font-title text-sm uppercase tracking-[0.08em] text-red">Also built</h3>
        <ul className="mt-6">
          {moreProjects.map((m) => (
            <li key={m.title} className="group grid gap-3 border-t border-white/12 py-7 md:grid-cols-12 md:gap-8" data-reveal="fade">
              <p className="font-bebas text-[clamp(1.8rem,3vw,2.8rem)] leading-none text-paper transition-colors group-hover:text-red md:col-span-4">
                {m.title}
              </p>
              <p className="t-body text-sm md:col-span-6">{m.summary}</p>
              <div className="flex flex-wrap items-start gap-x-3 gap-y-1 text-xs uppercase tracking-[0.1em] text-grey md:col-span-2 md:flex-col md:items-end">
                {m.repo ? (
                  <a href={m.repo} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1 text-paper">
                    GitHub <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only">: {m.title} (opens in a new tab)</span>
                  </a>
                ) : (
                  <span>In progress</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCase({ project: p, index, image, video }: { project: Project; index: number; image: string | null; video: string | null }) {
  const onRed = p.tone === "red";
  const flip = index % 2 === 1;
  const fullTitle = [p.title, p.titleAccent].filter(Boolean).join(" ");
  const gallery = presentPhotos(p.gallery);

  return (
    <article
      aria-labelledby={`project-${p.slug}`}
      className={cn("relative py-[clamp(4rem,9vw,8rem)]", onRed && "red-band on-red")}
    >
      <div className="wrap relative z-10">
        <header className={cn("grid gap-6 md:grid-cols-12 md:items-end", flip && "md:text-right")}>
          <h3
            id={`project-${p.slug}`}
            className={cn("t-huge md:col-span-9", flip && "md:col-start-4")}
            data-reveal="chars"
          >
            <span className="sr-only">{fullTitle}</span>
            <span aria-hidden="true">
              <SplitText text={p.title} className="text-paper" />
              {p.titleAccent && (
                <>
                  <br />
                  <SplitText text={p.titleAccent} className={onRed ? "text-ink" : "text-red"} />
                </>
              )}
            </span>
          </h3>
        </header>
        <p className={cn("mt-6 max-w-[48ch] font-title text-[clamp(1.05rem,1.5vw,1.4rem)] leading-snug text-paper", flip && "md:ml-auto md:text-right")} data-reveal="fade">
          {p.summary}
        </p>
        {p.context && (
          <p className={cn("mt-3 text-xs uppercase tracking-[0.12em]", onRed ? "text-paper/75" : "text-grey", flip && "md:text-right")} data-reveal="fade">
            {p.context}
          </p>
        )}

        <div
          data-reveal="clip"
          className={cn(
            "relative mt-[clamp(2rem,4vw,3.5rem)] w-full overflow-hidden",
            p.mediaAspect && image ? "" : "aspect-[16/10] md:aspect-[16/8]",
            onRed ? "bg-ink/10" : "bg-surface",
          )}
          style={p.mediaAspect && image ? { aspectRatio: p.mediaAspect } : undefined}
        >
          <div data-reveal-inner className="absolute inset-0">
            <ProjectMedia project={p} image={image} video={video} alt={`${fullTitle} — project visual`} />
          </div>
        </div>

        {gallery.length > 0 && (
          <ul
            className={cn(
              "mt-4 grid grid-cols-2 gap-3 sm:gap-4",
              gallery.length === 3 && "sm:grid-cols-3",
              gallery.length >= 4 && "lg:grid-cols-4",
            )}
          >
            {gallery.map((g) => (
              <li key={g.src}>
                <a href={g.src} target="_blank" rel="noopener noreferrer" className="group relative block">
                  <span className="relative block aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className={cn(
                        "object-cover object-top transition-[transform,filter] duration-700 group-hover:scale-[1.04]",
                        p.galleryTint &&
                          "brightness-95 contrast-[1.15] grayscale invert group-hover:invert-0 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-focus-visible:invert-0 group-focus-visible:grayscale-0",
                      )}
                    />
                  </span>
                  <span className={cn("mt-2 block text-xs", onRed ? "text-paper/80" : "text-grey")}>{g.caption}</span>
                  <span className="sr-only">(opens full size in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-10 md:grid-cols-3 md:gap-12">
          <Block label="Problem" text={p.problem} onRed={onRed} />
          <Block label="Solution" text={p.solution} onRed={onRed} />
          <div data-reveal="fade">
            <h4 className={cn("t-label", onRed ? "text-ink" : "text-red")}>Technology</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.technology.map((t) => (
                <li key={t} className={cn("border px-2.5 py-1 text-xs", onRed ? "border-ink/40 text-paper" : "border-white/20 text-paper/85")}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Flow steps={p.flow} label={p.flowLabel} tone={p.tone} className="mt-[clamp(2.5rem,5vw,4rem)]" />

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className={cn("btn", onRed ? "btn-solid" : "btn-red")}>
              View on GitHub <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">: {fullTitle} (opens in a new tab)</span>
            </a>
          )}
          {p.note && <p className={cn("max-w-[60ch] text-xs leading-relaxed", onRed ? "text-paper/80" : "text-grey")}>{p.note}</p>}
        </div>
      </div>
    </article>
  );
}

function Block({ label, text, onRed }: { label: string; text: string; onRed: boolean }) {
  return (
    <div data-reveal="fade">
      <h4 className={cn("t-label", onRed ? "text-ink" : "text-red")}>{label}</h4>
      <p className={cn("mt-4 text-[0.95rem] leading-relaxed", onRed ? "text-paper" : "text-paper/80")}>{text}</p>
    </div>
  );
}
