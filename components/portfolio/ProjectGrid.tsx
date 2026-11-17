"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import type { Project } from "@/data/types";
import { Lightbox } from "./Lightbox";

function TiltCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (el: HTMLButtonElement) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Subtle 3D tilt for mouse only (touch and reduced-motion users get none).
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => ref.current && onOpen(ref.current)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-label={`Open ${project.title} gallery, ${project.gallery.length} image${project.gallery.length > 1 ? "s" : ""}`}
      className="group block w-full rounded-xl border border-brand-peach bg-white p-3 text-left shadow-soft transition-[transform,box-shadow] duration-200 hover:shadow-lift"
    >
      <div className="relative overflow-hidden rounded-lg bg-brand-cream">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
          className="aspect-[4/5] h-auto w-full object-cover"
          loading="lazy"
        />
        <span
          aria-hidden
          className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-ink opacity-90 shadow-soft"
        >
          <Expand className="h-5 w-5" />
        </span>
      </div>
      <div className="px-2 pb-2 pt-4">
        <h4 className="font-display text-xl font-bold">{project.title}</h4>
        {project.description && (
          <p className="mt-1 text-sm text-brand-muted">{project.description}</p>
        )}
      </div>
    </button>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const open = (p: Project, el: HTMLElement) => {
    trigger.current = el;
    setActive(p);
  };

  const close = useCallback(() => {
    setActive(null);
    // Restore focus to the card that opened the gallery.
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.id}>
            <TiltCard project={p} onOpen={(el) => open(p, el)} />
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {active && (
          <Lightbox key={active.id} project={active} onClose={close} />
        )}
      </AnimatePresence>
    </>
  );
}
