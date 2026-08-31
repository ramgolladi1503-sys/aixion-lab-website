import { systems, researchNotes } from "@/lib/site-data";

const bandClass = ["band-tradebot", "band-core", "band-automation", "band-analytics"];
const bandY = [120, 205, 300, 390];

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, character => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
  }[character] ?? character));
}

function buildSvgMarkup() {
  const gridX = [100, 200, 300, 400, 500, 600, 700, 800, 900]
    .map(x => `<line x1="${x}" y1="42" x2="${x}" y2="500"></line>`).join("");
  const gridY = [80, 160, 240, 320, 400, 480]
    .map(y => `<line x1="34" y1="${y}" x2="946" y2="${y}"></line>`).join("");

  const bands = systems.map((system, index) => {
    const y = bandY[index];
    const points = [
      [70, y + 34], [150, y + 18], [230, y + 26], [315, y - 8], [390, y + 8],
      [470, y - 18], [555, y + 4], [650, y - 24], [740, y - 5], [825, y - 26], [910, y - 12],
    ];
    const d = `M ${points.map(point => point.join(" ")).join(" L ")}`;
    const circles = points.slice(2).map(([x, py], pointIndex) =>
      `<circle cx="${x}" cy="${py}" r="${pointIndex === 5 ? 6 : 2.8}"></circle>`
    ).join("");
    return `<g class="state-band ${bandClass[index]}">
      <path class="state-band-halo" d="${d}"></path>
      <path class="state-band-line" d="${d}"></path>
      ${circles}
      <circle class="state-band-node" cx="825" cy="${y - 26}" r="12" filter="url(#softGlow)"></circle>
      <text class="state-band-label" x="842" y="${y - 31}">${escapeXml(system.shortName.toUpperCase())}</text>
      <text class="state-band-state" x="842" y="${y - 14}">${escapeXml(system.state)}</text>
    </g>`;
  }).join("");

  const rejectedMarks = [210, 340, 505].map((x, index) =>
    `<g transform="translate(${x} ${[445, 456, 449][index]})"><line x1="-5" y1="-5" x2="5" y2="5"></line><line x1="5" y1="-5" x2="-5" y2="5"></line></g>`
  ).join("");

  const research = researchNotes.slice(0, 3).map((note, index) => {
    const positions = [[355, 235], [515, 350], [270, 430]];
    const [x, y] = positions[index];
    return `<g transform="translate(${x} ${y})"><circle r="5"></circle><circle class="marker-ring" r="14"></circle><title>${escapeXml(note.title)}: ${escapeXml(note.state)}</title></g>`;
  }).join("");

  return `
    <title id="observable-title">Aixion temporal state field</title>
    <desc id="observable-desc">A public-safe visualization of system maturity, current state and research traces. It is illustrative and does not represent private telemetry or invented performance metrics.</desc>
    <defs>
      <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="5" result="blur"></feGaussianBlur>
        <feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
      </filter>
    </defs>
    <g class="field-grid" aria-hidden="true">${gridX}${gridY}</g>
    <g class="temporal-axis" aria-hidden="true">
      <line x1="54" y1="500" x2="920" y2="500"></line>
      <text x="54" y="526">PAST</text><text x="470" y="526">PRESENT</text><text x="855" y="526">NEXT</text>
      <circle cx="650" cy="500" r="5"></circle>
    </g>
    ${bands}
    <g class="rejected-trace">
      <path d="M70 448 C170 410 260 476 360 446 S540 466 620 445"></path>
      ${rejectedMarks}
      <text x="72" y="470">REJECTED RESEARCH REMAINS VISIBLE</text>
    </g>
    <g class="research-markers">${research}</g>
  `;
}

const svgMarkup = buildSvgMarkup();

export function ObservableStateField() {
  return (
    <div className="observable-field" aria-label="Aixion public system state map">
      <svg
        className="observable-field-svg"
        viewBox="0 0 980 560"
        role="img"
        aria-labelledby="observable-title observable-desc"
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />

      <div className="field-legend" aria-label="State legend">
        <span><i className="legend-dot legend-validating" />VALIDATING</span>
        <span><i className="legend-dot legend-building" />BUILDING</span>
        <span><i className="legend-dot legend-research" />RESEARCH</span>
        <span><i className="legend-dot legend-rejected" />REJECTED</span>
      </div>
      <div className="field-explainer">
        <span>WHY DOES THIS FIELD LOOK LIKE THIS?</span>
        <p>Visible structure follows public state. Building remains incomplete. Validation accumulates evidence. Rejected research leaves a trace.</p>
      </div>
    </div>
  );
}
