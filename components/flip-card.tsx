"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type FlipCardProps = {
  eyebrow: string;
  title: string;
  front: string;
  backLabel: string;
  back: string;
  href?: string;
  state?: string;
  index?: number;
};

export function FlipCard({ eyebrow, title, front, backLabel, back, href, state, index = 0 }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFlipped(value => !value), 10000 + index * 850);
    return () => window.clearTimeout(timer);
  }, [flipped, index]);

  return (
    <article className={`flip-card reveal-on-scroll ${flipped ? "is-flipped" : ""} ${expanded ? "is-expanded" : ""}`}>
      <div className="flip-card-inner">
        <button className="flip-card-face flip-card-front" type="button" onClick={() => setExpanded(value => !value)} aria-expanded={expanded}>
          <span className="flip-card-kicker">{eyebrow}</span>
          <h3>{title}</h3>
          <span className="flip-card-hint">{expanded ? "Close detail ↑" : "Open detail ↗"}</span>
          {state ? <span className="flip-card-state">{state}</span> : null}
        </button>
        <button className="flip-card-face flip-card-back" type="button" onClick={() => setFlipped(false)}>
          <span className="flip-card-kicker">{backLabel}</span>
          <p>{back}</p>
          <span className="flip-card-hint">Return to overview ↺</span>
        </button>
      </div>
      <div className="flip-card-detail" aria-hidden={!expanded}>
        <p>{front}</p>
        {href ? <Link className="text-link" href={href}>Explore →</Link> : null}
      </div>
    </article>
  );
}
