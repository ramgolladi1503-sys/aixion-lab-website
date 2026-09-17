"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type MotionSpec = { selector: string; variant: string; stagger?: number };

const PAGE_SPECS: Array<{ match: (path: string) => boolean; specs: MotionSpec[] }> = [
  { match:p=>p==="/systems", specs:[
    {selector:".mock-systems-intro > div:first-child",variant:"headline"},{selector:".mock-systems-intro > p",variant:"copy",stagger:110},{selector:".mock-systems-intro .premium-context-rail",variant:"rail"},{selector:".mock-group-title-row",variant:"section"},{selector:".mock-project-card",variant:"card",stagger:110},
  ]},
  { match:p=>p==="/about", specs:[
    {selector:".about-hero > .editorial-kicker",variant:"kicker"},{selector:".about-hero-grid > h1",variant:"headline"},{selector:".about-lede",variant:"copy"},{selector:".about-hero .premium-context-rail",variant:"rail"},{selector:".about-two-up > article",variant:"card",stagger:120},{selector:".about-principles-heading",variant:"section"},{selector:".about-principle-grid > article",variant:"card",stagger:95},
    /* Keep kicker + heading + links as one reveal so DIRECTION can never be stranded. */
    {selector:".about-closing",variant:"section"},
  ]},
  { match:p=>p==="/collaborate", specs:[
    {selector:".mock-collaborate-hero > div:first-child",variant:"headline"},{selector:".mock-collaborate-hero > p",variant:"copy"},{selector:".mock-collaborate-hero .premium-context-rail",variant:"rail"},{selector:".mock-collab-paths > article",variant:"card",stagger:105},{selector:".mock-fit-intro",variant:"section"},{selector:".mock-fit-grid > article",variant:"card",stagger:120},{selector:".mock-collab-cta > *",variant:"copy",stagger:110},
  ]},
  { match:p=>p==="/resume", specs:[
    {selector:".mock-profile-hero > div:first-child",variant:"headline"},{selector:".mock-profile-meta",variant:"rail"},{selector:".mock-section-title",variant:"section"},{selector:".mock-competency-grid > article",variant:"card",stagger:90},{selector:".mock-experience-grid > article",variant:"card",stagger:100},{selector:".mock-profile-work-grid > article",variant:"card",stagger:120},{selector:".mock-profile-next > *",variant:"copy",stagger:110},
  ]},
  { match:p=>p.startsWith("/systems/")&&p!=="/systems", specs:[
    {selector:".showcase-identity",variant:"headline"},{selector:".showcase-context",variant:"copy"},{selector:".showcase-capability-strip > article",variant:"card",stagger:90},{selector:".showcase-subnav",variant:"rail"},{selector:".showcase-active-panel",variant:"section"},
  ]},
];

export function GlobalMotion(){
  const pathname=usePathname();
  useEffect(()=>{
    if(pathname==="/research"||pathname==="/"||pathname==="/home")return;
    const config=PAGE_SPECS.find(item=>item.match(pathname));if(!config)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets:HTMLElement[]=[];
    config.specs.forEach(spec=>{
      Array.from(document.querySelectorAll<HTMLElement>(spec.selector)).forEach((target,index)=>{
        target.dataset.globalMotion=spec.variant;
        target.style.setProperty("--global-motion-delay",`${Math.min(index*(spec.stagger??85),340)}ms`);
        targets.push(target);if(reduced)target.classList.add("global-motion-visible");
      });
    });
    if(reduced)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      const target=entry.target as HTMLElement;
      if(entry.isIntersecting)target.classList.add("global-motion-visible");else target.classList.remove("global-motion-visible");
    }),{threshold:.15,rootMargin:"-3% 0px -10% 0px"});
    targets.forEach(target=>observer.observe(target));
    return()=>{observer.disconnect();targets.forEach(target=>{target.classList.remove("global-motion-visible");delete target.dataset.globalMotion;target.style.removeProperty("--global-motion-delay");});};
  },[pathname]);
  return null;
}
