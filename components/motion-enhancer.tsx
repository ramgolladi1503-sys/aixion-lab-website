"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MOTION_CONFIG } from "@/lib/motion-config";

export function MotionEnhancer() {
  const [showTop, setShowTop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, main .section"));
    const visualTargets = Array.from(document.querySelectorAll<HTMLElement>(".art-directed-visual, .lab-field-visual, .journey-quiet-panel, .system-detail-signal"));
    const cardTargets = Array.from(document.querySelectorAll<HTMLElement>(".flip-card"));
    // Mark sections as reveal targets; only the initial viewport is settled immediately below.
    // Later sections remain observable so scroll-linked entrance motion is real rather than decorative.
    sections.forEach(section => section.classList.add("reveal-on-scroll"));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("is-revealed");
    }), { threshold: 0.08, rootMargin: MOTION_CONFIG.reference.viewportRootMargin });
    sections.forEach(section => observer.observe(section));
    visualTargets.forEach(visual => observer.observe(visual));
    cardTargets.forEach(card => observer.observe(card));
    const revealVisible = () => {
      sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 1.08) section.classList.add("is-revealed");
      });
      visualTargets.forEach(visual => {
        if (visual.getBoundingClientRect().top < window.innerHeight * 1.08) visual.classList.add("is-revealed");
      });
      cardTargets.forEach(card => {
        const rect = card.getBoundingClientRect();
        const distanceFromCenter = (rect.top + rect.height / 2 - window.innerHeight / 2) / Math.max(window.innerHeight, 1);
        card.style.setProperty("--card-shift", `${Math.max(-12, Math.min(12, distanceFromCenter * -18))}px`);
      });
    };
    const onScroll = () => {
      revealVisible();
      setShowTop(window.scrollY > window.innerHeight * 0.7);
      document.documentElement.style.setProperty("--scroll-progress", `${Math.min(window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1), 1)}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); document.documentElement.classList.remove("motion-ready"); };
  }, [pathname]);

  return <button type="button" className={`scroll-top ${showTop ? "is-visible" : ""}`} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span aria-hidden="true">↑</span><span>Back to top</span></button>;
}
