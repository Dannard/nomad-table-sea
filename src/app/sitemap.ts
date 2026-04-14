import type { MetadataRoute } from "next";

import { getAllArticles } from "@/lib/content/articles";
import { siteConfig } from "@/lib/content/seo";
import { categories, cities, tags } from "@/lib/content/taxonomy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const staticPages = ["", "/about", "/newsletter", "/search"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const articlePages = articles.map((article) => ({
    url: `${siteConfig.url}/guides/${article.slug}`,
    lastModified: article.updatedAt ?? article.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const cityPages = cities.map((city) => ({
    url: `${siteConfig.url}/city/${city.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${siteConfig.url}/category/${category.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tagPages = tags.map((tag) => ({
    url: `${siteConfig.url}/tag/${tag.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...articlePages, ...cityPages, ...categoryPages, ...tagPages];
}
