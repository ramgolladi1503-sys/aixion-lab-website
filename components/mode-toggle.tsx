"use client";

import { useEffect, useState } from "react";

export function ModeToggle() {
  const [career, setCareer] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("aixion-view") === "career";
    setCareer(stored);
    document.documentElement.dataset.view = stored ? "career" : "lab";
  }, []);

  function toggle() {
    const next = !career;
    setCareer(next);
    document.documentElement.dataset.view = next ? "career" : "lab";
    window.localStorage.setItem("aixion-view", next ? "career" : "lab");
  }

  return (
    <button className="mode-toggle" onClick={toggle} aria-pressed={career} aria-label="Toggle Lab and Career view">
      <span className={!career ? "active" : ""}>Lab</span>
      <span className="mode-track" aria-hidden="true"><span className={career ? "mode-knob career" : "mode-knob"} /></span>
      <span className={career ? "active" : ""}>Career</span>
    </button>
  );
}
