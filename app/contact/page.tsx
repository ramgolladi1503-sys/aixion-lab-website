import type { Metadata } from "next";
import Link from "next/link";
import { Opening } from "@/components/compositions";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/content";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <>
      <Opening
        label="Contact"
        title="Open to the next engineering challenge."
        copy="A role, a difficult systems problem, or a technical conversation. I’d be happy to hear from you."
      />
      <section className="contact-panel shell">
        <div className="contact-copy">
          <h2>Let’s talk.</h2>
          <a className="email-link" href={`mailto:${site.email}`}>
            {site.email} ↗
          </a>
          <div className="socials">
            <a href={site.linkedin}>LinkedIn ↗</a>
            <a href={site.github}>GitHub ↗</a>
            <Link href="/resume">Résumé ↗</Link>
          </div>
          <h3>Recruiting / roles</h3>
          <p>
            QA/SDET, automation, reliability, AI quality and adjacent
            engineering roles where rigorous testing matters.
          </p>
          <h3>Technical collaboration</h3>
          <p>
            Agent control, testing infrastructure, research tooling and
            engineering experiments with a concrete question to investigate.
          </p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
