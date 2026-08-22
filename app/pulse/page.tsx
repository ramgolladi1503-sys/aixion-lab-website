import type { Metadata } from "next";
import { systems } from "@/lib/site-data";
import labState from "@/content/lab-state.json";
import { ProgressLane, SectionHeading, StateTag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aixion Pulse",
  description: "What the lab is building, testing and learning right now.",
};

export default function PulsePage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · PULSE</p>
            <h1>Aixion Pulse</h1>
            <p className="lede">What the lab is building, testing and learning right now. Pulse reports public-safe system state, not raw repository activity.</p>
          </div>
          <div className="panel meta-board">
            <div><span>Source model</span><strong>Curated manifest</strong></div>
            <div><span>Last manifest update</span><strong>{labState.updated_at}</strong></div>
            <div><span>Raw commits</span><strong>Not a progress metric</strong></div>
            <div><span>Completion %</span><strong>Not used</strong></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="SYSTEM MATURITY" title="Where each system sits in the engineering lifecycle" copy="State is categorical and evidence-led. We do not convert uncertain engineering work into arbitrary percentage bars." />
          {systems.map(system => (
            <ProgressLane key={system.id} label={system.shortName} stage={system.state === "VALIDATING" || system.state === "BUILDING" || system.state === "OPERATING" ? system.state : "RESEARCH"} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="NOW" title="Current cycle" copy="Each system exposes a current focus, latest public-safe milestone and next gate instead of a vague 'in progress' label." />
          <div className="detail-grid">
            {labState.systems.map(system => (
              <article className="detail-card" key={system.id}>
                <div className="system-card-top">
                  <span className="system-id">{system.id}</span>
                  <StateTag state={system.state} />
                </div>
                <h3>{system.name}</h3>
                <p><strong>Current focus:</strong> {system.current_focus}</p>
                <p><strong>Latest milestone:</strong> {system.latest_milestone}</p>
                <p><strong>Next gate:</strong> {system.next_gate}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="SHIP LOG" title="Curated engineering changes" copy="This is intentionally not a mirror of every Git commit. Only changes that meaningfully alter system capability, evidence or authority belong here." />
          <div className="evidence-list">
            <div className="evidence-row"><span>23 AUG 2026</span><strong>Website architecture and visual authority frozen for clean rebuild</strong><StateTag state="LOCKED" /></div>
            <div className="evidence-row"><span>TRADEBOT</span><strong>Live and research evidence remain separated from proprietary strategy details</strong><StateTag state="BOUNDARY" /></div>
            <div className="evidence-row"><span>CONTROL CORE</span><strong>MVP orchestration architecture is being translated into inspectable execution stages</strong><StateTag state="BUILDING" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
