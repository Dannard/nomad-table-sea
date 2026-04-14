import Link from "next/link";

import type { Article } from "@/lib/content/schema";
import { citiesBySlug } from "@/lib/content/taxonomy";

type ArticleListProps = {
  articles: Article[];
};

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {articles.map((article, index) => (
        <li key={article.slug} className="group grid gap-5 py-7 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-6">
          <div className="font-display text-3xl text-[var(--line-strong)]">{String(index + 1).padStart(2, "0")}</div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              {citiesBySlug.get(article.city)?.name ?? article.city} · {article.readingTime}
            </p>
            <Link
              href={`/guides/${article.slug}`}
              className="mt-2 inline-block font-display text-3xl leading-[1.08] text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]"
            >
              {article.title}
            </Link>
            <p className="mt-3 max-w-[66ch] text-[var(--muted)]">{article.excerpt}</p>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
