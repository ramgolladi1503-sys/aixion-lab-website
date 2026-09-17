import { SystemDetailData } from "@/lib/system-detail-data";

export function SystemCapabilities({ data }: { data: SystemDetailData }) {
  const { whatItDoes } = data;

  return (
    <section className="system-section-shell" aria-label="System Capabilities">
      <div className="system-capabilities-header">
        <p className="system-section-label">WHAT IT DOES</p>
        <h2 className="system-capabilities-title">{whatItDoes.sectionHeadline}</h2>
      </div>

      <div className="system-capabilities-list">
        {whatItDoes.capabilities.map(item => (
          <div key={item.id} className="system-capability-row">
            <span className="system-capability-num">{item.number}</span>
            <h3 className="system-capability-name">{item.name}</h3>
            <p className="system-capability-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
