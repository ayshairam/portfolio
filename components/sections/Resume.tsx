import { Download, FileText } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { profile } from "@/data/profile";

/** Full-bleed red CTA. Buttons disable themselves if the PDF is missing. */
export function Resume({ file }: { file: string | null }) {
  return (
    <section id="resume" aria-labelledby="resume-title" className="red-band on-red relative overflow-hidden py-[clamp(5rem,12vw,10rem)]" data-band>
      <div className="wrap relative z-10 grid gap-10 md:grid-cols-12 md:items-end">
        <h2 id="resume-title" className="t-mega md:col-span-8" data-reveal="chars">
          <SplitText text="Want the full" className="text-paper" />
          <br />
          <SplitText text="story?" className="text-ink" />
        </h2>
        <div className="md:col-span-4 md:pb-4">
          <p className="max-w-[32ch] text-sm leading-relaxed text-paper/90">
            Education, experience, projects and certifications on one page.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {file ? (
              <>
                <a href={file} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  <FileText size={16} aria-hidden="true" /> View resume
                  <span className="sr-only">(PDF, opens in a new tab)</span>
                </a>
                <a href={file} download={`${profile.name.replace(/\s+/g, "-")}-Resume.pdf`} className="btn btn-ghost text-paper">
                  <Download size={16} aria-hidden="true" /> Download resume
                </a>
              </>
            ) : (
              <>
                <span className="btn btn-solid" aria-disabled="true">View resume</span>
                <span className="btn btn-ghost text-paper" aria-disabled="true">Download resume</span>
                <p className="w-full text-xs text-paper/80">Resume PDF coming soon.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
