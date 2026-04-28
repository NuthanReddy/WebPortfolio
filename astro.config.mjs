import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Use Cloudflare adapter only when CF_PAGES is set (Cloudflare build environment)
const isCloudflare = !!process.env.CF_PAGES;

let adapter;
if (isCloudflare) {
  const cloudflare = (await import("@astrojs/cloudflare")).default;
  adapter = cloudflare();
}

export default defineConfig({
  site: "https://nuthan.is-a.dev",
  integrations: [sitemap()],
  output: isCloudflare ? "server" : "static",
  ...(adapter ? { adapter } : {}),

  vite: {
    css: {
      postcss: "./postcss.config.cjs",
    },
  },
});