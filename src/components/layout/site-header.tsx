import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Newsletter" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[rgba(17,15,14,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl tracking-tight text-white sm:text-2xl">
          Nomad Table SEA
        </Link>
        <nav className="flex items-center gap-4 text-sm text-white/84 sm:gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="group relative py-1 transition-colors hover:text-white">
              <span>{item.label}</span>
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
