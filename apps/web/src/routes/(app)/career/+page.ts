import { getExperiences } from "$lib/data/experiences";

export const prerender = true;

export function load() {
  return { experiences: getExperiences() };
}
