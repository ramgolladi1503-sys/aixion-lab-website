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
const pathFor = (key) => key === "home" ? "/" : key === "tower" ? "/control-tower" : key === "tradebot" ? "/projects/tradebot" : `/${key}`;
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

function Emblem({ className = "", alt = "" }) {
  return <img className={`standalone-emblem ${className}`} src={EMBLEM} alt={alt}/>;
}

function MotionVariables() {
  useEffect(() => {
    const root = document.documentElement;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const move = (e) => {
      tx = e.clientX / Math.max(innerWidth, 1) - .5;
      ty = e.clientY / Math.max(innerHeight, 1) - .5;
    };
    const tick = () => {
      cx += (tx - cx) * .055;
      cy += (ty - cy) * .055;
      root.style.setProperty("--mx", cx.toFixed(4));
      root.style.setProperty("--my", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return null;
}

function CursorSystem() {
  const dot = useRef(null);
  const halo = useRef(null);
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      dot.current && (dot.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`);
      halo.current && (halo.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`);
    };
    const over = (e) => halo.current?.classList.toggle("hot", !!e.target.closest("button,a,[data-cursor]"));
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); };
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
    let raf = 0, W = 0, H = 0, DPR = 1;
    const pointer = { x: 0, y: 0 };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = Array.from({ length: 148 }, (_, i) => ({
      x: ((i * 59 + 13) % 157) / 157,
      y: ((i * 83 + 31) % 163) / 163,
      vx: (((i * 7) % 11) - 5) * .000022,
      vy: (((i * 5) % 13) - 6) * .000019,
      phase: i * .63,
      accent: i % 11 === 0,
    }));
    const resize = () => {
      DPR = Math.min(devicePixelRatio || 1, 1.5);
      W = innerWidth; H = innerHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    const move = (e) => { pointer.x = e.clientX / Math.max(W,1) - .5; pointer.y = e.clientY / Math.max(H,1) - .5; };
    const draw = (t) => {
      ctx.clearRect(0,0,W,H);
      const boostValue = boostRef.current ? 2.6 : 1;
      const modeValue = modeRef.current === "research" ? 1.22 : modeRef.current === "projects" ? 1.12 : modeRef.current === "evidence" ? .96 : 1;
      const speed = boostValue * modeValue;
      const glow = ctx.createRadialGradient(W*(.5+pointer.x*.05),H*(.47+pointer.y*.05),0,W/2,H/2,Math.max(W,H)*.74);
      glow.addColorStop(0,`rgba(255,57,68,${.052*boostValue})`); glow.addColorStop(.38,"rgba(16,21,29,.13)"); glow.addColorStop(1,"rgba(2,3,5,0)");
      ctx.fillStyle = glow; ctx.fillRect(0,0,W,H);
      points.forEach((p) => {
        if (!reduced) {
          p.x += p.vx*speed; p.y += p.vy*speed;
          if (p.x < -.04) p.x = 1.04; if (p.x > 1.04) p.x = -.04; if (p.y < -.04) p.y = 1.04; if (p.y > 1.04) p.y = -.04;
        }
        p.px = p.x*W + Math.sin(t*.00125*speed+p.phase)*11 + pointer.x*26;
        p.py = p.y*H + Math.cos(t*.00102*speed+p.phase)*8 + pointer.y*19;
      });
      for (let i=0;i<points.length;i++) for (let j=i+1;j<Math.min(points.length,i+10);j++) {
        const a=points[i], b=points[j], d=Math.hypot(a.px-b.px,a.py-b.py);
        if (d<150) {
          const alpha=(1-d/150)*.135*boostValue;
          ctx.strokeStyle = modeRef.current === "evidence" ? `rgba(240,244,248,${alpha*.66})` : `rgba(255,65,76,${alpha})`;
          ctx.lineWidth=.6; ctx.beginPath(); ctx.moveTo(a.px,a.py);
          modeRef.current === "research" ? ctx.quadraticCurveTo((a.px+b.px)/2+22,(a.py+b.py)/2-16,b.px,b.py) : ctx.lineTo(b.px,b.py);
          ctx.stroke();
        }
      }
      for (let i=0;i<30;i++) {
        const y=((i*97+t*.075*speed)%(H+200))-100, x=((i*181+t*.17*speed)%(W+420))-210, len=34+(i%7)*20;
        const g=ctx.createLinearGradient(x-len,y,x+len,y); g.addColorStop(0,"rgba(255,57,68,0)"); g.addColorStop(.5,`rgba(255,78,88,${.12*boostValue})`); g.addColorStop(1,"rgba(255,255,255,0)");
        ctx.strokeStyle=g; ctx.lineWidth=i%6===0?1.2:.55; ctx.beginPath(); ctx.moveTo(x-len,y); ctx.lineTo(x+len,y); ctx.stroke();
      }
      points.forEach((p) => { ctx.fillStyle=p.accent?"rgba(255,72,82,.76)":"rgba(235,240,245,.29)"; ctx.beginPath(); ctx.arc(p.px,p.py,p.accent?1.75:.8,0,Math.PI*2); ctx.fill(); });
      raf=requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize",resize); addEventListener("pointermove",move,{passive:true}); raf=requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize",resize); removeEventListener("pointermove",move); };
  }, []);
  return <canvas ref={ref} className="computational-field" aria-hidden="true"/>;
}

