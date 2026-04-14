import type { MDXComponents } from "mdx/types";

export function getMdxComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-10 font-display text-3xl leading-tight text-[var(--ink)]" {...props} />,
    h3: (props) => <h3 className="mt-8 text-xl font-semibold text-[var(--ink)]" {...props} />,
    p: (props) => <p className="mt-4 text-lg leading-8 text-[var(--ink)]/90" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-[var(--ink)]/90" {...props} />,
    strong: (props) => <strong className="font-semibold text-[var(--ink)]" {...props} />,
    ...components,
  };
}
