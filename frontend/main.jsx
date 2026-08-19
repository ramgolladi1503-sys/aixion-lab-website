import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GITHUB = "https://github.com/ramgolladi1503-sys";
const BRAND = "/brand/aixion-lab-brand-lockup.webp";
const ORBIT_SECONDS = 72;

const NODES = [
  { key: "about", label: "About", angle: -90 },
  { key: "journey", label: "Journey", angle: -45 },
  { key: "projects", label: "Projects", angle: 0 },
  { key: "research", label: "Research", angle: 45 },
  { key: "evidence", label: "Evidence", angle: 90 },
  { key: "tower", label: "Control Tower", angle: 135 },
  { key: "stack", label: "Stack", angle: 180 },
  { key: "contact", label: "Contact", angle: 225 },
];

const META = Object.fromEntries(NODES.map((node) => [node.key, node]));

const pathFor = (key) => {
  if (key === "home") return "/";
  if (key === "tower") return "/control-tower";
  if (key === "tradebot") return "/projects/tradebot";
  return `/${key}`;
};

const pageFor = (pathname) => {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/core") return "core";
  if (path === "/control-tower") return "tower";
  if (path === "/projects/tradebot") return "tradebot";
  const key = path.slice(1);
  return META[key] ? key : "home";
};

function Icon({ type, size = 21 }) {
  const paths = {
    about: <><circle cx="12" cy="8" r="3"/><path d="M5.5 20c.7-4.2 3-6.2 6.5-6.2s5.8 2 6.5 6.2"/></>,
    journey: <><path d="M4 18c2.2-5.6 5.2-8.3 9-8.3h6"/><path d="m16 6 3 3.7-3 3.7"/><circle cx="5" cy="18" r="1.5"/></>,
    projects: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
    research: <><path d="M9 3h6M10 3v5l-5.5 9.2A2.5 2.5 0 0 0 6.7 21h10.6a2.5 2.5 0 0 0 2.2-3.8L14 8V3"/><path d="M8 15h8"/></>,
    evidence: <><path d="M12 3 19 6v5c0 4.5-2.6 8-7 10-4.4-2-7-5.5-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    tower: <><path d="M4 19h16M7 16V8h4v8M13 16V4h4v12"/><path d="M8 5h2M14 8h2"/></>,
    stack: <><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/></>,
    contact: <><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></>,
    github: <path d="M9 19c-4 1.2-4-2-5.5-2.5M14.5 21v-3.1c0-.9.1-1.5-.4-2.1 3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.5 4.8 4.8 0 0 0 18.9 2S17.8 1.7 15 3.4a12.2 12.2 0 0 0-6 0C6.2 1.7 5.1 2 5.1 2A4.8 4.8 0 0 0 5 5.5a5.2 5.2 0 0 0-1.3 3.6c0 5.2 3.2 6.4 6.2 6.7-.4.5-.6 1.2-.5 2.1V21"/>,
    arrow: <path d="M5 12h14M14 7l5 5-5 5"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[type] || paths.projects}
    </svg>
  );
}

function Mark({ className = "" }) {
  return <span className={`brand-mark ${className}`} aria-hidden="true"><img src={BRAND} alt="" /></span>;
}

function BrandLockup({ className = "" }) {
  return <img className={`brand-lockup ${className}`} src={BRAND} alt="AIXION LAB — End is the new beginning" />;
}

