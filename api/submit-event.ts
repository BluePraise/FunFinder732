import type { IncomingMessage, ServerResponse } from "http";

// Minimal Vercel handler types (avoids NodeNext module resolution issues)
type Req = IncomingMessage & { body: Record<string, unknown> };
type Res = ServerResponse & {
  status(code: number): Res;
  json(body: unknown): Res;
};

interface EventSubmission {
  eventName: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  category: string;
  cost: string;
  contactEmail: string;
  website?: string;
  subscribeNewsletter?: boolean;
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Partial<EventSubmission>;
  const { eventName, date, location, description, category, cost, contactEmail } = body;

  if (!eventName || !date || !location || !description || !category || !cost || !contactEmail) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  // ── 1. Log to Google Sheet + send email notification ──────────────────────
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEET_WEBHOOK_URL is not set");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const sheetRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      date,
      time: body.time ?? "",
      location,
      description,
      category,
      cost: cost,
      contactEmail,
      website: body.website ?? "",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!sheetRes.ok) {
    const text = await sheetRes.text().catch(() => "");
    console.error("Google Sheet webhook error", sheetRes.status, text);
    return res.status(502).json({ error: "Could not record your submission. Please try again." });
  }

  // ── 2. Optional MailerLite newsletter opt-in ───────────────────────────────
  if (body.subscribeNewsletter === true) {
    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (apiKey) {
      const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: contactEmail,
          ...(groupId ? { groups: [groupId] } : {}),
        }),
      });

      if (!mlRes.ok) {
        // Non-fatal — the submission was recorded; just log the MailerLite failure
        const error = await mlRes.json().catch(() => ({}));
        console.error("MailerLite opt-in error", mlRes.status, error);
      }
    } else {
      console.warn("subscribeNewsletter=true but MAILERLITE_API_KEY is not set");
    }
  }

  return res.status(200).json({ ok: true });
}
