export type NewsletterProviderResult = {
  ok: boolean;
  status: number;
  message: string;
};

export interface NewsletterProvider {
  subscribe(email: string): Promise<NewsletterProviderResult>;
}

class BrevoProvider implements NewsletterProvider {
  async subscribe(email: string): Promise<NewsletterProviderResult> {
    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      return {
        ok: false,
        status: 500,
        message: "Missing Brevo configuration. Set BREVO_API_KEY and BREVO_LIST_ID.",
      };
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    if (response.ok) {
      return {
        ok: true,
        status: 200,
        message: "You're subscribed. Check your inbox for a confirmation message.",
      };
    }

    if (response.status === 400 || response.status === 409) {
      return {
        ok: true,
        status: 200,
        message: "This email is already subscribed.",
      };
    }

    return {
      ok: false,
      status: response.status,
      message: "Unable to subscribe right now. Please try again shortly.",
    };
  }
}

class ButtondownProvider implements NewsletterProvider {
  async subscribe(email: string): Promise<NewsletterProviderResult> {
    const apiKey = process.env.BUTTONDOWN_API_KEY;

    if (!apiKey) {
      return {
        ok: false,
        status: 500,
        message: "Missing Buttondown configuration. Set BUTTONDOWN_API_KEY.",
      };
    }

    const response = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok || response.status === 409) {
      return {
        ok: true,
        status: 200,
        message: response.status === 409 ? "This email is already subscribed." : "You're subscribed.",
      };
    }

    return {
      ok: false,
      status: response.status,
      message: "Unable to subscribe right now. Please try again shortly.",
    };
  }
}

export function getNewsletterProvider(): NewsletterProvider {
  const provider = process.env.NEWSLETTER_PROVIDER?.toLowerCase() ?? "brevo";

  if (provider === "buttondown") {
    return new ButtondownProvider();
  }

  return new BrevoProvider();
}
