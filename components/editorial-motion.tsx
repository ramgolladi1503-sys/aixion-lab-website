"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export function EditorialMotion({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = frame.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sectionLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>(".system-subnav a[href^='#']"));
    const sections = sectionLinks
      .map((link) => document.getElementById(link.hash.slice(1)))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);
    const activateSection = (id: string) => {
      sectionLinks.forEach((link) => {
        const active = link.hash === `#${id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    let requestedSection: string | undefined;
    let activeSectionFrame = 0;
    const updateActiveSection = () => {
      activeSectionFrame = 0;
      if (!sections.length) return;

      const activationLine = window.innerHeight * 0.36;
      if (requestedSection) {
        const requestedTarget = sections.find((section) => section.id === requestedSection);
        if (requestedTarget && requestedTarget.getBoundingClientRect().top > activationLine) return;
        requestedSection = undefined;
      }

      let active = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top > activationLine) break;
        active = section;
      }
      activateSection(active.id);
    };
    const onScroll = () => {
      if (activeSectionFrame) return;
      activeSectionFrame = window.requestAnimationFrame(updateActiveSection);
    };
    const activateFromHash = () => {
      const id = window.location.hash.slice(1);
      if (sections.some((section) => section.id === id)) {
        requestedSection = id;
        activateSection(id);
      } else {
        requestedSection = undefined;
        updateActiveSection();
      }
    };
    const onSectionClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      requestedSection = link.hash.slice(1);
      activateSection(requestedSection);
    };

    if (window.location.hash) activateFromHash();
    else updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", activateFromHash);
    sectionLinks.forEach((link) => link.addEventListener("click", onSectionClick));

    const cleanupSectionTracking = () => {
      if (activeSectionFrame) window.cancelAnimationFrame(activeSectionFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", activateFromHash);
      sectionLinks.forEach((link) => link.removeEventListener("click", onSectionClick));
    };
    if (reduceMotion.matches) return cleanupSectionTracking;

    root.classList.add("motion-ready");

    if (!("IntersectionObserver" in window)) {
      const revealAll = () => root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => element.classList.add("is-revealed"));
      revealAll();
      return () => {
        cleanupSectionTracking();
        root.classList.remove("motion-ready");
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 12% 0px" });

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    targets.forEach((element) => observer.observe(element));
    const heroImage = root.querySelector<HTMLElement>(".home-hero__image, .editorial-hero__image");

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

        if (heroImage) {
          const hero = heroImage.parentElement;
          if (hero) {
            const bounds = hero.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0, -bounds.top / bounds.height));
            heroImage.style.setProperty("--hero-drift", `${Math.round(progress * -34)}px`);
          }
        }
      });
    };
    window.addEventListener("scroll", revealPassedSections, { passive: true });
    revealPassedSections();

    return () => {
      cleanupSectionTracking();
      window.removeEventListener("scroll", revealPassedSections);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return (
    <div className="site-frame" ref={frame}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {children}
    </div>
  );
}
