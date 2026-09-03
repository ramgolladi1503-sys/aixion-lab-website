import Link from "next/link";
import type { SystemRecord } from "@/lib/site-data";
import { CinematicImage } from "@/components/cinematic-image";

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
    <div className={compact ? "aixion-signal aixion-signal--compact" : "aixion-signal"} aria-label="Aixion engineering lifecycle" data-aixion-signal>
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
    <nav className="system-visual lab-field-visual" aria-label="Aixion system field" data-motion-visual data-reveal="system-field">
      <CinematicImage kind="home" alt="Cinematic canyon and blue signal field" />
      <div className="visual-kicker" aria-hidden="true"><span>AIXION / SYSTEM FIELD</span><span>PUBLIC VIEW</span></div>
      <SignalDots />
      <svg className="lab-field-lines" viewBox="0 0 620 360" preserveAspectRatio="none" aria-hidden="true">
        <path className="field-path field-path-tradebot" pathLength="1" d="M310 184 C250 175 215 120 115 112" />
        <path className="field-path field-path-core" pathLength="1" d="M310 184 C376 152 425 104 525 102" />
        <path className="field-path field-path-auto" pathLength="1" d="M310 184 C285 228 256 264 220 292" />
        <path className="field-path field-path-analytics" pathLength="1" d="M310 184 C360 224 408 255 492 278" />
      </svg>
      <div className="field-hub" aria-hidden="true"><strong>AIXION</strong><small>STATE / EVIDENCE</small></div>
      <Link className="field-node node-tradebot" href="/systems/tradebot" aria-label="Open TradeBot, validating">
        <span>TRADEBOT</span><small>VALIDATING</small>
      </Link>
      <Link className="field-node node-core" href="/systems/control-core" aria-label="Open Control Core, building">
        <span>CONTROL CORE</span><small>BUILDING</small>
      </Link>
      <Link className="field-node node-auto" href="/systems/automation" aria-label="Open Automation, building">
        <span>AUTOMATION</span><small>BUILDING</small>
      </Link>
      <Link className="field-node node-analytics" href="/systems/analytics" aria-label="Open Analytics Lab, research">
        <span>ANALYTICS</span><small>RESEARCH</small>
      </Link>
      <div className="field-caption" aria-hidden="true">One lifecycle. Different systems. Evidence at every boundary.</div>
    </nav>
  );
}

function TradeBotVisual() {
  const lanes = [
    ["FEED", "Connection / freshness"],
    ["STATE", "Normalization / truth"],
    ["RESEARCH", "Candidate / isolation"],
    ["RISK", "Limits / controls"],
    ["AUTHORITY", "Human decision"],
  ];
  return (
    <div className="system-visual visual-tradebot" aria-hidden="true" data-motion-visual data-reveal="tradebot-architecture">
      <CinematicImage kind="tradebot" alt="Cinematic market intelligence city and chart field" />
      <div className="visual-kicker"><span>MARKET INTELLIGENCE TOPOLOGY</span><span>READ-ONLY PUBLIC MODEL</span></div>
      <div className="tradebot-rail">
        {lanes.map(([label, copy]) => (
          <div className="tradebot-stage" key={label}>
            <strong>{label}</strong>
            <small>{copy}</small>
          </div>
        ))}
      </div>
      <div className="tradebot-evidence-strip">
        <span>DATA TRUTH</span><i /> <span>RESEARCH BOUNDARY</span><i /> <span>RISK GATE</span><i /> <span>HUMAN AUTHORITY</span>
      </div>
      <svg className="tradebot-wave" viewBox="0 0 620 88" preserveAspectRatio="none">
        <path pathLength="1" d="M0 51 C44 8 79 79 123 38 S200 58 242 29 S311 67 354 35 S432 58 468 23 S550 65 620 31" />
        <path pathLength="1" d="M0 63 C65 49 101 73 153 58 S253 61 300 47 S390 67 438 49 S531 60 620 43" />
      </svg>
    </div>
  );
}

