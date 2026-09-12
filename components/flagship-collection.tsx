"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/content";
import { Architecture } from "./compositions";

/** A single anchored visual frame follows both flagship narratives. */
export function FlagshipCollection({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections =
        root.current?.querySelectorAll<HTMLElement>("section.flagship");
      let next = 0;
      sections?.forEach((section, index) => {
        if (section.getBoundingClientRect().top < innerHeight * 0.55)
          next = index;
      });
      setActive(next);
      const steps = [
        ...(sections?.[next]?.querySelectorAll<HTMLElement>("[data-step]") ??
          []),
      ];
      let stage = 0;
      steps.forEach((step, index) => {
        if (step.getBoundingClientRect().top < innerHeight * 0.62)
          stage = index;
      });
      const nodes = root.current?.querySelectorAll<HTMLElement>(
        `.collection-visual[data-project-index="${next}"] [data-layer]`,
      );
      const completed =
        steps.length > 1
          ? Math.round(
              (stage / (steps.length - 1)) * ((nodes?.length ?? 1) - 1),
            )
          : 0;
      nodes?.forEach((node, index) => {
        node.dataset.active = String(index <= completed);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      className="flagship-collection shell"
      ref={root}
      data-active-project={active}
    >
      <aside className="collection-rail" aria-label="Current flagship system">
        <div className="collection-frame">
          {projects.map((project, index) => (
            <div
              className="collection-visual"
              key={project.slug}
              data-project-index={index}
              data-current={active === index}
              aria-hidden={active !== index}
              inert={active !== index}
            >
              <p className="eyebrow">0{index + 1} / Flagship system</p>
              <h2>{project.name}</h2>
              <p className="status">{project.state}</p>
              <Architecture nodes={project.nodes} kind={project.slug} />
              <Link className="text-link" href={`/work/${project.slug}`}>
                Explore {index ? "Control Tower" : "TradeBot"} →
              </Link>
            </div>
          ))}
        </div>
      </aside>
      <div className="collection-stories">{children}</div>
    </div>
  );
}
