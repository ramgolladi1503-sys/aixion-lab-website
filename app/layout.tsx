import type { Metadata } from "next";
import "./olympic-editorial.css";
import { EditorialMotion } from "@/components/editorial-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Aixion Lab — Applied intelligence, engineered with evidence",
    template: "%s — Aixion Lab",
  },
  description: "An independent engineering lab building applied intelligence, automation and decision systems with visible evidence and explicit boundaries.",
  metadataBase: new URL("https://aixionlab.com"),
  openGraph: {
    title: "Aixion Lab — Applied intelligence, engineered with evidence",
    description: "An independent engineering lab building applied intelligence, automation and decision systems with visible evidence and explicit boundaries.",
    type: "website",
    url: "https://aixionlab.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-view="lab">
      <body>
        <EditorialMotion>
          <SiteHeader />
          <main id="main-content" className="site-main">{children}</main>
          <SiteFooter />
        </EditorialMotion>
      </body>
    </html>
  );
}
