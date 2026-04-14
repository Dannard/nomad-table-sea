type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06] text-[var(--ink)]">{title}</h2>
      {description ? <p className="mt-5 max-w-[62ch] text-base leading-8 text-[var(--muted)] sm:text-lg">{description}</p> : null}
    </div>
  );
}
