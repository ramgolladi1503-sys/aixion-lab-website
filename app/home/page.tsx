"use client";

import Link from "next/link";
import { UnseenWorld } from "@/components/unseen-world";

export default function HomePage() {
  return (
    <section
      className="unseen-hero-container"
      aria-label="Aixion Lab home"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
      }}
    >
      <UnseenWorld entered onEnter={() => {}} />

      <div
        style={{
          position: "absolute",
          bottom: "4.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Link
          href="/systems"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(33, 33, 33, 0.1)",
            padding: "0.55rem 1.4rem",
            borderRadius: "999px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "#212121",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
        >
          Explore our work <span aria-hidden="true">↘</span>
        </Link>
      </div>
    </section>
  );
}