function App() {
  const initial = pageFor(location.pathname);
  const [page,setPage] = useState(initial === "core" ? "home" : initial);
  const [entered,setEntered] = useState(() => sessionStorage.getItem("aixion-entered-v4") === "1");
  const [hovered,setHovered] = useState(null);
  const [routing,setRouting] = useState(null);
  const [deep,setDeep] = useState(initial === "core");
  const [menu,setMenu] = useState(false);
  useEffect(() => {
    const pop = () => { const next=pageFor(location.pathname); if(next==="core"){setDeep(true);setPage("home");} else {setDeep(false);setPage(next);} };
    addEventListener("popstate",pop); return()=>removeEventListener("popstate",pop);
  },[]);
  useEffect(() => {
    const label=deep?"AIXION CORE":page==="home"?"AIXION LAB":page==="tradebot"?"TradeBot":META[page]?.label||page;
    document.title=`${label} — AIXION LAB`; if(!deep) scrollTo(0,0);
  },[page,deep]);
  const navigate=(key,el)=>{
    if(key==="core"){history.pushState({},"","/core");setDeep(true);return;}
    if(key===page&&!deep)return;
    const r=el?.getBoundingClientRect?.(); const x=r?r.left+r.width/2:innerWidth/2; const y=r?r.top+r.height/2:innerHeight/2;
    setMenu(false); setDeep(false); setRouting({x,y,label:key==="home"?"HOME":key==="tradebot"?"TRADEBOT":META[key]?.label||key,back:key==="home"});
    setTimeout(()=>{history.pushState({},"",pathFor(key));setPage(key);},300);
    setTimeout(()=>setRouting(null),760);
  };
  const exitDeep=()=>{setDeep(false);history.replaceState({},"","/");setPage("home")};
  return <div className={`app page-${page} ${routing?"is-routing":""} ${deep?"is-deep":""}`}>
    <ComputationalField mode={deep?"deep":hovered||page} boost={!!hovered||!!routing||deep}/><MotionVariables/><CursorSystem/>
    {!entered ? <Entry onEnter={()=>{sessionStorage.setItem("aixion-entered-v4","1");setEntered(true)}}/> : deep ? <DeepSpace onExit={exitDeep}/> : <div className="scene"><Header page={page} navigate={navigate} menu={menu} setMenu={setMenu}/>{page==="home"?<HomeHub hovered={hovered} setHovered={setHovered} navigate={navigate}/>:page==="tradebot"?<TradeBotPage navigate={navigate}/>:<WorldPage page={page} navigate={navigate}/>}</div>}
    {routing&&<RouteRipple state={routing}/>} 
  </div>;
}

function Entry({onEnter}) {
  return <main className="entry-screen"><button className="entry-core" onClick={onEnter} aria-label="Enter Aixion Lab" data-cursor><i/><i/><i/><span className="entry-emblem-shell"><Emblem className="entry-emblem"/></span><b/></button></main>;
}

