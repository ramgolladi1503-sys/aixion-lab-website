import { useEffect, useMemo, useState } from 'react';

type Point = { x: number; y: number; phase: number };

function SignalField() {
  const points = useMemo<Point[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      x: 4 + (i % 10) * 9.8,
      y: 16 + Math.floor(i / 10) * 27,
      phase: i * 0.47,
    }));
  }, []);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const run = () => {
      frame += 1;
      if (frame % 2 === 0) setTick((v) => (v + 1) % 10000);
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg className="signal-field" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="signal-cyan" x1="0" x2="1">
          <stop offset="0" stopColor="#34d9ff" stopOpacity="0.2" />
          <stop offset="0.58" stopColor="#34d9ff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#34d9ff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="signal-violet" x1="0" x2="1">
          <stop offset="0" stopColor="#8b5cff" stopOpacity="0.08" />
          <stop offset="0.64" stopColor="#8b5cff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#8b5cff" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {points.map((p, i) => {
        const drift = Math.sin(tick * 0.018 + p.phase) * 6;
        const destinationY = 50 + Math.sin(i * 0.74) * 12;
        return (
          <path
            key={i}
            d={`M ${p.x} ${p.y} C ${30 + drift} ${p.y}, ${58 - drift * 0.4} ${destinationY}, 96 ${50 + Math.sin(i) * 18}`}
            fill="none"
            stroke={i % 3 === 0 ? 'url(#signal-violet)' : 'url(#signal-cyan)'}
            strokeWidth={i % 5 === 0 ? 0.34 : 0.18}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

export default function App() {
  return (
    <main className="signal-site">
      <header className="signal-header">
        <a className="signal-brand" href="#top">AIXION LAB</a>
        <nav aria-label="Primary navigation">
          <a href="#systems">SYSTEMS</a>
          <a href="#research">RESEARCH</a>
          <a href="#evidence">EVIDENCE</a>
          <a href="#control">CONTROL</a>
          <a href="#journey">JOURNEY</a>
        </nav>
        <span className="signal-state"><i /> SYSTEM ONLINE</span>
      </header>

      <section id="top" className="signal-hero">
        <SignalField />
        <div className="signal-hero-copy">
          <span className="signal-kicker">CONTROL · RELIABILITY · EVIDENCE</span>
          <h1>Signal over noise.</h1>
          <p>
            AIXION LAB is being rebuilt around signal flow and data visualization.
            The previous immersive-island website has been removed from this branch.
          </p>
          <div className="signal-actions">
            <a href="#systems">ENTER THE SYSTEM</a>
            <span>DESIGN AUTHORITY · SIGNAL FLOW V1</span>
          </div>
        </div>
        <div className="signal-readout" aria-hidden="true">
          <div><span>INPUT</span><strong>RAW SIGNALS</strong></div>
          <div><span>PROCESS</span><strong>EXTRACT / VERIFY</strong></div>
          <div><span>OUTPUT</span><strong>CONTROLLED INTELLIGENCE</strong></div>
        </div>
      </section>

      <section id="systems" className="signal-placeholder"><span>01</span><h2>Systems</h2></section>
      <section id="research" className="signal-placeholder"><span>02</span><h2>Research</h2></section>
      <section id="evidence" className="signal-placeholder"><span>03</span><h2>Evidence</h2></section>
      <section id="control" className="signal-placeholder"><span>04</span><h2>Control Tower</h2></section>
      <section id="journey" className="signal-placeholder"><span>05</span><h2>Journey</h2></section>
    </main>
  );
}
