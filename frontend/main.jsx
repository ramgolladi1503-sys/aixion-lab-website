import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GITHUB = "https://github.com/ramgolladi1503-sys";
const BRAND = "/brand/aixion-lab-brand-lockup.webp";

const NODES = [
  ["about", "About", -90, "Philosophy · operating principles"],
  ["journey", "Journey", -45, "QA → systems → applied AI"],
  ["projects", "Projects", 0, "TradeBot · engineering systems"],
  ["research", "Research", 45, "Hypotheses · replay · negative results"],
  ["evidence", "Evidence", 90, "Validation · governance · proof"],
  ["tower", "Control Tower", 135, "Observation · operational context"],
  ["stack", "Stack", 180, "Tools by engineering purpose"],
  ["contact", "Contact", 225, "Roles · collaboration · hard problems"],
].map(([key, label, angle, micro]) => ({ key, label, angle, micro }));

const META = Object.fromEntries(NODES.map((node) => [node.key, node]));
const PATHS = { home: "/", tower: "/control-tower", tradebot: "/projects/tradebot" };
const pathFor = (key) => PATHS[key] || `/${key}`;
const pageFor = (pathname) => {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/core") return "core";
  if (path === "/control-tower") return "tower";
  if (path === "/projects/tradebot") return "tradebot";
  const key = path.slice(1);
  return META[key] ? key : "home";
};

function Icon({ type, size = 22 }) {
  const icons = {
    about: <><circle cx="12" cy="8" r="3"/><path d="M5.5 20c.7-4.2 3-6.2 6.5-6.2s5.8 2 6.5 6.2"/></>,
    journey: <><path d="M4 18c2.2-5.6 5.2-8.3 9-8.3h6"/><path d="m16 6 3 3.7-3 3.7"/><circle cx="5" cy="18" r="1.5"/></>,
    projects: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
    research: <><path d="M9 3h6M10 3v5l-5.5 9.2A2.5 2.5 0 0 0 6.7 21h10.6a2.5 2.5 0 0 0 2.2-3.8L14 8V3"/><path d="M8 15h8"/></>,
    evidence: <><path d="M12 3 19 6v5c0 4.5-2.6 8-7 10-4.4-2-7-5.5-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    tower: <><path d="M4 19h16M7 16V8h4v8M13 16V4h4v12"/><path d="M8 5h2M14 8h2"/></>,
    stack: <><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/></>,
    contact: <><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></>,
    github: <path d="M9 19c-4 1.2-4-2-5.5-2.5M14.5 21v-3.1c0-.9.1-1.5-.4-2.1 3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.5 4.8 4.8 0 0 0 18.9 2S17.8 1.7 15 3.4a12.2 12.2 0 0 0-6 0C6.2 1.7 5.1 2 5.1 2A4.8 4.8 0 0 0 5 5.5a5.2 5.2 0 0 0-1.3 3.6c0 5.2 3.2 6.4 6.2 6.7-.4.5-.6 1.2-.5 2.1V21"/>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[type] || icons.projects}</svg>;
}

function Mark({ className = "" }) {
  return <span className={`brand-mark ${className}`} aria-hidden="true"><img src={BRAND} alt="" /></span>;
}

