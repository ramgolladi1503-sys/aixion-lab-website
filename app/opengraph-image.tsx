import { ImageResponse } from "next/og";

export const alt = "Aixion Lab by Ram — Evidence-led Systems Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#E9EDE7",
        color: "#353A37",
        padding: "64px 72px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background: "linear-gradient(135deg, rgba(255,255,255,.6), rgba(233,237,231,.15) 52%, rgba(129,153,176,.10))",
        }}
      />

      <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 46, height: 46, display: "flex", flexWrap: "wrap", gap: 5, transform: "rotate(12deg)" }}>
              {Array.from({ length: 16 }).map((_, index) => (
                <span key={index} style={{ width: 5, height: 5, borderRadius: 999, background: "#78998B", opacity: .78 }} />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 25, fontWeight: 700, letterSpacing: "0.18em" }}>AIXION LAB</span>
              <span style={{ marginTop: 5, fontSize: 15, color: "#5B655E" }}>Applied intelligence · evidence-led systems</span>
            </div>
          </div>
          <span style={{ fontSize: 14, letterSpacing: "0.12em", color: "#68736C" }}>AIXIONLAB.COM</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 54 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.16em", color: "#5C6962" }}>BUILT BY RAM · SYSTEMS ENGINEERING</span>
            <span style={{ marginTop: 18, maxWidth: 820, fontFamily: "serif", fontSize: 67, lineHeight: 1.02, letterSpacing: "-0.035em" }}>
              Systems should be able to explain their state.
            </span>
            <span style={{ marginTop: 22, maxWidth: 820, fontSize: 20, lineHeight: 1.45, color: "#56615A" }}>
              Quality engineering · automation · software · data · applied AI
            </span>
          </div>

          <div
            style={{
              width: 244,
              height: 244,
              border: "1px solid rgba(53,58,55,.18)",
              borderRadius: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 24,
              background: "rgba(242,244,239,.72)",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.13em", color: "#657169" }}>AIXION SIGNAL</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["STATE", "EVIDENCE", "AUTHORITY"].map((item, index) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: index === 1 ? "#8199B0" : "#78998B" }} />
                  <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.08em" }}>{item}</span>
                </div>
              ))}
            </div>
            <span style={{ fontSize: 13, lineHeight: 1.35, color: "#657169" }}>Research → Build → Validate → Observe → Operate → Learn</span>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
