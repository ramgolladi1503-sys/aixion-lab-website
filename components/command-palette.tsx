"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const items = [
  ["TradeBot", "/systems/tradebot", "System"],
  ["Aixion Control Core", "/systems/control-core", "System"],
  ["Automation Systems", "/systems/automation", "System"],
  ["Analytics Lab", "/systems/analytics", "System"],
  ["Research Notes", "/research", "Research"],
  ["Aixion Pulse", "/pulse", "Now"],
  ["Journey", "/journey", "Story"],
  ["About Ram", "/about", "Profile"],
  ["Career Snapshot", "/resume", "Career"],
] as const;

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter(item => `${item[0]} ${item[2]}`.toLowerCase().includes(normalized));
  }, [query]);

  function open() {
    dialogRef.current?.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function close() {
    dialogRef.current?.close();
    setQuery("");
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) close(); else open();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button className="command-trigger" onClick={open} aria-label="Open Aixion command palette">⌘K</button>
      <dialog className="command-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) close(); }}>
        <div className="command-box">
          <div className="command-head">
            <span>Search Aixion</span>
            <button onClick={close} aria-label="Close command palette">Esc</button>
          </div>
          <input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Systems, research, evidence…" aria-label="Search Aixion pages" />
          <div className="command-results">
            {visible.map(([label, href, category]) => (
              <Link href={href} key={href} onClick={close}>
                <strong>{label}</strong>
                <span>{category}</span>
              </Link>
            ))}
            {!visible.length ? <p>No matching public page.</p> : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
