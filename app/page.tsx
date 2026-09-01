import Link from "next/link";
import { systems, researchNotes } from "@/lib/site-data";
import labActivity from "@/content/lab-activity.json";
import { StateTag } from "@/components/ui";
import { AixionSignal } from "@/components/system-visuals";

export default function HomePage() {
  const flagship = systems.slice(0, 2);
  const current = [labActivity.active[0], ...labActivity.entries]
    .filter(item => !item.title.includes("Observable Temporal State Field"))
    .slice(0, 2);
  const rejected = researchNotes.find(note => note.state === "REJECTED");

  return (
    <div className="editorial-home">
      <section className="editorial-home-hero" data-reveal="hero" aria-labelledby="home-title">
        <div className="shell editorial-home-hero-grid">
          <div className="editorial-home-copy">
            <p className="eyebrow">AIXION LAB · APPLIED ENGINEERING</p>
            <h1 id="home-title">Applied intelligence, automation and decision systems.</h1>
            <p className="lede">An independent engineering lab where ideas move through research, implementation, validation and real-world observation.</p>
            <p className="home-byline">Built by Ram — Quality Engineering · Automation · Software · Data · Applied AI</p>
            <div className="button-row">
              <Link className="button" href="/systems">Explore systems →</Link>
              <Link className="button-secondary" href="/pulse">Current Pulse</Link>
            </div>
          </div>

          <aside className="home-flagships" aria-label="Flagship systems">
            {flagship.map(system => (
              <Link className="flagship-record" href={`/systems/${system.slug}`} key={system.id}>
                <span>
                  <span className="record-id">{system.id}</span>
                  <strong>{system.name}</strong>
                  <p>{system.descriptor}</p>
                  <small>Current gate · {system.currentGate}</small>
                </span>
                <span className="record-state"><StateTag state={system.state} /></span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section className="home-signal-band" aria-label="Aixion engineering lifecycle">
        <div className="shell"><AixionSignal compact /></div>
      </section>

      <section className="home-editorial-section" aria-labelledby="proof-title" data-reveal="proof">
        <div className="shell">
          <div className="home-section-head">
            <div>
              <p className="eyebrow">PROOF BEFORE PRESENTATION</p>
              <h2 id="proof-title">Claims stay bounded by evidence.</h2>
            </div>
            <p>The lab keeps system maturity, research results, evidence visibility and authority separate. A promising result is not dressed up as production readiness.</p>
          </div>

          <div className="home-proof-list">
            <div className="home-proof-row">
              <span>RESEARCH</span>
              <strong>Rejected work remains visible.</strong>
              <p>{rejected ? `${rejected.title} remains part of the public research record.` : "Rejected hypotheses remain part of the public research record."}</p>
              <Link className="text-link" href={rejected ? `/research/${rejected.slug}` : "/research"}>Inspect →</Link>
            </div>
            <div className="home-proof-row">
              <span>BOUNDARY</span>
              <strong>Public evidence is deliberately scoped.</strong>
              <p>Architecture, method and sanitized summaries can be public while proprietary mechanics and sensitive runtime evidence stay private.</p>
              <Link className="text-link" href="/research/evidence-bound-autonomy">Method →</Link>
            </div>
            <div className="home-proof-row">
              <span>AUTHORITY</span>
              <strong>Automation does not erase human authority.</strong>
              <p>TradeBot and Control Core both make approval and execution boundaries explicit rather than hiding them behind system confidence.</p>
              <Link className="text-link" href="/systems/tradebot">TradeBot →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-editorial-section" aria-labelledby="systems-title" data-reveal="systems-index">
        <div className="shell">
          <div className="home-section-head">
            <div>
              <p className="eyebrow">SYSTEMS REGISTRY</p>
              <h2 id="systems-title">Four systems. Explicit maturity.</h2>
            </div>
            <p>Each record exposes only what matters for orientation: what the system is, where it stands, and which gate it is working toward now.</p>
          </div>

          <div className="home-systems-list">
            {systems.map(system => (
              <Link className="home-system-row" href={`/systems/${system.slug}`} key={system.id}>
                <span className="system-code">{system.id}</span>
                <strong>{system.name}</strong>
                <p>{system.currentFocus}</p>
                <StateTag state={system.state} />
                <span className="row-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-editorial-section" aria-labelledby="current-title" data-reveal="current-work">
        <div className="shell">
          <div className="home-section-head">
            <div>
              <p className="eyebrow">AIXION PULSE</p>
              <h2 id="current-title">What is moving now.</h2>
            </div>
            <p>Two public-safe updates are enough for orientation. The full worklog stays in Pulse rather than turning Home into an activity feed.</p>
          </div>

          <div className="home-current-grid">
            {current.map(item => (
              <article className="home-current-entry" key={item.id}>
                <small>{item.date} · {item.type}</small>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
          <div className="button-row"><Link className="text-link" href="/pulse">Open the full Pulse →</Link></div>
        </div>
      </section>

      <section className="shell home-journey-bridge" aria-labelledby="journey-bridge-title" data-reveal="journey-bridge">
        <div>
          <p className="eyebrow">ENGINEERING JOURNEY</p>
          <blockquote id="journey-bridge-title">Quality engineering taught me to distrust systems that cannot explain their state.</blockquote>
        </div>
        <div>
          <p>That principle now shapes how I build automation, data and AI systems—and why evidence, failure and authority recur throughout Aixion Lab.</p>
          <Link className="button-secondary" href="/journey">Follow the journey →</Link>
          <div className="career-only" style={{ marginTop: 16 }}>
            <Link className="text-link" href="/resume">Career Snapshot →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
