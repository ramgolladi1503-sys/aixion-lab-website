"use client";

import Link from "next/link";
import { journey } from "@/lib/site-data";

export default function JourneyPage() {
  return (
    <div className="unseen-projects-section" style={{ paddingTop: "8rem" }}>
      <header className="unseen-projects-header">
        <h1 className="unseen-projects-title">Engineering Journey</h1>
        <p style={{ maxWidth: "620px", margin: "0 auto 2.5rem", color: "var(--unseen-muted)", fontSize: "1.05rem" }}>
          From quality engineering and automation to autonomous agents and quantitative systems.
        </p>
      </header>

      <div style={{ maxWidth: "880px", margin: "0 auto", position: "relative" }}>
        {journey.map(([num, title, desc]) => (
          <div 
            key={num}
            style={{ 
              display: "grid", 
              gridTemplateColumns: "80px 1fr", 
              gap: "2.5rem", 
              padding: "2.5rem 0",
              borderBottom: "1px solid rgba(33, 33, 33, 0.12)",
              alignItems: "baseline"
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", opacity: 0.4 }}>
              {num}
            </span>
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 400, margin: "0 0 0.6rem", letterSpacing: "-0.02em" }}>
                {title}
              </h2>
              <p style={{ margin: 0, color: "var(--unseen-muted)", fontSize: "1.05rem", lineHeight: 1.5 }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
