"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { UnseenWorld } from "@/components/unseen-world";
import { systems } from "@/lib/site-data";

const systemImages: Record<string, string> = {
  tradebot: "/textures/card-tradebot.webp",
  "control-core": "/textures/card-control.webp",
  automation: "/textures/card-automation.webp",
  analytics: "/textures/card-analytics.webp",
};

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [entered, setEntered] = useState(false);

  // Initialize smooth momentum scrolling identical to unseen.co
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const filteredSystems = activeFilter === "all" 
    ? systems 
    : systems.filter(s => s.state.toLowerCase() === activeFilter.toLowerCase());

  return (
    <>
      {/* 1. Interactive 3D Architectural Scene & Monogram Pre-Loader Gate */}
      <section className="unseen-hero-container" style={{ height: "100vh" }}>
        <UnseenWorld entered={entered} onEnter={() => setEntered(true)} />

        {/* Once entered: Clean ambient HUD prompts */}
        {entered && (
          <div 
            style={{
              position: "absolute",
              bottom: "4.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <a 
              href="#systems"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(33, 33, 33, 0.1)",
                padding: "0.5rem 1.4rem",
                borderRadius: "999px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "#212121",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease",
              }}
            >
              Explore Systems <span>↓</span>
            </a>
          </div>
        )}
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
