import type { Metadata } from "next";
import {
  Opening,
  Flagship,
  Opportunity,
  SectionTitle,
} from "@/components/compositions";
import { EvidenceStrip } from "@/components/evidence";
import { projects } from "@/lib/content";
export const metadata: Metadata = { title: "Work" };
export default function Work() {
  return (
    <>
      <Opening
        label="Work"
        title="Systems are more interesting when you can inspect how they were built."
        copy="Two flagship systems. The problems, architecture, failures and lessons behind them."
      />
      {projects.map((p, i) => (
        <Flagship key={p.slug} project={p} index={i} />
      ))}
      <section className="section shell">
        <SectionTitle
          label="Supporting engineering"
          title="Tools that make the work inspectable."
        />
        <div className="capabilities three">
          <article data-reveal>
            <h3>Evidence RAG</h3>
            <p>
              Local, citation-first retrieval for engineering decisions.
              Extractive answers with explicit refusal when sources are
              insufficient.
            </p>
          </article>
          <article data-reveal>
            <h3>Approval workflows</h3>
            <p>
              Mobile review, connector scope and validation before software
              changes advance to a pull request.
            </p>
          </article>
          <article data-reveal>
            <h3>Research infrastructure</h3>
            <p>
              Historical data workflows, walk-forward evaluation, replay
              diagnostics and experiment reports.
            </p>
          </article>
        </div>
        <EvidenceStrip sources={["rag", "tower", "tradebot"]} />
      </section>
      <Opportunity />
    </>
  );
}
