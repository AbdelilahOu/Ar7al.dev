import { getAdjacentExperiences, getExperiences } from "$lib/data/experiences";
import { error } from "@sveltejs/kit";

export const prerender = true;

export function entries() {
  return getExperiences().map((e) => ({ slug: e.slug }));
}

export async function load({ params, url }) {
  try {
    const post = await import(`@career/${params.slug}.md`);

    const { previous, next } = getAdjacentExperiences(params.slug);

    return {
      content: post.default,
      meta: post.metadata,
      slug: params.slug,
      origin: url.origin,
      previous,
      next,
    };
  } catch {
    throw error(404, `Experience not found: ${params.slug}`);
  }
}
