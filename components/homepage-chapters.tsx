"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const chapters = [
  {
    id: "systems",
    label: "Systems",
    eyebrow: "MARKET INFRASTRUCTURE · GOVERNED AUTONOMY",
    title: "Systems built to make complexity visible.",
    copy: "TradeBot and Aixion Control Core explore data integrity, observable state and explicit human authority.",
    href: "/systems",
    action: "Explore systems",
    image: "/images/aixion-editorial/systems-workbench.jpg",
    alt: "A systems engineering workstation with an architecture diagram, notebook and compact hardware.",
  },
  {
    id: "research",
    label: "Research",
    eyebrow: "QUESTIONS · METHODS · EVIDENCE",
    title: "A good question deserves an honest result.",
    copy: "Research notes show what is being tested, what the evidence supports and where a hypothesis stops.",
    href: "/research",
    action: "Read the research",
    image: "/images/aixion-editorial/research-desk.jpg",
    alt: "Research notes and a marked-up chart on a desk, photographed in natural light.",
  },
  {
    id: "automation",
    label: "Automation",
    eyebrow: "QUALITY ENGINEERING · WORKFLOW DESIGN",
    title: "Automation should make failure easier to see.",
    copy: "Workflows are shaped around validated inputs, explicit state, recovery and traceable outcomes.",
    href: "/systems/automation",
    action: "Explore automation",
    image: "/images/aixion-editorial/planning-studio.jpg",
    alt: "An engineering planning studio with large drawings spread across a worktable.",
  },
  {
    id: "analytics",
    label: "Analytics",
    eyebrow: "DATA · DECISION SUPPORT",
    title: "Make the path from data to decision clear.",
    copy: "Analytics work starts with a specific question and keeps data quality and assumptions in view.",
    href: "/systems/analytics",
    action: "Explore analytics",
    image: "/images/aixion-editorial/hero-studio.jpg",
    alt: "A quiet engineering studio at dusk, with diagrams on glass and space for focused work.",
  },
] as const;

export function HomepageChapters() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chapter = chapters[active];

  function selectChapter(index: number) {
    if (index === active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(index);
      return;
    }
    const hero = document.querySelector<HTMLElement>(".home-hero");
    if (hero) {
      hero.dataset.chapterTransition = "true";
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => delete hero.dataset.chapterTransition, 520);
    }
    setActive(index);
  }

  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % chapters.length;
    else if (event.key === "ArrowLeft") next = (active - 1 + chapters.length) % chapters.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = chapters.length - 1;
    else return;
    event.preventDefault();
    selectChapter(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="home-hero" aria-label="Aixion Lab overview">
      <Image key={chapter.image} className="home-hero__image" src={chapter.image} alt={chapter.alt} fill priority sizes="100vw" />
      <div className="home-hero__shade" aria-hidden="true" />
      <div className="home-hero__top page-width" data-reveal>
        <p className="eyebrow eyebrow--light">INDEPENDENT APPLIED ENGINEERING</p>
        <h1>Applied intelligence.<br /><em>Engineered with evidence.</em></h1>
      </div>
      <div className="home-hero__chapter page-width">
        <div className="chapter-copy" role="tabpanel" id="chapter-panel" aria-labelledby={`chapter-tab-${chapter.id}`} key={chapter.id}>
          <p className="eyebrow eyebrow--light">{chapter.eyebrow}</p>
          <h2>{chapter.title}</h2>
          <p>{chapter.copy}</p>
          <Link href={chapter.href} className="button button--light">{chapter.action}<span aria-hidden="true">↗</span></Link>
        </div>
        <div className="home-hero__tabs" role="tablist" aria-label="Explore Aixion Lab">
          {chapters.map((item, index) => (
          <button
              key={item.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              id={`chapter-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="chapter-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => selectChapter(index)}
              onKeyDown={handleTabKey}
            >
              <span>0{index + 1}</span>{item.label}
            </button>
          ))}
        </div>
      </div>
      <a className="scroll-cue scroll-cue--home" href="#home-intro"><span aria-hidden="true" /> Scroll to explore</a>
    </section>
  );
}
