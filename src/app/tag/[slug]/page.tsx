import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleList } from "@/components/article/article-list";
import { SectionHeading } from "@/components/sections/section-heading";
import { getArticlesByTag } from "@/lib/content/articles";
import { absoluteUrl } from "@/lib/content/seo";
import { tags, tagsBySlug } from "@/lib/content/taxonomy";

export async function generateStaticParams() {
  return tags.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = tagsBySlug.get(slug);

  if (!tag) return {};

  return {
    title: `${tag.name} Guides`,
    description: tag.description,
    alternates: {
      canonical: absoluteUrl(`/tag/${tag.slug}`),
    },
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = tagsBySlug.get(slug);

  if (!tag) notFound();

  const articles = await getArticlesByTag(slug);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Tag" title={tag.name} description={tag.description} />
      <div className="mt-8">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
