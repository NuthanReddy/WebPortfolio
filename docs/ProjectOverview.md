## Project Overview

This is a **personal portfolio website** for Nuthan Reddy, built with **Astro v6** (static site generator), **TypeScript** (strict mode), and **Tailwind CSS v4**. It reads resume data from a JSON file and renders it as a dark-themed, card-based single-page site with zero client-side JavaScript.

**Design**: Dark minimal theme — navy background (`#0f172a`), card surfaces (`#1e293b`), blue accent (`#3B82F6`), muted text (`#94a3b8`). Inspired by the "Developer X" portfolio template.

---

## 1. Configuration Files (the "plumbing")

### package.json
This is the **project manifest** — like a table of contents for Node.js.

- **`scripts`**: Commands you can run:
  - `npm run dev` — starts a local dev server (live-reloads as you edit)
  - `npm run build` — type-checks then builds production HTML
  - `npm run preview` — previews the production build locally
- **`dependencies`**: Packages your app **needs to run** — Astro framework, TypeScript, Astro's type-checker
- **`devDependencies`**: Packages needed only **during development** — Tailwind CSS (utility-first CSS framework), PostCSS (CSS processor), autoprefixer (adds vendor prefixes like `-webkit-`)

### astro.config.mjs
Astro's main configuration file.

```js
site: "https://nuthanreddy.dev"   // Your production URL (used for SEO/sitemaps)
vite: { css: { postcss: "./postcss.config.cjs" } }  // Tells Vite (the bundler) where to find PostCSS config
```

Astro uses **Vite** under the hood as its build tool. This file wires them together.

### tsconfig.json
TypeScript configuration — tells the compiler how to behave.

- **`extends: "astro/tsconfigs/strict"`** — uses Astro's strict preset (catches more bugs)
- **`paths`** — these are **import aliases** so you can write:
  ```ts
  import { resume } from "@/lib/data";     // instead of "../../lib/data"
  import type { Job } from "@types/resume"; // instead of "../../types/resume"
  ```
  The `@` prefix is just a shortcut to the src folder.
- **`resolveJsonModule: true`** — allows importing `.json` files directly in TypeScript

### tailwind.config.mjs
Configures **Tailwind CSS** (a utility-first CSS framework where you style with classes like `text-xl`, `bg-blue-500`).

- **`content`** — tells Tailwind which files to scan for class names (so unused CSS is removed in production)

**Note**: In Tailwind v4, custom colors and fonts are defined via `@theme` in `global.css`, NOT in this config file. This file only specifies content paths.

### postcss.config.cjs
**PostCSS** is a CSS processing pipeline. This tiny file just registers the Tailwind plugin, which transforms Tailwind's `@apply` directives and utility classes into real CSS.

---

## 2. TypeScript Types

### resume.ts
This is a **type definition file** — it defines the *shape* of your data but produces **zero runtime code**.

Think of each `interface` as a blueprint:

| Interface | What it describes |
|---|---|
| `Basics` | Your name, email, LinkedIn, GitHub, phone, location, summary |
| `Job` | A work experience entry (position, company, dates, bullet points) |
| `Education` | A degree/school entry |
| `SkillGroup` | A skill category (e.g., "Languages") with a list of keywords |
| `Project` | A project with description bullets and tech keywords |
| `Certification` | A cert with name, date, optional issuer/URL |
| `Course` | A course you've taken |
| `ResumeData` | The **root type** that ties everything together |

**Why this matters**: If you mistype `basics.naem` instead of `basics.name`, TypeScript will catch it *before* you even open the browser. The `?` on fields like `url?: string` means that field is optional.

---

## 3. Data Layer

### nuthan-resume-template.json
Your actual resume content — all your jobs, education, skills, projects, certifications, and courses as structured JSON. This is the **single source of truth** for the entire site.

### data.ts
The **data access layer** — a thin bridge between the JSON file and the rest of the app.

```ts
import type { ResumeData } from "@/types/resume";   // import the type blueprint
import rawData from "../../nuthan-resume-template.json";  // import the raw JSON

export const resume = rawData as unknown as ResumeData;  // cast JSON → typed object
export const basics = resume.basics;          // shortcut exports
export const jobs = resume.headings.work.job;
// ... etc
```

- `as unknown as ResumeData` is a **type assertion** — it tells TypeScript "trust me, this JSON matches the `ResumeData` shape." The `unknown` intermediate step is needed because JSON's inferred type doesn't directly match.
- The individual `export const` lines are **convenience exports** so components can do `import { jobs } from "@/lib/data"` instead of navigating the nested object every time.

---

## 4. Styles

### global.css
Global stylesheet with Tailwind v4 `@theme` design tokens:

