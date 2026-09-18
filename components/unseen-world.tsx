"use client";

import { UnseenArchitecturalScene } from "./unseen-architectural-scene";

interface UnseenWorldProps {
  entered: boolean;
  onEnter: () => void;
}

export function UnseenWorld({ entered, onEnter }: UnseenWorldProps) {
  return (
    <div className="unseen-world-wrapper" style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* 3D Architectural World */}
      <UnseenArchitecturalScene />

      {/* Pre-loader & Enter Transition */}
      {!entered && (
        <div 
          className="unseen-gate-screen"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            background: "var(--unseen-bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Animated 3D Wireframe Monogram Cube */}
          <div className="unseen-loader-cube" style={{ marginBottom: "2.5rem" }}>
            <div className="cube-wrapper">
              <span className="cube-face front">AX</span>
              <span className="cube-face back">AX</span>
              <span className="cube-face right">AX</span>
              <span className="cube-face left">AX</span>
              <span className="cube-face top">AX</span>
              <span className="cube-face bottom">AX</span>
            </div>
          </div>

          <h2 style={{ 
            fontFamily: "var(--font-sans)", 
            fontSize: "1.1rem", 
            letterSpacing: "0.02em", 
            textTransform: "uppercase", 
            marginBottom: "0.4rem", 
            fontWeight: 500,
            color: "var(--unseen-stone)"
          }}>
            AIXION LAB®
          </h2>
          <p style={{ 
            fontFamily: "var(--font-sans)", 
            fontSize: "0.95rem", 
            color: "var(--unseen-charcoal)", 
            maxWidth: "420px", 
            lineHeight: 1.4, 
            margin: "0 auto 2.5rem" 
          }}>
            An independent engineering lab where ideas move through research, implementation, validation and real-world observation.
          </p>

          <button
            type="button"
            onClick={onEnter}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: "1px solid var(--unseen-stone)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "var(--unseen-stone)",
              transition: "opacity 0.2s ease",
            }}
          >
            Enter <span>↘</span>
          </button>

          <button
            type="button"
            onClick={onEnter}
            style={{
              position: "absolute",
              bottom: "3rem",
              background: "transparent",
              border: "none",
              fontSize: "0.68rem",
              fontFamily: "var(--font-sans)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--unseen-muted)",
              cursor: "pointer",
            }}
          >
            Enter without audio
          </button>
        </div>
      )}
    </div>
  );
}
