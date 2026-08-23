import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";
import { SystemVisual } from "@/components/system-visuals";

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
            <h1>The engineer behind the systems.</h1>
            <p className="lede">I build observable, testable and evidence-driven systems across quality engineering, automation, software, data and applied AI.</p>
            <div className="button-row">
              <Link className="button" href="/resume">Career snapshot →</Link>
              <a className="button-secondary" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <SystemVisual kind="about" />
        </div>
      </section>

      <section className="section-tight">
        <div className="shell about-grid">
          <article className="panel panel-pad">
            <SectionHeading eyebrow="ABOUT RAM" title="Quality engineering became a systems philosophy." />
            <p className="lede">Define state. Expose failure. Test assumptions. Keep authority clear.</p>
            <p>That foundation expanded into automation, software systems, data, ML experimentation and governed autonomous-system design. Aixion Lab is where those threads are brought together and made inspectable.</p>
          </article>
          <article className="panel panel-pad">
            <SectionHeading eyebrow="CURRENT FRONTIER" title="What I am actively exploring" />
            <div className="principles-grid">
              <div className="principle"><strong>Agent governance</strong><p>Tools, policy, evidence and authority as explicit system stages.</p></div>
              <div className="principle"><strong>Market microstructure</strong><p>Evidence-bound research around real-time market behavior.</p></div>
              <div className="principle"><strong>Evidence-bound automation</strong><p>Workflows that expose state, retries and outcomes.</p></div>
              <div className="principle"><strong>Applied ML systems</strong><p>Models inside governed systems rather than isolated demos.</p></div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="ENGINEERING PRINCIPLES" title="The rules that survive across domains" />
          <div className="system-grid">
            <article className="detail-card"><h3>Proof over presentation</h3><p>A polished interface cannot substitute for evidence behind a claim.</p></article>
            <article className="detail-card"><h3>State over ambiguity</h3><p>Research, building, validating and operating are different states and are labelled differently.</p></article>
            <article className="detail-card"><h3>Failure over theatre</h3><p>Failures are useful when they change the system. Hiding them makes the engineering story weaker.</p></article>
            <article className="detail-card"><h3>Authority stays explicit</h3><p>Automation is powerful, but critical authority should remain inspectable and bounded.</p></article>
          </div>
        </div>
      </section>

      <section className="section-tight" id="contact">
        <div className="shell contact-panel about-contact-panel">
          <div className="panel contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h2>Build, test or discuss something difficult.</h2>
            <p>Engineering roles, applied AI, automation, data systems or architecture discussions are the right reasons to reach out.</p>
            <div className="button-row">
              <a className="button" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">Open GitHub →</a>
              <Link className="button-secondary" href="/resume">Career snapshot</Link>
            </div>
            <p className="contact-boundary">Direct email and LinkedIn will be published only after the final public handles are confirmed.</p>
          </div>
          <div className="panel contact-copy career-only">
            <p className="eyebrow">CAREER LENS</p>
            <h3>Recruiter fast path</h3>
            <p>Quality engineering · automation · Python · Java · APIs · WebSockets · real-time data · testing · CI/CD · ML experimentation · system design · observability.</p>
            <Link className="text-link" href="/resume">Open career snapshot →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
