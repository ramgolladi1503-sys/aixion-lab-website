import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GITHUB = "https://github.com/ramgolladi1503-sys";
const BRAND = "/brand/aixion-lab-brand-lockup.webp";
const EMBLEM = "/brand/aixion-emblem.svg";

const NODES = [
  ["about", "About", -90],
  ["journey", "Journey", -45],
  ["projects", "Projects", 0],
  ["research", "Research", 45],
  ["evidence", "Evidence", 90],
  ["tower", "Control Tower", 135],
  ["stack", "Stack", 180],
  ["contact", "Contact", 225],
].map(([key, label, angle]) => ({ key, label, angle }));

const META = Object.fromEntries(NODES.map((n) => [n.key, n]));

const pathFor = (key) => {
  if (key === "home") return "/";
  if (key === "tower") return "/control-tower";
  if (key === "tradebot") return "/projects/tradebot";
  return `/${key}`;
};

const pageFor = (pathname) => {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  if (p === "/core") return "core";
  if (p === "/control-tower") return "tower";
  if (p === "/projects/tradebot") return "tradebot";
  const key = p.slice(1);
  return META[key] ? key : "home";
};

function Icon({ type, size = 20 }) {
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
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type] || paths.projects}</svg>;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function StandaloneEmblem({ className = "", alt = "" }) {
  return <img className={`standalone-emblem ${className}`} src={EMBLEM} alt={alt} />;
}

function CursorSystem() {
  const dot = useRef(null);
  const halo = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      if (halo.current) halo.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    const over = (e) => {
      const hot = e.target.closest("button,a,[data-cursor]");
      halo.current?.classList.toggle("hot", !!hot);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, []);
  return <><i ref={dot} className="cursor-dot"/><i ref={halo} className="cursor-halo"/></>;
}

function ComputationalField({ mode = "home", boost = false }) {
  const ref = useRef(null);
  const modeRef = useRef(mode);
  const boostRef = useRef(boost);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { boostRef.current = boost; }, [boost]);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let W = 0;
    let H = 0;
    let DPR = 1;
    const pointer = { x: 0, y: 0 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = Array.from({ length: 132 }, (_, i) => ({
      x: ((i * 59 + 13) % 137) / 137,
      y: ((i * 83 + 31) % 149) / 149,
      vx: (((i * 7) % 11) - 5) * 0.000018,
      vy: (((i * 5) % 13) - 6) * 0.000016,
      phase: i * 0.63,
      accent: i % 13 === 0,
    }));
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 1.55);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    const pointerMove = (e) => {
      pointer.x = e.clientX / Math.max(W, 1) - 0.5;
      pointer.y = e.clientY / Math.max(H, 1) - 0.5;
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      const boostValue = boostRef.current ? 2.15 : 1;
      const modeValue = modeRef.current === "research" ? 1.15 : modeRef.current === "evidence" ? 0.95 : 1;
      const speed = boostValue * modeValue;
      const glow = ctx.createRadialGradient(W * (0.5 + pointer.x * 0.05), H * (0.47 + pointer.y * 0.05), 0, W / 2, H / 2, Math.max(W, H) * 0.72);
      glow.addColorStop(0, `rgba(255,57,68,${0.052 * boostValue})`);
      glow.addColorStop(0.38, "rgba(19,25,34,.10)");
      glow.addColorStop(1, "rgba(2,3,5,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      points.forEach((p) => {
        if (!reduced) {
          p.x += p.vx * speed;
          p.y += p.vy * speed;
          if (p.x < -0.03) p.x = 1.03;
          if (p.x > 1.03) p.x = -0.03;
          if (p.y < -0.03) p.y = 1.03;
          if (p.y > 1.03) p.y = -0.03;
        }
        p.px = p.x * W + Math.sin(t * 0.0011 * speed + p.phase) * 9 + pointer.x * 22;
        p.py = p.y * H + Math.cos(t * 0.00085 * speed + p.phase) * 7 + pointer.y * 16;
      });

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < Math.min(points.length, i + 10); j++) {
          const a = points[i];
          const b = points[j];
          const d = Math.hypot(a.px - b.px, a.py - b.py);
          if (d < 145) {
            const alpha = (1 - d / 145) * 0.13 * boostValue;
            ctx.strokeStyle = modeRef.current === "evidence" ? `rgba(240,244,248,${alpha * 0.65})` : `rgba(255,65,76,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            if (modeRef.current === "research") {
              ctx.quadraticCurveTo((a.px + b.px) / 2 + 18, (a.py + b.py) / 2 - 14, b.px, b.py);
            } else {
              ctx.lineTo(b.px, b.py);
            }
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < 24; i++) {
        const y = ((i * 97 + t * 0.052 * speed) % (H + 180)) - 90;
        const x = ((i * 181 + t * 0.13 * speed) % (W + 360)) - 180;
        const len = 26 + (i % 6) * 18;
        const g = ctx.createLinearGradient(x - len, y, x + len, y);
        g.addColorStop(0, "rgba(255,57,68,0)");
        g.addColorStop(0.55, `rgba(255,73,83,${0.11 * boostValue})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = i % 5 === 0 ? 1.1 : 0.6;
        ctx.beginPath();
        ctx.moveTo(x - len, y);
        ctx.lineTo(x + len, y);
        ctx.stroke();
      }

      points.forEach((p) => {
        ctx.fillStyle = p.accent ? "rgba(255,72,82,.72)" : "rgba(235,240,245,.28)";
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.accent ? 1.7 : 0.8, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointerMove, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
    };
  }, []);
  return <canvas ref={ref} className="computational-field" aria-hidden="true"/>;
}

