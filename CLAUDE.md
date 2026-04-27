# CLAUDE.md — Agent Instructions for WebPortfolio

## Project Overview
Personal portfolio website for Nuthan Reddy. Static site built with Astro v6 + TypeScript + Tailwind CSS v4, deployed on Cloudflare Pages. Dark minimal design — navy background, card surfaces, blue accents, single-page layout.

## Tech Stack
- **Framework**: Astro v6 (static site generation, zero JS shipped by default)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`
- **Deployment**: Cloudflare Pages

## Key Commands
```bash
npm run dev      # Start dev server at http://localhost:4321
npm run build    # Type-check + production build → dist/
npm run preview  # Preview production build locally
```

## Architecture

### Data Flow
All content comes from `nuthan-resume-template.json` at the project root. This file is the single source of truth for all portfolio content.

- `src/types/resume.ts` — TypeScript interfaces for the JSON schema
- `src/lib/data.ts` — Typed exports (basics, jobs, education, skills, projects, certifications, courses)
- Components import from `@lib/data` to render content

### Path Aliases
- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@layouts/*` → `./src/layouts/*`
- `@lib/*` → `./src/lib/*`
- `@types/*` → `./src/types/*`

### File Conventions
- Pages: `src/pages/*.astro` (file-based routing)
- Layouts: `src/layouts/BaseLayout.astro` (HTML head, meta, fonts, slot)
- Components: `src/components/*.astro` (Navbar, Hero, About, etc.)
- Styles: Tailwind utility classes inline; custom theme in `src/styles/global.css` via `@theme`

### Current Components
- `BaseLayout.astro` — HTML shell, meta tags, Google Fonts
- `Navbar.astro` — Fixed top nav, blur backdrop, logo, links, contact CTA
- `Hero.astro` — Split grid: heading + summary left, info cards (About/Work/Follow) right
- `About.astro` — Stats grid (years, projects, assets, companies)

## Design System (via @theme in global.css)
- `bg-surface` → `#0f172a` (page background)
- `bg-surface-card` → `#1e293b` (card backgrounds)
- `bg-surface-hover` → `#334155` (hover states)
- `text-accent` / `bg-accent` → `#3B82F6` (blue accent)
- `text-muted` → `#94a3b8` (secondary text)
- `font-sans` → Inter
- `font-mono` → JetBrains Mono

## Important Rules
1. **No JavaScript shipped to client** unless absolutely necessary — this is a static content site
2. **All content from JSON** — never hardcode resume data in components
3. **Dark theme only** — no light mode toggle; entire design is dark
4. **Tailwind v4** — uses `@import "tailwindcss"` and `@theme` directive, NOT `@tailwind` or `tailwind.config.mjs` for colors
5. **PostCSS** — plugin is `@tailwindcss/postcss`, NOT `tailwindcss`
6. **Type safety** — all data must flow through `src/types/resume.ts` interfaces

## Common Patterns

### Adding a new section
1. Add data to `nuthan-resume-template.json`
2. Update `src/types/resume.ts` with new interface
3. Export from `src/lib/data.ts`
4. Create component in `src/components/SectionName.astro`
5. Import into `src/pages/index.astro`

### Styling
- Use Tailwind utilities directly in `.astro` files
- Custom colors defined in `src/styles/global.css` via `@theme` block
- Cards: `rounded-xl bg-surface-card p-6 border border-white/5`
- Section labels: `text-xs font-semibold uppercase tracking-widest text-muted`
- Accent links: `text-accent font-semibold hover:underline`
