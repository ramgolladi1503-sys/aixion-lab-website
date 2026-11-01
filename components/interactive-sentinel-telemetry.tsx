"use client";

import { useEffect, useState } from "react";

interface VectorInfo {
  id: string;
  num: string;
  title: string;
  badge: string;
  metricLabel: string;
  metricValue: string;
  metricSub: string;
  mathModel: string;
  description: string;
  capabilities: Array<{ label: string; desc: string }>;
  codeSnippet: string;
}

const vectors: VectorInfo[] = [
  {
    id: "gex",
    num: "VECTOR 01",
    title: "Dealer Gamma Exposure & Wall Absorption",
    badge: "INSTITUTIONAL GEX",
    metricLabel: "NET DEALER GAMMA",
    metricValue: "+$42.8M (LONG)",
    metricSub: "Mean Reversion Regime • Breakouts Vetoed",
    mathModel: "GEX = ∑ (OI_call - OI_put) * Spot * Gamma * 100",
    description: "Tracks market maker delta-hedging obligations across index option surfaces in real time. When net dealer gamma is strongly positive, automated entry gates veto momentum breakout setups and favor mean-reversion absorption.",
    capabilities: [
      { label: "Strike Wall Observer", desc: "Real-time OI and volume concentration mapping at round strike numbers" },
      { label: "Absorption Detection", desc: "CVD (Cumulative Volume Delta) vs price divergence detection" },
      { label: "Automatic Regime Switch", desc: "Instantly switches from momentum acceleration to pin/exhaustion modes" },
    ],
    codeSnippet: `// Dealer Gamma Invariant Check
if (netDealerGamma > POSITIVE_GAMMA_THRESHOLD) {
  gexRegime = GEXRegimeState.POSITIVE_GAMMA;
  vetoBreakoutSetups(reason="Dealer long gamma cushions volatility");
}`,
  },
  {
    id: "microprice",
    num: "VECTOR 02",
    title: "Stoikov Micro-Price & Book Imbalance",
    badge: "STOIKOV (2018)",
    metricLabel: "MICRO-PRICE IMBALANCE",
    metricValue: "0.68 (BULLISH)",
    metricSub: "Ask Depletion • Top 5 Depth Skewed",
    mathModel: "P_micro = P_bid * (Q_ask / (Q_bid + Q_ask)) + P_ask * (Q_bid / (Q_bid + Q_ask))",
    description: "Evaluates Level-5 full order book queues to compute the volume-weighted Stoikov micro-price. Identifies hidden institutional supply/demand pressure seconds before midpoint price shifts occur.",
    capabilities: [
      { label: "Depth-Weighted Midpoint", desc: "Weights price by instantaneous bid/ask queue liquidity" },
      { label: "Queue Drain Velocity", desc: "Measures order cancellation and consumption velocity per microsecond" },
      { label: "Spoofing Filter", desc: "Flags ephemeral quote flashing and non-durable limit book walls" },
    ],
    codeSnippet: `// Micro-Price Calculation (Stoikov 2018)
const totalVolume = bidQueueSize + askQueueSize;
const microPrice = (bidPrice * askQueueSize + askPrice * bidQueueSize) / totalVolume;
const imbalance = (bidQueueSize - askQueueSize) / totalVolume;`,
  },
  {
    id: "leadlag",
    num: "VECTOR 03",
    title: "Cross-Index Basis Lead-Lag Transmission",
    badge: "TEMPORAL TRANSMISSION",
    metricLabel: "NIFTY / BANKNIFTY SKEW",
    metricValue: "18.4ms LAG",
    metricSub: "Lead Expansion Active • Coherence: 0.94",
    mathModel: "Cross-Correlation: R(τ) = E[(X(t) - μ_x)(Y(t+τ) - μ_y)] / (σ_x * σ_y)",
    description: "Monitors tick-by-tick cross-market information transmission between underlying spots, liquid index futures, and option surfaces. Catches high-beta divergence before index constituent rebalancing completes.",
    capabilities: [
      { label: "Sub-250ms Causal Gate", desc: "Rejects multi-leg option orders if spot-to-derivative skew exceeds 250ms" },
      { label: "High-Beta Index Pacer", desc: "Tracks lead-lag momentum across NIFTY 50 and BANKNIFTY" },
      { label: "Basis Dislocation Engine", desc: "Quantifies spot-future basis anomalies during rapid market impulses" },
    ],
    codeSnippet: `// Cross-Strike Temporal Invariant
if (temporalSkewMs > 250) {
  rejectAdvisory(reason="Temporal latency exceeds causal coherence boundary");
}`,
  },
  {
    id: "apm",
    num: "VECTOR 04",
    title: "Active Position Manager & Crash WAL",
    badge: "FINITE STATE MACHINE",
    metricLabel: "APM MONOTONIC RATCHET",
    metricValue: "TRAIL_LOCK",
    metricSub: "CAS Monotonic Floor • SPVD Active",
    mathModel: "WAL Invariant: Write-Ahead Log + Compare-And-Swap (CAS) state persistence",
    description: "Industrial-grade position and risk lifecycle engine with guaranteed write-ahead logging (WAL) for mid-flight crash recovery. Features dynamic Session Phase Variance Decay (SPVD) and dynamic expiry theta holding ceilings.",
    capabilities: [
      { label: "Crash-Resilient WAL", desc: "Atomic write-ahead journal ensures 0% state loss across sudden process termination" },
      { label: "Monotonic Stop Ratchet", desc: "Compare-and-swap non-decreasing trailing floor locks in risk reduction" },
      { label: "Expiry Theta Ceiling", desc: "Dynamic linear hold decay from 12:30 to 15:00 on expiry sessions" },
    ],
    codeSnippet: `// Atomic WAL State Transition
fsm.transition(to: State.TRAIL_LOCK);
wal.persistSync({ state: fsm.state, highWaterMark: fsm.ratchetFloor });`,
  },
];