function App() {
  const initial = pageFor(window.location.pathname);
  const [page, setPage] = useState(initial === "core" ? "home" : initial);
  const [entered, setEntered] = useState(() => sessionStorage.getItem("aixion-entered-v3") === "1");
  const [hovered, setHovered] = useState(null);
  const [routing, setRouting] = useState(null);
  const [deep, setDeep] = useState(initial === "core");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const pop = () => {
      const next = pageFor(window.location.pathname);
      if (next === "core") {
        setDeep(true);
        setPage("home");
        return;
      }
      setDeep(false);
      setPage(next);
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);

  useEffect(() => {
    const label = deep ? "AIXION CORE" : page === "home" ? "AIXION LAB" : page === "tradebot" ? "TradeBot" : META[page]?.label || page;
    document.title = `${label} — AIXION LAB`;
    if (!deep) window.scrollTo(0, 0);
  }, [page, deep]);

  const navigate = (key, el) => {
    if (key === "core") {
      window.history.pushState({}, "", "/core");
      setDeep(true);
      return;
    }
    if (key === page && !deep) return;
    const rect = el?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const nextLabel = key === "home" ? "HOME" : key === "tradebot" ? "TRADEBOT" : META[key]?.label || key;
    setMenu(false);
    setDeep(false);
    setRouting({ x, y, label: nextLabel, back: key === "home" });
    window.setTimeout(() => {
      window.history.pushState({}, "", pathFor(key));
      setPage(key);
    }, 310);
    window.setTimeout(() => setRouting(null), 820);
  };

  const exitDeep = () => {
    setDeep(false);
    window.history.replaceState({}, "", "/");
    setPage("home");
  };

  return <div className={`app page-${page} ${routing ? "is-routing" : ""} ${deep ? "is-deep" : ""}`}>
    <ComputationalField mode={deep ? "deep" : hovered || page} boost={!!hovered || !!routing || deep}/>
    <CursorSystem/>
    {!entered ? (
      <Entry onEnter={() => {
        sessionStorage.setItem("aixion-entered-v3", "1");
        setEntered(true);
      }}/>
    ) : deep ? (
      <DeepSpace onExit={exitDeep}/>
    ) : (
      <div className="scene">
        <Header page={page} navigate={navigate} menu={menu} setMenu={setMenu}/>
        {page === "home" ? <HomeHub hovered={hovered} setHovered={setHovered} navigate={navigate}/> : page === "tradebot" ? <TradeBotPage navigate={navigate}/> : <WorldPage page={page} navigate={navigate}/>} 
      </div>
    )}
    {routing && <RouteRipple state={routing}/>} 
  </div>;
}

function Entry({ onEnter }) {
  return <main className="entry-screen">
    <button className="entry-core" onClick={onEnter} aria-label="Enter Aixion Lab" data-cursor>
      <i/><i/><i/>
      <span className="entry-emblem-shell"><StandaloneEmblem className="entry-emblem"/></span>
      <b/>
    </button>
  </main>;
}