function clickOrigin(element) {
  if (!element) return { x: innerWidth / 2, y: innerHeight / 2 };
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function ComputationalField({ mode = "home", active = null, transitioning = false }) {
  const ref = useRef(null);
  const modeRef = useRef(mode);
  const activeRef = useRef(active);
  const transitionRef = useRef(transitioning);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { transitionRef.current = transitioning; }, [transitioning]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let width = 0, height = 0, dpr = 1, raf = 0, last = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = Array.from({ length: 118 }, (_, i) => ({
      x: ((i * 71 + 13) % 113) / 113,
      y: ((i * 47 + 19) % 109) / 109,
      phase: i * 0.63,
      speed: 0.55 + (i % 9) * 0.07,
      size: i % 13 === 0 ? 1.7 : 0.85,
      hot: i % 13 === 0,
    }));
    const packets = Array.from({ length: 14 }, (_, i) => ({ a: i * 7 % points.length, b: (i * 7 + 5 + (i % 4)) % points.length, t: (i * 0.17) % 1, speed: 0.035 + (i % 5) * 0.009 }));

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.55);
      width = innerWidth; height = innerHeight;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (event) => { pointer.tx = event.clientX / Math.max(width, 1) - 0.5; pointer.ty = event.clientY / Math.max(height, 1) - 0.5; };
    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.035); last = now;
      pointer.x += (pointer.tx - pointer.x) * 0.045; pointer.y += (pointer.ty - pointer.y) * 0.045;
      ctx.clearRect(0, 0, width, height);
      const activeBoost = activeRef.current ? 1.45 : 1;
      const transitionBoost = transitionRef.current ? 1.8 : 1;
      const modeBoost = modeRef.current === "deep" ? 1.8 : modeRef.current === "research" ? 1.2 : 1;
      const energy = activeBoost * transitionBoost * modeBoost;
      const glowX = width * (0.5 + pointer.x * 0.06), glowY = height * (0.48 + pointer.y * 0.05);
      const gradient = ctx.createRadialGradient(glowX, glowY, 10, glowX, glowY, Math.max(width, height) * 0.68);
      gradient.addColorStop(0, `rgba(255,52,65,${0.055 * energy})`);
      gradient.addColorStop(0.35, "rgba(14,18,24,.055)"); gradient.addColorStop(1, "rgba(2,3,5,0)");
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
      const time = now * 0.001;
      points.forEach((point, i) => {
        const flowX = Math.sin(time * 0.32 * point.speed + point.phase) * 0.012;
        const flowY = Math.cos(time * 0.27 * point.speed + point.phase * 1.3) * 0.009;
        const spiral = modeRef.current === "research" ? Math.sin(time * 0.7 + i * 0.13) * 0.007 : 0;
        point.px = (point.x + flowX + spiral) * width + pointer.x * (18 + (i % 5) * 2);
        point.py = (point.y + flowY) * height + pointer.y * (13 + (i % 7));
      });
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < Math.min(points.length, i + 11); j++) {
          const b = points[j];
          const distance = Math.hypot(a.px - b.px, a.py - b.py);
          if (distance > 155) continue;
          ctx.strokeStyle = `rgba(255,70,80,${(1 - distance / 155) * 0.115 * energy})`; ctx.lineWidth = 0.55;
          ctx.beginPath(); ctx.moveTo(a.px, a.py);
          if (modeRef.current === "research") ctx.quadraticCurveTo((a.px + b.px) / 2 + Math.sin(time + i) * 18, (a.py + b.py) / 2 + Math.cos(time + j) * 12, b.px, b.py);
          else ctx.lineTo(b.px, b.py);
          ctx.stroke();
        }
      }
      packets.forEach((packet) => {
        if (!reduced) packet.t = (packet.t + packet.speed * dt * (transitionRef.current ? 4.2 : 1)) % 1;
        const a = points[packet.a], b = points[packet.b];
        const x = a.px + (b.px - a.px) * packet.t, y = a.py + (b.py - a.py) * packet.t;
        ctx.fillStyle = `rgba(255,90,98,${0.42 * energy})`; ctx.beginPath(); ctx.arc(x, y, transitionRef.current ? 2.3 : 1.35, 0, Math.PI * 2); ctx.fill();
      });
      points.forEach((point) => { ctx.fillStyle = point.hot ? `rgba(255,80,90,${0.72 * energy})` : "rgba(232,238,246,.27)"; ctx.beginPath(); ctx.arc(point.px, point.py, point.size, 0, Math.PI * 2); ctx.fill(); });
      raf = requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize", resize); addEventListener("pointermove", move, { passive: true }); raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} className="computational-field" aria-hidden="true" />;
}

