import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer site-footer--statement">
      <div className="shell footer-closing">
        <div className="footer-reference-row">
          <div>
            <p className="eyebrow">AIXION LAB°</p>
            <p className="footer-manifesto">Engineering intelligent systems for an unknowable future.</p>
          </div>
          <nav className="footer-reference-links" aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/resume">Career</Link>
            <Link href="/collaborate">Collaborate</Link>
            <Link href="/research">Research</Link>
            <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
          </nav>
        </div>
        <p className="footer-signoff">Observe. Explain. Operate.</p>
      </div>
      <div className="shell build-line build-line--quiet">
        <span>© 2026 Aixion Lab</span>
        <span>Independent applied-engineering lab · Built by Ram</span>
      </div>
    </footer>
  );
}
