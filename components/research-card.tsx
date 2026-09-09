import Link from "next/link";

type ResearchCardProps = {
  domain: string;
  title: string;
  question: string;
  state: string;
  href: string;
  index?: number;
};

export function ResearchCard({ domain, title, question, state, href, index = 0 }: ResearchCardProps) {
  return (
    <Link className="research-card-modern" href={href} aria-label={`Open research: ${title}`}>
      <div className="research-card-header">
        <span className="research-domain-chip">{domain}</span>
        <span className={`research-state-chip state-${state.toLowerCase().replace(/\s+/g, '-')}`}>
          {state}
        </span>
      </div>
      <h3 className="research-card-title">{title}</h3>
      <p className="research-card-question">{question}</p>
      <div className="research-card-footer">
        <span className="research-card-explore">View research note</span>
        <span className="research-card-arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}
