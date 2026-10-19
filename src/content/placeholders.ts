import { NavItem, SectionMeta } from "@/types";

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Opening", href: "#opening" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
];

export const SECTIONS_META: Record<string, SectionMeta> = {
  opening: {
    id: "opening",
    index: "00",
    title: "Opening",
    tagline: "Advancing Computing. Building People.",
  },
  about: {
    id: "about",
    index: "01",
    title: "About",
    tagline: "Chapter Initiatives & Focus Areas",
  },
  events: {
    id: "events",
    index: "02",
    title: "Events",
    tagline: "Technical Sessions & Workshops",
  },
  gallery: {
    id: "gallery",
    index: "03",
    title: "Gallery",
    tagline: "Chapter Chronicle & Documentation",
  },
  projects: {
    id: "projects",
    index: "04",
    title: "Projects",
    tagline: "Open-Source Projects",
  },
  team: {
    id: "team",
    index: "05",
    title: "Team",
    tagline: "Executive Committee & Core Members",
  },
  footer: {
    id: "footer",
    index: "06",
    title: "Footer",
    tagline: "JIT ACM Student Chapter",
  },
};
