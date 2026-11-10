import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const sourceRoot = join(root, "public", "redesign");
const exportRoot = join(root, "out");

const pages = new Map([
  ["index.html", "/"],
  ["about.html", "/about"],
  ["work.html", "/work"],
  ["research.html", "/research"],
  ["journey.html", "/journey"],
  ["pulse.html", "/pulse"],
  ["resume.html", "/resume"],
  ["systems-tradebot.html", "/systems/tradebot"],
  ["systems-control-core.html", "/systems/control-core"],
  ["systems-automation.html", "/systems/automation"],
  ["systems-analytics.html", "/systems/analytics"],
  ["research-evidence-bound-autonomy.html", "/research/evidence-bound-autonomy"],
  ["research-mean-reversion-candidate.html", "/research/mean-reversion-candidate"],
  ["research-opening-session-market-structure.html", "/research/opening-session-market-structure"],
  ["research-rec-md-structural-interaction.html", "/research/rec-md-structural-interaction"],
]);

const descriptions = new Map([
  ["index.html", "Aixion Lab builds applied engineering systems across software, automation, data and research."],
  ["about.html", "Meet Ram Golladi and the engineering practice behind Aixion Lab."],
  ["work.html", "Explore Aixion Lab projects in market intelligence, governed automation and decision support."],
  ["research.html", "Research questions, current states and evidence boundaries from Aixion Lab."],
  ["journey.html", "Follow the engineering progression from quality engineering to autonomous systems."],
  ["pulse.html", "A dated snapshot of project states, current focus and next gates at Aixion Lab."],
  ["resume.html", "Career snapshot and engineering experience from Ram Golladi."],
]);

const availableFiles = new Set(await readdir(sourceRoot));
for (const asset of ["aixion_content.css", "kirifuda.css", "kirifuda_theme_dark.css", "favicon.svg", "subpage-motion.js", "subpage-refinements.css", "editorial-parity.css", "gsap.min.js", "ScrollTrigger.min.js"]) {
  if (!availableFiles.has(asset)) throw new Error(`Required redesign asset is missing: ${join(sourceRoot, asset)}`);
}

