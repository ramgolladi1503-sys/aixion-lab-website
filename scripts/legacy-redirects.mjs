import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
const redirects = {
  "/systems": "/work",
  "/systems/tradebot": "/work/tradebot",
  "/systems/control-core": "/work/control-tower",
  "/systems/automation": "/work",
  "/systems/analytics": "/work",
  "/pulse": "/research",
  "/collaborate": "/contact",
  "/research/evidence-bound-autonomy": "/research#human-controlled-ai",
  "/research/mean-reversion-candidate": "/research#strategy-robustness",
  "/research/opening-session-market-structure": "/research#strategy-robustness",
  "/research/rec-md-structural-interaction": "/research#regime-architecture",
};
for (const [from, to] of Object.entries(redirects)) {
  const file = resolve("out", "." + from + ".html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${to}"><link rel="canonical" href="https://aixionlab.com${to}"><title>Page moved — Aixion Lab</title></head><body><main><h1>This page has moved.</h1><p><a href="${to}">Continue to Aixion Lab</a></p></main></body></html>`,
  );
}
console.log(
  `Generated ${Object.keys(redirects).length} portable compatibility redirects.`,
);