function getOrigin(element) {
  if (!element) return { x: innerWidth / 2, y: innerHeight / 2 };
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function ComputationalField({ mode = "home", hot = false, transitioning = false }) {
  const canvasRef = useRef(null);
  const modeRef = useRef(mode);
  const hotRef = useRef(hot);
  const transitionRef = useRef(transitioning);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { hotRef.current = hot; }, [hot]);
  useEffect(() => { transitionRef.current = transitioning; }, [transitioning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const pointer = { x: 0, y: 0 };
    const count = innerWidth < 700 ? 78 : 126;

    const points = Array.from({ length: count }, (_, i) => ({
      x: ((i * 67 + 13) % 101) / 101,
      y: ((i * 43 + 19) % 97) / 97,
      vx: (((i % 9) - 4) || 1) * 0.000038,
      vy: ((((i * 5) % 9) - 4) || -1) * 0.000034,
      seed: i * 0.71,
      hot: i % 13 === 0,
    }));

    const streams = Array.from({ length: innerWidth < 700 ? 5 : 11 }, (_, i) => ({
      y: (i + 1) / 12,
      speed: 0.00012 + (i % 5) * 0.000035,
      phase: i * 0.17,
      direction: i % 2 ? 1 : -1,
    }));

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, innerWidth < 700 ? 1.25 : 1.6);
      width = innerWidth;
      height = innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event) => {
      pointer.x = event.clientX / Math.max(width, 1) - 0.5;
      pointer.y = event.clientY / Math.max(height, 1) - 0.5;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const energy = transitionRef.current ? 2.4 : hotRef.current ? 1.55 : 1;
      const driftBoost = transitionRef.current ? 2.2 : modeRef.current === "home" ? 1.25 : 1;

      const glow = ctx.createRadialGradient(
        width * (0.5 + pointer.x * 0.06),
        height * (0.46 + pointer.y * 0.05),
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.72
      );
      glow.addColorStop(0, `rgba(255,48,61,${0.05 * energy})`);
      glow.addColorStop(0.42, "rgba(16,18,24,.12)");
      glow.addColorStop(1, "rgba(2,3,5,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      points.forEach((point) => {
        if (!reduced) {
          point.x += point.vx * driftBoost;
          point.y += point.vy * driftBoost;
          if (point.x < -0.03) point.x = 1.03;
          if (point.x > 1.03) point.x = -0.03;
          if (point.y < -0.03) point.y = 1.03;
          if (point.y > 1.03) point.y = -0.03;
        }
        point.px = point.x * width + Math.sin(time * 0.0011 + point.seed) * 9 + pointer.x * 18;
        point.py = point.y * height + Math.cos(time * 0.0009 + point.seed) * 7 + pointer.y * 14;
      });

      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        for (let j = i + 1; j < Math.min(points.length, i + 10); j += 1) {
          const b = points[j];
          const distance = Math.hypot(a.px - b.px, a.py - b.py);
          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.12 * energy;
            ctx.strokeStyle = `rgba(255,60,73,${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            if (modeRef.current === "research") {
              ctx.quadraticCurveTo((a.px + b.px) / 2 + 18, (a.py + b.py) / 2 - 11, b.px, b.py);
            } else {
              ctx.lineTo(b.px, b.py);
            }
            ctx.stroke();
          }
        }
      }

      streams.forEach((stream, index) => {
        const travel = ((time * stream.speed * (transitionRef.current ? 2.6 : 1) + stream.phase) % 1.25) - 0.12;
        const x = stream.direction > 0 ? travel * width : width - travel * width;
        const y = height * stream.y + Math.sin(time * 0.001 + index) * 18;
        const length = transitionRef.current ? 150 : 84;
        const gradient = ctx.createLinearGradient(x - length, y, x + length, y);
        gradient.addColorStop(0, "rgba(255,61,74,0)");
        gradient.addColorStop(0.5, `rgba(255,82,92,${0.12 * energy})`);
        gradient.addColorStop(1, "rgba(255,61,74,0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = transitionRef.current ? 1.2 : 0.7;
        ctx.beginPath();
        ctx.moveTo(x - length, y);
        ctx.lineTo(x + length, y + pointer.y * 22);
        ctx.stroke();
      });

      points.forEach((point) => {
        ctx.fillStyle = point.hot ? `rgba(255,66,78,${0.66 * energy})` : "rgba(235,240,245,.25)";
        ctx.beginPath();
        ctx.arc(point.px, point.py, point.hot ? 1.7 : 0.85, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className="computational-field" aria-hidden="true" />;
}

function App() {
  const raw = pageFor(location.pathname);
  const [page, setPage] = useState(raw === "core" ? "home" : raw);
  const [entered, setEntered] = useState(() => sessionStorage.getItem("aixion-entered-v3") === "1");
  const [hover, setHover] = useState(null);
  const [transition, setTransition] = useState(null);
  const [deep, setDeep] = useState(raw === "core");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onPop = () => {
      const next = pageFor(location.pathname);
      if (next === "core") {
        setDeep(true);
        setPage("home");
        return;
      }
      setDeep(false);
      setPage(next);
    };
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title = deep
      ? "AIXION CORE — AIXION LAB"
      : page === "home"
        ? "AIXION LAB — Engineering systems that survive reality"
        : `${page === "tradebot" ? "TradeBot" : META[page]?.label || page} — AIXION LAB`;
  }, [page, deep]);

  const navigate = (key, element) => {
    if (key === "core") {
      history.pushState({}, "", "/core");
      setDeep(true);
      return;
    }
    if (key === page && !deep) return;

    const origin = getOrigin(element);
    const back = key === "home";
    setMenu(false);
    setDeep(false);
    setTransition({ key, back, ...origin });

    window.setTimeout(() => {
      history.pushState({}, "", pathFor(key));
      setPage(key);
      scrollTo({ top: 0, behavior: "auto" });
    }, 330);

    window.setTimeout(() => setTransition(null), 880);
  };

  const exitDeep = () => {
    setDeep(false);
    history.replaceState({}, "", "/");
    setPage("home");
  };

  return (
    <div className={`app page-${page} ${deep ? "is-deep" : ""}`}>
      <ComputationalField mode={deep ? "deep" : hover || page} hot={!!hover} transitioning={!!transition || deep} />
      {!entered ? (
        <Entry enter={() => { sessionStorage.setItem("aixion-entered-v3", "1"); setEntered(true); }} />
      ) : deep ? (
        <DeepSpace exit={exitDeep} />
      ) : (
        <>
          <Header page={page} navigate={navigate} menu={menu} setMenu={setMenu} />
          {page === "home" ? (
            <Home hover={hover} setHover={setHover} navigate={navigate} />
          ) : page === "tradebot" ? (
            <TradeBot navigate={navigate} />
          ) : (
            <World page={page} navigate={navigate} />
          )}
        </>
      )}
      {transition && <RippleTransition transition={transition} />}
    </div>
  );
}

function Entry({ enter }) {
  return (
    <main className="entry-screen">
      <button className="entry-core" onClick={enter} aria-label="Enter Aixion Lab">
        <i className="entry-ring ring-a" />
        <i className="entry-ring ring-b" />
        <i className="entry-ring ring-c" />
        <Mark className="entry-mark" />
      </button>
    </main>
  );
}

function Header({ page, navigate, menu, setMenu }) {
  return (
    <header className="global-header">
      <button className="brand-button" onClick={(event) => navigate("home", event.currentTarget)} aria-label="Aixion Lab home">
        <BrandLockup />
      </button>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <button className={`home-morph ${page === "home" ? "show-home" : "show-mark"}`} onClick={(event) => navigate("home", event.currentTarget)} aria-label="Home">
          <span>Home</span>
          <Mark className="header-home-mark" />
        </button>
        {["projects", "research", "evidence", "contact"].map((key) => (
          <button key={key} className={page === key ? "active" : ""} onClick={(event) => navigate(key, event.currentTarget)}>
            {META[key].label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <a href={GITHUB} target="_blank" rel="noreferrer" className="github-button" title="GitHub — Selected engineering work" aria-label="GitHub — Selected engineering work"><Icon type="github" /></a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Open navigation"><span /><span /></button>
      </div>

      {menu && (
        <div className="mobile-menu">
          {["home", ...NODES.map((node) => node.key)].map((key) => (
            <button key={key} onClick={(event) => navigate(key, event.currentTarget)}>{key === "home" ? "Home" : META[key].label}</button>
          ))}
          <a href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github" /> GitHub</a>
        </div>
      )}
    </header>
  );
}

function Home({ hover, setHover, navigate }) {
  const timer = useRef(null);
  const points = useMemo(() => NODES.map((node) => {
    const radius = 39;
    const radians = node.angle * Math.PI / 180;
    return {
      ...node,
      x: 50 + Math.cos(radians) * radius,
      y: 50 + Math.sin(radians) * radius,
      sx: 500 + Math.cos(radians) * 390,
      sy: 500 + Math.sin(radians) * 390,
    };
  }), []);

  const enterCore = () => navigate("core");

  return (
    <main className={`home-orbit ${hover ? "has-focus" : ""}`}>
      <section className="orbit-stage">
        <div className="ambient-ring ambient-a" />
        <div className="ambient-ring ambient-b" />
        <div className="ambient-ring ambient-c" />

        <div className="orbital-frame" style={{ "--orbit-seconds": `${ORBIT_SECONDS}s` }}>
          <svg className="wheel-spokes" viewBox="0 0 1000 1000" aria-hidden="true">
            <g>
              {points.map((node) => (
                <line key={node.key} className={hover === node.key ? "active" : ""} x1="500" y1="500" x2={node.sx} y2={node.sy} />
              ))}
            </g>
          </svg>

          {points.map((node) => (
            <div className="node-position" key={node.key} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <div className="node-upright" style={{ "--orbit-seconds": `${ORBIT_SECONDS}s` }}>
                <button
                  className={`hub-node ${hover === node.key ? "active" : ""}`}
                  onMouseEnter={() => setHover(node.key)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(node.key)}
                  onBlur={() => setHover(null)}
                  onClick={(event) => navigate(node.key, event.currentTarget)}
                  aria-label={`Open ${node.label}`}
                >
                  <Icon type={node.key} size={24} />
                  <strong>{node.label}</strong>
                  <i className="node-scan" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="core-node"
          onClick={() => {}}
          onDoubleClick={enterCore}
          onPointerDown={() => { timer.current = setTimeout(enterCore, 720); }}
          onPointerUp={() => clearTimeout(timer.current)}
          onPointerLeave={() => clearTimeout(timer.current)}
          onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); enterCore(); } }}
          aria-label="Aixion Core. Double click, long press, or press Enter to enter neural space."
        >
          <i className="core-ring core-a" />
          <i className="core-ring core-b" />
          <i className="core-ring core-c" />
          <Mark className="core-mark" />
        </button>
      </section>
      <div className="idle-cue">EXPLORE THE SYSTEM</div>
    </main>
  );
}

function RippleTransition({ transition }) {
  return (
    <div className={`ripple-transition ${transition.back ? "is-back" : ""}`} style={{ "--x": `${transition.x}px`, "--y": `${transition.y}px` }} aria-hidden="true">
      <div className="ripple-ring ring-one" />
      <div className="ripple-ring ring-two" />
      <div className="ripple-ring ring-three" />
      <div className="ripple-veil" />
    </div>
  );
}

const PAGE_DATA = {
  about: {
    eyebrow: "ABOUT AIXION",
    title: "Build ambitious systems. Prove what they actually do.",
    intro: "Aixion Lab is an engineering workspace for applied AI, intelligent automation, market intelligence, quality systems, and evidence-driven experimentation.",
    tabs: ["Introduction", "Principles", "Proof"],
  },
  journey: {
    eyebrow: "ENGINEERING JOURNEY",
    title: "The work changed. The standard did not.",
    intro: "The path moved from quality engineering into automation, systems reliability, applied AI, and governed research — while the standard stayed rooted in observable behavior and evidence.",
    tabs: ["Introduction", "Progression", "Through-line"],
  },
  projects: {
    eyebrow: "PROJECTS",
    title: "Systems, not screenshots.",
    intro: "Projects are presented through the problem, architecture, engineering decisions, failure modes, validation strategy, and evidence — not through a superficial feature checklist.",
    tabs: ["Introduction", "Flagship", "Programs"],
  },
  research: {
    eyebrow: "RESEARCH",
    title: "Attractive ideas go here to be challenged.",
    intro: "Structured experiments, replay, adversarial checks, and evidence gates separate plausible narratives from behavior that survives testing.",
    tabs: ["Introduction", "Lanes", "Method"],
  },
  evidence: {
    eyebrow: "EVIDENCE",
    title: "Evidence before confidence.",
    intro: "A passing demo is not the same as a validated system. Claims should become stronger only when the evidence does.",
    tabs: ["Introduction", "Layers", "Standard"],
  },
  tower: {
    eyebrow: "CONTROL TOWER",
    title: "See the system without exposing the system.",
    intro: "A sanitized operational view across research, data, validation, and platform health — demonstrating observability without publishing private controls.",
    tabs: ["Introduction", "Telemetry", "Boundary"],
  },
  stack: {
    eyebrow: "STACK",
    title: "Tools matter less than the engineering decisions behind them.",
    intro: "The stack spans quality engineering, automation, data systems, applied AI, research infrastructure, and product development.",
    tabs: ["Introduction", "Layers", "Use"],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Let’s talk about difficult systems worth building and proving.",
    intro: "Open to engineering roles and collaborations across AI/ML testing, quality engineering, automation, applied AI, data systems, research tooling, and reliability-minded product work.",
    tabs: ["Contact", "Interests", "GitHub"],
  },
};

function SectionRail({ tabs }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = tabs.map((_, index) => document.getElementById(`chapter-${index}`)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.dataset.chapter));
    }, { rootMargin: "-30% 0px -50% 0px", threshold: [0.08, 0.25, 0.55] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <nav className="chapter-rail" aria-label="Page chapters">
      {tabs.map((tab, index) => (
        <button key={tab} className={active === index ? "active" : ""} onClick={() => document.getElementById(`chapter-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
          <span>{tab}</span><i />
        </button>
      ))}
    </nav>
  );
}

