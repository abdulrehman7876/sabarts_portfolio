# SabaArts Portfolio

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # test the production build
```

## Replace the placeholder portfolio

1. Put your images in `public/images/activity-books/<book-folder>/` or `public/images/worksheets/<folder>/`
   (WebP or JPG recommended; keep each file under ~300 KB where possible).
2. Edit `data/portfolio.ts`. Each project has a `title`, a `cover`, and a `gallery` (all of that project's pages).
   Set the real `width`/`height` of each image and write meaningful `alt` text. Add an optional `description` only if it is true.
3. Once all images are WebP/JPG/PNG, remove `dangerouslyAllowSVG` and `contentSecurityPolicy` from `next.config.mjs`.
4. The hero uses the first two activity books and first worksheet; change that in `components/sections/Hero.tsx`.

## Contact details & testimonials

Edit `data/site.ts`:
- `email`: shown as a mailto link only when filled in.
- `socials`: only verified profiles (also used for `sameAs` in structured data).
- `testimonials`: add real feedback only. While empty, a clearly marked placeholder shows.
- `url`: or set `NEXT_PUBLIC_SITE_URL` to your production domain (used for canonical, sitemap, robots, Open Graph).

## Contact form (real sending)

The form posts to `app/api/contact/route.ts`, which validates on the server, has a honeypot and a basic rate limit,
and sends via [Resend](https://resend.com). Set these environment variables (locally in `.env.local`, and in Vercel):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=your-real-inbox@example.com
CONTACT_FROM_EMAIL=SabaArts <hello@your-verified-domain.com>   # optional
```

Until these are set, the form honestly reports that the message was not sent. For stronger spam protection add
Cloudflare Turnstile or reCAPTCHA, and a shared rate-limit store (e.g. Upstash).

## Deploy to Vercel

Push to GitHub → import the repo in Vercel → add the environment variables above and `NEXT_PUBLIC_SITE_URL` → deploy.
Then run Lighthouse on the production URL and update the favicon (`app/icon.svg`) and `public/og-image.svg` with brand assets
(a 1200×630 PNG/JPG is best for social previews).
