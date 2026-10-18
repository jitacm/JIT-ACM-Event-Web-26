import { ProjectItem } from "@/types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    slug: "jit-acm-official-website",
    title: "JIT ACM Official Website",
    summary: "Official website source repository.",
    tags: ["Web", "TypeScript", "Next.js"],
    repoUrl: "https://github.com/jitacm/JIT-ACM-Offcial-Website",
    placeholder: false,
  },
  {
    slug: "jit-acm-web-26",
    title: "JIT ACM Web 26",
    summary: "Link to the JIT ACM Web 26 repository.",
    tags: ["Web", "TypeScript"],
    repoUrl: "https://github.com/jitacm/JIT-ACM-Web-26",
    placeholder: false,
  },
];

export const FALLBACK_PLACEHOLDER_PROJECTS: ProjectItem[] = PROJECTS_DATA;