function World({ page, navigate }) {
  const data = PAGE_DATA[page] || PAGE_DATA.about;
  return (
    <main className={`world-page world-${page}`}>
      <SectionRail tabs={data.tabs} />
      <section className="world-hero" id="chapter-0" data-chapter="0">
        <p className="eyebrow">{data.eyebrow}</p>
        <h1>{data.title}</h1>
        <article>{data.intro}</article>
      </section>
      <WorldBody page={page} navigate={navigate} />
    </main>
  );
}

function WorldBody({ page, navigate }) {
  if (page === "about") return <AboutBody navigate={navigate} />;
  if (page === "journey") return <JourneyBody />;
  if (page === "projects") return <ProjectsBody navigate={navigate} />;
  if (page === "research") return <ResearchBody />;
  if (page === "evidence") return <EvidenceBody />;
  if (page === "tower") return <TowerBody />;
  if (page === "stack") return <StackBody />;
  return <ContactBody />;
}

function AboutBody({ navigate }) {
  return (
    <div className="world-content">
      <section className="principle-flow" id="chapter-1" data-chapter="1">
        {[["Engineer","Build systems with explicit boundaries, observable behavior, and clear operational ownership."],["Challenge","Treat strategies, models, and architectural assumptions as things that must survive adversarial testing."],["Prove","Separate promising behavior from validated behavior. Evidence comes before promotion."]].map(([title, body]) => (
          <article key={title}><small>{title.toUpperCase()}</small><h2>{title}</h2><p>{body}</p></article>
        ))}
      </section>
      <section className="statement-section" id="chapter-2" data-chapter="2">
        <blockquote>Quality engineering taught me to look for failure. Applied AI and systems work taught me to design for it.</blockquote>
        <button className="text-action" onClick={(event) => navigate("evidence", event.currentTarget)}>See the evidence system <Icon type="arrow" /></button>
      </section>
    </div>
  );
}

