"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

import type { SearchDocument } from "@/lib/content/articles";
import { Input } from "@/components/ui/input";

type SearchClientProps = {
  docs: SearchDocument[];
};

export function SearchClient({ docs }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        threshold: 0.32,
        keys: [
          { name: "title", weight: 0.5 },
          { name: "tags", weight: 0.2 },
          { name: "categories", weight: 0.2 },
          { name: "excerpt", weight: 0.1 },
        ],
      }),
    [docs],
  );

  const results = query.trim() ? fuse.search(query).map((item) => item.item) : docs;

  return (
    <div>
      <Input
        aria-label="Search guides"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by city, dish, neighborhood, or category"
      />

      <ul className="mt-8 divide-y divide-[var(--line)]">
        {results.map((item) => (
          <li key={item.slug} className="py-4">
            <Link href={`/guides/${item.slug}`} className="font-display text-2xl leading-tight text-[var(--ink)] hover:text-[var(--accent)]">
              {item.title}
            </Link>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.excerpt}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              {item.city.replaceAll("-", " ")} · {new Date(item.publishedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
