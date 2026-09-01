"use client";

import { useEffect, useState } from "react";

export function ModeToggle() {
  const [career, setCareer] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("aixion-view") === "career";
    const view = stored ? "career" : "lab";
    setCareer(stored);

    if (document.documentElement.dataset.view !== view) {
      const frame = window.requestAnimationFrame(() => {
        document.documentElement.dataset.view = view;
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  function toggle() {
    const next = !career;
    setCareer(next);
    document.documentElement.dataset.view = next ? "career" : "lab";
    window.localStorage.setItem("aixion-view", next ? "career" : "lab");
  }

  return (
    <button className="mode-toggle" onClick={toggle} aria-pressed={career} aria-label="Toggle Lab and Career view">
      <span className="mode-label">View</span>
      <strong>{career ? "Career" : "Lab"}</strong>
      <span className="mode-track" aria-hidden="true"><span className={career ? "mode-knob career" : "mode-knob"} /></span>
    </button>
  );
}
