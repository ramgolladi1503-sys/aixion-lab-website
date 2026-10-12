"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    id: "systems",
    label: "Systems",
    eyebrow: "SYSTEMS · MARKET INTELLIGENCE",
    title: "Build a clearer view of a changing market.",
    copy: "TradeBot leads Aixion’s systems work in market-data integrity and validation. Control Core is developing bounded automation with explicit policy and human authority.",
    href: "/systems/tradebot",
    action: "Explore TradeBot",
    image: "/images/aixion-editorial/systems-workbench.jpg",
    alt: "A systems engineering workstation with an architecture diagram, notebook and computer.",
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
    title: "Make failure easier to understand and recover from.",
    copy: "Workflow and automation work focuses on clear state, validated inputs and traceable outcomes.",
    href: "/systems/automation",
    action: "Explore automation",
    image: "/images/aixion-editorial/planning-studio.jpg",
    alt: "An engineering planning studio with large drawings spread across a worktable.",
  },
  {
    id: "analytics",
    label: "Analytics",
    eyebrow: "DATA · DECISION SUPPORT",
    title: "Make the evidence easier to use.",
    copy: "Analytics work connects runtime state, replay and outcomes so a decision can be understood in context.",
    href: "/systems/analytics",
    action: "Explore analytics",
    image: "/images/aixion-editorial/research-desk.jpg",
    alt: "Research notes and a marked-up chart on a desk, photographed in natural light.",
  },
] as const;

export function HomepageChapters() {
  const [active, setActive] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chapter = chapters[active];

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
  }, []);

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
      setOutgoing(active);
      transitionTimer.current = setTimeout(() => {
        setOutgoing(null);
        delete hero.dataset.chapterTransition;
      }, 950);
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
      <Image key={chapter.image} className={`home-hero__image${outgoing !== null ? " home-hero__image--enter" : ""}`} src={chapter.image} alt={chapter.alt} fill priority sizes="100vw" />
      {outgoing !== null ? (
        <Image
          key={`outgoing-${chapters[outgoing].id}`}
          className="home-hero__image home-hero__image--exit"
          src={chapters[outgoing].image}
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
        />
      ) : null}
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
