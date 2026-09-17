"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGETS = [
  "main section > h1",
  "main section > h2",
  "main section > h3",
  "main section > p",
  "main section > ul",
  "main section > ol",
  "main section article",
  "main section figure",
  "main section > img",
  "main section > a",
].join(",");

export function GlobalMotion() {
  const pathname = usePathname();

  useEffect(() => {
    // Research owns its richer, page-specific choreography.
    if (pathname === "/research") return;

    const main = document.querySelector<HTMLElement>("body > main");
    if (!main) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const candidates = Array.from(main.querySelectorAll<HTMLElement>(TARGETS)).filter(el =>
      !el.closest("[data-global-motion='off']") && !el.closest("header, nav, footer")
    );

    // Do not animate nested candidates twice. Preserve each page's locked geometry.
    const targets = candidates.filter(el => !candidates.some(other => other !== el && other.contains(el)));

    targets.forEach((target, index) => {
      target.dataset.globalMotion = "true";
      const section = target.closest("section");
      const siblings = section ? targets.filter(item => item.closest("section") === section) : targets;
      const localOrder = Math.max(0, siblings.indexOf(target));
      target.style.setProperty("--global-motion-delay", `${Math.min(localOrder * 85, 340)}ms`);
      if (reduced) target.classList.add("global-motion-visible");
    });

    if (reduced) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) target.classList.add("global-motion-visible");
        else if (entry.boundingClientRect.top > 0 || entry.boundingClientRect.bottom < 0) target.classList.remove("global-motion-visible");
      });
    }, { threshold: 0.14, rootMargin: "-3% 0px -9% 0px" });

    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
