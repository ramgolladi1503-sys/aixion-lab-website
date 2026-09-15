"use client";

import { useState } from "react";
import { SystemDetailData } from "@/lib/system-detail-data";

export function SystemHowItWorks({ data }: { data: SystemDetailData }) {
  const { howItWorks } = data;
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="system-section-shell" id="how-it-works" aria-label="How the System Works">
      <div style={{ marginBottom: "3rem" }}>
        <p className="system-section-label">HOW IT WORKS</p>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1.25rem",
          color: "var(--unseen-stone)",
          maxWidth: "720px",
          lineHeight: 1.5,
          margin: 0
        }}>
          {howItWorks.intro}
        </p>
      </div>

      <div className="system-how-grid">
        {/* Sticky Visual Diagram / Supporting Media */}
        <div className="system-how-sticky-col">
          <div className="system-how-media-wrap">
            <img
              src={howItWorks.supportingImage}
              alt={howItWorks.supportingImageAlt}
              className="system-how-media"
              loading="lazy"
            />
          </div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--unseen-muted)",
            marginTop: "0.8rem",
            letterSpacing: "0.08em"
          }}>
            SUPPORTING EVIDENCE LAYER · VERIFIABLE EXECUTION MAP
          </p>
        </div>

        {/* Scroll-Linked Architectural Progression with interactive focus */}
        <div className="system-how-steps" onMouseLeave={() => setActiveStep(null)}>
          {howItWorks.steps.map((step, idx) => {
            const isHovered = activeStep === idx;
            const hasHover = activeStep !== null;
            const opacity = !hasHover || isHovered ? 1 : 0.45;

            return (
              <div
                key={step.number}
                className="system-how-step"
                onMouseEnter={() => setActiveStep(idx)}
                style={{
                  opacity,
                  transition: "opacity 0.25s ease, transform 0.25s ease",
                  cursor: "default",
                  transform: isHovered ? "translateX(4px)" : "none"
                }}
              >
                <div className="system-how-step-num">{step.number} / ARCHITECTURE STAGE</div>
                <h3 className="system-how-step-title">{step.title}</h3>
                <p className="system-how-step-desc">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
