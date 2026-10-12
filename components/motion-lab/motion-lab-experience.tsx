"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import type { ErrorInfo, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import styles from "./motion-lab.module.css";
import { MotionLabPoster } from "./motion-lab-poster";

type SceneStatus = "poster" | "loading" | "ready" | "static";
type StaticReason = "reduced-motion" | "data-saver" | "low-resources" | "webgl-unavailable" | "context-lost" | "scene-error";
type MotionLabCanvasProps = {
  pointer: { current: { x: number; y: number } };
  progress: { current: number };
  view: { x: number; y: number };
  driftPaused: boolean;
  resetKey: number;
  onReady: () => void;
  onFailure: (reason: StaticReason) => void;
};

const MotionLabCanvas = dynamic<MotionLabCanvasProps>(
  () => import("./scene-canvas").then((module) => module.SceneCanvas),
  { ssr: false, loading: () => null },
);

class SceneBoundary extends Component<{
  children: ReactNode;
  onFailure: (reason: StaticReason) => void;
}, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    const failure = /webgl|context|renderer/i.test(error.message) ? "webgl-unavailable" : "scene-error";
    this.props.onFailure(failure);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function getStaticReason(): StaticReason | null {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced-motion";
  const device = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (device.connection?.saveData) return "data-saver";
  if ((device.deviceMemory !== undefined && device.deviceMemory <= 2) || navigator.hardwareConcurrency <= 2) {
    return "low-resources";
  }
  return null;
}

const statusText: Record<SceneStatus, string> = {
  poster: "Preparing a still view.",
  loading: "Starting the interactive scene.",
  ready: "Interactive scene ready. Move the pointer or use the view controls.",
  static: "Static view active.",
};

const chapters = [
  { id: "arrival", label: "Arrival", number: "01", title: "The shape", emphasis: "of a system.", copy: "Structure, signal and material — held in one moving form." },
  { id: "engineering", label: "Engineering intelligence", number: "02", title: "A system is", emphasis: "more than its parts.", copy: "The form opens into a network: connected states, explicit boundaries and evidence that can be followed." },
  { id: "applied-systems", label: "Applied systems", number: "03", title: "Intelligence,", emphasis: "made accountable.", copy: "Four practices meet in one system: software, research, automation and analytics. Each stays inspectable." },
];

