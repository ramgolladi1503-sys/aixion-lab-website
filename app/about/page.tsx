import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";
import { PageArtwork } from "@/components/page-artwork";

export const metadata: Metadata = {
  title: "About",
  description: "The engineer behind Aixion Lab and the principles shaping the work.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero"><PageArtwork kind="about" />
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · ABOUT</p>
            <h1>The engineer behind the systems.</h1>
            <p className="lede">I build observable, testable and evidence-driven systems across quality engineering, automation, software, data and applied AI.</p>
            <div className="button-row">
              <Link className="button" href="/resume">Hire Ram · Career snapshot →</Link>
              <Link className="button-secondary" href="/collaborate">Work with Aixion Lab</Link>
              <a className="button-secondary" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="button-secondary" href="https://www.linkedin.com/in/ram-golladi" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <aside className="about-identity" aria-label="Ram professional profile">
            <div className="visual-kicker"><span>RAM / ENGINEERING PROFILE</span><span>FACTUAL PUBLIC VIEW</span></div>
            <p className="eyebrow">CURRENT POSITIONING</p>
            <h2>Quality engineering expanded into systems engineering.</h2>
            <p>My work connects testing discipline with automation, software architecture, real-time data and governed applied-AI systems.</p>
            <dl className="about-identity-grid">
              <div><dt>Foundation</dt><dd>Quality Engineering</dd></div>
              <div><dt>Build domains</dt><dd>Automation · Software · Data</dd></div>
              <div><dt>Current frontier</dt><dd>Applied AI · Governance · Observability</dd></div>
              <div><dt>Public proof</dt><dd>Systems · Research · GitHub</dd></div>
            </dl>
            <Link className="text-link" href="/resume">Open recruiter-ready career translation →</Link>
          </aside>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell about-grid">
          <article className="about-editorial-block">
            <SectionHeading eyebrow="ABOUT RAM" title="Quality engineering became a systems philosophy." />
            <p className="lede">Define state. Expose failure. Test assumptions. Keep authority clear.</p>
            <p>That foundation expanded into automation, software systems, data, ML experimentation and governed autonomous-system design. Aixion Lab is where those threads are brought together and made inspectable.</p>
          </article>
          <article className="about-editorial-block">
            <SectionHeading eyebrow="CURRENT FRONTIER" title="What I am actively exploring" />
            <div className="about-frontier-list">
              <div><strong>Agent governance</strong><p>Tools, policy, evidence and authority as explicit system stages.</p></div>
              <div><strong>Market microstructure</strong><p>Evidence-bound research around real-time market behavior.</p></div>
              <div><strong>Evidence-bound automation</strong><p>Workflows that expose state, retries and outcomes.</p></div>
              <div><strong>Applied ML systems</strong><p>Models inside governed systems rather than isolated demos.</p></div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="ENGINEERING PRINCIPLES" title="The rules that survive across domains" />
          <div className="about-principle-rail">
            <article><h3>Proof over presentation</h3><p>A polished interface cannot substitute for evidence behind a claim.</p></article>
            <article><h3>State over ambiguity</h3><p>Research, building, validating and operating are different states and are labelled differently.</p></article>
            <article><h3>Failure over theatre</h3><p>Failures are useful when they change the system. Hiding them makes the engineering story weaker.</p></article>
            <article><h3>Authority stays explicit</h3><p>Automation is powerful, but critical authority should remain inspectable and bounded.</p></article>
          </div>
        </div>
      </section>

      <section className="section-tight" id="contact">
        <div className="shell">
          <SectionHeading eyebrow="CONTACT" title="Two reasons to reach out" copy="Choose the path that matches the opportunity. The engineering evidence remains the same." />
          <div className="contact-panel about-contact-panel">
            <div className="panel contact-copy contact-copy--career">
              <p className="eyebrow">CAREER OPPORTUNITIES</p>
              <h3>Hire the engineer behind Aixion Lab.</h3>
              <p>For full-time engineering roles spanning quality, automation, software, data or applied AI, use the recruiter-ready career view.</p>
              <div className="button-row">
                <Link className="button" href="/resume">Career snapshot →</Link>
                <a className="button-secondary" href="https://www.linkedin.com/in/ram-golladi" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            </div>
            <div className="panel contact-copy contact-copy--conversation">
              <p className="eyebrow">PROJECT COLLABORATION</p>
              <h3>Work with the independent lab.</h3>
              <p>Aixion Lab is open to selective, bounded engineering collaboration; it is not presented as a staffed agency or large consultancy.</p>
              <div className="button-row">
                <Link className="button" href="/collaborate">Collaboration path →</Link>
                <a className="button-secondary" href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
