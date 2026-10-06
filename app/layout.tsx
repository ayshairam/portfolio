import type { Metadata, Viewport } from "next";
import "@fontsource-variable/oswald";
import "@fontsource/bebas-neue";
import "@fontsource/tenor-sans";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import { profile } from "@/data/profile";

const title = `${profile.name} — AI Engineer & Software Developer`;
const description =
  "Portfolio of Aysha Iram, AI & Data Science engineer: ICU Sentinel, Educational Atlas (RAG), retail banking AML monitoring and Trinetra.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  authors: [{ name: profile.name, url: profile.links.linkedin.href }],
  keywords: ["Aysha Iram", "AI Engineer", "Software Developer", "Machine Learning", "RAG", "Portfolio", "Bengaluru"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* rough "brush" edge used on the red circles */}
        <svg aria-hidden="true" width="0" height="0" className="absolute">
          <filter id="brush-edge">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="18" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
