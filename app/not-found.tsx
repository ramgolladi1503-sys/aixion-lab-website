import Link from "next/link";
import { AbstractScene } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="not-found section">
      <div className="shell">
        <p className="eyebrow">404 · SIGNAL LOST</p>
        <h1>404</h1>
        <h2>Lost in the Lab?</h2>
        <p className="lede" style={{ marginInline: "auto" }}>The page you were looking for does not exist, but the system still knows where home is.</p>
        <AbstractScene variant="blue" />
        <Link className="button" href="/">Return home →</Link>
      </div>
    </section>
  );
}
