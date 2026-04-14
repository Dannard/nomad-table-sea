import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full border border-transparent px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const sharedTone =
  "bg-[var(--accent)] text-white shadow-[0_8px_24px_rgba(143,52,24,0.22)] hover:bg-[var(--accent-strong)] focus-visible:ring-[var(--accent)]";

export function Button({ children, className, href, type = "button", onClick }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn(baseClassName, sharedTone, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cn(baseClassName, sharedTone, className)}>
      {children}
    </button>
  );
}
