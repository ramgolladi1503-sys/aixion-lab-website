import { useEffect, useRef } from 'react';

type ExperienceWorldProps = {
  storyId: string;
};

type IslandProps = {
  x: number;
  y: number;
  scale?: number;
  variant?: 'tower' | 'mountain' | 'dome' | 'research';
  delay?: number;
};

function Island({ x, y, scale = 1, variant = 'tower', delay = 0 }: IslandProps) {
  return (
    <g className="world-island" transform={`translate(${x} ${y}) scale(${scale})`} style={{ ['--island-delay' as string]: `${delay}s` }}>
      <ellipse className="world-island-shadow" cx="0" cy="92" rx="128" ry="32" />
      <path className="world-platform-side" d="M-120 14 L0 -42 L120 14 L120 76 L0 132 L-120 76 Z" />
      <path className="world-platform-edge" d="M-120 14 L0 -42 L120 14 L0 70 Z" />
      <path className="world-platform-top" d="M-110 14 L0 -36 L110 14 L0 64 Z" />
      <path className="world-gold-trace" d="M-86 20 L0 -18 L84 20" />
      <path className="world-gold-trace world-gold-trace-b" d="M-67 52 L0 18 L62 48" />

      {variant === 'mountain' ? (
        <>
          <path className="world-mountain-back" d="M-58 24 L-8 -56 L22 -12 L50 -64 L88 24 Z" />
          <path className="world-mountain-front" d="M-76 36 L-32 -35 L0 7 L30 -52 L76 36 Z" />
          <path className="world-mountain-snow" d="M-33 -33 L-18 -6 L-4 5 L0 7 L9 -8 L29 -50 L40 -20 L49 -5 L58 7" />
          <ellipse className="world-small-dome" cx="54" cy="30" rx="26" ry="11" />
          <ellipse className="world-small-dome-top" cx="54" cy="24" rx="18" ry="8" />
          <line className="world-spire" x1="54" y1="17" x2="54" y2="-18" />
          <circle className="world-spire-node" cx="54" cy="-20" r="4" />
        </>
      ) : (
        <>
          <ellipse className="world-dome-base" cx="0" cy="29" rx="52" ry="21" />
          <ellipse className="world-dome-mid" cx="0" cy="13" rx="42" ry="18" />
          <ellipse className="world-dome-top" cx="0" cy="-1" rx="29" ry="13" />
          <ellipse className="world-dome-glass" cx="0" cy="-9" rx="20" ry="9" />
          <line className="world-spire" x1="0" y1="-17" x2="0" y2="-62" />
          <circle className="world-spire-node" cx="0" cy="-64" r="5" />
          {variant === 'research' && (
            <>
              <circle className="world-orbit" cx="0" cy="2" r="48" />
              <circle className="world-orbit-node" cx="39" cy="-25" r="5" />
            </>
          )}
          {variant === 'dome' && (
            <>
              <ellipse className="world-dome-secondary" cx="-54" cy="41" rx="22" ry="9" />
              <line className="world-spire world-spire-small" x1="-54" y1="34" x2="-54" y2="4" />
              <circle className="world-spire-node" cx="-54" cy="2" r="3.5" />
            </>
          )}
        </>
      )}
    </g>
  );
}

function GlassPanel({ x, y, title, lines }: { x: number; y: number; title: string; lines: string[] }) {
  return (
    <g className="world-glass-panel" transform={`translate(${x} ${y})`}>
      <rect x="-86" y="-64" width="172" height="128" rx="17" />
      <line x1="-66" y1="-38" x2="-20" y2="-38" />
      <text className="world-panel-title" x="-66" y="-15">{title}</text>
      {lines.map((line, index) => <text key={line} className="world-panel-copy" x="-66" y={13 + index * 18}>{line}</text>)}
      <circle className="world-panel-node" cx="64" cy="43" r="4" />
    </g>
  );
}

