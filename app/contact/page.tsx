import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation about applied engineering, automation, data or AI systems.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-reference-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · CONTACT</p>
            <h1>Build, test or discuss something difficult.</h1>
            <p className="lede">Engineering roles, applied AI, automation, data systems or architecture discussions are the right reasons to reach out.</p>
            <div className="button-row">
              <a className="button" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">Open GitHub →</a>
              <Link className="button-secondary" href="/resume">Career snapshot</Link>
            </div>
          </div>
          <div className="panel contact-intent-panel">
            <p className="eyebrow">GOOD FIT</p>
            <h2>Ready to build something difficult?</h2>
            <p>Quality engineering, governed automation, real-time systems, evidence-bound research, applied AI and system design.</p>
            <p className="contact-boundary">Direct email and LinkedIn will be published only after the final public handles are confirmed.</p>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="shell detail-grid">
          <article className="detail-card"><p className="eyebrow">CAREER</p><h3>Hiring or collaboration</h3><p>Use the career snapshot to see the systems, competencies and engineering scope in one view.</p><Link className="text-link" href="/resume">Open career snapshot →</Link></article>
          <article className="detail-card"><p className="eyebrow">PUBLIC WORK</p><h3>Understand the systems first</h3><p>Explore the registry, research notes and lab pulse before starting a technical conversation.</p><Link className="text-link" href="/systems">Explore Systems →</Link></article>
        </div>
      </section>
    </>
  );
}
