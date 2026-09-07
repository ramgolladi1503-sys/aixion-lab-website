import type { Metadata } from "next";
import "./globals.css";
import "./aixion-fresh.css";
import { SiteHeader } from "@/components/site-header";
import { MotionEnhancer } from "@/components/motion-enhancer";
import { RouteMotion } from "@/components/route-motion";
import { ContextBar } from "@/components/context-bar";

export const metadata: Metadata = {
  title: {
    default: "Aixion Lab — Applied Intelligence, Automation & Decision Systems",
    template: "%s | Aixion Lab",
  },
  description: "An independent engineering lab where ideas move through research, implementation, validation and real-world observation.",
  metadataBase: new URL("https://aixionlab.com"),
  openGraph: {
    title: "Aixion Lab",
    description: "Applied intelligence, automation and decision systems.",
    type: "website",
    url: "https://aixionlab.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-view="lab">
      <body>
        <SiteHeader />
        <ContextBar />
        <main><RouteMotion>{children}</RouteMotion></main>
        <MotionEnhancer />
      </body>
    </html>
  );
}
