import { read } from "$app/server";
import fontSource from "$lib/assets/fonts/JetBrainsMono-Regular.ttf";
import OgExperience from "$lib/components/og/OgExperience.svelte";
import {
  calculateDuration,
  formatDateRange,
  getExperienceBySlug,
  getExperiences,
} from "$lib/data/experiences";
import { ImageResponse } from "@ethercorps/sveltekit-og";
import { CustomFont, resolveFonts } from "@ethercorps/sveltekit-og/fonts";

const fontData = read(fontSource).arrayBuffer();

export const GET = async ({ params }) => {
  const experience = getExperienceBySlug(params.slug);

  if (!experience) {
    return new Response("Not found", { status: 404 });
  }

  const fonts = [new CustomFont("JetBrainsMono", fontData, { weight: 400 })];

  return new ImageResponse(
    OgExperience,
    {
      width: 1200,
      height: 630,
      fonts: await resolveFonts(fonts),
    },
    {
      title: experience.title,
      company: experience.company,
      description: experience.description,
      technologies: experience.technologies || [],
      logo: experience.logo,
      meta: [
        formatDateRange(experience.startDate, experience.endDate),
        calculateDuration(experience.startDate, experience.endDate),
        experience.locationType,
        experience.location,
      ].join(" · "),
    },
  );
};

export function entries() {
  return getExperiences().map((e) => ({ slug: e.slug }));
}

export const prerender = true;
