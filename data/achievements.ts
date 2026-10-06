import type { Achievement, Certification } from "@/types";

/**
 * Verified achievements only — every entry matches a certificate or photo
 * Aysha provided. Newest first. The site and the chatbot both read this file.
 */
export const achievements: Achievement[] = [
  {
    date: "Sep 2026",
    year: "2026",
    result: "1st place",
    title: "AI vs Human",
    event: "ISTE TECHSIUM 26, inter-college tech fest",
    place: "HKBK College of Engineering, Bengaluru",
    detail: "Won first place in the AI vs Human event at HKBK College of Engineering's inter-college tech fest.",
    photos: [
      { src: "/achievements/hkbk-award.jpg", alt: "Aysha receiving the ISTE TECHSIUM 26 winner certificate on stage at HKBK College" },
      { src: "/achievements/hkbk-certificates.jpg", alt: "ISTE TECHSIUM 26 winner certificates held up in front of the I love HKBK sign" },
    ],
  },
  {
    date: "9 Sep 2026",
    year: "2026",
    result: "Selected",
    title: "Trinetra — Smart India Hackathon 2026",
    event: "Internal Smart India Hackathon (SIH-2026)",
    place: "Don Bosco Institute of Technology",
    detail: "Presented Trinetra with Team Sentinels at DBIT's internal hackathon and was selected to represent the college at SIH 2026, problem statement SIH26146.",
    photos: [{ src: "/achievements/sih-2026-team.jpg", alt: "Team Sentinels at DBIT's internal Smart India Hackathon 2026" }],
  },
  {
    date: "14 Mar 2026",
    year: "2026",
    result: "1st place",
    title: "MindCare — Ideathon",
    event: "Ideathon",
    place: "Don Bosco Institute of Technology",
    detail: "Pitched MindCare, a digital mental-health and psychological support system for students, and won first place.",
    photos: [{ src: "/achievements/ideathon-award.jpg", alt: "Aysha receiving the Ideathon first-place certificate at DBIT", position: "20% 50%" }],
  },
  {
    date: "2 Dec 2025",
    year: "2025",
    result: "Presented",
    title: "MindCare at EY Day",
    event: "Next Gen Employability Program — Edunet Foundation with EY Global Delivery Services",
    detail: "Presented MindCare to EY employees: an AI chatbot, personalised analytics, a peer-support community, wellness goals and a knowledge base for student mental health.",
    photos: [
      { src: "/achievements/ey-day-presenting.jpg", alt: "Aysha presenting MindCare on stage at EY Day, with Edunet and EY banners" },
      { src: "/achievements/ey-day-closeup.jpg", alt: "Aysha presenting the introduction of MindCare" },
      { src: "/achievements/ey-day-group.jpg", alt: "Group photo of participants and EY employees at the Next Gen Employability Program" },
    ],
  },
  {
    date: "2025",
    year: "2025",
    result: "Selected",
    title: "MindCare — Smart India Hackathon 2025",
    event: "Smart India Hackathon 2025",
    detail: "Selected by the college to compete at SIH 2025 with MindCare.",
    photos: [],
  },
  {
    date: "8 Apr 2025",
    year: "2025",
    result: "Represented DBIT",
    title: "TCS TechBytes 2025",
    event: "Statewide engineering IT quiz by TCS and BITES, Government of Karnataka",
    detail: "Selected from the college to represent Don Bosco Institute of Technology in the statewide inter-college IT quiz.",
    photos: [
      { src: "/achievements/tcs-techbytes-certificate.jpg", alt: "TCS TechBytes 2025 certificate with a TCS gift bag", position: "50% 12%" },
      { src: "/achievements/tcs-techbytes-venue.jpg", alt: "TCS TechBytes banner outside the BGS and SJB auditorium", position: "50% 62%" },
      { src: "/achievements/tcs-techbytes-stage.jpg", alt: "TCS TechBytes quiz stage" },
    ],
  },
];

export const certifications: Certification[] = [
  {
    title: "Full Stack Web Development with AI Tools",
    issuer: "Edunet Foundation · AICTE · EY",
    date: "2025–26",
    kind: "Completion",
    image: "/certificates/edunet-full-stack-ai.jpg",
  },
  {
    title: "AI Skills Passport",
    issuer: "EY · Microsoft",
    kind: "Completion",
    image: "/certificates/ey-microsoft-ai-skills-passport.jpg",
  },
  {
    title: "Basics of Python and AI — AFE Bootcamp",
    issuer: "Amazon Future Engineer · Navgurukul",
    date: "Mar 2025",
    kind: "Completion",
    image: "/certificates/afe-python-ai.jpg",
  },
  {
    title: "AI with Python Internship",
    issuer: "Languify",
    date: "Aug–Sep 2024",
    kind: "Internship",
    image: "/certificates/languify-internship.jpg",
  },
  {
    title: "Interactive Dashboards with Tableau and Power BI",
    issuer: "AI & DS Department, DBIT",
    date: "Sep 2024",
    kind: "2-day workshop",
    image: "/certificates/tableau-powerbi-workshop.jpg",
  },
  {
    title: "Open Source Program",
    issuer: "Google Developer Student Club, DBIT",
    date: "Dec 2023",
    kind: "Completion",
    image: "/certificates/gdsc-open-source.jpg",
  },
];
