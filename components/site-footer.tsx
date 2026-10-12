import Link from "next/link";
import { DeployStamp } from "./deploy-stamp";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width site-footer__main">
        <div className="site-footer__identity">
          <p className="eyebrow eyebrow--light">AIXION LAB</p>
          <p className="site-footer__statement">Research, build, validate, learn.</p>
          <p className="site-footer__subline">Applied intelligence and engineering, built with evidence.</p>
        </div>
        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link href="/systems">Systems</Link>
          <Link href="/research">Research</Link>
          <Link href="/pulse">Pulse</Link>
          <Link href="/journey">Journey</Link>
          <Link href="/about">About Ram</Link>
          <Link href="/resume">Career snapshot</Link>
        </nav>
        <div className="site-footer__contact">
          <span>Independent applied-engineering lab</span>
          <a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
          <Link href="/about#contact">Start a conversation ↗</Link>
        </div>
      </div>
      <div className="page-width site-footer__base">
        <DeployStamp />
        <span>© {new Date().getFullYear()} Aixion Lab</span>
        <span className="site-footer__process">Research <i /> Build <i /> Validate <i /> Observe <i /> Learn</span>
      </div>
    </footer>
  );
}
