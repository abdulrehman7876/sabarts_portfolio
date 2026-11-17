import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Simple in-memory rate limit (per server instance). Use a shared store for strict limits.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots without sending.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your name (2–100 characters).";
  if (!emailRe.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";
  if (subject.length < 3 || subject.length > 150) errors.subject = "Please enter a subject (3–150 characters).";
  if (message.length < 10 || message.length > 5000) errors.message = "Please write a message (10–5000 characters).";
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "SabaArts <onboarding@resend.dev>";
  if (!apiKey || !to) {
    // Be honest: nothing was sent.
    return NextResponse.json(
      { error: "The contact form isn't set up yet, so your message was not sent. Please try again later." },
      { status: 503 },
    );
  }

  recent.push(now);
  hits.set(ip, recent);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[SabaArts] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Sorry, your message could not be sent. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
