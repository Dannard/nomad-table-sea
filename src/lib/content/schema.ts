import { z } from "zod";

export const citySchema = z.object({
  slug: z.string(),
  name: z.string(),
  intro: z.string(),
  heroImage: z.string(),
  mapCenter: z.object({
    lat: z.number(),
    lng: z.number(),
    zoom: z.number(),
  }),
});

export const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
});

export const tagSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
});

export const recommendationSchema = z.object({
  name: z.string(),
  area: z.string(),
  priceRange: z.string(),
  bestFor: z.string(),
  notes: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  city: z.string(),
  categories: z.array(z.string()).min(1),
  tags: z.array(z.string()).min(1),
  heroImage: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  featured: z.boolean().default(false),
  popularScore: z.number().default(0),
  recommendations: z.array(recommendationSchema).default([]),
});

export type City = z.infer<typeof citySchema>;
export type Category = z.infer<typeof categorySchema>;
export type Tag = z.infer<typeof tagSchema>;
export type Recommendation = z.infer<typeof recommendationSchema>;
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Article = ArticleFrontmatter & {
  body: string;
  readingTime: string;
  toc: TocItem[];
  filePath: string;
};
