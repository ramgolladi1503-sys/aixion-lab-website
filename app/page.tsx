"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UnseenWorld } from "@/components/unseen-world";

export default function EntryPage() {
  const router = useRouter();

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, []);

  const enterHome = () => {
    router.push("/home");
  };

  return (
    <section
      className="unseen-hero-container"
      aria-label="Aixion Lab entry"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
      }}
    >
      <UnseenWorld entered={false} onEnter={enterHome} />
    </section>
  );
}
