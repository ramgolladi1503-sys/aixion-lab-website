import Link from "next/link";
import { systems, researchNotes } from "@/lib/site-data";
import labActivity from "@/content/lab-activity.json";
import { StateTag } from "@/components/ui";
import { ObservableStateField } from "@/components/observable-state-field";

const legend = [
  ["OPERATING", "Stable and trusted"],
  ["VALIDATING", "Evidence is accumulating"],
  ["BUILDING", "Actively under construction"],
  ["RESEARCH", "Exploring and iterating"],
  ["ARCHIVED", "Complete / no longer active"],
  ["REJECTED", "Rejected after evaluation"],
] as const;

export default function HomePage() {
  const recent = [labActivity.active[0], ...labActivity.entries].slice(0, 5);
  const rejected = researchNotes.filter(note => note.state === "REJECTED");
  const validating = systems.filter(system => system.state === "VALIDATING").length;
  const building = systems.filter(system => system.state === "BUILDING").length;

  return (
    <div className="observable-home observable-control-room">
      <section className="control-room-shell observable-hero" data-reveal="hero" aria-labelledby="observable-home-title">
        <aside className="control-rail control-rail--left" aria-label="System state overview">
          <p className="control-label">SYSTEM STATE OVERVIEW</p>
          <div className="rail-panel state-overview-panel">
            {systems.map((system, index) => (
              <Link className="state-overview-row" href={`/systems/${system.slug}`} key={system.id}>
                <span className={`state-orb state-orb--${index}`} aria-hidden="true" />
                <span className="state-overview-copy">
                  <strong>{system.shortName}</strong>
                  <small>{system.state}</small>
                </span>
                <span className={`state-spark state-spark--${index}`} aria-hidden="true">⌁</span>
              </Link>
            ))}
            <Link className="state-overview-row" href="/research">
              <span className="state-orb state-orb--research" aria-hidden="true" />
              <span className="state-overview-copy"><strong>Research Engine</strong><small>LEARNING</small></span>
              <span className="state-spark state-spark--research" aria-hidden="true">⌁</span>
            </Link>
          </div>

          <div className="rail-panel state-legend-panel">
            <p className="control-label">STATE LEGEND</p>
            {legend.map(([state, description]) => (
              <div className="state-legend-row" key={state}>
                <span className={`legend-ring legend-ring--${state.toLowerCase()}`} />
                <strong>{state}</strong>
                <small>{description}</small>
              </div>
            ))}
          </div>

          <div className="rail-panel rail-explainer">
            <p className="control-label control-label--accent">WHY DOES THIS PAGE LOOK LIKE THIS?</p>
            <p>Every visible element represents public state. Nothing is shown as complete unless its evidence supports that claim.</p>
            <Link href="/about" className="rail-link">EXPLORE THE PRINCIPLES →</Link>
          </div>
        </aside>

        <main className="control-stage">
          <div className="control-stage-copy observable-copy">
            <p className="control-kicker eyebrow">THE SYSTEM IS EXPLAINING ITSELF</p>
            <h1 id="observable-home-title">Systems should be able to explain their state, their evidence and their limits.</h1>
            <p className="lede">Aixion Lab designs, builds and tests intelligence systems with an evidence-first philosophy.</p>
            <div className="control-actions button-row hero-actions-visible">
              <Link className="control-primary button" href="/systems">EXPLORE SYSTEMS →</Link>
              <Link className="control-secondary button-secondary" href="/pulse">VIEW PULSE</Link>
              <span className="control-heartbeat" aria-hidden="true">⌁</span>
            </div>
          </div>

          <ObservableStateField />

          <div className="temporal-caption" aria-label="Temporal state interpretation">
            <div><strong>PAST</strong><span>What has happened</span></div>
            <div><strong>PRESENT</strong><span>What we know now</span></div>
            <div><strong>FUTURE</strong><span>What we are building</span></div>
          </div>

          <section className="control-pulse-strip pulse-preview" data-reveal="pulse-preview" aria-label="Aixion Pulse summary">
            <div className="pulse-live"><strong>AIXION PULSE · LIVE</strong><span>Curated public state</span></div>
            <div className="pulse-stat"><span>Systems</span><strong>{systems.length}</strong></div>
            <div className="pulse-stat"><span>Validating</span><strong>{validating}</strong></div>
            <div className="pulse-stat"><span>Building</span><strong>{building}</strong></div>
            <div className="pulse-stat"><span>Research notes</span><strong>{researchNotes.length}</strong></div>
            <Link href="/pulse" className="pulse-open">VIEW FULL PULSE →</Link>
          </section>
        </main>

        <aside className="control-rail control-rail--right" aria-label="Recent public state changes">
          <div className="rail-panel recent-state-panel">
            <p className="control-label">RECENT STATE CHANGES</p>
            {recent.map(item => (
              <div className="recent-state-row" key={item.id}>
                <span className="recent-node" aria-hidden="true" />
                <div>
                  <small>{item.date}</small>
                  <strong>{item.title}</strong>
                  <p>{item.summary}</p>
                </div>
              </div>
            ))}
            <Link href="/pulse" className="rail-link">VIEW FULL ACTIVITY →</Link>
          </div>

          <div className="rail-panel selected-system-panel">
            <div className="selected-system-head">
              <strong>TRADEBOT <span className="selected-dot" /></strong>
              <StateTag state={systems[0].state} />
            </div>
            <p>{systems[0].descriptor}</p>
            <dl>
              <div><dt>Current focus</dt><dd>{systems[0].currentFocus}</dd></div>
              <div><dt>Current gate</dt><dd>{systems[0].currentGate}</dd></div>
              <div><dt>Authority</dt><dd>Human boundary explicit</dd></div>
            </dl>
            <Link href="/systems/tradebot" className="rail-link">VIEW SYSTEM PAGE →</Link>
          </div>

          <div className="rail-panel authority-map-panel">
            <p className="control-label">SYSTEM AUTHORITY MAP</p>
            <div className="authority-map" role="img" aria-label="Public architecture map: state, evidence, policy, risk and human authority remain separate">
              <span className="authority-core">STATE</span>
              <span className="authority-point authority-point--1">DATA</span>
              <span className="authority-point authority-point--2">EVIDENCE</span>
              <span className="authority-point authority-point--3">POLICY</span>
              <span className="authority-point authority-point--4">RISK</span>
              <span className="authority-point authority-point--5">HUMAN</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="control-closing" aria-label="Aixion Lab closing principle">
        <span>“</span>
        <p>Curiosity starts the question. Discipline keeps the work honest.<br />Persistence carries it through failure.</p>
        <span>”</span>
      </section>

      {rejected.length > 0 ? <span className="sr-only">Rejected research remains visible: {rejected.map(item => item.title).join(", ")}</span> : null}
    </div>
  );
}
