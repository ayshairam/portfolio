import { ChatWidget } from "@/components/ChatWidget";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { Navigation } from "@/components/Navigation";
import { ScrollFX } from "@/components/ScrollFX";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Resume } from "@/components/sections/Resume";
import { Skills } from "@/components/sections/Skills";
import { getAssets } from "@/lib/assets";

/**
 * Section order follows the reference: hero → about → skills → education →
 * certifications/achievements → work experience → projects → contact.
 */
export default function Home() {
  const a = getAssets();
  return (
    <>
      <Loader />
      <Cursor />
      <Navigation />
      <main id="main">
        <Hero image={a.heroImage} isCutout={a.heroIsCutout} />
        <About image={a.aboutImage} voice={a.voiceIntro} />
        <Skills image={a.skillsImage} />
        <Education image={a.educationImage} />
        <Achievements />
        <Experience />
        <Projects assets={a} />
        <Resume file={a.resume} />
        <Contact image={a.contactImage ?? a.aboutImage} />
      </main>
      <Footer />
      <ChatWidget />
      <ScrollFX />
    </>
  );
}
