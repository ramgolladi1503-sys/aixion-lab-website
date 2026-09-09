"use client";

import { useState } from "react";
import { haptics } from "@/lib/audio-haptics";

type Scenario = {
  id: string;
  name: string;
  ci: string;
  sampleSize: string;
  pValThreshold: string;
  stability: "ROBUST" | "FRAGILE" | "REJECTED";
  statusNote: string;
  proofHash: string;
};

const scenarios: Record<string, Scenario[]> = {
  "opening-session-market-structure": [
    {
      id: "conservative",
      name: "Conservative (99% CI)",
      ci: "99.0%",
      sampleSize: "1,420 sessions",
      pValThreshold: "p < 0.001",
      stability: "ROBUST",
      statusNote: "Spread diffusion recurrence remains statistically distinguishable from random walk.",
      proofHash: "sha256:8f2b31e9c704a2...f3"
    },
    {
      id: "baseline",
      name: "Baseline Holdout (95% CI)",
      ci: "95.0%",
      sampleSize: "840 sessions",
      pValThreshold: "p < 0.01",
      stability: "ROBUST",
      statusNote: "Survives holdout boundary across non-overlapping quarterly windows.",
      proofHash: "sha256:4a91c0bb7e11d0...a8"
    },
    {
      id: "stress",
      name: "Regime Shift Stress Test",
      ci: "High Volatility Regimes",
      sampleSize: "320 sessions",
      pValThreshold: "p < 0.05",
      stability: "FRAGILE",
      statusNote: "Signal decay accelerates when exchange latency variance exceeds 14ms; quarantined.",
      proofHash: "sha256:e178a9c41040f2...91"
    }
  ],
  "default": [
    {
      id: "baseline",
      name: "Empirical Baseline",
      ci: "95.0% CI",
      sampleSize: "500 samples",
      pValThreshold: "p < 0.01",
      stability: "ROBUST",
      statusNote: "Frozen hypothesis adheres strictly to pre-registered evaluation criteria.",
      proofHash: "sha256:7c92b8d0012e84...02"
    },
    {
      id: "holdout",
      name: "Holdout Separation",
      ci: "Blind Verification",
      sampleSize: "300 samples",
      pValThreshold: "p < 0.005",
      stability: "ROBUST",
      statusNote: "No outcome knowledge leaked prior to candidate freeze.",
      proofHash: "sha256:901aef47c61d55...b9"
    }
  ]
};

export function ResearchWorkbench({ slug }: { slug: string }) {
  const activeScenarios = scenarios[slug] || scenarios["default"];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const scenario = activeScenarios[selectedIdx];

  return (
    <div className="research-workbench panel panel-pad" aria-label="Interactive Research Workbench">
      <div className="workbench-header">
        <div>
          <p className="eyebrow"><span className="brand-dot" /> EMPIRICAL RESEARCH WORKBENCH</p>
          <h3 className="workbench-title">Interactive Sensitivity & Boundary Inspection</h3>
          <p className="workbench-subtitle">Toggle hypothesis evaluation parameters to inspect candidate stability under varying confidence intervals and regime stresses.</p>
        </div>
        <div className="workbench-hash" title="Cryptographic record identifier">
          <small>DATA COMMIT HASH</small>
          <code>{scenario.proofHash}</code>
        </div>
      </div>

      <div className="workbench-controls" role="tablist" aria-label="Hypothesis test scenarios">
        {activeScenarios.map((item, idx) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={idx === selectedIdx}
            className={`workbench-scenario-btn ${idx === selectedIdx ? "is-active" : ""}`}
            onClick={() => {
              setSelectedIdx(idx);
              haptics.playToggle();
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="workbench-metrics-grid" aria-live="polite">
        <div className="workbench-metric-box">
          <span>CONFIDENCE INTERVAL</span>
          <strong>{scenario.ci}</strong>
        </div>
        <div className="workbench-metric-box">
          <span>SAMPLE HORIZON</span>
          <strong>{scenario.sampleSize}</strong>
        </div>
        <div className="workbench-metric-box">
          <span>SIGNIFICANCE CRITERIA</span>
          <strong>{scenario.pValThreshold}</strong>
        </div>
        <div className="workbench-metric-box">
          <span>HYPOTHESIS STABILITY</span>
          <strong className={`stability-val stability-${scenario.stability.toLowerCase()}`}>
            {scenario.stability}
          </strong>
        </div>
      </div>

      <div className="workbench-note">
        <span className="workbench-note-tag">STATE INVARIANT</span>
        <p>{scenario.statusNote}</p>
      </div>
    </div>
  );
}
