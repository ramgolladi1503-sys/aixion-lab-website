import Link from "next/link";

const chapters = [
  ["01", "HOME", "We build intelligent systems for a more extraordinary future.", "AIXION LAB turns research into observable systems with explicit boundaries.", "/about"],
  ["02", "ABOUT", "Applied intelligence with a point of view.", "Human-centred engineering designed to make complex states legible.", "/journey"],
  ["03", "SYSTEMS", "Systems that learn, adapt and explain.", "Market intelligence, orchestration, automation and analytics in motion.", "/systems"],
  ["04", "RESEARCH", "Real challenges. Intelligent solutions.", "Evidence-led work with clear gates from question to operating system.", "/research"],
  ["05", "CONTACT", "Let’s build what’s next.", "Bring a difficult question. We will make its path visible.", "/about#contact"],
] as const;

export default function HomePage() {
  return <section className="landing" aria-labelledby="landing-title">
    <div className="landing-masthead shell"><p id="landing-title">AIXION LAB<sup>®</sup></p><span>RESPONSIVE · UNIFIED · INTELLIGENT<br/>AI SYSTEMS · AUTOMATION · INSIGHT</span></div>
    <div className="chapter-grid shell">{chapters.map(([number, label, title, body, href]) => <Link className="chapter-panel" href={href} key={number}>
      <span className="chapter-top"><b>CHAPTER</b><i>{number}</i></span><span className="chapter-image" aria-hidden="true" />
      <span className="chapter-copy"><small>{label}</small><h1>{title}</h1><p>{body}</p><strong>EXPLORE {label} ↗</strong></span>
      <span className="chapter-base"><em>AX / {number}</em><span>IDEAS BECOME USEFUL WHEN THEIR STATE CAN BE SEEN.</span><small>SCROLL TO EXPLORE　·</small></span>
    </Link>)}</div>
  </section>;
}
