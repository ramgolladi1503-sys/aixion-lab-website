import type { SystemRecord } from "@/lib/site-data";

type VisualKind = "home" | "tradebot" | "control-core" | "automation" | "analytics" | "journey" | "about";

const kindForSystem = (system: SystemRecord): VisualKind => system.slug as VisualKind;

function SignalDots() {
  return (
    <div className="signal-dots" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => <i key={index} />)}
    </div>
  );
}

export function AixionSignal({ compact = false }: { compact?: boolean }) {
  const stages = ["RESEARCH", "BUILD", "VALIDATE", "EVIDENCE", "OPERATE", "LEARN"];
  return (
    <div className={compact ? "aixion-signal aixion-signal--compact" : "aixion-signal"} aria-label="Aixion engineering lifecycle">
      {stages.map((stage, index) => (
        <div className="signal-stage" key={stage}>
          <span className="signal-node" aria-hidden="true" />
          <strong>{stage}</strong>
          {index < stages.length - 1 ? <i aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  );
}

export function LabFieldVisual() {
  return (
    <div className="system-visual lab-field-visual" aria-hidden="true">
      <img className="hero-intelligence-art" src="/brand/aixion-hero-intelligence.png" alt="" />
      <div className="hero-art-overlay"><span>AIXION / SYSTEM FIELD</span><span>PUBLIC VIEW</span></div>
      <div className="field-caption">One lifecycle. Different systems. Evidence at every boundary.</div>
    </div>
  );
}

function ArtDirectedVisual({ kind, kicker, caption }: { kind: string; kicker: string; caption: string }) {
  return (
    <div className={`system-visual art-directed-visual art-directed-${kind}`} aria-hidden="true">
      <img src="/brand/aixion-systems-visual.png" alt="" />
      <div className="visual-kicker"><span>{kicker}</span><span>AIXION / PUBLIC VIEW</span></div>
      <div className="art-directed-caption">{caption}</div>
    </div>
  );
}

function TradeBotVisual() { return <ArtDirectedVisual kind="tradebot" kicker="MARKET INTELLIGENCE" caption="Data truth, research boundaries and human authority remain distinct." />; }
function ControlCoreVisual() { return <ArtDirectedVisual kind="control-core" kicker="GOVERNED ORCHESTRATION" caption="Context, tools, policy and evidence form an inspectable execution path." />; }
function AutomationVisual() { return <ArtDirectedVisual kind="automation" kicker="WORKFLOW SYSTEMS" caption="State changes, retries and outcomes stay visible by design." />; }
function AnalyticsVisual() { return <ArtDirectedVisual kind="analytics" kicker="DECISION INTELLIGENCE" caption="Questions become observable views before they become decisions." />; }
function JourneyVisual() { return <ArtDirectedVisual kind="journey" kicker="ENGINEERING EVOLUTION" caption="The tools changed. The requirement for observable state did not." />; }
function AboutVisual() { return <ArtDirectedVisual kind="about" kicker="AIXION / ENGINEERING PROFILE" caption="Quality engineering is the thread connecting systems, automation, data and AI." />; }

export function SystemVisual({ kind }: { kind: VisualKind }) {
  if (kind === "home") return <LabFieldVisual />;
  if (kind === "tradebot") return <TradeBotVisual />;
  if (kind === "control-core") return <ControlCoreVisual />;
  if (kind === "automation") return <AutomationVisual />;
  if (kind === "analytics") return <AnalyticsVisual />;
  if (kind === "journey") return <JourneyVisual />;
  return <AboutVisual />;
}

export function VisualForSystem({ system }: { system: SystemRecord }) {
  return <SystemVisual kind={kindForSystem(system)} />;
}
