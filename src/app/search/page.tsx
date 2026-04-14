import type { Metadata } from "next";

import { SearchClient } from "@/components/search/search-client";
import { getSearchDocuments } from "@/lib/content/articles";
import { absoluteUrl } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: "Search",
  description: "Search food and cafe guides by city, category, and tags.",
  alternates: {
    canonical: absoluteUrl("/search"),
  },
};

export default async function SearchPage() {
  const docs = await getSearchDocuments();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Search</p>
      <h1 className="mt-4 font-display text-5xl leading-tight text-[var(--ink)]">Find your next food stop fast</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">Search by city, dish type, neighborhood, or workday need.</p>
      <div className="mt-10">
        <SearchClient docs={docs} />
      </div>
    </div>
  );
}
