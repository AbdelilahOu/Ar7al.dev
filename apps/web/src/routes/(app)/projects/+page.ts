import { getProjects } from "$lib/data/projects";

export const prerender = true;

export function load() {
  return { projects: getProjects() };
}