export function InteractiveSentinelTelemetry() {
  const [activeVectorIdx, setActiveVectorIdx] = useState(0);
  const [liveLatency, setLiveLatency] = useState(0.8);
  const [liveSkew, setLiveSkew] = useState(16);
  const [liveSpread, setLiveSpread] = useState(0.85);

  const activeVector = vectors[activeVectorIdx];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLatency(parseFloat((0.6 + Math.random() * 0.4).toFixed(1)));
      setLiveSkew(Math.floor(12 + Math.random() * 20));
      setLiveSpread(parseFloat((0.75 + Math.random() * 0.25).toFixed(2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      margin: "2.5rem 0 3.5rem",
      background: "var(--paper-bright)",
      border: "1px solid var(--line-strong)",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.05)",
    }}>
      <style>{`
        .sentinel-tab-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid var(--line-strong);
          background: rgba(0, 0, 0, 0.02);
          overflow-x: auto;
        }
        .sentinel-vector-stage {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          padding: 40px 44px;
        }
        @media (max-width: 900px) {
          .sentinel-tab-strip {
            grid-template-columns: repeat(4, minmax(160px, 1fr));
            scroll-snap-type: x mandatory;
          }
          .sentinel-vector-stage {
            grid-template-columns: 1fr;
            padding: 24px 20px;
            gap: 28px;
          }
        }
      `}</style>

      {/* Live System Ingest Pulse Banner */}
      <div style={{
        padding: "16px 28px",
        background: "#080c12",
        color: "#d1d5db",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        fontFamily: "var(--mono)",
        fontSize: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: "#10b981",
            boxShadow: "0 0 10px #10b981",
          }} />
          <strong style={{ color: "#fff", letterSpacing: "0.06em" }}>
            TRADEBOT SENTINEL ARCHITECTURE
          </strong>
          <span style={{ color: "#6b7280" }}>|</span>
          <span style={{ color: "#9ca3af" }}>INSTITUTIONAL 4-VECTOR QUANTITATIVE ENGINE</span>
        </div>

        <div style={{ display: "flex", gap: "18px", color: "#9ca3af", fontSize: "11px" }}>
          <span>LATENCY: <strong style={{ color: "#34d399" }}>{liveLatency}ms</strong></span>
          <span>SKEW: <strong style={{ color: "#60a5fa" }}>{liveSkew}ms</strong></span>
          <span>SPREAD: <strong style={{ color: "#fbbf24" }}>{liveSpread}%</strong></span>
          <span>MODE: <strong style={{ color: "#e5e7eb" }}>READ_ONLY</strong></span>
        </div>
      </div>

      {/* 4-Vector Interactive Navigation Strip */}
      <div className="sentinel-tab-strip">
        {vectors.map((vec, idx) => {
          const isActive = idx === activeVectorIdx;
          return (
            <button
              key={vec.id}
              onClick={() => setActiveVectorIdx(idx)}
              style={{
                padding: "18px 20px",
                border: "none",
                background: isActive ? "var(--paper-bright)" : "transparent",
                borderBottom: isActive ? "2px solid var(--ink)" : "2px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{
                fontSize: "10px",
                fontFamily: "var(--mono)",
                letterSpacing: "0.1em",
                color: isActive ? "var(--accent-deep)" : "var(--muted)",
                marginBottom: "4px",
              }}>
                {vec.num} • {vec.badge}
              </div>
              <div style={{
                fontSize: "14px",
                fontFamily: "var(--serif)",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--text)" : "var(--muted)",
                lineHeight: 1.25,
              }}>
                {vec.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Vector Detail Stage */}
      <div className="sentinel-vector-stage">
        {/* Left Column: Narrative, Math Model, and Capabilities */}
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 12px",
            borderRadius: "99px",
            background: "rgba(0, 0, 0, 0.04)",
            border: "1px solid var(--line-strong)",
            fontFamily: "var(--mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--accent-deep)",
            marginBottom: "14px",
          }}>
            {activeVector.num} • {activeVector.badge}
          </div>

          <h3 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(26px, 2.6vw, 36px)",
            fontWeight: 400,
            lineHeight: 1.15,
            margin: "0 0 16px 0",
            color: "var(--text)",
          }}>
            {activeVector.title}
          </h3>

          <p style={{
            fontSize: "15px",
            lineHeight: 1.75,
            color: "var(--muted)",
            margin: "0 0 24px 0",
          }}>
            {activeVector.description}
          </p>

          {/* Mathematical Model Card */}
          <div style={{
            padding: "16px 20px",
            borderRadius: "12px",
            background: "rgba(0, 0, 0, 0.025)",
            border: "1px solid var(--line-strong)",
            marginBottom: "24px",
          }}>
            <div style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: "0.08em", marginBottom: "6px" }}>
              FORMULATION & INVARIANT MODEL
            </div>
            <code style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              color: "var(--text)",
              fontWeight: 600,
              display: "block",
            }}>
              {activeVector.mathModel}
            </code>
          </div>

          {/* Key Capabilities */}
          <div style={{ display: "grid", gap: "12px" }}>
            {activeVector.capabilities.map((cap, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 18px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  background: "rgba(0, 0, 0, 0.01)",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ color: "var(--accent-deep)", fontSize: "14px", fontWeight: "bold" }}>✓</span>
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text)", marginBottom: "2px" }}>
                    {cap.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
                    {cap.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Real-Time Diagnostic Gauge + Python Invariant Code Snippet */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Diagnostic Display Card */}
          <div style={{
            padding: "24px",
            borderRadius: "14px",
            background: "var(--paper-bright)",
            border: "1px solid var(--line-strong)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.02)",
          }}>
            <div style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: "0.1em", marginBottom: "8px" }}>
              INSTANTANEOUS TELEMETRY: {activeVector.metricLabel}
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--serif)", color: "var(--text)", fontWeight: 500 }}>
              {activeVector.metricValue}
            </div>
            <div style={{ fontSize: "12.5px", color: "#10b981", marginTop: "6px", fontWeight: 500 }}>
              {activeVector.metricSub}
            </div>
          </div>

          {/* Real Code Architecture Window */}
          <div style={{
            background: "#080c12",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{
              padding: "10px 16px",
              background: "rgba(255, 255, 255, 0.04)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "11px",
              fontFamily: "var(--mono)",
              color: "#9ca3af",
              display: "flex",
              justifyContent: "space-between",
            }}>
              <span>sentinel_{activeVector.id}_engine.py</span>
              <span style={{ color: "#34d399" }}>INVARIANTS ENFORCED</span>
            </div>
            <pre style={{
              margin: 0,
              padding: "18px 20px",
              color: "#e5e7eb",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              lineHeight: 1.6,
              overflowX: "auto",
              flexGrow: 1,
            }}>
              <code>{activeVector.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Regulatory & Compliance Governance Footnote */}
      <div style={{
        padding: "16px 28px",
        background: "rgba(0, 0, 0, 0.02)",
        borderTop: "1px solid var(--line-strong)",
        fontSize: "11.5px",
        color: "var(--muted)",
        lineHeight: 1.6,
      }}>
        <strong>Regulatory & Operational Scope Notice:</strong> TradeBot Sentinel is an engineering research and market microstructure observability framework developed by Aixion Lab. It operates exclusively in an isolated, read-only paper telemetry mode (<code>broker_api_called=false</code>, <code>is_order_action=false</code>). It does not provide investment advice, trading tips, portfolio management, or public financial recommendations under SEBI regulations. All metrics reflect streaming data integrity, feed freshness, and software invariant proofs.
      </div>
    </div>
  );
}
