"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav } from "@/lib/site-data";

export function MobileNav() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = false;
  }, [pathname]);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details className="mobile-menu" ref={detailsRef}>
      <summary aria-label="Open navigation">Menu</summary>
      <nav aria-label="Mobile navigation">
        <Link href="/" onClick={closeMenu}>Home</Link>
        {nav.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}
        <Link href="/resume" onClick={closeMenu}>Résumé</Link>
        <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub ↗</a>
      </nav>
    </details>
  );
}