export default function ExperienceWorld({ storyId }: ExperienceWorldProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const updateProgress = () => {
      const story = document.getElementById(storyId);
      if (!story) return 0;
      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, story.offsetHeight - window.innerHeight);
      return Math.max(0, Math.min(1, -rect.top / distance));
    };

    const render = () => {
      raf = 0;
      pointerX += (targetX - pointerX) * 0.055;
      pointerY += (targetY - pointerY) * 0.055;
      const progress = reduced ? 0.14 : updateProgress();
      host.style.setProperty('--world-progress', progress.toFixed(4));
      host.style.setProperty('--world-pointer-x', pointerX.toFixed(4));
      host.style.setProperty('--world-pointer-y', pointerY.toFixed(4));
      if (!reduced) raf = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (!raf) raf = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reduced || mobile) return;
      const rect = host.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const onScroll = () => start();
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    start();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [storyId]);

  return (
    <div ref={hostRef} className="experience-world experience-world-v3" aria-hidden="true">
      <svg className="experience-world-svg" viewBox="0 0 1600 980" role="presentation" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="worldIvoryTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fffefa" />
            <stop offset="0.55" stopColor="#f5f2ec" />
            <stop offset="1" stopColor="#e9e6df" />
          </linearGradient>
          <linearGradient id="worldIvorySide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8e5df" />
            <stop offset="1" stopColor="#cfcfc9" />
          </linearGradient>
          <linearGradient id="worldAqua" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9f1ef" stopOpacity="0.9" />
            <stop offset="0.52" stopColor="#9fcfce" stopOpacity="0.92" />
            <stop offset="1" stopColor="#6ba9a9" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient id="worldGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.74" />
            <stop offset="0.6" stopColor="#e8f7f5" stopOpacity="0.42" />
            <stop offset="1" stopColor="#cfe9e6" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="worldGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4d69a" />
            <stop offset="0.5" stopColor="#c89d59" />
            <stop offset="1" stopColor="#9b6d30" />
          </linearGradient>
          <radialGradient id="worldCore" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#d8f3ef" />
            <stop offset="1" stopColor="#72acab" stopOpacity="0.34" />
          </radialGradient>
          <filter id="worldShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#6e725f" floodOpacity="0.16" />
          </filter>
          <filter id="worldSoftBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="worldGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <path id="signalPath" d="M420 695 C520 560, 628 620, 725 500 C824 378, 920 430, 1002 318 C1078 214, 1227 250, 1310 382" />
        </defs>

        <g className="world-cloud-layer world-cloud-layer-back">
          <g filter="url(#worldSoftBlur)">
            <ellipse cx="1040" cy="140" rx="300" ry="95" />
            <ellipse cx="1290" cy="215" rx="330" ry="108" />
            <ellipse cx="970" cy="815" rx="370" ry="110" />
            <ellipse cx="1350" cy="760" rx="330" ry="105" />
          </g>
        </g>

        <g className="world-scene" filter="url(#worldShadow)">
          <path className="world-master-side" d="M325 466 L760 258 L1394 454 L1392 647 L935 883 L324 683 Z" />
          <path className="world-master-edge" d="M325 466 L760 258 L1394 454 L935 708 Z" />
          <path className="world-master-top" d="M350 469 L762 280 L1361 458 L934 682 Z" />

          <path className="world-aqua-side" d="M558 484 L794 368 L1199 494 L1199 632 L894 780 L559 671 Z" />
          <path className="world-aqua-edge" d="M558 484 L794 368 L1199 494 L894 650 Z" />
          <path className="world-aqua-top" d="M580 489 L799 389 L1173 503 L892 631 Z" />
          <ellipse className="world-aqua-ripple" cx="892" cy="514" rx="152" ry="55" />
          <ellipse className="world-aqua-ripple world-aqua-ripple-b" cx="892" cy="514" rx="104" ry="38" />
          <ellipse className="world-aqua-ripple world-aqua-ripple-c" cx="892" cy="514" rx="58" ry="22" />
          <circle className="world-core-glow" cx="892" cy="514" r="18" />
          <circle className="world-core" cx="892" cy="514" r="9" />

          <g className="world-map" opacity="0.45">
            <path d="M726 492 C758 470 793 468 820 482 C835 491 833 505 817 511 C796 519 779 516 768 530 C754 547 741 546 726 535 C713 525 710 503 726 492 Z" />
            <path d="M846 462 C871 447 902 445 928 458 C942 465 949 478 941 489 C931 503 910 506 897 513 C879 522 858 516 846 503 C834 491 832 471 846 462 Z" />
            <path d="M959 493 C987 481 1018 489 1034 508 C1046 523 1040 541 1022 547 C1003 552 990 546 976 556 C960 568 942 561 934 546 C924 527 938 503 959 493 Z" />
          </g>

          <g className="world-network">
            <path d="M438 558 C570 520 674 509 770 489" />
            <path d="M1000 374 C1022 419 1040 455 1065 490" />
            <path d="M1195 575 C1127 554 1070 540 1012 527" />
            <path d="M684 733 C744 669 787 626 828 584" />
            <path d="M1082 722 C1040 648 1002 601 961 560" />
          </g>

          <Island x={505} y={420} scale={0.76} variant="mountain" delay={0.2} />
          <Island x={1010} y={300} scale={0.74} variant="mountain" delay={0.8} />
          <Island x={1190} y={492} scale={0.72} variant="dome" delay={1.4} />
          <Island x={514} y={674} scale={0.72} variant="dome" delay={2} />
          <Island x={1095} y={690} scale={0.69} variant="tower" delay={2.6} />
          <Island x={826} y={250} scale={0.67} variant="research" delay={3.2} />

          <g className="world-orb world-orb-a"><line x1="690" y1="350" x2="690" y2="278" /><circle cx="690" cy="269" r="17" /></g>
          <g className="world-orb world-orb-b"><line x1="1262" y1="428" x2="1262" y2="336" /><circle cx="1262" cy="326" r="22" /></g>
          <g className="world-orb world-orb-c"><line x1="1140" y1="745" x2="1140" y2="684" /><circle cx="1140" cy="676" r="13" /></g>

          <GlassPanel x={580} y={245} title="REAL-WORLD" lines={['VERIFICATION', 'evidence before', 'stronger claims']} />
          <GlassPanel x={1160} y={253} title="MODEL CONTROL" lines={['boundaries', 'runtime state', 'inspection']} />
          <GlassPanel x={1210} y={710} title="RELIABILITY" lines={['fail closed', 'recover carefully', 're-verify']} />
          <GlassPanel x={688} y={760} title="EVIDENCE" lines={['what happened', 'stays visible', 'and bounded']} />

          <circle className="world-signal-beacon" r="9" filter="url(#worldGlow)">
            <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
              <mpath href="#signalPath" />
            </animateMotion>
          </circle>
          <circle className="world-signal-beacon-halo" r="22">
            <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
              <mpath href="#signalPath" />
            </animateMotion>
          </circle>
        </g>

        <g className="world-cloud-layer world-cloud-layer-front">
          <g filter="url(#worldSoftBlur)">
            <ellipse cx="430" cy="820" rx="310" ry="90" />
            <ellipse cx="250" cy="688" rx="260" ry="86" />
            <ellipse cx="1355" cy="695" rx="265" ry="84" />
            <ellipse cx="1235" cy="900" rx="330" ry="92" />
          </g>
        </g>
      </svg>
    </div>
  );
}
