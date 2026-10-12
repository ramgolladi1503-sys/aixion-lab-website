import type { Metadata } from "next";
import { MotionLabExperience } from "@/components/motion-lab/motion-lab-experience";

export const metadata: Metadata = {
  title: "Motion Lab — A study in systems",
  description: "An experimental, interactive study of structure, material and signal from Aixion Lab.",
  robots: { index: false, follow: false },
};

export default function MotionLabPage() {
  return <MotionLabExperience />;
}
