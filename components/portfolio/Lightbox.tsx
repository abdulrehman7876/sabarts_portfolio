"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/data/types";

export function Lightbox({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = project.gallery.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const root = document.getElementById("lightbox-dialog");
        const items = root?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!items || items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const current = project.gallery[index];

  return (
    <motion.div
      id="lightbox-dialog"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-3 sm:p-8"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-ink shadow-soft hover:bg-brand-peach sm:right-6 sm:top-6"
      >
        <X aria-hidden />
      </button>

      {total > 1 && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-ink shadow-soft hover:bg-brand-peach sm:left-6"
        >
          <ChevronLeft aria-hidden />
        </button>
      )}

      <div className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          sizes="(max-width: 768px) 92vw, 70vh"
          className="h-auto max-h-[78vh] w-auto max-w-[88vw] rounded-2xl bg-white object-contain shadow-lift"
        />
        <p className="mt-3 text-center text-sm font-semibold text-white" aria-live="polite">
          {project.title}
          {total > 1 && ` · ${index + 1} of ${total}`}
        </p>
      </div>

      {total > 1 && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-ink shadow-soft hover:bg-brand-peach sm:right-6"
        >
          <ChevronRight aria-hidden />
        </button>
      )}
    </motion.div>
  );
}

export { AnimatePresence };
