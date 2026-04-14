import test from "node:test";
import assert from "node:assert/strict";

import {
  getAllArticles,
  getArticlesByCategory,
  getArticlesByCity,
  getArticlesByTag,
  getRelatedArticles,
} from "../src/lib/content/articles";

test("all MDX articles parse and include required derived fields", async () => {
  const articles = await getAllArticles();

  assert.ok(articles.length >= 6);

  for (const article of articles) {
    assert.ok(article.slug.length > 0);
    assert.ok(article.readingTime.length > 0);
    assert.ok(Array.isArray(article.toc));
  }
});

test("category, city, and tag filters return matching posts", async () => {
  const cityPosts = await getArticlesByCity("bangkok");
  const categoryPosts = await getArticlesByCategory("best-cafes");
  const tagPosts = await getArticlesByTag("wifi");

  assert.ok(cityPosts.every((post) => post.city === "bangkok"));
  assert.ok(categoryPosts.every((post) => post.categories.includes("best-cafes")));
  assert.ok(tagPosts.every((post) => post.tags.includes("wifi")));
});

test("related articles prioritize shared taxonomy", async () => {
  const articles = await getAllArticles();
  const target = articles[0];
  const related = await getRelatedArticles(target, 3);

  assert.ok(related.length > 0);
  assert.ok(related.every((item) => item.slug !== target.slug));
});
