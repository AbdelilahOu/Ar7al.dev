import { getLatestExperiences } from "$lib/data/experiences";
import { getLatestPosts } from "$lib/data/posts";
import { getLatestProjects } from "$lib/data/projects";
import { client } from "$lib/orpc";
import type { ContributionData } from "$lib/types";

export const prerender = true;

export async function load({ url }) {
  // Await instead of streaming: the page is prerendered, so streaming
  // only produces a late inline script that the CSP blocks.
  const year = new Date().getFullYear();
  let githubContributions: ContributionData | null = null;
  try {
    githubContributions = await client.github.contributions({ year });
  } catch {
    githubContributions = null;
  }

  return {
    experiences: getLatestExperiences(2),
    featuredProjects: getLatestProjects(2),
    latestPosts: getLatestPosts(2),
    githubContributions,
    year,
    origin: url.origin,
  };
}