function Header({ page, navigate, menu, setMenu }) {
  const internal = page !== "home";
  return <header className="global-header">
    <button className="brand-button" onClick={(e) => navigate("home", e.currentTarget)} aria-label="Aixion Lab home" data-cursor>
      <img src={BRAND} alt="AIXION LAB"/>
    </button>
    <nav className="desktop-nav" aria-label="Primary navigation">
      <button className={`home-control ${internal ? "emblem-mode" : "text-mode"}`} onClick={(e) => navigate("home", e.currentTarget)} aria-label="Home" data-cursor>
        <span>Home</span>
        <StandaloneEmblem/>
      </button>
      {["projects", "research", "evidence", "contact"].map((key) => <button key={key} className={page === key ? "active" : ""} onClick={(e) => navigate(key, e.currentTarget)} data-cursor>{META[key].label}</button>)}
    </nav>
    <div className="header-actions">
      <a href={GITHUB} target="_blank" rel="noreferrer" className="github-button" aria-label="GitHub — selected engineering work" title="GitHub — Selected engineering work" data-cursor><Icon type="github" size={21}/></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Open navigation"><span/><span/></button>
    </div>
    {menu && <div className="mobile-menu">{["home", ...NODES.map((n) => n.key)].map((key) => <button key={key} onClick={(e) => navigate(key, e.currentTarget)}>{key === "home" ? "Home" : META[key].label}</button>)}<a href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github" size={18}/>GitHub</a></div>}
  </header>;
}

function HomeHub({ hovered, setHovered, navigate }) {
  const [pulse, setPulse] = useState(false);
  const longPress = useRef(null);
  const enterCore = () => navigate("core");
  const positions = useMemo(() => NODES.map((n) => {
    const rad = n.angle * Math.PI / 180;
    const radius = 39;
    return { ...n, x: 50 + Math.cos(rad) * radius, y: 50 + Math.sin(rad) * radius };
  }), []);
  return <main className={`home-orbit ${hovered ? "focused" : ""}`}>
    <section className="orbit-stage">
      <i className="ambient-ring ring-a"/><i className="ambient-ring ring-b"/><i className="ambient-ring ring-c"/>
      <div className="orbit-system">
        <svg className="connection-map" viewBox="0 0 100 100" aria-hidden="true">
          {positions.map((n) => <React.Fragment key={n.key}>
            <line className={`spoke-line ${hovered === n.key ? "active" : ""}`} x1="50" y1="50" x2={n.x} y2={n.y} pathLength="1"/>
            <circle className={`spoke-end ${hovered === n.key ? "active" : ""}`} cx={n.x} cy={n.y} r="0.45"/>
          </React.Fragment>)}
        </svg>
        {positions.map((n) => <div key={n.key} className="node-position" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <div className="node-counterspin">
            <button className={`hub-node ${hovered === n.key ? "active" : ""}`} onMouseEnter={() => setHovered(n.key)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(n.key)} onBlur={() => setHovered(null)} onClick={(e) => navigate(n.key, e.currentTarget)} aria-label={`Open ${n.label}`} data-cursor>
              <Icon type={n.key} size={23}/><strong>{n.label}</strong><i/>
            </button>
          </div>
        </div>)}
      </div>
      <button className={`core-node ${pulse ? "pulse" : ""}`} onClick={() => { setPulse(true); window.setTimeout(() => setPulse(false), 420); }} onDoubleClick={enterCore} onPointerDown={() => { longPress.current = window.setTimeout(enterCore, 720); }} onPointerUp={() => window.clearTimeout(longPress.current)} onPointerLeave={() => window.clearTimeout(longPress.current)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); enterCore(); } }} aria-label="Aixion Core. Double click, long press, or press Enter to enter Deep Space" data-cursor>
        <i/><i/><i/>
        <span className="core-emblem-shell"><StandaloneEmblem className="core-emblem"/></span>
      </button>
    </section>
    <div className="idle-cue">EXPLORE THE SYSTEM</div>
  </main>;
}

function RouteRipple({ state }) {
  return <div className={`route-ripple ${state.back ? "reverse" : ""}`} style={{ "--x": `${state.x}px`, "--y": `${state.y}px` }} aria-hidden="true">
    <i/><i/><i/>
    <span/>
    <b>{state.label}</b>
  </div>;
}

