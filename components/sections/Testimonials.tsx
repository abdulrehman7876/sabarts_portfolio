"use client";

import { useState } from "react";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import reviewsData from "@/public/reviews.json";

const INITIAL_REVIEW_COUNT = 3;

export function Testimonials() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviews = showAllReviews
    ? reviewsData.reviews
    : reviewsData.reviews.slice(0, INITIAL_REVIEW_COUNT);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-white py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <span className="section-eyebrow">Testimonials</span>
          <h2 id="testimonials-title" className="section-title">
            Kind Words from Collaborators
          </h2>
          <p className="mt-4 flex items-center gap-2 text-brand-muted">
            <Star
              aria-hidden
              className="h-5 w-5 fill-brand-orange text-brand-orange"
            />
            <span>
              <strong className="text-brand-ink">
                {reviewsData.summary.average_rating}/5
              </strong>{" "}
              from {reviewsData.summary.total_reviews} client reviews
            </span>
          </p>
        </Reveal>

        <ul
          id="testimonials-list"
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {reviews.map((review) => (
            <li
              key={review.id}
              className="flex flex-col rounded-blob border border-brand-peach bg-brand-cream p-7 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between gap-3">
                <Quote aria-hidden className="h-8 w-8 text-brand-orange" />
                <span
                  className="inline-flex items-center gap-1 font-semibold"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  <Star
                    aria-hidden
                    className="h-4 w-4 fill-brand-orange text-brand-orange"
                  />
                  {review.rating}
                </span>
              </div>
              <blockquote className="mt-3 flex-1 text-lg">
                {review.comment}
              </blockquote>
              <footer className="mt-5 border-t border-brand-peach pt-4">
                <p className="font-display text-lg font-bold">
                  {review.reviewer.replaceAll("_", " ")}
                </p>
                <p className="text-sm text-brand-muted">
                  {review.country} · {review.posted}
                </p>
              </footer>
            </li>
          ))}
        </ul>

        {reviewsData.reviews.length > INITIAL_REVIEW_COUNT && (
          <div className="mt-8 text-center">
            <button
              type="button"
              className="btn btn-secondary"
              aria-controls="testimonials-list"
              aria-expanded={showAllReviews}
              onClick={() => setShowAllReviews((showingAll) => !showingAll)}
            >
              {showAllReviews ? "Show fewer reviews" : "Show more reviews"}
            </button>
          </div>
        )}

        <p className="mt-4 text-center">
          <a
            href="https://www.fiverr.com/s/K3wz8Nl"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Check these reviews on Fiverr
          </a>
        </p>
      </div>
    </section>
  );
}
