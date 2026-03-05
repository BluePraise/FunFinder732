import type { IncomingMessage, ServerResponse } from "http";

// Minimal Vercel handler types (avoids NodeNext module resolution issues)
type Req = IncomingMessage & { body: Record<string, unknown> };
type Res = ServerResponse & {
  status(code: number): Res;
  json(body: unknown): Res;
};

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email } = req.body as { name?: string; email?: string };

  if (!email || !name) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error("MAILERLITE_API_KEY is not set");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      fields: { name },
    }),
  });

  // 200 = existing subscriber updated, 201 = new subscriber created
  if (mlRes.ok) {
    return res.status(200).json({ ok: true });
  }

  const error = await mlRes.json().catch(() => ({}));
  console.error("MailerLite error", mlRes.status, error);
  return res.status(mlRes.status).json({ error: "Could not subscribe. Please try again." });
}
