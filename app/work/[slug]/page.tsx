import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Opening, Flagship } from "@/components/compositions";
import { projects } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: projects.find((p) => p.slug === slug)?.name || "Work" };
}
export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  return (
    <>
      <Opening label={`Work / ${p.name}`} title={p.subtitle} copy={p.intro} />
      <Flagship project={p} index={index} detail />
      <section className="next-project shell">
        <p className="eyebrow">Continue exploring</p>
        <h2>{projects[1 - index].name}</h2>
        <Link className="text-link" href={`/work/${projects[1 - index].slug}`}>
          Explore the next system →
        </Link>
      </section>
    </>
  );
}
