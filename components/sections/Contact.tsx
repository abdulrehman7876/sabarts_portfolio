import { Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-brand-cream py-20 md:py-28">
      <div aria-hidden className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-brand-peach" />
      <div aria-hidden className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-brand-sky/70" />

      <div className="container-page relative grid gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="section-eyebrow">Contact</span>
          <h2 id="contact-title" className="section-title">
            Have a Creative Project in Mind?
          </h2>
          <p className="mt-5 text-lg text-brand-muted">
            Let&apos;s create something playful, thoughtful, and memorable.
          </p>

          {siteConfig.email && (
            <p className="mt-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 font-semibold text-brand-orange-dark underline underline-offset-4"
              >
                <Mail aria-hidden className="h-5 w-5" /> {siteConfig.email}
              </a>
            </p>
          )}

          {siteConfig.socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-4">
              {siteConfig.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="me noopener" className="font-semibold underline underline-offset-4">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <svg aria-hidden viewBox="0 0 200 120" className="mt-8 hidden w-56 lg:block" fill="none">
            <path d="M10 100 Q60 10 110 70 T190 30" stroke="#FF8A3D" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" />
            <path d="M150 20l6 14 15 2-11 10 3 15-13-8-13 8 3-15-11-10 15-2z" fill="#FFF3BF" stroke="#FF8A3D" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
