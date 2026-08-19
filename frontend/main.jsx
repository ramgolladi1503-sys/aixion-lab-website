import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GITHUB_URL = "https://github.com/ramgolladi1503-sys";
const BRAND_LOCKUP = "/brand/aixion-lab-brand-lockup.webp";

const NODES = [
  { key: "about", label: "About", n: "01", angle: -90, preview: "Engineering philosophy, operating principles, and what Aixion Lab is becoming." },
  { key: "journey", label: "Journey", n: "02", angle: -45, preview: "From quality engineering to automation, applied AI, research systems, and governed engineering." },
  { key: "projects", label: "Projects", n: "03", angle: 0, preview: "Case-study quality engineering work led by TradeBot and the systems built around it." },
  { key: "research", label: "Research", n: "04", angle: 45, preview: "Hypotheses, replay, market microstructure, model evaluation, and negative results that stay visible." },
  { key: "evidence", label: "Evidence", n: "05", angle: 90, preview: "Validation, governance, reliability, review, and the proof behind engineering claims." },
  { key: "tower", label: "Control Tower", n: "06", angle: 135, preview: "A public-safe operational view across projects, research lanes, evidence, and system health." },
  { key: "stack", label: "Stack", n: "07", angle: 180, preview: "Technologies grouped by the engineering problems they were used to solve." },
  { key: "contact", label: "Contact", n: "08", angle: 225, preview: "Engineering roles, collaborations, and difficult systems worth building and proving." },
];

const PAGE_META = Object.fromEntries(NODES.map((node) => [node.key, node]));

const pagePath = (key) => {
  if (key === "home") return "/";
  if (key === "tower") return "/control-tower";
  if (key === "tradebot") return "/projects/tradebot";
  return `/${key}`;
};

const pathPage = (pathname) => {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/control-tower") return "tower";
  if (path === "/projects/tradebot") return "tradebot";
  const key = path.slice(1);
  if (NODES.some((node) => node.key === key) || key === "core") return key;
  return "home";
};

function Icon({ type, size = 24 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const icons = {
    about: <><circle cx="12" cy="8" r="3"/><path d="M5.5 20c.7-4.2 3-6.2 6.5-6.2s5.8 2 6.5 6.2"/></>,
    journey: <><path d="M4 18c2.2-5.6 5.2-8.3 9-8.3h6"/><path d="m16 6 3 3.7-3 3.7"/><circle cx="5" cy="18" r="1.5"/></>,
    projects: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
    research: <><path d="M9 3h6M10 3v5l-5.5 9.2A2.5 2.5 0 0 0 6.7 21h10.6a2.5 2.5 0 0 0 2.2-3.8L14 8V3"/><path d="M8 15h8"/></>,
    evidence: <><path d="M12 3 19 6v5c0 4.5-2.6 8-7 10-4.4-2-7-5.5-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    tower: <><path d="M4 19h16M7 16V8h4v8M13 16V4h4v12"/><path d="M8 5h2M14 8h2"/></>,
    stack: <><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/></>,
    contact: <><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></>,
    github: <><path d="M9 19c-4 1.2-4-2-5.5-2.5M14.5 21v-3.1c0-.9.1-1.5-.4-2.1 3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.5 4.8 4.8 0 0 0 18.9 2S17.8 1.7 15 3.4a12.2 12.2 0 0 0-6 0C6.2 1.7 5.1 2 5.1 2A4.8 4.8 0 0 0 5 5.5a5.2 5.2 0 0 0-1.3 3.6c0 5.2 3.2 6.4 6.2 6.7-.4.5-.6 1.2-.5 2.1V21"/></>,
    core: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></>,
    home: <><path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    close: <><path d="m5 5 14 14M19 5 5 19"/></>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6H5V6h6"/></>,
  };
  return <svg {...common}>{icons[type] || icons.core}</svg>;
}

function App() {
  const [page, setPage] = useState(() => pathPage(window.location.pathname));
  const [hovered, setHovered] = useState(null);
  const [transition, setTransition] = useState(null);
  const [entered, setEntered] = useState(() => sessionStorage.getItem("aixion-entered") === "1");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPop = () => setPage(pathPage(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title = page === "home" ? "AIXION LAB — Engineering systems that survive reality" : `${page === "tower" ? "Control Tower" : page === "tradebot" ? "TradeBot" : page[0].toUpperCase() + page.slice(1)} — AIXION LAB`;
    window.scrollTo(0, 0);
  }, [page]);

  const navigate = (key) => {
    if (key === page) return;
    const node = PAGE_META[key];
    const angle = node?.angle ?? -90;
    setTransition({ key, angle });
    setMenuOpen(false);
    window.setTimeout(() => {
      const path = pagePath(key);
      window.history.pushState({}, "", path);
      setPage(key);
      window.setTimeout(() => setTransition(null), 260);
    }, 460);
  };

  const enter = () => {
    sessionStorage.setItem("aixion-entered", "1");
    setEntered(true);
  };

  return (
    <div className={`app page-${page} ${transition ? "is-transitioning" : ""}`}>
      <SignalField />
      {!entered ? <EntryScreen onEnter={enter} /> : <>
        <Header page={page} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {page === "home" ? (
          <HomeHub hovered={hovered} setHovered={setHovered} navigate={navigate} />
        ) : page === "tradebot" ? (
          <TradeBotPage navigate={navigate} />
        ) : (
          <InternalPage page={page} navigate={navigate} />
        )}
      </>}
      {transition && <RouteTransition transition={transition} />}
    </div>
  );
}

function SignalField() {
  const points = useMemo(() => Array.from({ length: 52 }, (_, i) => ({
    id: i,
    x: (i * 37 + 11) % 100,
    y: (i * 61 + 7) % 100,
    s: 1 + (i % 3),
    d: (i % 11) * -0.7,
  })), []);
  return <div className="signal-field" aria-hidden="true"><div className="field-glow" />{points.map((p) => <i key={p.id} style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }} />)}</div>;
}

