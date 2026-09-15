"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
        <Link href={logoHref} className="unseen-logo" aria-label="Aixion Lab home">
          aixion lab<span className="sup">®</span>
        </Link>
        <div className="unseen-links">
          <Link href="/systems" className={`unseen-link ${pathname.startsWith("/systems") ? "active" : ""}`}>Work</Link>
          <Link href="/research" className={`unseen-link ${pathname.startsWith("/research") ? "active" : ""}`}>Research</Link>
          <Link href="/about" className={`unseen-link ${pathname === "/about" ? "active" : ""}`}>About</Link>
          <Link href="/collaborate" className={`unseen-link ${pathname === "/collaborate" ? "active" : ""}`}>Collaborate</Link>
          <button type="button" className="unseen-menu-toggle" aria-label="Toggle navigation drawer" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span><i /><i /></span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="unseen-drawer-backdrop" role="presentation" onClick={() => setMenuOpen(false)}>
          <aside className="unseen-drawer-menu" role="dialog" aria-modal="true" aria-label="Site navigation" onClick={(event) => event.stopPropagation()}>
            <div className="unseen-drawer-top">
              <span>Aixion Lab</span>
              <button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>×</button>
            </div>
            <nav className="unseen-drawer-nav">
              {[["01", "Work", "/systems"], ["02", "Research", "/research"], ["03", "About", "/about"], ["04", "Collaborate", "/collaborate"]].map(([num, label, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}><span>{num}</span><strong>{label}</strong></Link>
              ))}
            </nav>
            <div className="unseen-drawer-secondary">
              <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <Link href="/resume">Résumé →</Link>
            </div>
            <div className="unseen-drawer-footer">
              <span>Applied engineering · research · systems</span>
              <a href="mailto:ram@aixionlab.com">ram@aixionlab.com</a>
            </div>
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
        <button type="button" aria-label="Audio status indicator" style={{ width: "2.3rem", height: "2.3rem", borderRadius: "50%", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(8px)", border: "1px solid rgba(33, 33, 33, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="12" y1="20" x2="12" y2="8" /></svg>
        </button>
        <Link href="/pulse" className="unseen-pill-button"><span>TradeBot: Validating Live</span></Link>
      </div>
      <Link href="/about" className="unseen-center-ctrl" aria-label="Built by Ram">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
      </Link>
      <span className="unseen-copyright">©{new Date().getFullYear()}</span>
    </footer>
  );
}
