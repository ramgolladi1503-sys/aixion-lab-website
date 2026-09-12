import type { Metadata } from "next";
import Link from "next/link";
import { Opening, Layers } from "@/components/compositions";
import { ProgressScene } from "@/components/motion";
import { journey } from "@/lib/content";
export const metadata: Metadata = { title: "Journey" };
export default function Journey() {
  return (
    <>
      <Opening
        label="Journey"
        title="The problems kept getting bigger."
        copy="Testing applications led to automation. Automation led to whole systems. Then came data, research, and a new question about AI: who gets to act?"
      />
      <ProgressScene className="journey-story shell">
        <aside className="journey-sticky">
          <Layers />
          <p className="caption">
            Nothing disappeared.
            <br />
            Capability accumulated.
          </p>
        </aside>
        <div>
          {journey.map(([label, title, line, copy, question], i) => (
            <section
              className="journey-chapter"
              key={title}
              data-step
              data-reveal
              id={`chapter-${i + 1}`}
            >
              <p className="eyebrow">
                0{i + 1} / {label}
              </p>
              <h2>{title}</h2>
              <h3>{line}</h3>
              <p>{copy}</p>
              <div className="transition-question">
                <span className="eyebrow">
                  {i === 5 ? "One continuing question" : "Next question"}
                </span>
                <p>{question}</p>
              </div>
              {i === 5 && (
                <div className="actions">
                  <Link className="button" href="/work">
                    Explore My Work →
                  </Link>
                  <Link className="text-link" href="/resume">
                    View Résumé ↗
                  </Link>
                </div>
              )}
            </section>
          ))}
        </div>
      </ProgressScene>
    </>
  );
}
