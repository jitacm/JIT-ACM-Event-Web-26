import { EventItem } from "@/types";

export const EVENTS_DATA: EventItem[] = [
  {
    slug: "acm-installation-2025",
    title: "ACM Installation",
    dateISO: "2025-07-15T09:30:00Z",
    dateLabel: "JUL 15, 2025 · 15:00 IST",
    summary:
      "Inaugural ceremony inducting the 2025–26 Executive Committee, featuring keynote remarks on computing careers and professional chapter engagement by Suhas Katulwar from ACM Nagpur.",
    mode: "Virtual Classroom",
    location: "Online",
    status: "past",
    registerUrl: "",
    placeholder: false,
  },
  {
    slug: "30days-dev-challenge-2025",
    title: "30DaysDevChallenge",
    dateISO: "2025-07-20T00:00:00Z",
    dateLabel: "JUL 20 – AUG 14, 2025",
    summary:
      "An intensive 30-day technical sprint challenging participants to build software projects, commit daily via Git, and master modern development fundamentals.",
    mode: "Online Challenge",
    location: "GitHub",
    status: "past",
    registerUrl: "",
    placeholder: false,
  },
  {
    slug: "github-masterclass-2025",
    title: "GitHub MasterClass",
    dateISO: "2025-07-27T09:30:00Z",
    dateLabel: "JUL 27, 2025 · 15:00 IST",
    summary:
      "A hands-on masterclass covering distributed version control, branching strategies, collaborative pull request workflows, and open-source contribution practices.",
    mode: "Interactive Workshop",
    location: "Campus Lab",
    status: "past",
    registerUrl: "",
    placeholder: false,
  },
  {
    slug: "hackblitz-season-3-2026",
    title: "HackBlitz Season 3",
    dateISO: "2026-03-24T00:00:00Z",
    dateLabel: "MAR 24–25, 2026",
    summary:
      "A 48-hour competitive hackathon hosted on Unstop, convening 177 developers across 45 teams to architect, engineer, and deploy functional software prototypes.",
    mode: "Hackathon",
    location: "Unstop / JIT Campus",
    status: "past",
    registerUrl: "",
    placeholder: false,
  },
  {
    slug: "discover-docker-workshop-2026",
    title: "Discover Docker: Hands-on Workshop",
    dateISO: "2026-04-18T00:00:00Z",
    dateLabel: "APR 18, 2026",
    summary:
      "An applied workshop on containerization and cloud development led by alumnus Suraj Hemnani, exploring Docker architecture, image optimization, and modern deployment pipelines.",
    mode: "Technical Workshop",
    location: "Computer Center",
    status: "past",
    registerUrl: "",
    placeholder: false,
  },
  {
    slug: "chapter-meeting-2026",
    title: "Chapter Meeting",
    dateISO: "2026-09-15T00:00:00Z",
    dateLabel: "SEP 15, 2026",
    summary:
      "Annual chapter assembly welcoming incoming members, ratifying the technical roadmap, and organizing student working groups for upcoming hackathons and masterclasses.",
    mode: "Chapter Orientation",
    location: "Auditorium",
    status: "past",
    registerUrl: "",
    placeholder: false,
  },
];

export const FALLBACK_PLACEHOLDER_EVENTS: EventItem[] = EVENTS_DATA;