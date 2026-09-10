"use client";

import Link from "next/link";
import { useState } from "react";
import { systems } from "@/lib/site-data";

const systemImages: Record<string, string> = {
  tradebot: "/textures/card-tradebot.webp",
  "control-core": "/textures/card-control.webp",
  automation: "/textures/card-automation.webp",
  analytics: "/textures/card-analytics.webp",
};

export default function SystemsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSystems = activeFilter === "all" 
    ? systems 
    : systems.filter(s => s.state.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="unseen-projects-section" style={{ paddingTop: "8rem" }}>
      <header className="unseen-projects-header">
        <h1 className="unseen-projects-title">Systems Registry</h1>
        <div className="unseen-filter-bar">
          {[
            { id: "all", label: "All Systems", count: 4 },
            { id: "validating", label: "Validating", count: 1 },
            { id: "building", label: "Building", count: 2 },
            { id: "research", label: "Research", count: 1 },
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

      <div className="unseen-cards-grid">
        {filteredSystems.map(system => (
          <Link 
            key={system.id} 
            href={`/systems/${system.slug}`}
            className="unseen-card"
          >
            <div className="unseen-card-image-wrap">
              <img 
                src={systemImages[system.slug] || "/textures/card-tradebot.webp"} 
                alt={system.name}
                className="unseen-card-image"
              />
            </div>
            <div className="unseen-card-footer">
              <div>
                <h2 className="unseen-card-name" style={{ fontSize: "1.25rem" }}>{system.name}</h2>
                <p className="unseen-card-desc">{system.descriptor}</p>
                <p style={{ margin: "0.4rem 0 0", fontSize: "0.75rem", fontFamily: "var(--font-mono)", opacity: 0.6 }}>
                  GATE: {system.currentGate.toUpperCase()} · STATUS: {system.state}
                </p>
              </div>
              <div className="unseen-card-arrow">↘</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
