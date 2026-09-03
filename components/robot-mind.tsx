export function RobotMind() {
  const nodes = [
    [20, 28], [34, 16], [49, 25], [66, 15], [81, 29],
    [26, 47], [43, 43], [58, 48], [75, 43],
    [20, 65], [37, 69], [54, 64], [70, 70], [84, 61],
    [31, 83], [49, 79], [67, 84],
  ];

  return (
    <div className="robot-mind" aria-hidden="true">
      <div className="robot-mind-aura" />
      <div className="robot-mind-orbit robot-mind-orbit--outer" />
      <div className="robot-mind-orbit robot-mind-orbit--mid" />
      <div className="robot-mind-orbit robot-mind-orbit--inner" />
      <svg className="robot-mind-svg" viewBox="0 0 100 100" role="presentation">
        <defs>
          <radialGradient id="mindCore" cx="50%" cy="46%" r="56%">
            <stop offset="0%" stopColor="#e8ffbe" stopOpacity=".96" />
            <stop offset="28%" stopColor="#a8e75c" stopOpacity=".72" />
            <stop offset="68%" stopColor="#68d7c2" stopOpacity=".16" />
            <stop offset="100%" stopColor="#061113" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mindLine" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#a8e75c" stopOpacity=".74" />
            <stop offset="50%" stopColor="#68d7c2" stopOpacity=".44" />
            <stop offset="100%" stopColor="#67a7e8" stopOpacity=".24" />
          </linearGradient>
          <filter id="mindGlow">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <ellipse className="robot-mind-halo" cx="51" cy="51" rx="34" ry="39" fill="url(#mindCore)" />
        <path className="robot-skull-line robot-skull-line--one" d="M26 75C17 61 17 37 31 22C43 9 66 11 78 25C90 39 89 62 75 76C66 85 58 88 48 87C37 86 31 82 26 75Z" />
        <path className="robot-skull-line robot-skull-line--two" d="M34 78C27 66 26 42 38 28C48 17 65 18 74 31C82 43 80 61 70 72C61 81 45 84 34 78Z" />
        <path className="robot-face-axis" d="M50 20L50 80" />
        <path className="robot-face-axis" d="M29 49L77 49" />

        <g className="mind-connections" stroke="url(#mindLine)" strokeWidth=".42" fill="none">
          <path d="M20 28L34 16L49 25L66 15L81 29" />
          <path d="M20 28L26 47L43 43L49 25" />
          <path d="M49 25L58 48L75 43L81 29" />
          <path d="M26 47L20 65L37 69L43 43L54 64" />
          <path d="M58 48L54 64L70 70L75 43L84 61" />
          <path d="M20 65L31 83L49 79L37 69" />
          <path d="M54 64L49 79L67 84L70 70L84 61" />
          <path d="M43 43L58 48L54 64" />
        </g>

        <g className="mind-nodes" filter="url(#mindGlow)">
          {nodes.map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r={index % 4 === 0 ? 1.05 : .7} />
          ))}
        </g>

        <g className="robot-eyes">
          <path d="M31 47C36 43 41 43 46 47C41 51 36 51 31 47Z" />
          <path d="M55 47C60 43 65 43 70 47C65 51 60 51 55 47Z" />
        </g>
        <path className="robot-jaw" d="M38 67C44 72 56 72 63 67" />
      </svg>

      <div className="robot-mind-status robot-mind-status--a"><span>01</span><strong>STATE</strong><small>observable</small></div>
      <div className="robot-mind-status robot-mind-status--b"><span>02</span><strong>EVIDENCE</strong><small>traceable</small></div>
      <div className="robot-mind-status robot-mind-status--c"><span>03</span><strong>AUTHORITY</strong><small>bounded</small></div>
      <div className="robot-mind-caption"><span>GOVERNED INTELLIGENCE CORE</span><i /></div>
    </div>
  );
}
