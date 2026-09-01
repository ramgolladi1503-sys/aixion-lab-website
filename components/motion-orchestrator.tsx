"use client";

import { useEffect, useState, type ReactNode } from "react";

export function MotionOrchestrator({ children }: { children: ReactNode }) {
  const [motionState, setMotionState] = useState<"pending" | "ready" | "reduced">("pending");

  useEffect(() => {
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    let dispose: (() => void) | undefined;

    const initialize = () => {
      if (cancelled) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setMotionState(reduced ? "reduced" : "ready");

      const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      const sectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".system-subnav a[href^='#']"));
      const sections = Array.from(document.querySelectorAll<HTMLElement>(".anchor-section[id]"));

      const activateSection = (id: string) => {
        sectionLinks.forEach(link => {
          const active = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      };

      if (window.location.hash) activateSection(window.location.hash.slice(1));
      else if (sections[0]) activateSection(sections[0].id);

      const onSectionClick = (event: Event) => {
        const link = event.currentTarget as HTMLAnchorElement;
        const href = link.getAttribute("href");
        if (href?.startsWith("#")) activateSection(href.slice(1));
      };
      sectionLinks.forEach(link => link.addEventListener("click", onSectionClick));

      let revealObserver: IntersectionObserver | null = null;
      let sectionObserver: IntersectionObserver | null = null;

      if (reduced) {
        revealTargets.forEach(target => target.classList.add("is-revealed"));
      } else {
        revealObserver = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) return;
              (entry.target as HTMLElement).classList.add("is-revealed");
              revealObserver?.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );
        revealTargets.forEach(target => revealObserver?.observe(target));

        sectionObserver = new IntersectionObserver(
          entries => {
            const visible = entries
              .filter(entry => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            activateSection((visible.target as HTMLElement).id);
          },
          { threshold: [0.15, 0.35, 0.6], rootMargin: "-24% 0px -58% 0px" },
        );
        sections.forEach(section => sectionObserver?.observe(section));
      }

      const resetVisual = (visual: HTMLElement) => {
        visual.style.setProperty("--tilt-x", "0deg");
        visual.style.setProperty("--tilt-y", "0deg");
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const origin = event.target instanceof Element ? event.target : null;
        const visual = origin?.closest<HTMLElement>("[data-motion-visual]");
        if (!visual) return;
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        visual.style.setProperty("--tilt-x", `${(x * 0.9).toFixed(2)}deg`);
        visual.style.setProperty("--tilt-y", `${(y * -0.7).toFixed(2)}deg`);
      };

      const onPointerOut = (event: PointerEvent) => {
        const origin = event.target instanceof Element ? event.target : null;
        const visual = origin?.closest<HTMLElement>("[data-motion-visual]");
        if (!visual) return;
        const next = event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (next && visual.contains(next)) return;
        resetVisual(visual);
      };

      if (!reduced) {
        document.addEventListener("pointermove", onPointerMove, { passive: true });
        document.addEventListener("pointerout", onPointerOut, { passive: true });
      }

      dispose = () => {
        revealObserver?.disconnect();
        sectionObserver?.disconnect();
        sectionLinks.forEach(link => link.removeEventListener("click", onSectionClick));
        if (!reduced) {
          document.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("pointerout", onPointerOut);
        }
      };
    };

    // Keep the initial client render identical to SSR, then enable motion only
    // after hydration has had two painted frames to settle.
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(initialize);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      dispose?.();
    };
  }, []);

  const motionClass = motionState === "pending"
    ? "motion-scope"
    : motionState === "reduced"
      ? "motion-scope motion-ready motion-reduced"
      : "motion-scope motion-ready";

  return <div id="motion-scope" className={motionClass} style={{ display: "contents" }}>{children}</div>;
}