export function MotionLabExperience() {
  const experienceRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const progress = useRef(0);
  const [status, setStatus] = useState<SceneStatus>("poster");
  const [reason, setReason] = useState<StaticReason | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [pointerActive, setPointerActive] = useState(false);
  const [view, setView] = useState({ x: 0, y: 0 });
  const [driftPaused, setDriftPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [attempt, setAttempt] = useState(0);

  const failToStatic = useCallback((failureReason: StaticReason) => {
    setReason(failureReason);
    setStatus("static");
  }, []);

  useEffect(() => {
    const staticReason = getStaticReason();
    if (staticReason) {
      failToStatic(staticReason);
      return;
    }

    setStatus("loading");
    const stage = experienceRef.current;
    if (!stage || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { threshold: 0.01 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [attempt, failToStatic]);

  useEffect(() => {
    const root = experienceRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      if (!active) return;
      const bounds = root.getBoundingClientRect();
      const scrollable = Math.max(1, bounds.height - window.innerHeight);
      const nextProgress = Math.max(0, Math.min(1, -bounds.top / scrollable));
      progress.current = nextProgress;
      const scene = nextProgress < 0.34 ? "arrival" : nextProgress < 0.68 ? "engineering" : "applied-systems";
      stage.dataset.progress = nextProgress.toFixed(3);
      stage.dataset.scenePhase = scene;
      stage.style.setProperty("--scene-progress", String(nextProgress));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) schedule();
    }, { threshold: 0 });
    visibility.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      visibility.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = experienceRef.current;
    if (!root) return;
    root.classList.add(styles.motionReady);
    const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-chapter]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.inView = entry.isIntersecting ? "true" : "false";
      }
    }, { threshold: 0.28 });
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    pointer.current.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
    pointer.current.y = Math.max(-1, Math.min(1, 1 - ((event.clientY - rect.top) / rect.height) * 2));
    setPointerActive(true);
  };

  const handlePointerLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
    setPointerActive(false);
  };

  const adjustView = (axis: "x" | "y", amount: number) => {
    setView((current) => ({
      ...current,
      [axis]: Math.max(-0.65, Math.min(0.65, current[axis] + amount)),
    }));
  };

  const recenter = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
    setPointerActive(false);
    setView({ x: 0, y: 0 });
    setResetKey((key) => key + 1);
  };

  const retryScene = () => {
    if (reason === "reduced-motion" || reason === "data-saver" || reason === "low-resources") return;
    setReason(null);
    setStatus("loading");
    setShouldLoad(true);
    setAttempt((current) => current + 1);
  };

  const reasonText = reason === "reduced-motion"
    ? "Static scene selected because reduced motion is enabled."
    : reason === "data-saver"
      ? "Static scene selected because data saver is enabled."
      : reason === "low-resources"
        ? "Static scene selected for this device's available resources."
        : reason === "context-lost"
          ? "The graphics context was lost. The still view remains available."
          : reason === "webgl-unavailable"
            ? "WebGL is unavailable. The still view remains available."
            : reason === "scene-error"
              ? "The interactive scene could not start. The still view remains available."
              : null;

  return (
    <div ref={experienceRef} className={styles.experience} data-motion-lab-root onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <section
        ref={stageRef}
        className={styles.stage}
        aria-label="Interactive motion study"
        data-testid="motion-lab-stage"
        data-scene-status={status}
        data-scene-phase="arrival"
        data-progress="0.000"
        data-pointer-active={pointerActive ? "true" : "false"}
        data-view-adjusted={view.x !== 0 || view.y !== 0 ? "true" : "false"}
      >
        <div className={styles.visualField} aria-hidden="true">
          {shouldLoad && status !== "static" ? (
            <SceneBoundary key={attempt} onFailure={failToStatic}>
              <MotionLabCanvas
                pointer={pointer}
                progress={progress}
                view={view}
                driftPaused={driftPaused}
                resetKey={resetKey}
                onReady={() => setStatus("ready")}
                onFailure={failToStatic}
              />
            </SceneBoundary>
          ) : null}
          <div className={`${styles.poster} ${status === "ready" ? styles.posterHidden : ""}`} data-testid="motion-lab-poster">
            <MotionLabPoster />
          </div>
          <div className={styles.vignette} />
        </div>
        <div className={styles.sceneIndex} aria-hidden="true">
          <span>{chapters.map((chapter) => `${chapter.number} / ${chapter.label.toUpperCase()}`).join("     ·     ")}</span>
          <span>SCROLL TO FOLLOW THE SYSTEM</span>
        </div>
        <div className={styles.progressRail} aria-hidden="true"><span /></div>
      </section>

      <div className={styles.chapterTrack}>
        {chapters.map((chapter, index) => (
          <section key={chapter.id} id={chapter.id} data-motion-chapter className={`${styles.chapter} ${index === 0 ? styles.arrivalChapter : ""}`} aria-labelledby={`${chapter.id}-title`}>
            <div className={styles.chapterCopy}>
              <p className={styles.kicker} data-testid={index === 0 ? "motion-lab-kicker" : undefined}>AIXION LAB <span aria-hidden="true">/</span> {chapter.number} — {chapter.label}</p>
              <h1 id={`${chapter.id}-title`}>{chapter.title}<br /><em>{chapter.emphasis}</em></h1>
              <p className={styles.intro}>{chapter.copy}</p>
              {index === 0 ? (
                <>
                  <a className={styles.exploreLink} href="#engineering">Explore the system <span aria-hidden="true">↓</span></a>
                  <div className={styles.controls} id="motion-lab-controls">
                    <p className={styles.controlLabel}>VIEW CONTROL</p>
                    <div className={styles.controlRow} role="group" aria-label="Sculpture view controls">
                      <button type="button" aria-label="Tilt sculpture up" onClick={() => adjustView("x", -0.12)}>↑</button>
                      <button type="button" aria-label="Tilt sculpture down" onClick={() => adjustView("x", 0.12)}>↓</button>
                      <button type="button" aria-label="Turn sculpture left" onClick={() => adjustView("y", -0.14)}>←</button>
                      <button type="button" aria-label="Turn sculpture right" onClick={() => adjustView("y", 0.14)}>→</button>
                      <button type="button" onClick={recenter}>Recenter</button>
                      <button type="button" onClick={() => setDriftPaused((paused) => !paused)} aria-pressed={driftPaused}>
                        {driftPaused ? "Resume drift" : "Pause drift"}
                      </button>
                    </div>
                    <p className={styles.status} role="status" aria-live="polite">
                      {reasonText ?? statusText[status]}
                      {status === "static" && reason !== "reduced-motion" && reason !== "data-saver" && reason !== "low-resources" ? (
                        <button className={styles.retry} type="button" onClick={retryScene}>Retry 3D scene</button>
                      ) : null}
                    </p>
                  </div>
                </>
              ) : null}
              {index === 1 ? <a className={styles.exploreLink} href="#applied-systems">Follow the connections <span aria-hidden="true">↓</span></a> : null}
              {index === 2 ? (
                <nav className={styles.systemLinks} aria-label="Explore Aixion Lab work">
                  <a href="/systems">Systems <span aria-hidden="true">↗</span></a>
                  <a href="/research">Research <span aria-hidden="true">↗</span></a>
                  <a href="/systems/automation">Automation <span aria-hidden="true">↗</span></a>
                  <a href="/systems/analytics">Analytics <span aria-hidden="true">↗</span></a>
                </nav>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
