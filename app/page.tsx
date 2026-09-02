import Link from "next/link";
import { systems } from "@/lib/site-data";
import { RobotMind } from "@/components/robot-mind";

const stageCells = [
  ["01", "RESEARCH", "Questions are frozen before evidence can rewrite them."],
  ["02", "BUILD", "Systems are implemented with state and failure paths exposed."],
  ["03", "VALIDATE", "Claims compete against tests, holdouts and negative evidence."],
  ["04", "OPERATE", "Authority remains explicit when systems meet the real world."],
] as const;

export default function HomePage() {
  return (
    <div className="sharp-home">
      <section className="sharp-hero" data-reveal="sharp-hero">
        <div className="sharp-hero-inner">
          <div className="sharp-hero-copy">
            <p className="sharp-kicker">AIXION LAB · APPLIED INTELLIGENCE</p>
            <h1>Intelligence with <em>evidence.</em></h1>
            <p className="sharp-hero-lede">Aixion Lab builds automation, decision systems and applied AI that can explain their state, their evidence and their limits.</p>
            <div className="sharp-hero-actions">
              <Link className="sharp-pill-link sharp-pill-link--solid" href="/systems">Explore systems →</Link>
              <Link className="sharp-pill-link" href="/resume">Career snapshot</Link>
            </div>
            <div className="sharp-hero-foot"><span>BUILT BY RAM · QUALITY → AUTOMATION → SYSTEMS → AI</span><i /></div>
          </div>
          <RobotMind />
        </div>
      </section>

      <div className="sharp-marquee" aria-hidden="true">
        <div className="sharp-marquee-track">
          <span>STATE <b>VISIBLE</b></span><span>·</span><span>EVIDENCE <b>TRACEABLE</b></span><span>·</span><span>AUTHORITY <b>BOUNDED</b></span><span>·</span><span>FAILURE <b>RECORDED</b></span><span>·</span>
          <span>STATE <b>VISIBLE</b></span><span>·</span><span>EVIDENCE <b>TRACEABLE</b></span><span>·</span><span>AUTHORITY <b>BOUNDED</b></span><span>·</span><span>FAILURE <b>RECORDED</b></span><span>·</span>
          <span>STATE <b>VISIBLE</b></span><span>·</span><span>EVIDENCE <b>TRACEABLE</b></span><span>·</span><span>AUTHORITY <b>BOUNDED</b></span><span>·</span><span>FAILURE <b>RECORDED</b></span><span>·</span>
        </div>
      </div>

      <section className="sharp-intro" data-reveal="sharp-intro">
        <div className="sharp-shell sharp-intro-grid">
          <p className="sharp-section-index">01 · PRINCIPLE</p>
          <div>
            <h2>Systems should not ask for trust they cannot explain.</h2>
            <div className="sharp-intro-copy">
              <p>Aixion Lab is an independent applied-engineering lab where research, implementation and operation remain connected by evidence.</p>
              <p>Work that is incomplete stays incomplete. Rejected research remains visible. Automation does not silently inherit authority it was never given.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sharp-state-band" aria-label="Aixion engineering lifecycle">
        {stageCells.map(([number, label, copy]) => (
          <article className="sharp-state-cell" key={number}>
            <span>{number}</span><strong>{label}</strong><small>{copy}</small>
          </article>
        ))}
      </section>

      <section className="sharp-propositions" data-reveal="sharp-systems">
        <div className="sharp-shell">
          <div className="sharp-propositions-head">
            <p className="sharp-section-index">02 · SYSTEMS</p>
            <h2>The stack for governed intelligence.</h2>
          </div>
          <div className="sharp-system-stack">
            {systems.map((system, index) => (
              <article className="sharp-system-row" key={system.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{system.shortName}</h3>
                <p>{system.descriptor} Current public state: {system.state.toLowerCase()}.</p>
                <Link href={`/systems/${system.slug}`}>EXPLORE →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sharp-opportunity" data-reveal="sharp-opportunity">
        <div className="sharp-shell sharp-opportunity-grid">
          <div>
            <p className="sharp-section-index">03 · OPPORTUNITY</p>
            <h2>Build what can survive scrutiny.</h2>
          </div>
          <div className="sharp-opportunity-copy">
            <p>Recruiters can review the engineer behind the systems. Teams with a bounded technical problem can collaborate with Aixion Lab. Both paths point back to the same public evidence.</p>
            <div className="sharp-opportunity-links">
              <Link className="sharp-pill-link sharp-pill-link--solid" href="/resume">Hire Ram →</Link>
              <Link className="sharp-pill-link" href="/collaborate">Work with Aixion Lab →</Link>
              <Link className="sharp-pill-link" href="/research">Review research</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sharp-closing" data-reveal="sharp-closing">
        <div className="sharp-closing-inner">
          <p className="sharp-section-index">AIXION LAB</p>
          <h2>Observe.<span>Explain.</span>Operate.</h2>
          <p>Applied intelligence becomes useful when state, evidence, failure and authority remain visible all the way from experiment to operation.</p>
        </div>
      </section>
    </div>
  );
}
