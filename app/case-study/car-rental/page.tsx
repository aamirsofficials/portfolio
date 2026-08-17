import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoFiCarousel } from "./LoFiCarousel";
import { PersonaCarousel } from "./PersonaCarousel";
import "./car-rental.css";

const title = "Car Rental Booking Platform — Aamir Khan";
const description = "A mobile car-rental booking experience designed to make vehicle discovery, comparison and booking clearer.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

const personas = [
  {
    tone: "driver",
    initials: "LM",
    name: "Liam Morgan",
    role: "Rideshare driver · Broome, Australia",
    quote: "I need a reliable car without losing a day of work.",
    about: [
      ["Age", "38"],
      ["Location", "Broome"],
      ["Occupation", "Full-time driver"],
      ["Device", "Android"],
    ],
    traits: ["Practical", "Time-conscious", "Tech confident"],
    motivation: "Keep vehicle downtime low and get back on the road with a dependable car at a predictable cost.",
    goals: [
      "Book around a changing work schedule",
      "Compare price, mileage and fuel policy quickly",
      "Complete check-in before reaching the branch",
    ],
    painPoints: [
      "Availability changes late in the journey",
      "Extra fees are difficult to calculate",
      "Urgent support is hard to reach during a trip",
    ],
  },
  {
    tone: "planner",
    initials: "MC",
    name: "Maya Chen",
    role: "Family trip planner · Singapore",
    quote: "I want to feel certain the car will suit our whole trip.",
    about: [
      ["Age", "32"],
      ["Location", "Singapore"],
      ["Occupation", "Marketing manager"],
      ["Device", "iPhone"],
    ],
    traits: ["Organized", "Value-aware", "Careful"],
    motivation: "Plan a smooth family holiday with enough space, clear protection options and no surprises at pickup.",
    goals: [
      "Find a car that fits passengers and luggage",
      "Understand offers, insurance and total cost",
      "Keep booking details and help easy to access",
    ],
    painPoints: [
      "Similar vehicles are difficult to compare",
      "Rental terms use unfamiliar language",
      "Trip changes and support options feel unclear",
    ],
  },
] as const;

const empathyGroups = [
  {
    key: "says",
    label: "Says",
    items: [
      "“Show me the full price upfront.”",
      "“Help me find a car that fits my trip.”",
      "“I need quick help if something goes wrong.”",
    ],
  },
  {
    key: "thinks",
    label: "Thinks",
    items: [
      "Is this vehicle actually available?",
      "What happens if my plans change?",
      "Can I finish everything before pickup?",
    ],
  },
  {
    key: "does",
    label: "Does",
    items: [
      "Compares prices across several platforms",
      "Filters by vehicle type, price and space",
      "Checks policies, reviews and support options",
    ],
  },
  {
    key: "feels",
    label: "Feels",
    items: [
      "Cautious when fees are unclear",
      "Overwhelmed by similar choices",
      "Reassured by clear steps and visible support",
    ],
  },
] as const;

const quantitativeInsights = [
  { value: 68, label: "Used vehicle filters" },
  { value: 42, label: "Dropped off before checkout" },
  { value: 57, label: "Compared two or more vehicles" },
  { value: 31, label: "Revisited pricing or conditions" },
  { value: 24, label: "Abandoned during payment" },
] as const;

type FlowNodeKind = "start" | "end" | "screen" | "action" | "system" | "decision";

function FlowNode({
  kind = "screen",
  label,
  detail,
  choices,
}: {
  kind?: FlowNodeKind;
  label: string;
  detail?: string;
  choices?: readonly string[];
}) {
  return (
    <div className={`car-flow-node car-flow-node-${kind}`}>
      <span>{kind === "start" || kind === "end" ? "Flow" : kind}</span>
      <strong>{label}</strong>
      {detail ? <small>{detail}</small> : null}
      {choices ? <div className="car-flow-choices">{choices.map((choice) => <em key={choice}>{choice}</em>)}</div> : null}
    </div>
  );
}

function FlowArrow({ label, down = false }: { label?: string; down?: boolean }) {
  return (
    <div className={`car-flow-arrow${down ? " car-flow-arrow-down" : ""}`} aria-hidden="true">
      {label ? <small>{label}</small> : null}
      <span>{down ? "↓" : "→"}</span>
    </div>
  );
}