function App() {
  const raw = pageFor(location.pathname);
  const [page, setPage] = useState(raw === "core" ? "home" : raw);
  const [entered, setEntered] = useState(() => sessionStorage.getItem("aixion-entered-v3") === "1");
  const [hovered, setHovered] = useState(null);
  const [portal, setPortal] = useState(null);
  const [deep, setDeep] = useState(raw === "core");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const pop = () => { const next = pageFor(location.pathname); if (next === "core") { setDeep(true); setPage("home"); return; } setDeep(false); setPage(next); };
    addEventListener("popstate", pop); return () => removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    document.title = deep ? "AIXION CORE — AIXION LAB" : page === "home" ? "AIXION LAB — Engineering systems that survive reality" : `${page === "tradebot" ? "TradeBot" : META[page]?.label || page} — AIXION LAB`;
    if (!deep) scrollTo(0, 0);
  }, [page, deep]);

  const navigate = (key, element) => {
    if (key === "core") { history.pushState({}, "", "/core"); setDeep(true); return; }
    if (key === page && !deep) return;
    const start = clickOrigin(element), back = key === "home";
    setMenu(false); setDeep(false); setPortal({ key, label: back ? "HOME" : META[key]?.label || (key === "tradebot" ? "TRADEBOT" : key), back, ...start });
    window.setTimeout(() => { history.pushState({}, "", pathFor(key)); setPage(key); }, back ? 410 : 470);
    window.setTimeout(() => setPortal(null), back ? 1120 : 1260);
  };
  const exitDeep = () => { setDeep(false); history.replaceState({}, "", "/"); setPage("home"); };

  return <div className={`app page-${page} ${portal ? "is-transitioning" : ""} ${deep ? "is-deep" : ""}`}>
    <ComputationalField mode={deep ? "deep" : hovered || page} active={hovered} transitioning={!!portal} />
    {!entered ? <Entry enter={() => { sessionStorage.setItem("aixion-entered-v3", "1"); setEntered(true); }} /> : deep ? <DeepSpace exit={exitDeep} /> : <><Header page={page} navigate={navigate} menu={menu} setMenu={setMenu} />{page === "home" ? <Home hovered={hovered} setHovered={setHovered} navigate={navigate} /> : page === "tradebot" ? <TradeBot navigate={navigate} /> : <World page={page} navigate={navigate} />}</>}
    {portal && <RipplePortal portal={portal} />}
  </div>;
}

function Entry({ enter }) {
  return <main className="entry-screen"><button className="entry-core" onClick={enter} aria-label="Enter Aixion Lab"><span className="entry-ring ring-a"/><span className="entry-ring ring-b"/><span className="entry-ring ring-c"/><Mark className="entry-mark"/><span className="entry-aura"/></button></main>;
}

