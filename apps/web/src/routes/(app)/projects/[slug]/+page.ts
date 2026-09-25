import { getAdjacentProjects, getProjects } from "$lib/data/projects";
import { error } from "@sveltejs/kit";

export const prerender = true;

export function entries() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function load({ params, url }) {
  try {
    const post = await import(`@projects/${params.slug}.md`);

    const { previous, next } = getAdjacentProjects(params.slug);

    return {
      content: post.default,
      meta: post.metadata,
      slug: params.slug,
      origin: url.origin,
      previous,
      next,
    };
  } catch {
    throw error(404, `Project not found: ${params.slug}`);
  }
}
