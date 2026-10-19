import { ProjectItem } from "@/types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    slug: "jit-acm-official-website",
    title: "JIT ACM Official Website",
    summary: "The official digital platform and web presence of the JIT ACM Student Chapter, architected with Next.js and TypeScript.",
    tags: ["Web", "TypeScript", "Next.js"],
    repoUrl: "https://github.com/jitacm/JIT-ACM-Offcial-Website",
    placeholder: false,
  },
  {
    slug: "jit-acm-web-26",
    title: "JIT ACM Web 26",
    summary: "Core open-source codebase, UI components, and technical resources engineered for chapter web initiatives.",
    tags: ["Web", "TypeScript"],
    repoUrl: "https://github.com/jitacm/JIT-ACM-Web-26",
    placeholder: false,
  },
];

export const FALLBACK_PLACEHOLDER_PROJECTS: ProjectItem[] = PROJECTS_DATA;
