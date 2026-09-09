"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site-data";
import { CommandPalette } from "./command-palette";
import { AudioToggle } from "./audio-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const closeMenus = () => {
    headerRef.current?.querySelectorAll("details[open]").forEach(node => node.removeAttribute("open"));
  };

  useEffect(() => {
    closeMenus();
  }, [pathname]);

  return (
    <header className="site-header" ref={headerRef} onKeyDown={event => { if (event.key === "Escape") closeMenus(); }}>
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
        <nav className="fresh-nav" aria-label="Primary navigation">
          <div className="fresh-nav-group"><Link className={pathname.startsWith("/systems") ? "is-active" : undefined} href="/systems" onClick={closeMenus}>Systems</Link><details><summary role="button" aria-label="Open Systems subnavigation">+</summary><div className="fresh-subnav"><Link onClick={closeMenus} href="/systems/tradebot">TradeBot</Link><Link onClick={closeMenus} href="/systems/control-core">Control Core</Link><Link onClick={closeMenus} href="/systems/automation">Automation</Link><Link onClick={closeMenus} href="/systems/analytics">Analytics</Link></div></details></div>
          <div className="fresh-nav-group"><Link className={pathname.startsWith("/research") ? "is-active" : undefined} href="/research" onClick={closeMenus}>Research</Link><details><summary role="button" aria-label="Open Research subnavigation">+</summary><div className="fresh-subnav"><Link onClick={closeMenus} href="/research/opening-session-market-structure">Opening session</Link><Link onClick={closeMenus} href="/research/rec-md-structural-interaction">REC-MD</Link><Link onClick={closeMenus} href="/research/mean-reversion-candidate">Mean reversion</Link><Link onClick={closeMenus} href="/research/evidence-bound-autonomy">Evidence-bound autonomy</Link></div></details></div>
          {nav.slice(2).map(([label, href]) => <Link className={pathname.startsWith(href) ? "is-active" : undefined} key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <AudioToggle />
          <CommandPalette />
          <Link className="fresh-header-cta" href="/contact">Contact <span>↗</span></Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation">Menu</summary>
            <nav aria-label="Mobile navigation" onClick={event => { if ((event.target as HTMLElement).closest("a")) closeMenus(); }}>
              <Link href="/">Home</Link>
              <Link href="/systems">Systems</Link>
              <Link className="mobile-subnav-link" href="/systems/tradebot">↳ TradeBot</Link><Link className="mobile-subnav-link" href="/systems/control-core">↳ Control Core</Link><Link className="mobile-subnav-link" href="/systems/automation">↳ Automation</Link><Link className="mobile-subnav-link" href="/systems/analytics">↳ Analytics</Link>
              <Link href="/research">Research</Link>
              <Link className="mobile-subnav-link" href="/research/opening-session-market-structure">↳ Opening session</Link><Link className="mobile-subnav-link" href="/research/rec-md-structural-interaction">↳ REC-MD</Link><Link className="mobile-subnav-link" href="/research/mean-reversion-candidate">↳ Mean reversion</Link><Link className="mobile-subnav-link" href="/research/evidence-bound-autonomy">↳ Evidence-bound autonomy</Link>
              {nav.slice(2).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              <Link href="/resume">Résumé</Link>
              <Link href="/contact">Contact ↗</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
