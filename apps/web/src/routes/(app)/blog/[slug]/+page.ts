import { getPostBySlug, getPostContext, getPosts } from "$lib/data/posts";
import { error } from "@sveltejs/kit";

export const prerender = true;

export async function entries() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function load({ params }) {
  try {
    const { previous, next, postNumber } = getPostContext(params.slug);
    const post = await import(`@posts/${postNumber}.${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata,
      cover: getPostBySlug(params.slug)?.cover ?? null,
      coverLight: getPostBySlug(params.slug)?.coverLight ?? null,
      slug: params.slug,
      previous,
      next,
    };
  } catch {
    throw error(404, `Post not found: ${params.slug}`);
  }
}
