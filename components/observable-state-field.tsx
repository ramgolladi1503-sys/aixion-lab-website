"use client";

import { useEffect, useState } from "react";
import { systems, researchNotes } from "@/lib/site-data";

const bands = [
  { cls: "band-tradebot", y: 96 },
  { cls: "band-core", y: 184 },
  { cls: "band-automation", y: 286 },
  { cls: "band-analytics", y: 390 },
] as const;

const points = [88, 170, 260, 350, 445, 540, 640, 735, 835, 920];
const rejectedPositions = [[180, 458], [320, 475], [520, 461], [655, 474]] as const;

function wavePath(y: number, offset: number) {
  const ys = [22, 8, 30, -10, 18, -14, 12, -22, -4, -18];
  return points.map((x, index) => `${index === 0 ? "M" : "L"} ${x} ${y + ys[index] + offset}`).join(" ");
}

function StableFieldShell() {
  return (
    <div className="observable-field observable-field--locked observable-field--pending" aria-label="Aixion public system-state model">
      <div className="field-note-card">
        <span>PUBLIC-SAFE STATE MODEL</span>
        <p>Curated system maturity and research traces. This visualization is not live runtime telemetry.</p>
      </div>
      <span className="sr-only">System-state visualization loading.</span>
    </div>
  );
}

export function ObservableStateField() {
  const [mounted, setMounted] = useState(false);
  const rejected = researchNotes.filter(note => note.state === "REJECTED");

  useEffect(() => {
    setMounted(true);
  }, []);

  // React requires the first browser render to match SSR exactly. The complex SVG
  // is therefore mounted only after hydration; the public-safe shell is stable in
  // both environments and prevents parser/namespace differences from invalidating
  // the page root during hydration.
  if (!mounted) return <StableFieldShell />;

  return (
    <div className="observable-field observable-field--locked" aria-label="Aixion public system-state model">
      <svg className="observable-field-svg" viewBox="0 0 1000 560" role="img" aria-labelledby="observable-title observable-desc">
        <title id="observable-title">Aixion public system-state model</title>
        <desc id="observable-desc">A public-safe conceptual visualization of current system maturity and research traces. It is not live runtime telemetry and does not represent invented performance metrics.</desc>
        <defs>
          <filter id="obs-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7" /></filter>
          <linearGradient id="fade-grid" x1="0" x2="1"><stop offset="0" stopColor="white" stopOpacity="0"/><stop offset=".25" stopColor="white" stopOpacity=".6"/><stop offset="1" stopColor="white" stopOpacity=".12"/></linearGradient>
        </defs>

        <g className="field-grid" aria-hidden="true">
          {[90,180,270,360,450,540,630,720,810,900].map(x => <line key={`x-${x}`} x1={x} y1="30" x2={x} y2="500" />)}
          {[70,140,210,280,350,420,490].map(y => <line key={`y-${y}`} x1="40" y1={y} x2="960" y2={y} />)}
        </g>

        {bands.map((band, index) => {
          const system = systems[index];
          return (
            <g className={`state-band ${band.cls}`} key={system.id}>
              {[-28,-20,-12,-4,4,12,20,28].map(offset => <path className="state-band-thread" d={wavePath(band.y, offset)} key={offset} />)}
              <path className="state-band-halo" d={wavePath(band.y, 0)} />
              <path className="state-band-line" d={wavePath(band.y, 0)} />
              {points.slice(2).map((x, pointIndex) => {
                const yOffsets = [30,-10,18,-14,12,-22,-4,-18];
                return <circle className={pointIndex === 5 ? "field-node field-node--major" : "field-node"} cx={x} cy={band.y + yOffsets[pointIndex]} r={pointIndex === 5 ? 8 : 3} key={`${system.id}-${x}`} />;
              })}
              <circle className="field-node-glow" cx="835" cy={band.y - 4} r="18" filter="url(#obs-glow)" />
              <circle className="field-node field-node--major" cx="835" cy={band.y - 4} r="8" />
              <text className="state-band-label" x="850" y={band.y - 12}>{system.shortName.toUpperCase()}</text>
              <text className="state-band-state" x="850" y={band.y + 8}>{system.state}</text>
            </g>
          );
        })}

        <g className="research-layer">
          {[-18,-10,-2,6,14].map(offset => <path d={`M 110 ${472 + offset} C 230 ${425 + offset}, 325 ${505 + offset}, 455 ${462 + offset} S 650 ${490 + offset}, 760 ${468 + offset}`} key={offset} />)}
          {rejected.slice(0, rejectedPositions.length).map((note, index) => {
            const [x, y] = rejectedPositions[index];
            return (
              <g className="rejected-x" transform={`translate(${x} ${y})`} key={note.slug}>
                <title>{note.title}: rejected after evaluation</title>
                <line x1="-5" y1="-5" x2="5" y2="5"/>
                <line x1="5" y1="-5" x2="-5" y2="5"/>
              </g>
            );
          })}
          <text x="104" y="508">REJECTED HYPOTHESES</text>
          <text x="104" y="525">REMAIN VISIBLE</text>
        </g>

        <g className="research-markers">
          {researchNotes.slice(0, 3).map((note, index) => {
            const coords = [[342,210],[548,325],[704,446]][index];
            return (
              <g transform={`translate(${coords[0]} ${coords[1]})`} key={note.slug}>
                <title>{note.title}: {note.state}</title>
                <circle r="5"/>
                <circle className="marker-ring" r="16"/>
              </g>
            );
          })}
        </g>

        <g className="temporal-axis" aria-hidden="true">
          <line x1="70" y1="530" x2="940" y2="530" />
          {[[70, "HISTORY"], [390, "EVIDENCE"], [700, "CURRENT"], [940, "NEXT"]].map(([x, label], index) => <g key={String(label)}><circle cx={Number(x)} cy="530" r={index === 2 ? 5 : 2.5}/><text x={Number(x) - 18} y="552">{label}</text></g>)}
        </g>
      </svg>

      <div className="field-legend field-legend--compact" aria-label="Field legend">
        <span><i className="legend-dot legend-validating" />VALIDATING</span>
        <span><i className="legend-dot legend-building" />BUILDING</span>
        <span><i className="legend-dot legend-research" />RESEARCH</span>
        <span><i className="legend-dot legend-rejected" />REJECTED RESEARCH</span>
      </div>

      <div className="field-note-card">
        <span>PUBLIC-SAFE STATE MODEL</span>
        <p>Visible structure follows curated public state: building remains incomplete, validation accumulates evidence, and rejected research remains traceable. This is not live telemetry.</p>
      </div>

      {rejected.length ? <span className="sr-only">Rejected research represented in the field: {rejected.map(item => item.title).join(", ")}</span> : null}
    </div>
  );
}
