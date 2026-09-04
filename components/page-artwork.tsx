type ArtworkKind = "about" | "systems" | "research" | "pulse" | "journey" | "resume" | "collaborate";

const artwork: Record<ArtworkKind, string> = {
  about: "/visual-authority/generated/about-observatory-clean.png",
  systems: "/visual-authority/generated/systems-orbit-clean.png",
  research: "/visual-authority/generated/research-planets-clean.png",
  pulse: "/visual-authority/generated/pulse-planet-clean.png",
  journey: "/visual-authority/generated/journey-path-clean.png",
  resume: "/visual-authority/generated/career-team-clean.png",
  collaborate: "/visual-authority/generated/collaborate-gateway-clean.png",
};

export function PageArtwork({ kind }: { kind: ArtworkKind }) {
  return <div className={`page-artwork page-artwork--${kind}`} aria-hidden="true"><img src={artwork[kind]} alt="" /></div>;
}
