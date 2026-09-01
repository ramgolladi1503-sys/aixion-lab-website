import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { CommandPalette } from "./command-palette";
import { ActiveNav } from "./active-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Aixion Lab home">
          <span className="brand-mark" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => <i key={i} />)}
          </span>
          <span>
            <strong>AIXION LAB</strong>
            <small>Applied intelligence · evidence-led systems</small>
          </span>
        </Link>
        <ActiveNav />
        <div className="header-actions">
          <ModeToggle />
          <CommandPalette />
          <a className="quiet-link header-github" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
