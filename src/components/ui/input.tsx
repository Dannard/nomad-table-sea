import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-full border border-[var(--line)] bg-white/88 px-5 py-2.5 text-sm text-[var(--ink-soft)] placeholder:text-[var(--muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        className,
      )}
      {...props}
    />
  );
}
