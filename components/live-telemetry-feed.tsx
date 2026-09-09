"use client";

import React, { useState, useEffect } from "react";
import { haptics } from "@/lib/audio-haptics";

export function LiveTelemetryFeed() {
  const [opsRate, setOpsRate] = useState(24380);
  const [latencyJitter, setLatencyJitter] = useState(1.42);
  const [queueDepth, setQueueDepth] = useState(14);
  const [circuitTripped, setCircuitTripped] = useState(false);
  const [updateFrequency, setUpdateFrequency] = useState<"1hz" | "5hz" | "paused">("1hz");

  useEffect(() => {
    if (updateFrequency === "paused") return;

    const intervalMs = updateFrequency === "5hz" ? 200 : 1000;
    const timer = setInterval(() => {
      setOpsRate(prev => Math.floor(24000 + (Math.random() * 800) - 400));
      setLatencyJitter(prev => +(1.4 + (Math.random() * 0.15) - 0.05).toFixed(2));
      setQueueDepth(prev => Math.floor(Math.max(4, Math.min(32, 14 + (Math.random() * 8) - 4))));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [updateFrequency]);

  const handleFreqChange = (freq: "1hz" | "5hz" | "paused") => {
    setUpdateFrequency(freq);
    haptics.playToggle();
  };

  return (
    <div className="surface-card panel-pad" style={{ marginTop: "24px", border: "1px solid var(--line)", background: "rgba(0,0,0,0.4)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--foreground)", fontWeight: 600 }}>
              Live Telemetry Jitter & Buffer Ingestion
            </span>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)" }}>
            Simulated ring-buffer metrics reflecting exchange socket packet cadence and deterministic validation gates.
          </p>
        </div>

        <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.03)", padding: "3px", borderRadius: "6px", border: "1px solid var(--line)" }}>
          {(["1hz", "5hz", "paused"] as const).map(freq => (
            <button
              key={freq}
              type="button"
              onClick={() => handleFreqChange(freq)}
              style={{
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "none",
                background: updateFrequency === freq ? "var(--surface-highlight)" : "transparent",
                color: updateFrequency === freq ? "var(--foreground)" : "var(--muted)",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              {freq.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: "10px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>THROUGHPUT RATE</div>
          <div style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--foreground)", marginTop: "4px" }}>
            {opsRate.toLocaleString()} <span style={{ fontSize: "11px", fontWeight: 400, color: "var(--muted)" }}>ops/s</span>
          </div>
        </div>

        <div style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: "10px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>WIRE-TO-DECISION JITTER</div>
          <div style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--foreground)", marginTop: "4px" }}>
            {latencyJitter} <span style={{ fontSize: "11px", fontWeight: 400, color: "var(--muted)" }}>ms</span>
          </div>
        </div>

        <div style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: "10px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>SOCKET RING BUFFER</div>
          <div style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--foreground)", marginTop: "4px" }}>
            {queueDepth} / 256 <span style={{ fontSize: "11px", fontWeight: 400, color: "#10b981" }}>CLEAR</span>
          </div>
        </div>

        <div style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: "10px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>POLICY GATE ISOLATION</div>
          <div style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "#10b981", marginTop: "4px" }}>
            ACTIVE <span style={{ fontSize: "11px", fontWeight: 400, color: "var(--muted)" }}>LOCKED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
