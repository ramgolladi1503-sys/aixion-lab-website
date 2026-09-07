"use client";

import { useMemo, useState } from "react";
import { researchNotes } from "@/lib/site-data";
import { FlipCard } from "./flip-card";

const filters = ["ALL", "ACTIVE", "VALIDATING", "VALIDATED", "REJECTED", "ARCHIVED"] as const;

export function ResearchIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");

  const visible = useMemo(() => {
    if (filter === "ALL") return researchNotes;
    return researchNotes.filter(note => note.state.includes(filter));
  }, [filter]);

  return (
    <>
      <div className="tabs research-filters" aria-label="Research status filters">
        {filters.map(item => (
          <button
            className={`tab ${filter === item ? "active" : ""}`}
            key={item}
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
          >
            {item[0] + item.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <div className="research-list" aria-live="polite">
        {visible.length ? (
          <div className="flip-card-deck research-index-card-deck">
            {visible.map((note, index) => (
              <FlipCard
                key={note.slug}
                index={index}
                eyebrow={note.domain}
                title={note.title}
                front={note.question}
                backLabel={note.state}
                back={note.question}
                state={note.state}
                href={`/research/${note.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="detail-card">
            <h3>No public notes in this state yet.</h3>
            <p>The filter is working; Aixion does not invent research records to fill an empty category.</p>
          </div>
        )}
      </div>
    </>
  );
}
