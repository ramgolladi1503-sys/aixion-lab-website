"use client";

import Link from "next/link";
import { useState } from "react";
import { systems } from "@/lib/site-data";
import { systemDetails, PublicSystemState } from "@/lib/system-detail-data";

const systemCardImages: Record<string, string> = {
  tradebot: "/textures/systems/card-tradebot.svg",
  "control-core": "/textures/systems/card-control.svg",
  automation: "/textures/systems/card-automation.svg",
  analytics: "/textures/systems/card-analytics.svg",
};

export default function SystemsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const flagships = systems.filter(s => s.slug === "tradebot" || s.slug === "control-core");
  const experimental = systems.filter(s => s.slug === "analytics" || s.slug === "automation");

  const filterPasses = (slug: string) => {
    if (activeFilter === "all") return true;
    const detail = systemDetails[slug];
    if (!detail) return false;
    return detail.publicState.toLowerCase() === activeFilter.toLowerCase();
  };

  const filteredFlagships = flagships.filter(s => filterPasses(s.slug));
  const filteredExperimental = experimental.filter(s => filterPasses(s.slug));

  return (
    <div className="unseen-projects-section" style={{ paddingTop: "8rem", minHeight: "85vh" }}>
      <header className="unseen-projects-header" style={{ marginBottom: "3.5rem" }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.14em",
          color: "var(--unseen-muted)",
          textTransform: "uppercase",
          margin: "0 0 0.6rem"
        }}>
          ENGINEERING DISCIPLINES &amp; WORKFLOWS
        </p>
        <h1 className="unseen-projects-title" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
          Systems Registry
        </h1>
        <div className="unseen-filter-bar">
          {[
            { id: "all", label: "All Systems", count: 4 },
            { id: "validation", label: "Validation", count: 1 },
            { id: "development", label: "Development", count: 1 },
            { id: "exploration", label: "Exploration", count: 2 },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`unseen-filter-btn ${activeFilter === tab.id ? "active" : ""}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label} <span className="count">{tab.count}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="systems-hierarchy-wrap">
        {/* Section 1: Flagship Systems (Alternating stately editorial feature rows) */}
        {filteredFlagships.length > 0 && (
          <section aria-label="Flagship Systems" style={{ marginBottom: "5rem" }}>
            <div className="systems-group-header">
              <span className="systems-group-label">Flagship Systems</span>
              <span className="systems-group-meta">Governed Architecture · Dedicated Case Studies</span>
            </div>

            <div className="flagship-list">
              {filteredFlagships.map((system, idx) => {
                const detail = systemDetails[system.slug];
                const publicState = detail?.publicState || "Validation";
                const isReverse = idx % 2 === 1;

                return (
                  <Link
                    key={system.id}
                    href={`/systems/${system.slug}`}
                    className={`flagship-feature-row ${isReverse ? "reverse" : ""}`}
                  >
                    <div className="flagship-media-col">
                      <img
                        src={systemCardImages[system.slug] || "/textures/systems/card-tradebot.svg"}
                        alt={system.name}
                      />
                    </div>
                    <div className="flagship-info-col">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
                        <span style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.12em",
                          color: "#7A2021",
                          textTransform: "uppercase"
                        }}>
                          FLAGSHIP 0{idx + 1}
                        </span>
                        <span className={`public-state-badge state-${publicState.toLowerCase()}`}>
                          <i className="public-state-dot" />
                          {publicState}
                        </span>
                      </div>
                      <h2 className="flagship-card-title">{system.name}</h2>
                      <p className="flagship-card-desc">
                        {system.descriptor}
                      </p>
                      <span className="flagship-card-link">
                        Explore architecture specification →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 2: Experimental & Early-Stage Work (Disciplined compact grid) */}
        {filteredExperimental.length > 0 && (
          <section aria-label="Experimental Systems">
            <div className="systems-group-header">
              <span className="systems-group-label">Experimental &amp; Early-Stage Work</span>
              <span className="systems-group-meta">Exploratory Prototypes</span>
            </div>

            <div className="experimental-grid">
              {filteredExperimental.map(system => {
                const detail = systemDetails[system.slug];
                const publicState = detail?.publicState || "Exploration";
                return (
                  <Link
                    key={system.id}
                    href={`/systems/${system.slug}`}
                    className="experimental-card"
                  >
                    <div className="unseen-card-image-wrap">
                      <img
                        src={systemCardImages[system.slug] || "/textures/systems/card-analytics.svg"}
                        alt={system.name}
                        className="unseen-card-image"
                      />
                    </div>
                    <div className="unseen-card-footer">
                      <div style={{ flex: 1, paddingRight: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
                          <h2 className="experimental-card-title">{system.name}</h2>
                          <span className={`public-state-badge state-${publicState.toLowerCase()}`}>
                            <i className="public-state-dot" />
                            {publicState}
                          </span>
                        </div>
                        <p className="unseen-card-desc" style={{ fontSize: "0.85rem" }}>
                          {system.descriptor}
                        </p>
                      </div>
                      <div className="unseen-card-arrow">↘</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
