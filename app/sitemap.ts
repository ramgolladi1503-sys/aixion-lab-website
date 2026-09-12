import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/work",
    "/work/tradebot",
    "/work/control-tower",
    "/research",
    "/journey",
    "/about",
    "/contact",
    "/resume",
  ].map((path) => ({ url: `https://aixionlab.com${path}` }));
}
