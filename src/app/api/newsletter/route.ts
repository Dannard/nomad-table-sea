import { NextResponse } from "next/server";
import { z } from "zod";

import { getNewsletterProvider } from "@/lib/newsletter/providers";

const payloadSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const provider = getNewsletterProvider();
  const result = await provider.subscribe(parsed.data.email);

  if (!result.ok) {
    if (result.status >= 500) {
      return NextResponse.json(
        { message: "Newsletter signup is temporarily unavailable. Please try again soon." },
        { status: 503 },
      );
    }

    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({ message: result.message });
}
