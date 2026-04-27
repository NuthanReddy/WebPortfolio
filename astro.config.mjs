import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://nuthanreddy.dev",
  vite: {
    css: {
      postcss: "./postcss.config.cjs",
    },
  },
});
