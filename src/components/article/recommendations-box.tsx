import type { Recommendation } from "@/lib/content/schema";

type RecommendationsBoxProps = {
  items: Recommendation[];
};

export function RecommendationsBox({ items }: RecommendationsBoxProps) {
  if (!items.length) return null;

  return (
    <section className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Quick picks</p>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.name}>
            <p className="font-semibold text-[var(--ink)]">{item.name}</p>
            <p className="text-sm text-[var(--muted)]">
              {item.area} · {item.priceRange} · {item.bestFor}
            </p>
            <p className="mt-1 text-sm text-[var(--ink)]/85">{item.notes}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
