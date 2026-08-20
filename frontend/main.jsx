import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const GITHUB = "https://github.com/ramgolladi1503-sys";
const BRAND = "/brand/aixion-header-lockup.svg";
const EMBLEM = "/brand/aixion-emblem.svg";
const CONTACT_EMAIL = "contact@aixionlab.com";

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

const META = Object.fromEntries(NODES.map((node) => [node.key, node]));

const pathFor = (key) => {
  if (key === "home") return "/";
  if (key === "core") return "/core";
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
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function Emblem({ className = "", alt = "" }) {
  return <img className={`aixion-emblem ${className}`} src={EMBLEM} alt={alt}/>;
}

function PointerVariables() {
  useEffect(() => {
    const root = document.documentElement;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    const move = (event) => {
      targetX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      targetY = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };
    const tick = () => {
      currentX += (targetX - currentX) * 0.065;
      currentY += (targetY - currentY) * 0.065;
      root.style.setProperty("--mx", currentX.toFixed(4));
      root.style.setProperty("--my", currentY.toFixed(4));
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

function CursorSystem() {
  const dot = useRef(null);
  const halo = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (event) => {
      gsap.to(dot.current, { x: event.clientX, y: event.clientY, duration: 0.08, overwrite: true });
      gsap.to(halo.current, { x: event.clientX, y: event.clientY, duration: 0.28, ease: "power3.out", overwrite: true });
    };
    const over = (event) => halo.current?.classList.toggle("hot", Boolean(event.target.closest("button,a,[data-cursor]")));
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
  const canvasRef = useRef(null);
  const modeRef = useRef(mode);
  const boostRef = useRef(boost);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { boostRef.current = boost; }, [boost]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0 };
    const points = Array.from({ length: 168 }, (_, index) => ({
      x: ((index * 61 + 17) % 173) / 173,
      y: ((index * 89 + 29) % 179) / 179,
      vx: (((index * 7) % 13) - 6) * 0.000029,
      vy: (((index * 5) % 11) - 5) * 0.000025,
      phase: index * 0.57,
      accent: index % 10 === 0,
    }));
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (event) => {
      pointer.x = event.clientX / Math.max(width, 1) - 0.5;
      pointer.y = event.clientY / Math.max(height, 1) - 0.5;
    };
    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      const energy = boostRef.current ? 2.7 : 1;
      const modeScale = modeRef.current === "research" ? 1.25 : modeRef.current === "projects" ? 1.15 : modeRef.current === "deep" ? 1.6 : 1;
      const speed = energy * modeScale;
      const motionTime = reduced ? 0 : time;
      const glow = context.createRadialGradient(width * (0.5 + pointer.x * 0.07), height * (0.48 + pointer.y * 0.07), 0, width / 2, height / 2, Math.max(width, height) * 0.72);
      glow.addColorStop(0, `rgba(255,49,62,${0.055 * energy})`);
      glow.addColorStop(0.38, "rgba(18,24,34,.12)");
      glow.addColorStop(1, "rgba(2,3,5,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      points.forEach((point) => {
        if (!reduced) {
          point.x += point.vx * speed;
          point.y += point.vy * speed;
          if (point.x < -0.05) point.x = 1.05;
          if (point.x > 1.05) point.x = -0.05;
          if (point.y < -0.05) point.y = 1.05;
          if (point.y > 1.05) point.y = -0.05;
        }
        point.px = point.x * width + Math.sin(motionTime * 0.0015 * speed + point.phase) * 13 + pointer.x * 34;
        point.py = point.y * height + Math.cos(motionTime * 0.0012 * speed + point.phase) * 10 + pointer.y * 25;
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < Math.min(points.length, i + 9); j += 1) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot(a.px - b.px, a.py - b.py);
          if (distance < 142) {
            const alpha = (1 - distance / 142) * 0.14 * energy;
            context.strokeStyle = modeRef.current === "evidence" ? `rgba(236,241,247,${alpha * 0.64})` : `rgba(255,56,70,${alpha})`;
            context.lineWidth = 0.62;
            context.beginPath();
            context.moveTo(a.px, a.py);
            if (modeRef.current === "research") context.quadraticCurveTo((a.px + b.px) / 2 + 24, (a.py + b.py) / 2 - 18, b.px, b.py);
            else context.lineTo(b.px, b.py);
            context.stroke();
          }
        }
      }

      for (let index = 0; index < 34; index += 1) {
        const y = ((index * 91 + motionTime * 0.11 * speed) % (height + 220)) - 110;
        const x = ((index * 173 + motionTime * 0.24 * speed) % (width + 520)) - 260;
        const length = 42 + (index % 8) * 22;
        const gradient = context.createLinearGradient(x - length, y, x + length, y);
        gradient.addColorStop(0, "rgba(255,50,64,0)");
        gradient.addColorStop(0.55, `rgba(255,75,88,${0.13 * energy})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        context.strokeStyle = gradient;
        context.lineWidth = index % 6 === 0 ? 1.3 : 0.58;
        context.beginPath();
        context.moveTo(x - length, y);
        context.lineTo(x + length, y);
        context.stroke();
      }

      points.forEach((point) => {
        context.fillStyle = point.accent ? "rgba(255,70,82,.8)" : "rgba(235,240,246,.3)";
        context.beginPath();
        context.arc(point.px, point.py, point.accent ? 1.8 : 0.82, 0, Math.PI * 2);
        context.fill();
      });
      if (!reduced) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("pointermove", move, { passive: true });
    if (reduced) draw(0);
    else frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return <canvas ref={canvasRef} className="computational-field" aria-hidden="true"/>;
}

function App() {
  const initial = pageFor(window.location.pathname);
  const [page, setPage] = useState(initial === "core" ? "home" : initial);
  const [entered, setEntered] = useState(() => sessionStorage.getItem("aixion-entered-v4") === "1");
  const [hovered, setHovered] = useState(null);
  const [routing, setRouting] = useState(null);
  const routingRef = useRef(null);
  const routeSequence = useRef(0);
  const [deep, setDeep] = useState(initial === "core");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!window.history.state?.aixion) {
      window.history.replaceState({ ...(window.history.state || {}), aixion: true, key: initial }, "", window.location.href);
    }
  }, [initial]);

  useEffect(() => {
    const pop = () => {
      const next = pageFor(window.location.pathname);
      routingRef.current = null;
      setRouting(null);
      if (next === "core") {
        setPage("home");
        setDeep(true);
      } else {
        setPage(next);
        setDeep(false);
      }
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);

  useEffect(() => {
    const label = deep ? "AIXION CORE" : page === "home" ? "AIXION LAB" : page === "tradebot" ? "TradeBot" : META[page]?.label || page;
    document.title = `${label} — AIXION LAB`;
    if (!deep && !routing) window.scrollTo({ top: 0, behavior: "auto" });
  }, [page, deep, routing]);

  const navigate = (key, element) => {
    if (key === "core") {
      routingRef.current = null;
      setRouting(null);
      if (window.location.pathname !== "/core") window.history.pushState({ aixion: true, key: "core" }, "", "/core");
      setDeep(true);
      return;
    }
    if (routingRef.current?.key === key) return;
    if (key === page && !deep && !routingRef.current) return;
    const rect = element?.getBoundingClientRect?.();
    const route = {
      id: ++routeSequence.current,
      key,
      x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
      y: rect ? rect.top + rect.height / 2 : window.innerHeight / 2,
      label: key === "home" ? "HOME" : key === "tradebot" ? "TRADEBOT" : META[key]?.label || key,
    };
    setMenu(false);
    setDeep(false);
    routingRef.current = route;
    setRouting(route);
  };

  const commitRoute = useCallback((route) => {
    if (!route || routingRef.current?.id !== route.id) return;
    const nextPath = pathFor(route.key);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ aixion: true, key: route.key }, "", nextPath);
    }
    setPage(route.key);
  }, []);

  const completeRoute = useCallback((route) => {
    if (!route || routingRef.current?.id !== route.id) return;
    routingRef.current = null;
    setRouting((current) => current?.id === route.id ? null : current);
  }, []);

  const exitDeep = () => {
    routingRef.current = null;
    setRouting(null);
    setDeep(false);
    window.history.replaceState({ aixion: true, key: "home" }, "", "/");
    setPage("home");
  };

  return <div className={`app page-${page} ${routing ? "is-routing" : ""} ${deep ? "is-deep" : ""}`}>
    <ComputationalField mode={deep ? "deep" : hovered || page} boost={Boolean(hovered || routing || deep)}/>
    <PointerVariables/>
    <CursorSystem/>
    {!entered ? (
      <Entry onEnter={() => {
        sessionStorage.setItem("aixion-entered-v4", "1");
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
    {routing && <RoutePortal state={routing} onCommit={commitRoute} onComplete={completeRoute}/>} 
  </div>;
}

function Entry({ onEnter }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.fromTo(".entry-emblem", { scale: 0.84, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" });
      gsap.fromTo(".entry-ring", { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, stagger: 0.14, ease: "expo.out" });
    }, root);
    return () => context.revert();
  }, [reduced]);
  return <main ref={root} className="entry-screen">
    <button className="entry-core" onClick={onEnter} aria-label="Enter Aixion Lab" data-cursor>
      <i className="entry-ring ring-one"/><i className="entry-ring ring-two"/><i className="entry-ring ring-three"/>
      <span className="entry-emblem-shell"><Emblem className="entry-emblem"/></span>
      <small>ENTER</small>
    </button>
    <div className="entry-context" aria-hidden="true">
      <strong>ENGINEERING · AI · RESEARCH</strong>
      <span>Systems built to be challenged, observed and proven.</span>
    </div>
  </main>;
}

function Header({ page, navigate, menu, setMenu }) {
  const internal = page !== "home";
  return <header className="global-header">
    <button className="brand-button" onClick={(event) => navigate("home", event.currentTarget)} aria-label="Aixion Lab home" data-cursor>
      <img src={BRAND} alt="AIXION LAB"/>
    </button>
    <nav className="desktop-nav" aria-label="Primary navigation">
      <button className={`home-control ${internal ? "emblem-mode" : "text-mode"}`} onClick={(event) => navigate("home", event.currentTarget)} aria-label="Home" data-cursor>
        <span>Home</span><Emblem/>
      </button>
      {["projects", "research", "evidence", "contact"].map((key) => <button key={key} className={page === key ? "active" : ""} onClick={(event) => navigate(key, event.currentTarget)} data-cursor>{META[key].label}</button>)}
    </nav>
    <div className="header-actions">
      <a href={GITHUB} target="_blank" rel="noreferrer" className="github-button" aria-label="GitHub — selected engineering work" data-cursor><Icon type="github" size={20}/></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Open navigation"><span/><span/></button>
    </div>
    {menu && <div className="mobile-menu">{["home", ...NODES.map((node) => node.key)].map((key) => <button key={key} onClick={(event) => navigate(key, event.currentTarget)}>{key === "home" ? "Home" : META[key].label}</button>)}<a href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github" size={18}/>GitHub</a></div>}
  </header>;
}

function HomeHub({ hovered, setHovered, navigate }) {
  const longPress = useRef(null);
  const reduced = useReducedMotion();
  const positions = useMemo(() => NODES.map((node) => {
    const radius = 360;
    const radians = node.angle * Math.PI / 180;
    return { ...node, x: 500 + Math.cos(radians) * radius, y: 500 + Math.sin(radians) * radius };
  }), []);

  return <main className={`home-orbit ${hovered ? "focused" : ""}`}>
    <section className="orbit-stage" aria-label="Aixion Lab system map">
      <div className="orbit-depth depth-one"/><div className="orbit-depth depth-two"/>
      <i className="ambient-ring ring-a"/><i className="ambient-ring ring-b"/><i className="ambient-ring ring-c"/>
      <div className={`orbit-rotor ${reduced ? "reduced" : ""}`}>
        <svg className="connection-map" viewBox="0 0 1000 1000" aria-hidden="true">
          {positions.map((node) => <React.Fragment key={node.key}>
            <line className={`spoke-line ${hovered === node.key ? "active" : ""}`} x1="500" y1="500" x2={node.x} y2={node.y}/>
            <circle className={`spoke-end ${hovered === node.key ? "active" : ""}`} cx={node.x} cy={node.y} r="4"/>
          </React.Fragment>)}
        </svg>
        {positions.map((node) => <div key={node.key} className="node-position" style={{ left: `${node.x / 10}%`, top: `${node.y / 10}%` }}>
          <div className={`node-counterspin ${reduced ? "reduced" : ""}`}>
            <button className={`hub-node ${hovered === node.key ? "active" : ""}`} onMouseEnter={() => setHovered(node.key)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(node.key)} onBlur={() => setHovered(null)} onPointerUp={(event) => navigate(node.key, event.currentTarget)} onClick={(event) => navigate(node.key, event.currentTarget)} aria-label={`Open ${node.label}`} data-cursor>
              <Icon type={node.key} size={23}/><strong>{node.label}</strong><i className="node-signal"/>
            </button>
          </div>
        </div>)}
      </div>
      <button className="core-node" onDoubleClick={() => navigate("core")} onPointerDown={() => { longPress.current = window.setTimeout(() => navigate("core"), 650); }} onPointerUp={() => window.clearTimeout(longPress.current)} onPointerLeave={() => window.clearTimeout(longPress.current)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); navigate("core"); } }} aria-label="Aixion Core. Double click, long press, or press Enter to enter Deep Space" data-cursor>
        <i/><i/><i/>
        <span className="core-emblem-shell"><Emblem className="core-emblem"/></span>
      </button>
    </section>
    <div className="idle-cue">EXPLORE THE SYSTEM · DOUBLE CLICK CORE</div>
  </main>;
}

function RoutePortal({ state, onCommit, onComplete }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const node = root.current;
    const wave = node.querySelector(".portal-wave");
    const veil = node.querySelector(".portal-veil");
    const label = node.querySelector(".portal-label");
    let committed = false;
    let completed = false;

    const commit = () => {
      if (committed) return;
      committed = true;
      onCommit(state);
    };
    const complete = () => {
      if (completed) return;
      completed = true;
      onComplete(state);
    };

    const commitTimer = window.setTimeout(commit, reduced ? 90 : 430);
    const completeTimer = window.setTimeout(complete, reduced ? 280 : 980);
    let timeline;

    if (reduced) {
      timeline = gsap.timeline({ onComplete: complete });
      timeline.to(veil, { opacity: 1, duration: 0.08 }).call(commit).to(veil, { opacity: 0, duration: 0.12 });
    } else {
      const diameter = Math.hypot(window.innerWidth, window.innerHeight) * 2.35;
      gsap.set(wave, { width: diameter, height: diameter, xPercent: -50, yPercent: -50, scale: 0.015, opacity: 1 });
      gsap.set(veil, { opacity: 0 });
      gsap.set(label, { opacity: 0, y: 8, letterSpacing: ".45em" });
      timeline = gsap.timeline({ onComplete: complete });
      timeline
        .to(wave, { scale: 0.18, duration: 0.18, ease: "power2.out" }, 0)
        .to(wave, { scale: 1.12, duration: 0.48, ease: "expo.in" }, 0.16)
        .to(veil, { opacity: 1, duration: 0.22, ease: "power2.in" }, 0.25)
        .to(label, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.24)
        .call(commit, [], 0.43)
        .to(label, { opacity: 0, y: -8, duration: 0.17 }, 0.48)
        .to(veil, { opacity: 0, duration: 0.33, ease: "power2.out" }, 0.54)
        .to(wave, { scale: 1.42, opacity: 0, duration: 0.32, ease: "power2.out" }, 0.52);
    }

    return () => {
      window.clearTimeout(commitTimer);
      window.clearTimeout(completeTimer);
      timeline?.kill();
    };
  }, [state, onCommit, onComplete, reduced]);
  return <div ref={root} className="route-portal" style={{ "--portal-x": `${state.x}px`, "--portal-y": `${state.y}px` }} aria-hidden="true">
    <div className="portal-wave"/><div className="portal-ring ring-1"/><div className="portal-ring ring-2"/><div className="portal-veil"/><b className="portal-label">{state.label}</b>
  </div>;
}

const STORIES = {
  about: {
    eyebrow: "ABOUT AIXION LAB",
    title: "Build ambitious systems. Make their behavior explainable.",
    intro: "Aixion Lab is my engineering workspace for quality, automation, applied AI, real-time data, market intelligence, research infrastructure, and the evidence needed to know when a system deserves confidence.",
    artifact: ["BUILD", "CHALLENGE", "PROVE"],
    sections: [
      ["Operating model", "BUILD → CHALLENGE → PROVE", "A working demo is the beginning of the engineering problem, not the end.", "I design around explicit state, data provenance, runtime authority, failure boundaries, and observability. Then I deliberately challenge the system through replay, adversarial cases, operational stress, and failure analysis. Only after that do I strengthen the claim."],
      ["Failure", "DESIGN INPUT", "Failure is not treated as an exception path hidden behind the happy path.", "Quality engineering taught me to reproduce defects. Systems engineering turned that habit into architecture: stale data has to be visible, runtime ownership has to be explicit, uncertain model output has to stay uncertain, and recovery behavior has to be testable."],
      ["Convergence", "WHERE THE WORK MEETS", "AI, testing, automation, data systems, observability and research are one connected discipline here.", "The recurring question is whether a complex system can behave usefully under real constraints and whether its behavior can be reconstructed afterward. That is why test design, runtime supervision, evidence capture and model evaluation live in the same engineering language."],
    ],
  },
  journey: {
    eyebrow: "ENGINEERING JOURNEY",
    title: "The work expanded. The standard became stricter.",
    intro: "The journey moved from software quality into automation, runtime reliability, applied AI, real-time systems and governed research. Each step widened the surface area of what correctness had to mean.",
    artifact: ["QUALITY", "SYSTEMS", "AIXION"],
    sections: [
      ["Foundation", "QUALITY → AUTOMATION", "The first discipline was learning to distrust a clean demo.", "Manual and automated quality work built the habit of asking what changed, what was not covered, whether a failure could be reproduced, and whether a passing result was actually meaningful. Automation made those questions repeatable at scale."],
      ["Expansion", "SYSTEMS → APPLIED AI", "Correctness stopped being local to one feature.", "Once feeds, models, event streams, replay data, environments and runtime state entered the picture, correctness became a systems property. A test could pass while the data was stale. A model could look good while the evaluation was invalid. A process could be alive while authority was wrong."],
      ["Aixion", "GOVERNED ENGINEERING", "Aixion Lab is where those disciplines became one operating model.", "TradeBot, autonomous research workflows, evidence tooling, Control Tower and this public site are different products, but the engineering principles are shared: observable behavior, exact authority, explicit uncertainty and evidence that survives reruns."],
    ],
  },
  projects: {
    eyebrow: "SELECTED ENGINEERING SYSTEMS",
    title: "Systems, not screenshots.",
    intro: "The work is presented through architecture, constraints, failure modes, validation strategy, runtime behavior and evidence—not through a superficial feature checklist.",
    artifact: ["TRADEBOT", "EVIDENCE", "CONTROL"],
    sections: [
      ["Flagship", "TRADEBOT", "A market-intelligence platform that became a systems-engineering problem.", "TradeBot spans real-time market data, options microstructure, replay, research, runtime authority, data freshness, process supervision and evidence capture. The engineering challenge became proving what the system actually saw and why a result should be trusted."],
      ["Research loop", "AUTONOMOUS WORK", "Automation expands the search space without being allowed to manufacture confidence.", "The research loop turns broad questions into bounded tasks with exact-version authority, explicit evidence requirements, review states and fail-closed outcomes. The objective is autonomous exploration inside governed limits—not autonomous promotion."],
      ["Evidence systems", "PROOF INFRASTRUCTURE", "The surrounding evidence and control systems became as important as the application itself.", "Evidence manifests, deterministic reruns, validation gates, Control Tower views, live-observation boundaries and public-safe operational surfaces make complex work inspectable without exposing private implementation details."],
    ],
  },
  research: {
    eyebrow: "RESEARCH OPERATING SYSTEM",
    title: "Attractive hypotheses are cheap. Surviving validation is expensive.",
    intro: "Research is structured so a plausible story can fail visibly. Causal cutoffs, replay, segmentation, negative controls, holdouts and retained negative results keep narrative confidence separate from evidence.",
    artifact: ["HYPOTHESIS", "REPLAY", "VERDICT"],
    sections: [
      ["Market structure", "OPEN / CLOSE / MICROSTRUCTURE", "Different market questions are isolated into research lanes that can fail independently.", "Opening-session structure, Closing Auction Session behavior, options bid/ask dynamics, futures convergence, constituents, liquidity, IV, Greeks and regime context are studied as separate mechanisms rather than blended into one story."],
      ["Method", "OUTCOME-BLIND DISCIPLINE", "A plausible explanation is not accepted as evidence.", "Research lanes use causal time boundaries, replay, holdout logic, adversarial checks and explicit unsupported states. Negative results stay visible because they prevent weak ideas from being quietly recycled later."],
      ["Agents", "AUTONOMOUS DISCOVERY", "Agents are useful when the boundaries around them are stronger than the temptation to overclaim.", "Task authority, evidence requirements, candidate versions and review states are explicit. Automation can search, compare and challenge. It cannot turn missing evidence into a PASS."],
    ],
  },
  evidence: {
    eyebrow: "EVIDENCE & GOVERNANCE",
    title: "Evidence before confidence.",
    intro: "A system is not finished when it works once. It is finished when we can explain what ran, what data it used, what changed, which assumptions were challenged and why the result deserves trust.",
    artifact: ["AUTHORITY", "RERUN", "REVIEW"],
    sections: [
      ["Authority", "EXACT VERSION TRUTH", "Every important result needs an exact answer to: what code actually ran?", "Clean checkouts, frozen candidates, exact commit authority and explicit runtime ownership prevent a passing result from becoming detached from the software and environment that produced it."],
      ["Reproducibility", "DETERMINISTIC EVIDENCE", "A result that cannot survive a controlled rerun is not strong evidence.", "Replay, fixtures, manifests, freshness checks, focused regression tests and deterministic outputs help distinguish real behavior change from data artifacts, environment differences or timing accidents."],
      ["Gates", "FAIL CLOSED", "Unknown is allowed to remain unknown.", "CI, independent review, promotion gates, read-only/live separation and stale-data rejection are designed to stop unsupported states from being relabeled optimistically. A blocked gate is information, not an inconvenience to bypass."],
    ],
  },
  tower: {
    eyebrow: "AIXION CONTROL TOWER",
    title: "See the system without exposing the system.",
    intro: "Control Tower is the public-safe observability concept across research, validation, runtime health and project authority. It demonstrates operational thinking without fabricating live status or publishing sensitive controls.",
    artifact: ["STATE", "HEALTH", "AUTHORITY"],
    sections: [
      ["Purpose", "PUBLIC-SAFE OBSERVABILITY", "Operational visibility should answer what is running, what is trusted and what is blocked.", "The useful view connects project state, research lanes, evidence gates, build status, observation mode and sanitized health indicators without publishing credentials, private endpoints or execution controls."],
      ["Truth boundary", "NO FAKE LIVE STATUS", "A polished dashboard is harmful if the truth boundary is ambiguous.", "Demonstration, sanitized, delayed, offline replay, research and public status states must be labeled explicitly. The interface should never imply production authority it does not actually have."],
      ["Direction", "CONTROL SURFACE", "The destination is governed situational awareness, not another wall of decorative metrics.", "The long-term Control Tower idea is to connect runtime events, evidence state, human approval points and project authority into one explainable operating surface."],
    ],
  },
  stack: {
    eyebrow: "ENGINEERING STACK",
    title: "Tools are useful only in the context of the problems they solve.",
    intro: "The stack is grouped around quality, research, runtime systems, observability and product engineering rather than presented as a wall of logos.",
    artifact: ["QUALITY", "RUNTIME", "PRODUCT"],
    sections: [
      ["Quality", "TESTING & AUTOMATION", "The engineering discipline started with verification and reproducibility.", "Java, Selenium, Appium, Jira/Xray, regression design, integration testing and scenario-based quality work established the foundation for reasoning about failure and evidence."],
      ["Research & runtime", "PYTHON / DATA / REAL-TIME", "Real-time systems require a broader definition of correctness.", "Python, XGBoost, time-series analysis, WebSockets, market feeds, Parquet, replay, event processing, freshness checks, process supervision and observability are used where system state and data timing matter."],
      ["Workflow & product", "GIT / CI / REACT / VITE", "Engineering workflow is part of system reliability.", "Git, GitHub, CI, pytest, exact-version workflows, agent-assisted engineering, React, Vite, Canvas, SVG and browser automation support reproducible builds and a public experience that can itself be tested."],
    ],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Difficult systems are the interesting ones.",
    intro: "I am interested in work where quality engineering, AI systems, automation, real-time data, observability and engineering judgment overlap.",
    artifact: ["WORK", "PROOF", "CONTACT"],
    sections: [
      ["Where I fit", "ENGINEERING ROLES", "The strongest fit is where reliability and intelligent systems meet.", "AI/ML testing, quality engineering, SDET/automation, applied AI systems, research tooling, observability, platform reliability and engineering roles with strong validation requirements are the areas I want to keep pushing into."],
      ["Start with proof", "PROJECTS & EVIDENCE", "The fastest way to understand the work is to follow the architecture and evidence.", "Public case studies show engineering decisions, constraints, failure modes, validation and lessons. Private implementation details, credentials and proprietary logic remain private."],
      ["Contact", "START A CONVERSATION", "If the problem is difficult enough to require judgment, I want to hear about it.", `Email ${CONTACT_EMAIL} or use GitHub to start from the engineering work. The contact surface stays intentionally small: the work should carry most of the introduction.`],
    ],
  },
};

function useSectionMotion(rootRef, sections, setActive) {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const context = gsap.context(() => {
      sections.forEach((section, index) => {
        const node = root.querySelector(`#${section.id}`);
        if (!node) return;
        ScrollTrigger.create({
          trigger: node,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
        if (!reduced) {
          gsap.fromTo(node.querySelector(".section-copy"), { y: 42, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 78%", once: true },
          });
        }
      });
    }, root);
    return () => context.revert();
  }, [rootRef, sections, setActive, reduced]);
}

