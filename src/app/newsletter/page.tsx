import type { Metadata } from "next";

import { NewsletterForm } from "@/components/sections/newsletter-form";
import { absoluteUrl } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe for weekly food and cafe recommendations across Southeast Asia.",
  alternates: {
    canonical: absoluteUrl("/newsletter"),
  },
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Newsletter</p>
      <h1 className="mt-4 font-display text-5xl leading-tight text-[var(--ink)]">Weekly food routes for digital nomads</h1>
      <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
        Get new city guides, useful neighborhood picks, and practical cafe recommendations in one short weekly email.
      </p>
      <div className="mt-10">
        <NewsletterForm />
      </div>
    </div>
  );
}
