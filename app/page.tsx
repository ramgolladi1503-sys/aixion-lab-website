"use client";

import Link from "next/link";
import { useState } from "react";
import { UnseenAmbientCanvas } from "@/components/unseen-ambient-canvas";
import { systems } from "@/lib/site-data";

const systemImages: Record<string, string> = {
  tradebot: "/textures/card-tradebot.webp",
  "control-core": "/textures/card-control.webp",
  automation: "/textures/card-automation.webp",
  analytics: "/textures/card-analytics.webp",
};

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSystems = activeFilter === "all" 
    ? systems 
    : systems.filter(s => s.state.toLowerCase() === activeFilter.toLowerCase());

  return (
    <>
      {/* 1. Fullscreen Minimalist Kinetic Hero matching Unseen Studio entry */}
      <section className="unseen-hero-container">
        <UnseenAmbientCanvas />
        <div className="unseen-hero-content">
          <div className="unseen-hero-symbol" aria-hidden="true">
            AX
          </div>
          <h1 className="unseen-hero-title">AIXION LAB®</h1>
          <p className="unseen-hero-desc">
            An independent applied engineering lab where intelligence, automation,
            and decision systems move through explicit validation, evidence, and authority boundaries.
          </p>
          <a href="#systems" className="unseen-enter-cta">
            Explore Systems <span>↘</span>
          </a>
        </div>
      </section>

      {/* 2. Selected Systems Grid matching Unseen Selected Projects */}
      <section id="systems" className="unseen-projects-section">
        <header className="unseen-projects-header">
          <h2 className="unseen-projects-title">Selected Systems</h2>
          <div className="unseen-filter-bar">
            {[
              { id: "all", label: "All", count: 4 },
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
                  <h3 className="unseen-card-name">{system.name}</h3>
                  <p className="unseen-card-desc">{system.descriptor}</p>
                </div>
                <div className="unseen-card-arrow">↘</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
