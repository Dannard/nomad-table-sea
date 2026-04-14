import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { siteConfig } from "@/lib/content/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Nomad Table SEA",
    template: "%s | Nomad Table SEA",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title: "Nomad Table SEA",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Nomad Table SEA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomad Table SEA",
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
        <SiteHeader />
        <ScrollProgress />
        <main className="pt-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
