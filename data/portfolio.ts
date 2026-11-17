import type { Project, ProjectImage } from "./types";

/**
 * HOW TO ADD YOUR REAL WORK
 * 1. Drop images into public/images/activity-books/<book-folder>/ or public/images/worksheets/<folder>/
 * 2. Add or edit an entry below: title, cover, and gallery (all pages of that project).
 * 3. Replace the placeholder paths and write real alt text. Delete placeholders you don't need.
 * Width/height are the real pixel size of each image (used to reserve space and avoid layout shift).
 */

const img = (
  src: string,
  alt: string,
  width = 800,
  height = 1000,
): ProjectImage => ({
  src,
  alt,
  width,
  height,
});

const activitybooksTitle = [
  { title: "Garden Adventure" },
  { title: "Maths Magic" },
  { title: "Space Adventure" },
];

const worksheetsTitle = [
  { title: "Color the Rocket" },
  { title: "Count the Fruits" },
  { title: "Crossword Puzzle" },
  { title: "Find the Hidden Objects" },
  { title: "Puzzle Time" },
];

export const activityBooks: Project[] = [1, 2, 3].map((n) => {
  const id = `book-0${n}`;
  const base = `/images/activity-books/${id}`;
  return {
    id,
    title: activitybooksTitle[n - 1]?.title,
    category: "activity-books" as const,
    cover: img(
      `${base}/cover.webp`,
      `Placeholder cover for activity book ${n}. Replace with your real book cover.`,
    ),
    gallery: [
      img(`${base}/cover.webp`, `Placeholder cover for activity book ${n}.`),
      img(
        `${base}/Artboard 2.webp`,
        `Placeholder interior page 1 of activity book ${n}.`,
      ),
      img(
        `${base}/Artboard 3.webp`,
        `Placeholder interior page 2 of activity book ${n}.`,
      ),
      img(
        `${base}/Artboard 4.webp`,
        `Placeholder interior page 2 of activity book ${n}.`,
      ),
      img(
        `${base}/Artboard 5.webp`,
        `Placeholder interior page 2 of activity book ${n}.`,
      ),
      img(
        `${base}/Artboard 6.webp`,
        `Placeholder interior page 2 of activity book ${n}.`,
      ),
    ],
  };
});

export const worksheets: Project[] = [1, 2, 3, 4, 5].map((n) => {
  const id = `worksheet-0${n}`;
  const base = `/images/worksheets/${id}`;
  return {
    id,
    title: worksheetsTitle[n - 1]?.title,
    category: "worksheets" as const,
    cover: img(
      `${base}/page-1.webp`,
      `Placeholder worksheet preview ${n}. Replace with your real worksheet.`,
    ),
    gallery: [
      img(`${base}/page-1.webp`, `Placeholder worksheet ${n}, page 1.`),
      img(`${base}/page-2.webp`, `Placeholder worksheet ${n}, page 2.`),
    ],
  };
});