function EntryScreen({ onEnter }) {
  return <main className="entry-screen">
    <button className="entry-core" onClick={onEnter} aria-label="Enter Aixion Lab">
      <span className="entry-rings" />
      <span className="emblem emblem-large">A</span>
      <span className="entry-pulse" />
    </button>
    <div className="entry-copy"><span>AIXION LAB</span><strong>ENTER THE SYSTEM</strong><small>Engineering systems · evidence · applied research</small></div>
  </main>;
}

function Header({ page, navigate, menuOpen, setMenuOpen }) {
  const nav = ["home", "projects", "research", "evidence", "contact"];
  return <header className="global-header">
    <button className="brand-button" onClick={() => navigate("home")} aria-label="Return to Aixion home">
      <img src={BRAND_LOCKUP} alt="AIXION LAB" />
    </button>
    <nav className="desktop-nav" aria-label="Primary navigation">
      {nav.map((key) => <button key={key} className={page === key ? "active" : ""} onClick={() => navigate(key)}>{key === "home" ? "Home" : key[0].toUpperCase() + key.slice(1)}</button>)}
    </nav>
    <div className="header-actions">
      <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="icon-button github-link" aria-label="GitHub — selected engineering work" title="GitHub — selected engineering work"><Icon type="github" size={20}/></a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open navigation"><span/><span/></button>
    </div>
    {menuOpen && <div className="mobile-menu">{["home", ...NODES.map((n) => n.key), "core"].map((key) => <button key={key} onClick={() => navigate(key)}>{key === "tower" ? "Control Tower" : key === "core" ? "Aixion Core" : key[0].toUpperCase() + key.slice(1)}</button>)}<a href={GITHUB_URL} target="_blank" rel="noreferrer"><Icon type="github" size={18}/> GitHub</a></div>}
  </header>;
}

