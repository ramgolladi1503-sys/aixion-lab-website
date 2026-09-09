import type { Metadata } from "next";
import { systems } from "@/lib/site-data";
import labState from "@/content/lab-state.json";
import { ProgressLane, SectionHeading, StateTag } from "@/components/ui";
import { AixionSignal } from "@/components/system-visuals";
import { FlipCard } from "@/components/flip-card";
import { LiveTelemetryFeed } from "@/components/live-telemetry-feed";

export const metadata: Metadata = {
  title: "Aixion Pulse",
  description: "What the lab is building, testing and learning right now.",
};

export default function PulsePage() {
  return (
    <>
      <section className="page-hero pulse-reference-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">AIXION LAB · PULSE</p>
            <h1>The operational pulse of the lab.</h1>
            <p className="lede">Current focus, latest public-safe milestone and next gate for each system. Pulse is curated engineering state—not raw repository activity.</p>
            <AixionSignal compact />
          </div>
          <div className="panel meta-board pulse-meta">
            <div><span>Source model</span><strong>Curated manifest</strong></div>
            <div><span>Last update</span><strong>{labState.updated_at}</strong></div>
            <div><span>Raw commits</span><strong>Not a progress metric</strong></div>
            <div><span>Completion %</span><strong>Not used</strong></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="SYSTEM MATURITY" title="Where each system sits now" copy="State is categorical and evidence-led. A percentage would pretend we know more than we do." />
          {systems.map(system => (
            <ProgressLane key={system.id} label={system.shortName} stage={system.state === "VALIDATING" || system.state === "BUILDING" || system.state === "OPERATING" ? system.state : "RESEARCH"} />
          ))}
          <LiveTelemetryFeed />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="NOW" title="Current cycle" copy="These cards answer four things quickly: state, current focus, latest milestone and next gate." />
          <div className="flip-card-deck pulse-card-deck">
            {labState.systems.map((system, index) => (
              <FlipCard
                key={system.slug}
                index={index}
                eyebrow={system.state}
                title={system.name}
                front={`${system.current_focus} Latest evidence: ${system.latest_milestone} Next gate: ${system.next_gate}`}
                backLabel="CURRENT FOCUS"
                back={system.current_focus}
                state={system.state}
                href={`/systems/${system.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell panel panel-pad">
          <SectionHeading eyebrow="SHIP LOG" title="Changes that meaningfully altered capability, evidence or authority" copy="The log deliberately ignores cosmetic commit volume." />
          <div className="evidence-list">
            <div className="evidence-row"><span>23 AUG 2026</span><strong>Website architecture and visual authority frozen for clean rebuild</strong><StateTag state="LOCKED" /></div>
            <div className="evidence-row"><span>TRADEBOT</span><strong>Live and research evidence remain separated from proprietary strategy details</strong><StateTag state="BOUNDARY" /></div>
            <div className="evidence-row"><span>CONTROL CORE</span><strong>MVP orchestration translated into inspectable stages and authority boundaries</strong><StateTag state="BUILDING" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