function JourneyBody() {
  const steps = [
    ["Quality Engineering", "Reproduce failure, isolate it, explain it, prevent silent regression."],
    ["Automation", "Turn repetitive verification into reusable systems, state, coverage, and maintainability."],
    ["Systems & Reliability", "Move from test cases into feeds, runtimes, observability, and failure boundaries."],
    ["Applied AI", "Use models and agent-assisted workflows while keeping evaluation and human authority explicit."],
    ["Market Intelligence", "Build replay, options research, real-time data workflows, and hypothesis testing."],
    ["Governed Engineering", "Make exact-version authority, evidence capture, fail-closed gates, and reproducibility first-class."],
    ["Aixion Lab", "Bring the work together as a public engineering system: projects, research, evidence, and journey."],
  ];
  return (
    <div className="world-content">
      <section className="journey-stream" id="chapter-1" data-chapter="1">
        {steps.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}
      </section>
      <section className="statement-section" id="chapter-2" data-chapter="2"><blockquote>What changed was the scale of the system. What stayed was the requirement to know what actually happened.</blockquote></section>
    </div>
  );
}

function ProjectsBody({ navigate }) {
  const programs = [
    ["Autonomous Research Loop", "Bounded hypothesis generation, task qualification, evidence gates, and explicit promotion decisions."],
    ["Aixion Control Tower", "Operational visibility across projects, research state, evidence, and public-safe system health."],
    ["Evidence Kernel", "Claims connected to tests, exact versions, failures, deterministic reruns, and reviewable manifests."],
  ];
  return (
    <div className="world-content">
      <section className="flagship" id="chapter-1" data-chapter="1">
        <small>FLAGSHIP ENGINEERING SYSTEM</small>
        <h2>TradeBot</h2>
        <p>A governed market-intelligence and research platform for Indian index-options workflows, built around real-time data, replay, microstructure research, observability, and evidence.</p>
        <button className="text-action" onClick={(event) => navigate("tradebot", event.currentTarget)}>Open engineering case study <Icon type="arrow" /></button>
      </section>
      <section className="project-stream" id="chapter-2" data-chapter="2">
        {programs.map(([title, body]) => <article key={title}><small>ENGINEERING PROGRAM</small><h3>{title}</h3><p>{body}</p></article>)}
      </section>
    </div>
  );
}

