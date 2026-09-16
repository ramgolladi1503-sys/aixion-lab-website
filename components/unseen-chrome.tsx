"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function UnseenHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const logoHref = pathname === "/" ? "/" : "/home";

  return (
    <>
      <header className={`unseen-nav ${scrolled ? "scrolled" : ""}`}>
        <Link href={logoHref} className="unseen-logo" aria-label="Aixion Lab home">Aixion Lab<span className="sup">®</span></Link>
        <div className="unseen-links">
          <Link href="/systems" className={`unseen-link ${pathname.startsWith("/systems") ? "active" : ""}`}>Work</Link>
          <Link href="/research" className={`unseen-link ${pathname.startsWith("/research") ? "active" : ""}`}>Research</Link>
          <Link href="/about" className={`unseen-link ${pathname === "/about" ? "active" : ""}`}>About</Link>
          <Link href="/collaborate" className={`unseen-link ${pathname === "/collaborate" ? "active" : ""}`}>Collaborate</Link>
          <ThemeToggle />
          <button type="button" className="unseen-menu-toggle" aria-label="Toggle navigation drawer" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span><i /><i /></span></button>
        </div>
      </header>

      {menuOpen && (
        <div className="unseen-drawer-backdrop" role="presentation" onClick={() => setMenuOpen(false)}>
          <aside className="unseen-drawer-menu" role="dialog" aria-modal="true" aria-label="Site navigation" onClick={(event) => event.stopPropagation()}>
            <div className="unseen-drawer-top"><span>Aixion Lab</span><button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>×</button></div>
            <nav className="unseen-drawer-nav">
              {[["Work", "/systems"], ["Research", "/research"], ["About", "/about"], ["Collaborate", "/collaborate"]].map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}><strong>{label}</strong></Link>
              ))}
            </nav>
            <div className="unseen-drawer-secondary">
              <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
              <Link href="/resume">Professional profile →</Link>
            </div>
            <div className="unseen-drawer-footer"><span>Applied engineering · research · systems</span><a href="mailto:ram@aixionlab.com">ram@aixionlab.com</a></div>
          </aside>
        </div>
      )}
    </>
  );
}

export function UnseenStatusBar() {
  const pathname = usePathname();
  const showStatus = pathname === "/home" || pathname === "/systems" || pathname === "/systems/tradebot";
  if (!showStatus) return null;

  return (
    <footer className="unseen-status-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <Link href="/pulse" className="unseen-pill-button"><span>TradeBot: Validating Live</span></Link>
      </div>
      <span className="unseen-copyright">©{new Date().getFullYear()}</span>
    </footer>
  );
}
