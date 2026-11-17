export type Category = "activity-books" | "worksheets";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  /** Optional, only fill in when you have a real description. */
  description?: string;
  cover: ProjectImage;
  /** All images for this project, shown only inside its own lightbox. */
  gallery: ProjectImage[];
}
