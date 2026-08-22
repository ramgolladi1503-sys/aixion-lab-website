import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { nav } from "@/lib/site-data";

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
            <small>Applied intelligence. Built to explain itself.</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <ModeToggle />
          <a className="quiet-link" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
          <details className="mobile-menu">
            <summary aria-label="Open navigation">Menu</summary>
            <nav aria-label="Mobile navigation">
              <Link href="/">Home</Link>
              {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              <Link href="/resume">Résumé</Link>
              <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
