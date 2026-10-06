import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { ContactComposer } from "@/components/ContactComposer";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SplitText } from "@/components/ui/SplitText";
import { profile } from "@/data/profile";

const LINES = ["Let's", "build", "something", "intelligent."];

/** Big staggered closing statement, then the reference's GET IN TOUCH block. */
export function Contact({ image }: { image: string | null }) {
  const items = [
    profile.email && { icon: <Mail size={18} aria-hidden="true" />, label: profile.email, href: `mailto:${profile.email}` },
    { icon: <LinkedinIcon />, label: profile.links.linkedin.handle, href: profile.links.linkedin.href, external: true, name: "LinkedIn" },
    { icon: <GithubIcon />, label: profile.links.github.handle, href: profile.links.github.href, external: true, name: "GitHub" },
    { icon: <MapPin size={18} aria-hidden="true" />, label: profile.location },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href?: string; external?: boolean; name?: string }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section overflow-hidden">
      <div className="wrap">
        <p className="t-mega" data-reveal="chars">
          {LINES.map((line, i) => (
            <span
              key={line}
              className={i === LINES.length - 1 ? "block text-red" : "block text-paper"}
              style={{ paddingLeft: `${[0, 12, 4, 18][i]}%` }}
            >
              <SplitText text={line} />
            </span>
          ))}
        </p>
      </div>

      <div className="red-rule my-[clamp(4rem,9vw,8rem)]" aria-hidden="true" />

      <div className="wrap grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-grey">{profile.name}</p>
          <SectionTitle id="contact-title" lead="Get in" accent="Touch" className="mt-4" />
          <ul className="mt-10 space-y-4">
            {items.map((it) => (
              <li key={it.label} className="flex items-center gap-4 text-paper">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-paper">{it.icon}</span>
                {it.href ? (
                  <a
                    href={it.href}
                    {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="link-line text-[0.95rem] hover:text-red"
                  >
                    {it.name && <span className="sr-only">{it.name}: </span>}
                    {it.label}
                    {it.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  <span className="text-[0.95rem] text-grey">{it.label}</span>
                )}
              </li>
            ))}
          </ul>
          {profile.email && <ContactComposer email={profile.email} />}
        </div>

        <div className="relative mx-auto aspect-square w-[min(84vw,30rem)] md:col-span-5 md:col-start-8 md:w-full">
          <svg aria-hidden="true" viewBox="0 0 400 400" className="brush absolute inset-0 h-full w-full" data-parallax="0.1">
            <path
              d="M206 22c70 6 150 46 170 122 18 70-14 150-80 196-62 44-160 52-222 4C16 300 2 214 30 146 58 76 132 16 206 22Z"
              fill="url(#splash)"
            />
            <defs>
              <radialGradient id="splash" cx="45%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#E00000" />
                <stop offset="60%" stopColor="#7A090C" />
                <stop offset="100%" stopColor="#4A080A" />
              </radialGradient>
            </defs>
          </svg>
          {image ? (
            <div className="absolute inset-[10%] overflow-hidden">
              <Image src={image} alt={`${profile.name}`} fill sizes="(min-width: 768px) 30vw, 84vw" className="object-cover object-top" />
            </div>
          ) : (
            <p aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-center font-bebas text-[clamp(4rem,9vw,8rem)] leading-[0.85] text-paper">
              Say
              <br />
              hello
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
