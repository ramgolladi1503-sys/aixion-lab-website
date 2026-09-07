import { readFile } from "node:fs/promises";

const report = JSON.parse(await readFile("docs/visual-validation/innocito-public-asset-report.json", "utf8"));
const requiredEasings = [
  "cubic-bezier(.16,1,.3,1)",
  "cubic-bezier(.22,1,.36,1)",
  "cubic-bezier(.33,1,.68,1)",
];
const requiredKeyframes = ["contentReveal", "megaMenuReveal", "megaMenuExit"];
const requiredFlags = ["stopOnInteraction:!1", "stopOnFocusIn:!0"];
const missing = [
  ...requiredEasings.filter(value => !report.values.easings.includes(value)).map(value => `easing:${value}`),
  ...requiredKeyframes.filter(value => !report.values.keyframes.includes(value)).map(value => `keyframe:${value}`),
  ...requiredFlags.filter(value => !report.values.autoplayFlags.includes(value)).map(value => `flag:${value}`),
];

if (missing.length > 0) {
  console.error(`INNOCITO_PUBLIC_CONTRACT_DRIFT missing=${missing.join(",")}`);
  process.exit(1);
}

console.log(`INNOCITO_PUBLIC_CONTRACT_OK generated=${report.generatedAt} assets=${report.assetCount}`);