function HomeHub({ hovered, setHovered, navigate }) {
  const selected = hovered ? PAGE_META[hovered] : null;
  return <main className="home-shell">
    <section className="home-copy">
      <p className="eyebrow">AIXION LAB</p>
      <h1>I build systems that have to survive contact with reality.</h1>
      <p>Applied AI, quality engineering, market intelligence, automation, and evidence-driven research — designed around observable behavior, explicit failure boundaries, and reproducible results.</p>
      <div className="home-actions"><button className="line-button" onClick={() => navigate("projects")}>Explore the work <Icon type="arrow" size={17}/></button><a className="quiet-link" href={GITHUB_URL} target="_blank" rel="noreferrer"><Icon type="github" size={18}/> GitHub</a></div>
    </section>

    <RadialHub hovered={hovered} setHovered={setHovered} navigate={navigate} />

    <aside className={`preview-panel ${selected ? "visible" : ""}`} aria-live="polite">
      {selected ? <>
        <div className="preview-top"><span>{selected.n}</span><Icon type={selected.key} size={22}/></div>
        <p className="preview-label">YOU'RE EXPLORING</p>
        <h2>{selected.label}</h2>
        <p>{selected.preview}</p>
        {selected.key === "projects" && <div className="preview-proof"><strong>FLAGSHIP</strong><span>TradeBot</span><small>Market intelligence · replay · governance · observability</small></div>}
        {selected.key === "evidence" && <div className="preview-proof"><strong>PROOF LAYERS</strong><span>Validate → Govern → Observe</span><small>Claims earn stronger language only when evidence supports it.</small></div>}
        <button className="primary-action" onClick={() => navigate(selected.key)}>Enter {selected.label} <Icon type="arrow" size={18}/></button>
      </> : <>
        <p className="preview-label">CONNECTED ENGINEERING</p>
        <h2>One system. Eight ways in.</h2>
        <p>Hover a node to preview its world. Click to travel through the spoke. The center opens the deeper Aixion Core.</p>
        <div className="preview-proof"><strong>CORE PRINCIPLE</strong><span>Evidence before confidence.</span><small>Failure, validation, and operational boundaries remain visible.</small></div>
      </>}
    </aside>

    <div className="home-status"><span className="status-light"/> <span>Public experience</span><strong>Operational</strong></div>
  </main>;
}

