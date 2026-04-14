import Link from "next/link";

import type { Article } from "@/lib/content/schema";

type RelatedPostsProps = {
  posts: Article[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-14 border-t border-[var(--line)] pt-8">
      <h2 className="font-display text-3xl text-[var(--ink)]">Related reads</h2>
      <ul className="mt-5 space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/guides/${post.slug}`} className="text-lg text-[var(--ink)] hover:text-[var(--accent)]">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
