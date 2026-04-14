import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50svh] w-full max-w-3xl flex-col items-start justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">404</p>
      <h1 className="mt-4 font-display text-5xl text-[var(--ink)]">Page not found</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">The page you requested is unavailable or has been moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]">
        Back to homepage
      </Link>
    </div>
  );
}
