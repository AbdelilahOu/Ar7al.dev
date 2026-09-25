import { read } from "$app/server";
import fontSource from "$lib/assets/fonts/JetBrainsMono-Regular.ttf";
import OgProjects from "$lib/components/og/OgProjects.svelte";
import { getLatestProjects } from "$lib/data/projects";
import { ImageResponse } from "@ethercorps/sveltekit-og";
import { CustomFont, resolveFonts } from "@ethercorps/sveltekit-og/fonts";

export const GET = async () => {
  const fonts = [
    new CustomFont("JetBrainsMono", () => read(fontSource).arrayBuffer(), { weight: 400 }),
  ];

  return new ImageResponse(
    OgProjects,
    {
      width: 1200,
      height: 630,
      fonts: await resolveFonts(fonts),
    },
    {
      projects: getLatestProjects(3).map(({ title, tech }) => ({ title, tech })),
    },
  );
};

export const prerender = true;
