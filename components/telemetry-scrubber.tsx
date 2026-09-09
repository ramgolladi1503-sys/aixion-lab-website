"use client";

import { useState } from "react";

type Stage = {
  id: string;
  step: string;
  label: string;
  timeOffset: string;
  boundary: "PERMISSIVE" | "GUARDED" | "HARD_GATE";
  status: "NORMAL" | "VERIFIED" | "ISOLATED";
  details: string;
  invariant: string;
};

const defaultStages: Stage[] = [
  {
    id: "01",
    step: "DATA INGESTION",
    label: "Tick & Book Feed Intake",
    timeOffset: "0.0ms",
    boundary: "PERMISSIVE",
    status: "NORMAL",
    details: "Market data streams parsed through stateless ring buffer. Timestamp authority locked to exchange packet arrival.",
    invariant: "No trading decisions or authority can execute inside ingestion threads."
  },
  {
    id: "02",
    step: "STRUCTURAL DIFFUSION",
    label: "Candidate Signal Extraction",
    timeOffset: "+1.2ms",
    boundary: "GUARDED",
    status: "NORMAL",
    details: "Statistical model scans order-book spread elasticity vs historical holdout distributions.",
    invariant: "Signal logic operates strictly read-only on frozen memory snapshots."
  },
  {
    id: "03",
    step: "POLICY GATE CHECK",
    label: "Risk & Exposure Boundary",
    timeOffset: "+2.1ms",
    boundary: "HARD_GATE",
    status: "VERIFIED",
    details: "Evaluates hard position limits, drawdown caps, and circuit-breaker telemetry before state dispatch.",
    invariant: "A failure at this boundary immediately trips circuit and discards action payload."
  },
  {
    id: "04",
    step: "AUTHORITY HANDOFF",
    label: "Human-in-Loop Governance",
    timeOffset: "+3.4ms",
    boundary: "HARD_GATE",
    status: "ISOLATED",
    details: "Execution order generated but held outside autonomous boundary pending authenticated supervisor token.",
    invariant: "Automated models cannot self-authorize capital commitments."
  },
  {
    id: "05",
    step: "TELEMETRY COMMIT",
    label: "Immutable Proof Recording",
    timeOffset: "+4.2ms",
    boundary: "GUARDED",
    status: "VERIFIED",
    details: "Full inputs, signal states, risk checks and human authorization token cryptographically logged.",
    invariant: "Evidence must persist prior to any external network dispatch."
  }
];

export function InteractiveTelemetryScrubber({ systemName = "TradeBot" }: { systemName?: string }) {
  const [activeStep, setActiveStep] = useState(2); // default on Policy Gate Check
  const stage = defaultStages[activeStep];

  return (
    <div className="telemetry-scrubber panel panel-pad" aria-label={`${systemName} Interactive Telemetry Scrubber`}>
      <div className="telemetry-header">
        <div>
          <p className="eyebrow"><span className="brand-dot" /> INSPECTABLE EXECUTION TELEMETRY</p>
          <h3 className="telemetry-title">{systemName} Stage Scrubber</h3>
          <p className="telemetry-subtitle">Scrub through the runtime boundary sequence to inspect how authority, evidence, and risk gates are strictly separated.</p>
        </div>
        <div className="telemetry-badge-group">
          <span className="telemetry-badge telemetry-badge-live">SIMULATED HUD</span>
          <span className="telemetry-badge">STATE GATE 0{activeStep + 1} / 05</span>
        </div>
      </div>

      <div className="telemetry-timeline" role="tablist" aria-label="Execution stages">
        {defaultStages.map((item, index) => {
          const isActive = index === activeStep;
          const isPassed = index < activeStep;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              className={`telemetry-step-node ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`}
              onClick={() => setActiveStep(index)}
            >
              <span className="node-pip">
                <i />
              </span>
              <span className="node-label">
                <small>{item.timeOffset}</small>
                <strong>{item.step}</strong>
              </span>
            </button>
          );
        })}
      </div>

      <div className="telemetry-detail-card" aria-live="polite">
        <div className="telemetry-detail-top">
          <div>
            <span className="telemetry-step-id">STAGE {stage.id}</span>
            <h4 className="telemetry-step-label">{stage.label}</h4>
          </div>
          <div className="telemetry-tags">
            <span className={`gate-tag gate-${stage.boundary.toLowerCase()}`}>
              BOUNDARY: {stage.boundary}
            </span>
            <span className={`status-tag status-${stage.status.toLowerCase()}`}>
              GATE: {stage.status}
            </span>
          </div>
        </div>

        <p className="telemetry-desc">{stage.details}</p>

        <div className="telemetry-invariant">
          <span className="invariant-title">ENFORCED INVARIANT</span>
          <p className="invariant-body">{stage.invariant}</p>
        </div>
      </div>
    </div>
  );
}
