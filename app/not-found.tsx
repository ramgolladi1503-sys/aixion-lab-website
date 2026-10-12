import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="page-width" data-reveal>
        <p className="eyebrow">404 / ROUTE NOT FOUND</p>
        <h1>Not this way.</h1>
        <h2>The page could not be found.</h2>
        <p>Return to the lab overview or browse the systems and research archive.</p>
        <div className="not-found-actions"><Link className="button" href="/">Return home <span aria-hidden="true">↗</span></Link><Link className="editorial-link" href="/systems">Browse systems <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  );
}
