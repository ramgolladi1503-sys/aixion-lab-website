import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">AIXION LAB</p>
          <p className="footer-statement">Engineering applied intelligence. Building systems that can explain their state.</p>
        </div>
        <div className="footer-links">
          <Link href="/systems">Systems</Link>
          <Link href="/research">Research</Link>
          <Link href="/journey">Journey</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="footer-links">
          <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
          <Link href="/resume">Résumé</Link>
          <Link href="/about#contact">Contact</Link>
        </div>
      </div>
      <div className="shell build-line">
        <span>AIXION LAB / BUILD 2026.08.23</span>
        <span>Research → Build → Validate → Observe → Operate → Learn</span>
      </div>
    </footer>
  );
}
