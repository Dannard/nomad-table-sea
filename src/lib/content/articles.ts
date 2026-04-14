import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { articleFrontmatterSchema, type Article } from "@/lib/content/schema";
import { buildToc } from "@/lib/content/toc";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

async function loadArticleFromFile(fileName: string): Promise<Article> {
  const filePath = path.join(ARTICLES_DIR, fileName);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const parsed = articleFrontmatterSchema.parse(data);

  return {
    ...parsed,
    body: content,
    readingTime: readingTime(content).text,
    toc: buildToc(content),
    filePath,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  const mdxFiles = files.filter((item) => item.endsWith(".mdx"));
  const items = await Promise.all(mdxFiles.map((item) => loadArticleFromFile(item)));

  return items.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getAllArticles();
  return articles.find((item) => item.slug === slug);
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((item) => item.featured).slice(0, limit);
}

export async function getLatestArticles(limit = 6): Promise<Article[]> {
  const all = await getAllArticles();
  return all.slice(0, limit);
}

export async function getPopularArticles(limit = 6): Promise<Article[]> {
  const all = await getAllArticles();
  return [...all].sort((a, b) => b.popularScore - a.popularScore).slice(0, limit);
}

export async function getArticlesByCity(citySlug: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((item) => item.city === citySlug);
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((item) => item.categories.includes(categorySlug));
}

export async function getArticlesByTag(tagSlug: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((item) => item.tags.includes(tagSlug));
}

export async function getRelatedArticles(article: Article, limit = 4): Promise<Article[]> {
  const all = await getAllArticles();

  return all
    .filter((item) => item.slug !== article.slug)
    .map((item) => {
      let score = 0;

      if (item.city === article.city) {
        score += 3;
      }

      score += item.categories.filter((category) => article.categories.includes(category)).length * 2;
      score += item.tags.filter((tag) => article.tags.includes(tag)).length;

      return { item, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.item);
}

export type SearchDocument = {
  slug: string;
  title: string;
  excerpt: string;
  city: string;
  categories: string[];
  tags: string[];
  publishedAt: string;
};

export async function getSearchDocuments(): Promise<SearchDocument[]> {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    city: article.city,
    categories: article.categories,
    tags: article.tags,
    publishedAt: article.publishedAt,
  }));
}
