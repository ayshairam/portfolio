"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import type { Project } from "@/types";

type Props = {
  project: Project;
  image: string | null;
  video: string | null;
  alt: string;
};

/**
 * Large case-study media. Video (if present) loads lazily and only plays
 * while on screen; reduced-motion visitors get the poster/image instead.
 */
export function ProjectMedia({ project, image, video, alt }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  if (video) {
    return (
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={video}
        poster={image ?? undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={alt}
      />
    );
  }
  if (image) {
    return <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />;
  }
  return <ProjectVisual visual={project.visual} onRed={project.tone === "red"} />;
}
