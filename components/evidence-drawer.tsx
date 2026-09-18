"use client";

import { useRef } from "react";

export function EvidenceDrawer({ title, type, result, scope, authority, proofLabel = "Sanitized public summary" }: {
  title: string;
  type: string;
  result: string;
  scope: string;
  authority: string;
  proofLabel?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  function close() { ref.current?.close(); }

  return (
    <>
      <button className="evidence-trigger" onClick={() => ref.current?.showModal()}>View record ↗</button>
      <dialog className="evidence-dialog" ref={ref} aria-label={`${title} evidence record`} onClick={(event) => { if (event.target === ref.current) close(); }}>
        <aside className="evidence-drawer">
          <div className="evidence-drawer-head">
            <div><p className="eyebrow">EVIDENCE RECORD</p><h2>{title}</h2></div>
            <button className="drawer-close" onClick={close} aria-label="Close evidence">×</button>
          </div>
          <div className="evidence-result-card">
            <span>RESULT / STATE</span><strong>{result}</strong><p>{scope}</p>
          </div>
          <dl className="evidence-detail-list">
            <div><dt>Type</dt><dd>{type}</dd></div>
            <div><dt>Authority</dt><dd>{authority}</dd></div>
            <div><dt>Proof surface</dt><dd>{proofLabel}</dd></div>
          </dl>
          <div className="evidence-proof-placeholder">
            <span>PUBLIC PROOF</span><strong>Proof link intentionally gated until a sanitized public artifact is approved.</strong>
          </div>
          <div className="evidence-boundary-note">
            <strong>Public boundary</strong><p>Private implementation details, credentials, proprietary research mechanics and sensitive runtime data remain outside the website.</p>
          </div>
        </aside>
      </dialog>
    </>
  );
}
