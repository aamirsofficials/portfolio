import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { CaseStudy, CaseStudyVisual } from "../../data/case-studies";
import PortfolioFooter from "../PortfolioFooter";

function Visual({ visual, className = "" }: { visual: CaseStudyVisual; className?: string }) {
  const isPhonePair = visual.variant === "phone-pair" && visual.secondarySrc;
  const isPhone = visual.variant === "phone";
  return (
    <figure className={`cs-visual cs-visual-${visual.variant ?? "standard"} ${className}`.trim()}>
      {isPhonePair ? (
        <div className="cs-phone-pair">
          <div><Image src={visual.src} alt={visual.alt} width={945} height={2048} sizes="(max-width: 560px) 42vw, 310px" /></div>
          <div><Image src={visual.secondarySrc!} alt={visual.secondaryAlt ?? ""} width={945} height={2048} sizes="(max-width: 560px) 42vw, 310px" /></div>
        </div>
      ) : isPhone ? (
        <div className="cs-phone-single"><Image src={visual.src} alt={visual.alt} width={945} height={2048} sizes="(max-width: 560px) 72vw, 340px" /></div>
      ) : (
        <Image src={visual.src} alt={visual.alt} width={1600} height={900} sizes="(max-width: 900px) 100vw, 1200px" />
      )}
      {visual.caption && <figcaption>{visual.caption}</figcaption>}
    </figure>
  );
}

