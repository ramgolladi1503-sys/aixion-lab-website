import type { Metadata } from "next";
import { WorkPage } from "@/components/work-page";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected Aixion Lab engineering work, with each system shown at its current stage and evidence boundary.",
};

// Compatibility entry point for the former systems index URL.
export default function SystemsCompatibilityPage() {
  return <WorkPage />;
}