function Header({ page, navigate, menu, setMenu }) {
  return <header className="global-header">
    <button className="brand-button" onClick={(e) => navigate("home", e.currentTarget)} aria-label="Aixion Lab home"><img src={BRAND} alt="AIXION LAB"/></button>
    <nav className="desktop-nav" aria-label="Primary navigation"><button className={`home-morph ${page === "home" ? "home" : "mark"}`} onClick={(e) => navigate("home", e.currentTarget)} aria-label="Home"><span className="home-word">Home</span><Mark className="home-mark"/></button>{["projects", "research", "evidence", "contact"].map((key) => <button key={key} className={page === key ? "active" : ""} onClick={(e) => navigate(key, e.currentTarget)}>{META[key].label}</button>)}</nav>
    <div className="header-actions"><a href={GITHUB} target="_blank" rel="noreferrer" className="icon-button" title="GitHub — Selected engineering work" aria-label="GitHub — Selected engineering work"><Icon type="github"/></a><button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Open navigation"><span/><span/></button></div>
    {menu && <div className="mobile-menu">{["home", ...NODES.map((node) => node.key)].map((key) => <button key={key} onClick={(e) => navigate(key, e.currentTarget)}>{key === "home" ? "Home" : META[key].label}</button>)}<a href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github"/> GitHub</a></div>}
  </header>;
}

function Home({ hovered, setHovered, navigate }) {
  const [pulse, setPulse] = useState(false);
  const pressTimer = useRef(null);
  const enterDeep = () => navigate("core");
  return <main className={`home-orbit ${hovered ? "focused" : ""}`}><section className="orbit-stage"><span className="ambient-ring ambient-a"/><span className="ambient-ring ambient-b"/><span className="ambient-ring ambient-c"/>
    <div className="orbital-frame">{NODES.map((node) => <React.Fragment key={node.key}><span className={`spoke ${hovered === node.key ? "active" : ""}`} style={{ "--angle": `${node.angle}deg` }}><i/></span><div className="node-anchor" style={{ "--angle": `${node.angle}deg` }}><div className="angle-cancel"><div className="orbit-cancel"><button className={`hub-node ${hovered === node.key ? "active" : ""}`} onMouseEnter={() => setHovered(node.key)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(node.key)} onBlur={() => setHovered(null)} onClick={(e) => navigate(node.key, e.currentTarget)} aria-label={`Open ${node.label}`}><Icon type={node.key} size={24}/><strong>{node.label}</strong><small>{node.micro}</small><span className="node-aura"/></button></div></div></div></React.Fragment>)}</div>
    <button className={`core-node ${pulse ? "pulse" : ""}`} onClick={() => { setPulse(true); setTimeout(() => setPulse(false), 520); }} onDoubleClick={enterDeep} onPointerDown={() => { pressTimer.current = setTimeout(enterDeep, 720); }} onPointerUp={() => clearTimeout(pressTimer.current)} onPointerLeave={() => clearTimeout(pressTimer.current)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); enterDeep(); } }} aria-label="Aixion Core. Double click, long press, or press Enter to enter neural space."><span className="core-ring core-ring-a"/><span className="core-ring core-ring-b"/><span className="core-ring core-ring-c"/><Mark className="core-mark"/></button>
  </section><div className="idle-cue">EXPLORE THE SYSTEM</div></main>;
}

function RipplePortal({ portal }) {
  return <div className={`ripple-portal ${portal.back ? "back" : ""}`} style={{ "--x": `${portal.x}px`, "--y": `${portal.y}px` }} aria-hidden="true"><span className="ripple ripple-a"/><span className="ripple ripple-b"/><span className="ripple ripple-c"/><span className="portal-bloom"/><span className="portal-veil"/><strong>{portal.label}</strong></div>;
}

const PAGE_DATA = {
  about: { eyebrow: "ABOUT AIXION", title: "Build ambitious systems. Prove what they actually do.", intro: "Aixion Lab is an engineering workspace for applied AI, intelligent automation, market intelligence, quality systems, and evidence-driven experimentation.", signal: "ENGINEER → CHALLENGE → PROVE" },
  journey: { eyebrow: "ENGINEERING JOURNEY", title: "The work changed. The standard did not.", intro: "The path moved from quality engineering into automation, systems reliability, applied AI, and governed research — but the central question stayed the same: what breaks, and how do we know?", signal: "QUALITY → AUTOMATION → SYSTEMS → AI → EVIDENCE" },
  projects: { eyebrow: "PROJECTS", title: "Systems, not screenshots.", intro: "Projects are presented through the problem, architecture, engineering decisions, failure modes, validation strategy, and evidence — not through a superficial feature checklist.", signal: "PROBLEM → ARCHITECTURE → FAILURE → EVIDENCE" },
  research: { eyebrow: "RESEARCH", title: "Attractive ideas go here to be challenged.", intro: "Structured experiments, replay, adversarial checks, and evidence gates separate plausible narratives from behavior that survives testing. Unsupported results stay visible.", signal: "QUESTION → METHOD → EVIDENCE → NEXT GATE" },
  evidence: { eyebrow: "EVIDENCE", title: "Evidence before confidence.", intro: "A passing demo is not a validated system. Claims become stronger only when tests, runtime authority, reliability evidence, and review can support them.", signal: "VALIDATE → GOVERN → OBSERVE → REVIEW" },
  tower: { eyebrow: "CONTROL TOWER", title: "See the system without exposing the system.", intro: "A public-safe operational view across research, data, validation, and platform health. Demonstration and sanitized states are labeled explicitly; no fake live status.", signal: "DEMONSTRATION DATA · PUBLIC-SAFE VIEW" },
  stack: { eyebrow: "STACK", title: "Tools matter less than the engineering decisions behind them.", intro: "The stack spans quality engineering, automation, data systems, applied AI, research infrastructure, runtime reliability, and product development.", signal: "TECHNOLOGY BY ENGINEERING PURPOSE" },
  contact: { eyebrow: "CONTACT", title: "If the work is difficult, interesting, and worth proving — I want to hear about it.", intro: "Open to engineering roles and collaborations across AI/ML testing, quality engineering, automation, applied AI, data systems, research tooling, and reliability-minded product work.", signal: "BUILD · TEST · PROVE" },
};

