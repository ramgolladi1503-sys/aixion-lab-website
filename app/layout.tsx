import type { Metadata } from "next";
import "./unseen.css";
import "./structural-remediation.css";
import "./editorial-remediation.css";
import { UnseenHeader, UnseenStatusBar } from "@/components/unseen-chrome";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="unseen-theme">
        <UnseenHeader />
        <main>{children}</main>
        <UnseenStatusBar />
      </body>
    </html>
  );
}