for (const [fileName, route] of pages) {
  if (!availableFiles.has(fileName)) {
    throw new Error(`Required redesign source is missing: ${join(sourceRoot, fileName)}`);
  }

  let html = await readFile(join(sourceRoot, fileName), "utf8");
  html = rewriteInternalLinks(html, fileName);
  html = html.replace(/(href|src)="\.\/([^"#?]+\.(?:css|js|png|jpe?g|webp|svg|woff2?)(?:\?[^"#]*)?(?:#[^"]*)?)"/gi, '$1="/redesign/$2"');
  html = html.replaceAll('href="/resume.pdf"', 'href="/Ram-Golladi-Resume.pdf"');
  html = html.replaceAll('href="/work/tradebot"', 'href="/systems/tradebot"');
  html = html.replace(/ aria-label="Aixion Lab home"/g, "");
  html = html.replace(/ aria-label="AIXION LAB Applied systems engineering"/g, "");

  // Embedded source styles hide direct nav links on mobile with !important.
  // Append a scoped correction on inner pages only; leave the locked home out.
  if (fileName !== "index.html") {
    html = html.replace(
      "</head>",
      '  <style>@media (max-width:860px){body.editorial-page .site-header .desktop-nav{display:flex!important}}</style>\n</head>',
    );
  }
  html = html.replace(
    "</head>",
    `  <style id="production-readability-overrides">
      .site-footer__subline, .site-footer__desc, .site-footer__copy, .site-footer__process,
      .site-footer__base, .site-footer__badge { color: #94a3b8 !important; }
      .site-footer__links a { color: #b7c4d3 !important; }
      #works .section_heading_sub, #works .row_meta_label, #works .row_sub,
      #works .row_desc, #orchestration .section_heading_sub, #research .section_heading_sub,
      #contact .side_desc, #contact .contact-copy p { color: #a3a3a3 !important; }
      #contact .side_sub { color: #b5b5b5 !important; }
      #full_content p[style*="#666666"] { color: #a3a3a3 !important; }
      #sentinel .scope_notice { color: #a3a3a3 !important; }
      #timeline > div > span { color: #a3a3a3 !important; }
    </style>\n</head>`,
  );

  const description = descriptions.get(fileName) ?? `${titleFrom(html)}. Public overview and evidence.`;
  const canonical = `https://aixionlab.com${route === "/" ? "/" : route}`;
  html = upsertMeta(html, "description", description);
  html = upsertCanonical(html, canonical);

  const outputPath = route === "/" ? join(exportRoot, "index.html") : join(exportRoot, `${route.slice(1)}.html`);
  await writeFileWithParents(outputPath, html);
  if (route !== "/") {
    await writeFileWithParents(join(exportRoot, route.slice(1), "index.html"), html);
  }
}

// Older links used flat .html filenames for system and research detail pages.
// Keep those URLs available with canonical metadata pointing at their current route.
for (const [fileName, route] of pages) {
  if (!fileName.startsWith("systems-") && !fileName.startsWith("research-")) continue;
  const html = await readFile(join(sourceRoot, fileName), "utf8");
  const alias = await readFile(join(exportRoot, `${route.slice(1)}.html`), "utf8");
  await writeFileWithParents(join(exportRoot, fileName), alias || html);
}

// Keep route ownership auditable from the same map that produces the public pages.
// Paths are deliberately relative to the repository (source) and export root (outputs).
const manifestRoutes = [...pages].map(([fileName, route]) => {
  const routePath = route === "/" ? "" : route.slice(1);
  const outputs = route === "/"
    ? ["index.html"]
    : [`${routePath}.html`, `${routePath}/index.html`];
  const legacyAlias = fileName.startsWith("systems-") || fileName.startsWith("research-")
    ? fileName
    : undefined;

  return {
    source: `public/redesign/${fileName}`,
    route,
    outputs,
    ...(legacyAlias ? { legacyAlias } : {}),
  };
});
await writeFileWithParents(
  join(exportRoot, "redesign-manifest.json"),
  `${JSON.stringify({ schemaVersion: 1, routes: manifestRoutes }, null, 2)}\n`,
);

// Old preview URLs remain usable while search engines and visitors receive the canonical route.
for (const [fileName, route] of pages) {
  await writeFileWithParents(join(exportRoot, "redesign", fileName), redirectPage(route, fileName));
}

// Retire duplicate App routes that otherwise expose a second, inconsistent navigation system.
for (const [fileName, redirectTo, canonicalRoute] of [
  ["systems.html", "/work", "/work"],
  ["collaborate.html", "/about#contact", "/about"],
]) {
  const redirect = redirectPage(redirectTo, fileName, canonicalRoute);
  await writeFileWithParents(join(exportRoot, fileName), redirect);
  const directory = fileName.replace(/\.html$/, "");
  await writeFileWithParents(join(exportRoot, directory, "index.html"), redirect);
}

const sitemapEntries = [...new Set(pages.values())].map((route) => {
  const location = `https://aixionlab.com${route === "/" ? "/" : route}`;
  return `  <url><loc>${location}</loc></url>`;
}).join("\n");
await writeFileWithParents(join(exportRoot, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`);
const redirectRules = [
  "/systems /work 301!",
  "/systems/ /work 301!",
  "/collaborate /about#contact 301!",
  "/collaborate/ /about#contact 301!",
  ...[...pages].filter(([fileName]) => fileName.endsWith(".html")).map(([fileName, route]) => `/redesign/${fileName} ${route} 301!`),
].join("\n");
await writeFileWithParents(join(exportRoot, "_redirects"), `${redirectRules}\n`);

async function writeFileWithParents(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content);
}

function rewriteInternalLinks(html, sourceName) {
  return html.replace(/href="\.\/([a-z0-9-]+\.html)(#[^"]*)?"/gi, (_match, target, hash = "") => {
    const targetRoute = pages.get(target);
    if (!targetRoute) throw new Error(`Unmapped internal page link in ${sourceName}: ${target}`);
    return `href="${targetRoute}${hash}"`;
  });
}

function titleFrom(html) {
  return html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "Aixion Lab";
}

function upsertMeta(html, name, content) {
  const tag = `<meta name="${name}" content="${content}">`;
  const pattern = new RegExp(`<meta\\s+name="${name}"[^>]*>`, "i");
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n</head>`);
}

function upsertCanonical(html, canonical) {
  const tag = `<link rel="canonical" href="${canonical}">`;
  const pattern = /<link\s+rel="canonical"[^>]*>/i;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n</head>`);
}

function redirectPage(route, fileName, canonicalRoute = route) {
  const title = fileName.replace(/\.html$/, "").replaceAll("-", " ");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><link rel="canonical" href="https://aixionlab.com${canonicalRoute}"><meta http-equiv="refresh" content="0;url=${route}"><title>Continue to Aixion Lab</title></head><body><p>Continue to <a href="${route}">${title}</a>.</p></body></html>`;
}
