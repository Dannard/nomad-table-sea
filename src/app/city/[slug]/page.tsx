import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleList } from "@/components/article/article-list";
import { SectionHeading } from "@/components/sections/section-heading";
import { JsonLd } from "@/components/shared/json-ld";
import { getAllArticles, getArticlesByCity } from "@/lib/content/articles";
import { absoluteUrl } from "@/lib/content/seo";
import { cities, citiesBySlug } from "@/lib/content/taxonomy";

import { CityMap } from "@/components/city/city-map";

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug.get(slug);

  if (!city) {
    return {};
  }

  return {
    title: `${city.name} Food Guides`,
    description: city.intro,
    alternates: {
      canonical: absoluteUrl(`/city/${city.slug}`),
    },
    openGraph: {
      images: [{ url: city.heroImage }],
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = citiesBySlug.get(slug);

  if (!city) {
    notFound();
  }

  const articles = await getArticlesByCity(slug);
  const cafeArticles = articles.filter((item) => item.categories.includes("best-cafes"));
  const cheapArticles = articles.filter((item) => item.categories.includes("cheap-eats"));
  const locations = articles.flatMap((article) => article.recommendations);
  const allArticles = await getAllArticles();
  const related = allArticles.filter((article) => article.city !== slug).slice(0, 4);

  return (
    <div className="pb-16">
      <section className="relative isolate overflow-hidden">
        <img src={city.heroImage} alt={city.name} className="h-[55svh] w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,9,12,0.8),rgba(7,9,12,0.35))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">City guide</p>
          <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">{city.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{city.intro}</p>
        </div>
      </section>

      <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Featured food guides" description={`Core routes and food picks across ${city.name}.`} />
        <div className="mt-6">
          <ArticleList articles={articles} />
        </div>
      </div>

      <div className="mx-auto mt-14 grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section>
          <SectionHeading title="Best cafes" />
          <div className="mt-5 space-y-4">
            {cafeArticles.map((article) => (
              <Link key={article.slug} href={`/guides/${article.slug}`} className="block border-b border-[var(--line)] pb-4 text-lg hover:text-[var(--accent)]">
                {article.title}
              </Link>
            ))}
          </div>
        </section>
        <section>
          <SectionHeading title="Cheap eats" />
          <div className="mt-5 space-y-4">
            {cheapArticles.map((article) => (
              <Link key={article.slug} href={`/guides/${article.slug}`} className="block border-b border-[var(--line)] pb-4 text-lg hover:text-[var(--accent)]">
                {article.title}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Map-friendly picks" description="Quick visual planning for your next meal stop." />
        <div className="mt-6">
          <CityMap center={city.mapCenter} places={locations} />
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Related reads" description="Continue exploring food neighborhoods across Southeast Asia." />
        <div className="mt-5 space-y-4">
          {related.map((item) => (
            <Link key={item.slug} href={`/guides/${item.slug}`} className="block border-b border-[var(--line)] pb-4 text-lg hover:text-[var(--accent)]">
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${city.name} Food Guides`,
          url: absoluteUrl(`/city/${city.slug}`),
          about: city.name,
          hasPart: articles.map((article) => ({
            "@type": "Article",
            headline: article.title,
            url: absoluteUrl(`/guides/${article.slug}`),
          })),
        }}
      />
    </div>
  );
}