function ChapterRail({ sections, active }) {
  const reduced = useReducedMotion();
  return <nav className="chapter-rail" aria-label="Page chapters">
    {sections.map((section, index) => <button key={section.id} className={active === index ? "active" : ""} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" })}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</button>)}
  </nav>;
}

function SystemArtifact({ page, words, active }) {
  return <div className={`system-artifact artifact-${page}`} aria-hidden="true">
    <div className="artifact-orbit orbit-outer"/><div className="artifact-orbit orbit-inner"/>
    <div className="artifact-core"><Emblem/></div>
    {words.map((word, index) => <div key={word} className={`artifact-word word-${index} ${active === index ? "active" : ""}`}><i/>{word}</div>)}
    <div className="artifact-scan"/>
  </div>;
}

function WorldPage({ page, navigate }) {
  const story = STORIES[page] || STORIES.about;
  const sections = useMemo(() => story.sections.map((section, index) => ({
    id: `${page}-${index + 1}`,
    label: section[0],
    kicker: section[1],
    title: section[2],
    body: section[3],
  })), [page, story]);
  const [active, setActive] = useState(0);
  const root = useRef(null);
  useSectionMotion(root, sections, setActive);

  return <main ref={root} className={`world-page world-${page}`}>
    <ChapterRail sections={sections} active={active}/>
    <section className="world-hero">
      <p className="eyebrow"><span>{story.eyebrow}</span></p>
      <h1>{story.title}</h1>
      <p className="hero-intro">{story.intro}</p>
      <div className="hero-trace"><i/><span>{page === "contact" ? "START WITH THE WORK" : "SCROLL THROUGH THE SYSTEM"}</span></div>
    </section>
    <div className="story-layout">
      <aside className="story-stage"><SystemArtifact page={page} words={story.artifact} active={active}/><small>{story.sections[active]?.[1]}</small></aside>
      <div className="story-track">
        {sections.map((section, index) => <section id={section.id} className={`story-section ${active === index ? "active" : ""}`} key={section.id}>
          <div className="section-index">{String(index + 1).padStart(2, "0")}</div>
          <div className="section-copy">
            <p className="section-kicker">{section.kicker}</p>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {page === "projects" && index === 0 && <button className="text-action" onClick={(event) => navigate("tradebot", event.currentTarget)}>Open the TradeBot engineering case study <Icon type="arrow" size={18}/></button>}
            {page === "contact" && index === 1 && <a className="contact-link" href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github" size={18}/> Selected engineering work</a>}
            {page === "contact" && index === 2 && <a className="contact-link primary" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL} <Icon type="arrow" size={18}/></a>}
          </div>
        </section>)}
      </div>
    </div>
  </main>;
}

const TRADEBOT_STAGES = [
  { id: "tradebot-ingest", label: "INGEST", kicker: "DATA PLANE", title: "Know what the market data actually is before asking what it means.", body: "Real-time feeds, quote/depth ingestion, aligned snapshots, historical/replay sources, persistence, data freshness and provenance form the first authority boundary. A strategy result is meaningless if the input state cannot be reconstructed." },
  { id: "tradebot-research", label: "RESEARCH", kicker: "HYPOTHESIS PLANE", title: "Separate market stories into mechanisms that can fail independently.", body: "Options microstructure, opening-session behavior, Closing Auction Session studies, regime/context analysis and autonomous hypothesis discovery are treated as research lanes with causal time boundaries, replay and retained negative evidence." },
  { id: "tradebot-govern", label: "GOVERN", kicker: "AUTHORITY PLANE", title: "Keep research authority, observation authority and execution authority explicit.", body: "Exact-version candidates, read-only observation modes, promotion gates, immutable evidence, process ownership and fail-closed states stop the system from silently turning a research result into operational authority." },
  { id: "tradebot-observe", label: "OBSERVE", kicker: "RUNTIME PLANE", title: "Distinguish strategy failure from feed failure, process failure and environment failure.", body: "Feed health, reconnect behavior, stale-data detection, runtime events, process supervision, candidate traces and session evidence expose the operational conditions that surround every result." },
  { id: "tradebot-prove", label: "PROVE", kicker: "EVIDENCE PLANE", title: "Strengthen the claim only when replay, tests, review and live observation support it.", body: "Focused tests, adversarial checks, deterministic reruns, evidence manifests, independent review and live-readiness gates turn engineering claims into inspectable evidence. Unknown remains unknown when the proof is incomplete." },
];

function TradeBotSystem({ active }) {
  return <div className={`tradebot-system stage-${active}`} aria-hidden="true">
    <div className="tb-core">TRADEBOT<small>GOVERNED INTELLIGENCE</small></div>
    {TRADEBOT_STAGES.map((stage, index) => <React.Fragment key={stage.id}>
      <span className={`tb-line line-${index}`}/>
      <div className={`tb-node node-${index} ${index <= active ? "active" : ""}`}><i/>{stage.label}</div>
    </React.Fragment>)}
    <div className="tb-packet packet-a"/><div className="tb-packet packet-b"/>
  </div>;
}

function TradeBotPage({ navigate }) {
  const [active, setActive] = useState(0);
  const root = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      TRADEBOT_STAGES.forEach((stage, index) => {
        const node = document.getElementById(stage.id);
        if (!node) return;
        ScrollTrigger.create({ trigger: node, start: "top 56%", end: "bottom 44%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) });
        if (!reduced) gsap.fromTo(node.querySelector(".tradebot-copy"), { y: 52, opacity: 0 }, { y: 0, opacity: 1, duration: 0.78, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 76%", once: true } });
      });
    }, root);
    return () => context.revert();
  }, [reduced]);

  return <main ref={root} className="tradebot-page">
    <section className="tradebot-hero">
      <button className="return-projects" onClick={(event) => navigate("projects", event.currentTarget)}>← Projects</button>
      <p className="eyebrow"><span>FLAGSHIP SYSTEM · TRADEBOT</span></p>
      <h1>Market intelligence is easy to claim. Harder to prove.</h1>
      <p className="hero-intro">TradeBot is a governed market-intelligence and research platform for Indian index-options workflows. The difficult engineering is not generating another signal. It is proving what data, runtime state, research logic and evidence produced the result.</p>
    </section>
    <div className="tradebot-story">
      <aside className="tradebot-sticky"><TradeBotSystem active={active}/><small>{TRADEBOT_STAGES[active].kicker}</small></aside>
      <div className="tradebot-track">
        {TRADEBOT_STAGES.map((stage, index) => <section id={stage.id} className={`tradebot-stage ${active === index ? "active" : ""}`} key={stage.id}>
          <div className="stage-number">0{index + 1}</div>
          <div className="tradebot-copy"><p className="section-kicker">{stage.kicker}</p><h2>{stage.title}</h2><p>{stage.body}</p>{index === 4 && <div className="public-private"><article><strong>PUBLIC</strong><span>Architecture · validation · observability · failure analysis · research method · lessons</span></article><article><strong>PRIVATE</strong><span>Credentials · private endpoints · proprietary signal logic · private thresholds · write controls · sensitive datasets · private code</span></article></div>}</div>
        </section>)}
      </div>
    </div>
  </main>;
}

function DeepSpace({ onExit }) {
  const canvasRef = useRef(null);
  const wordsRef = useRef([]);
  const [armed, setArmed] = useState(false);
  const reduced = useReducedMotion();
  const words = ["END", "IS", "THE", "NEW", "BEGINNING"];
  const depths = [-1650, -1350, -1080, -780, -470];

  useLayoutEffect(() => {
    const nodes = wordsRef.current.filter(Boolean);
    if (reduced) {
      gsap.set(nodes, { opacity: 0, z: 0, scale: 1, filter: "none" });
      const finalNode = nodes[nodes.length - 1];
      if (finalNode) gsap.set(finalNode, { opacity: 1 });
      return () => gsap.set(nodes, { clearProps: "all" });
    }
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.08 });
    nodes.forEach((node, index) => {
      const beginning = index === words.length - 1;
      timeline.set(node, { opacity: 0, z: depths[index], scale: 0.2, filter: "blur(12px)" });
      timeline.to(node, { opacity: 1, z: beginning ? -90 : -300, scale: beginning ? 0.9 : 0.58, filter: "blur(1px)", duration: beginning ? 0.48 : 0.3, ease: "power2.out" });
      if (beginning) {
        timeline.to(node, { z: 75, scale: 1.16, opacity: 1, duration: 0.62, ease: "power2.out" });
        timeline.to(node, { opacity: 1, duration: 0.7 });
        timeline.to(node, { z: 520, scale: 2.7, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: "power3.in" });
      } else {
        timeline.to(node, { z: 430, scale: 2.45, opacity: 0, filter: "blur(5px)", duration: 0.88, ease: "power3.in" });
      }
    });
    return () => timeline.kill();
  }, [reduced]);

  useEffect(() => {
    const timer = window.setTimeout(() => setArmed(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const stars = Array.from({ length: reduced ? 100 : 280 }, () => ({
      x: (Math.random() - 0.5) * 2200,
      y: (Math.random() - 0.5) * 1500,
      z: Math.random() * 1900 + 50,
      previousZ: 0,
      red: Math.random() < 0.2,
    }));
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    const reset = (star) => {
      star.x = (Math.random() - 0.5) * 2200;
      star.y = (Math.random() - 0.5) * 1500;
      star.z = 1900;
      star.previousZ = star.z;
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time) => {
      context.fillStyle = "rgba(1,2,4,.23)";
      context.fillRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const fov = Math.min(width, height) * 1.04;
      const speed = reduced ? 0 : 27 + Math.sin(time * 0.0017) * 5;
      stars.forEach((star) => {
        star.previousZ = star.z;
        star.z -= speed;
        if (star.z < 12) reset(star);
        const x = centerX + (star.x / star.z) * fov;
        const y = centerY + (star.y / star.z) * fov;
        const previousX = centerX + (star.x / star.previousZ) * fov;
        const previousY = centerY + (star.y / star.previousZ) * fov;
        if (x < -220 || x > width + 220 || y < -220 || y > height + 220) { reset(star); return; }
        const alpha = Math.max(0.08, 1 - star.z / 1900);
        if (reduced) {
          context.fillStyle = star.red ? `rgba(255,55,70,${Math.min(0.94, alpha + 0.25)})` : `rgba(236,244,255,${Math.min(0.78, alpha)})`;
          const size = star.red ? 1.6 : 1;
          context.fillRect(x, y, size, size);
        } else {
          context.strokeStyle = star.red ? `rgba(255,55,70,${Math.min(0.94, alpha + 0.25)})` : `rgba(236,244,255,${Math.min(0.78, alpha)})`;
          context.lineWidth = star.red ? 1.45 : 0.78;
          context.beginPath();
          context.moveTo(previousX, previousY);
          context.lineTo(x, y);
          context.stroke();
        }
      });
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    resize();
    context.fillStyle = "#010204";
    context.fillRect(0, 0, width, height);
    window.addEventListener("resize", resize);
    if (reduced) draw(0);
    else frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [reduced]);

  useEffect(() => {
    const key = (event) => { if (event.key === "Escape") onExit(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onExit]);

  return <main className="deep-space" onClick={() => armed && onExit()} role="button" tabIndex="0" aria-label="Aixion Deep Space. Click or press Escape to return Home">
    <canvas ref={canvasRef}/>
    <div className="deep-vignette"/>
    <Emblem className="deep-emblem"/>
    <div className="deep-word-stage" aria-hidden="true">{words.map((word, index) => <span key={word} ref={(node) => { wordsRef.current[index] = node; }} className={`deep-word word-${index}`}>{word}</span>)}</div>
    <p className="sr-only">End is the new beginning.</p>
    <small>CLICK ANYWHERE OR PRESS ESC TO RETURN</small>
  </main>;
}

createRoot(document.getElementById("root")).render(<App/>);
