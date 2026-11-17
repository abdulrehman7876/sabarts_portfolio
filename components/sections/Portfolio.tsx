import { BookOpen, FileText } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { activityBooks, worksheets } from "@/data/portfolio";

export function Portfolio() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="bg-brand-cream py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <span className="section-eyebrow">Portfolio</span>
          <h2 id="portfolio-title" className="section-title">
            A Little Gallery of Big Ideas
          </h2>
          <p className="mt-5 text-lg text-brand-muted">
            Explore children&apos;s activity books, educational worksheets,
            illustrations, and creative design projects.
          </p>
          <nav
            aria-label="Portfolio categories"
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href="#activity-books"
              className="btn btn-secondary !min-h-[44px] !px-5"
            >
              <BookOpen aria-hidden className="h-5 w-5" /> Kids Activity Books
            </a>
            <a
              href="#worksheets"
              className="btn btn-secondary !min-h-[44px] !px-5"
            >
              <FileText aria-hidden className="h-5 w-5" /> Worksheets
            </a>
          </nav>
        </Reveal>

        <div id="activity-books" className="mt-14 scroll-mt-24">
          <h3 className="mb-6 flex items-center gap-3 font-display text-3xl font-bold">
            <span
              aria-hidden
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange"
            >
              <BookOpen className="h-6 w-6" />
            </span>
            Kids Activity Books
          </h3>
          <ProjectGrid projects={activityBooks} />
        </div>

        <div id="worksheets" className="mt-20 scroll-mt-24 rounded-blob border border-brand-peach bg-white p-5 shadow-soft sm:p-8">
          <h3 className="mb-6 flex items-center gap-3 font-display text-3xl font-bold">
            <span
              aria-hidden
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-sun"
            >
              <FileText className="h-6 w-6" />
            </span>
            Worksheets
          </h3>
          <ProjectGrid projects={worksheets} />
        </div>
      </div>
    </section>
  );
}
