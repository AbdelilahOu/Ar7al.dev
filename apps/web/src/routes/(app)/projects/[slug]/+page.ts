import { getAdjacentProjects, getProjectBySlug, getProjects } from "$lib/data/projects";
import { error } from "@sveltejs/kit";

export const prerender = true;

export function entries() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function load({ params }) {
  try {
    const project = await import(`@projects/${params.slug}.md`);

    const { previous, next } = getAdjacentProjects(params.slug);

    return {
      content: project.default,
      meta: project.metadata,
      cover: getProjectBySlug(params.slug)?.cover ?? null,
      coverLight: getProjectBySlug(params.slug)?.coverLight ?? null,
      slug: params.slug,
      previous,
      next,
    };
  } catch {
    throw error(404, `Project not found: ${params.slug}`);
  }
}
