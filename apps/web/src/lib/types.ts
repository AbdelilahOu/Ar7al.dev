import type { Picture } from "@sveltejs/enhanced-img";

export interface Post {
  title: string;
  slug: string;
  description: string;
  image?: string;
  imageAlt?: string;
  cover: Picture | null;
  coverLight: Picture | null;
  seoDescription?: string;
  seoKeywords?: string[];
  date: string;
  tags: string[];
  published: boolean;
  postNumber: string;
}

export interface PostMetadata {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  date: string;
  tags: string[];
  published: boolean;
}

export interface ContributionData {
  cal: {
    [key: string]: {
      github: number;
    };
  };
  totalGH: number;
}

export interface GitHubGraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number;
              date: string;
            }>;
          }>;
        };
      };
    };
  };
}
