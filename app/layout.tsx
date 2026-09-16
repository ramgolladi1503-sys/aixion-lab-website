import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./unseen.css";
import "./structural-remediation.css";
import "./system-variants.css";
import "./mockup-rebuild.css";
import "./about-final.css";
import "./theme-global.css";
import "./applied-lab-refinement.css";
import "./visual-audit-fixes.css";
import "./typography-refresh.css";
import "./pattern-a-premium.css";
import "./page-backgrounds.css";
import "./wallpaper-continuity-fix.css";
import "./art-wall-final.css";
import "./art-wall-polish.css";
import { UnseenHeader, UnseenStatusBar } from "@/components/unseen-chrome";

const aixionDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-aixion-display",
  display: "swap",
});

const aixionSans = Inter({
  subsets: ["latin"],
  variable: "--font-aixion-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aixion Lab — Applied Intelligence, Automation & Decision Systems",
    template: "%s | Aixion Lab",
  },
  description: "An independent engineering lab where ideas move through research, implementation, validation and real-world observation. Built by Ram.",
  metadataBase: new URL("https://aixionlab.com"),
  openGraph: {
    title: "Aixion Lab",
    description: "Applied intelligence, automation and decision systems.",
    type: "website",
    url: "https://aixionlab.com",
  },
};

const themeBoot = `
(function(){
  try {
    var stored = localStorage.getItem('aixion-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = 'light';
  }
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBoot }} /></head>
      <body className={`unseen-theme ${aixionDisplay.variable} ${aixionSans.variable}`}>
        <UnseenHeader />
        <main>{children}</main>
        <UnseenStatusBar />
      </body>
    </html>
  );
}