export default function CarRentalCaseStudyPage() {
  return (
    <main className="car-case-study-page">
      <header className="car-case-study-header">
        <div className="car-case-study-shell car-case-study-header-inner">
          <Link className="car-case-study-brand" href="/" aria-label="Aamir Khan portfolio home">
            <span>
              <Image className="car-brand-logo-light" src="/logo-icon-black.svg" alt="" width={30} height={30} />
              <Image className="car-brand-logo-dark" src="/logo-icon-white.svg" alt="" width={30} height={30} />
            </span>
            <b>Aamir Khan</b>
          </Link>
          <Link className="car-case-study-back" href="/#work"><span aria-hidden="true">←</span> Back to work</Link>
        </div>
      </header>

      <section className="car-case-study-overview" aria-labelledby="car-case-study-title">
        <div className="car-case-study-shell car-case-study-overview-grid">
          <div className="car-case-study-intro">
            <p className="car-case-study-eyebrow">Product Design · UX/UI</p>
            <h1 id="car-case-study-title">Car Rental Booking Platform</h1>
            <p className="car-case-study-summary">A mobile booking experience that helps customers define their trip, discover relevant vehicles, compare practical details and understand the offer before making a decision.</p>
          </div>

          <dl className="car-case-study-metadata">
            <div><dt>Role</dt><dd>Product Designer</dd></div>
            <div><dt>Timeline</dt><dd>Apr–Jun 2026</dd></div>
            <div><dt>Team</dt><dd>Project Manager · Stakeholder · Backend Developer · QA</dd></div>
            <div><dt>Platform</dt><dd>Mobile · Android · iOS</dd></div>
            <div><dt>Industry</dt><dd>Mobility · Travel · Car Rental</dd></div>
            <div><dt>Tools</dt><dd>Figma · Photoshop · Illustrator · ChatGPT · Claude</dd></div>
            <div className="car-case-study-meta-wide"><dt>Contribution</dt><dd>Execution Strategy · UX Research · Wireframing · UI · Prototyping · Usability Testing</dd></div>
          </dl>
        </div>
      </section>

      <section className="car-case-study-challenge" aria-labelledby="car-challenge-title">
        <div className="car-case-study-shell">
          <header className="car-challenge-heading">
            <div className="car-section-label"><span>02</span><p>The Challenge</p></div>
            <div>
              <h2 id="car-challenge-title">The rental journey lacked a clear direction.</h2>
              <p>Northside Rentals needed to turn a fragmented web experience into one connected journey—making booking easier for customers while giving the business better context to personalize service and support.</p>
            </div>
          </header>

          <div className="car-challenge-problems">
            <article>
              <p className="car-challenge-label"><span>01</span> · Business problem</p>
              <h3>Customer intent was getting lost between disconnected booking steps.</h3>
              <ul>
                <li>Disconnected rental journey</li>
                <li>Unclear booking flow</li>
                <li>Inconsistent customer data</li>
                <li>Limited personalized support</li>
              </ul>
            </article>

            <article>
              <p className="car-challenge-label"><span>02</span> · User problem</p>
              <h3>Booking a car felt confusing before, during and after selection.</h3>
              <ul>
                <li>Unclear offers and search results</li>
                <li>Confusing booking and check-in</li>
                <li>No personalized recommendations</li>
                <li>Hard-to-find help and SOS support</li>
              </ul>
            </article>
          </div>

        </div>
      </section>

      <section className="car-ux-process" aria-labelledby="car-ux-process-title">
        <div className="car-case-study-shell">
          <header className="car-ux-heading">
            <span>03 · UX Design Process</span>
            <h2 id="car-ux-process-title">UX Research<span>.</span></h2>
            <p>Research focused on user needs, booking friction, decision criteria and support expectations.</p>
          </header>

          <div className="car-research-cards">
            <article className="car-research-objectives">
              <span className="car-research-index">01 · Research objectives</span>
              <ul>
                <li>Understand how renters define a trip and shortlist a vehicle.</li>
                <li>Identify uncertainty across search, booking and check-in.</li>
                <li>Learn which details build trust in price, availability and policies.</li>
                <li>Clarify what the business needs to personalize follow-up and support.</li>
              </ul>
            </article>

            <article className="car-research-methods">
              <span className="car-research-index">02 · Research methods</span>
              <p className="car-method-titles">User interviews, Usability testing, Competitive analysis, Stakeholder interviews</p>
            </article>

            <article className="car-target-users">
              <span className="car-research-index">03 · Target users</span>
              <p>People renting for work, travel and everyday mobility.</p>
            </article>
          </div>

          <a
            className="car-competitor-card"
            href="/case-studies/car-rental-competitor-analysis.xlsx"
            download
            aria-label="Download the Car Rental Competitor Analysis Excel workbook"
          >
            <div>
              <span className="car-competitor-eyebrow">Research deliverable</span>
              <h3>Competitor Analysis</h3>
              <p>Review the complete car rental comparison in the Excel workbook.</p>
            </div>
            <span className="car-competitor-download">
              <span className="car-competitor-filetype">XLSX</span>
              Download workbook <span aria-hidden="true">→</span>
            </span>
          </a>

          <div className="car-insight-cards">
            <article>
              <span className="car-insight-index">01 · Research insight</span>
              <h3>Qualitative Research Insights</h3>
              <ul>
                <li>Users found it difficult to compare vehicles beyond the daily rental price.</li>
                <li>Hidden costs such as insurance, deposits, taxes and additional fees created uncertainty.</li>
                <li>Users wanted clearer information about mileage, fuel policy, cancellation and pickup requirements before booking.</li>
                <li>Trust was strongly influenced by vehicle photos, ratings, reviews and transparent rental policies.</li>
                <li>Users preferred a simple booking flow with fewer decisions and distractions.</li>
              </ul>
              <div className="car-key-insight">
                <span>Key insight</span>
                <blockquote>Users weren’t simply looking for the cheapest car—they wanted confidence that they were making the right choice with no unexpected surprises.</blockquote>
              </div>
            </article>

            <article>
              <span className="car-insight-index">02 · Research insight</span>
              <h3>Quantitative Research Insights</h3>
              <div className="car-quant-chart-grid">
                {quantitativeInsights.map((insight) => (
                  <figure key={insight.label}>
                    <div
                      className="car-quant-donut"
                      style={{ "--chart-value": `${insight.value}%` } as CSSProperties}
                      role="img"
                      aria-label={`${insight.value}%: ${insight.label}`}
                    >
                      <strong>{insight.value}%</strong>
                    </div>
                    <figcaption>{insight.label}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="car-key-insight">
                <span>Key insight</span>
                <blockquote>The biggest opportunity was to simplify comparison and make the total cost and rental conditions clearer earlier in the booking journey.</blockquote>
              </div>
            </article>
          </div>

          <PersonaCarousel personas={personas} />

          <section className="car-empathy" aria-labelledby="car-empathy-title">
            <header className="car-research-subheading">
              <span>Research artifact</span>
              <h3 id="car-empathy-title">Aggregated Empathy Map<span>.</span></h3>
              <p>Shared behaviors and emotions across both user groups.</p>
            </header>

            <div className="car-empathy-map">
              {empathyGroups.map((group) => (
                <article className={`car-empathy-quadrant car-empathy-${group.key}`} key={group.key}>
                  <h4>{group.label}</h4>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
              <div className="car-empathy-user" aria-label="Aggregated user">
                <span>Shared view</span>
                <strong>Value-conscious renter</strong>
              </div>
            </div>

            <article className="car-goal-statement">
              <h3>Goal statement</h3>
              <p>Create a transparent car rental platform that helps people compare vehicles, understand the full cost and book with confidence, while keeping pickup information and support easy to access throughout the journey.</p>
            </article>
          </section>
        </div>
      </section>

      <section className="car-user-flows" aria-labelledby="car-user-flows-title">
        <div className="car-case-study-shell">
          <header className="car-ux-heading">
            <span>04 · UX Design Process</span>
            <h2 id="car-user-flows-title">User Flow<span>.</span></h2>
            <p>Three focused journeys connect research insights with the decisions users need to make.</p>
          </header>

          <div className="car-flow-legend" aria-label="User flow legend">
            <span><i className="car-flow-legend-terminal" /> Start / End</span>
            <span><i className="car-flow-legend-screen" /> Screen</span>
            <span><i className="car-flow-legend-action" /> User action</span>
            <span><i className="car-flow-legend-system" /> System response</span>
            <span><i className="car-flow-legend-decision" /> Decision</span>
          </div>

          <div className="car-flow-list">
            <article className="car-flow-card">
              <header className="car-flow-card-heading">
                <span>01</span>
                <div>
                  <h3>Search &amp; Discovery</h3>
                  <p>How users find, filter and evaluate rental vehicles before making a decision.</p>
                </div>
              </header>

              <div className="car-flow-rationale">
                <div><span>Research insight</span><p>Users struggle to compare vehicles and understand what affects the price.</p></div>
                <b aria-hidden="true">→</b>
                <div><span>Design decision</span><p>Keep trip details visible and make filters, comparison and total-cost cues easy to scan.</p></div>
              </div>

              <div className="car-flow-scroll" tabIndex={0} aria-label="Scroll to view the complete Search and Discovery flow">
                <div className="car-flow-canvas" role="img" aria-label="Search and Discovery user flow from the home page to vehicle details, including a no-results recovery path">
                  <div className="car-flow-lane">
                    <FlowNode kind="start" label="Start" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="Home / Landing page" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Enter pickup location" />
                    <FlowArrow />
                    <FlowNode kind="system" label="Display valid locations" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Select pickup point" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Select pickup date & time" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Select return date & time" />
                    <FlowArrow />
                    <FlowNode kind="system" label="Validate trip details" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Search cars" />
                    <FlowArrow />
                    <FlowNode kind="decision" label="Cars available?" choices={["Yes", "No"]} />
                    <FlowArrow label="Yes" />
                    <FlowNode kind="system" label="Show search results" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Filter & sort" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Browse & compare" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="Vehicle details" />
                    <FlowArrow />
                    <FlowNode kind="end" label="Continue to booking" />
                  </div>

                  <div className="car-flow-secondary">
                    <span className="car-flow-branch-label">No results path · From “Cars available?”</span>
                    <div className="car-flow-lane">
                      <FlowNode kind="system" label="No cars available" />
                      <FlowArrow />
                      <FlowNode kind="system" label="Suggest alternatives" detail="Dates · locations · vehicle categories" />
                      <FlowArrow />
                      <FlowNode kind="action" label="Change search" />
                      <FlowArrow />
                      <FlowNode kind="action" label="Search cars" />
                      <FlowArrow />
                      <FlowNode kind="end" label="Return to availability check" />
                    </div>
                  </div>

                  <div className="car-flow-secondary">
                    <span className="car-flow-branch-label">Filter loop</span>
                    <div className="car-flow-lane">
                      <FlowNode kind="action" label="Apply filter" />
                      <FlowArrow />
                      <FlowNode kind="system" label="Update results" />
                      <FlowArrow />
                      <FlowNode kind="action" label="Clear filter" />
                      <FlowArrow />
                      <FlowNode kind="end" label="Return to results" />
                    </div>
                    <p className="car-flow-meta">Vehicle type · Price · Transmission · Seats · Luggage · Fuel · Mileage · Supplier · Pickup location</p>
                  </div>
                </div>
              </div>

              <div className="car-flow-edge-cases">
                <span>Edge cases</span>
                <p>Invalid location · Same or different return location · Date unavailable · Vehicle unavailable</p>
              </div>
            </article>

            <article className="car-flow-card">
              <header className="car-flow-card-heading">
                <span>02</span>
                <div>
                  <h3>Booking</h3>
                  <p>How a selected vehicle becomes a clear, confirmed and paid booking.</p>
                </div>
              </header>

              <div className="car-flow-rationale">
                <div><span>Research insight</span><p>Hidden costs and unclear protection create hesitation before checkout.</p></div>
                <b aria-hidden="true">→</b>
                <div><span>Design decision</span><p>Explain rental conditions and show every cost component before payment.</p></div>
              </div>

              <div className="car-flow-scroll" tabIndex={0} aria-label="Scroll to view the complete Booking flow">
                <div className="car-flow-canvas" role="img" aria-label="Booking user flow from vehicle details to confirmation, including protection choice and payment failure recovery">
                  <div className="car-flow-lane">
                    <FlowNode kind="start" label="Start" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="Vehicle details" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Select vehicle" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="Review rental conditions" detail="Mileage · fuel · cancellation · deposit" />
                    <FlowArrow />
                    <FlowNode kind="decision" label="Add protection?" choices={["Add", "Continue without"]} />
                    <FlowArrow />
                    <FlowNode kind="action" label="Select optional extras" detail="Driver · child seat · GPS · toll pass" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="Booking summary" detail="Base price · protection · extras · fees · deposit · total" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Enter driver details" />
                    <FlowArrow />
                    <FlowNode kind="system" label="Validate driver details" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="Review booking" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Payment" />
                    <FlowArrow />
                    <FlowNode kind="decision" label="Payment successful?" choices={["Yes", "No"]} />
                    <FlowArrow label="Yes" />
                    <FlowNode kind="system" label="Booking confirmation" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="Confirmation number" />
                    <FlowArrow />
                    <FlowNode kind="end" label="End" />
                  </div>

                  <div className="car-flow-secondary">
                    <span className="car-flow-branch-label">Payment failure path · From “Payment successful?”</span>
                    <div className="car-flow-lane">
                      <FlowNode kind="system" label="Payment failed" />
                      <FlowArrow />
                      <FlowNode kind="system" label="Show clear error" />
                      <FlowArrow />
                      <FlowNode kind="decision" label="Next action" choices={["Retry", "Change method"]} />
                      <FlowArrow />
                      <FlowNode kind="end" label="Return to payment" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="car-flow-edge-cases">
                <span>Edge cases</span>
                <p>Invalid driver information · Vehicle becomes unavailable · Price change · Payment failure</p>
              </div>
            </article>

            <article className="car-flow-card">
              <header className="car-flow-card-heading">
                <span>03</span>
                <div>
                  <h3>Manage Booking</h3>
                  <p>How users modify, cancel or get support after a booking is created.</p>
                </div>
              </header>

              <div className="car-flow-rationale">
                <div><span>Research insight</span><p>Trip changes and support options feel unclear after confirmation.</p></div>
                <b aria-hidden="true">→</b>
                <div><span>Design decision</span><p>Give every booking one place for changes, cancellation details and support.</p></div>
              </div>

              <div className="car-flow-scroll" tabIndex={0} aria-label="Scroll to view the complete Manage Booking flow">
                <div className="car-flow-canvas car-flow-manage" role="img" aria-label="Manage Booking flow with modify, cancel and support branches">
                  <div className="car-flow-lane car-flow-manage-entry">
                    <FlowNode kind="start" label="Start" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="My Bookings" />
                    <FlowArrow />
                    <FlowNode kind="action" label="Select booking" />
                    <FlowArrow />
                    <FlowNode kind="screen" label="Booking details" />
                    <FlowArrow />
                    <FlowNode kind="decision" label="Choose task" choices={["Modify", "Cancel", "Support"]} />
                  </div>

                  <div className="car-flow-branch-grid">
                    <section className="car-flow-vertical-lane" aria-label="Modify booking branch">
                      <span className="car-flow-branch-label">01 · Modify</span>
                      <FlowNode kind="action" label="Modify booking" />
                      <FlowArrow down />
                      <FlowNode kind="action" label="Change dates, vehicle or extras" />
                      <FlowArrow down />
                      <FlowNode kind="system" label="Check availability" />
                      <FlowArrow down />
                      <FlowNode kind="decision" label="Available?" choices={["Yes", "No"]} />
                      <FlowArrow down label="Yes" />
                      <FlowNode kind="system" label="Show updated price" />
                      <FlowArrow down />
                      <FlowNode kind="action" label="Confirm changes" />
                      <FlowArrow down />
                      <FlowNode kind="end" label="Booking updated" />
                      <p className="car-flow-branch-note"><b>No:</b> Show alternatives → select alternative → confirm changes.</p>
                    </section>

                    <section className="car-flow-vertical-lane" aria-label="Cancel booking branch">
                      <span className="car-flow-branch-label">02 · Cancel</span>
                      <FlowNode kind="action" label="Cancel booking" />
                      <FlowArrow down />
                      <FlowNode kind="screen" label="Cancellation policy" />
                      <FlowArrow down />
                      <FlowNode kind="system" label="Show refund amount" />
                      <FlowArrow down />
                      <FlowNode kind="decision" label="Confirm cancellation?" choices={["Yes", "No"]} />
                      <FlowArrow down label="Yes" />
                      <FlowNode kind="action" label="Confirm cancellation" />
                      <FlowArrow down />
                      <FlowNode kind="end" label="Cancellation confirmed" />
                      <p className="car-flow-branch-note"><b>No:</b> Return to booking details without changes.</p>
                    </section>

                    <section className="car-flow-vertical-lane" aria-label="Contact support branch">
                      <span className="car-flow-branch-label">03 · Support</span>
                      <FlowNode kind="action" label="Contact support" />
                      <FlowArrow down />
                      <FlowNode kind="action" label="Select issue" detail="Pickup · payment · vehicle · cancellation" />
                      <FlowArrow down />
                      <FlowNode kind="decision" label="Support channel" choices={["Chat", "Phone", "Email"]} />
                      <FlowArrow down />
                      <FlowNode kind="system" label="Connect to support" />
                      <FlowArrow down />
                      <FlowNode kind="end" label="Issue resolved" />
                    </section>
                  </div>
                </div>
              </div>

              <div className="car-flow-edge-cases">
                <span>Business rules</span>
                <p>Recheck availability and price before saving changes · Show policy and refund before cancellation</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="car-lofi-designs" aria-labelledby="car-lofi-designs-title">
        <div className="car-case-study-shell">
          <LoFiCarousel />
        </div>
      </section>
    </main>
  );
}