function ControlCoreVisual() {
  const nodes = ["INTENT", "CONTEXT", "PLANNER", "AGENTS", "TOOLS", "EVIDENCE", "POLICY", "HUMAN"];
  return (
    <div className="system-visual visual-core" aria-hidden="true" data-motion-visual data-reveal="control-core-architecture">
      <CinematicImage kind="control-core" alt="Cinematic central intelligence tower" />
      <div className="visual-kicker"><span>GOVERNED ORCHESTRATION</span><span>MVP MODEL</span></div>
      <div className="core-map">
        <div className="core-center"><span>CONTROL</span><strong>CORE</strong><small>observable authority</small></div>
        {nodes.map((node, index) => <span className={`core-node core-node-${index + 1}`} key={node}>{node}</span>)}
      </div>
      <div className="trace-preview">
        <span>10:42:14</span><b>PLANNER</b><em>tasks decomposed</em>
        <span>10:42:22</span><b>EVIDENCE</b><em>result captured</em>
        <span>10:42:24</span><b>POLICY</b><em>review required</em>
      </div>
    </div>
  );
}

function AutomationVisual() {
  const rows = [
    ["TRIGGER", "input received", "READY"],
    ["VALIDATE", "contract + preconditions", "PASS"],
    ["PROCESS", "bounded workflow", "RUNNING"],
    ["RETRY", "failure recovery", "POLICY"],
    ["EVIDENCE", "trace + outcome", "CAPTURE"],
  ];
  return (
    <div className="system-visual visual-automation" aria-hidden="true" data-motion-visual data-reveal="automation-architecture">
      <div className="visual-kicker"><span>WORKFLOW / RPA LANE</span><span>OBSERVABLE BY DESIGN</span></div>
      <div className="workflow-lanes">
        {rows.map(([label, copy, state]) => (
          <div className="workflow-row" key={label}>
            <strong>{label}</strong><em>{copy}</em><b>{state}</b>
          </div>
        ))}
      </div>
      <div className="workflow-rule">Retries, state changes and failure handling stay visible.</div>
    </div>
  );
}

function AnalyticsVisual() {
  return (
    <div className="system-visual visual-analytics" aria-hidden="true" data-motion-visual data-reveal="analytics-architecture">
      <div className="visual-kicker"><span>DECISION VIEW</span><span>DATA → INSIGHT → VALIDATE</span></div>
      <div className="analytics-grid">
        <div className="analytics-chart analytics-chart-main">
          <svg viewBox="0 0 360 150" preserveAspectRatio="none">
            <path pathLength="1" d="M0 116 C38 101 58 110 91 75 S151 97 183 58 S247 74 281 38 S326 52 360 24" />
            <path pathLength="1" d="M0 127 C47 119 74 132 119 105 S187 119 222 87 S294 99 360 67" />
          </svg>
          <span>Operational trend / public-safe placeholder</span>
        </div>
        <div className="analytics-metric"><small>QUESTION</small><strong>What changed?</strong></div>
        <div className="analytics-metric"><small>QUALITY</small><strong>Can we trust it?</strong></div>
        <div className="analytics-metric"><small>OUTCOME</small><strong>What decision follows?</strong></div>
      </div>
    </div>
  );
}

function JourneyVisual() {
  const stages = ["QUALITY", "AUTOMATION", "SOFTWARE", "DATA", "ML", "AUTONOMY", "AIXION"];
  return (
    <div className="system-visual visual-journey" aria-hidden="true" data-motion-visual data-reveal="journey-architecture">
      <div className="visual-kicker"><span>ENGINEERING EVOLUTION</span><span>STATE → EVIDENCE → AUTHORITY</span></div>
      <div className="journey-visual-track">
        {stages.map(stage => (
          <div className="journey-visual-stage" key={stage}><span>{stage}</span></div>
        ))}
      </div>
      <div className="journey-visual-note">The tools changed. The questions got stricter.</div>
    </div>
  );
}

function AboutVisual() {
  return (
    <div className="system-visual visual-about" aria-hidden="true" data-motion-visual data-reveal="about-profile">
      <div className="visual-kicker"><span>RAM / ENGINEERING PROFILE</span><span>NO GENERATED PORTRAIT</span></div>
      <div className="about-monogram">R</div>
      <div className="about-notes">
        <span>QUALITY → systems must explain failure</span>
        <span>AUTOMATION → state must remain observable</span>
        <span>AI → authority must remain explicit</span>
      </div>
      <div className="about-signature">Builder behind Aixion Lab</div>
    </div>
  );
}

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
