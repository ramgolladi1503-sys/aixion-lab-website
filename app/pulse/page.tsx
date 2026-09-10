"use client";

import Link from "next/link";
import { systems } from "@/lib/site-data";

export default function PulsePage() {
  return (
    <div className="unseen-projects-section" style={{ paddingTop: "8rem" }}>
      <header className="unseen-projects-header">
        <h1 className="unseen-projects-title">Lab Pulse</h1>
        <p style={{ maxWidth: "620px", margin: "0 auto 2.5rem", color: "var(--unseen-muted)", fontSize: "1.05rem" }}>
          Live operational status, verification gates, and evidence boundaries across all Aixion Lab engineering tracks.
        </p>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gap: "2rem" }}>
        {systems.map((system) => (
          <div 
            key={system.id} 
            style={{ 
              background: "#ffffff", 
              padding: "2.5rem", 
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              border: "1px solid rgba(33, 33, 33, 0.08)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--unseen-muted)" }}>
                {system.id}
              </span>
              <span style={{ 
                fontFamily: "var(--font-mono)", 
                fontSize: "0.75rem", 
                padding: "0.3rem 0.8rem", 
                borderRadius: "999px",
                background: "var(--unseen-bg)",
                fontWeight: 500
              }}>
                {system.state}
              </span>
            </div>
            
            <h2 style={{ fontSize: "1.8rem", fontWeight: 400, margin: "0 0 0.8rem", letterSpacing: "-0.02em" }}>
              {system.name}
            </h2>
            <p style={{ color: "var(--unseen-muted)", fontSize: "1rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              {system.descriptor}
            </p>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "1.2rem", 
              borderTop: "1px solid rgba(33, 33, 33, 0.08)",
              paddingTop: "1.2rem"
            }}>
              <div>
                <span style={{ display: "block", fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--unseen-muted)" }}>
                  CURRENT GATE
                </span>
                <strong style={{ fontSize: "0.9rem", fontWeight: 500 }}>{system.currentGate}</strong>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--unseen-muted)" }}>
                  FOCUS
                </span>
                <span style={{ fontSize: "0.85rem" }}>{system.currentFocus}</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--unseen-muted)" }}>
                  NEXT GATE
                </span>
                <span style={{ fontSize: "0.85rem" }}>{system.nextGate}</span>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
              <Link 
                href={`/systems/${system.slug}`}
                style={{ 
                  textDecoration: "none", 
                  color: "var(--unseen-stone)", 
                  fontSize: "0.85rem", 
                  fontWeight: 500,
                  borderBottom: "1px solid var(--unseen-stone)",
                  paddingBottom: "0.2rem"
                }}
              >
                Inspect System Architecture ↘
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
