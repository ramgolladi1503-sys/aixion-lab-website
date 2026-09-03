import type { Metadata, Viewport } from "next";
import "./approved-gallery.css";
import "./approved-gallery-scenes.css";
import "./approved-gallery-calibration.css";
import "./approved-gallery-art.css";
import "./generated-scene-atlas.css";
import "./reference-match-v2.css";
import "./approved-reference-v3.css";
import "./approved-reference-v4.css";
import "./approved-reference-v4-fix.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aixionlab.com";
const siteDescription = "An independent engineering lab where ideas move through research, implementation, validation and real-world observation.";
const socialDescription = "Applied intelligence, automation and decision systems built with explicit state, evidence and authority boundaries.";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#06111e", colorScheme: "dark" };

export const metadata: Metadata = {
  title: { default: "Aixion Lab by Ram — Evidence-led Systems Engineering", template: "%s | Aixion Lab" },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: "Aixion Lab",
  authors: [{ name: "Ram", url: "https://github.com/ramgolladi1503-sys" }],
  creator: "Ram",
  publisher: "Aixion Lab",
  category: "technology",
  keywords: ["Aixion Lab", "evidence-led systems engineering", "quality engineering", "automation", "software engineering", "applied AI", "agent governance", "real-time systems"],
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { title: "Aixion Lab by Ram — Evidence-led Systems Engineering", description: socialDescription, type: "website", url: siteUrl, siteName: "Aixion Lab", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Aixion Lab by Ram — Evidence-led Systems Engineering", description: socialDescription },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "Aixion Lab", alternateName: ["Aixion Lab by Ram", "AixionLab"], url: siteUrl, description: siteDescription, inLanguage: "en", creator: { "@id": `${siteUrl}/#ram` } },
    { "@type": "Person", "@id": `${siteUrl}/#ram`, name: "Ram", url: `${siteUrl}/about`, sameAs: ["https://github.com/ramgolladi1503-sys", "https://www.linkedin.com/in/ram-golladi"], knowsAbout: ["Quality engineering", "Automation", "Software engineering", "Data systems", "Applied artificial intelligence", "Agent governance"] },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-view="lab" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
