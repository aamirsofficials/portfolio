"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  ["Overview", "overview"],
  ["Challenge", "challenge"],
  ["Research", "research"],
  ["Insights", "insights"],
  ["Process", "process"],
  ["Solution", "solution"],
  ["Impact", "impact"],
  ["Learnings", "learnings"],
] as const;

const insightItems = [
  {
    title: "The booking starts before the results page.",
    observation: "The supplied home screen asks for location, schedule, driver age and promo details in one task area.",
    insight: "Rental context determines which vehicles and prices are relevant.",
    decision: "Keep setup together and end it with one unmistakable Find Cars action.",
  },
  {
    title: "A vehicle is both an object and an offer.",
    observation: "Result cards must carry identity, capacity, inclusions and price at the same time.",
    insight: "A beautiful car image alone cannot support a confident comparison.",
    decision: "Sequence every result from recognition → practical fit → commercial terms.",
  },
  {
    title: "Price needs context to feel trustworthy.",
    observation: "Discount, total, daily rate and included conditions appear within the same result card.",
    insight: "Separating the number from its conditions creates uncertainty at the decision point.",
    decision: "Treat price and inclusions as one information unit.",
  },
] as const;

function SectionHeading({ index, eyebrow, title, copy, inverse = false }: {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
  inverse?: boolean;
}) {
  return (
    <header className={`rental-section-heading${inverse ? " is-inverse" : ""}`}>
      <div className="rental-section-label"><span>{index}</span><p>{eyebrow}</p></div>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </header>
  );
}

