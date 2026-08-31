import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aixion Lab",
    short_name: "Aixion Lab",
    description: "Applied intelligence, automation and decision systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#E9EDE7",
    theme_color: "#E9EDE7",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
