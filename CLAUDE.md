# CLAUDE.md — Agent Instructions for WebPortfolio

## Project Overview
Personal portfolio website for Nuthan Reddy. Static site built with Astro + TypeScript + Tailwind CSS v4, deployed on Cloudflare Pages.

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
- Layouts: `src/layouts/*.astro` (shared HTML structure)
- Components: `src/components/*.astro` (reusable UI pieces)
- Styles: Tailwind utility classes inline; global styles in `src/styles/global.css`

## Important Rules
1. **No JavaScript shipped to client** unless absolutely necessary — this is a static content site
2. **All content from JSON** — never hardcode resume data in components
3. **Dark mode** uses Tailwind's `class` strategy (`dark:` prefix)
4. **Tailwind v4** — uses `@import "tailwindcss"` syntax, NOT `@tailwind` directives
5. **PostCSS** — plugin is `@tailwindcss/postcss`, NOT `tailwindcss`
6. **Type safety** — all data must flow through `src/types/resume.ts` interfaces

## Common Patterns

### Adding a new section
1. Add data to `nuthan-resume-template.json`
2. Update `src/types/resume.ts` with new interface
3. Export from `src/lib/data.ts`
4. Create component in `src/components/SectionName.astro`
5. Import into page

### Styling
- Use Tailwind utilities directly in `.astro` files
- Custom theme colors: `primary-50` through `primary-950`
- Fonts: `font-sans` (Inter), `font-mono` (JetBrains Mono)
