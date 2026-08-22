"use client";

import { useRef } from "react";

export function EvidenceDrawer({ title, type, result, scope, authority }: {
  title: string;
  type: string;
  result: string;
  scope: string;
  authority: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  function close() {
    ref.current?.close();
  }

  return (
    <>
      <button className="evidence-trigger" onClick={() => ref.current?.showModal()}>View record ↗</button>
      <dialog className="evidence-dialog" ref={ref} onClick={(event) => { if (event.target === ref.current) close(); }}>
        <aside className="evidence-drawer" aria-label={`${title} evidence`}>
          <div className="evidence-drawer-head">
            <div>
              <p className="eyebrow">EVIDENCE RECORD</p>
              <h2>{title}</h2>
            </div>
            <button onClick={close} aria-label="Close evidence">Close</button>
          </div>
          <dl className="evidence-detail-list">
            <div><dt>Type</dt><dd>{type}</dd></div>
            <div><dt>Result / state</dt><dd>{result}</dd></div>
            <div><dt>Scope</dt><dd>{scope}</dd></div>
            <div><dt>Authority</dt><dd>{authority}</dd></div>
          </dl>
          <div className="evidence-boundary-note">
            <strong>Public boundary</strong>
            <p>This drawer intentionally exposes only a sanitized evidence summary. Private implementation details, credentials, proprietary research mechanics and sensitive runtime data remain outside the website.</p>
          </div>
        </aside>
      </dialog>
    </>
  );
}
