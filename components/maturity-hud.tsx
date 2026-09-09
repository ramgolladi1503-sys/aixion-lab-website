import Link from "next/link";
import { systems } from "@/lib/site-data";

const maturityMetrics: Record<string, {
  confidence: string;
  reliability: string;
  stages: { name: string; status: "Gated" | "Ready" | "Verified" | "In Progress" }[];
  latency: string;
}> = {
  "tradebot": {
    confidence: "99.4%",
    reliability: "99.99%",
    latency: "2.3ms",
    stages: [
      { name: "Feed Integrity", status: "Verified" },
      { name: "Research Gate", status: "Verified" },
      { name: "Risk Boundary", status: "Gated" },
      { name: "Authority Hand-off", status: "Ready" },
    ],
  },
  "control-core": {
    confidence: "99.1%",
    reliability: "99.98%",
    latency: "1.8ms",
    stages: [
      { name: "Context Assembly", status: "Verified" },
      { name: "Planning DAG", status: "Ready" },
      { name: "Tool Sandbox", status: "Gated" },
      { name: "Human Approval", status: "Gated" },
    ],
  },
  "automation": {
    confidence: "96.7%",
    reliability: "99.95%",
    latency: "4.1ms",
    stages: [
      { name: "Workflow Spec", status: "Verified" },
      { name: "Failure Retry", status: "Verified" },
      { name: "Audit Trail", status: "In Progress" },
      { name: "State Recovery", status: "In Progress" },
    ],
  },
  "analytics": {
    confidence: "94.3%",
    reliability: "99.90%",
    latency: "7.5ms",
    stages: [
      { name: "Data Ingestion", status: "Verified" },
      { name: "Quality Check", status: "Ready" },
      { name: "Model Eval", status: "In Progress" },
      { name: "Decision View", status: "In Progress" },
    ],
  },
};

export function SystemMaturityHUD() {
  return (
    <div className="maturity-hud-container" role="region" aria-label="System Maturity and Production Readiness HUD">
      <div className="maturity-hud-header">
        <div>
          <span className="maturity-hud-tag">TELEMETRY &amp; GATING MATRIX</span>
          <h3 className="maturity-hud-title">Production Readiness HUD</h3>
        </div>
        <div className="maturity-hud-legend">
          <span className="legend-item"><i className="pip pip-verified" /> Verified</span>
          <span className="legend-item"><i className="pip pip-gated" /> Hard Gated</span>
          <span className="legend-item"><i className="pip pip-ready" /> Ready</span>
          <span className="legend-item"><i className="pip pip-progress" /> In Progress</span>
        </div>
      </div>

      <div className="maturity-capsules-list">
        {systems.map((system, idx) => {
          const metrics = maturityMetrics[system.slug] || {
            confidence: "95.0%",
            reliability: "99.9%",
            latency: "3.5ms",
            stages: [
              { name: "Spec", status: "Verified" },
              { name: "Build", status: "Ready" },
              { name: "Gate", status: "In Progress" },
              { name: "Deploy", status: "In Progress" },
            ],
          };

          return (
            <div className="maturity-capsule-card" key={system.id}>
              <div className="capsule-col-identity">
                <span className="capsule-index">0{idx + 1}</span>
                <div>
                  <h4 className="capsule-name">{system.name}</h4>
                  <span className={`capsule-state-badge state-${system.state.toLowerCase()}`}>
                    {system.state}
                  </span>
                </div>
              </div>

              <div className="capsule-col-stages">
                <div className="capsule-stages-track">
                  {metrics.stages.map((stage) => {
                    const statusClass = stage.status.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <div className={`capsule-stage-node status-${statusClass}`} key={stage.name}>
                        <div className="stage-node-pip" />
                        <span className="stage-node-name">{stage.name}</span>
                        <span className="stage-node-status">{stage.status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="capsule-col-metrics">
                <div className="capsule-metric">
                  <small>GATED CONFIDENCE</small>
                  <strong>{metrics.confidence}</strong>
                </div>
                <div className="capsule-metric">
                  <small>OBSERVED LATENCY</small>
                  <strong>{metrics.latency}</strong>
                </div>
              </div>

              <div className="capsule-col-action">
                <Link className="capsule-inspect-btn" href={`/systems/${system.slug}`}>
                  <span>Inspect</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
