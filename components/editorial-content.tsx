import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function EditorialHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt = "",
  children,
  position = "center",
  scrollTarget = "page-content",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt?: string;
  children?: ReactNode;
  position?: string;
  scrollTarget?: string;
}) {
  return (
    <section className="editorial-hero">
      <Image className="editorial-hero__image" src={image} alt={imageAlt} fill priority sizes="100vw" style={{ objectPosition: position }} />
      <div className="editorial-hero__shade" aria-hidden="true" />
      <div className="editorial-hero__content page-width" data-reveal>
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="editorial-hero__copy">{copy}</p>
        {children ? <div className="editorial-hero__actions">{children}</div> : null}
      </div>
      <a className="scroll-cue" href={`#${scrollTarget}`} aria-label="Scroll to explore this page">
        <span aria-hidden="true" /> Scroll to explore
      </a>
    </section>
  );
}

export function EditorialHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`editorial-heading editorial-heading--${align}`} data-reveal>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p className="editorial-heading__copy">{copy}</p> : null}
    </header>
  );
}

export function ImageStory({
  image,
  imageAlt,
  eyebrow,
  title,
  children,
  href,
  action,
  reverse = false,
  number,
  className = "",
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  href?: string;
  action?: string;
  reverse?: boolean;
  number?: string;
  className?: string;
}) {
  return (
    <section className={`image-story ${reverse ? "image-story--reverse" : ""} ${className}`} data-reveal>
      <div className="image-story__media">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 760px) 100vw, 56vw" />
        {number ? <span className="image-story__number">{number}</span> : null}
      </div>
      <div className="image-story__copy">
        {number ? <span className="story-index">{number}</span> : null}
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="image-story__body">{children}</div>
        {href && action ? <Link className="editorial-link" href={href}>{action}<span aria-hidden="true">↗</span></Link> : null}
      </div>
    </section>
  );
}

export function EditorialLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="editorial-link" href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function SignalLine({ stages }: { stages: string[] }) {
  return (
    <ol className="signal-line" aria-label="Engineering lifecycle">
      {stages.map((stage, index) => (
        <li key={stage}>
          <span className="signal-line__node" aria-hidden="true" />
          <span className="signal-line__index">0{index + 1}</span>
          <span>{stage}</span>
        </li>
      ))}
    </ol>
  );
}
