import Image from "next/image";
import { visualAuthority, type VisualAuthorityKey } from "@/lib/visual-authority";

export function CinematicImage({ kind, alt, priority = false }: { kind: VisualAuthorityKey; alt: string; priority?: boolean }) {
  return <div className={`cinematic-image-field cinematic-image-field--${kind}`} aria-hidden="true"><Image src={visualAuthority[kind]} alt={alt} fill priority={priority} sizes="(max-width: 700px) 100vw, 50vw" className="cinematic-image" /></div>;
}
