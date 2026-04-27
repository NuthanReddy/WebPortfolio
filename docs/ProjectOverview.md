## Project Overview

This is a **personal portfolio website** built with **Astro** (a modern static site generator), **TypeScript**, and **Tailwind CSS**. It reads your resume data from a JSON file and renders it as a web page.

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
- **`darkMode: "class"`** — enables dark mode via a `class="dark"` on the `<html>` element
- **`colors.primary`** — defines a custom blue color palette (`primary-50` through `primary-950`) used throughout the site
- **`fontFamily`** — sets "Inter" as the default font and "JetBrains Mono" for code

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
Global stylesheet:

```css
@import "tailwindcss";          /* loads all of Tailwind's utility classes */

@layer base {                   /* @layer base = low-priority styles that can be overridden */
  html { scroll-behavior: smooth; }   /* smooth-scrolling when clicking anchor links */
  body {
    @apply bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100;  /* light/dark backgrounds */
    @apply antialiased;          /* smoother font rendering */
  }
}
```

`@apply` is Tailwind's way of using utility classes inside CSS files instead of in HTML.

---

## 5. Pages & Templates

### index.astro
This is the **homepage** — the only page in your site right now. Astro files have two parts:

**Frontmatter (between `---` fences)** — runs on the server at build time:
```ts
import "@/styles/global.css";        // load global styles
import { basics } from "@/lib/data"; // import your name, label, summary, etc.
```

**Template (HTML below the fences)** — the actual markup:
- `{basics.name}` — curly braces insert TypeScript values into HTML (like template literals)
- Tailwind classes like `text-5xl font-bold text-primary-600` style everything inline
- Two buttons link to your GitHub and LinkedIn using values from the JSON
- `dark:text-primary-400` variants apply when dark mode is active

The page currently shows a centered hero section with your name, title, summary, and two CTA buttons.

---

## 6. Empty Folders

- **components** — empty. This is where you'd put reusable UI pieces (e.g., `<SkillCard />`, `<JobTimeline />`, `<ProjectCard />`)
- **layouts** — empty. This is where you'd put page wrappers (e.g., a `<BaseLayout>` with shared `<head>`, nav, footer)
- **public** — empty. Static assets (images, favicon, PDFs) go here and are served as-is

---

## How Data Flows

```
nuthan-resume-template.json   (raw data)
        ↓
src/types/resume.ts           (type-checks the shape)
        ↓
src/lib/data.ts               (imports JSON, exports typed objects)
        ↓
src/pages/index.astro         (imports data, renders HTML)
        ↓
Tailwind + global.css          (styles everything)
        ↓
Static HTML                    (output after `npm run build`)
```

The key insight: **Astro generates plain HTML at build time**. There's no JavaScript sent to the browser unless you explicitly add interactive components. This makes the site very fast.


