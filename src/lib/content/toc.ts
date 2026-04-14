import type { TocItem } from "@/lib/content/schema";

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export function buildToc(mdx: string): TocItem[] {
  const lines = mdx.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    if (!line.startsWith("##") || line.startsWith("####")) {
      continue;
    }

    const level = line.startsWith("###") ? 3 : 2;
    const text = line.replace(/^###?\s+/, "").trim();

    if (!text) {
      continue;
    }

    items.push({ id: slugify(text), text, level });
  }

  return items;
}
