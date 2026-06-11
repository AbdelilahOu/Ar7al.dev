import { getPosts } from "$lib/data/posts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET({ url }) {
  const origin = url.origin;
  const posts = getPosts();

  const items = posts
    .map((post) => {
      const link = `${origin}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");
      return (
        `<item>` +
        `<title>${escapeXml(post.title)}</title>` +
        `<link>${escapeXml(link)}</link>` +
        `<guid isPermaLink="true">${escapeXml(link)}</guid>` +
        `<description>${escapeXml(post.description)}</description>` +
        `<pubDate>${pubDate}</pubDate>` +
        categories +
        `</item>`
      );
    })
    .join("");

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">` +
    `<channel>` +
    `<title>Abdelilah Ouaadouch's Blog</title>` +
    `<link>${escapeXml(`${origin}/blog`)}</link>` +
    `<description>Technical articles about Go, Rust, TypeScript, and fullstack development.</description>` +
    `<language>en</language>` +
    `<atom:link href="${escapeXml(`${origin}/rss.xml`)}" rel="self" type="application/rss+xml"/>` +
    items +
    `</channel>` +
    `</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

export const prerender = true;
