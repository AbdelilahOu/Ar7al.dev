import { getExperiences } from "$lib/data/experiences";
import { getPosts } from "$lib/data/posts";
import { getProjects } from "$lib/data/projects";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc: string, lastmod?: string): string {
  const locTag = `<loc>${escapeXml(loc)}</loc>`;
  const lastmodTag = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "";
  return `<url>${locTag}${lastmodTag}</url>`;
}

function normalizeLastmod(value?: string | null): string | undefined {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
  if (/^\d{4}$/.test(value)) return `${value}-01-01`;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

function latestDate(dates: (string | undefined)[]): string | undefined {
  const valid = dates.filter((date): date is string => Boolean(date)).sort();
  return valid.at(-1);
}

export async function GET({ url }) {
  const origin = url.origin;
  const posts = getPosts();
  const projects = getProjects();
  const experiences = getExperiences();

  const latestPost = latestDate(posts.map((post) => normalizeLastmod(post.date)));
  const latestProject = latestDate(projects.map((project) => normalizeLastmod(project.createdAt)));
  const latestExperience = latestDate(
    experiences.map((experience) => normalizeLastmod(experience.endDate ?? experience.startDate))
  );

  const urls: string[] = [];

  urls.push(urlEntry(`${origin}/`, latestDate([latestPost, latestProject, latestExperience])));
  urls.push(urlEntry(`${origin}/blog`, latestPost));
  urls.push(urlEntry(`${origin}/projects`, latestProject));
  urls.push(urlEntry(`${origin}/career`, latestExperience));

  for (const post of posts) {
    urls.push(urlEntry(`${origin}/blog/${post.slug}`, normalizeLastmod(post.date)));
  }

  for (const project of projects) {
    urls.push(urlEntry(`${origin}/projects/${project.slug}`, normalizeLastmod(project.createdAt)));
  }

  for (const experience of experiences) {
    const lastmod = experience.endDate ?? experience.startDate;
    urls.push(urlEntry(`${origin}/career/${experience.slug}`, normalizeLastmod(lastmod)));
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.join("") +
    `</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

export const prerender = true;
