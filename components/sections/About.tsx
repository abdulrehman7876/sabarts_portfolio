import { Award, Palette, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { achievements, skills } from "@/data/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-20 md:py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <span className="section-eyebrow">About Saba</span>
          <h2 id="about-title" className="section-title">
            Designing a World of Creativity and Learning
          </h2>
          <p className="mt-5 text-lg text-brand-muted">
            I&apos;m a graphic designer who creates engaging visual experiences for children. My focus is
            children&apos;s activity book design, educational worksheets, illustrations and graphic design that
            invite kids to explore, colour and learn.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <Reveal className="rounded-blob border border-brand-peach bg-brand-cream p-7 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift">
            <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
              <Palette aria-hidden className="h-6 w-6 text-brand-orange-dark" /> Skills
            </h3>
            <ul className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <li key={s} className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-soft">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="rounded-blob border border-brand-peach bg-brand-cream p-7 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift">
            <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
              <Star aria-hidden className="h-6 w-6 text-brand-orange-dark" /> Experience
            </h3>
            <ol className="relative ml-3 border-l-2 border-brand-orange pl-6">
              <li>
                <span aria-hidden className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand-orange" />
                <p className="font-display text-3xl font-extrabold">2023 – 2026</p>
                <p className="mt-1 text-brand-muted">Designing children&apos;s activity books, worksheets and illustrations.</p>
              </li>
            </ol>
          </Reveal>

          <Reveal delay={0.16} className="rounded-blob border border-brand-peach bg-brand-peach p-7 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift">
            <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
              <Award aria-hidden className="h-6 w-6 text-brand-orange-dark" /> Achievements
            </h3>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 rounded-2xl bg-white p-3 text-sm shadow-soft">
                  <Award aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-dark" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
