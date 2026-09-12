import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/shell";
import { MotionController } from "@/components/motion";
import "./globals.css";
import "./visual-recovery.css";
import "./visual-recovery-a11y.css";
import { site } from "@/lib/content";

const inter = localFont({
  src: "../public/fonts/inter.woff2",
  variable: "--font-body",
  display: "swap",
});

const tight = localFont({
  src: "../public/fonts/inter-tight.woff2",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aixionlab.com"),
  title: { default: "Aixion Lab — Ram Golladi", template: "%s — Aixion Lab" },
  description:
    "Quality engineering, reliable systems, research and human-controlled AI. The engineering work of Ram Golladi.",
  openGraph: {
    title: "Aixion Lab — Ram Golladi",
    description:
      "Building systems that have to survive more than the happy path.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-motion={site.motion.enabled ? "enabled" : "disabled"}>
      <body className={`${inter.variable} ${tight.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MotionController />
      </body>
    </html>
  );
}