function Header({page,navigate,menu,setMenu}) {
  const internal=page!=="home";
  return <header className="global-header">
    <button className="brand-button" onClick={(e)=>navigate("home",e.currentTarget)} aria-label="Aixion Lab home" data-cursor><img src={BRAND} alt="AIXION LAB"/></button>
    <nav className="desktop-nav" aria-label="Primary navigation">
      <button className={`home-control ${internal?"emblem-mode":"text-mode"}`} onClick={(e)=>navigate("home",e.currentTarget)} aria-label="Home" data-cursor><span>Home</span><Emblem/></button>
      {["projects","research","evidence","contact"].map((key)=><button key={key} className={page===key?"active":""} onClick={(e)=>navigate(key,e.currentTarget)} data-cursor>{META[key].label}</button>)}
    </nav>
    <div className="header-actions"><a href={GITHUB} target="_blank" rel="noreferrer" className="github-button" aria-label="GitHub — selected engineering work" data-cursor><Icon type="github" size={21}/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Open navigation"><span/><span/></button></div>
    {menu&&<div className="mobile-menu">{["home",...NODES.map((n)=>n.key)].map((key)=><button key={key} onClick={(e)=>navigate(key,e.currentTarget)}>{key==="home"?"Home":META[key].label}</button>)}<a href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github" size={18}/>GitHub</a></div>}
  </header>;
}

function HomeHub({hovered,setHovered,navigate}) {
  const [pulse,setPulse]=useState(false); const longPress=useRef(null);
  const positions=useMemo(()=>NODES.map((n)=>{const rad=n.angle*Math.PI/180,radius=39;return{...n,x:50+Math.cos(rad)*radius,y:50+Math.sin(rad)*radius}}),[]);
  return <main className={`home-orbit ${hovered?"focused":""}`}><section className="orbit-stage"><div className="depth-disc disc-a"/><div className="depth-disc disc-b"/><i className="ambient-ring ring-a"/><i className="ambient-ring ring-b"/><i className="ambient-ring ring-c"/>
    <div className="orbit-system"><svg className="connection-map" viewBox="0 0 100 100" aria-hidden="true">{positions.map((n)=><React.Fragment key={n.key}><line className={`spoke-line ${hovered===n.key?"active":""}`} x1="50" y1="50" x2={n.x} y2={n.y} pathLength="1"/><circle className={`spoke-end ${hovered===n.key?"active":""}`} cx={n.x} cy={n.y} r=".45"/></React.Fragment>)}</svg>
    {positions.map((n)=><div key={n.key} className="node-position" style={{left:`${n.x}%`,top:`${n.y}%`}}><div className="node-counterspin"><button className={`hub-node ${hovered===n.key?"active":""}`} onMouseEnter={()=>setHovered(n.key)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(n.key)} onBlur={()=>setHovered(null)} onClick={(e)=>navigate(n.key,e.currentTarget)} aria-label={`Open ${n.label}`} data-cursor><Icon type={n.key} size={23}/><strong>{n.label}</strong><i/></button></div></div>)}</div>
    <button className={`core-node ${pulse?"pulse":""}`} onClick={()=>{setPulse(true);setTimeout(()=>setPulse(false),420)}} onDoubleClick={()=>navigate("core")} onPointerDown={()=>{longPress.current=setTimeout(()=>navigate("core"),720)}} onPointerUp={()=>clearTimeout(longPress.current)} onPointerLeave={()=>clearTimeout(longPress.current)} onKeyDown={(e)=>{if(e.key==="Enter"){e.preventDefault();navigate("core")}}} aria-label="Aixion Core. Double click, long press, or press Enter to enter Deep Space" data-cursor><i/><i/><i/><span className="core-emblem-shell"><Emblem className="core-emblem"/></span></button>
    <span className="orbit-caption caption-a">SYSTEMS / RESEARCH / EVIDENCE</span><span className="orbit-caption caption-b">AIXION SIGNAL UNIVERSE</span>
  </section><div className="idle-cue">EXPLORE THE SYSTEM</div></main>;
}

function RouteRipple({state}) { return <div className={`route-ripple ${state.back?"reverse":""}`} style={{"--x":`${state.x}px`,"--y":`${state.y}px`}} aria-hidden="true"><i/><i/><i/><span/><b>{state.label}</b></div>; }

function Reveal({children,className=""}) {
  const ref=useRef(null);
  useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){node.classList.add("visible");observer.disconnect()}},{threshold:.12});observer.observe(node);return()=>observer.disconnect()},[]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function SectionRail({sections}) {
  const [active,setActive]=useState(sections[0]?.id); const reduced=useReducedMotion();
  useEffect(()=>{const nodes=sections.map((s)=>document.getElementById(s.id)).filter(Boolean);if(!nodes.length)return;const observer=new IntersectionObserver((entries)=>{const visible=entries.filter((e)=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible?.target?.id)setActive(visible.target.id)},{rootMargin:"-25% 0px -58% 0px",threshold:[0,.15,.35,.6]});nodes.forEach((n)=>observer.observe(n));return()=>observer.disconnect()},[sections]);
  return <nav className="chapter-rail" aria-label="Page chapters">{sections.map((s)=><button key={s.id} className={active===s.id?"active":""} onClick={()=>document.getElementById(s.id)?.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"})}>{s.label}</button>)}</nav>;
}

const STORY_META = {
  about:{eyebrow:"ABOUT AIXION LAB",title:"Engineering systems that can explain themselves when the easy demo is over.",intro:"Aixion Lab is where quality engineering, automation, applied AI, market-intelligence research, real-time data, observability, and runtime governance are treated as one systems problem: build useful behavior, expose failure, and make every serious claim inspectable."},
  journey:{eyebrow:"ENGINEERING JOURNEY",title:"The work expanded from finding defects to designing systems that make defects, uncertainty, and authority visible.",intro:"The path began in hands-on quality engineering and automation. It grew into feeds, runtimes, models, replay, research infrastructure, operational supervision, agent-assisted engineering, and evidence systems. The through-line is the same: correctness has to survive contact with state, timing, data, and failure."},
  projects:{eyebrow:"SELECTED ENGINEERING SYSTEMS",title:"Not a gallery of features. A portfolio of systems shaped by constraints, failure modes, and evidence.",intro:"The projects are presented as engineering systems rather than screenshots: what problem existed, what architecture emerged, what broke, how the failure was isolated, what was validated, what remains unproven, and how operational truth is preserved."},
  research:{eyebrow:"RESEARCH OPERATING SYSTEM",title:"Hypotheses are cheap. The engineering work is making them survive causal data, replay, negative controls, and review.",intro:"Research is deliberately structured to make weak ideas fail early. Market microstructure, opening behavior, closing-auction structure, options response, context regimes, and autonomous discovery are separated into bounded questions with explicit evidence states."},
  evidence:{eyebrow:"EVIDENCE & GOVERNANCE",title:"A passing run is not proof. Proof starts when the system can tell us exactly what ran, on what data, under what authority, and whether it can happen again.",intro:"Exact-version authority, deterministic reruns, immutable evidence, CI, focused tests, freshness checks, independent review, fail-closed promotion, and explicit runtime boundaries turn engineering confidence into something that can be inspected."},
  tower:{eyebrow:"AIXION CONTROL TOWER",title:"Operational visibility should reduce uncertainty, not decorate it.",intro:"Control Tower is a public-safe way to expose project state, research lanes, runtime context, validation gates, and evidence progression without revealing private controls, credentials, proprietary logic, or pretending delayed/demo information is live."},
  stack:{eyebrow:"ENGINEERING STACK",title:"The stack matters because each tool solved a specific failure mode or engineering constraint.",intro:"Testing, automation, event-driven data, replay, applied AI, model evaluation, observability, runtime supervision, CI, evidence capture, and product engineering are organized here by why they were needed—not by how many logos fit on a page."},
  contact:{eyebrow:"CONTACT",title:"I am looking for hard engineering problems where quality, AI, data, reliability, and judgment all have to work together.",intro:"The strongest fit is work where systems cannot simply look correct: AI/ML quality, SDET and automation, applied AI platforms, research tooling, observability, data-intensive products, and reliability-minded engineering."},
};

function SpatialArtifact({type="system"}) {
  return <div className={`spatial-artifact artifact-${type}`} aria-hidden="true"><span/><span/><span/><span/><i/><i/><b/></div>;
}

function WorldPage({page,navigate}) {
  const meta=STORY_META[page]||STORY_META.about; const sections=buildSections(page,navigate);
  return <main className={`world-page world-${page}`}><SectionRail sections={sections}/><section className="world-hero" id={`${page}-intro`}><div className="hero-copy"><p className="eyebrow"><span>{meta.eyebrow}</span></p><h1>{meta.title}</h1><article>{meta.intro}</article><div className="hero-trace"><i/><span>{page==="contact"?"OPEN TO THE RIGHT PROBLEM":"SCROLL TO FOLLOW THE SYSTEM"}</span></div></div><SpatialArtifact type={page}/></section>
    <div className="story-sections">{sections.map((section,i)=><section id={section.id} className={`story-section story-${i%2?"right":"left"}`} key={section.id}><aside><span>{section.label}</span><small>{section.kicker}</small></aside><Reveal className="story-body"><h2>{section.title}</h2>{section.body}</Reveal><div className="section-artefact"><SpatialArtifact type={section.visual||page}/></div></section>)}</div></main>;
}

function buildSections(page,navigate) {
  const S={
    about:[
      {id:"about-standard",label:"Standard",kicker:"OPERATING MODEL",title:"Build. Challenge. Prove. Then keep the unresolved parts visible.",visual:"evidence",body:<><p>Every serious project moves through the same discipline: bound the system, define authority, expose the data path, challenge assumptions, reproduce failure, and only strengthen the claim when evidence supports it.</p><div className="three-columns"><article><strong>Build</strong><span>Explicit state, provenance, interfaces, runtime boundaries, and operational ownership.</span></article><article><strong>Challenge</strong><span>Replay, adversarial checks, stale-data cases, failure injection, edge conditions, and review.</span></article><article><strong>Prove</strong><span>Exact versions, deterministic outputs, manifests, CI, independent evidence, and honest unknowns.</span></article></div></>},
      {id:"about-failure",label:"Failure",kicker:"ENGINEERING PRINCIPLE",title:"Failure is architecture information—not something to hide below the success state.",visual:"research",body:<><p>Quality engineering taught me to reproduce defects. Systems engineering made the question broader: which data, state, timing, authority, or runtime condition produced the behavior? Applied AI added another requirement—detect when confidence itself is unsupported.</p><blockquote>Reliable systems do not eliminate uncertainty. They make uncertainty inspectable and governable.</blockquote></>},
      {id:"about-domain",label:"Domain",kicker:"WHERE THE WORK CONVERGES",title:"AI, testing, real-time data, markets, automation, observability, and governance meet in the same systems question.",visual:"stack",body:<><p>Can a complex system remain useful when the data is imperfect, the runtime changes, assumptions fail, and humans still need to understand what happened?</p><div className="tag-field">{["AI/ML quality","QA automation","real-time data","market microstructure","replay","runtime supervision","evidence systems","governed agents"].map((x)=><span key={x}>{x}</span>)}</div></>},
    ],
    journey:[
      {id:"journey-foundation",label:"Foundation",kicker:"QUALITY → AUTOMATION",title:"The first discipline was learning not to confuse a passing test with a trustworthy system.",visual:"journey",body:<><p>Manual and automated QA built the habit of asking what changed, what was not covered, whether a failure was reproducible, whether the environment mattered, and whether a green result actually represented the user-visible behavior.</p><div className="journey-line"><span>Quality engineering</span><i/><span>Automation</span><i/><span>Systems thinking</span></div></>},
      {id:"journey-expansion",label:"Expansion",kicker:"SYSTEMS → APPLIED AI",title:"The scope moved from test cases into feeds, runtimes, models, state, supervision, and evidence.",visual:"projects",body:<><p>Real-time systems changed the definition of correctness. Data freshness, reconnect behavior, runtime ownership, model evaluation, replay integrity, process supervision, and operational authority became part of whether a result could be trusted.</p></>},
      {id:"journey-aixion",label:"Aixion",kicker:"RESEARCH → GOVERNED ENGINEERING",title:"Aixion Lab is where those disciplines became one engineering language.",visual:"evidence",body:<><p>TradeBot, autonomous research, evidence tooling, Control Tower, microstructure studies, AI-quality work, and this public experience are different projects, but they share the same principles: inspectable data, explicit authority, visible failure, reproducible evidence, and disciplined claims.</p></>},
    ],
    projects:[
      {id:"projects-tradebot",label:"Flagship",kicker:"TRADEBOT",title:"A market-intelligence platform that became a real-time systems, research, governance, and observability problem.",visual:"tradebot",body:<><p>TradeBot evolved from Indian index-options workflows into a governed research and observation platform spanning real-time feeds, options microstructure, replay, hypothesis evaluation, runtime authority, freshness, supervision, evidence capture, and failure analysis.</p><button className="text-action" onClick={(e)=>navigate("tradebot",e.currentTarget)}>Open the engineering case study <Icon type="arrow" size={18}/></button></>},
      {id:"projects-systems",label:"Systems",kicker:"PROGRAMS AROUND THE FLAGSHIP",title:"The surrounding systems became as important as the original application.",visual:"projects",body:<div className="system-list"><article><strong>Autonomous Research Loop</strong><p>Turns broad research goals into bounded tasks, evidence, review, and explicit promotion states without allowing automation to manufacture confidence.</p></article><article><strong>Evidence Kernel</strong><p>Connects claims to exact versions, focused tests, deterministic reruns, manifests, freshness, and independent review.</p></article><article><strong>Aixion Control Tower</strong><p>Surfaces project authority, research state, validation progress, operational context, and public-safe system health.</p></article></div>},
      {id:"projects-method",label:"Method",kicker:"WHY THE WORK IS HARD",title:"The recurring engineering problem is architecture under uncertainty.",visual:"evidence",body:<><p>Feed outages, stale quotes, replay artifacts, dirty runtime authority, environment differences, invalid research assumptions, model overconfidence, process duplication, and incomplete evidence all create ways for a system to look correct while being wrong. The work is to make those states observable and governable.</p></>},
    ],
    research:[
      {id:"research-lanes",label:"Lanes",kicker:"CURRENT RESEARCH FAMILIES",title:"Research is separated into questions that can fail independently instead of one giant strategy narrative.",visual:"research",body:<div className="research-lanes"><article><strong>Opening-session structure</strong><span>Context, constituents, futures, early-session behavior, recurrence, and causal cutoffs.</span></article><article><strong>Closing Auction Session</strong><span>Auction imbalance, breadth, futures convergence, structural breakpoints, and option response.</span></article><article><strong>Options microstructure</strong><span>Bid/ask, liquidity, strikes, IV, Greeks, depth, and short-horizon behavior.</span></article><article><strong>Regime & context</strong><span>When signal behavior changes because the surrounding market state changed.</span></article></div>},
      {id:"research-method",label:"Method",kicker:"OUTCOME-BLIND DISCIPLINE",title:"A plausible explanation is not evidence until the data path and timing survive challenge.",visual:"evidence",body:<><p>Research lanes use causal cutoffs, replay, holdout logic, segmentation, negative controls, adversarial checks, and explicit unsupported states. When an idea fails, the failure remains part of the research record instead of disappearing from the narrative.</p><blockquote>Negative evidence is engineering progress when it prevents a weak idea from being recycled later as conviction.</blockquote></>},
      {id:"research-agents",label:"Agents",kicker:"AUTONOMOUS DISCOVERY",title:"Automation can expand the search space. It cannot be allowed to lower the standard of proof.",visual:"stack",body:<><p>Agent-assisted research is valuable when task boundaries, exact-version authority, evidence requirements, collision avoidance, and independent review are explicit. The goal is not autonomous confidence. It is autonomous exploration inside governed limits.</p></>},
    ],
    evidence:[
      {id:"evidence-version",label:"Authority",kicker:"EXACT VERSION TRUTH",title:"Every important result needs an exact answer to one question: what code actually ran?",visual:"evidence",body:<><p>Clean checkouts, exact commit authority, frozen candidates, immutable evidence, explicit runtime ownership, and controlled promotion prevent a passing result from becoming detached from the software that produced it.</p></>},
      {id:"evidence-replay",label:"Replay",kicker:"REPRODUCIBILITY",title:"A result that cannot survive a deterministic rerun is not a strong result.",visual:"research",body:<><p>Replay, deterministic outputs, fixtures, manifests, freshness checks, focused regression testing, and environment comparison are used to separate a real behavior change from an artifact of data, runtime, or setup.</p></>},
      {id:"evidence-gates",label:"Gates",kicker:"FAIL CLOSED",title:"Unknown is allowed to remain unknown—and that is a feature, not a failure of presentation.",visual:"tower",body:<><p>Promotion gates, CI, independent review, read-only/live separation, stale-data rejection, explicit authority flags, and evidence freshness are designed to stop unsupported states from being promoted into optimistic labels.</p><div className="evidence-path"><span>Implementation</span><i/><span>Adversarial</span><i/><span>Integration</span><i/><span>Evidence</span><i/><span>Review</span></div></>},
    ],
    tower:[
      {id:"tower-purpose",label:"Purpose",kicker:"PUBLIC-SAFE OBSERVABILITY",title:"Understand the system without exposing the system.",visual:"tower",body:<><p>Control Tower is designed to show project authority, research state, evidence gates, build status, observation mode, runtime health, and public-safe operational context without publishing credentials, private controls, or proprietary strategy logic.</p></>},
      {id:"tower-truth",label:"Truth",kicker:"NO FAKE LIVE STATUS",title:"Operational visuals are useful only when their truth boundary is visible.",visual:"evidence",body:<><p>Every non-live state must be labeled honestly: demonstration, sanitized, delayed, offline replay, research, or public status. The interface should never imply production authority or live execution that it does not actually have.</p><div className="tag-field">{["DEMONSTRATION DATA","SANITIZED","OFFLINE REPLAY","RESEARCH","PUBLIC STATUS"].map((x)=><span key={x}>{x}</span>)}</div></>},
      {id:"tower-next",label:"Next",kicker:"CONTROL SURFACE",title:"The goal is not another dashboard full of decorative metrics. It is one explainable surface across authority, evidence, runtime state, and human decisions.",visual:"projects",body:<><p>The useful Control Tower connects project authority, system health, research evidence, runtime events, validation state, and human approval points so operational judgment has context rather than just numbers.</p></>},
    ],
    stack:[
      {id:"stack-quality",label:"Quality",kicker:"QUALITY & AUTOMATION",title:"Testing is where the engineering discipline started, but it did not stay limited to test execution.",visual:"stack",body:<div className="stack-groups"><article><strong>Quality & automation</strong><p>Java · Selenium · Appium · Jira/Xray · regression · integration · scenario design · failure reproduction</p></article><article><strong>Research & applied AI</strong><p>Python · XGBoost · time-series analysis · replay · model evaluation · experimentation · agent-assisted workflows</p></article></div>},
      {id:"stack-runtime",label:"Runtime",kicker:"DATA & SYSTEMS",title:"Real-time systems require a different definition of correctness: freshness, timing, state, and recovery matter.",visual:"projects",body:<div className="stack-groups"><article><strong>Data & runtime</strong><p>WebSockets · real-time feeds · Parquet · event processing · freshness · supervision · observability · replay</p></article><article><strong>Engineering workflow</strong><p>Git · GitHub · CI · pytest · exact-version authority · evidence manifests · review gates · agent-assisted engineering</p></article></div>},
      {id:"stack-product",label:"Product",kicker:"WEB & EXPERIENCE",title:"The public experience is also an engineering system: state, motion, accessibility, performance, and truth boundaries all matter.",visual:"about",body:<><p>React, Vite, Canvas, SVG, scroll choreography, responsive interaction, reduced-motion fallbacks, semantic HTML, and public/private information boundaries are used to make Aixion Lab itself part of the engineering portfolio.</p></>},
    ],
    contact:[
      {id:"contact-work",label:"Work",kicker:"WHERE I FIT BEST",title:"Roles where quality engineering, AI systems, automation, data, and reliability overlap.",visual:"contact",body:<><p>I am especially interested in AI/ML testing, SDET and automation, applied AI systems, research tooling, observability, platform reliability, and engineering work where complex behavior has to be validated rather than assumed.</p></>},
      {id:"contact-proof",label:"Proof",kicker:"START WITH THE WORK",title:"The fastest way to understand the engineering is to follow the projects, failures, and evidence.",visual:"projects",body:<><a className="contact-link" href={GITHUB} target="_blank" rel="noreferrer"><Icon type="github" size={19}/> Selected engineering work on GitHub</a><p>Private implementation details stay private. Public case studies focus on architecture, constraints, failure modes, validation, governance, observability, and what the work actually proved.</p></>},
      {id:"contact-talk",label:"Talk",kicker:"CONTACT",title:"If the problem is difficult enough to require engineering judgment, I am interested in the conversation.",visual:"contact",body:<div className="contact-actions"><a href="mailto:contact@aixionlabs.com">contact@aixionlabs.com</a><a href={GITHUB} target="_blank" rel="noreferrer">GitHub <Icon type="arrow" size={16}/></a></div>},
    ],
  };
  return S[page]||S.about;
}

function useActiveStage(ids) {
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const onScroll=()=>{
      const target=innerHeight*.48;
      let best=0,bestDist=Infinity;
      ids.forEach((id,i)=>{const el=document.getElementById(id);if(!el)return;const r=el.getBoundingClientRect();const center=r.top+r.height*.42;const d=Math.abs(center-target);if(d<bestDist){bestDist=d;best=i}});
      setActive(best);
    };
    onScroll(); addEventListener("scroll",onScroll,{passive:true}); addEventListener("resize",onScroll); return()=>{removeEventListener("scroll",onScroll);removeEventListener("resize",onScroll)};
  },[ids]);
  return active;
}

function TradeBotVisual({active}) {
  const labels=["INGEST","RESEARCH","GOVERN","OBSERVE","PROVE"];
  return <div className={`tradebot-visual stage-${active}`} aria-hidden="true"><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/><div className="visual-core"><Emblem/><span>TRADEBOT</span></div><div className="visual-flow">{labels.map((l,i)=><div key={l} className={`visual-node n-${i} ${i<=active?"lit":""}`}><i/><strong>{l}</strong></div>)}</div><div className="packet-field">{Array.from({length:18},(_,i)=><i key={i} style={{"--i":i}}/>)}</div><div className="stage-caption"><span>{String(active+1).padStart(2,"0")}</span><strong>{labels[active]}</strong></div></div>;
}

function TradeBotPage({navigate}) {
  const stages=[
    {id:"tradebot-problem",label:"01 / Constraint",kicker:"REAL-TIME INPUT",title:"A signal is meaningless if the system cannot prove what data reached the decision path.",body:"The first engineering problem is feed truth: quote/depth ingestion, freshness, reconnect behavior, aligned snapshots, provenance, and the distinction between connected, fresh, verified, and actually usable market state."},
    {id:"tradebot-research",label:"02 / Research",kicker:"HYPOTHESIS UNDER PRESSURE",title:"The research layer exists to make attractive explanations fail before they become strategy claims.",body:"Replay, causal cutoffs, option-chain and microstructure studies, context segmentation, negative controls, holdout logic, and explicit unsupported states are used to separate plausible stories from repeatable behavior."},
    {id:"tradebot-govern",label:"03 / Govern",kicker:"AUTHORITY & PROMOTION",title:"The runtime must know not only what it can do—but what it is not authorized to do.",body:"Exact-version authority, clean candidate state, read-only observation, fail-closed promotion gates, explicit execution boundaries, and immutable evidence prevent research, runtime, and trading authority from collapsing into one ambiguous mode."},
    {id:"tradebot-observe",label:"04 / Observe",kicker:"SYSTEM BEHAVIOR",title:"Failures in feeds, processes, freshness, evidence, and environment need to be visible before they are mistaken for strategy behavior.",body:"Observability covers feed health, stale-data detection, reconnect events, process supervision, runtime state, candidate traces, session evidence, and the operational incidents that explain why a system behaved differently from the model."},
    {id:"tradebot-prove",label:"05 / Prove",kicker:"EVIDENCE BOUNDARY",title:"The end product is not a confident answer. It is an answer with a traceable reason to trust—or reject—it.",body:"Focused tests, deterministic reruns, manifests, exact commits, independent review, regression checks, and public/private boundaries make it possible to show engineering depth without exposing proprietary signal logic, credentials, strategy thresholds, or private code."},
  ];
  const active=useActiveStage(stages.map((s)=>s.id));
  return <main className="tradebot-page"><button className="return-projects" onClick={(e)=>navigate("projects",e.currentTarget)}>← Projects</button><section className="tradebot-opening"><p className="eyebrow"><span>FLAGSHIP ENGINEERING SYSTEM · TRADEBOT</span></p><h1>Market intelligence is easy to claim.<br/><em>Harder to prove.</em></h1><article>TradeBot is a governed market-intelligence and research platform for Indian index-options workflows. The engineering value is not a promise of prediction. It is the infrastructure required to distinguish feed failure from strategy failure, replay artifacts from live behavior, and promising hypotheses from evidence strong enough to support a claim.</article><div className="hero-trace"><i/><span>SCROLL THROUGH THE ENGINEERING PATH</span></div></section>
    <div className="tradebot-narrative"><div className="tradebot-pin"><TradeBotVisual active={active}/></div><div className="tradebot-stages">{stages.map((s,i)=><section className={`tradebot-stage ${active===i?"active":""}`} id={s.id} key={s.id}><span>{s.label}</span><small>{s.kicker}</small><h2>{s.title}</h2><p>{s.body}</p>{i===4&&<div className="privacy-grid"><article><strong>Public</strong><span>Architecture · validation · observability · failure analysis · research method · lessons</span></article><article><strong>Private</strong><span>Credentials · private endpoints · proprietary signal logic · strategy thresholds · write controls · sensitive datasets · private code</span></article></div>}</section>)}</div></div>
  </main>;
}

function DeepSpace({onExit}) {
  const canvasRef=useRef(null); const [tick,setTick]=useState(0); const [armed,setArmed]=useState(false); const words=["END","IS","THE","NEW","BEGINNING"]; const word=words[tick%words.length]; const hold=word==="BEGINNING";
  useEffect(()=>{const id=setTimeout(()=>setTick((v)=>v+1),hold?2100:1120);return()=>clearTimeout(id)},[tick,hold]);
  useEffect(()=>{const arm=setTimeout(()=>setArmed(true),900);return()=>clearTimeout(arm)},[]);
  useEffect(()=>{
    const canvas=canvasRef.current,ctx=canvas.getContext("2d"); let raf=0,W=0,H=0,DPR=1;
    const stars=Array.from({length:250},()=>({x:(Math.random()-.5)*2100,y:(Math.random()-.5)*1450,z:Math.random()*1900+70,pz:0,red:Math.random()<.2}));
    const reset=(s)=>{s.x=(Math.random()-.5)*2100;s.y=(Math.random()-.5)*1450;s.z=1900;s.pz=s.z};
    const resize=()=>{DPR=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;canvas.width=W*DPR;canvas.height=H*DPR;canvas.style.width=`${W}px`;canvas.style.height=`${H}px`;ctx.setTransform(DPR,0,0,DPR,0,0)};
    const draw=(t)=>{ctx.fillStyle="rgba(1,2,4,.26)";ctx.fillRect(0,0,W,H);const fov=Math.min(W,H)*1.04,cx=W/2,cy=H/2,speed=23+Math.sin(t*.0015)*4;stars.forEach((s)=>{s.pz=s.z;s.z-=speed;if(s.z<16)reset(s);const x=cx+(s.x/s.z)*fov,y=cy+(s.y/s.z)*fov,px=cx+(s.x/s.pz)*fov,py=cy+(s.y/s.pz)*fov;if(x<-220||x>W+220||y<-220||y>H+220){reset(s);return}const alpha=Math.max(.08,1-s.z/1950);ctx.strokeStyle=s.red?`rgba(255,58,69,${Math.min(.92,alpha+.2)})`:`rgba(235,242,255,${Math.min(.78,alpha)})`;ctx.lineWidth=s.red?1.45:.8;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x,y);ctx.stroke()});raf=requestAnimationFrame(draw)};
    resize();ctx.fillStyle="#010204";ctx.fillRect(0,0,W,H);addEventListener("resize",resize);raf=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize)};
  },[]);
  useEffect(()=>{const key=(e)=>{if(e.key==="Escape"&&armed)onExit()};addEventListener("keydown",key);return()=>removeEventListener("keydown",key)},[armed,onExit]);
  return <main className="deep-space" onClick={()=>armed&&onExit()} role="button" tabIndex="0" aria-label="Aixion Deep Space. Click or press Escape to return Home"><canvas ref={canvasRef}/><div className="deep-vignette"/><Emblem className="deep-emblem"/><div className="deep-word-stage"><span key={tick} className={`deep-word ${hold?"hold":""}`}>{word}</span></div><small>CLICK ANYWHERE OR PRESS ESC TO RETURN</small></main>;
}

createRoot(document.getElementById("root")).render(<App/>);