function Phone({ screen, label, priority = false, className = "" }: {
  screen: "home" | "results";
  label: string;
  priority?: boolean;
  className?: string;
}) {
  const isHome = screen === "home";
  return (
    <figure className={`rental-phone-frame ${className}`}>
      <div className="rental-phone-speaker" aria-hidden="true" />
      <div className={`rental-phone-screen ${isHome ? "is-home" : "is-results"}`}>
        <Image
          src={isHome ? "/images/projects/northside-home.png" : "/images/projects/northside-search-results.png"}
          alt={label}
          fill
          sizes="(max-width: 720px) 72vw, 340px"
          priority={priority}
          className="rental-screen-image"
        />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function EvidenceTag({ children }: { children: React.ReactNode }) {
  return <span className="rental-evidence-tag">{children}</span>;
}

function Placeholder({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rental-placeholder">
      <span>Evidence placeholder</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Wireframe({ variant }: { variant: "search" | "results" | "details" }) {
  return (
    <div className={`rental-wireframe is-${variant}`} aria-label={`${variant} wireframe illustration`}>
      <i className="wf-top" />
      <i className="wf-title" />
      <i className="wf-block wf-block-a" />
      <i className="wf-block wf-block-b" />
      <i className="wf-block wf-block-c" />
      <i className="wf-action" />
    </div>
  );
}

export default function CarRentalCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const [zoomed, setZoomed] = useState<"home" | "results" | null>(null);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.55] },
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!zoomed) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setZoomed(null);
    document.addEventListener("keydown", close);
    document.body.classList.add("rental-lightbox-open");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("rental-lightbox-open");
    };
  }, [zoomed]);

  return (
    <main className="rental-case" id="top">
      <header className="rental-global-nav">
        <div className="rental-shell rental-global-nav-inner">
          <Link className="rental-brand" href="/" aria-label="Aamir Khan portfolio home">
            <span className="rental-brand-mark">AK</span>
            <span><strong>Aamir Khan</strong><small>Lead Product Designer</small></span>
          </Link>
          <nav aria-label="Portfolio navigation">
            <Link href="/#work">Work</Link>
            <Link href="/#about">About</Link>
            <Link href="/resume">Resume</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
      </header>

      <section className="rental-hero" aria-labelledby="rental-title">
        <div className="rental-shell">
          <div className="rental-back-row">
            <Link href="/#work">← Back to Work</Link>
            <span>Mobility · Booking · Responsive UX</span>
          </div>
          <div className="rental-hero-grid">
            <div className="rental-hero-copy">
              <p className="rental-eyebrow">Product design case study</p>
              <h1 id="rental-title"><span>Northside</span> Rentals</h1>
              <p className="rental-hero-lede">Reimagining the car-rental experience to make discovering, comparing and booking vehicles simpler and more transparent.</p>
            </div>
            <dl className="rental-hero-meta">
              <div><dt>Role</dt><dd>Product Designer</dd></div>
              <div><dt>Project</dt><dd>Independent concept</dd></div>
              <div><dt>Platform</dt><dd>Mobile · Responsive direction</dd></div>
              <div><dt>Tools</dt><dd>Figma</dd></div>
              <div><dt>Scope</dt><dd>UX strategy · User flows · UI design · Prototyping</dd></div>
            </dl>
          </div>
          <div className="rental-hero-stage">
            <div className="rental-road-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="rental-hero-note"><span>01</span><p>Define the rental</p></div>
            <Phone screen="home" label="Rental search and discovery" priority className="is-front" />
            <Phone screen="results" label="Vehicle results and comparison" priority className="is-back" />
            <div className="rental-hero-note is-right"><span>02</span><p>Compare the offer</p></div>
          </div>
          <a className="rental-scroll-cue" href="#overview">Scroll to explore <span>↓</span></a>
        </div>
      </section>

      <nav className="rental-story-nav" aria-label="Case study sections">
        <div className="rental-shell">
          <span className="rental-progress-label">Case study</span>
          <div className="rental-story-links">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? "is-active" : ""} aria-current={activeSection === id ? "location" : undefined}>{label}</a>
            ))}
          </div>
          <span className="rental-progress-number">{String(navItems.findIndex(([, id]) => id === activeSection) + 1).padStart(2, "0")} / 08</span>
        </div>
      </nav>

      <section className="rental-section rental-shell" id="overview">
        <SectionHeading index="01" eyebrow="At a glance" title="A focused foundation for a more confident rental journey." copy="The current concept covers search setup, discovery and vehicle comparison. Detail, checkout and post-booking states are presented as the next product phase—not as shipped work." />
        <div className="rental-snapshot">
          <div><span>My role</span><strong>Product Designer</strong><p>Product framing, UX structure, visual direction and prototype design.</p></div>
          <div><span>Team</span><strong>Independent</strong><p>A self-directed concept without claimed product or engineering delivery.</p></div>
          <div><span>Platform</span><strong>Mobile first</strong><p>Designed for a responsive booking experience across devices.</p></div>
          <div><span>Contribution</span><strong>End to end</strong><p>UX strategy · IA · flows · wireframes · UI · prototype direction.</p></div>
        </div>
        <div className="rental-contribution-line"><span>My contribution</span><p>Research planning · UX strategy · Information architecture · Wireframing · UI design · Prototyping · Validation planning</p></div>
      </section>

      <section className="rental-challenge" id="challenge">
        <div className="rental-shell">
          <SectionHeading inverse index="02" eyebrow="The challenge" title="A simple booking can hide a surprising amount of uncertainty." copy="Location, timing, vehicle fit, pricing and rental conditions all compete for attention before a customer can commit." />
          <div className="rental-challenge-grid">
            <article><span>Business problem</span><h3>Move customers from intent to a qualified vehicle choice.</h3><p>The product needs to help people find a relevant offer without losing confidence in pricing or terms.</p></article>
            <article><span>User problem</span><h3>Understand the real offer without decoding the interface.</h3><p>Customers must compare practical fit and cost while holding their trip context in mind.</p></article>
            <article><span>Design challenge</span><h3>Sequence complexity instead of exposing it all at once.</h3><p>The mobile experience has to reveal the right detail at the right decision point.</p></article>
          </div>
          <blockquote><span>How might we</span> help customers choose a suitable car with confidence, while creating a clearer path from search intent to booking?</blockquote>
        </div>
      </section>

      <section className="rental-section rental-shell rental-context" aria-labelledby="context-title">
        <SectionHeading index="03" eyebrow="Product context" title="The product connects trip intent to a bookable vehicle." copy="Northside Rentals is a mobile-first concept for people who need temporary access to a car and want to understand their options quickly." />
        <div className="rental-context-copy">
          <div><span>What it is</span><p>A search and comparison experience for short-term vehicle rental.</p></div>
          <div><span>Who it serves</span><p>Leisure and practical-trip customers balancing location, timing, capacity and cost.</p></div>
          <div><span>Why it exists</span><p>To turn a multi-variable rental decision into a progressive, understandable flow.</p></div>
        </div>
        <div className="rental-ecosystem" aria-label="Product ecosystem diagram">
          <article><span>01</span><strong>Customer</strong><small>Trip need · preferences · trust</small></article><i>→</i>
          <article className="is-accent"><span>02</span><strong>Rental product</strong><small>Search · compare · book</small></article><i>→</i>
          <article><span>03</span><strong>Business</strong><small>Qualified demand · conversion</small></article><i>→</i>
          <article><span>04</span><strong>Systems</strong><small>Inventory · pricing · payment</small></article>
        </div>
      </section>

      <section className="rental-section rental-goals">
        <div className="rental-shell">
          <SectionHeading index="04" eyebrow="Goals and measures" title="Align customer confidence with commercial progress." />
          <div className="rental-goal-columns">
            <div><p className="rental-column-label">User goals</p><ol><li>Find relevant vehicles quickly.</li><li>Compare practical fit and total value.</li><li>Understand what is included before committing.</li></ol></div>
            <div><p className="rental-column-label">Business goals</p><ol><li>Improve qualified search-to-detail progression.</li><li>Reduce hesitation caused by unclear offers.</li><li>Create a scalable foundation for checkout.</li></ol></div>
          </div>
          <div className="rental-success-strip">
            <div><span>Task completion</span><strong>To measure</strong></div>
            <div><span>Search → detail</span><strong>To measure</strong></div>
            <div><span>Time on task</span><strong>To measure</strong></div>
            <div><span>Booking drop-off</span><strong>To measure</strong></div>
            <div><span>Confidence</span><strong>To measure</strong></div>
          </div>
          <p className="rental-data-note"><b>Measurement note:</b> This is an unshipped concept. Baselines and target values should be set with product analytics before launch.</p>
        </div>
      </section>

      <section className="rental-research" id="research">
        <div className="rental-shell">
          <SectionHeading inverse index="05" eyebrow="Understanding the problem" title="Separate what is known from what still needs evidence." copy="No interview recordings, survey data or usability findings were supplied. The research plan below makes the next evidence-gathering step explicit." />
          <div className="rental-methods" aria-label="Planned research process">
            {[
              ["01", "Interviews", "Understand real rental decisions"],
              ["02", "Survey", "Size recurring concerns"],
              ["03", "Competitive review", "Audit offer patterns"],
              ["04", "Evaluation", "Test the existing flow"],
              ["05", "Synthesis", "Translate evidence into priorities"],
            ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="rental-research-body">
            <div>
              <p className="rental-column-label">Research questions</p>
              <ul className="rental-question-list">
                <li>What triggers a rental search?</li><li>Which information changes a vehicle decision?</li><li>Where does price feel unclear?</li><li>What prevents checkout?</li><li>How do customers compare alternatives?</li>
              </ul>
            </div>
            <div className="rental-artifact-grid">
              <Placeholder title="Interview evidence">Add anonymized notes and verbatim quotes after customer interviews.</Placeholder>
              <Placeholder title="Affinity map">Group observed behaviors, needs and tensions after synthesis.</Placeholder>
              <Placeholder title="Usability observations">Connect task evidence to specific interface decisions.</Placeholder>
            </div>
          </div>
        </div>
      </section>

      <section className="rental-section rental-shell" id="insights">
        <SectionHeading index="06" eyebrow="Experience principles" title="What the current interface suggests—and how it shaped decisions." copy="These are design hypotheses derived from the supplied screens, not claims from completed user research." />
        <div className="rental-insights">
          {insightItems.map((item, index) => (
            <article key={item.title}>
              <div className="rental-insight-title"><span>0{index + 1}</span><h3>{item.title}</h3><EvidenceTag>Design hypothesis</EvidenceTag></div>
              <dl>
                <div><dt>Observation</dt><dd>{item.observation}</dd></div>
                <div><dt>Insight</dt><dd>{item.insight}</dd></div>
                <div className="is-decision"><dt>Design decision</dt><dd>{item.decision}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="rental-section rental-persona">
        <div className="rental-shell">
          <SectionHeading index="07" eyebrow="Proto-persona" title="A working assumption, designed to be challenged." copy="Because primary research is not yet available, this profile is intentionally a proto-persona—not a validated representation of customers." />
          <div className="rental-persona-layout">
            <div className="rental-persona-identity"><div className="rental-persona-monogram">RP</div><EvidenceTag>Provisional</EvidenceTag><h3>Road-trip planner</h3><p>Needs a car for a time-bound trip and wants to balance comfort, luggage, timing and cost.</p></div>
            <div className="rental-persona-detail">
              <div><span>Goals</span><p>Shortlist a suitable car. Understand the total offer. Finish without surprises.</p></div>
              <div><span>Frustrations to validate</span><p>Unclear totals, hidden conditions, repetitive form entry and difficult comparisons.</p></div>
              <div><span>Behaviors to investigate</span><p>Cross-checks options, scans images first and looks for reassurance before paying.</p></div>
              <div><span>Research need</span><p>Validate segment, trip contexts, decision criteria and language with interviews.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="rental-section rental-shell rental-journey">
        <SectionHeading index="08" eyebrow="Journey map" title="Confidence rises or falls at every decision point." />
        <div className="rental-journey-map">
          {[
            ["Discover", "Define the trip", "Where and when?", "Curious", "Guide setup"],
            ["Explore", "See relevant cars", "Too many choices", "Hopeful", "Prioritize fit"],
            ["Compare", "Understand trade-offs", "Terms compete", "Uncertain", "Unify the offer"],
            ["Decide", "Choose confidently", "Hidden detail risk", "Cautious", "Reassure early"],
            ["Complete", "Secure the booking", "More form work", "Committed", "Preserve context"],
          ].map(([stage, goal, pain, emotion, opportunity], index) => (
            <article className={stage === "Compare" ? "is-critical" : ""} key={stage}>
              <span>0{index + 1}</span><h3>{stage}</h3><dl><div><dt>Goal</dt><dd>{goal}</dd></div><div><dt>Tension</dt><dd>{pain}</dd></div><div><dt>Emotion</dt><dd>{emotion}</dd></div><div><dt>Opportunity</dt><dd>{opportunity}</dd></div></dl>
            </article>
          ))}
        </div>
        <p className="rental-journey-conclusion">The strongest opportunity sits at <strong>Compare</strong>: bring vehicle fit, price and conditions into one coherent offer.</p>
      </section>

      <section className="rental-competition">
        <div className="rental-shell">
          <SectionHeading inverse index="09" eyebrow="Competitive framing" title="Audit patterns before choosing conventions." copy="A formal competitor study has not been supplied. This framework identifies the categories and questions to evaluate without inventing findings." />
          <div className="rental-competition-grid">
            {[
              ["Direct rental", "Fleet clarity", "How are fees explained?", "Pending audit"],
              ["Marketplace", "Breadth of choice", "How is trust established?", "Pending audit"],
              ["Aggregator", "Fast comparison", "What happens after handoff?", "Pending audit"],
              ["Mobility app", "Familiar interaction", "How is commitment framed?", "Pending audit"],
            ].map(([product, strength, question, status]) => <article key={product}><h3>{product}</h3><p><span>Pattern to inspect</span>{strength}</p><p><span>Key question</span>{question}</p><EvidenceTag>{status}</EvidenceTag></article>)}
          </div>
          <div className="rental-difference"><div><span>Borrow</span><p>Familiar search inputs, progressive disclosure and transparent price summaries.</p></div><div><span>Avoid</span><p>Dense result cards, late fee disclosure and comparison patterns that lose trip context.</p></div><div><span>Differentiate</span><p>Make “fit for this trip” as legible as the vehicle and price.</p></div></div>
        </div>
      </section>

      <section className="rental-section rental-shell" id="process">
        <SectionHeading index="10" eyebrow="Information architecture" title="Make complexity feel sequential." copy="The current UI verifies search and results. The remaining booking path is a proposed structure for the next design phase." />
        <div className="rental-ia">
          <div className="rental-ia-root">Northside Rentals <EvidenceTag>Current</EvidenceTag></div>
          <div className="rental-ia-branches">
            <article><span>01</span><h3>Search</h3><p>Location · dates · driver</p><EvidenceTag>Current</EvidenceTag></article>
            <article><span>02</span><h3>Results</h3><p>Vehicles · filters · offers</p><EvidenceTag>Current</EvidenceTag></article>
            <article><span>03</span><h3>Details</h3><p>Fit · terms · protection</p><EvidenceTag>Proposed</EvidenceTag></article>
            <article><span>04</span><h3>Booking</h3><p>Driver · payment · review</p><EvidenceTag>Proposed</EvidenceTag></article>
            <article><span>05</span><h3>Confirmation</h3><p>Summary · pickup · support</p><EvidenceTag>Proposed</EvidenceTag></article>
          </div>
        </div>
        <div className="rental-flow-comparison">
          <div><p className="rental-column-label">Friction to test</p><div className="rental-flow-line is-old"><span>Entry</span><i>→</i><span>Setup</span><i>→</i><span className="is-friction">Too many decisions?</span><i>→</i><span>Results</span><i>→</i><span className="is-friction">Terms too late?</span></div></div>
          <div><p className="rental-column-label">Proposed flow</p><div className="rental-flow-line"><span>Entry</span><i>→</i><span>Search</span><i>→</i><span>Compare</span><i>→</i><span>Details</span><i>→</i><span>Review</span><i>→</i><span>Confirm</span></div></div>
        </div>
      </section>

      <section className="rental-ideation">
        <div className="rental-shell">
          <SectionHeading inverse index="11" eyebrow="Exploring the solution" title="Three directions, one clear principle." copy="Each concept was evaluated by how well it supported the moment of choosing—not by visual novelty." />
          <blockquote><span>How might we</span> make a complex rental offer easy to compare without hiding the conditions that create trust?</blockquote>
          <div className="rental-concepts">
            <article><span>A</span><h3>Browse first</h3><Wireframe variant="results" /><dl><div><dt>Pro</dt><dd>Fast visual discovery</dd></div><div><dt>Risk</dt><dd>Low relevance before context</dd></div></dl></article>
            <article className="is-selected"><span>B · Selected</span><h3>Context first</h3><Wireframe variant="search" /><dl><div><dt>Pro</dt><dd>Relevant results and clear intent</dd></div><div><dt>Risk</dt><dd>Setup must remain light</dd></div></dl></article>
            <article><span>C</span><h3>Wizard flow</h3><Wireframe variant="details" /><dl><div><dt>Pro</dt><dd>One decision at a time</dd></div><div><dt>Risk</dt><dd>Slow and hard to scan back</dd></div></dl></article>
          </div>
          <div className="rental-selected-rationale"><span>Why Direction B</span><p>It establishes relevance before comparison, keeps the search state visible and creates a natural bridge to the offer cards already present in the supplied design.</p></div>
        </div>
      </section>

      <section className="rental-section rental-shell rental-wireframes-section">
        <SectionHeading index="12" eyebrow="Wireframes and progression" title="Structure before surface." copy="The proposed progression keeps one product question in focus at each fidelity: what does the customer need to understand next?" />
        <div className="rental-fidelity">
          <article><span>Low fidelity</span><Wireframe variant="search" /><p><b>Problem</b> Group the trip inputs.</p><p><b>Decision</b> One setup panel and one action.</p></article>
          <article><span>Mid fidelity</span><Wireframe variant="results" /><p><b>Problem</b> Compare fit and price.</p><p><b>Decision</b> Repeat a stable card hierarchy.</p></article>
          <article className="is-final"><span>High fidelity</span><button type="button" onClick={() => setZoomed("results")} aria-label="Zoom search results screen"><Phone screen="results" label="High-fidelity results" /></button><p><b>Problem</b> Build confidence in the offer.</p><p><b>Decision</b> Keep price and conditions together.</p></article>
        </div>
      </section>

      <section className="rental-prototype">
        <div className="rental-shell rental-prototype-grid">
          <div>
            <SectionHeading inverse index="13" eyebrow="Making it testable" title="A prototype should answer product questions." copy="The supplied assets show the home and results states. A working prototype link and the remaining booking states still need to be connected." />
            <div className="rental-primary-flow"><span>Discover</span><i>→</i><span>Select</span><i>→</i><span>Review</span><i>→</i><span>Complete</span></div>
            <button className="rental-disabled-cta" type="button" disabled>Prototype link to be added ↗</button>
          </div>
          <div className="rental-prototype-phones"><Phone screen="home" label="Home state" /><Phone screen="results" label="Results state" /></div>
        </div>
      </section>

      <section className="rental-section rental-shell rental-testing">
        <SectionHeading index="14" eyebrow="Usability testing" title="Validate the decisions that carry the most risk." copy="No completed study was provided. This is the minimum test plan needed before presenting findings or performance claims." />
        <div className="rental-test-plan">
          <dl><div><dt>Participants</dt><dd>[X participants]</dd></div><div><dt>Method</dt><dd>Moderated remote</dd></div><div><dt>Duration</dt><dd>[XX minutes]</dd></div><div><dt>Prototype</dt><dd>High fidelity</dd></div></dl>
          <ol><li>Set up a rental for a defined trip.</li><li>Choose between two vehicles with different offers.</li><li>Explain the final price and included conditions.</li><li>Review and confirm the proposed booking.</li></ol>
        </div>
        <div className="rental-test-findings">
          {["Search setup comprehension", "Vehicle comparison", "Price and terms", "Checkout confidence"].map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p><b>Evidence</b> [X/X participants]</p><p><b>Finding</b> Add observed behavior after testing.</p><p><b>Change</b> Connect the evidence to the next iteration.</p></article>)}
        </div>
      </section>

      <section className="rental-iterations">
        <div className="rental-shell">
          <SectionHeading inverse index="15" eyebrow="Design iterations" title="Show what changed—and why." copy="Without recorded usability findings, the comparisons below document design rationale, not validated improvement." />
          <div className="rental-iteration-list">
            <article>
              <div className="rental-iteration-copy"><span>Iteration 01</span><h3>From scattered inputs to one rental task.</h3><dl><div><dt>Before</dt><dd>Trip variables read as separate form controls.</dd></div><div><dt>Problem</dt><dd>The customer must mentally assemble the rental context.</dd></div><div><dt>After</dt><dd>Location, timing, driver and promotion inputs share one visual container.</dd></div><div><dt>Decision</dt><dd>Use a single primary action to close the setup sequence.</dd></div></dl></div>
              <div className="rental-before-after"><div><span>Before · structural sketch</span><Wireframe variant="search" /></div><i>→</i><div><span>After · current UI</span><button type="button" onClick={() => setZoomed("home")}><Phone screen="home" label="Grouped rental setup" /></button></div></div>
            </article>
            <article>
              <div className="rental-iteration-copy"><span>Iteration 02</span><h3>From vehicle listing to understandable offer.</h3><dl><div><dt>Before</dt><dd>A list can over-prioritize the vehicle name and image.</dd></div><div><dt>Problem</dt><dd>Practical fit and commercial terms become difficult to compare.</dd></div><div><dt>After</dt><dd>Each result follows identity → capacity → inclusions → price.</dd></div><div><dt>Decision</dt><dd>Keep the entire value proposition inside one repeated card.</dd></div></dl></div>
              <div className="rental-before-after"><div><span>Before · structural sketch</span><Wireframe variant="results" /></div><i>→</i><div><span>After · current UI</span><button type="button" onClick={() => setZoomed("results")}><Phone screen="results" label="Scannable vehicle offer" /></button></div></div>
            </article>
          </div>
        </div>
      </section>

      <section className="rental-solution" id="solution">
        <div className="rental-shell">
          <SectionHeading inverse index="16" eyebrow="The solution" title="A clearer path from trip intent to vehicle choice." copy="The delivered concept makes rental setup coherent and vehicle offers easier to scan. The full booking flow remains the next design phase." />
          <div className="rental-solution-stage"><Phone screen="home" label="Search and discovery" /><div className="rental-solution-divider"><span>Search</span><i /><span>Compare</span></div><Phone screen="results" label="Results and offer comparison" /></div>
          <div className="rental-feature-list">
            <article><span>Feature 01</span><h3>Rental setup, one task</h3><p><b>Problem</b> Trip criteria can feel like unrelated form work.</p><p><b>Design decision</b> Group the inputs in one high-contrast search area.</p><p><b>Why it works</b> The visual boundary explains what belongs together and where the task ends.</p></article>
            <article><span>Feature 02</span><h3>Discovery with context</h3><p><b>Problem</b> Customers may want to browse before making a formal search.</p><p><b>Design decision</b> Follow setup with deals and featured vehicles.</p><p><b>Why it works</b> Browsing supports orientation without competing with the primary action.</p></article>
            <article><span>Feature 03</span><h3>Comparable vehicle offers</h3><p><b>Problem</b> Images, capacity, inclusions and price all need attention.</p><p><b>Design decision</b> Use the same content order in every result card.</p><p><b>Why it works</b> Repetition lowers the effort of comparing alternatives.</p></article>
            <article><span>Feature 04 · Proposed</span><h3>Transparent booking review</h3><p><b>Problem</b> Late terms can break trust near payment.</p><p><b>Design decision</b> Carry trip context, total price and conditions into review.</p><p><b>Why it works</b> Customers can confirm the same offer they selected.</p></article>
          </div>
        </div>
      </section>

      <section className="rental-section rental-shell rental-system">
        <SectionHeading index="17" eyebrow="Design system" title="A visual language built for momentum and clarity." copy="Yellow drives action and price emphasis, deep navy supports trust and structure, while white preserves space for dense rental information." />
        <div className="rental-foundations">
          <article className="is-type"><span>Typography</span><strong>Aa</strong><p>Manrope · clear hierarchy · compact labels</p></article>
          <article className="is-color"><span>Color</span><div><i /><i /><i /><i /></div><p>Action · trust · surface · semantic</p></article>
          <article className="is-space"><span>Spacing</span><div><i /><i /><i /><i /><i /></div><p>8 · 16 · 24 · 32 · 48</p></article>
          <article className="is-components"><span>Components</span><button type="button">Find cars</button><label>Pickup location<input aria-label="Example pickup location" value="Manchester Airport" readOnly /></label></article>
        </div>
        <div className="rental-states"><span>Default</span><span>Hover</span><span>Focus</span><span>Disabled</span><span>Error</span><span>Success</span></div>
      </section>

      <section className="rental-accessibility">
        <div className="rental-shell">
          <SectionHeading inverse index="18" eyebrow="Accessibility" title="Confidence also means being able to complete the task." />
          <div className="rental-access-grid">
            <article><span>Aa</span><h3>Readable hierarchy</h3><p>Responsive type, concise labels and body text sized for sustained scanning.</p></article>
            <article><span>◉</span><h3>Visible focus</h3><p>Keyboard focus is never communicated by color alone.</p></article>
            <article><span>44</span><h3>Touch targets</h3><p>Controls should maintain at least a comfortable 44px interaction area.</p></article>
            <article><span>!</span><h3>Helpful errors</h3><p>Inline messages explain the problem and how to recover.</p></article>
            <article><span>⌨</span><h3>Keyboard path</h3><p>Search, filters, comparison and booking remain operable without a pointer.</p></article>
            <article><span>TXT</span><h3>Semantic detail</h3><p>Inputs, prices, states and vehicle images receive meaningful labels.</p></article>
          </div>
        </div>
      </section>

      <section className="rental-section rental-shell rental-edge-cases">
        <SectionHeading index="19" eyebrow="Beyond the happy path" title="Real booking journeys are rarely perfect." />
        <div className="rental-edge-grid">
          {["Loading inventory", "No matching cars", "Price changed", "Network failure", "Invalid driver detail", "Payment declined", "Booking confirmed", "Pickup unavailable"].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><div className={`rental-edge-icon edge-${index}`}><i /></div><h3>{item}</h3><p>{index < 6 ? "Explain the state and preserve the customer’s entered context." : "Confirm what happened and make the next action obvious."}</p></article>)}
        </div>
      </section>

      <section className="rental-handoff">
        <div className="rental-shell">
          <SectionHeading inverse index="20" eyebrow="From design to development" title="Define behavior, not just appearance." copy="A reliable handoff connects components to responsive rules, data states and acceptance criteria." />
          <div className="rental-handoff-stage">
            <div className="rental-spec-card"><span>Vehicle card · v1.0</span><div className="rental-mini-car" /><dl><div><dt>Image ratio</dt><dd>16:9</dd></div><div><dt>Spacing</dt><dd>8 / 16 / 24</dd></div><div><dt>Price</dt><dd>Total + daily</dd></div><div><dt>States</dt><dd>Loading / unavailable</dd></div></dl></div>
            <div className="rental-handoff-arrow"><span>Design tokens</span><i>→</i><span>Specs</span><i>→</i><span>QA</span></div>
            <div className="rental-code-card" aria-label="Handoff checklist"><span>Handoff checklist</span><p>✓ Responsive behavior</p><p>✓ Interaction states</p><p>✓ Content rules</p><p>✓ Edge cases</p><p>✓ Accessibility notes</p></div>
          </div>
        </div>
      </section>

      <section className="rental-showcase">
        <div className="rental-shell">
          <p className="rental-eyebrow">Final product experience</p>
          <h2>Designed to stay clear from pocket to desktop.</h2>
          <div className="rental-device-stage">
            <div className="rental-desktop-device"><div><Image src="/images/projects/northside-search-results.png" alt="Northside Rentals results shown in a responsive desktop concept" fill sizes="760px" /></div></div>
            <Phone screen="home" label="Mobile search" />
          </div>
        </div>
      </section>

      <section className="rental-impact" id="impact">
        <div className="rental-shell">
          <SectionHeading inverse index="21" eyebrow="The impact" title="An honest baseline, ready to measure." copy="The concept has not shipped and no production analytics were supplied. The metrics below define what should be measured—not results being claimed." />
          <div className="rental-metrics">
            <article><strong>—</strong><span>Task completion</span><p>Baseline required</p></article><article><strong>—</strong><span>Time on task</span><p>Baseline required</p></article><article><strong>—</strong><span>Search conversion</span><p>Baseline required</p></article><article><strong>—</strong><span>Booking drop-off</span><p>Baseline required</p></article>
          </div>
          <div className="rental-impact-copy"><article><span>User impact</span><p>The intended outcome is a calmer comparison experience with clearer pricing and fewer unanswered questions.</p></article><article><span>Business impact</span><p>The proposed measure is stronger progression from qualified search to completed booking.</p></article><article><span>Team impact</span><p>A reusable result-card model and explicit state coverage create a clearer foundation for implementation.</p></article></div>
        </div>
      </section>

      <section className="rental-section rental-shell" id="learnings">
        <SectionHeading index="22" eyebrow="What I learned" title="The interface is where product trade-offs become visible." />
        <div className="rental-learning-grid">
          <article><span>01</span><h3>Progressive disclosure is a product decision.</h3><p>The challenge is not removing information; it is deciding when each piece becomes necessary.</p></article>
          <article><span>02</span><h3>Comparison needs a stable grammar.</h3><p>Customers compare faster when every offer tells its story in the same order.</p></article>
          <article><span>03</span><h3>Evidence gaps should remain visible.</h3><p>A senior case study is stronger when hypotheses, completed work and future validation are clearly distinguished.</p></article>
        </div>
        <div className="rental-next">
          <div><p className="rental-column-label">What’s next</p><h3>Turn the concept into an evidence-backed booking system.</h3></div>
          <ol><li>Interview customers across trip types.</li><li>Complete details, checkout and confirmation.</li><li>Run moderated usability sessions.</li><li>Define analytics and launch baselines.</li><li>Audit accessibility with assistive technology.</li></ol>
        </div>
      </section>

      <section className="rental-reflection">
        <div className="rental-shell">
          <SectionHeading inverse index="23" eyebrow="Reflection" title="My role was to make the decision structure visible." />
          <div className="rental-reflection-grid"><article><span>My role</span><p>I owned the product framing, information hierarchy, mobile UX, interface direction and documentation of the next validation steps.</p></article><article><span>Biggest challenge</span><p>Balancing vehicle desirability with the practical and commercial information needed for comparison.</p></article><article><span>How I approached it</span><p>I treated each result as an offer: identity first, then trip fit, then price and conditions.</p></article><article><span>Biggest takeaway</span><p>Confidence comes from timing information well—not from putting everything on screen.</p></article></div>
        </div>
      </section>

      <footer className="rental-case-footer">
        <div className="rental-shell">
          <blockquote>Good product design isn’t about creating beautiful screens. It’s about understanding the problem, making informed decisions and creating measurable value.</blockquote>
          <div><Link href="/#work">← Back to Work</Link><Link href="/work/medicine-reminder">Next Case Study →</Link></div>
          <p>© {new Date().getFullYear()} Aamir Khan · Lead Product Designer</p>
        </div>
      </footer>

      {zoomed && (
        <div className="rental-lightbox" role="dialog" aria-modal="true" aria-label="Expanded product screen">
          <button type="button" onClick={() => setZoomed(null)} aria-label="Close expanded image">Close ×</button>
          <Phone screen={zoomed} label={zoomed === "home" ? "Expanded rental search screen" : "Expanded vehicle results screen"} />
        </div>
      )}
    </main>
  );
}
