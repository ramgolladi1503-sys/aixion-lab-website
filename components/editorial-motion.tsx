"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function EditorialMotion({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = frame.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 12% 0px" });

    root.classList.add("motion-ready");
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    targets.forEach((element) => observer.observe(element));

    let scrollFrame = 0;
    const revealPassedSections = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        for (const element of targets) {
          if (element.classList.contains("is-revealed")) continue;
          if (element.getBoundingClientRect().top <= window.innerHeight * 1.12) {
            element.classList.add("is-revealed");
            observer.unobserve(element);
          }
        }
      });
    };
    window.addEventListener("scroll", revealPassedSections, { passive: true });
    revealPassedSections();

    return () => {
      window.removeEventListener("scroll", revealPassedSections);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return (
    <div className="site-frame" ref={frame}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {children}
    </div>
  );
}