function RadialHub({ hovered, setHovered, navigate, compact = false, current = null }) {
  return <div className={`radial-hub ${compact ? "compact" : ""}`}>
    <div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="orbit orbit-3"/>
    <button className="core-node" onClick={() => navigate("core")} aria-label="Open Aixion Core">
      <span className="core-rings"/><span className="emblem">A</span><small>AIXION CORE</small>
    </button>
    {NODES.map((node) => {
      const rad = node.angle * Math.PI / 180;
      const radius = compact ? 31 : 39;
      const x = 50 + Math.cos(rad) * radius;
      const y = 50 + Math.sin(rad) * radius;
      const active = hovered === node.key || current === node.key;
      return <React.Fragment key={node.key}>
        <span className={`spoke ${active ? "active" : ""}`} style={{ "--angle": `${node.angle}deg`, "--length": compact ? "31%" : "39%" }} />
        <button
          className={`hub-node ${active ? "active" : ""}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          onMouseEnter={() => setHovered?.(node.key)}
          onMouseLeave={() => setHovered?.(null)}
          onFocus={() => setHovered?.(node.key)}
          onBlur={() => setHovered?.(null)}
          onClick={() => navigate(node.key)}
          aria-label={`Open ${node.label}`}
        >
          <span className="node-number">{node.n}</span>
          <Icon type={node.key} size={compact ? 18 : 23}/>
          <strong>{node.label}</strong>
          {!compact && <small>{node.preview.split(".")[0]}.</small>}
        </button>
      </React.Fragment>;
    })}
  </div>;
}

function InternalPage({ page, navigate }) {
  const content = PAGE_CONTENT[page] || PAGE_CONTENT.about;
  return <main className="internal-shell">
    <section className="internal-intro">
      <button className="back-hub" onClick={() => navigate("home")}><Icon type="home" size={16}/> Home hub</button>
      <p className="eyebrow">{content.eyebrow}</p>
      <h1>{content.title}</h1>
      <p className="intro-copy">{content.intro}</p>
      <div className="mini-wrap"><RadialHub compact current={page} navigate={navigate}/></div>
      {content.aside && <div className="intro-aside"><strong>{content.aside.label}</strong><p>{content.aside.body}</p></div>}
    </section>
    <section className="content-panel">
      <div className="panel-head"><div><span>{content.kicker}</span><h2>{content.panelTitle}</h2></div><span className="panel-index">{PAGE_META[page]?.n || "00"}</span></div>
      <div className="panel-scroll">{content.render(navigate)}</div>
    </section>
  </main>;
}

const PAGE_CONTENT = {
  about: {
    eyebrow: "ABOUT AIXION",
    title: "Build ambitious systems. Prove what they actually do.",
    intro: "Aixion Lab is an engineering workspace for applied AI, intelligent automation, market research, quality systems, and evidence-driven experimentation.",
    kicker: "OPERATING PHILOSOPHY",
    panelTitle: "Engineering where claims have to survive review.",
    aside: { label: "POSITIONING", body: "The work lives at the intersection of AI, testing, automation, data systems, and reliability — especially where being confidently wrong is expensive." },
    render: (navigate) => <>
      <p className="panel-lede">The goal is not to produce more demos. The goal is to build systems where assumptions can be tested, failure modes can be observed, and claims can be supported by evidence.</p>
      <div className="three-grid">
        <InfoCard icon="projects" title="Engineer" text="Build systems with explicit boundaries, observable behavior, and clear operational ownership." />
        <InfoCard icon="research" title="Challenge" text="Treat every strategy, model, and architectural assumption as something that must survive adversarial testing." />
        <InfoCard icon="evidence" title="Prove" text="Separate promising behavior from validated behavior. Evidence comes before promotion." />
      </div>
      <QuoteBlock>Quality engineering taught me to look for failure. Applied AI and systems work taught me to design for it.</QuoteBlock>
      <button className="primary-action fit" onClick={() => navigate("evidence")}>See how evidence works <Icon type="arrow" size={18}/></button>
    </>
  },
  journey: {
    eyebrow: "ENGINEERING JOURNEY",
    title: "The work changed. The standard did not.",
    intro: "The path moved from quality engineering into automation, systems reliability, applied AI, and governed research — but the central question stayed the same: what breaks, and how do we know?",
    kicker: "PROGRESSION",
    panelTitle: "From finding defects to designing systems that expose them.",
    aside: { label: "THROUGH-LINE", body: "Quality → automation → systems thinking → applied AI → evidence-driven engineering." },
    render: () => <Timeline />,
  },
  projects: {
    eyebrow: "PROJECTS",
    title: "Systems, not screenshots.",
    intro: "Projects are presented through the problem, architecture, engineering decisions, failure modes, validation strategy, and evidence — not through a superficial feature checklist.",
    kicker: "SELECTED ENGINEERING WORK",
    panelTitle: "TradeBot leads the portfolio because the engineering problem kept getting harder.",
    aside: { label: "PUBLIC-SAFE", body: "Architecture and engineering evidence are shown without publishing credentials, private strategy logic, sensitive parameters, or proprietary code." },
    render: (navigate) => <ProjectGrid navigate={navigate} />,
  },
  research: {
    eyebrow: "RESEARCH",
    title: "Attractive ideas go here to be challenged.",
    intro: "Structured experiments, replay, adversarial checks, and evidence gates separate plausible narratives from behavior that survives testing.",
    kicker: "RESEARCH LANES",
    panelTitle: "Negative results stay visible.",
    aside: { label: "DISCIPLINE", body: "An unsupported hypothesis is useful when it prevents the same weak idea from being recycled later." },
    render: () => <ResearchGrid />,
  },
  evidence: {
    eyebrow: "EVIDENCE",
    title: "Evidence before confidence.",
    intro: "A passing demo is not the same as a validated system. This layer shows how projects are tested, challenged, observed, and promoted.",
    kicker: "PROOF SYSTEM",
    panelTitle: "Claims earn stronger language only when the evidence does.",
    aside: { label: "STANDARD", body: "If a system cannot explain what ran, what data it used, what changed, and why the result should be trusted, it is not finished." },
    render: () => <EvidenceGrid />,
  },
  tower: {
    eyebrow: "CONTROL TOWER",
    title: "See the system without exposing the system.",
    intro: "A sanitized operational view across research, data, validation, and platform health — designed to demonstrate observability without publishing private controls.",
    kicker: "PUBLIC OPERATIONS VIEW",
    panelTitle: "Status is context, not theater.",
    aside: { label: "BOUNDARY", body: "No fabricated live data. Demonstration, delayed, and real public status must always be labeled honestly." },
    render: () => <TowerDashboard />,
  },
  stack: {
    eyebrow: "STACK",
    title: "Tools matter less than the engineering decisions behind them.",
    intro: "The stack spans quality engineering, automation, data systems, applied AI, research infrastructure, and product development.",
    kicker: "TECHNOLOGY BY PURPOSE",
    panelTitle: "What each tool was actually used to solve.",
    aside: { label: "NO LOGO CEMETERY", body: "Technologies are grouped by the failure mode or engineering problem they addressed." },
    render: () => <StackGrid />,
  },
  contact: {
    eyebrow: "CONTACT",
    title: "If the work is difficult, interesting, and worth proving — I want to hear about it.",
    intro: "Open to engineering roles and collaborations across AI/ML testing, quality engineering, automation, applied AI, data systems, research tooling, and reliability-minded product work.",
    kicker: "START A CONVERSATION",
    panelTitle: "Make the next problem worth solving.",
    aside: { label: "GITHUB", body: "Public engineering work is available through the GitHub profile. Private project internals stay private." },
    render: () => <ContactPanel />,
  },
  core: {
    eyebrow: "AIXION CORE",
    title: "One lab. Multiple systems. Shared engineering principles.",
    intro: "The center of the site reveals how projects, research, data, quality, AI, evidence, governance, and operations connect.",
    kicker: "SYSTEM MAP",
    panelTitle: "The deeper architecture behind the portfolio.",
    aside: { label: "CORE", body: "The outer spokes are destinations. The center is the relationship between them." },
    render: (navigate) => <CoreMap navigate={navigate} />,
  },
};

function InfoCard({ icon, title, text }) {
  return <article className="info-card"><Icon type={icon} size={25}/><h3>{title}</h3><p>{text}</p></article>;
}

function QuoteBlock({ children }) { return <blockquote className="quote-block">“{children}”</blockquote>; }

function Timeline() {
  const steps = [
    ["01", "Quality Foundations", "Learned to treat failure as information: reproduce it, isolate it, explain it, and prevent it from silently returning."],
    ["02", "Automation", "Moved repetitive verification into automation and started thinking in reusable systems, state, coverage, and maintainability."],
    ["03", "Systems & Reliability", "Expanded from test cases into feeds, runtimes, observability, failure boundaries, and operational behavior."],
    ["04", "Applied AI", "Used machine learning and agent-assisted workflows while keeping evaluation, review, and human authority explicit."],
    ["05", "Market Intelligence", "Built replay, options research, real-time data workflows, and hypothesis testing around difficult market behavior."],
    ["06", "Governed Engineering", "Made exact-version authority, evidence capture, fail-closed gates, and reproducibility first-class engineering concerns."],
    ["07", "Aixion Lab", "Bringing the work together as a public engineering system: projects, research, evidence, and the journey behind them."],
  ];
  return <div className="timeline">{steps.map(([n, title, body]) => <div className="timeline-row" key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div>;
}

function ProjectGrid({ navigate }) {
  const projects = [
    { tag: "FLAGSHIP", title: "TradeBot", body: "A governed market-intelligence and research platform for Indian index-options workflows, built around real-time data, replay, microstructure research, observability, and evidence.", action: () => navigate("tradebot") },
    { tag: "GOVERNANCE", title: "Autonomous Research Loop", body: "A structured engineering loop for turning hypotheses into bounded tasks, validation evidence, independent review, and explicit promotion decisions." },
    { tag: "OPERATIONS", title: "Aixion Control Tower", body: "A public-safe control surface for understanding project health, research state, evidence, and operational context without exposing private execution controls." },
    { tag: "VALIDATION", title: "Evidence Kernel", body: "A proof-oriented layer that connects claims to tests, exact versions, manifests, failures, reruns, and reviewable engineering evidence." },
  ];
  return <div className="project-grid">{projects.map((p, i) => <article className={`project-card ${i === 0 ? "featured" : ""}`} key={p.title}><div className="project-top"><span>{p.tag}</span><b>0{i + 1}</b></div><h3>{p.title}</h3><p>{p.body}</p>{p.action ? <button onClick={p.action}>Open engineering case study <Icon type="arrow" size={17}/></button> : <span className="project-state">Public architecture summary</span>}</article>)}</div>;
}

function ResearchGrid() {
  const lanes = [
    ["Market microstructure", "Order flow, bid/ask behavior, options depth, and the market mechanics that indicators usually hide.", "ACTIVE"],
    ["Opening session", "Outcome-blind studies of early-session structure, context, constituents, futures, and recurrence.", "VALIDATING"],
    ["Closing Auction Session", "Research into auction behavior, constituent breadth, futures convergence, and options response.", "OBSERVING"],
    ["Options behavior", "Replay and microstructure analysis around strikes, IV, Greeks, liquidity, and short-horizon response.", "ACTIVE"],
    ["Regime & context", "Separating signal behavior by market conditions instead of pretending one rule works everywhere.", "EXPLORING"],
    ["Autonomous discovery", "Bounded agents that propose and test hypotheses without being allowed to manufacture evidence.", "ENGINEERING"],
  ];
  return <div className="research-grid">{lanes.map(([title, body, status]) => <article key={title}><span className="status-tag">{status}</span><h3>{title}</h3><p>{body}</p><small>Question → method → evidence → next gate</small></article>)}</div>;
}

function EvidenceGrid() {
  const sections = [
    ["Validation", "Focused tests · integration checks · adversarial cases · replay · deterministic reruns"],
    ["Governance", "Explicit authority · immutable candidates · promotion gates · read-only/live separation · fail-closed outcomes"],
    ["Reliability", "Feed health · reconnect behavior · stale-data detection · runtime supervision · persistence"],
    ["Review", "CI · independent review · evidence manifests · change authority · regression controls"],
  ];
  return <><div className="evidence-grid">{sections.map(([title, body], i) => <article key={title}><span className="evidence-mark"><Icon type="evidence" size={22}/></span><div><small>0{i + 1}</small><h3>{title}</h3><p>{body}</p></div></article>)}</div><QuoteBlock>A failure with a clean explanation is more useful than a pass the system cannot defend.</QuoteBlock></>;
}

function TowerDashboard() {
  return <div className="tower-board">
    <div className="tower-banner"><span className="status-light"/><strong>PUBLIC DEMONSTRATION VIEW</strong><small>Sanitized interface — not a trading or execution console</small></div>
    <div className="metric-grid"><Metric label="Project lanes" value="08" sub="research · platform · evidence"/><Metric label="Authority" value="READ" sub="public-safe observation"/><Metric label="Evidence mode" value="ON" sub="claims remain gated"/><Metric label="Runtime posture" value="BOUND" sub="explicit operational limits"/></div>
    <div className="tower-main"><div className="chart-card"><div className="card-head"><span>ENGINEERING SIGNAL</span><b>24h context</b></div><div className="fake-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div className="event-card"><div className="card-head"><span>RECENT STATE</span><b>sanitized</b></div>{["Research lane observed", "Validation gate evaluated", "Evidence artifact sealed", "Runtime boundary confirmed"].map((x, i) => <div className="event-row" key={x}><span className={i === 1 ? "warn" : "ok"}/><p>{x}</p><small>{i + 1} · evidence</small></div>)}</div></div>
  </div>;
}

function Metric({ label, value, sub }) { return <article className="metric"><small>{label}</small><strong>{value}</strong><span>{sub}</span></article>; }

function StackGrid() {
  const groups = [
    ["Quality & Automation", ["Java", "Selenium", "Appium", "Jira / Xray", "Regression design", "Integration workflows"]],
    ["Research & Applied AI", ["Python", "XGBoost", "Time-series analysis", "Replay", "Experimentation", "Model evaluation"]],
    ["Data & Runtime Systems", ["WebSockets", "Real-time feeds", "Parquet", "Event processing", "Runtime supervision", "Observability"]],
    ["Engineering Workflow", ["Git", "GitHub", "CI", "pytest", "Exact-version workflows", "Agent-assisted engineering"]],
    ["Aixion Web Platform", ["React", "Vite", "JavaScript", "CSS motion", "Canvas / WebGL direction", "Design tokens"]],
  ];
  return <div className="stack-grid">{groups.map(([title, items]) => <article key={title}><h3>{title}</h3><div>{items.map((x) => <span key={x}>{x}</span>)}</div></article>)}</div>;
}

function ContactPanel() {
  return <div className="contact-layout">
    <div className="contact-callout"><p>Interested in the engineering behind Aixion?</p><h3>Start with the work, then start a conversation.</h3><div><a className="primary-action fit" href="mailto:contact@aixionlabs.com">Email Aixion Lab <Icon type="arrow" size={18}/></a><a className="secondary-action" href={GITHUB_URL} target="_blank" rel="noreferrer"><Icon type="github" size={18}/> View GitHub</a></div></div>
    <form className="contact-form" onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:contact@aixionlabs.com?subject=Aixion%20Lab%20conversation"; }}><label>Name<input name="name" placeholder="Your name"/></label><label>Email<input name="email" type="email" placeholder="you@company.com"/></label><label>What are you interested in?<select defaultValue=""><option value="" disabled>Select a topic</option><option>Engineering role</option><option>AI / QA collaboration</option><option>Research</option><option>Product / systems work</option></select></label><label>Message<textarea name="message" placeholder="Tell me about the problem." rows="4"/></label><button className="primary-action" type="submit">Start the conversation <Icon type="arrow" size={18}/></button></form>
  </div>;
}

function CoreMap({ navigate }) {
  const domains = [
    ["Projects", "projects", "systems being built"], ["Research", "research", "questions being tested"], ["Evidence", "evidence", "claims being earned"], ["Operations", "tower", "systems being observed"], ["Quality", "journey", "failure made visible"], ["AI", "stack", "models inside boundaries"], ["Data", "research", "inputs made inspectable"], ["Governance", "evidence", "authority made explicit"],
  ];
  return <div className="core-map"><div className="core-map-center"><span className="emblem">A</span><strong>AIXION</strong><small>shared engineering principles</small></div>{domains.map(([label, target, sub], i) => <button key={label} style={{ "--i": i }} onClick={() => navigate(target)}><span>{String(i + 1).padStart(2, "0")}</span><strong>{label}</strong><small>{sub}</small></button>)}</div>;
}

function TradeBotPage({ navigate }) {
  return <main className="tradebot-shell">
    <section className="tradebot-rail">
      <button className="back-hub" onClick={() => navigate("projects")}><Icon type="arrow" size={16}/> Projects</button>
      <p className="eyebrow">FLAGSHIP ENGINEERING CASE STUDY</p>
      <h1>TradeBot</h1>
      <p>A governed market-intelligence and research platform for Indian index-options workflows.</p>
      <div className="tradebot-tags"><span>Real-time data</span><span>Replay</span><span>Microstructure</span><span>Governance</span><span>Observability</span><span>Evidence</span></div>
      <div className="privacy-note"><Icon type="evidence" size={20}/><div><strong>Public-safe case study</strong><p>Architecture and engineering reasoning are shown. Credentials, private strategy logic, sensitive parameters, and proprietary code are not.</p></div></div>
    </section>
    <section className="tradebot-canvas">
      <div className="tradebot-head"><span>ENGINEERING THE SYSTEM AROUND THE SIGNAL</span><a href={GITHUB_URL} target="_blank" rel="noreferrer"><Icon type="github" size={18}/> GitHub profile</a></div>
      <div className="tradebot-scroll">
        <h2>The difficult part was not drawing another indicator on a chart.</h2>
        <p className="panel-lede">The difficult part was building enough engineering discipline around the platform to distinguish data failure from strategy failure, replay artifacts from live behavior, and promising hypotheses from evidence that could support a claim.</p>
        <div className="architecture-grid">
          <ArchitectureCard n="01" title="Data plane" items={["real-time market feeds", "quote / depth ingestion", "historical & replay datasets", "time-aligned snapshots", "evidence persistence"]}/>
          <ArchitectureCard n="02" title="Research plane" items={["hypothesis evaluation", "causal replay analysis", "options microstructure", "regime / context", "ablation & validation"]}/>
          <ArchitectureCard n="03" title="Governance plane" items={["explicit authority boundaries", "read-only observation", "promotion gates", "immutable evidence", "fail-closed behavior"]}/>
          <ArchitectureCard n="04" title="Observability plane" items={["feed health", "freshness", "runtime events", "reconnect behavior", "decision traces"]}/>
        </div>
        <QuoteBlock>Feed reliability, runtime authority, data freshness, deterministic replay, process supervision, and evidence integrity became first-class engineering concerns because a strategy result is meaningless if the system cannot prove what data and runtime state produced it.</QuoteBlock>
        <div className="failure-lens"><div><span>ENGINEERING LENS</span><h3>Symptom → root cause → guardrail → proof</h3><p>TradeBot is presented through the failures that forced the architecture to mature, not as a polished story that hides the hard parts.</p></div><div className="failure-flow"><span>Observe</span><i/><span>Isolate</span><i/><span>Repair</span><i/><span>Prove</span></div></div>
      </div>
    </section>
  </main>;
}

function ArchitectureCard({ n, title, items }) { return <article className="architecture-card"><span>{n}</span><h3>{title}</h3><ul>{items.map((x) => <li key={x}>{x}</li>)}</ul></article>; }

function RouteTransition({ transition }) {
  return <div className="route-transition" style={{ "--travel-angle": `${transition.angle}deg` }} aria-hidden="true"><span className="travel-line"/><span className="travel-core"><span className="emblem">A</span></span></div>;
}

createRoot(document.getElementById("root")).render(<App />);
