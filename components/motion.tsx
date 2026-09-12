"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
export function MotionController() {
  const path = usePathname();
  useEffect(() => {
    if (
      !site.motion.enabled ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const elements = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.dataset.phase = "present";
            el.dataset.seen = "true";
          } else
            el.dataset.phase =
              entry.boundingClientRect.top < 0 ? "leaving" : "arriving";
        }),
      { threshold: 0.12 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);
  return null;
}
export function Arrival() {
  const [phase, setPhase] = useState("pending");
  const [repeat, setRepeat] = useState(false);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("aixion-arrived-v2") === "yes";
      sessionStorage.setItem("aixion-arrived-v2", "yes");
    } catch {
      /* Storage denied: still allow the entrance to finish. */
    }
    const reduced =
      !site.motion.enabled ||
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    setRepeat(seen);
    setPhase(reduced ? "done" : "active");
    const finish = () => setPhase("done");
    const timer = setTimeout(
      finish,
      seen ? site.motion.repeatMs : site.motion.firstMs,
    );
    window.addEventListener("wheel", finish, { once: true, passive: true });
    window.addEventListener("touchstart", finish, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", finish, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      window.removeEventListener("keydown", finish);
    };
  }, []);
  return (
    <div
      className="arrival"
      data-phase={phase}
      data-repeat={repeat}
      aria-hidden={phase !== "active"}
    >
      <div className="arrival-copy">
        <span>AIXION LAB</span>
        <p>Build. Question. Understand.</p>
      </div>
      {phase === "active" && (
        <button className="arrival-skip" onClick={() => setPhase("done")}>
          Skip introduction <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}
export function ProgressScene({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = [...root.querySelectorAll<HTMLElement>("[data-step]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const reduced =
        !site.motion.enabled ||
        matchMedia("(prefers-reduced-motion: reduce)").matches;
      let active = 0;
      steps.forEach((step, i) => {
        if (step.getBoundingClientRect().top < innerHeight * 0.62) active = i;
      });
      root.dataset.active = String(active);
      root.style.setProperty(
        "--progress",
        String(steps.length > 1 ? active / (steps.length - 1) : 1),
      );
      steps.forEach((step, i) => {
        step.dataset.current = String(i === active);
        step.dataset.complete = String(reduced || i <= active);
      });
      const layers = [...root.querySelectorAll<HTMLElement>("[data-layer]")];
      const layerIndex =
        steps.length > 1
          ? Math.round((active / (steps.length - 1)) * (layers.length - 1))
          : layers.length - 1;
      layers.forEach((el, i) => {
        el.dataset.active = String(reduced || i <= layerIndex);
      });
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, []);
  return (
    <div ref={ref} className={className} data-progress-scene>
      {children}
    </div>
  );
}
