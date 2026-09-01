import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Collaborate",
  description: "Work with Aixion Lab on evidence-led automation, quality engineering, data and applied-AI systems.",
};

export default function CollaboratePage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · COLLABORATE</p>
            <h1>Build reliable automation and intelligent systems with an evidence-first engineering approach.</h1>
            <p className="lede">Aixion Lab is an independent applied-engineering lab led by Ram Golladi. It is a place to build, validate and document serious engineering work—not a claim of a staffed agency or large consultancy.</p>
            <div className="button-row">
              <Link className="button" href="/about#contact">Discuss a project →</Link>
              <Link className="button-secondary" href="/systems">Review systems</Link>
            </div>
          </div>
          <aside className="about-identity" aria-label="Aixion Lab collaboration profile">
            <div className="visual-kicker"><span>COLLABORATION PROFILE</span><span>PUBLIC-SAFE SCOPE</span></div>
            <p className="eyebrow">POSITIONING</p>
            <h2>Independent engineering lab. Selective collaboration.</h2>
            <p>The useful fit is work where quality, automation, software, data or applied AI need to be made observable, testable and operationally clear.</p>
            <dl className="about-identity-grid">
              <div><dt>Mode</dt><dd>Independent engineering collaboration</dd></div>
              <div><dt>Strength</dt><dd>Quality · Automation · Systems</dd></div>
              <div><dt>Frontier</dt><dd>Applied AI · Agents · Governance</dd></div>
              <div><dt>Proof</dt><dd>Systems · Research · GitHub</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <SectionHeading eyebrow="GOOD-FIT PROBLEMS" title="Where Aixion Lab can be useful" copy="The focus is narrow by design: engineering work that benefits from explicit state, validation, failure handling and evidence." />
          <div className="about-principle-rail">
            <article><h3>QA and test architecture</h3><p>Automation strategy, testability, integration coverage, failure visibility and evidence-led quality systems.</p></article>
            <article><h3>Workflow automation</h3><p>Reliable automations with explicit state, retries, policy boundaries, auditability and operator hand-offs.</p></article>
            <article><h3>AI / agent validation</h3><p>Testing, observability, tool boundaries, human authority and evidence capture around applied-AI systems.</p></article>
            <article><h3>Data and decision systems</h3><p>APIs, real-time data, replay, validation and operational views that support trustworthy decisions.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell feature-split">
          <article className="panel feature-copy">
            <p className="eyebrow">HOW I WORK</p>
            <h2>Research → Build → Validate → Observe → Operate → Learn</h2>
            <p>Work is treated as an engineering system rather than a polished demo. Assumptions are stated, failure states remain visible, and maturity is not overstated.</p>
            <p>This makes Aixion Lab most useful for teams that want a technically rigorous prototype, validation pass, automation layer, test architecture or system review.</p>
            <Link className="text-link" href="/research">See the research discipline →</Link>
          </article>
          <article className="panel feature-copy">
            <p className="eyebrow">ENGAGEMENT BOUNDARY</p>
            <h2>Start with the problem, not a generic service menu.</h2>
            <p>Aixion Lab is not positioned as a full-service agency. Collaboration should begin with a concrete engineering problem and a bounded outcome that can be reviewed against evidence.</p>
            <div className="button-row">
              <Link className="button" href="/about#contact">Start a technical conversation →</Link>
              <a className="button-secondary" href="https://www.linkedin.com/in/ram-golladi" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </article>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell contact-panel">
          <div className="panel contact-copy contact-copy--career">
            <p className="eyebrow">HIRING RAM?</p>
            <h3>The career path is separate.</h3>
            <p>If the opportunity is a full-time engineering role, use the recruiter-ready career view rather than the collaboration path.</p>
            <Link className="text-link" href="/resume">Open career snapshot →</Link>
          </div>
          <div className="panel contact-copy contact-copy--conversation">
            <p className="eyebrow">BUILD WITH AIXION LAB</p>
            <h3>Have a bounded engineering problem?</h3>
            <p>Share the problem, current system state, constraints and what a useful outcome would look like.</p>
            <Link className="text-link" href="/about#contact">Discuss the work →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
