"use client";

import { useEffect, useRef, useState } from "react";

interface Step {
  id: string;
  stepNum: string;
  badge: string;
  title: string;
  description: string;
  videoSrc: string;
  duration: number; // in seconds
  bullets: Array<{ icon: string; title: string; desc: string }>;
  tagPill: string;
}

const steps: Step[] = [
  {
    id: "login",
    stepNum: "01",
    badge: "SECURE ACCESS",
    title: "Enterprise Mobile Gateway",
    description: "Instant authenticated access to autonomous agent operations. Review code diffs and sensitive tool calls from anywhere.",
    videoSrc: "/videos/steps/01_login.mp4",
    duration: 5.0,
    bullets: [
      { icon: "🔐", title: "Hardware-Backed Session", desc: "Biometric session keys with cryptographic device pinning" },
      { icon: "⚡", title: "Zero Latency Access", desc: "Direct streaming connection to control tower cluster" },
    ],
    tagPill: "FIPS-140-3 READY",
  },
  {
    id: "telemetry",
    stepNum: "02",
    badge: "REAL-TIME TELEMETRY",
    title: "Live Action Queue",
    description: "Real-time synchronization across running agent fleets. Every pending action is streamed instantly with full contextual risk scoring.",
    videoSrc: "/videos/steps/02_nav.mp4",
    duration: 5.0,
    bullets: [
      { icon: "📡", title: "Sub-100ms Sync", desc: "WebSocket & gRPC telemetry across all agent clusters" },
      { icon: "🎯", title: "Prioritized Triage", desc: "Dynamic severity classification (Low / Medium / High / Critical)" },
    ],
    tagPill: "MULTI-AGENT CLUSTERS",
  },
  {
    id: "setup",
    stepNum: "03",
    badge: "GOVERNANCE SETUP",
    title: "Autonomous Fleet Pairing",
    description: "Seamlessly bind Antigravity, Codex, Hermes, and custom AI agents to your human governance policy in seconds.",
    videoSrc: "/videos/steps/03_setup.mp4",
    duration: 4.0,
    bullets: [
      { icon: "🤖", title: "Cross-Platform Pairing", desc: "Native support for Claude, Gemini, Codex & custom agents" },
      { icon: "🛡️", title: "Policy Invariants", desc: "Enforce strict branch, tool call, and file boundaries upfront" },
    ],
    tagPill: "MULTI-MODEL ORCHESTRATION",
  },
  {
    id: "approval",
    stepNum: "04",
    badge: "HUMAN-IN-THE-LOOP",
    title: "Review & One-Tap Approval",
    description: "Inspect exact code diffs, command payloads, and test outputs before execution. Release safe actions with one confident tap.",
    videoSrc: "/videos/steps/04_approval.mp4",
    duration: 7.0,
    bullets: [
      { icon: "🔍", title: "Interactive Git Diff", desc: "Full syntax-highlighted diff inspection right on mobile" },
      { icon: "✅", title: "Cryptographic Sign-off", desc: "Non-repudiable approval signature logged to ledger" },
    ],
    tagPill: "HUMAN CONFIRMATION GATE",
  },
  {
    id: "defense",
    stepNum: "05",
    badge: "FAIL-CLOSED DEFENSE",
    title: "Adversarial Risk Detection",
    description: "When an agent attempts unauthorized file modifications or credential access, the system halts execution immediately for manual review.",
    videoSrc: "/videos/steps/05_denial.mp4",
    duration: 7.0,
    bullets: [
      { icon: "🛑", title: "Instant Rejection", desc: "One-tap denial halts runaway agent sub-processes instantly" },
      { icon: "⚠️", title: "Boundary Violation Alert", desc: "Deep inspection identifies sandbox escape attempts" },
    ],
    tagPill: "ZERO-TRUST CONTAINMENT",
  },
  {
    id: "audit",
    stepNum: "06",
    badge: "IMMUTABLE AUDIT",
    title: "Tamper-Proof Audit Trail",
    description: "Every approved action, denial reason, and agent telemetry event is recorded in a verified, immutable compliance ledger.",
    videoSrc: "/videos/steps/06_history.mp4",
    duration: 4.0,
    bullets: [
      { icon: "📜", title: "Full Decision Lineage", desc: "Complete audit history traceable to originating agent prompt" },
      { icon: "🔒", title: "Enterprise Compliance", desc: "SOC 2 Type II, ISO 27001, and regulatory ready" },
    ],
    tagPill: "CRYPTOGRAPHIC PROOF",
  },
];

