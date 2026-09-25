export interface ExperienceMetadata {
  title: string;
  company: string;
  companyWebsite?: string;
  companyUrl?: string;
  /** Path under static/, e.g. "/logos/dev-up.svg". Falls back to the company's initial. */
  logo?: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  startDate: string;
  endDate: string | null;
  location: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  technologies: string[];
  published: boolean;
}

export interface Experience extends ExperienceMetadata {
  slug: string;
}

export function getExperiences(): Experience[] {
  const paths = import.meta.glob<{ metadata: ExperienceMetadata }>("/src/content/career/*.md", {
    eager: true,
  });

  const experiences: Experience[] = [];

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").pop()?.replace(".md", "") ?? "";

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata as ExperienceMetadata;

      if (metadata.published) {
        experiences.push({
          ...metadata,
          endDate: metadata.endDate ?? null,
          slug,
        });
      }
    }
  }

  return experiences.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
}

export function getLatestExperiences(count: number): Experience[] {
  return getExperiences().slice(0, count);
}

export function getAdjacentExperiences(slug: string): {
  previous: Experience | null;
  next: Experience | null;
} {
  const experiences = getExperiences();
  const index = experiences.findIndex((experience) => experience.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: experiences[index + 1] ?? null,
    next: experiences[index - 1] ?? null,
  };
}

export function getExperienceBySlug(slug: string): Experience | undefined {
  return getExperiences().find((e) => e.slug === slug);
}

export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const startStr = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const endStr = endDate
    ? end.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Present";

  return `${startStr} - ${endStr}`;
}

export function calculateDuration(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} mo${remainingMonths !== 1 ? "s" : ""}`;
  } else if (remainingMonths === 0) {
    return `${years} yr${years !== 1 ? "s" : ""}`;
  } else {
    return `${years} yr${years !== 1 ? "s" : ""} ${remainingMonths} mo${remainingMonths !== 1 ? "s" : ""}`;
  }
}
