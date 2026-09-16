"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteMotionDirector() {
  const pathname = usePathname();

  useEffect(() => {
    // Research owns its bespoke choreography; every other route uses this shared director.
    if (pathname === "/research") return;

    const root = document.querySelector<HTMLElement>("body > main > main");
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(root.querySelectorAll<HTMLElement>(":scope > section"));
    const targets: HTMLElement[] = [];

    sections.forEach((section, sectionIndex) => {
      section.classList.add("site-motion-section");
      const children = Array.from(section.children).filter((node): node is HTMLElement => node instanceof HTMLElement);
      children.forEach((child, childIndex) => {
        child.classList.add("site-motion-item");
        child.dataset.siteMotion = child.matches("h1,h2") ? "headline" : child.querySelector("img") ? "media" : "content";
        child.style.setProperty("--site-motion-delay", `${Math.min(childIndex * 105, 315)}ms`);
        child.style.setProperty("--site-motion-direction", `${(sectionIndex + childIndex) % 2 === 0 ? 1 : -1}`);
        targets.push(child);
      });
    });

    if (reduced) {
      targets.forEach(target => target.classList.add("site-motion-visible"));
      return () => targets.forEach(target => {
        target.classList.remove("site-motion-item", "site-motion-visible");
        delete target.dataset.siteMotion;
      });
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) target.classList.add("site-motion-visible");
        else if (entry.boundingClientRect.top > 0 || entry.boundingClientRect.bottom < 0) target.classList.remove("site-motion-visible");
      });
    }, { threshold: 0.14, rootMargin: "-3% 0px -9% 0px" });

    targets.forEach(target => observer.observe(target));
    return () => {
      observer.disconnect();
      targets.forEach(target => {
        target.classList.remove("site-motion-item", "site-motion-visible");
        delete target.dataset.siteMotion;
        target.style.removeProperty("--site-motion-delay");
        target.style.removeProperty("--site-motion-direction");
      });
    };
  }, [pathname]);

  return null;
}