export function InteractiveControlTower() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeStep = steps[activeIdx];

  // When step changes, load and play the corresponding chapter video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeIdx]);

  // Video timeupdate tracking
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  // Auto-advance to next chapter when current one finishes
  const handleEnded = () => {
    setActiveIdx((prev) => (prev + 1) % steps.length);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div style={{
      margin: "2rem 0 3rem",
      background: "var(--paper-bright)",
      border: "1px solid var(--line-strong)",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.05)",
    }}>
      <style>{`
        .tower-stepper-bar {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          border-bottom: 1px solid var(--line-strong);
          background: rgba(0, 0, 0, 0.02);
          overflow-x: auto;
        }
        .tower-main-stage {
          display: grid;
          grid-template-columns: minmax(300px, 360px) 1fr;
          gap: 48px;
          padding: 44px 48px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .tower-stepper-bar {
            grid-template-columns: repeat(6, minmax(140px, 1fr));
            scroll-snap-type: x mandatory;
          }
          .tower-main-stage {
            grid-template-columns: 1fr;
            padding: 28px 20px;
            gap: 36px;
          }
        }
      `}</style>
      {/* Interactive Chapter Stepper Tab Bar */}
      <div className="tower-stepper-bar">
        {steps.map((s, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={s.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                padding: "16px 14px",
                border: "none",
                background: isActive ? "var(--paper-bright)" : "transparent",
                borderBottom: isActive ? "2px solid var(--ink)" : "2px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              <div style={{
                fontSize: "10px",
                fontFamily: "var(--mono)",
                letterSpacing: "0.1em",
                color: isActive ? "var(--accent-deep)" : "var(--muted)",
                marginBottom: "4px",
              }}>
                {s.stepNum} • {s.badge}
              </div>
              <div style={{
                fontSize: "13px",
                fontFamily: "var(--serif)",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--text)" : "var(--muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {s.title}
              </div>
              {/* Active step progress indicator */}
              {isActive && (
                <div style={{
                  position: "absolute",
                  bottom: "-2px",
                  left: 0,
                  width: `${progress}%`,
                  height: "2px",
                  background: "var(--accent-deep)",
                  transition: "width 0.1s linear",
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage: Live Device Frame on Left, Rich Story on Right */}
      <div className="tower-main-stage">
        {/* Left: Device Chassis with Pure Mobile UI Video */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{
            width: "320px",
            aspectRatio: "9/20",
            borderRadius: "44px",
            background: "#0d1117",
            padding: "10px",
            boxShadow: "0 28px 65px -15px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12)",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={togglePlay}
          title={isPlaying ? "Click to Pause" : "Click to Play"}
          >
            {/* Screen Notch / Speaker bar */}
            <div style={{
              position: "absolute",
              top: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "72px",
              height: "4px",
              borderRadius: "4px",
              background: "rgba(255, 255, 255, 0.25)",
              zIndex: 10,
            }} />

            {/* Video Container inside phone cutout */}
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "36px",
              overflow: "hidden",
              position: "relative",
              background: "#ffffff",
            }}>
              <video
                ref={videoRef}
                src={activeStep.videoSrc}
                playsInline
                muted
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Pause/Play overlay hint */}
              {!isPlaying && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "32px",
                  backdropFilter: "blur(2px)",
                }}>
                  ▶
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Chapter Context & Deep Technical Cards */}
        <div>
          {/* Eyebrow Pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 12px",
            borderRadius: "99px",
            background: "rgba(0, 0, 0, 0.04)",
            border: "1px solid var(--line-strong)",
            fontFamily: "var(--mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--accent-deep)",
            marginBottom: "16px",
          }}>
            PHASE {activeStep.stepNum} • {activeStep.badge}
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(32px, 3.2vw, 44px)",
            fontWeight: 400,
            lineHeight: 1.12,
            margin: "0 0 16px 0",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}>
            {activeStep.title}
          </h2>

          {/* Description */}
          <p style={{
            fontSize: "15px",
            lineHeight: 1.75,
            color: "var(--muted)",
            margin: "0 0 28px 0",
            maxWidth: "620px",
          }}>
            {activeStep.description}
          </p>

          {/* Technical Feature Cards */}
          <div style={{
            display: "grid",
            gap: "14px",
            maxWidth: "620px",
            marginBottom: "28px",
          }}>
            {activeStep.bullets.map((b, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  background: "rgba(0, 0, 0, 0.015)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "20px", lineHeight: 1 }}>{b.icon}</span>
                <div>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "3px",
                  }}>
                    {b.title}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}>
                    {b.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Invariant Tag */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px",
            borderRadius: "8px",
            background: "rgba(0, 0, 0, 0.03)",
            fontSize: "11px",
            fontFamily: "var(--mono)",
            letterSpacing: "0.05em",
            color: "var(--muted)",
          }}>
            <span>✓</span>
            <span>ZERO-TRUST GUARANTEE • NEVER SHIPS WITHOUT EXPLICIT APPROVAL • {activeStep.tagPill}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
