import Link from "next/link";

import type { Article } from "@/lib/content/schema";
import { citiesBySlug } from "@/lib/content/taxonomy";

type HomeHeroProps = {
  featured: Article;
};

export function HomeHero({ featured }: HomeHeroProps) {
  const cityName = citiesBySlug.get(featured.city)?.name ?? featured.city;

  return (
    <section className="relative isolate min-h-[94svh] overflow-hidden text-white">
      <img
        src={featured.heroImage}
        alt={featured.title}
        className="absolute inset-0 h-full w-full animate-[drift_6s_ease-in-out_infinite_alternate] object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(116deg,rgba(9,8,7,0.84),rgba(9,8,7,0.48)_50%,rgba(9,8,7,0.78))]" />

      <div className="relative mx-auto flex min-h-[94svh] w-full max-w-6xl items-end px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_270px] lg:items-end">
          <div className="max-w-3xl animate-[rise_700ms_ease-out_both]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/72">Nomad Table SEA</p>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5.6vw,4.8rem)] leading-[1.02]">
              Food guides for digital nomads eating their way through Southeast Asia.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88">
              From laptop-friendly cafes to late-night local spots, find places worth trying in each city.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={`/guides/${featured.slug}`}
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--accent-strong)]"
              >
                Read featured guide
              </Link>
              <Link
                href="/search"
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:border-white"
              >
                Browse all guides
              </Link>
            </div>
          </div>

          <aside className="surface-grain relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/70">Now featured</p>
            <p className="mt-3 font-display text-2xl leading-tight text-white">{featured.title}</p>
            <p className="mt-4 text-sm leading-6 text-white/82">{featured.excerpt}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/66">{cityName} · {featured.readingTime}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
