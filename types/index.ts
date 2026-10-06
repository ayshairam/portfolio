export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  roles: string[];
  tagline: string;
  location: string;
  /** Leave empty ("") to hide every email link on the site. */
  email: string;
  about: string;
  aboutExtended: string;
  links: { linkedin: SocialLink; github: SocialLink };
  siteUrl: string;
  voiceIntroTitle: string;
};

export type EducationEntry = {
  degree: string;
  institution: string;
  detail: string;
  period: string;
  /** Optional — only fill with verified values. */
  score?: string;
};

export type FlowStep = string;

export type Project = {
  slug: string;
  title: string;
  /** Second line of the title rendered in red. */
  titleAccent?: string;
  summary: string;
  context?: string;
  problem: string;
  solution: string;
  technology: string[];
  flow: FlowStep[];
  flowLabel: string;
  image: string;
  video?: string;
  repo?: string;
  note?: string;
  gallery?: Photo[];
  /** Lead with the designed black/red diagram even when a screenshot exists. */
  leadVisual?: boolean;
  /** Show gallery screenshots in grayscale with a red tint (colour on hover). */
  galleryTint?: boolean;
  /** Media frame aspect ratio on desktop, e.g. "2000 / 773" for a wide screenshot. */
  mediaAspect?: string;
  tone: "black" | "red";
  visual: "signal" | "rag" | "aml" | "chain";
};

export type MinorProject = {
  title: string;
  summary: string;
  stack: string[];
  repo?: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  featured: boolean;
  intro: string;
  points: string[];
  flow?: FlowStep[];
  repo?: string;
};

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  /** CSS object-position for cropping, e.g. "50% 20%". */
  position?: string;
};

export type Achievement = {
  /** Display date, e.g. "14 Mar 2026". */
  date: string;
  /** Big numeral shown in the timeline. */
  year: string;
  /** "1st place" / "Selected" / "Presented" — what actually happened. */
  result: string;
  title: string;
  event: string;
  place?: string;
  detail: string;
  photos: Photo[];
};

export type Certification = {
  title: string;
  issuer: string;
  date?: string;
  kind: string;
  /** Certificate image in /public/certificates (optional). */
  image?: string;
};

/** Which optional media files exist in /public — computed on the server. */
export type AssetMap = {
  heroImage: string | null;
  heroIsCutout: boolean;
  aboutImage: string | null;
  skillsImage: string | null;
  educationImage: string | null;
  contactImage: string | null;
  projectImages: Record<string, string | null>;
  projectVideos: Record<string, string | null>;
  voiceIntro: string | null;
  resume: string | null;
};
