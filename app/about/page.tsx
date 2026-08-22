import type { Metadata } from "next";
import Link from "next/link";
import { AbstractScene, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "The engineer behind Aixion Lab and the principles shaping the work.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · ABOUT</p>
            <h1>Built by Ram. Driven by evidence.</h1>
            <p className="lede">I build observable, testable and evidence-driven systems across quality engineering, automation, software, data and applied AI.</p>
            <div className="button-row">
              <Link className="button" href="/resume">Career snapshot →</Link>
              <a className="button-secondary" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <AbstractScene variant="sage" />
        </div>
      </section>

      <section className="section-tight">
        <div className="shell about-grid">
          <article className="panel panel-pad">
            <SectionHeading eyebrow="ABOUT RAM" title="Engineer. Builder. Solver." />
            <p className="lede">My background in quality engineering shapes how I approach everything else: define state, expose failure, test assumptions and keep authority clear.</p>
            <p>That foundation expanded into automation, software systems, data, ML experimentation and governed autonomous-system design. Aixion Lab is where those threads are being brought together in public.</p>
          </article>
          <article className="panel panel-pad">
            <SectionHeading eyebrow="CURRENT FRONTIER" title="What I am actively exploring" />
            <div className="principles-grid">
              <div className="principle"><strong>Agent governance</strong><p>How tools, policy, evidence and authority should interact.</p></div>
              <div className="principle"><strong>Market microstructure</strong><p>Evidence-bound research around real-time market behavior.</p></div>
              <div className="principle"><strong>Evidence-bound automation</strong><p>Workflows that can explain state, retries and outcomes.</p></div>
              <div className="principle"><strong>Applied ML systems</strong><p>Models inside governed systems rather than isolated demos.</p></div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="ENGINEERING PRINCIPLES" title="What stays consistent across the work" />
          <div className="system-grid">
            <article className="detail-card"><h3>Proof over presentation</h3><p>A polished interface cannot substitute for evidence behind the claim.</p></article>
            <article className="detail-card"><h3>State over ambiguity</h3><p>Research, building, validating and operating are different states and should be labelled differently.</p></article>
            <article className="detail-card"><h3>Failure over theatre</h3><p>Failures are useful when they change the system. Hiding them makes the portfolio weaker.</p></article>
            <article className="detail-card"><h3>Human authority</h3><p>Automation is powerful, but critical authority should remain explicit and inspectable.</p></article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell contact-panel">
          <div className="panel contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h2>Build, test or discuss something difficult.</h2>
            <p>Interested in an engineering role, applied AI, automation, data systems or the architecture behind one of the projects?</p>
            <div className="button-row">
              <a className="button" href="mailto:hello@aixionlab.com">Email →</a>
              <a className="button-secondary" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <div className="panel contact-copy career-only">
            <p className="eyebrow">CAREER MODE</p>
            <h3>Recruiter fast path</h3>
            <p>Quality engineering · automation · Python · Java · APIs · WebSockets · real-time data · testing · CI/CD · ML experimentation · system design · observability.</p>
            <Link className="text-link" href="/resume">Open career snapshot →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
