import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { CommandPalette } from "./command-palette";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="site-header sharp-site-header">
      <div className="sharp-header-inner">
        <Link href="/" className="brand sharp-brand" aria-label="Aixion Lab home">
          <span className="brand-mark" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => <i key={i} />)}
          </span>
          <span>
            <strong>AIXION LAB</strong>
            <small>Applied intelligence · evidence-led systems</small>
          </span>
        </Link>
        <p className="sharp-header-note">INDEPENDENT APPLIED-ENGINEERING LAB</p>
        <div className="header-actions sharp-header-actions">
          <ModeToggle />
          <CommandPalette />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
