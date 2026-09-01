"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { researchNotes } from "@/lib/site-data";
import { StateTag } from "./ui";

const filters = ["ALL", "ACTIVE", "VALIDATING", "VALIDATED", "REJECTED", "ARCHIVED"] as const;

export function ResearchIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");

  const visible = useMemo(() => {
    if (filter === "ALL") return researchNotes;
    return researchNotes.filter(note => note.state.includes(filter));
  }, [filter]);

  return (
    <>
      <div className="tabs" aria-label="Research status filters">
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
        {visible.length ? visible.map(note => (
          <Link className="research-row" href={`/research/${note.slug}`} key={note.slug}>
            <div>
              <h3>{note.title}</h3>
              <p>{note.question}</p>
              <p className="research-state-reason"><span>Why this state</span>{note.stateReason}</p>
            </div>
            <span className="research-domain">{note.domain}</span>
            <StateTag state={note.state} />
          </Link>
        )) : (
          <div className="detail-card">
            <h3>No public notes in this state yet.</h3>
            <p>The filter is working; Aixion does not invent research records to fill an empty category.</p>
          </div>
        )}
      </div>
    </>
  );
}
