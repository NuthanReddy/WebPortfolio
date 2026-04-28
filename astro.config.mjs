import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Use Cloudflare adapter only when CF_PAGES is set (Cloudflare build environment)
const isCloudflare = !!process.env.CF_PAGES;
const isGitHubPages = !!process.env.GITHUB_ACTIONS;

let adapter;
if (isCloudflare) {
  const cloudflare = (await import("@astrojs/cloudflare")).default;
  adapter = cloudflare();
}

export default defineConfig({
  site: isGitHubPages ? "https://nuthanreddy.github.io" : "https://nuthan.is-a.dev",
  base: isGitHubPages ? "/WebPortfolio/" : "/",
  integrations: [sitemap()],
  output: isCloudflare ? "server" : "static",
  ...(adapter ? { adapter } : {}),

  vite: {
    css: {
      postcss: "./postcss.config.cjs",
    },
  },
});