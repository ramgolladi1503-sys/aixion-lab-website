"use client";
import { containDialogFocus } from "@/lib/dialog-focus";
import { useRef } from "react";
import { evidence } from "@/lib/content";
export function EvidenceButton({
  source,
  label,
}: {
  source: string;
  label?: string;
}) {
  const item = evidence[source];
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={trigger}
        className="evidence-button"
        onClick={() => dialog.current?.showModal()}
      >
        {label || item.title}
        <span aria-hidden="true">↗</span>
      </button>
      <dialog
        onKeyDown={containDialogFocus}
        ref={dialog}
        className="evidence-drawer"
        aria-label={item.title}
        onClose={() => trigger.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const rect = e.currentTarget.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right)
              dialog.current?.close();
          }
        }}
      >
        <div className="drawer-top">
          <span className="eyebrow">Source notes</span>
          <button
            className="text-button"
            onClick={() => dialog.current?.close()}
          >
            Close ×
          </button>
        </div>
        <h2>{item.title}</h2>
        <p className="lead">{item.summary}</p>
        <h3>What the source shows</h3>
        <p>{item.detail}</p>
        <h3>What it does not prove</h3>
        <p>{item.limitation}</p>
        <a className="button" href={item.href} target="_blank" rel="noreferrer">
          {item.label} ↗
        </a>
        <p className="caption">
          Public source, pinned to the revision reviewed on 12 September 2026.
        </p>
      </dialog>
    </>
  );
}
export function EvidenceStrip({ sources }: { sources: string[] }) {
  return (
    <div className="evidence-strip">
      {sources.map((source) => (
        <EvidenceButton key={source} source={source} />
      ))}
    </div>
  );
}
