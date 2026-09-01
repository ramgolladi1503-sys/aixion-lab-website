"use client";

import { useEffect } from "react";

export function MotionOrchestrator() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let revealObserver: IntersectionObserver | null = null;
    let sectionObserver: IntersectionObserver | null = null;
    let sectionLinks: HTMLAnchorElement[] = [];
    let secondFrame = 0;
    let started = false;

    const activateSection = (id: string) => {
      sectionLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const onSectionClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      if (href?.startsWith("#")) activateSection(href.slice(1));
    };

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

    const startMotion = () => {
      started = true;
      const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      sectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".system-subnav a[href^='#']"));
      const sections = Array.from(document.querySelectorAll<HTMLElement>(".anchor-section[id]"));

      root.classList.add("motion-ready");
      if (reduced) root.classList.add("motion-reduced");

      if (window.location.hash) activateSection(window.location.hash.slice(1));
      else if (sections[0]) activateSection(sections[0].id);

      sectionLinks.forEach(link => link.addEventListener("click", onSectionClick));

      if (reduced) {
        revealTargets.forEach(target => target.classList.add("is-revealed"));
        return;
      }

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

      document.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerout", onPointerOut, { passive: true });
    };

    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(startMotion);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      revealObserver?.disconnect();
      sectionObserver?.disconnect();
      sectionLinks.forEach(link => link.removeEventListener("click", onSectionClick));
      if (started && !reduced) {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerout", onPointerOut);
      }
    };
  }, []);

  return null;
}