function World({ page, navigate }) {
  const data = PAGE_DATA[page] || PAGE_DATA.about;
  return <main className={`world-shell world-${page}`}><div className="world-orbit" aria-hidden="true"><i/><i/><i/></div><section className="world-hero"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p className="world-intro">{data.intro}</p><div className="signal-line">{data.signal}</div></section><section className="world-content">{renderWorld(page, navigate)}</section></main>;
}

function renderWorld(page, navigate) {
  if (page === "about") return <AboutContent navigate={navigate}/>;
  if (page === "journey") return <JourneyContent/>;
  if (page === "projects") return <ProjectsContent navigate={navigate}/>;
  if (page === "research") return <ResearchContent/>;
  if (page === "evidence") return <EvidenceContent/>;
  if (page === "tower") return <TowerContent/>;
  if (page === "stack") return <StackContent/>;
  return <ContactContent/>;
}

function AboutContent({ navigate }) {
  const items = [["Engineer", "Build systems with explicit boundaries, observable behavior, and clear operational ownership."], ["Challenge", "Treat strategies, models, and architectural assumptions as things that must survive adversarial testing."], ["Prove", "Separate promising behavior from validated behavior. Evidence comes before promotion."]];
  return <><div className="editorial-grid">{items.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p></article>)}</div><button className="text-action" onClick={(e) => navigate("evidence", e.currentTarget)}>See the evidence system <Icon type="arrow" size={18}/></button></>;
}

