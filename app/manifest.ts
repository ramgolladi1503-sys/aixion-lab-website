import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aixion Lab",
    short_name: "Aixion Lab",
    description: "The engineering work of Ram Golladi.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ee",
    theme_color: "#f6f3ee",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
