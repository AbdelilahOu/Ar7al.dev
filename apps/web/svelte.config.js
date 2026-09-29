import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import alchemy from "alchemy/cloudflare/sveltekit";
import { escapeSvelte, mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";

const themes = { light: "github-light", dark: "poimandres" };
const langs = ["go", "markdown"];

const appHtml = readFileSync(new URL("./src/app.html", import.meta.url), "utf8").replace(/\r\n?/g, "\n");
const themeScript = appHtml.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
const themeScriptHash = `sha256-${createHash("sha256").update(themeScript).digest("base64")}`;

/** @type {ReturnType<typeof createHighlighter> | null} */
let highlighterPromise = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: Object.values(themes),
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
      const html = escapeSvelte(
        highlighter.codeToHtml(code, { lang: supportedLang, themes, defaultColor: "dark" }),
      );
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
        "script-src": ["self", themeScriptHash, "https://static.cloudflareinsights.com"],
        "object-src": ["none"],
        "base-uri": ["self"],
      },
    },
  },
};

export default config;
