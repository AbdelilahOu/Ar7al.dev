import { read } from "$app/server";
import fontSource from "$lib/assets/fonts/JetBrainsMono-Regular.ttf";
import OgCareer from "$lib/components/og/OgCareer.svelte";
import { formatDateRange, getExperiences } from "$lib/data/experiences";
import { ImageResponse } from "@ethercorps/sveltekit-og";
import { CustomFont, resolveFonts } from "@ethercorps/sveltekit-og/fonts";

export const GET = async () => {
  const fonts = [
    new CustomFont("JetBrainsMono", () => read(fontSource).arrayBuffer(), { weight: 400 }),
  ];

  return new ImageResponse(
    OgCareer,
    {
      width: 1200,
      height: 630,
      fonts: await resolveFonts(fonts),
    },
    {
      roles: getExperiences().map((e) => ({
        company: e.company,
        title: e.title,
        dates: formatDateRange(e.startDate, e.endDate),
        logo: e.logo,
      })),
    },
  );
};

export const prerender = true;
