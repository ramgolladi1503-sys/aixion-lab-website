import type { Metadata } from "next";
import { Opening, Statement, Opportunity } from "@/components/compositions";
import { EvidenceStrip } from "@/components/evidence";
import { research } from "@/lib/content";

export const metadata: Metadata = { title: "Research" };

const traces = [
  ["Historical signal", "Challenge", "Verdict"],
  ["Classification", "Allowed role", "Execution boundary"],
  ["Live feed", "Freshness check", "Reconciliation"],
  ["Agent request", "Human approval", "Validated action"],
  ["Repository", "Cited retrieval", "Refuse unsupported"],
];

function ResearchTrace({ index, title }: { index: number; title: string }) {
  return (
    <figure className="research-trace" aria-label={`${title} investigation trace`}>
      <figcaption>Investigation trace</figcaption>
      <ol>
        {traces[index].map((step, i) => (
          <li key={step}>
            <span aria-hidden="true">0{i + 1}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export default function Research() {
  return (
    <>
      <Opening
        label="Research"
        title="The goal isn’t to prove an idea right. It’s to find out whether it survives being wrong."
        copy="Investigations into robustness, real-time reliability and controlled AI. Conclusions stay within what the sources support."
      />
      <div className="shell research-jump" aria-label="Research questions">
        {research.map((r) => (
          <a key={r.id} href={`#${r.id}`}>
            {r.title} ↘
          </a>
        ))}
      </div>
      {research.map((r, i) => (
        <section key={r.id} id={r.id} className="research-case shell">
          <div className="research-identity" data-reveal>
            <p className="eyebrow">
              0{i + 1} / {r.title}
            </p>
            <h2>{r.question}</h2>
            <ResearchTrace index={i} title={r.title} />
          </div>
          <div className="research-sequence">
            {[
              ["Initial observation", r.initial],
              ["Method", r.method],
              ["Challenge", r.challenge],
              ["Result", r.result],
            ].map(([label, copy]) => (
              <article key={label} data-reveal>
                <p className="eyebrow">{label}</p>
                <p>{copy}</p>
              </article>
            ))}
            <div className="verdict" data-reveal>
              <p className="eyebrow">Verdict</p>
              <h3>{r.verdict}</h3>
              <p>{r.why}</p>
            </div>
            <EvidenceStrip sources={[r.source]} />
          </div>
        </section>
      ))}
      <Statement>
        A successful backtest is the beginning of validation, not proof of an
        edge.
      </Statement>
      <Opportunity />
    </>
  );
}
