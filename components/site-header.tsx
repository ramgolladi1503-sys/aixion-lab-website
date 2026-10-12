import Link from "next/link";
import { ActiveNav } from "./active-nav";
import { CommandPalette } from "./command-palette";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-width site-header__inner">
        <Link href="/" className="brand" aria-label="Aixion Lab home">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span className="brand-copy"><strong>AIXION LAB</strong><small>Applied systems engineering</small></span>
        </Link>
        <ActiveNav />
        <div className="header-actions">
          <ModeToggle />
          <CommandPalette />
          <Link className="header-contact" href="/about#contact">Contact <span aria-hidden="true">↗</span></Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
