import type { MetadataRoute } from "next";
import { researchNotes, systems } from "@/lib/site-data";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aixionlab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/systems", "/research", "/pulse", "/journey", "/about", "/resume"];
  const systemRoutes = systems.map(system => `/systems/${system.slug}`);
  const researchRoutes = researchNotes.map(note => `/research/${note.slug}`);

  return [...staticRoutes, ...systemRoutes, ...researchRoutes].map(route => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "/pulse" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/systems" || route === "/research" ? 0.9 : 0.7,
  }));
}
