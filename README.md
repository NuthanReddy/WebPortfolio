# WebPortfolio

Personal portfolio website for Nuthan Reddy — built with **Astro**, **TypeScript**, **Tailwind CSS**, and deployed on **Cloudflare Pages**.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Astro](https://astro.build) | Static site generator (zero JS shipped) |
| [TypeScript](https://typescriptlang.org) | Type-safe development |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Cloudflare Pages](https://pages.cloudflare.com) | Deployment & CDN |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── pages/          # Astro pages (routes)
├── layouts/        # Reusable page layouts
├── components/     # UI components
├── styles/         # Global CSS (Tailwind)
├── lib/            # Data loading & utilities
└── types/          # TypeScript interfaces
public/             # Static assets (favicon, images)
nuthan-resume-template.json  # Resume data source
```

## Data Source

All content is driven by `nuthan-resume-template.json` — edit this file to update portfolio content. TypeScript interfaces in `src/types/resume.ts` enforce the schema.

## Deployment

Pushes to `main` auto-deploy to Cloudflare Pages.

```bash
# Manual build
npm run build
# Output in dist/
```

## License

MIT
