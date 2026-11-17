"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { activityBooks } from "@/data/portfolio";

export function Hero() {
  const reduce = useReducedMotion();
  const covers = [activityBooks[0], activityBooks[1], activityBooks[2]];
  const tilt = [-8, 4, 10];
  const pos = [
    "left-0 top-10 z-10",
    "left-1/4 top-0 z-20",
    "right-0 top-16 z-10",
  ];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-brand-cream"
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-peach"
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-brand-sun/70"
      />

      <div className="container-page relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={reduce ? false : { y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="section-eyebrow">
            <Sparkles aria-hidden className="mr-1 inline h-4 w-4" /> Kids
            Activity Book Designer
          </span>
          <h1
            id="hero-title"
            className="font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Little Ideas.{" "}
            <span className="text-brand-orange-dark">Big Imaginations.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-muted">
            I&apos;m Saba, a creative graphic designer specializing in
            children&apos;s activity books, engaging worksheets, and playful
            illustrations that make learning fun.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#portfolio" className="btn btn-primary">
              Explore My Work <ArrowRight aria-hidden className="h-5 w-5" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let&apos;s Work Together
            </a>
          </div>
          <p className="mt-6 text-sm font-semibold text-brand-ink">
            <span className="rounded-full bg-white px-4 py-1.5 shadow-soft">
              30+ Product Illustrations Designed
            </span>
          </p>
        </motion.div>

        <div
          className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px]"
          style={{ perspective: 1000 }}
        >
          <div
            aria-hidden
            className="absolute inset-x-8 bottom-8 top-8 rotate-3 rounded-[3rem] bg-white/70 shadow-soft"
          />
          {covers.map((p, i) => (
            <motion.div
              key={p.id}
              className={`absolute w-[48%] overflow-hidden rounded-r-lg rounded-l-sm bg-white shadow-lift ${pos[i]}`}
              style={{ rotate: tilt[i] }}
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="absolute inset-y-0 left-0 z-10 w-1 bg-black/70"
                aria-hidden
              />
              <Image
                src={p.cover.src}
                alt={p.cover.alt}
                width={p.cover.width}
                height={p.cover.height}
                sizes="(max-width: 768px) 45vw, 220px"
                priority={i === 1}
                className="h-auto w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