function JourneyContent() {
  const steps = [["Quality Foundations", "Failure became information: reproduce it, isolate it, explain it, prevent it from silently returning."], ["Automation", "Moved repetitive verification into reusable systems and started thinking in state, coverage, and maintainability."], ["Systems & Reliability", "Expanded from test cases into feeds, runtimes, observability, failure boundaries, and operational behavior."], ["Applied AI", "Used machine learning and agent-assisted workflows while keeping evaluation, review, and human authority explicit."], ["Market Intelligence", "Built replay, options research, real-time data workflows, and hypothesis testing around difficult market behavior."], ["Governed Engineering", "Made exact-version authority, evidence capture, fail-closed gates, and reproducibility first-class concerns."], ["Aixion Lab", "Bringing projects, research, evidence, and the engineering journey together as one public system."]];
  return <div className="journey-stream">{steps.map(([title, text], index) => <article key={title}><i/><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</div>;
}

function ProjectsContent({ navigate }) {
  const projects = [["Autonomous Research Loop", "Governed research", "A bounded system for turning hypotheses into tasks, validation evidence, independent review, and explicit promotion decisions."], ["Aixion Control Tower", "Operational context", "A public-safe surface for understanding project health, research state, evidence, and operational context without exposing private execution controls."], ["Evidence Kernel", "Validation system", "A proof-oriented layer connecting claims to tests, exact versions, manifests, failures, reruns, and reviewable engineering evidence."]];
  return <div className="project-landscape"><button className="flagship-project" onClick={(e) => navigate("tradebot", e.currentTarget)}><span>FLAGSHIP ENGINEERING SYSTEM</span><h2>TradeBot</h2><p>A governed market-intelligence and research platform built around real-time data, replay, market microstructure, validation, observability, and operational boundaries.</p><b>Open engineering case study <Icon type="arrow" size={18}/></b></button><div className="project-rail">{projects.map(([title, tag, text]) => <article key={title}><span>{tag}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>;
}

function ResearchContent() {
  const lanes = [["Market microstructure", "Order flow, bid/ask behavior, options depth, and mechanics that indicators usually hide.", "ACTIVE"], ["Opening session", "Outcome-blind studies of early-session structure, context, constituents, futures, and recurrence.", "VALIDATING"], ["Closing Auction Session", "Auction behavior, constituent breadth, futures convergence, and options response.", "OBSERVING"], ["Options behavior", "Replay and microstructure analysis around strikes, IV, Greeks, liquidity, and short-horizon response.", "ACTIVE"], ["Regime & context", "Separating signal behavior by market conditions instead of pretending one rule works everywhere.", "EXPLORING"], ["Autonomous discovery", "Bounded agents proposing and testing hypotheses without being allowed to manufacture evidence.", "ENGINEERING"]];
  return <div className="research-stream">{lanes.map(([title, text, status]) => <article key={title}><span>{status}</span><h3>{title}</h3><p>{text}</p><i/></article>)}</div>;
}

function EvidenceContent() {
  const groups = [["Validation", "Focused tests · integration · adversarial cases · replay · deterministic reruns"], ["Governance", "Explicit authority · immutable candidates · promotion gates · fail-closed outcomes"], ["Reliability", "Feed health · stale-data detection · reconnect behavior · runtime supervision"], ["Review", "CI · independent review · evidence manifests · regression control"]];
  return <div className="evidence-lattice">{groups.map(([title, text], index) => <article key={title}><span>{title}</span><p>{text}</p><div className="evidence-path"><i/><i/><i/><i/></div><b>{index === 0 ? "TEST" : index === 1 ? "AUTHORITY" : index === 2 ? "RUNTIME" : "REVIEW"}</b></article>)}</div>;
}

function TowerContent() {
  const rows = [["Project state", "Sanitized / public-safe"], ["Research lanes", "Active + validating"], ["Evidence gates", "Demonstration data"], ["Runtime context", "No private controls exposed"]];
  return <div className="tower-field"><div className="tower-label">DEMONSTRATION DATA</div>{rows.map(([label, value]) => <div className="tower-row" key={label}><span>{label}</span><strong>{value}</strong><i/></div>)}</div>;
}

function StackContent() {
  const groups = [["Quality & Automation", "Java · Selenium · Appium · Jira · Xray · regression and integration engineering"], ["Research & Applied AI", "Python · XGBoost · time-series analysis · experimentation · replay tooling"], ["Data & Runtime", "WebSockets · market feeds · Parquet · event processing · supervision · observability"], ["Engineering Workflow", "Git · GitHub · CI · pytest · exact-version authority · agent-assisted development"], ["Web & Product", "React · Vite · JavaScript · CSS · Canvas · interaction engineering"]];
  return <div className="stack-layers">{groups.map(([title, text], index) => <article key={title} style={{ "--depth": index }}><span>{title}</span><p>{text}</p></article>)}</div>;
}

function ContactContent() {
  return <div className="contact-world"><div><span>AREAS OF INTEREST</span><p>AI/ML testing · quality engineering · automation · applied AI · data systems · research tooling · reliability engineering</p></div><a href={GITHUB} target="_blank" rel="noreferrer">View selected engineering work <Icon type="github" size={20}/></a><a href="mailto:contact@aixionlabs.com">Start a conversation <Icon type="arrow" size={19}/></a></div>;
}

function TradeBot({ navigate }) {
  const planes = [["Data plane", "Real-time feeds, quote/depth ingestion, replay datasets, aligned snapshots, persistence, and evidence capture."], ["Research plane", "Hypothesis evaluation, causal replay, options microstructure studies, regime context, validation, and ablation."], ["Governance plane", "Explicit authority boundaries, read-only observation, promotion gates, deterministic runs, and fail-closed behavior."], ["Observability plane", "Feed health, freshness, reconnect behavior, runtime events, candidate traces, and session evidence."]];
  return <main className="tradebot-world"><section className="tradebot-hero"><p className="eyebrow">FLAGSHIP · TRADEBOT</p><h1>Engineering market intelligence under real operational constraints.</h1><p>A governed market-intelligence and research platform for Indian index-options workflows. The difficult part was not drawing another indicator; it was proving what data, runtime state, and engineering boundaries produced a result.</p><div className="privacy-boundary">PUBLIC-SAFE ARCHITECTURE · PROPRIETARY LOGIC REMAINS PRIVATE</div></section><section className="tradebot-planes">{planes.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p><i/></article>)}</section><section className="failure-story"><p className="eyebrow">ENGINEERING PATTERN</p><h2>Symptom → root cause → guardrail → proof.</h2><p>Feed reliability, runtime authority, freshness, deterministic replay, process supervision, and evidence integrity became first-class engineering concerns because strategy output is meaningless if the system cannot prove how it was produced.</p><button className="text-action" onClick={(e) => navigate("projects", e.currentTarget)}>Back to Projects <Icon type="arrow" size={18}/></button></section></main>;
}

function DeepSpace({ exit }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    let width = 0, height = 0, dpr = 1, raf = 0, last = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = Array.from({ length: 190 }, (_, i) => ({ x: ((i * 73) % 127) / 127 * 2 - 1, y: ((i * 41 + 11) % 131) / 131 * 2 - 1, z: 0.15 + ((i * 29) % 100) / 100 }));
    const resize = () => { dpr = Math.min(devicePixelRatio || 1, 1.45); width = innerWidth; height = innerHeight; canvas.width = width * dpr; canvas.height = height * dpr; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const move = (e) => { pointer.tx = e.clientX / width - 0.5; pointer.ty = e.clientY / height - 0.5; };
    const draw = (now) => { const dt = Math.min((now - last) / 1000, 0.04); last = now; pointer.x += (pointer.tx - pointer.x) * 0.04; pointer.y += (pointer.ty - pointer.y) * 0.04; ctx.fillStyle = "rgba(2,3,5,.22)"; ctx.fillRect(0, 0, width, height); const cx = width / 2 + pointer.x * 55, cy = height / 2 + pointer.y * 40; points.forEach((p) => { if (!reduced) { p.z -= dt * 0.055; if (p.z < 0.08) p.z = 1; } const scale = 1 / p.z; p.sx = cx + p.x * width * 0.32 * scale; p.sy = cy + p.y * height * 0.32 * scale; p.alpha = Math.min(1, (1.08 - p.z) * 0.8); }); for (let i = 0; i < points.length; i += 3) { const a = points[i], b = points[(i + 11) % points.length]; if (Math.abs(a.z - b.z) < 0.18) { ctx.strokeStyle = `rgba(255,65,76,${0.055 * a.alpha})`; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke(); } } points.forEach((p, i) => { ctx.fillStyle = i % 17 === 0 ? `rgba(255,90,98,${p.alpha})` : `rgba(228,236,245,${0.42 * p.alpha})`; ctx.beginPath(); ctx.arc(p.sx, p.sy, i % 17 === 0 ? 2 : 0.9, 0, Math.PI * 2); ctx.fill(); }); raf = requestAnimationFrame(draw); };
    resize(); addEventListener("resize", resize); addEventListener("pointermove", move, { passive: true }); raf = requestAnimationFrame(draw); return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, []);
  useEffect(() => { const key = (e) => { if (e.key === "Escape") exit(); }; addEventListener("keydown", key); return () => removeEventListener("keydown", key); }, [exit]);
  return <main className="deep-space" onClick={exit} role="button" tabIndex={0} aria-label="Aixion neural space. Click or press Escape to return home."><canvas ref={ref}/><div className="deep-vignette"/><Mark className="deep-mark"/><span>CLICK ANYWHERE TO RETURN</span></main>;
}

createRoot(document.getElementById("root")).render(<App/>);
