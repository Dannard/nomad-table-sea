"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as { message: string };
      setMessage(payload.message);

      if (response.ok) {
        setEmail("");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          required
          type="email"
          value={email}
          placeholder="Email address"
          onChange={(event) => setEmail(event.target.value)}
          className="sm:flex-1"
        />
        <Button type="submit" className="sm:w-auto">
          {pending ? "Joining..." : "Join newsletter"}
        </Button>
      </div>
      <p className="text-sm leading-7 text-[var(--muted)]">
        Weekly city picks, new guides, and practical food routes you can use on your next work week.
      </p>
      {message ? <p className="text-sm text-[var(--ink)]">{message}</p> : null}
    </form>
  );
}
