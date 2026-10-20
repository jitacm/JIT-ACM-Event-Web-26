# JIT ACM — Official Student Chapter Website

The official web presence of the **JIT ACM Student Chapter** (Association for Computing Machinery at Jhulelal Institute of Technology). Engineered with modern web standards, the platform showcases chapter initiatives, student leadership, technical projects, marquee events, and community gallery archives through high-performance interactive experiences.

- **Production URL:** [https://jit-acm.vercel.app](https://jit-acm.vercel.app)
- **GitHub Repository:** [https://github.com/pranjalisantani/JIT_ACM](https://github.com/pranjalisantani/JIT_ACM)

---

## Features

- **Interactive 3D Computational Field:** Custom Three.js particle simulation responsive to pointer movement and scroll velocity, with automatic reduced-motion accessibility fallbacks.
- **Chapter Identity & Mission Pillars:** Dynamic typography and GSAP ScrollTrigger animations highlighting the chapter ethos: *Advancing Computing. Building People.*
- **Marquee Events Showcase:** Interactive event timeline and highlights detailing past and upcoming hackathons, speaker masterclasses, and workshops (e.g., HackBlitz, GitHub Masterclass, Shikhar).
- **Projects Showcase & Dynamic Case Studies:** Curated portfolio of technical projects with slug-based deep-dive routes (`/projects/[slug]`) and external repository links.
- **Team Leadership Roster:** Comprehensive 13-member chapter executive roster featuring 4:5 photoshoot portraits, member biographies, and direct GitHub and LinkedIn profiles.
- **Interactive Chapter Gallery:** Touch-friendly, draggable, and auto-drifting event photograph wall with pause and inspect controls.
- **Institutional Affiliations:** Verified ACM and Special Interest Group (SIG) badges including SIGARCH, SIGOPS, SIGPLAN, and the ACM Digital Library.
- **Audio Welcome Experience:** Ambient audio greeting (`acm-welcome.wav`) with speech synthesis fallback for supported browsers.
- **Luminous Signature Webmaster Credit:** Specialized canvas-driven micro-particle effect with subtle champagne-gold glow and direct LinkedIn profile navigation.
- **Production-Grade SEO & Metadata:** Automated OpenGraph social previews (`opengraph-image.tsx`), dynamic sitemap (`sitemap.ts`), and crawl directives (`robots.ts`).

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **3D & Graphics:** [Three.js](https://threejs.org/)
- **Animation:** [GSAP 3](https://greensock.com/gsap/) with ScrollTrigger
- **Utilities:** `clsx`, `tailwind-merge`
- **Deployment & Hosting:** [Vercel](https://vercel.com/)

---

## Prerequisites

- **Node.js:** `^20.0.0` or higher
- **npm:** `^10.0.0` or higher (or compatible package manager)

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pranjalisantani/JIT_ACM.git
   cd JIT_ACM
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open the site:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

No mandatory external secrets or API keys are required to run the website locally.

Optional environment configuration can be set in a `.env.local` file (see `.env.example`):

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for OpenGraph and sitemap generation | `https://jit-acm.vercel.app` (or Vercel system URL) |

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npx tsc --noEmit` | Validates TypeScript types across the entire project |
| `npm run lint` | Runs ESLint checks using Next.js ESLint configuration |
| `npm run build` | Builds an optimized production bundle |
| `npm start` | Runs the compiled production build locally |

---

## Project Structure

```text
├── public/
│   ├── audio/              # Chapter welcome audio (acm-welcome.wav)
│   ├── gallery/            # Event photo assets
│   ├── images/             # Institutional logos and sponsor SVGs
│   ├── team/               # Member portraits (4:5 photoshoot crops)
│   └── logo.png            # Chapter crest
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, fonts, and global metadata
│   │   ├── page.tsx        # Single-page chapter experience
│   │   ├── opengraph-image.tsx # Dynamic social preview generator
│   │   ├── robots.ts       # Crawler instructions
│   │   ├── sitemap.ts      # Automated sitemap generator
│   │   └── projects/[slug]/ # Project case study dynamic route
│   ├── components/
│   │   ├── navigation/     # Header navbar and navigation drawer
│   │   ├── opening/        # Opening audio/visual reveal component
│   │   ├── sections/       # Section components (About, Events, Projects, Team, Gallery, etc.)
│   │   ├── ui/             # Reusable UI primitives (Container, Hairline, Diamond, Reveal)
│   │   └── visual/         # ParticleField (Three.js) & ComputationalField components
│   ├── content/            # Data files (team, events, projects, gallery, site copy)
│   ├── lib/
│   │   ├── audio/          # Voice and audio engine utilities
│   │   ├── motion/         # GSAP registrations, timelines, and reduced-motion tokens
│   │   └── utils.ts        # Class merging utilities
│   └── types/              # TypeScript interface definitions
├── .env.example            # Sample environment variables
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration and cache headers
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## Content Maintenance Guide

- **Team Members:** Update `src/content/team.ts` and add 4:5 aspect ratio portraits to `public/team/`.
- **Events:** Update `src/content/events.ts` and add event visuals to `public/gallery/`.
- **Projects:** Update `src/content/projects.ts` to add or edit chapter project details and case study pages.
- **Site Metadata & Copy:** Update `src/content/site.ts` for tagline, pillar descriptions, and social URLs.

Before committing updates, ensure code quality checks pass:
```bash
npx tsc --noEmit && npm run lint && npm run build
```

---

## Deployment

The website is continuously deployed to **Vercel** via GitHub integration on pushes to the `main` branch.

- **Vercel Project:** `jit-acm`
- **Live Deployment:** [https://jit-acm.vercel.app](https://jit-acm.vercel.app)

---

## License & Credits

Maintained by the **JIT ACM Student Chapter**. Built and engineered by **Pranjali Santani** (Webmaster).
