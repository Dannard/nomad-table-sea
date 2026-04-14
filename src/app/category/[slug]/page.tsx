import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleList } from "@/components/article/article-list";
import { SectionHeading } from "@/components/sections/section-heading";
import { getArticlesByCategory } from "@/lib/content/articles";
import { absoluteUrl } from "@/lib/content/seo";
import { categories, categoriesBySlug } from "@/lib/content/taxonomy";

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoriesBySlug.get(slug);

  if (!category) return {};

  return {
    title: `${category.name} Guides`,
    description: category.description,
    alternates: {
      canonical: absoluteUrl(`/category/${category.slug}`),
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoriesBySlug.get(slug);

  if (!category) notFound();

  const articles = await getArticlesByCategory(slug);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Category" title={category.name} description={category.description} />
      <div className="mt-8">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
