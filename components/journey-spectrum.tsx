"use client";

import { useState } from "react";

type JourneyItem = readonly [string, string, string];

export function JourneySpectrum({ items }: { items: readonly JourneyItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  function move(direction: -1 | 1) {
    setActiveIndex(index => (index + direction + items.length) % items.length);
  }

  return (
    <div className="journey-spectrum" data-reveal>
      <div className="journey-spectrum__rail" role="tablist" aria-label="Engineering disciplines">
        <span className="journey-spectrum__line" aria-hidden="true"><i style={{ "--journey-progress": `${activeIndex / (items.length - 1) * 100}%` } as React.CSSProperties} /></span>
        {items.map(([number, title], index) => (
          <button
            key={number}
            type="button"
            role="tab"
            id={`journey-tab-${number}`}
            aria-selected={index === activeIndex}
            aria-controls="journey-stage-panel"
            tabIndex={index === activeIndex ? 0 : -1}
            className={`journey-spectrum__stage${index === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={event => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); move(1); }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); move(-1); }
              if (event.key === "Home") { event.preventDefault(); setActiveIndex(0); }
              if (event.key === "End") { event.preventDefault(); setActiveIndex(items.length - 1); }
            }}
          >
            <span className="journey-spectrum__dot" aria-hidden="true" />
            <span className="journey-spectrum__number">STAGE {number}</span>
            <span className="journey-spectrum__name">{title}</span>
          </button>
        ))}
      </div>
      <section className="journey-spectrum__panel" id="journey-stage-panel" role="tabpanel" aria-labelledby={`journey-tab-${active[0]}`} key={active[0]}>
        <span className="journey-spectrum__active-index">{active[0]} <span>/ 07</span></span>
        <div>
          <p className="eyebrow">THE QUESTION THAT MOVED THE WORK FORWARD</p>
          <h3>{active[1]}</h3>
          <p className="journey-spectrum__question">{active[2]}</p>
        </div>
        <div className="journey-spectrum__controls" aria-label="Journey stage controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous stage">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next stage">→</button>
        </div>
      </section>
      <p className="journey-spectrum__hint">Select a stage to follow the progression <span>·</span> use arrow keys to move</p>
    </div>
  );
}
