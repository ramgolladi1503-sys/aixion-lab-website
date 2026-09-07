"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SystemVisual } from "./system-visuals";
import { MOTION_CONFIG } from "@/lib/motion-config";
import { contentState, resolveContent } from "@/lib/content-state";

type Slide = {
  eyebrow: string;
  title: string;
  copy: string;
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
  visual: "home" | "tradebot" | "control-core";
};

const slides: Slide[] = [
  {
    eyebrow: "AIXION LAB · INDEPENDENT APPLIED ENGINEERING",
    title: "Applied intelligence, automation and decision systems.",
    copy: "A living engineering lab where research becomes systems through explicit validation, evidence and authority boundaries.",
    primary: "Explore systems →",
    primaryHref: "/systems",
    secondary: "View Lab Pulse",
    secondaryHref: "/pulse",
    visual: "home",
  },
  {
    eyebrow: "SYSTEMS / TRADEBOT · VALIDATING",
    title: "Separate the signal from the authority to act.",
    copy: "TradeBot keeps market data, research output, automated analysis and human execution authority observable at every boundary.",
    primary: "Open TradeBot →",
    primaryHref: "/systems/tradebot",
    secondary: "Read the evidence",
    secondaryHref: "/research",
    visual: "tradebot",
  },
  {
    eyebrow: "SYSTEMS / CONTROL CORE · BUILDING",
    title: "Make orchestration inspectable before it becomes autonomous.",
    copy: "Control Core gives intent, context, tools, policy, evidence and human authority an explicit path through the system.",
    primary: "Explore Control Core →",
    primaryHref: "/systems/control-core",
    secondary: "See the journey",
    secondaryHref: "/journey",
    visual: "control-core",
  },
];

export function HeroCarousel() {
  const content = resolveContent(slides);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideState, setSlideState] = useState<"entering" | "switching" | "ready">("ready");
  const transitionTimer = useRef<number | null>(null);
  const reducedMotion = useRef(false);
  const slide = slides[active];

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reducedMotion.current = media.matches; };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current || MOTION_CONFIG.hero.autoAdvanceMs <= 0) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), MOTION_CONFIG.reference.carouselAutoplayMs);
    return () => window.clearInterval(timer);
  }, [paused, active]);

  const selectSlide = (index: number) => {
    if (index === active) return;
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    setSlideState("switching");
    setActive(index);
    if (reducedMotion.current) { setSlideState("ready"); return; }
    transitionTimer.current = window.setTimeout(() => {
      setSlideState("entering");
      transitionTimer.current = null;
    }, 120);
  };

  const move = (direction: 1 | -1) => selectSlide((active + direction + slides.length) % slides.length);

  useEffect(() => {
    if (reducedMotion.current) { setSlideState("ready"); return; }
    const timer = window.setTimeout(() => setSlideState("ready"), MOTION_CONFIG.hero.visualEnterMs);
    return () => window.clearTimeout(timer);
  }, [active]);

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
  }, []);

  return (
    <div className={`hero-carousel ${paused ? "is-paused" : ""}`} data-slide-state={slideState} data-content-state={contentState(content)} data-content-source={content.source} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className="hero-grid">
        <div className="hero-copy" aria-live="polite" key={active}>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="lede">{slide.copy}</p>
          <div className="hero-attribution">
            <strong>Built by Ram</strong>
            <span>Quality Engineering · Automation · Software · Data · Applied AI</span>
          </div>
          <div className="button-row hero-actions-visible">
            <Link className="button" href={slide.primaryHref}>{slide.primary}</Link>
            <Link className="button-secondary" href={slide.secondaryHref}>{slide.secondary}</Link>
          </div>
          <div className="hero-carousel-controls" aria-label="Hero carousel controls">
            <button type="button" className="carousel-control" onClick={() => move(-1)} aria-label="Previous slide">← <span>Previous</span></button>
            <div className="carousel-dots" role="tablist" aria-label="Hero slides">
              {slides.map((item, index) => <button type="button" role="tab" aria-selected={active === index} aria-label={`Go to slide ${index + 1}`} className={active === index ? "is-active" : ""} onClick={() => selectSlide(index)} key={item.eyebrow}><i /></button>)}
            </div>
            <button type="button" className="carousel-control" onClick={() => move(1)} aria-label="Next slide"><span>Next</span> →</button>
          </div>
        </div>
        <div className="hero-carousel-visual" key={`${active}-visual`} aria-hidden="true"><SystemVisual kind={slide.visual} /></div>
      </div>
    </div>
  );
}
