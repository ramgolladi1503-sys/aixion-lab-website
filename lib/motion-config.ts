export const MOTION_CONFIG = {
  hero: {
    autoAdvanceMs: 3000,
    copyEnterMs: 500,
    visualEnterMs: 650,
  },
  route: {
    settleMs: 1500,
  },
  reveal: {
    durationMs: 750,
    viewportLead: 1.08,
  },
  menu: { openMs: 500, closeMs: 300, offsetPx: 10 },
  interaction: { quickMs: 300, luxeMs: 500 },
  reference: {
    smooth: "cubic-bezier(.16,1,.3,1)",
    standard: "cubic-bezier(.4,0,.2,1)",
    heroRevealMs: 1500,
    sectionRevealMs: 700,
    viewportRootMargin: "0px 0px -12% 0px",
    autoplayDefaultMs: 4000,
    carouselAutoplayMs: 3000,
    carouselStopOnInteraction: false,
    cardVariant: { offsetPx: 30, durationMs: 700, delayMs: 200, easing: "ease-in-out" },
  },
  easing: {
    premium: "cubic-bezier(.33,1,.68,1)",
    luxe: "cubic-bezier(.22,1,.36,1)",
  },
} as const;
