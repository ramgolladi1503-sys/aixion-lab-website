import Link from "next/link";
import { systems } from "@/lib/site-data";

const proof = [
  ["01", "Evidence before confidence", "Every system keeps its state, evidence and next gate visible."],
  ["02", "Useful systems, bounded authority", "Applied intelligence supports decisions without pretending to replace judgment."],
  ["03", "Progress that keeps its history", "Active, frozen and rejected work remains part of the public record."],
];

export default function HomePage() {
  return <div className="editorial-home">
    <section className="editorial-home-hero"><div className="unseen-shell editorial-home-hero-grid">
      <div className="editorial-home-copy"><p className="eyebrow">AIXION LAB · APPLIED INTELLIGENCE · EVIDENCE</p><h1>From complex problems to enduring progress.</h1><p className="lede">An independent engineering lab where research, technical systems design and real-world collaboration meet.</p><p className="home-byline">Built by Ram — quality engineering, automation, software, data and applied AI shaped into systems people can understand and trust.</p><div className="button-row"><Link className="unseen-pill-button unseen-pill-button--primary" href="/systems">Explore our work <span aria-hidden="true">→</span></Link><Link className="unseen-text-link" href="/about">Our approach <span aria-hidden="true">↗</span></Link></div></div>
      <div className="mockup-home-diagram" aria-label="Aixion Lab systems map" role="img"><div className="diagram-orbit diagram-orbit--outer"/><div className="diagram-orbit diagram-orbit--middle"/><div className="diagram-orbit diagram-orbit--inner"/><div className="diagram-core">AX</div>{systems.map((system, index) => <span key={system.id} className={`diagram-node diagram-node--${index + 1}`} title={system.name}/>)}<div className="diagram-caption">PEOPLE<br/>DATA<br/>SYSTEMS<br/>EVIDENCE<br/>BETTER OUTCOMES</div></div>
    </div></section>
    <section className="home-editorial-section"><div className="unseen-shell"><div className="home-section-head"><h2>How the lab works</h2><p>Ideas move through research, implementation, validation and observation. The work is public about its boundaries as well as its ambition.</p></div><div className="home-proof-list">{proof.map(([id, title, copy]) => <div className="home-proof-row" key={id}><span>{id}</span><strong>{title}</strong><p>{copy}</p><span aria-hidden="true">↗</span></div>)}</div></div></section>
    <section className="home-editorial-section"><div className="unseen-shell"><div className="home-section-head"><h2>Selected systems</h2><p>Flagship work and exploratory systems, each with a visible state and a clear next gate.</p></div><div className="home-systems-list">{systems.map((system, index) => <Link className="home-system-row" href={`/systems/${system.slug}`} key={system.id}><span className="system-code">0{index + 1} · {system.id}</span><strong>{system.name}</strong><p>{system.descriptor}</p><span className="state-tag">{system.state}</span><span className="row-arrow" aria-hidden="true">→</span></Link>)}</div></div></section>
    <section className="home-editorial-section"><div className="unseen-shell"><div className="home-section-head"><h2>Keep looking</h2><p>Follow the work beyond the cover: read the research, understand the journey, or start a conversation.</p></div><div className="home-current-grid"><Link className="home-current-entry" href="/research"><small>01 · RESEARCH</small><h3>Questions before conclusions.</h3><p>Active, frozen and rejected studies remain visible.</p></Link><Link className="home-current-entry" href="/journey"><small>02 · JOURNEY</small><h3>Seven questions, one practice.</h3><p>How engineering concerns became a lab.</p></Link><Link className="home-current-entry" href="/collaborate"><small>03 · COLLABORATE</small><h3>Bring a real problem.</h3><p>Explore whether the work fits together.</p></Link></div></div></section>
  </div>;
}
