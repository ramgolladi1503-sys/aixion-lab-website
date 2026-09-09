"use client";

import React, { useState } from "react";
import { haptics } from "@/lib/audio-haptics";

type Subsystem = "FEED" | "RESEARCH" | "RISK" | "AUTHORITY";

interface SubsystemStatus {
  id: Subsystem;
  name: string;
  state: "LOCKED" | "VALIDATING" | "ISOLATED" | "ACTIVE";
  metricLabel: string;
  metricValue: string;
  metricSub: string;
  proofNote: string;
  invariant: string;
}

const tradeBotState: SubsystemStatus[] = [
  {
    id: "FEED",
    name: "FEED INTEGRITY & RECOVERY",
    state: "VALIDATING",
    metricLabel: "TRUTH CONVERGENCE",
    metricValue: "INDEPENDENT",
    metricSub: "Feed freshness decoupled from connection",
    proofNote: "Subscription convergence verified before tick consumption",
    invariant: "Connected ≠ Healthy. Stale feed prevention is enforced prior to state reconstruction.",
  },
  {
    id: "RESEARCH",
    name: "CANDIDATE RESEARCH GATE",
    state: "ISOLATED",
    metricLabel: "EVALUATION BOUNDARY",
    metricValue: "FROZEN",
    metricSub: "Zero holdout leakage to strategy logic",
    proofNote: "Frozen-hypothesis separation enforced",
    invariant: "Research candidate signals cannot execute outside sandbox without explicit governance approval.",
  },
  {
    id: "RISK",
    name: "POLICY & CIRCUIT BREAKER",
    state: "LOCKED",
    metricLabel: "DRAWDOWN & EXPOSURE",
    metricValue: "HARD CAP",
    metricSub: "Zero autonomous override permitted",
    proofNote: "Deterministic circuit breakers active",
    invariant: "Exceeding volatility or margin threshold dispatches hard kill-switch and purges payload.",
  },
  {
    id: "AUTHORITY",
    name: "EXECUTION AUTHORITY",
    state: "ACTIVE",
    metricLabel: "HUMAN-IN-THE-LOOP",
    metricValue: "BOUNDED",
    metricSub: "Decision support separated from order dispatch",
    proofNote: "Public architecture / private strategy edge",
    invariant: "Signals inform human operators; autonomous capital dispatch is strictly partitioned.",
  },
];

export function LiveTelemetryFeed() {
  const [activeSubsystem, setActiveSubsystem] = useState<Subsystem>("FEED");

  const current = tradeBotState.find(s => s.id === activeSubsystem) ?? tradeBotState[0];

  const handleSelect = (id: Subsystem) => {
    setActiveSubsystem(id);
    haptics.playToggle();
  };

  return (
    <div className="surface-card panel-pad" style={{ marginTop: "24px", border: "1px solid var(--line)", background: "rgba(10,10,14,0.75)", backdropFilter: "blur(16px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "var(--fresh-mint)", boxShadow: "0 0 8px var(--fresh-mint)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--foreground)", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
              TradeBot · Operating State & Validation Matrix
            </span>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", maxWidth: "620px" }}>
            Authentic operational state from TradeBot (AX-SYS-001). Demonstrating explicit boundary separation between data truth, research isolation, risk gates, and human authority.
          </p>
        </div>

        <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.03)", padding: "3px", borderRadius: "8px", border: "1px solid var(--line)" }} role="tablist" aria-label="TradeBot subsystems">
          {tradeBotState.map(s => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activeSubsystem === s.id}
              type="button"
              onClick={() => handleSelect(s.id)}
              style={{
                fontSize: "11px",
                padding: "5px 10px",
                borderRadius: "6px",
                border: "none",
                background: activeSubsystem === s.id ? "rgba(255,255,255,0.1)" : "transparent",
                color: activeSubsystem === s.id ? "var(--foreground)" : "var(--muted)",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontWeight: activeSubsystem === s.id ? 600 : 400,
                transition: "all 0.2s ease",
              }}
            >
              {s.id}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "16px" }}>
        {tradeBotState.map(sub => {
          const isSelected = sub.id === activeSubsystem;
          return (
            <div
              key={sub.id}
              onClick={() => handleSelect(sub.id)}
              style={{
                padding: "16px",
                background: isSelected ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
                borderRadius: "8px",
                border: `1px solid ${isSelected ? "var(--fresh-cyan)" : "var(--line)"}`,
                cursor: "pointer",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "10px", color: isSelected ? "var(--fresh-cyan)" : "var(--muted)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                  {sub.name}
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontFamily: "var(--font-mono)",
                    padding: "2px 6px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: sub.state === "VALIDATING" ? "var(--fresh-cyan)" : sub.state === "LOCKED" ? "#f59e0b" : "var(--fresh-mint)",
                  }}
                >
                  {sub.state}
                </span>
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--foreground)" }}>
                {sub.metricValue}
              </div>
              <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>
                {sub.metricSub}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "14px 18px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ fontSize: "12px", color: "var(--fresh-muted)" }}>
          <strong style={{ color: "var(--foreground)", marginRight: "8px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
            GOVERNANCE INVARIANT [{current.id}]:
          </strong>
          {current.invariant}
        </div>
        <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--fresh-mint)", border: "1px solid rgba(156,245,204,0.3)", padding: "3px 8px", borderRadius: "999px" }}>
          {current.proofNote}
        </div>
      </div>
    </div>
  );
}
