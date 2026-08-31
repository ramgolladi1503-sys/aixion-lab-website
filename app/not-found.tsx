import Link from "next/link";
import { AixionSignal } from "@/components/system-visuals";

export default function NotFound() {
  return (
    <section className="not-found section">
      <div className="shell">
        <p className="eyebrow">404 · SIGNAL LOST</p>
        <h1>404</h1>
        <h2>Lost in the Lab?</h2>
        <p className="lede" style={{ marginInline: "auto" }}>The page you were looking for does not exist, but the system still knows where home is.</p>
        <div className="panel panel-pad not-found-status">
          <p className="eyebrow">ROUTE STATE · NOT FOUND</p>
          <p>The requested route is outside the published system map. Use the lifecycle below to return to a known state.</p>
          <AixionSignal compact />
        </div>
        <Link className="button" href="/">Return home →</Link>
      </div>
    </section>
  );
}
