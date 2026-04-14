import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: "About",
  description: "Editorial mission and publishing approach for Nomad Table SEA.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">About</p>
      <h1 className="mt-4 font-display text-5xl leading-tight text-[var(--ink)]">Food-first city guides for nomad life in Southeast Asia</h1>
      <div className="prose prose-zinc mt-8 max-w-none text-lg leading-8 text-[var(--ink)]/90">
        <p>
          Nomad Table SEA publishes practical food recommendations for people working remotely while living in or moving through Southeast Asia.
        </p>
        <p>
          The editorial focus is simple: places that are actually useful in real routines. That includes laptop-friendly cafes, cheap local meals that hold up on repeat visits, and neighborhood routes that make daily decisions easier.
        </p>
        <p>
          Every guide is structured for fast scanning, strong internal linking, and city-level browsing so readers can move from one useful article to the next.
        </p>
      </div>
    </div>
  );
}
