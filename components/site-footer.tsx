import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-closing">
        <div className="footer-brand-block">
          <p className="eyebrow">AIXION LAB</p>
          <h2>Observe. Explain. Operate.</h2>
          <p>An independent applied-engineering lab building intelligent systems, automation and decision infrastructure with explicit state, evidence and authority boundaries.</p>
        </div>

        <div className="footer-links" aria-label="Footer navigation">
          <div>
            <strong>Explore</strong>
            <Link href="/systems">Systems</Link>
            <Link href="/research">Research</Link>
            <Link href="/pulse">Pulse</Link>
            <Link href="/journey">Journey</Link>
          </div>
          <div>
            <strong>Opportunity</strong>
            <Link href="/about">About</Link>
            <Link href="/resume">Career</Link>
            <Link href="/collaborate">Collaborate</Link>
          </div>
          <div>
            <strong>Elsewhere</strong>
            <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ram-golladi" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </div>

      <div className="shell build-line">
        <span>© 2026 Aixion Lab</span>
        <span>Independent applied-engineering lab · Built by Ram</span>
      </div>
    </footer>
  );
}
