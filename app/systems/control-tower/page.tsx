import type { Metadata } from "next";
import { systemDetails } from "@/lib/system-detail-data";
import { SystemShowcase } from "@/components/system-detail/system-showcase";

const detail = systemDetails["control-core"];

export const metadata: Metadata = {
  title: `${detail.name} — Aixion Lab`,
  description: detail.hero.proposition,
  openGraph: { title: `${detail.name} — Aixion Lab`, description: detail.hero.summary, images: [detail.hero.image] },
};

export default function ControlTowerPage() {
  return <SystemShowcase data={detail} />;
}
