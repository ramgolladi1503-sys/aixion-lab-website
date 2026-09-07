"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { MOTION_CONFIG } from "@/lib/motion-config";

export function RouteMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<"entering" | "ready">("entering");
  useEffect(() => {
    setState("entering");
    const timer = window.setTimeout(() => setState("ready"), MOTION_CONFIG.route.settleMs);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  return <div className={`route-motion route-motion--${state}`} data-route-state={state} key={pathname}>{children}</div>;
}
