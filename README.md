# Nomad Table SEA

Nomad Table SEA is an editorial, SEO-focused food guide platform for digital nomads living in or traveling across Southeast Asia.

The site is designed for high discoverability and strong browsing depth: readers can navigate by city, category, and tag, then move naturally into related guides through internal linking.

## Live Site

- https://nomad-table-sea.vercel.app

## Core Pages

- Home
- City pages (`/city/[slug]`)
- Category pages (`/category/[slug]`)
- Tag pages (`/tag/[slug]`)
- Article pages (`/guides/[slug]`)
- Search (`/search`)
- About (`/about`)
- Newsletter (`/newsletter`)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- MDX content files
- Zod schema validation
- Fuse.js search
- OpenStreetMap embeds for map context

## Project Structure

```text
content/articles/        # MDX editorial content
src/app/                 # Routes and page entry points
src/components/          # Reusable UI and section components
src/lib/content/         # Content schema, loaders, taxonomy, SEO helpers
src/lib/newsletter/      # Newsletter provider abstraction
tests/                   # Content and integration-oriented tests
```

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill values as needed:

- `NEXT_PUBLIC_SITE_URL`
- `NEWSLETTER_PROVIDER` (`brevo` or `buttondown`)
- `BREVO_API_KEY`
- `BREVO_LIST_ID`
- `BUTTONDOWN_API_KEY`

No API keys are committed in this repository.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```
