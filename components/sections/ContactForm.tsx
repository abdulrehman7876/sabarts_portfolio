"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  id,
  label,
  type = "text",
  error,
  className,
}: {
  id: keyof Errors;
  label: string;
  type?: string;
  error?: string;
  className: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={id === "name" ? "name" : id === "email" ? "email" : "off"}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-red-700">
          Error: {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [banner, setBanner] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if ((data.name ?? "").trim().length < 2) next.name = "Please enter your name.";
    if (!emailRe.test((data.email ?? "").trim())) next.email = "Please enter a valid email address.";
    if ((data.subject ?? "").trim().length < 3) next.subject = "Please enter a subject.";
    if ((data.message ?? "").trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      setBanner("Please fix the highlighted fields.");
      return;
    }

    setStatus("sending");
    setBanner("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setBanner("Thank you! Your message has been sent.");
        form.reset();
      } else {
        setErrors(json.errors ?? {});
        setStatus("error");
        setBanner(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setBanner("Network error. Your message was not sent. Please try again.");
    }
  }

  const field =
    "mt-1 w-full rounded-2xl border-2 border-brand-ink/30 bg-white px-4 py-3 text-base focus:border-brand-orange-dark";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-blob border border-brand-peach bg-white p-6 shadow-soft sm:p-8">
      <Field id="name" label="Name" error={errors.name} className={field} />
      <Field id="email" label="Email" type="email" error={errors.email} className={field} />
      <Field id="subject" label="Subject" error={errors.subject} className={field} />
      <div>
        <label htmlFor="message" className="font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={field}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm font-semibold text-red-700">
            Error: {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot for spam bots. Hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
        <Send aria-hidden className="h-5 w-5" /> {status === "sending" ? "Sending…" : "Send a Message"}
      </button>

      <div role="status" aria-live="polite" className="min-h-[1.5rem] font-semibold">
        {status === "success" && <p className="text-green-800">{banner}</p>}
        {status === "error" && <p role="alert" className="text-red-700">{banner}</p>}
      </div>
    </form>
  );
}
