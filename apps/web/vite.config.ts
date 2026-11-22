import { sveltekitOG } from "@ethercorps/sveltekit-og/plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { mdsvex } from "mdsvex";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), mdsvex({ extensions: [".md", ".svx"] }), sveltekit(), sveltekitOG()],
  logLevel: "info",
});
