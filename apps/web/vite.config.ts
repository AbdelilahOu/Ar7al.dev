import { sveltekitOG } from "@ethercorps/sveltekit-og/plugin";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { mdsvex } from "mdsvex";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    enhancedImages(),
    mdsvex({
      extensions: [".md", ".svx"],
      components: "./src/lib/components/markdown/index.ts",
    }),
    sveltekit(),
    sveltekitOG(),
  ],
  logLevel: "info",
});
