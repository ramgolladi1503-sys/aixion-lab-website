"use client";

import React, { useState } from "react";
import { haptics } from "@/lib/audio-haptics";

interface OrderBookLevel {
  price: number;
  bidDepth: number;
  askDepth: number;
  imbalance: number;
}

const SAMPLE_LEVELS: OrderBookLevel[] = [
  { price: 4120.50, bidDepth: 840, askDepth: 120, imbalance: 0.86 },
  { price: 4120.75, bidDepth: 620, askDepth: 210, imbalance: 0.66 },
  { price: 4121.00, bidDepth: 480, askDepth: 350, imbalance: 0.27 },
  { price: 4121.25, bidDepth: 310, askDepth: 420, imbalance: -0.15 },
  { price: 4121.50, bidDepth: 190, askDepth: 580, imbalance: -0.51 },
  { price: 4121.75, bidDepth: 95, askDepth: 740, imbalance: -0.77 },
];

export function OrderBookVisualizer() {
  const [selectedIndex, setSelectedIndex] = useState<number>(2);
  const [phase, setPhase] = useState<"pre_open" | "cross_auction" | "continuous">("cross_auction");

  const currentLevel = SAMPLE_LEVELS[selectedIndex];

  const handleSelectLevel = (idx: number) => {
    setSelectedIndex(idx);
    haptics.playStage();
  };

  const handlePhaseChange = (p: "pre_open" | "cross_auction" | "continuous") => {
    setPhase(p);
    haptics.playToggle();
  };

  return (
    <div className="surface-card orderbook-visualizer" style={{ padding: "24px", marginTop: "24px", border: "1px solid var(--line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 }}>
              Interactive Visualizer
            </span>
            <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid var(--line)", fontFamily: "var(--font-mono)" }}>
              AUCTION DEPTH MATRIX
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: "18px", color: "var(--foreground)", fontWeight: 600 }}>
            Opening Cross Liquidity & Microstructure Skew
          </h3>
        </div>

        <div style={{ display: "flex", gap: "6px", background: "rgba(0,0,0,0.3)", padding: "4px", borderRadius: "8px", border: "1px solid var(--line)" }}>
          {(["pre_open", "cross_auction", "continuous"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePhaseChange(p)}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: "6px",
                border: "none",
                background: phase === p ? "var(--surface-highlight)" : "transparent",
                color: phase === p ? "var(--foreground)" : "var(--muted)",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                transition: "all 0.15s ease",
              }}
            >
              {p.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
        <div>
          <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
            <span>PRICE LEVEL (USD)</span>
            <span>BID / ASK DISTRIBUTION</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {SAMPLE_LEVELS.map((lvl, idx) => {
              const isSelected = idx === selectedIndex;
              const maxDepth = 900;
              const bidWidth = (lvl.bidDepth / maxDepth) * 100;
              const askWidth = (lvl.askDepth / maxDepth) * 100;

              return (
                <button
                  key={lvl.price}
                  type="button"
                  onClick={() => handleSelectLevel(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: isSelected ? "rgba(79, 125, 249, 0.08)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isSelected ? "var(--accent)" : "var(--line)"}`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border-color 0.15s ease, background 0.15s ease",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: isSelected ? 700 : 500, color: isSelected ? "var(--accent)" : "var(--foreground)" }}>
                    ${lvl.price.toFixed(2)}
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px", width: "160px" }}>
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                      <div
                        style={{
                          height: "6px",
                          width: `${bidWidth}%`,
                          background: "#10b981",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                    <div style={{ width: "1px", height: "10px", background: "var(--line)" }} />
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
                      <div
                        style={{
                          height: "6px",
                          width: `${askWidth}%`,
                          background: "#ef4444",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid var(--line)", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
              Level Microstructure Diagnostics
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--foreground)" }}>
                ${currentLevel.price.toFixed(2)}
              </span>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: currentLevel.imbalance > 0 ? "#10b981" : "#ef4444" }}>
                {currentLevel.imbalance > 0 ? "+" : ""}{(currentLevel.imbalance * 100).toFixed(1)}% Imbalance
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div style={{ padding: "8px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", border: "1px solid var(--line)" }}>
                <div style={{ fontSize: "10px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>AGGREGATED BID</div>
                <div style={{ fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-mono)", color: "#10b981", marginTop: "2px" }}>
                  {currentLevel.bidDepth} contracts
                </div>
              </div>
              <div style={{ padding: "8px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", border: "1px solid var(--line)" }}>
                <div style={{ fontSize: "10px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>AGGREGATED ASK</div>
                <div style={{ fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-mono)", color: "#ef4444", marginTop: "2px" }}>
                  {currentLevel.askDepth} contracts
                </div>
              </div>
            </div>

            <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
              {currentLevel.imbalance > 0.4
                ? "Substantial buy-side queue priority identified. Auction indicative price expected to execute upward before clearing continuous book."
                : currentLevel.imbalance < -0.4
                ? "Ask-side supply overhang. Liquidity absorption required before reversion channels stabilize."
                : "Balanced two-sided quote equilibrium. Low probability of slippage beyond spread baseline."}
            </div>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
              PHASE: <strong style={{ color: "var(--foreground)" }}>{phase.toUpperCase()}</strong>
            </span>
            <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
              LATENCY TOLERANCE &le; 1.2ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
