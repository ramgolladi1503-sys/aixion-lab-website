import Link from "next/link";

const screens = [
  { name: "HOME", href: "/", kicker: "AIXION LAB", title: "Engineering intelligent systems", copy: "Applied intelligence, automation and decision systems built to remain observable, evidence-led and governed.", scene: "scene-canyon", cta: "Explore the lab" },
  { name: "ABOUT", href: "/about", kicker: "ABOUT", title: "Aixion Lab", copy: "An independent applied-engineering lab working across quality, automation, software, data and applied AI.", scene: "scene-mountain", cta: "Our philosophy" },
  { name: "SYSTEMS", href: "/systems", kicker: "SYSTEMS", title: "Built for complexity", copy: "Four public systems spanning market intelligence, orchestration, automation and analytics.", scene: "scene-network", cta: "Explore systems" },
  { name: "RESEARCH", href: "/research", kicker: "RESEARCH", title: "Beyond boundaries", copy: "Questions, hypotheses, experiments and rejected results remain visible when their state is known.", scene: "scene-orbit", cta: "Explore research" },
  { name: "PULSE", href: "/pulse", kicker: "PULSE", title: "Signals from the edge", copy: "Public-safe updates, active work, evidence changes and current gates across the lab.", scene: "scene-signal", cta: "Read latest" },
  { name: "JOURNEY", href: "/journey", kicker: "JOURNEY", title: "Built in relentless iteration", copy: "Quality engineering evolved into automation, software, data, ML systems and governed autonomy.", scene: "scene-mountain", cta: "Our journey" },
  { name: "CAREER", href: "/resume", kicker: "CAREER", title: "Build what matters", copy: "A recruiter-facing translation of the engineering evidence across Aixion Lab.", scene: "scene-canyon", cta: "Career snapshot" },
  { name: "COLLABORATE", href: "/collaborate", kicker: "COLLABORATE", title: "Build together", copy: "Selective, bounded engineering collaboration around quality, automation, AI validation and decision systems.", scene: "scene-canyon", cta: "Start a conversation" },
  { name: "CONTACT", href: "/about#contact", kicker: "CONTACT", title: "Let’s connect", copy: "Have a difficult engineering problem, opportunity or question? Use the path that matches it.", scene: "scene-mountain", cta: "Contact" },
  { name: "TRADEBOT", href: "/systems/tradebot", kicker: "TRADEBOT", title: "Governed market intelligence", copy: "Evidence reconciliation, data integrity, candidate validation and explicit authority boundaries.", scene: "scene-network", cta: "View system" },
  { name: "CONTROL CORE", href: "/systems/control-core", kicker: "CONTROL CORE", title: "Central intelligence", copy: "Context, agents, tools, policy, evidence and human authority inside one governed orchestration layer.", scene: "scene-robot", cta: "View system" },
  { name: "AUTOMATION", href: "/systems/automation", kicker: "AUTOMATION", title: "Automate the complex", copy: "Policy-bound tool execution, workflow automation, traceability and failure-safe engineering.", scene: "scene-city", cta: "View system" },
  { name: "ANALYTICS", href: "/systems/analytics", kicker: "ANALYTICS", title: "Insights that matter", copy: "Candidate truth, readiness, replay, outcomes and decision-support views with explicit boundaries.", scene: "scene-signal", cta: "View system" },
  { name: "RESEARCH DETAIL", href: "/research/evidence-bound-autonomy", kicker: "RESEARCH", title: "Adaptive systems in uncertain environments", copy: "A public research note showing how question, evidence, state and authority stay separated.", scene: "scene-orbit", cta: "Read note" },
];

export default function HomePage() {
  return (
    <div className="approved-gallery-home">
      <div className="shell">
        <div className="gallery-masthead">
          <div className="gallery-wordmark">
            <h1>AIXION LAB°</h1>
            <p>Independent applied-engineering lab</p>
          </div>
          <div className="gallery-tagline">Responsive · unified · intelligent<br/>AI systems · automation · insight</div>
        </div>

        <section className="screen-grid" aria-label="Aixion Lab destinations">
          {screens.map((screen) => (
            <div className="screen-slot" key={screen.name}>
              <div className="screen-label">{screen.name}</div>
              <Link className="screen-card" href={screen.href}>
                <div className="screen-top"><span>AIXION LAB°</span><span>MENU</span></div>
                <div className={`screen-scene ${screen.scene}`} aria-hidden="true">
                  <span className="scene-horizon" />
                  <span className="scene-figure" />
                </div>
                <div className="screen-copy">
                  <p className="kicker">{screen.kicker}</p>
                  <h2>{screen.title}</h2>
                  <p>{screen.copy}</p>
                  <span className="screen-cta">{screen.cta} →</span>
                </div>
                <div className="screen-bottom"><span>State · evidence · authority</span><span>Explore</span></div>
              </Link>
            </div>
          ))}
        </section>

        <div className="gallery-footer">
          <div><strong>AIXION LAB°</strong><small>© 2026 Aixion Lab. All rights reserved.</small></div>
          <div className="gallery-footer-mark" aria-hidden="true">✦</div>
          <p>Engineering intelligent systems<br/>for an unknowable future</p>
          <nav aria-label="Footer links"><Link href="/about">About</Link><Link href="/resume">Career</Link><Link href="/collaborate">Collaborate</Link><a href="https://github.com/ramgolladi1503-sys" target="_blank" rel="noreferrer">GitHub</a></nav>
        </div>
      </div>
    </div>
  );
}
