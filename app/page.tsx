import Link from "next/link";

const destinations = [
  {
    key: "home",
    label: "HOME",
    title: "We build intelligent systems for a more extraordinary future.",
    body: "Aixion Lab turns research into observable systems with explicit evidence and authority boundaries.",
    href: "/about",
    cta: "Discover the lab", image: "/visual-authority/generated/home-canyon-clean.png",
  },
  {
    key: "about",
    label: "ABOUT",
    title: "Applied intelligence with a point of view.",
    body: "An independent engineering lab shaped by quality, automation, software, data and applied AI.",
    href: "/about",
    cta: "Our approach", image: "/visual-authority/generated/about-observatory-clean.png",
  },
  {
    key: "systems",
    label: "SYSTEMS",
    title: "Systems that learn, adapt and explain.",
    body: "Market intelligence, orchestration, automation and analytics built to keep their state visible.",
    href: "/systems",
    cta: "Explore systems", image: "/visual-authority/generated/systems-orbit-clean.png",
  },
  {
    key: "research",
    label: "RESEARCH",
    title: "Real questions. Evidence before confidence.",
    body: "Research stays explicit about what is supported, what failed and what remains unknown.",
    href: "/research",
    cta: "Review the work", image: "/visual-authority/generated/research-planets-clean.png",
  },
  {
    key: "collaborate",
    label: "COLLABORATE",
    title: "Let’s build what’s next.",
    body: "Bring a difficult engineering problem. We will make its state, evidence and path visible.",
    href: "/collaborate",
    cta: "Start a conversation", image: "/visual-authority/generated/collaborate-gateway-clean.png",
  },
] as const;

export default function HomePage() {
  return (
    <section className="landing" aria-labelledby="landing-title">
      <div className="landing-masthead shell">
        <div>
          <p id="landing-title">AIXION LAB<sup>®</sup></p>
          <small>INDEPENDENT APPLIED-ENGINEERING LAB</small>
        </div>
        <span>RESPONSIVE · UNIFIED · INTELLIGENT<br />AI SYSTEMS · AUTOMATION · INSIGHT</span>
      </div>

      <div className="destination-grid shell">
        {destinations.map((destination) => (
          <Link className={`destination-panel destination-panel--${destination.key}`} href={destination.href} key={destination.key}>
            <span className="destination-name">{destination.label}</span>
            <span className="destination-scene" aria-hidden="true"><img src={destination.image} alt="" /></span>
            <span className="destination-copy">
              <h1>{destination.title}</h1>
              <p>{destination.body}</p>
              <strong>{destination.cta} ↗</strong>
            </span>
            <span className="destination-foot">
              <span>STATE · EVIDENCE · AUTHORITY</span>
              <small>EXPLORE</small>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
