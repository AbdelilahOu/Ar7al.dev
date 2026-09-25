import { read } from "$app/server";
import fontSource from "$lib/assets/fonts/JetBrainsMono-Regular.ttf";
import OgBlog from "$lib/components/og/OgBlog.svelte";
import { getPosts } from "$lib/data/posts";
import { ImageResponse } from "@ethercorps/sveltekit-og";
import { CustomFont, resolveFonts } from "@ethercorps/sveltekit-og/fonts";

const fontData = read(fontSource).arrayBuffer();

export const GET = async ({ params }) => {
  try {
    const post = await import(`@posts/${params.slug}.md`);
    const meta = post.metadata;

    const fonts = [new CustomFont("JetBrainsMono", fontData, { weight: 400 })];

    return new ImageResponse(
      OgBlog,
      {
        width: 1200,
        height: 630,
        fonts: await resolveFonts(fonts),
      },
      {
        title: meta.title || "",
        description: meta.description || "",
        date: meta.date || "",
        tags: meta.tags || [],
      },
    );
  } catch (e) {
    console.log(e);
    return new Response("Not found", { status: 404 });
  }
};

export async function entries() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const prerender = true;
