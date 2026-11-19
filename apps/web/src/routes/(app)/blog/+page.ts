import { getPosts } from "$lib/data/posts";

export const prerender = true;

export async function load() {
  const posts = await getPosts();
  return { posts };
}
