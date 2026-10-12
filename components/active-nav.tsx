"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site-data";

export function ActiveNav() {
  const pathname = usePathname();
  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {nav.map(([label, href]) => {
        const active = pathname === href || pathname.startsWith(`${href}/`) || (href === "/work" && (pathname === "/systems" || pathname.startsWith("/systems/")));
        return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={active ? "active" : undefined}>{label}</Link>;
      })}
    </nav>
  );
}