function SectionRail({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);
  const reduced = useReducedMotion();
  useEffect(() => {
    const nodes = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!nodes.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, { rootMargin: "-28% 0px -56% 0px", threshold: [0, .15, .35, .55] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);
  return <nav className="chapter-rail" aria-label="Page chapters">{sections.map((s) => <button key={s.id} className={active === s.id ? "active" : ""} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })}>{s.label}</button>)}</nav>;
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("visible");
        observer.disconnect();
      }
    }, { threshold: .14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const STORY_META = {
  about: {
    eyebrow: "ABOUT AIXION LAB",
    title: "I build systems where failure is observable, authority is explicit, and claims have to earn their confidence.",
    intro: "Aixion Lab is the public surface of a much larger engineering journey across quality, automation, applied AI, real-time data, market-intelligence research, runtime governance, and evidence-driven systems work.",
  },
  journey: {
    eyebrow: "ENGINEERING JOURNEY",
    title: "From testing software to engineering systems that explain themselves.",
    intro: "The work expanded from quality assurance into automation, runtime reliability, applied AI, research infrastructure, and governed engineering. The standard stayed the same: find what breaks, understand why, and make the next failure harder to hide.",
  },
  projects: {
    eyebrow: "SELECTED ENGINEERING SYSTEMS",
    title: "A body of work built around difficult systems, not polished screenshots.",
    intro: "The projects here are shown through architecture, constraints, failure modes, validation, governance, and operational evidence. TradeBot is the flagship because it forced all of those disciplines to meet in one system.",
  },
  research: {
    eyebrow: "RESEARCH OPERATING SYSTEM",
    title: "The job is not to produce attractive hypotheses. The job is to make weak ones fail quickly and visibly.",
    intro: "Research at Aixion Lab is outcome-blind wherever possible: hypotheses are isolated, replayed, challenged, segmented by context, and retained even when the answer is negative. Unsupported ideas stay visible so they are not quietly recycled as conviction.",
  },
  evidence: {
    eyebrow: "EVIDENCE & GOVERNANCE",
    title: "A system is not finished when it works once. It is finished when we can explain what ran, what changed, and why the result deserves trust.",
    intro: "Exact-version authority, deterministic reruns, fail-closed gates, CI, review, freshness checks, and explicit runtime boundaries turn engineering claims into inspectable evidence instead of confidence theater.",
  },
  tower: {
    eyebrow: "AIXION CONTROL TOWER",
    title: "Observability is part of the product, not an afterthought added when something breaks.",
    intro: "Control Tower is a public-safe operational surface for understanding research state, validation gates, runtime health, evidence progression, and system context without exposing private execution controls or fabricating live status.",
  },
  stack: {
    eyebrow: "ENGINEERING STACK",
    title: "The stack is organized by the problems it had to solve, not by the logos it can display.",
    intro: "Testing, automation, data ingestion, replay, applied AI, observability, runtime supervision, CI, and product engineering are connected here by engineering purpose rather than resume keywords.",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "I am interested in difficult engineering work where reliability, AI, testing, data systems, and judgment all matter.",
    intro: "If the role involves building, validating, observing, or governing systems that cannot afford to be confidently wrong, that is the kind of conversation I want to have.",
  },
};

function WorldPage({ page, navigate }) {
  const meta = STORY_META[page] || STORY_META.about;
  const sections = buildSections(page, navigate);
  return <main className={`world-page world-${page}`}>
    <SectionRail sections={sections}/>
    <section className="world-hero" id={`${page}-intro`}>
      <p className="eyebrow"><span>{meta.eyebrow}</span></p>
      <h1>{meta.title}</h1>
      <article>{meta.intro}</article>
      <div className="hero-trace"><i/><span>{page === "contact" ? "OPEN TO THE RIGHT PROBLEM" : "SCROLL TO FOLLOW THE SYSTEM"}</span></div>
    </section>
    <div className="story-sections">
      {sections.map((section) => <section id={section.id} className="story-section" key={section.id}>
        <aside><span>{section.label}</span><small>{section.kicker}</small></aside>
        <Reveal className="story-body"><h2>{section.title}</h2>{section.body}</Reveal>
      </section>)}
    </div>
  </main>;
}

function buildSections(page, navigate) {
  const S = {
    about: [
      { id: "about-standard", label: "Standard", kicker: "OPERATING MODEL", title: "Build. Challenge. Prove.", body: <><p>Every serious project moves through the same discipline: build a bounded system, challenge its assumptions and runtime behavior, then strengthen the language of the claim only when evidence supports it.</p><div className="three-columns"><article><strong>Build</strong><span>Architecture with explicit state, authority, data provenance, and failure boundaries.</span></article><article><strong>Challenge</strong><span>Replay, adversarial checks, failure injection, edge cases, and operational stress.</span></article><article><strong>Prove</strong><span>Deterministic evidence, reviewable outputs, reproducible versions, and honest unresolved states.</span></article></div></> },
      { id: "about-failure", label: "Failure", kicker: "ENGINEERING PRINCIPLE", title: "Failure is not a footnote. It is one of the primary inputs to the architecture.", body: <><p>Quality engineering taught me to reproduce defects. Systems work taught me to expose the conditions that created them. Applied AI and research work added another requirement: know when the system itself is too uncertain to make a strong claim.</p><blockquote>Reliable systems do not hide uncertainty. They make it inspectable.</blockquote></> },
      { id: "about-domain", label: "Domain", kicker: "WHERE THE WORK CONVERGES", title: "AI, testing, automation, data, markets, observability, and governance are not separate interests here.", body: <><p>They meet in the same engineering question: can a complex system behave usefully under real constraints, and can we prove what it actually did?</p><div className="tag-field">{["AI/ML quality", "QA automation", "real-time data", "market microstructure", "replay", "runtime supervision", "evidence systems", "governed agents"].map((x) => <span key={x}>{x}</span>)}</div></> },
    ],
    journey: [
      { id: "journey-foundation", label: "Foundation", kicker: "QUALITY → AUTOMATION", title: "The first skill was learning to distrust a clean demo.", body: <><p>Manual and automated quality work built the habit of asking what changed, what was not covered, whether a failure could be reproduced, and whether a passing result was actually meaningful.</p><div className="journey-line"><span>Quality engineering</span><i/><span>Automation</span><i/><span>Systems thinking</span></div></> },
      { id: "journey-expansion", label: "Expansion", kicker: "SYSTEMS → APPLIED AI", title: "The scope moved from test cases into feeds, runtimes, models, state, supervision, and failure boundaries.", body: <><p>That shift changed the work from verifying isolated behavior to engineering environments where data freshness, version authority, runtime state, model evaluation, and observability all affect whether a result can be trusted.</p></> },
      { id: "journey-aixion", label: "Aixion", kicker: "RESEARCH → GOVERNED ENGINEERING", title: "Aixion Lab is where those disciplines became one engineering language.", body: <><p>TradeBot, the autonomous research loop, evidence tooling, Control Tower, market-structure research, and the public site are different systems, but they share the same principles: inspectable data, explicit authority, visible failure, and reproducible evidence.</p></> },
    ],
    projects: [
      { id: "projects-tradebot", label: "Flagship", kicker: "TRADEBOT", title: "A market-intelligence platform that became a systems-engineering problem.", body: <><p>TradeBot began around Indian index-options workflows and evolved into a governed research and observation platform spanning real-time feeds, options microstructure, replay, hypothesis evaluation, runtime authority, data freshness, observability, and evidence capture.</p><button className="text-action" onClick={(e) => navigate("tradebot", e.currentTarget)}>Open the engineering case study <Icon type="arrow" size={18}/></button></> },
      { id: "projects-systems", label: "Systems", kicker: "PROGRAMS AROUND THE FLAGSHIP", title: "The surrounding systems became as important as the original application.", body: <div className="system-list"><article><strong>Autonomous Research Loop</strong><p>Turns broad research goals into bounded work, evidence, review, and explicit promotion states without letting automation manufacture confidence.</p></article><article><strong>Evidence Kernel</strong><p>Connects claims to exact versions, focused tests, reruns, manifests, freshness, and independent review.</p></article><article><strong>Aixion Control Tower</strong><p>Surfaces operational state, research lanes, validation progress, and public-safe system context.</p></article></div> },
      { id: "projects-method", label: "Method", kicker: "WHY THESE PROJECTS MATTER", title: "The recurring work is architecture under uncertainty.", body: <><p>Feed outages, stale data, replay integrity, authority conflicts, invalid research assumptions, model overconfidence, and operational state all create ways for a system to look correct while being wrong. The engineering value is in making those failure modes visible and governable.</p></> },
    ],
    research: [
      { id: "research-lanes", label: "Lanes", kicker: "CURRENT RESEARCH FAMILIES", title: "Research is separated into questions that can fail independently.", body: <div className="research-lanes"><article><strong>Opening-session structure</strong><span>Context, constituents, futures, early-session behavior, and recurrence.</span></article><article><strong>Closing Auction Session</strong><span>Auction imbalance, breadth, futures convergence, and option response around the close.</span></article><article><strong>Options microstructure</strong><span>Bid/ask, liquidity, strikes, IV, Greeks, and short-horizon behavior.</span></article><article><strong>Regime & context</strong><span>When behavior changes because the surrounding market state changed.</span></article></div> },
      { id: "research-method", label: "Method", kicker: "OUTCOME-BLIND DISCIPLINE", title: "A plausible story is not evidence.", body: <><p>Research lanes are designed around causal cutoffs, replay, holdout logic, adversarial checks, segmentation, and negative controls. When an idea fails, the failure remains part of the research record instead of disappearing from the narrative.</p><blockquote>Negative evidence is still engineering progress when it prevents a weak idea from being promoted later.</blockquote></> },
      { id: "research-agents", label: "Agents", kicker: "AUTONOMOUS DISCOVERY", title: "Automation can expand search. It cannot be allowed to lower the standard of proof.", body: <><p>Agent-assisted research is useful when task boundaries, version authority, evidence requirements, and review states are explicit. The goal is not autonomous confidence. The goal is autonomous exploration inside governed limits.</p></> },
    ],
    evidence: [
      { id: "evidence-version", label: "Authority", kicker: "EXACT VERSION TRUTH", title: "Every important result needs an exact answer to: what code actually ran?", body: <><p>Exact commit authority, clean checkouts, frozen candidates, immutable evidence, and explicit runtime ownership prevent a passing result from being silently separated from the software that produced it.</p></> },
      { id: "evidence-replay", label: "Replay", kicker: "REPRODUCIBILITY", title: "A result that cannot survive a deterministic rerun is not a strong result.", body: <><p>Replay, deterministic outputs, freshness checks, fixtures, manifests, and focused regression testing are used to distinguish a real behavior change from an artifact of data, runtime, or environment.</p></> },
      { id: "evidence-gates", label: "Gates", kicker: "FAIL CLOSED", title: "Unknown is allowed to remain unknown.", body: <><p>Promotion gates, CI, independent review, read-only/live separation, stale-data rejection, and explicit safety flags are designed to stop unsupported states from turning into optimistic labels.</p><div className="evidence-path"><span>Implementation</span><i/><span>Adversarial</span><i/><span>Integration</span><i/><span>Evidence</span><i/><span>Review</span></div></> },
    ],
    tower: [
      { id: "tower-purpose", label: "Purpose", kicker: "PUBLIC-SAFE OBSERVABILITY", title: "Understand the system without exposing the system.", body: <><p>Control Tower is meant to show the shape of operational engineering: project state, research lanes, evidence gates, build status, observation mode, and public-safe health indicators without publishing credentials, private controls, or proprietary strategy logic.</p></> },
      { id: "tower-truth", label: "Truth", kicker: "NO FAKE LIVE STATUS", title: "Operational visuals are useful only when their truth boundary is visible.", body: <><p>Any non-live state must be labeled as demonstration, sanitized, delayed, offline replay, research, or public status. The interface should never imply production authority it does not actually have.</p><div className="tag-field">{["DEMONSTRATION DATA", "SANITIZED", "OFFLINE REPLAY", "RESEARCH", "PUBLIC STATUS"].map((x) => <span key={x}>{x}</span>)}</div></> },
      { id: "tower-next", label: "Next", kicker: "CONTROL SURFACE", title: "The long-term idea is a governed view across systems, not another dashboard full of decorative metrics.", body: <><p>The useful version of Control Tower connects project authority, system health, research evidence, runtime events, and human approval points into one explainable surface.</p></> },
    ],
    stack: [
      { id: "stack-quality", label: "Quality", kicker: "QUALITY & AUTOMATION", title: "Testing is where the engineering discipline started.", body: <div className="stack-groups"><article><strong>Quality & automation</strong><p>Java · Selenium · Appium · Jira/Xray · regression · integration · scenario design</p></article><article><strong>Research & applied AI</strong><p>Python · XGBoost · time-series analysis · replay · model evaluation · experimentation</p></article></div> },
      { id: "stack-runtime", label: "Runtime", kicker: "DATA & SYSTEMS", title: "Real-time systems require a different definition of correctness.", body: <div className="stack-groups"><article><strong>Data & runtime</strong><p>WebSockets · real-time feeds · Parquet · event processing · freshness · supervision · observability</p></article><article><strong>Engineering workflow</strong><p>Git · GitHub · CI · pytest · exact-version authority · evidence manifests · agent-assisted engineering</p></article></div> },
      { id: "stack-product", label: "Product", kicker: "WEB & EXPERIENCE", title: "The public product is being engineered with the same concern for state, motion, accessibility, and performance.", body: <><p>React, Vite, Canvas, SVG, animation systems, responsive interaction, reduced-motion fallbacks, and public/private information boundaries are used to make Aixion Lab itself part of the engineering portfolio.</p></> },
    ],
    contact: [
      { id: "contact-work", label: "Work", kicker: "WHERE I FIT BEST", title: "Roles where quality engineering, AI systems, automation, data, and reliability overlap.", body: <><p>I am especially interested in AI/ML testing, quality engineering, SDET/automation, applied AI systems, research tooling, observability, platform reliability, and engineering roles where difficult systems need strong validation.</p></> },
      { id: "contact-proof", label: "Proof", kicker: "START WITH THE WORK", title: "The fastest way to understand the engineering is to follow the projects and evidence.", body: <><a className="contact-link" href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github" size={19}/> Selected engineering work on GitHub</a><p>Private implementation details stay private. Public case studies focus on architecture, constraints, failure modes, validation, and what the work taught me.</p></> },
      { id: "contact-talk", label: "Talk", kicker: "CONTACT", title: "If the problem is difficult enough to require engineering judgment, I am interested in the conversation.", body: <form className="contact-form" onSubmit={(e) => e.preventDefault()}><label>Name<input placeholder="Your name"/></label><label>Email<input type="email" placeholder="you@company.com"/></label><label>What are you building?<textarea rows="4" placeholder="A role, a system, a research problem, or a collaboration..."/></label><button type="submit">Contact flow — connect email before launch</button></form> },
    ],
  };
  return S[page] || S.about;
}

function TradeBotPage({ navigate }) {
  const sections = [
    { id: "tradebot-problem", label: "Problem" },
    { id: "tradebot-system", label: "System" },
    { id: "tradebot-failure", label: "Failure" },
    { id: "tradebot-evidence", label: "Evidence" },
  ];
  return <main className="tradebot-page">
    <SectionRail sections={sections}/>
    <section className="tradebot-hero" id="tradebot-problem">
      <button className="return-projects" onClick={(e) => navigate("projects", e.currentTarget)}>← Projects</button>
      <p className="eyebrow"><span>FLAGSHIP SYSTEM · TRADEBOT</span></p>
      <h1>Engineering market intelligence under real operational constraints.</h1>
      <article>TradeBot is a governed market-intelligence and research platform for Indian index-options workflows. The interesting engineering is not the promise of a signal. It is the infrastructure required to know whether data, runtime state, replay, research logic, and evidence are trustworthy enough to support one.</article>
    </section>
    <section className="tradebot-section" id="tradebot-system"><aside><span>System</span><small>FOUR ENGINEERING PLANES</small></aside><Reveal className="story-body"><h2>Data, research, governance, and observability had to become first-class systems.</h2><div className="tradebot-planes"><article><strong>Data plane</strong><p>Real-time feeds, quote/depth ingestion, aligned snapshots, replay sources, persistence, freshness, and provenance.</p></article><article><strong>Research plane</strong><p>Hypothesis evaluation, options microstructure, causal cutoffs, replay analysis, regime/context work, and negative results.</p></article><article><strong>Governance plane</strong><p>Exact-version authority, read-only observation modes, fail-closed promotion gates, immutable evidence, and explicit execution boundaries.</p></article><article><strong>Observability plane</strong><p>Feed health, reconnect behavior, stale-data detection, runtime events, process supervision, candidate traces, and session evidence.</p></article></div></Reveal></section>
    <section className="tradebot-section" id="tradebot-failure"><aside><span>Failure</span><small>WHAT MADE THE PROJECT HARD</small></aside><Reveal className="story-body"><h2>The difficult part was distinguishing strategy failure from system failure.</h2><p>Real engineering work appeared in the gaps: feed stalls, stale quotes, runtime authority conflicts, replay artifacts, inconsistent evidence, environment differences, dirty worktrees, process duplication, and research assumptions that looked convincing until they were challenged.</p><div className="failure-chain"><span>Symptom</span><i/><span>Root cause</span><i/><span>Guardrail</span><i/><span>Evidence</span></div><blockquote>The system became more valuable when it learned to say “not proven” for the right reasons.</blockquote></Reveal></section>
    <section className="tradebot-section" id="tradebot-evidence"><aside><span>Evidence</span><small>PUBLIC / PRIVATE BOUNDARY</small></aside><Reveal className="story-body"><h2>Show the engineering depth without publishing the implementation that creates the edge.</h2><p>Public material can safely show architecture, methodology, failure modes, research questions, sanitized operational evidence, governance patterns, and engineering lessons.</p><div className="privacy-grid"><article><strong>Public</strong><span>Architecture · validation · observability · failure analysis · research method · lessons</span></article><article><strong>Private</strong><span>Credentials · private endpoints · proprietary signal logic · strategy thresholds · write controls · sensitive datasets · private code</span></article></div></Reveal></section>
  </main>;
}

function DeepSpace({ onExit }) {
  const canvasRef = useRef(null);
  const [tick, setTick] = useState(0);
  const [armed, setArmed] = useState(false);
  const words = ["END", "IS", "THE", "NEW", "BEGINNING"];
  const word = words[tick % words.length];
  const hold = word === "BEGINNING";

  useEffect(() => {
    const id = window.setTimeout(() => setTick((v) => v + 1), hold ? 2200 : 1350);
    return () => window.clearTimeout(id);
  }, [tick, hold]);

  useEffect(() => {
    const arm = window.setTimeout(() => setArmed(true), 850);
    return () => window.clearTimeout(arm);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let W = 0;
    let H = 0;
    let DPR = 1;
    const stars = Array.from({ length: 210 }, () => ({
      x: (Math.random() - .5) * 1900,
      y: (Math.random() - .5) * 1300,
      z: Math.random() * 1700 + 60,
      pz: 0,
      red: Math.random() < .18,
    }));
    const reset = (s, far = true) => {
      s.x = (Math.random() - .5) * 1900;
      s.y = (Math.random() - .5) * 1300;
      s.z = far ? 1700 : Math.random() * 1700 + 60;
      s.pz = s.z;
    };
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    const draw = (t) => {
      ctx.fillStyle = "rgba(1,2,4,.30)";
      ctx.fillRect(0, 0, W, H);
      const fov = Math.min(W, H) * 0.95;
      const cx = W / 2;
      const cy = H / 2;
      const speed = 17 + Math.sin(t * .0015) * 3;
      stars.forEach((s) => {
        s.pz = s.z;
        s.z -= speed;
        if (s.z < 16) reset(s, true);
        const x = cx + (s.x / s.z) * fov;
        const y = cy + (s.y / s.z) * fov;
        const px = cx + (s.x / s.pz) * fov;
        const py = cy + (s.y / s.pz) * fov;
        if (x < -180 || x > W + 180 || y < -180 || y > H + 180) { reset(s, true); return; }
        const alpha = Math.max(.08, 1 - s.z / 1750);
        ctx.strokeStyle = s.red ? `rgba(255,58,69,${Math.min(.85, alpha + .18)})` : `rgba(235,242,255,${Math.min(.7, alpha)})`;
        ctx.lineWidth = s.red ? 1.35 : .75;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
      for (let i = 0; i < 7; i++) {
        const a = t * .00022 + i * .9;
        const r = 150 + i * 72 + Math.sin(t * .0007 + i) * 30;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a * 1.13) * r * .55;
        ctx.strokeStyle = `rgba(255,57,68,${.025 + i * .004})`;
        ctx.beginPath();
        ctx.arc(x, y, 24 + i * 7, 0, Math.PI * 2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    ctx.fillStyle = "#010204";
    ctx.fillRect(0, 0, W, H);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const key = (e) => { if (e.key === "Escape" && armed) onExit(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [armed, onExit]);

  return <main className="deep-space" onClick={() => armed && onExit()} role="button" tabIndex="0" aria-label="Aixion Deep Space. Click or press Escape to return Home">
    <canvas ref={canvasRef}/>
    <div className="deep-vignette"/>
    <StandaloneEmblem className="deep-emblem"/>
    <div className="deep-word-stage" aria-live="off"><span key={tick} className={`deep-word ${hold ? "hold" : ""}`}>{word}</span></div>
    <small>CLICK ANYWHERE OR PRESS ESC TO RETURN</small>
  </main>;
}

createRoot(document.getElementById("root")).render(<App/>);
