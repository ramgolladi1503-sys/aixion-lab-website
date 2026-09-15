import type { Metadata } from "next";
import { systemDetails } from "@/lib/system-detail-data";
import { SystemHero } from "@/components/system-detail/system-hero";
import { SystemProblem } from "@/components/system-detail/system-problem";
import { SystemCapabilities } from "@/components/system-detail/system-capabilities";
import { SystemHowItWorks } from "@/components/system-detail/system-how-it-works";
import { SystemWhyItMatters } from "@/components/system-detail/system-why-it-matters";
import { SystemCurrentState } from "@/components/system-detail/system-current-state";
import { SystemNextSteps } from "@/components/system-detail/system-next-steps";

const detail = systemDetails["control-core"];

export const metadata: Metadata = {
  title: `${detail.name} — Aixion Lab`,
  description: detail.hero.proposition,
  openGraph: {
    title: `${detail.name} — Aixion Lab`,
    description: detail.hero.summary,
    images: [detail.hero.image],
  },
};

export default function ControlTowerPage() {
  return (
    <article className="system-detail-container" aria-label={`${detail.name} Specification`}>
      <SystemHero data={detail} />
      <SystemProblem data={detail} />
      <SystemCapabilities data={detail} />
      <SystemHowItWorks data={detail} />
      <SystemWhyItMatters data={detail} />
      <SystemCurrentState data={detail} />
      <SystemNextSteps data={detail} />
    </article>
  );
}
