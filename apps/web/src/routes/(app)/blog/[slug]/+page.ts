import { getAdjacentPosts, getPosts } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const prerender = true;

export async function entries() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function load({ params, url }) {
  try {
    const post = await import(`@posts/${params.slug}.md`);
    const { previous, next } = getAdjacentPosts(params.slug);

    return {
      content: post.default,
      meta: post.metadata,
      slug: params.slug,
      origin: url.origin,
      previous,
      next,
    };
  } catch {
    throw error(404, `Post not found: ${params.slug}`);
  }
}
