import test from "node:test";
import assert from "node:assert/strict";

import { getNewsletterProvider } from "../src/lib/newsletter/providers";

test("newsletter provider returns config error when env is missing", async () => {
  delete process.env.NEWSLETTER_PROVIDER;
  delete process.env.BREVO_API_KEY;
  delete process.env.BREVO_LIST_ID;

  const provider = getNewsletterProvider();
  const result = await provider.subscribe("test@example.com");

  assert.equal(result.ok, false);
  assert.equal(result.status, 500);
});

test("newsletter provider treats duplicates as success", async () => {
  process.env.NEWSLETTER_PROVIDER = "brevo";
  process.env.BREVO_API_KEY = "test-key";
  process.env.BREVO_LIST_ID = "12";

  const originalFetch = global.fetch;
  global.fetch = (async () => new Response("", { status: 409 })) as typeof fetch;

  const provider = getNewsletterProvider();
  const result = await provider.subscribe("test@example.com");

  assert.equal(result.ok, true);
  assert.equal(result.status, 200);

  global.fetch = originalFetch;
});

test("newsletter provider reports upstream failure", async () => {
  process.env.NEWSLETTER_PROVIDER = "buttondown";
  process.env.BUTTONDOWN_API_KEY = "test-key";

  const originalFetch = global.fetch;
  global.fetch = (async () => new Response("", { status: 503 })) as typeof fetch;

  const provider = getNewsletterProvider();
  const result = await provider.subscribe("test@example.com");

  assert.equal(result.ok, false);
  assert.equal(result.status, 503);

  global.fetch = originalFetch;
});
