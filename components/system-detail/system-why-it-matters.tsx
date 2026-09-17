import { SystemDetailData } from "@/lib/system-detail-data";

export function SystemWhyItMatters({ data }: { data: SystemDetailData }) {
  const { whyItMatters } = data;

  return (
    <section className="system-why-section" aria-label="Why It Matters">
      <p className="system-why-label">WHY IT MATTERS</p>
      <h2 className="system-why-headline">{whyItMatters.headline}</h2>
      <p className="system-why-body">{whyItMatters.body}</p>
    </section>
  );
}
