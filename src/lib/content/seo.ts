export const siteConfig = {
  name: "Nomad Table SEA",
  description:
    "Food guides for digital nomads across Southeast Asia, from laptop-friendly cafes to local late-night favorites.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nomad-table-sea.vercel.app").replace(
    /\/$/,
    "",
  ),
};

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) {
    return `${siteConfig.url}/${path}`;
  }

  return `${siteConfig.url}${path}`;
}
