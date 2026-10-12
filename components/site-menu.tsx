"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const destinations = [
  { number: "01", label: "The Lab", detail: "A practice built around evidence", href: "/about" },
  { number: "02", label: "Selected Work", detail: "Systems and what they do", href: "/work" },
  { number: "03", label: "Research", detail: "Questions, tests and findings", href: "/research" },
  { number: "04", label: "Approach", detail: "How the work is done", href: "/journey" },
] as const;

export function SiteMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`site-menu${open ? " is-open" : ""}`} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="site-menu__trigger"
        aria-expanded={open}
        aria-controls="site-menu-panel"
        onClick={() => setOpen(value => !value)}
      >
        <span className="site-menu__icon" aria-hidden="true"><i /><i /></span>
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <nav id="site-menu-panel" className="site-menu__panel" aria-label="Explore Aixion Lab" aria-hidden={!open} inert={!open}>
        <div className="site-menu__items">
          {destinations.map(item => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href || (item.href === "/work" && pathname.startsWith("/systems/")) ? "page" : undefined}
            >
              <span className="site-menu__number">{item.number}</span>
              <span className="site-menu__label">{item.label}</span>
              <span className="site-menu__detail">{item.detail}</span>
              <span className="site-menu__arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
