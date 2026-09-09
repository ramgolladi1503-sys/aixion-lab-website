"use client";

import React, { useEffect, useState } from "react";
import { haptics } from "@/lib/audio-haptics";

export function AudioToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(haptics.isEnabled());
    return haptics.subscribe((val) => setEnabled(val));
  }, []);

  const handleToggle = () => {
    const next = haptics.toggle();
    setEnabled(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="btn btn-ghost audio-toggle"
      aria-label={enabled ? "Mute interface audio feedback" : "Enable interface audio feedback"}
      title={enabled ? "Haptic audio active (Click to mute)" : "Haptic audio muted (Click to enable)"}
      style={{
        padding: "6px 8px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--line)",
        borderRadius: "999px",
        background: enabled ? "rgba(79, 125, 249, 0.12)" : "rgba(255, 255, 255, 0.03)",
        color: enabled ? "var(--accent)" : "var(--muted)",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {enabled ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
