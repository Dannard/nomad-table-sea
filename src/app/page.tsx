import Link from "next/link";

import { ArticleList } from "@/components/article/article-list";
import { HomeHero } from "@/components/sections/home-hero";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ScrollParallax } from "@/components/shared/scroll-parallax";
import { getFeaturedArticles, getLatestArticles, getPopularArticles } from "@/lib/content/articles";
import { categories, cities } from "@/lib/content/taxonomy";

export default async function HomePage() {
  const [featuredArticles, latestArticles, popularArticles] = await Promise.all([
    getFeaturedArticles(1),
    getLatestArticles(6),
    getPopularArticles(4),
  ]);

  const featured = featuredArticles[0] ?? latestArticles[0];

  return (
    <div>
      {featured ? <HomeHero featured={featured} /> : null}

      <ScrollParallax speed={0.08}>
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Browse"
              title="Start from city rhythm or food intent"
              description="Move through city hubs and topic routes designed for fast scanning and meaningful internal linking."
            />
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal delay={60}>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Cities</p>
                <ul className="mt-6 space-y-2">
                  {cities.map((city, index) => (
                    <li key={city.slug}>
                      <Link href={`/city/${city.slug}`} className="group flex items-baseline justify-between border-b border-[var(--line)] py-3">
                        <span className="font-display text-2xl text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                          {city.name}
                        </span>
                        <span className="text-xs text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Topics</p>
                <ul className="mt-6 space-y-2">
                  {categories.map((category, index) => (
                    <li key={category.slug}>
                      <Link href={`/category/${category.slug}`} className="group flex items-baseline justify-between border-b border-[var(--line)] py-3">
                        <span className="font-display text-2xl text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                          {category.name}
                        </span>
                        <span className="text-xs text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </ScrollParallax>

      <ScrollParallax speed={0.06}>
        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Latest"
              title="Fresh neighborhood guides"
              description="New editorial drops focused on practical routes for remote-work schedules."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-6">
              <ArticleList articles={latestArticles} />
            </div>
          </Reveal>
        </section>
      </ScrollParallax>

      <ScrollParallax speed={0.07}>
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Popular"
              title="Most read this month"
              description="Guides readers keep returning to for daily routines and better local picks."
            />
          </Reveal>
          <div className="mt-9 grid gap-7 md:grid-cols-2">
            {popularArticles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 110} y={20} scale={0.99}>
                <article className="group border-b border-[var(--line)] pb-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Top {String(index + 1).padStart(2, "0")}</p>
                  <Link href={`/guides/${article.slug}`} className="mt-2 inline-block font-display text-[2rem] leading-tight text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {article.title}
                  </Link>
                  <p className="mt-3 max-w-[56ch] text-[var(--muted)]">{article.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </ScrollParallax>

      <ScrollParallax speed={0.1}>
        <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
          <Reveal>
            <div className="surface-grain relative overflow-hidden rounded-3xl border border-[var(--line-strong)] bg-[var(--paper-strong)] p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[var(--accent)]/14 blur-2xl transition-transform duration-700 hover:scale-110" />
              <div className="pointer-events-none absolute -bottom-28 -left-16 h-52 w-52 rounded-full bg-[var(--ink)]/6 blur-2xl" />
              <SectionHeading
                eyebrow="Newsletter"
                title="One useful food route in your inbox every week"
                description="New guides, city updates, and practical recommendations you can use immediately."
              />
              <div className="relative mt-8">
                <NewsletterForm />
              </div>
            </div>
          </Reveal>
        </section>
      </ScrollParallax>
    </div>
  );
}
