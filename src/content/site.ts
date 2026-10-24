/**
 * ACM FACE — Site Configuration & Content
 * Single source of truth for site-wide metadata, institutional copy, and pillars.
 */

export const SITE_CONFIG = {
  name: "JIT ACM Student Chapter",
  shortName: "JIT ACM",
  tagline: "Advancing Computing. Building People.",
  shortDescription:
    "Official student chapter of the Association for Computing Machinery at JIT, advancing computer science education, technical craftsmanship, and collaborative engineering.",
  institutionalLine: "Association for Computing Machinery · JIT Student Chapter",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://jit-acm.vercel.app"),
  year: new Date().getFullYear(),
  scrollTarget: "#about",
} as const;

export const HERO_STATEMENT = {
  line1: "Advancing Computing.",
  line2: "Building People.",
  scrollLabel: "Explore Chapter ↓",
};

export interface Pillar {
  id: string;
  title: string;
  description: string;
  href?: string;
  isInteractiveButton?: boolean;
}

export const ABOUT_PILLARS: Record<"people" | "events" | "projects" | "learning", Pillar> = {
  people: {
    id: "people",
    title: "Community",
    description: "A collaborative student-led engineering collective bridging computer science theory with practical craftsmanship and peer mentorship.",
    href: "#team",
  },
  events: {
    id: "events",
    title: "Events & Workshops",
    description: "Technical masterclasses, competitive hackathons, and industry speaker sessions designed to advance practical engineering competencies.",
    href: "#events",
  },
  projects: {
    id: "projects",
    title: "Projects",
    description: "Production-grade web platforms, developer tooling, and collaborative software projects authored and maintained by chapter members.",
    href: "#projects",
  },
  learning: {
    id: "learning",
    title: "Learning & Mentorship",
    description: "Peer code reviews, systems architecture discussions, and career guidance bridging curriculum study with industry technology standards.",
    href: "#gallery",
    isInteractiveButton: true,
  },
};

export const SITE_NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
] as const;

export const FOOTER_FOCUS_NAV = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact Us", href: "mailto:acm@jitnagpur.edu.in" },
] as const;

export const SITE_SOCIAL_LINKS = {
  x: "https://x.com/jit_acm",
  discord: "https://discord.gg/j3b4gw2QK",
  instagram: "https://www.instagram.com/acm_jit/",
  linkedin: "https://www.linkedin.com/in/jit-acm-student-chapter/?isSelfProfile=false",
  githubProfile: "https://github.com/jitacm",
  repository: "https://github.com/jitacm/JIT-ACM-Event-Web-26",
} as const;

export const FOOTER_DATA = {
  wordmark: "JIT ACM Student Chapter",
  tagline: "ADVANCING COMPUTING. BUILDING PEOPLE.",
  institutionalNote: "Official Student Chapter of the Association for Computing Machinery · JIT",
  copyright: `© ${new Date().getFullYear()} JIT ACM Student Chapter. All rights reserved.`,
  githubUrl: SITE_SOCIAL_LINKS.githubProfile,
  repoUrl: SITE_SOCIAL_LINKS.repository,
};

