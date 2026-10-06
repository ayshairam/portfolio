import Image from "next/image";
import { VoiceIntro } from "@/components/VoiceIntro";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { profile } from "@/data/profile";

/** Reference: grayscale photo left, two-tone light heading right. */
export function About({ image, voice }: { image: string | null; voice: string | null }) {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 lg:col-span-4 lg:col-start-2">
          <div data-reveal="clip" className="relative aspect-[4/5] w-full max-w-[26rem] overflow-hidden">
            <div data-reveal-inner className="absolute inset-0">
              {image ? (
                <Image
                  src={image}
                  alt={`${profile.name}, black and white portrait`}
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover grayscale"
                />
              ) : (
                <Placeholder file="/images/aysha-about.jpg" label="About photo" variant="window" />
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <SectionTitle id="about-title" lead="About" accent="Me" className="lg:text-[clamp(3rem,5.6vw,6.5rem)]" />
          <p className="mt-8 max-w-[34ch] font-title text-[clamp(1.25rem,2vw,1.9rem)] leading-snug text-paper" data-reveal="fade">
            {profile.about}
          </p>
          <p className="t-body mt-6" data-reveal="fade">
            {profile.aboutExtended}
          </p>
          <VoiceIntro src={voice} />
        </div>
      </div>
    </section>
  );
}
