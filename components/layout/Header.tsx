"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.scrollY + 120;
        const sections = links
          .map(({ href }) => document.getElementById(href.slice(1)))
          .filter((section): section is HTMLElement => section !== null);
        const passedSections = sections.filter(
          (section) => section.offsetTop <= marker,
        );
        const current = passedSections[passedSections.length - 1];
        setActiveSection(
          window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2
            ? "contact"
            : (current?.id ?? "home"),
        );
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-brand-peach/80 bg-white/90 backdrop-blur transition-shadow ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#home" onClick={() => setActiveSection("home")}>
          <img
            className="sm:h-14 h-8 object-contain"
            src="/images/logo/Logo.webp"
            alt="SabaArts Logo"
          />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={
                    activeSection === l.href.slice(1) ? "location" : undefined
                  }
                  onClick={() => setActiveSection(l.href.slice(1))}
                  className={`rounded-full px-4 py-2 font-semibold transition-colors ${
                    activeSection === l.href.slice(1)
                      ? "bg-brand-peach text-brand-orange-dark shadow-soft"
                      : "text-brand-ink hover:bg-brand-peach hover:text-brand-orange-dark"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full hover:bg-brand-peach md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-brand-peach bg-white md:hidden"
        >
          <ul className="container-page flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={
                    activeSection === l.href.slice(1) ? "location" : undefined
                  }
                  onClick={() => {
                    setActiveSection(l.href.slice(1));
                    setOpen(false);
                  }}
                  className={`block rounded-xl px-3 py-3 text-lg font-semibold transition-colors ${
                    activeSection === l.href.slice(1)
                      ? "bg-brand-peach text-brand-orange-dark"
                      : "hover:bg-brand-peach"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
