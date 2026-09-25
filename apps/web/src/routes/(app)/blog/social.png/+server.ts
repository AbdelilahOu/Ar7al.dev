import { read } from "$app/server";
import fontSource from "$lib/assets/fonts/JetBrainsMono-Regular.ttf";
import OgBlogList from "$lib/components/og/OgBlogList.svelte";
import { getLatestPosts } from "$lib/data/posts";
import { ImageResponse } from "@ethercorps/sveltekit-og";
import { CustomFont, resolveFonts } from "@ethercorps/sveltekit-og/fonts";

export const GET = async () => {
  const fonts = [
    new CustomFont("JetBrainsMono", () => read(fontSource).arrayBuffer(), { weight: 400 }),
  ];

  return new ImageResponse(
    OgBlogList,
    {
      width: 1200,
      height: 630,
      fonts: await resolveFonts(fonts),
    },
    {
      posts: getLatestPosts(3).map(({ title, date }) => ({ title, date })),
    },
  );
};

export const prerender = true;