export default function CaseStudyTemplate({ project }: { project: CaseStudy }) {
  const caseStyle = { "--case-accent": project.accent } as CSSProperties;

  return (
    <main className="case-study-page" id="top" style={caseStyle}>
      <header className="cs-nav">
        <Link className="cs-brand" href="/" aria-label="Aamir Khan portfolio home">
          <span><Image className="brand-logo-light" src="/logo-icon-black.svg" alt="" width={30} height={30} /><Image className="brand-logo-dark" src="/logo-icon-white.svg" alt="" width={30} height={30} /></span>
          <b>Aamir Khan</b>
        </Link>
        <Link className="cs-back" href="/#work"><span aria-hidden="true">←</span> Back to work</Link>
      </header>

      <article>
        <section className="cs-hero cs-shell">
          <div className="cs-hero-copy">
            <p className="cs-kicker">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="cs-proposition">{project.proposition}</p>
          </div>
          <dl className="cs-meta">
            {project.metadata.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
          <Visual visual={project.hero} className="cs-hero-visual" />
          <div className="cs-hero-actions">
            <a href="#overview">Read the story <span aria-hidden="true">↓</span></a>
            {project.sourcePdf && <a href={project.sourcePdf} target="_blank" rel="noreferrer">View original PDF <span aria-hidden="true">↗</span></a>}
          </div>
        </section>

        <nav className="cs-story-nav" aria-label="Case study sections">
          <div className="cs-shell">
            {(project.navigation ?? ["Overview", "Problem", "Discovery", "Decisions", "Validation", "Solution", "Outcome"].map(label => ({ label, href: `#${label.toLowerCase()}` }))).map(item => <a key={item.label} href={item.href}>{item.label}</a>)}
          </div>
        </nav>

        {project.answers && (
          <section className="cs-answers cs-shell" id="answers" aria-labelledby="answers-heading">
            <div className="cs-answers-intro reveal">
              <span>Case study summary</span>
              <h2 id="answers-heading">The case, in seven clear answers.</h2>
              <p>Start here for the problem, evidence, decisions, collaboration, AI use, and impact. The detailed process follows below.</p>
            </div>
            <div className="cs-answer-list">
              {project.answers.map((item, index) => (
                <article className="cs-answer reveal" id={item.id} key={item.id}>
                  <div className="cs-answer-question">
                    <span>0{index + 1}</span>
                    <h3>{item.question}</h3>
                  </div>
                  <div className="cs-answer-copy">
                    <p>{item.answer}</p>
                    <ul>
                      {item.evidence.map(evidence => <li key={evidence}>{evidence}</li>)}
                    </ul>
                    {item.status && <span className={`cs-answer-status is-${item.status}`}>{item.status.replace("-", " ")}</span>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="cs-section cs-shell cs-overview" id="overview">
          <div className="cs-section-heading reveal"><span>01 · Overview</span><h2>{project.overview.heading}</h2></div>
          <div className="cs-overview-grid reveal">
            <div>{project.overview.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            <ul>{project.overview.evidence.map(item => <li key={item}>{item}<span aria-hidden="true">↗</span></li>)}</ul>
          </div>
        </section>

        <section className="cs-problem" id="problem">
          <div className="cs-shell">
            <div className="cs-section-heading reveal"><span>{project.problem.label ?? "02 · The problem"}</span><h2>{project.problem.heading ?? "The reminder had to carry more than a time."}</h2><p>{project.problem.intro}</p></div>
            <div className="cs-problem-grid">
              {project.problem.points.map((point, index) => <article className="reveal" key={point.title}><span>0{index + 1}</span><h3>{point.title}</h3><p>{point.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="cs-section cs-shell" id="discovery">
          <div className="cs-section-heading reveal"><span>{project.research.label ?? "03 · Research & discovery"}</span><h2>{project.research.heading ?? "Understand the routine before designing the reminder."}</h2><p>{project.research.intro}</p></div>
          <div className="cs-research-grid">
            {project.research.methods.map(method => <article className="reveal" key={method.title}><span>{method.label}</span><h3>{method.title}</h3><p>{method.description}</p></article>)}
          </div>
        </section>

        <section className="cs-insights">
          <div className="cs-shell">
            <div className="cs-section-heading reveal"><span>{project.insightsLabel ?? "04 · Key insights"}</span><h2>{project.insightsHeading ?? "Three ideas shaped the experience."}</h2></div>
            <div className="cs-insight-list">
              {project.insights.map(insight => <article className="reveal" key={insight.number}><span>{insight.number}</span><h3>{insight.title}</h3><p>{insight.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="cs-section cs-shell cs-strategy">
          <div className="cs-section-heading reveal"><span>{project.strategy.label ?? "05 · Defining the experience"}</span><h2>{project.strategy.heading}</h2><p>{project.strategy.description}</p></div>
          <div className="cs-flow reveal">
            {project.strategy.steps.map((step, index) => <article key={step.label}><span>0{index + 1}</span><h3>{step.label}</h3><p>{step.detail}</p></article>)}
          </div>
        </section>

        <section className="cs-section cs-shell cs-exploration">
          <div className="cs-sticky-copy reveal"><span>{project.exploration.label ?? "06 · Exploration"}</span><h2>{project.exploration.heading}</h2><p>{project.exploration.description}</p><ul>{project.exploration.notes.map(note => <li key={note}>{note}</li>)}</ul></div>
          <Visual visual={project.exploration.visual} />
        </section>

        <section className="cs-section cs-shell" id="decisions">
          <div className="cs-section-heading reveal"><span>{project.decisionsLabel ?? "07 · Key design decisions"}</span><h2>{project.decisionsHeading ?? "Decisions connected directly to the product problem."}</h2></div>
          <div className="cs-decisions">
            {project.decisions.map(decision => (
              <article className="cs-decision reveal" key={decision.number}>
                <div className="cs-decision-copy"><span>{decision.number}</span><h3>{decision.title}</h3><dl><div><dt>What changed</dt><dd>{decision.changed}</dd></div><div><dt>Why</dt><dd>{decision.why}</dd></div><div><dt>Impact</dt><dd>{decision.impact}</dd></div></dl></div>
                {decision.visual ? <Visual visual={decision.visual} /> : <div className="cs-decision-diagram" aria-label="Daily reminder hierarchy diagram"><span>Day</span><span>Progress</span><span>Medicine</span><span>Time</span></div>}
              </article>
            ))}
          </div>
        </section>

        <section className="cs-system">
          <div className="cs-shell">
            <div className="cs-section-heading reveal"><span>{project.designSystem.label ?? "08 · Design system / UI"}</span><h2>{project.designSystem.heading}</h2><p>{project.designSystem.description}</p></div>
            <div className="cs-foundations">
              {project.designSystem.foundations.map((item, index) => <article className="reveal" key={item.label}><i className={`foundation-swatch foundation-${index + 1}`} /><span>{item.label}</span><p>{item.value}</p></article>)}
            </div>
          </div>
        </section>

        <section className="cs-section cs-shell" id="validation">
          <div className="cs-section-heading reveal"><span>{project.validation.label ?? "09 · Validation"}</span><h2>{project.validation.heading ?? "Make the evidence visible—and the gaps honest."}</h2><p>{project.validation.intro}</p></div>
          <ul className="cs-study-meta reveal">{project.validation.study.map(item => <li key={item}>{item}</li>)}</ul>
          <div className="cs-validation-grid">
            <div className="cs-validation-cycle">{project.validation.cycle.map((item, index) => <article className={item.placeholder ? "is-placeholder" : ""} key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.detail}</p></article>)}</div>
            <Visual visual={project.validation.visual} />
          </div>
        </section>

        <section className="cs-final" id="solution">
          <div className="cs-shell">
            <div className="cs-section-heading reveal"><span>{project.finalSolution.label ?? "10 · Final solution"}</span><h2>{project.finalSolution.heading}</h2><p>{project.finalSolution.intro}</p></div>
            <Visual visual={project.finalSolution.visual} className="cs-final-visual" />
            <div className="cs-final-flows">{project.finalSolution.flows.map(flow => <article className="reveal" key={flow.number}><span>{flow.number}</span><h3>{flow.title}</h3><p>{flow.description}</p></article>)}</div>
          </div>
        </section>

        <section className="cs-section cs-shell" id="outcome">
          <div className="cs-section-heading reveal"><span>{project.outcomes.label ?? "11 · Outcome / impact"}</span><h2>{project.outcomes.heading ?? "What changed—and what still needs measuring."}</h2></div>
          <div className="cs-outcomes">{project.outcomes.items.map(item => <article className={item.placeholder ? "is-placeholder reveal" : "reveal"} key={item.label}><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.detail}</p></article>)}</div>
          {project.outcomes.quote && <blockquote className="reveal">{project.outcomes.quote}</blockquote>}
        </section>

        <section className="cs-learning">
          <div className="cs-shell reveal"><span>{project.learningLabel ?? "12 · What I learned"}</span><blockquote>{project.learning}</blockquote></div>
        </section>

        <section className="cs-portfolio-return cs-shell">
          <Link className="button button-primary button-large" href="/#work">Back to portfolio <span aria-hidden="true">↗</span></Link>
        </section>
      </article>
      <PortfolioFooter />
    </main>
  );
}
