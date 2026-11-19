import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import alchemy from "alchemy/cloudflare/sveltekit";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md", ".svx"],
  preprocess: [vitePreprocess()],

  kit: {
    adapter: alchemy(),
    inlineStyleThreshold: Infinity,
    alias: {
      "@posts": "src/content/blog-posts",
      "@projects": "src/content/projects",
      "@career": "src/content/career",
    },
    prerender: {
      origin: "https://ar7al.dev",
    },
    csp: {
      mode: "auto",
      directives: {
        "script-src": ["self", "https://static.cloudflareinsights.com"],
        "object-src": ["none"],
        "base-uri": ["self"],
      },
    },
  },
};

export default config;
