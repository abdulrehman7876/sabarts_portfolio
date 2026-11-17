/**
 * Central place for contact details and site identity.
 * Fill these in when ready. Empty values are hidden from the page.
 */
export const siteConfig = {
  name: "SabaArts",
  title: "SabaArts | Kids Activity Book Designer & Illustrator",
  description:
    "SabaArts is the portfolio of Saba, a graphic designer creating children's activity books, educational worksheets and playful illustrations that make learning fun.",
  // Set this to your production domain, e.g. "https://sabaarts.com"
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  // Real public email address. Leave "" until provided.
  email: "",
  // Only add verified profile URLs.
  socials: [] as { label: string; href: string }[],
};

export const testimonials: { quote: string; name: string; role?: string }[] = [
  // Add real feedback here, for example:
  // { quote: "...", name: "Client Name", role: "Publisher" },
];

export const skills = [
  "Graphic Design",
  "Kids Activity Book Design",
  "Adobe Photoshop",
  "Figma",
  "Adobe Illustrator",
  "Canva",
];

export const achievements = [
  "Winner of a poster competition organized by the Art and Culture Society, University of Karachi.",
  "Winner of a poster competition at Bazm-e-Funoon 2.0.",
  "Winner of a poster competition organized by ISS, University of Karachi.",
];
