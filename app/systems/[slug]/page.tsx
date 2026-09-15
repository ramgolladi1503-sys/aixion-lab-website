import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { systems } from "@/lib/site-data";
import { systemDetails } from "@/lib/system-detail-data";
import { SystemShowcase } from "@/components/system-detail/system-showcase";

export function generateStaticParams() {
  return systems.map(system => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detail = systemDetails[slug];
  if (!detail) return {};
  return {
    title: `${detail.name} — Aixion Lab`,
    description: detail.hero.proposition,
    openGraph: { title: `${detail.name} — Aixion Lab`, description: detail.hero.summary, images: [detail.hero.image] },
  };
}

export default async function SystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = systemDetails[slug];
  if (!detail) notFound();
  return <SystemShowcase data={detail} />;
}
