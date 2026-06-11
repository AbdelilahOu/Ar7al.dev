import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import alchemy from "alchemy/cloudflare/sveltekit";
import { escapeSvelte, mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";

const theme = "poimandres";
const langs = ["go", "markdown"];

/** @type {ReturnType<typeof createHighlighter> | null} */
let highlighterPromise = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [theme],
      langs: langs,
    });
  }
  return highlighterPromise;
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md", ".svx"],
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await getHighlighter();
      const supportedLang = langs.includes(lang) ? lang : "text";
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang: supportedLang, theme }));
      return `{@html \`${html}\`}`;
    },
  },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md", ".svx"],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    adapter: alchemy(),
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
        "script-src": ["self"],
        "object-src": ["none"],
        "base-uri": ["self"],
      },
    },
  },
};

export default config;
