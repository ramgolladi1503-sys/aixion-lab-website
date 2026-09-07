import Link from "next/link";
import { DeployStamp } from "./deploy-stamp";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">AIXION LAB</p>
          <p className="footer-statement">Applied intelligence, engineered with evidence.</p>
        </div>
        <div className="footer-links">
          <Link href="/systems">Systems</Link>
          <Link href="/research">Research</Link>
          <Link href="/journey">Journey</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="footer-links">
          <Link href="/pulse">Pulse</Link>
          <Link href="/resume">Résumé</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="shell build-line">
        <DeployStamp />
        <span>Research → Build → Validate → Observe → Operate → Learn</span>
      </div>
    </footer>
  );
}
