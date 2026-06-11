import { getLatestPosts } from "$lib/data/posts";
import { getLatestProjects } from "$lib/data/projects";
import { client } from "$lib/orpc";
import type { ContributionData } from "$lib/types";

export const prerender = true;

export async function load({ url }) {
  // Await instead of streaming: the page is prerendered, so streaming
  // only produces a late inline script that the CSP blocks.
  let githubContributions: ContributionData | null = null;
  try {
    githubContributions = await client.github.contributions({ year: 2025 });
  } catch {
    githubContributions = null;
  }

  return {
    featuredProjects: getLatestProjects(2),
    latestPosts: getLatestPosts(2),
    githubContributions,
    year: 2025,
    origin: url.origin,
  };
}
