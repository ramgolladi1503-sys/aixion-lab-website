"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: "#050b12", color: "#f4f1ea", fontFamily: "Arial, sans-serif", padding: "3rem" }}>
        <main>
          <p style={{ color: "#9b8061", letterSpacing: ".16em", fontSize: ".7rem" }}>AIXION LAB · SYSTEM ERROR</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>The system needs another pass.</h1>
          <button onClick={() => reset()} style={{ padding: ".75rem 1rem", background: "#7cc8ff", border: 0, color: "#050b12" }}>Try again</button>
        </main>
      </body>
    </html>
  );
}
