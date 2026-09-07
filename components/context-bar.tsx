"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const context = (pathname: string) => {
  if (pathname === "/systems") return { label: "systems", root: "/", links: [["TradeBot", "/systems/tradebot"], ["Control Core", "/systems/control-core"], ["Automation", "/systems/automation"], ["Analytics", "/systems/analytics"]] };
  if (pathname === "/research") return { label: "research", root: "/", links: [["Opening session", "/research/opening-session-market-structure"], ["REC-MD", "/research/rec-md-structural-interaction"], ["Mean reversion", "/research/mean-reversion-candidate"], ["Evidence-bound autonomy", "/research/evidence-bound-autonomy"]] };
  const system = pathname.match(/^\/systems\/([^/]+)/)?.[1];
  if (system) return { label: system.replaceAll("-", " "), root: "/systems", links: [["Overview", `/systems/${system}`], ["Evidence", `/systems/${system}#evidence`], ["Registry", "/systems"]] };
  const research = pathname.match(/^\/research\/([^/]+)/)?.[1];
  if (research) return { label: research.replaceAll("-", " "), root: "/research", links: [["Note", `/research/${research}`], ["Research index", "/research"], ["Pulse", "/pulse"]] };
  return null;
};

export function ContextBar() {
  const pathname = usePathname();
  const value = context(pathname);
  if (!value) return null;
  const rootLabel = value.root === "/" ? "Home" : value.root === "/systems" ? "Systems" : "Research";
  return <aside className="context-bar" aria-label="Page context"><div className="shell context-bar-inner"><Link href={value.root} className="context-root">← {rootLabel}</Link><span className="context-current">{value.label}</span><nav aria-label="Context navigation">{value.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></div></aside>;
}
