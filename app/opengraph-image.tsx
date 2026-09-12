import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt =
  "Aixion Lab — Building systems that survive more than the happy path.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f6f3ee",
          color: "#30383d",
        }}
      >
        <span style={{ fontSize: 28, letterSpacing: 6 }}>AIXION LAB</span>
        <span style={{ fontSize: 64, maxWidth: 950 }}>
          Building systems that have to survive more than the happy path.
        </span>
        <span style={{ fontSize: 24 }}>
          Ram Golladi · Quality / Systems / Research / Applied AI
        </span>
      </div>
    ),
    size,
  );
}
