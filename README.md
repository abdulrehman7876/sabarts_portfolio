# SabaArts Portfolio

This repository contains the portfolio website for Saba, a graphic designer and illustrator creating playful, educational visuals for children. The site showcases kids activity books, worksheets, and creative illustrations designed to make learning feel fun, colorful, and engaging.

The portfolio is built with Next.js and is designed to feel warm, imaginative, and polished while presenting the work in a simple and professional way.

## What this portfolio includes

- A hero section with bold branding and featured book covers
- An About section highlighting skills, experience, and achievements
- A portfolio gallery split into:
  - Kids Activity Books
  - Worksheets
- A testimonials section for social proof
- A contact form that sends messages through a server-side API
- Structured website metadata for search and social previews

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Resend for email sending

## Project structure

```text
app/
  api/contact/route.ts      # Contact form API route
  globals.css               # Global styling and theme variables
  layout.tsx                # App layout and metadata
  page.tsx                  # Home page
components/
  layout/                   # Header and Footer
  portfolio/                # Gallery/lightbox UI
  sections/                 # Hero, About, Portfolio, Testimonials, Contact
  ui/                       # Shared UI helpers
data/
  portfolio.ts               # Portfolio projects and gallery images
  site.ts                   # Site identity, skills, achievements, social links
  types.ts                  # Project and image typings
public/
  images/                   # Activity book and worksheet artwork
  og-image.svg              # Open Graph social preview image
```

## Local development

Install dependencies:

```bash
npm install
```

Start the app in development mode:

```bash
npm run dev
```

Open http://localhost:3000 in the browser.

To verify the production build locally:

```bash
npm run build
npm run start
```

## Content and customization

Most of the portfolio content is driven by a few central files:

- `data/site.ts` — brand name, description, title, skills, achievements, and contact details
- `data/portfolio.ts` — project entries, cover images, and gallery slides
- `public/images/` — actual artwork used across the portfolio
- `components/sections/Hero.tsx` — featured portfolio covers shown on the homepage

This is a content-first portfolio: adding or replacing images and project entries is the main way to personalize it.

## Contact form setup

The contact form submits to `app/api/contact/route.ts` and validates the request server-side before sending email. It uses Resend and supports a honeypot check and simple rate limiting.

Configure the following environment variables before using it in production:

```bash
RESEND_API_KEY=your_resend_key
CONTACT_TO_EMAIL=your-real-inbox@example.com
CONTACT_FROM_EMAIL=SabaArts <hello@your-verified-domain.com>
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If these values are not configured, the form will report that the message could not be sent.

## Deployment

This site is ready to deploy on Vercel:

1. Push the project to GitHub
2. Import the repository in Vercel
3. Add the environment variables above
4. Set the production URL via `NEXT_PUBLIC_SITE_URL`
5. Deploy

## Overview

SabaArts is a portfolio for a designer who blends visual storytelling, education, and play. The project reflects a brand built around creativity for children, where each image aims to spark curiosity, imagination, and learning. This repository is the digital presentation of that work and is structured to be easy to update as the portfolio grows.
