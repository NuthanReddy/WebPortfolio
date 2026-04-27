# Copilot Instructions for WebPortfolio

## Context
This is a personal portfolio website for Nuthan Reddy. Static site built with Astro + TypeScript + Tailwind CSS v4. All content is driven by `nuthan-resume-template.json`.

## Stack
- Astro v6 (static site generation)
- TypeScript strict mode
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Cloudflare Pages deployment

## Conventions
- Use `.astro` components, not React/Vue/Svelte
- Import data from `@lib/data` (typed exports from the JSON)
- Use Tailwind utility classes inline — no separate CSS files per component
- Support dark mode via `dark:` prefix (class strategy)
- Ship zero client-side JavaScript unless interactive behavior is required
- Use path aliases: `@/`, `@components/`, `@layouts/`, `@lib/`, `@types/`

## Tailwind v4 Notes
- CSS uses `@import "tailwindcss"` (not `@tailwind base/components/utilities`)
- PostCSS plugin is `@tailwindcss/postcss` (not `tailwindcss`)
- Config in `tailwind.config.mjs`

## Commands
- `npm run dev` — dev server at localhost:4321
- `npm run build` — type-check + build to dist/
- `npm run preview` — preview production build
