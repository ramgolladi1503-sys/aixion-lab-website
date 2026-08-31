import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile.css";
import "./interactions.css";
import "./convergence.css";
import "./accessibility.css";
import "./final-polish.css";
import "./uat-polish.css";
import "./launch.css";
import "./award-motion.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MotionOrchestrator } from "@/components/motion-orchestrator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aixionlab.com";
const siteDescription = "An independent engineering lab where ideas move through research, implementation, validation and real-world observation.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E9EDE7",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: {
    default: "Aixion Lab — Applied Intelligence, Automation & Decision Systems",
    template: "%s | Aixion Lab",
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: "Aixion Lab",
  authors: [{ name: "Ram", url: "https://github.com/ramgolladi1503-sys" }],
  creator: "Ram",
  publisher: "Aixion Lab",
  keywords: [
    "Aixion Lab",
    "quality engineering",
    "automation",
    "software engineering",
    "applied AI",
    "agent governance",
    "real-time systems",
    "evidence-led engineering",
  ],
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Aixion Lab",
    description: "Applied intelligence, automation and decision systems.",
    type: "website",
    url: siteUrl,
    siteName: "Aixion Lab",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Aixion Lab",
    description: "Applied intelligence, automation and decision systems.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aixion Lab",
  url: siteUrl,
  description: siteDescription,
  creator: {
    "@type": "Person",
    name: "Ram",
    sameAs: ["https://github.com/ramgolladi1503-sys"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-view="lab">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionOrchestrator />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
