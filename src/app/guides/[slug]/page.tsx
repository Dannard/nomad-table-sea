import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { RecommendationsBox } from "@/components/article/recommendations-box";
import { RelatedPosts } from "@/components/article/related-posts";
import { ArticleToc } from "@/components/article/toc";
import { JsonLd } from "@/components/shared/json-ld";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/content/articles";
import { absoluteUrl } from "@/lib/content/seo";
import { citiesBySlug } from "@/lib/content/taxonomy";
import { getMdxComponents } from "@/mdx-components";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: absoluteUrl(`/guides/${article.slug}`),
    },
    openGraph: {
      type: "article",
      images: [{ url: article.heroImage }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const { content } = await compileMDX({
    source: article.body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
      },
    },
    components: getMdxComponents({}),
  });

  const related = await getRelatedArticles(article);
  const city = citiesBySlug.get(article.city);

  return (
    <article>
      <section className="relative isolate h-[55svh] overflow-hidden">
        <img src={article.heroImage} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(7,9,12,0.82),rgba(7,9,12,0.28)_50%,rgba(7,9,12,0.76))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">{city?.name ?? article.city}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-white sm:text-6xl">{article.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">{article.excerpt}</p>
          <p className="mt-4 text-sm text-white/70">
            Published {new Date(article.publishedAt).toLocaleDateString()} · {article.readingTime}
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <ArticleToc items={article.toc} />
        <div>
          <div className="mb-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {article.categories.map((category) => (
              <Link key={category} href={`/category/${category}`} className="rounded-full border border-[var(--line)] px-3 py-1 hover:text-[var(--accent)]">
                {category.replaceAll("-", " ")}
              </Link>
            ))}
            {article.tags.map((tag) => (
              <Link key={tag} href={`/tag/${tag}`} className="rounded-full border border-[var(--line)] px-3 py-1 hover:text-[var(--accent)]">
                {tag.replaceAll("-", " ")}
              </Link>
            ))}
          </div>

          <div className="article-content">{content}</div>

          <RecommendationsBox items={article.recommendations} />
          <RelatedPosts posts={related} />
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          image: [article.heroImage],
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
          mainEntityOfPage: absoluteUrl(`/guides/${article.slug}`),
          author: {
            "@type": "Organization",
            name: "Nomad Table SEA",
          },
          publisher: {
            "@type": "Organization",
            name: "Nomad Table SEA",
          },
        }}
      />
    </article>
  );
}
