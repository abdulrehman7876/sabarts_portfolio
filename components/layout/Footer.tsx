import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-brand-peach bg-brand-cream py-8">
      <div className="container-page flex flex-col items-center justify-between gap-3 text-sm text-brand-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p>Kids activity book design, worksheets and illustration.</p>
      </div>
    </footer>
  );
}
