import type { TocItem } from "@/lib/content/schema";

type TocProps = {
  items: TocItem[];
};

export function ArticleToc({ items }: TocProps) {
  if (!items.length) return null;

  return (
    <aside className="rounded-2xl border border-[var(--line)] bg-white/80 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">On this page</p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--ink)]">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a href={`#${item.id}`} className="hover:text-[var(--accent)]">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
