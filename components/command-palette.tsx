"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const items = [
  ["TradeBot", "/systems/tradebot", "System", "VALIDATING"],
  ["Aixion Control Core", "/systems/control-core", "System", "BUILDING"],
  ["Automation Systems", "/systems/automation", "System", "BUILDING"],
  ["Analytics Lab", "/systems/analytics", "System", "RESEARCH"],
  ["Research Notes", "/research", "Research", "ACTIVE + REJECTED"],
  ["Aixion Pulse", "/pulse", "Now", "CURRENT STATE"],
  ["Journey", "/journey", "Story", "7 QUESTIONS"],
  ["About Ram", "/about", "Profile", "ENGINEER"],
  ["Career Snapshot", "/resume", "Career", "LIVE WEB"],
] as const;

export function CommandPalette() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter(item => `${item[0]} ${item[2]} ${item[3]}`.toLowerCase().includes(normalized));
  }, [query]);

  function open() { dialogRef.current?.showModal(); setActiveIndex(0); requestAnimationFrame(() => inputRef.current?.focus()); }
  function close() { dialogRef.current?.close(); setQuery(""); setActiveIndex(0); }

  useEffect(() => setActiveIndex(0), [query]);
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

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex(index => visible.length ? (index + 1) % visible.length : 0); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex(index => visible.length ? (index - 1 + visible.length) % visible.length : 0); }
    if (event.key === "Enter" && visible[activeIndex]) { event.preventDefault(); const href = visible[activeIndex][1]; close(); router.push(href); }
    if (event.key === "Escape") close();
  }

  return (
    <>
      <button className="command-trigger" onClick={open} aria-label="Open Aixion command palette">⌘K</button>
      <dialog className="command-dialog" ref={dialogRef} aria-label="Search Aixion" onClick={(event) => { if (event.target === dialogRef.current) close(); }}>
        <div className="command-box">
          <div className="command-head">
            <span>Search Aixion</span><span className="command-hint">↑↓ select · Enter open · Esc close</span><button onClick={close} aria-label="Close command palette">Esc</button>
          </div>
          <input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} onKeyDown={onInputKeyDown} placeholder="Systems, research, evidence…" aria-label="Search Aixion pages" />
          <div className="command-results" aria-label="Aixion destinations">
            {visible.map(([label, href, category, state], index) => (
              <Link href={href} key={href} onClick={close} className={index === activeIndex ? "active" : ""} aria-current={index === activeIndex ? "true" : undefined}>
                <strong>{label}</strong><span className="command-meta">{category}<em>· {state}</em></span>
              </Link>
            ))}
            {!visible.length ? <p>No matching public page.</p> : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
