import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-3xl text-[var(--ink)]">Nomad Table SEA</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">
            Editorial city guides for digital nomads who plan their days around strong meals, neighborhood rhythm, and reliable work stops.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--ink)]">
            <li>
              <Link href="/search" className="hover:text-[var(--accent)]">
                Search guides
              </Link>
            </li>
            <li>
              <Link href="/newsletter" className="hover:text-[var(--accent)]">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">Focus</p>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Cafes worth opening a laptop in, cheap eats worth repeating, and local dishes worth crossing neighborhoods for.
          </p>
        </div>
      </div>
    </footer>
  );
}
