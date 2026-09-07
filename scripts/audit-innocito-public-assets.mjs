import { writeFile } from "node:fs/promises";

const origin = "https://innocito.com";
const html = await (await fetch(`${origin}/`)).text();
const assets = [...new Set([...html.matchAll(/\/_next\/static\/chunks\/[^" ]+\.(?:css|js)/g)].map(match => match[0]))];

const publicAssets = [];
for (const path of assets) {
  const response = await fetch(`${origin}${path}`);
  if (!response.ok) continue;
  publicAssets.push({ path, text: await response.text() });
}

const source = publicAssets.map(asset => asset.text).join("\n");
const values = {
  easings: [...new Set(source.match(/cubic-bezier\([^)]*\)/g) ?? [])].sort(),
  keyframes: [...new Set([...source.matchAll(/@keyframes\s+([\w-]+)/g)].map(match => match[1]))].sort(),
  durations: [...new Set(source.match(/duration(?:-|:)[0-9]+(?:ms)?/g) ?? [])].sort(),
  autoplayDelays: [...new Set(source.match(/delay:\s*[0-9]+/g) ?? [])].sort(),
  autoplayFlags: [...new Set(source.match(/(?:stopOnInteraction|stopOnFocusIn|stopOnMouseEnter):[^,}]+/g) ?? [])].sort(),
  observerCount: (source.match(/new IntersectionObserver/g) ?? []).length,
};

const report = {
  generatedAt: new Date().toISOString(),
  origin,
  assetCount: publicAssets.length,
  assets: publicAssets.map(asset => asset.path),
  values,
  limitations: [
    "Only browser-visible static assets are inspected.",
    "Private CMS schemas, server timelines, source maps, and unpublished configuration are not observable.",
    "Extracted values are evidence for public behavior, not proof of private implementation identity.",
  ],
};

await writeFile("docs/visual-validation/innocito-public-asset-report.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(`INNOCITO_PUBLIC_ASSET_AUDIT_OK assets=${report.assetCount} easings=${values.easings.length} keyframes=${values.keyframes.length} observers=${values.observerCount}`);