function ResearchBody() {
  const lanes = [
    ["Market microstructure", "Order flow, bid/ask behavior, options depth, and mechanics that indicators usually hide."],
    ["Opening session", "Outcome-blind studies of early-session structure, context, constituents, futures, and recurrence."],
    ["Closing Auction Session", "Auction behavior, constituent breadth, futures convergence, and options response."],
    ["Options behavior", "Replay and microstructure analysis around strikes, IV, Greeks, liquidity, and short-horizon response."],
    ["Regime & context", "Separate signal behavior by market conditions instead of pretending one rule works everywhere."],
    ["Autonomous discovery", "Bounded agents propose and test hypotheses without being allowed to manufacture evidence."],
  ];
  return (
    <div className="world-content">
      <section className="research-branches" id="chapter-1" data-chapter="1">
        {lanes.map(([title, body]) => <article key={title}><small>ACTIVE RESEARCH LANE</small><h2>{title}</h2><p>{body}</p></article>)}
      </section>
      <section className="statement-section" id="chapter-2" data-chapter="2"><blockquote>Negative results stay visible. Unsupported ideas should not quietly return wearing a new name.</blockquote></section>
    </div>
  );
}

function EvidenceBody() {
  const layers = [
    ["Validation", ["Focused tests", "Integration tests", "Adversarial checks", "Deterministic replay"]],
    ["Governance", ["Explicit authority", "Promotion gates", "Read-only separation", "Fail-closed behavior"]],
    ["Reliability", ["Feed health", "Freshness", "Reconnect behavior", "Runtime supervision"]],
    ["Review", ["CI", "Independent review", "Evidence manifests", "Regression control"]],
  ];
  return (
    <div className="world-content">
      <section className="verification" id="chapter-1" data-chapter="1">
        {layers.map(([title, items]) => <article key={title}><small>PROOF LAYER</small><h2>{title}</h2><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}
      </section>
      <section className="statement-section" id="chapter-2" data-chapter="2"><blockquote>If a system cannot explain what ran, what data it used, what changed, and why the result should be trusted, it is not finished.</blockquote></section>
    </div>
  );
}

function TowerBody() {
  const cards = [
    ["Project state", "DEMONSTRATION DATA", "Public-safe portfolio state"],
    ["Research lanes", "SANITIZED DATA", "Research classifications and next gates"],
    ["Evidence gates", "PUBLIC STATUS", "Validation and review context"],
    ["System health", "DEMONSTRATION DATA", "Illustrative runtime surface"],
    ["Observation", "OFFLINE REPLAY", "No broker write authority implied"],
    ["Milestones", "PUBLIC STATUS", "Selected engineering progress"],
  ];
  return (
    <div className="world-content">
      <section className="telemetry" id="chapter-1" data-chapter="1">
        {cards.map(([title, label, body], index) => <article key={title} style={{ "--delay": `${index * .18}s` }}><i /><small>{label}</small><h2>{title}</h2><p>{body}</p></article>)}
      </section>
      <section className="statement-section boundary" id="chapter-2" data-chapter="2"><blockquote>Status is context, not theater.</blockquote><p>No fabricated live data. Demonstration, delayed, replay, and real public status remain clearly labeled.</p></section>
    </div>
  );
}

function StackBody() {
  const groups = [
    ["Quality & Automation", ["Java", "Selenium", "Appium", "Jira / Xray", "Regression & integration engineering"]],
    ["Research & Applied AI", ["Python", "XGBoost", "Time-series analysis", "Experimentation", "Replay tooling"]],
    ["Data & Runtime", ["WebSockets", "Real-time feeds", "Parquet", "Event processing", "Observability"]],
    ["Engineering Workflow", ["Git", "GitHub", "CI", "pytest", "Exact-version authority", "Agent-assisted development"]],
    ["Web / Product", ["React", "Vite", "Canvas", "Interaction engineering", "Responsive UI"]],
  ];
  return (
    <div className="world-content">
      <section className="stack-layers" id="chapter-1" data-chapter="1">
        {groups.map(([title, items], index) => <article key={title} style={{ "--index": index }}><h2>{title}</h2><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}
      </section>
      <section className="statement-section" id="chapter-2" data-chapter="2"><blockquote>Tools are useful only when they solve a real engineering constraint.</blockquote></section>
    </div>
  );
}

function ContactBody() {
  return (
    <div className="world-content contact-content">
      <section className="contact-space" id="chapter-1" data-chapter="1">
        <div>
          <small>AREAS OF INTEREST</small>
          <p>AI/ML testing · quality engineering · automation · applied AI · data systems · research tooling · reliability engineering</p>
          <a href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github" /> Selected engineering work</a>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label>Name<input name="name" autoComplete="name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" /></label>
          <label>What are you building?<textarea name="message" rows="4" /></label>
          <button type="submit" disabled>Contact form wiring pending</button>
        </form>
      </section>
      <section className="statement-section compact-statement" id="chapter-2" data-chapter="2"><blockquote>Hard problem? Good place to start.</blockquote></section>
    </div>
  );
}

function TradeBot({ navigate }) {
  const tabs = ["Introduction", "Architecture", "Failure → Proof", "Boundary"];
  return (
    <main className="world-page tradebot-page">
      <SectionRail tabs={tabs} />
      <section className="tradebot-hero" id="chapter-0" data-chapter="0">
        <p className="eyebrow">FLAGSHIP · TRADEBOT</p>
        <h1>Engineering market intelligence under real operational constraints.</h1>
        <article>A governed market-intelligence and research platform for Indian index-options workflows. The difficult part was not drawing another indicator; it was proving what data, runtime state, and evidence produced each result.</article>
      </section>

      <section className="tradebot-topology" id="chapter-1" data-chapter="1">
        {[
          ["Data plane", "Real-time feeds, quote/depth ingestion, replay data, aligned snapshots, persistence."],
          ["Research plane", "Hypothesis evaluation, causal replay, options microstructure, context and ablation."],
          ["Governance plane", "Authority boundaries, promotion gates, reproducible runs, fail-closed behavior."],
          ["Observability plane", "Feed health, freshness, reconnects, runtime events, decision traces, evidence."],
        ].map(([title, body]) => <article key={title}><small>ARCHITECTURE LAYER</small><h2>{title}</h2><p>{body}</p></article>)}
      </section>

      <section className="engineering-story" id="chapter-2" data-chapter="2">
        <p>FAILURE → REPAIR → PROOF</p>
        <h2>Feed reliability, runtime authority, data freshness, deterministic replay, process supervision, and evidence integrity became first-class engineering concerns.</h2>
        <div><span>Symptom</span><i /><span>Root cause</span><i /><span>Guardrail</span><i /><span>Proof</span></div>
      </section>

      <section className="privacy" id="chapter-3" data-chapter="3">
        <h2>Public architecture. Private implementation.</h2>
        <div>{["No credentials", "No API tokens", "No proprietary signal thresholds", "No active entry/exit logic", "No write controls", "No private source code"].map((item) => <span key={item}>{item}</span>)}</div>
        <button className="text-action" onClick={(event) => navigate("projects", event.currentTarget)}>Back to Projects <Icon type="arrow" /></button>
      </section>
    </main>
  );
}

function DeepSpace({ exit }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1050);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const start = performance.now();
    const pointer = { x: 0, y: 0 };
    const stars = Array.from({ length: innerWidth < 700 ? 90 : 190 }, (_, i) => ({
      x: ((i * 71) % 199) / 199 * 2 - 1,
      y: ((i * 47 + 23) % 193) / 193 * 2 - 1,
      z: ((i * 31) % 173) / 173 + 0.04,
      pz: 1,
      hue: i % 17 === 0,
    }));

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.45);
      width = innerWidth;
      height = innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event) => {
      pointer.x = event.clientX / Math.max(width, 1) - 0.5;
      pointer.y = event.clientY / Math.max(height, 1) - 0.5;
    };

    const project = (star, z) => {
      const scale = 1 / Math.max(z, 0.025);
      return {
        x: width / 2 + (star.x + pointer.x * 0.18) * width * 0.28 * scale,
        y: height / 2 + (star.y + pointer.y * 0.18) * height * 0.28 * scale,
      };
    };

    const draw = (time) => {
      const elapsed = time - start;
      ctx.fillStyle = "rgba(1,2,4,.34)";
      ctx.fillRect(0, 0, width, height);
      const warp = reduced ? 0.008 : elapsed < 1200 ? 0.031 : 0.0065;

      stars.forEach((star) => {
        star.pz = star.z;
        star.z -= warp;
        if (star.z < 0.03) {
          star.z = 1;
          star.pz = 1.05;
        }
        const current = project(star, star.z);
        const previous = project(star, star.pz);
        const alpha = Math.min(0.9, (1 - star.z) * 0.85 + 0.12);
        ctx.strokeStyle = star.hue ? `rgba(255,65,78,${alpha})` : `rgba(225,235,247,${alpha * 0.65})`;
        ctx.lineWidth = elapsed < 1200 ? 1.5 : 0.65;
        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(current.x, current.y);
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => { if (event.key === "Escape" && ready) exit(); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [exit, ready]);

  return (
    <main className="deep-space" onClick={() => { if (ready) exit(); }} role="button" tabIndex="0" aria-label="Aixion neural data space. Click or press Escape to return home.">
      <canvas ref={canvasRef} />
      <div className="deep-vignette" />
      <div className="warp-brand">
        <BrandLockup />
        <strong>END IS THE NEW BEGINNING</strong>
      </div>
      {ready && <small>CLICK ANYWHERE OR PRESS ESC TO RETURN</small>}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