```css
@import "tailwindcss";          /* loads all of Tailwind's utility classes */

@theme {                        /* Tailwind v4 custom design tokens */
  --color-accent: #3B82F6;      /* blue accent for links, CTAs */
  --color-surface: #0f172a;     /* page background */
  --color-surface-card: #1e293b;/* card backgrounds */
  --color-surface-hover: #334155;/* hover states */
  --color-muted: #94a3b8;      /* secondary text */
  --font-sans: "Inter", "system-ui", "sans-serif";
  --font-mono: "JetBrains Mono", "Fira Code", "monospace";
}

@layer base {                   /* @layer base = low-priority styles */
  html { scroll-behavior: smooth; }
  body {
    @apply bg-surface text-gray-100 antialiased;  /* dark theme default */
  }
}
```

`@theme` is the Tailwind v4 way to define custom colors/fonts — replaces `tailwind.config.mjs` theme extensions. These generate utility classes like `bg-surface`, `text-accent`, `text-muted`.

---

## 5. Pages & Templates

### index.astro
This is the **homepage** — the only page in your site. It assembles all section components:

```ts
// Frontmatter (runs at build time)
import BaseLayout from "@/layouts/BaseLayout.astro";
import Navbar from "@/components/Navbar.astro";
import Hero from "@/components/Hero.astro";
import About from "@/components/About.astro";
import { basics } from "@/lib/data";
```

The page wraps everything in `<BaseLayout>` and stacks components: Navbar → Hero → About (more sections coming in later phases).

### BaseLayout.astro
The **HTML shell** shared by all pages:
- `<head>` with meta tags, Open Graph, viewport, canonical URL
- Google Fonts preconnect (Inter + JetBrains Mono)
- `<slot />` where page content is injected

### Components (src/components/)

| Component | Purpose |
|-----------|---------|
| `Navbar.astro` | Fixed top nav with blur backdrop, `</>` logo, section links, blue Contact CTA |
| `Hero.astro` | Split grid layout — large heading + summary (left), 3 info cards: About Me / My Work / Follow Me (right) |
| `About.astro` | Section label + heading + summary (left), stats grid: 11+ years / 6+ projects / 28B+ assets / 4 companies (right) |

---

## 6. Agent Instructions

Six agent instruction files guide AI coding assistants working on this project:

| File | Role | Key Focus |
|------|------|-----------|
| `CLAUDE.md` | Claude Code | Full architecture, commands, design system, coding rules |
| `.cursorrules` | Cursor/Windsurf | Karpathy guidelines (think → simplify → surgical → verify) |
| `.github/copilot-instructions.md` | GitHub Copilot | Stack conventions, Tailwind v4 syntax |
| `.github/agents/frontend-developer.md` | Frontend Dev | Components, responsive, zero JS, a11y |
| `.github/agents/backend-developer.md` | Backend Dev | Data schema, types, GitHub API at build time |
| `.github/agents/seo-expert.md` | SEO Expert | Meta tags, Open Graph, JSON-LD, Core Web Vitals |
| `.github/agents/ux-designer.md` | UX Designer | Visual hierarchy, WCAG 2.1 AA, spacing, color |

---

## How Data Flows

```
nuthan-resume-template.json   (raw data — single source of truth)
        ↓
src/types/resume.ts           (TypeScript interfaces enforce the shape)
        ↓
src/lib/data.ts               (imports JSON, exports typed objects)
        ↓
src/components/*.astro        (Navbar, Hero, About — import from @lib/data)
        ↓
src/pages/index.astro         (assembles components into the page)
        ↓
src/layouts/BaseLayout.astro  (HTML shell: head, meta, fonts, slot)
        ↓
Tailwind + global.css @theme  (styles via utility classes + design tokens)
        ↓
dist/index.html               (static HTML output — zero JavaScript)
```

The key insight: **Astro generates plain HTML at build time**. There's no JavaScript sent to the browser unless you explicitly add interactive components. This makes the site very fast.

---

## Build Phases

| Phase | Status | Summary |
|-------|--------|---------|
| 1. Scaffolding & Config | ✅ Done | Astro + TS + Tailwind, typed data layer, agent instructions |
| 2. Layout & Hero | ✅ Done | Navbar, hero (split layout), about section, dark design system |
| 3. Experience & Education | ⏳ Next | Work timeline, education, certifications |
| 4. Projects & Skills | ⬚ Pending | Project cards, skills grid, GitHub stats |
| 5. Additional Sections | ⬚ Pending | Talks, OSS, courses, footer |
| 6. Polish & Deploy | ⬚ Pending | SEO, Lighthouse audit, Cloudflare Pages |


