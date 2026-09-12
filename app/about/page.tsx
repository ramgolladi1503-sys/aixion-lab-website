import type { Metadata } from "next";
import { aboutCapabilities } from "@/lib/content";
import {
  Opening,
  Material,
  Capabilities,
  Statement,
  Opportunity,
  Socials,
} from "@/components/compositions";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <>
      <Opening
        label="About"
        title="Engineer by practice. Tester by instinct."
      />
      <section className="about-split shell">
        <div data-reveal>
          <p className="lead">
            I’m Ram, a quality and automation engineer. My career began with
            software testing, but the problems I wanted to understand kept
            getting larger.
          </p>
          <p>
            Testing applications led to automation; automation led to system
            behavior; system behavior led to reliability, data, research and
            applied AI.
          </p>
          <p>
            Aixion Lab is where I build and investigate software systems beyond
            the boundaries of a formal job title.
          </p>
          <Socials />
        </div>
        <Material compact />
      </section>
      <section className="section shell">
        <Capabilities items={aboutCapabilities} />
      </section>
      <Statement>I stay with hard problems.</Statement>
      <section className="section shell about-work">
        <div data-reveal>
          <p className="eyebrow">Work style</p>
          <h2>The repair is part of the work.</h2>
        </div>
        <div data-reveal>
          <p className="lead">
            My strongest work usually comes after the first implementation:
            observe, find the failure, understand it, repair it and test the
            repair.
          </p>
          <p>
            When a local fix cannot explain the problem, the architecture needs
            to change.
          </p>
          <p className="work-sequence">
            Build → Observe → Break → Understand → Repair → Verify
          </p>
        </div>
      </section>
      <Opportunity />
    </>
  );
}
