import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import "./interactions.css";
import "./convergence.css";
import "./accessibility.css";
import "./final-polish.css";
import "./uat-polish.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
