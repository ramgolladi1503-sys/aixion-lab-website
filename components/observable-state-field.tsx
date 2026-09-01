import { systems, researchNotes } from "@/lib/site-data";

const bands = [
  { cls: "band-tradebot", y: 96 },
  { cls: "band-core", y: 184 },
  { cls: "band-automation", y: 286 },
  { cls: "band-analytics", y: 390 },
] as const;

const points = [88, 170, 260, 350, 445, 540, 640, 735, 835, 920];

function wavePath(y: number, offset: number) {
  const ys = [22, 8, 30, -10, 18, -14, 12, -22, -4, -18];
  return points.map((x, index) => `${index === 0 ? "M" : "L"} ${x} ${y + ys[index] + offset}`).join(" ");
}

export function ObservableStateField() {
  const rejected = researchNotes.filter(note => note.state === "REJECTED");

  return (
    <div className="observable-field observable-field--locked" aria-label="Aixion public temporal system state map">
      <svg className="observable-field-svg" viewBox="0 0 1000 560" role="img" aria-labelledby="observable-title observable-desc">
        <title id="observable-title">Aixion temporal state field</title>
        <desc id="observable-desc">A public-safe visualization of system maturity, validation and research traces. It does not represent private telemetry or invented performance metrics.</desc>
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
          {[180,320,520,655].map((x, index) => <g className="rejected-x" transform={`translate(${x} ${[458,475,461,474][index]})`} key={x}><line x1="-5" y1="-5" x2="5" y2="5"/><line x1="5" y1="-5" x2="-5" y2="5"/></g>)}
          <text x="104" y="508">REJECTED HYPOTHESES</text>
          <text x="104" y="525">REMAIN VISIBLE</text>
        </g>

        <g className="research-markers">
          {researchNotes.slice(0, 3).map((note, index) => {
            const coords = [[342,210],[548,325],[704,446]][index];
            return <g transform={`translate(${coords[0]} ${coords[1]})`} key={note.slug}><circle r="5"/><circle className="marker-ring" r="16"/><title>{note.title}: {note.state}</title></g>;
          })}
        </g>

        <g className="temporal-axis" aria-hidden="true">
          <line x1="70" y1="530" x2="940" y2="530" />
          {[70,250,440,625,810,940].map((x, index) => <g key={x}><circle cx={x} cy="530" r={index === 4 ? 5 : 2.5}/><text x={x - 10} y="552">{["APR","MAY","JUN","JUL","NOW","SEP"][index]}</text></g>)}
        </g>
      </svg>

      <div className="field-legend field-legend--compact" aria-label="Field legend">
        <span><i className="legend-dot legend-validating" />VALIDATING</span>
        <span><i className="legend-dot legend-building" />BUILDING</span>
        <span><i className="legend-dot legend-research" />RESEARCH</span>
        <span><i className="legend-dot legend-rejected" />REJECTED</span>
      </div>

      <div className="field-note-card">
        <span>WHY THIS FIELD LOOKS LIKE THIS</span>
        <p>Visible structure follows public state: building remains incomplete, validation accumulates evidence, and rejected work remains traceable.</p>
      </div>

      {rejected.length ? <span className="sr-only">Rejected research represented in the field: {rejected.map(item => item.title).join(", ")}</span> : null}
    </div>
  );
}
