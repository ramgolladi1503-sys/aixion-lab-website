"use client";
import { containDialogFocus } from "@/lib/dialog-focus";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
export function Header() {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const run = () => setScrolled(scrollY > 24);
    run();
    window.addEventListener("scroll", run, { passive: true });
    return () => window.removeEventListener("scroll", run);
  }, []);
  useEffect(() => {
    dialog.current?.close();
  }, [path]);
  const active = (href: string) =>
    href === "/" ? path === href : path.startsWith(href);
  return (
    <header className="header" data-scrolled={scrolled}>
      <div className="shell header-inner">
        <Link href="/" className="wordmark" aria-label="Aixion Lab home">
          AIXION LAB
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="github-link" href={site.github}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link className="button small" href="/resume">
            Résumé
          </Link>
          <button
            ref={trigger}
            className="menu-toggle"
            aria-label="Open menu"
            onClick={() => dialog.current?.showModal()}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <dialog
        onKeyDown={containDialogFocus}
        ref={dialog}
        className="mobile-menu"
        aria-label="Site navigation"
        onClose={() => trigger.current?.focus()}
      >
        <div className="menu-top">
          <span className="wordmark">AIXION LAB</span>
          <button
            className="text-button"
            onClick={() => dialog.current?.close()}
          >
            Close ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {nav.map(([name, href], i) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              onClick={() => dialog.current?.close()}
            >
              <span>0{i + 1}</span>
              {name}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <p>Build. Question. Understand.</p>
        <a href={site.github}>GitHub ↗</a>
      </dialog>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer shell">
      <div>
        <Link className="wordmark" href="/">
          AIXION LAB
        </Link>
        <p>Building better systems.</p>
        <span>© 2026 Aixion Lab · Ram Golladi</span>
      </div>
      <nav aria-label="Footer navigation">
        {nav.map(([name, href]) => (
          <Link key={href} href={href}>
            {name}
          </Link>
        ))}
      </nav>
      <div className="footer-social">
        <a href={site.github}>GitHub ↗</a>
        <a href={site.linkedin}>LinkedIn ↗</a>
        <a href={`mailto:${site.email}`}>Email ↗</a>
        <Link href="/resume">Résumé ↗</Link>
      </div>
    </footer>
  );
}
export function PrintButton() {
  return (
    <button className="button" onClick={() => window.print()}>
      Print / Save PDF <span aria-hidden="true">↗</span>
    </button>
  );
}
