"use client";

import { useState } from "react";
import { SystemDetailData } from "@/lib/system-detail-data";

export function SystemHowItWorks({ data }: { data: SystemDetailData }) {
  const { howItWorks } = data;
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="system-section-shell system-how-section" id="how-it-works" aria-label="How the System Works">
      <div className="system-how-intro">
        <p className="system-section-label">HOW IT WORKS</p>
        <p>{howItWorks.intro}</p>
      </div>

      <div className="system-how-grid">
        <div className="system-how-sticky-col">
          <div className="system-how-media-wrap">
            <img src={howItWorks.supportingImage} alt={howItWorks.supportingImageAlt} className="system-how-media" loading="lazy" />
          </div>
          <p className="system-how-caption">SUPPORTING EVIDENCE · EXECUTION MAP</p>
        </div>

        <div className="system-how-steps" onMouseLeave={() => setActiveStep(null)}>
          {howItWorks.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const hasActive = activeStep !== null;
            return (
              <button
                type="button"
                key={step.number}
                className={`system-how-step ${isActive ? "active" : ""} ${hasActive && !isActive ? "deemphasized" : ""}`}
                onMouseEnter={() => setActiveStep(idx)}
                onFocus={() => setActiveStep(idx)}
                onClick={() => setActiveStep(idx)}
                aria-pressed={isActive}
              >
                <span className="system-how-step-num">{step.number}</span>
                <span className="system-how-step-copy">
                  <strong className="system-how-step-title">{step.title}</strong>
                  <span className="system-how-step-desc">{step.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
