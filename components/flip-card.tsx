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

  return (
    <article
      className={`flip-card reveal-on-scroll ${flipped ? "is-flipped" : ""} ${href ? "has-route" : "is-passive"}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(prev => !prev)}
    >
      <div className="flip-card-inner">
        {href ? <Link className="flip-card-face flip-card-front" href={href} aria-label={`Open ${title}`}>
          <span className="flip-card-kicker">{eyebrow}</span>
          <h3>{title}</h3>
          <span className="flip-card-hint">View page ↗</span>
          {state ? <span className="flip-card-state">{state}</span> : null}
        </Link> : <div className="flip-card-face flip-card-front">
          <span className="flip-card-kicker">{eyebrow}</span>
          <h3>{title}</h3>
          <span className="flip-card-hint">Auto reveal</span>
          {state ? <span className="flip-card-state">{state}</span> : null}
        </div>}
        {href ? <Link className="flip-card-face flip-card-back" href={href} aria-label={`Open ${title}`}>
          <span className="flip-card-kicker">{backLabel}</span>
          <p>{back}</p>
          <span className="flip-card-hint">View page ↗</span>
        </Link> : <div className="flip-card-face flip-card-back">
          <span className="flip-card-kicker">{backLabel}</span>
          <p>{back}</p>
          <span className="flip-card-hint">Auto return</span>
        </div>}
      </div>
    </article>
  );
}
