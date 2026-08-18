"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "./components/ThemeProvider";
import PortfolioFooter from "./components/PortfolioFooter";

type Project = {
  id: string;
  number: string;
  name: string;
  title: string;
  platform: string;
  role: string;
  tags: string[];
  categories: string[];
  description: string;
  problem: string;
  outcome: string;
  visual: string;
  caseStudy?: string;
  caseStudyImages?: string[];
  actionLabel?: string;
  actionExternal?: boolean;
};

const projects: Project[] = [
  {
    id: "medicine-reminder",
    number: "01",
    name: "Medicine Reminder",
    title: "Medicine Reminder App",
    platform: "App / Web",
    role: "UX design · Research · Prototyping",
    tags: ["Healthcare", "UX Research", "UX/UI", "Prototyping", "Responsive"],
    categories: ["UX/UI"],
    description:
      "An accessible reminder experience that helps people remember what medicine to take, when to take it and track each dose with confidence.",
    problem: "People can miss medication because they forget the time, the medicine or whether a dose has already been taken.",
    outcome: "A researched and tested reminder flow spanning mobile, tablet and desktop experiences with flexible accessibility settings.",
    visual: "medicine",
    caseStudy: "/work/medicine-reminder",
    actionLabel: "Read case study",
  },
  {
    id: "northside",
    number: "02",
    name: "Northside Rentals",
    title: "Car Rental Booking Platform",
    platform: "App / Web",
    role: "Product design · Booking experience",
    tags: ["Mobility", "B2C", "Booking", "Responsive", "UX/UI"],
    categories: ["UX/UI", "Marketing"],
    description:
      "A calm, responsive booking experience that helps customers choose the right vehicle and complete a reservation with confidence.",
    problem: "Rental choices, pricing and add-ons can make a simple booking feel unnecessarily complex.",
    outcome: "A clearer comparison and checkout flow designed to reduce uncertainty at every decision point.",
    visual: "rental",
    caseStudy: "/case-study/car-rental",
  },
  {
    id: "bidvora",
    number: "03",
    name: "Bidvora",
    title: "AI-powered Bid Platform",
    platform: "Web",
    role: "Product strategy · UX/UI · Design system",
    tags: ["AI", "B2B SaaS", "Product Strategy", "UX/UI", "Design System"],
    categories: ["UX/UI"],
    description:
      "Turning a fragmented bidding workflow into one clear, intelligent workspace for discovering, qualifying and responding to opportunities.",
    problem: "Bid teams need to evaluate dense opportunities quickly without losing the detail that determines a strong response.",
    outcome: "A focused end-to-end experience that brings discovery, qualification and response planning into one system.",
    visual: "bid",
    caseStudy: "https://www.bidvora.app/",
    actionLabel: "View live demo",
    actionExternal: true,
  },
  {
    id: "recrugo",
    number: "04",
    name: "Recrugo",
    title: "AI-powered Recruitment Assistance",
    platform: "Web",
    role: "Product design · AI experience",
    tags: ["AI", "Recruitment", "B2B SaaS", "Product Design", "Research"],
    categories: ["UX/UI"],
    description:
      "A human-centred AI assistant that helps recruitment teams move from candidate volume to meaningful decisions.",
    problem: "Recruiters need useful signals from large candidate pools without losing context or human judgment.",
    outcome: "An explainable review workspace that makes candidate evidence easier to scan, compare and act on.",
    visual: "recruit",
  },
  {
    id: "anceller",
    number: "05",
    name: "Anceller",
    title: "Home Services Platform",
    platform: "App",
    role: "Product design · Mobile UX",
    tags: ["Marketplace", "Mobile App", "Home Services", "UX/UI", "Prototyping"],
    categories: ["UX/UI", "Marketing"],
    description:
      "A trustworthy service marketplace designed around the real moments between finding help, booking a professional and completing the job.",
    problem: "Home services require trust, availability and clear expectations before a customer is ready to book.",
    outcome: "A guided mobile journey that makes service selection and scheduling feel dependable and direct.",
    visual: "services",
  },
  {
    id: "expert-electrical",
    number: "06",
    name: "Expert Electrical",
    title: "Integrated Retailer Offers & Claim System",
    platform: "Web",
    role: "UX strategy · Enterprise product",
    tags: ["Enterprise", "Retail", "Claims", "UX Strategy", "Design System"],
    categories: ["UX/UI"],
    description:
      "A connected operational platform that brings retailer offers, evidence and claim management into a single accountable workflow.",
    problem: "Offer and claim operations become slow when evidence, ownership and status are spread across disconnected tools.",
    outcome: "A structured system that improves visibility and helps teams move claims forward with fewer gaps.",
    visual: "claims",
  },
  {
    id: "core-techies",
    number: "07",
    name: "Core Techies",
    title: "Brand Identity & Guidelines",
    platform: "Branding",
    role: "Brand identity · Visual system · Brand guidelines",
    tags: ["Brand Identity", "Logo Design", "Visual System", "Guidelines"],
    categories: ["Branding"],
    description:
      "A cohesive identity system that gives Core Techies a clear, confident and consistent presence across every brand touchpoint.",
    problem: "Core Techies needed a recognisable identity that could stay consistent across digital and physical applications.",
    outcome: "A practical brand system covering the logo, colour, typography and usage principles for consistent execution.",
    visual: "core-techies",
    caseStudy: "/case-studies/core-techies-brandbook.pdf",
    actionExternal: true,
  },
  {
    id: "recrugo-brand",
    number: "08",
    name: "Recrugo",
    title: "Brand Identity & Guidelines",
    platform: "Branding",
    role: "Brand identity · Logo system · Brand guidelines",
    tags: ["Brand Identity", "Logo Design", "Visual System", "Guidelines"],
    categories: ["Branding"],
    description:
      "A modern, confident identity system for an AI-powered recruitment platform.",
    problem:
      "Recrugo needed a distinctive brand that could communicate intelligent matching and stay consistent across product and marketing touchpoints.",
    outcome:
      "A complete brand system covering logo construction, applications, colour, typography, variants and usage standards.",
    visual: "recruit",
    caseStudyImages: [
      "/images/branding/recrugo/frame-01.jpg",
      "/images/branding/recrugo/frame-02.jpg",
      "/images/branding/recrugo/frame-03.jpg",
      "/images/branding/recrugo/frame-04.jpg",
      "/images/branding/recrugo/frame-05.jpg",
      "/images/branding/recrugo/frame-06.jpg",
      "/images/branding/recrugo/frame-07.jpg",
      "/images/branding/recrugo/frame-08.jpg",
      "/images/branding/recrugo/frame-09.jpg",
      "/images/branding/recrugo/frame-10.jpg",
      "/images/branding/recrugo/frame-11.jpg",
    ],
  },
];

const projectTabs = ["UX/UI", "Branding", "Logos", "Marketing"] as const;

type LogoItem = {
  name: string;
  src: string;
  detailImage?: string;
};

const logos: readonly LogoItem[] = [
  { name: "Core Techies", src: "/images/logos/core-techies.png" },
  { name: "Laundry Cube", src: "/images/logos/laundry-cube.png", detailImage: "/images/logos/laundry-cube-brand-explanation.jpg" },
  { name: "Lorrying", src: "/images/logos/lorrying.png", detailImage: "/images/logos/lorrying-brand-explanation.jpg" },
  { name: "Recrugo", src: "/images/logos/recrugo.png", detailImage: "/images/logos/recrugo-brand-explanation.jpg" },
  { name: "Stepout Live", src: "/images/logos/stepout-live.png" },
  { name: "CyberAlerts", src: "/images/logos/cyberalerts.png", detailImage: "/images/logos/cyberalerts-brand-explanation.jpg" },
  { name: "FreshDeal24", src: "/images/logos/freshdeal24.png", detailImage: "/images/logos/freshdeal24-brand-explanation.jpg" },
  { name: "GBL", src: "/images/logos/gbl.png", detailImage: "/images/logos/gbl-brand-explanation.jpg" },
  { name: "Invictus Capital", src: "/images/logos/invictus-capital.png" },
  { name: "KFU", src: "/images/logos/kfu.png", detailImage: "/images/logos/kabaddi-federation-uganda-brand-explanation.jpg" },
  { name: "Muaven", src: "/images/logos/muaven.png", detailImage: "/images/logos/muaven-brand-explanation.jpg" },
  { name: "Pet Mates", src: "/images/logos/pet-mates.png" },
  { name: "Raval Shah", src: "/images/logos/raval-shah.png" },
] as const;

const process = [
  ["01", "Discover", "Understand users, problems and business context."],
  ["02", "Define", "Frame the right problem and establish priorities."],
  ["03", "Design", "Explore, prototype and create the product experience."],
  ["04", "Validate", "Test assumptions and refine the experience."],
  ["05", "Ship", "Partner with engineering and bring the product to life."],
];

const capabilities = [
  ["Product Design", "Product design", "UX design", "UI design", "Interaction design"],
  ["Strategy", "Product strategy", "UX strategy", "Research", "Information architecture"],
  ["Systems", "Design systems", "Prototyping", "Responsive design", "Accessibility"],
  ["Collaboration", "Technical collaboration", "Design–engineering handoff", "Frontend understanding", "Stakeholder alignment"],
];

const technicalSkillGroups: Array<[string, string[]]> = [
  ["UI Design Tools", ["Figma", "Photoshop", "Illustrator", "Miro", "Framer", "Sketch"]],
  ["AI & Emerging Technologies", ["ChatGPT", "Claude", "Claude Design", "Google Stitch", "Gemini", "Cursor AI", "GitHub Copilot", "Prompt Engineering", "AI Feature Ideation", "Human-AI Interaction", "Conversational UX"]],
  ["Media Design Tools", ["Adobe InDesign", "CorelDRAW", "Adobe Premiere Pro", "Canva"]],
  ["Frontend Technologies", ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Bootstrap", "Tailwind CSS", "REST API Integration"]],
  ["Domain Skills", ["User Experience (UX) Design", "User Interface (UI) Design", "User-Centered Design", "Design Thinking", "Usability Testing", "User Research", "Mobile App Design", "Prototyping", "Wireframing", "Web Design", "Branding", "Marketing", "Product Design", "Digital Media Design", "Print Media Design", "Packaging"]],
];

const experienceRoles = [
  "Lead Product Designer (UX/UI)",
  "UX Team Lead",
  "Sr. UX Developer",
  "Project Engineer",
];

const experienceDates = ["2025 - Present", "2019 - 2025", "2014 - 2019", "2014"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectVisual({ type, name, id }: { type: string; name: string; id?: string }) {
  return (
    <div className={`project-visual visual-${type}`} role="img" aria-label={`${name} product interface preview`}>
      <div className="browser-shell">
        <div className="browser-top"><i /><i /><i /><span /></div>
        {id === "recrugo-brand" && (
          <div className="branding-logo">
            <img src="/images/branding/recrugo/frame-02.jpg" alt="Recrugo brand mockup" />
          </div>
        )}
        {type === "bid" && (
          <div className="bid-ui"><div className="bid-dashboard" /></div>
        )}
        {type === "medicine" && (
          <div className="medicine-ui"><div className="medicine-preview" /></div>
        )}
        {type === "rental" && (
          <div className="rental-ui">
            <div className="rental-phone rental-phone-home"><div className="rental-screen rental-screen-home" /></div>
            <div className="rental-phone rental-phone-results"><div className="rental-screen rental-screen-results" /></div>
          </div>
        )}
        {type === "recruit" && id !== "recrugo-brand" && (
          <div className="recruit-ui">
            <Image src="/images/projects/recrugo-organization-comparison.png" alt="" width={1840} height={856} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        )}
        {type === "services" && (
          <div className="services-ui">
            <div className="services-phone"><div className="services-screen services-screen-home" /></div>
            <div className="services-phone"><div className="services-screen services-screen-location" /></div>
          </div>
        )}
        {type === "claims" && (
          <div className="claims-ui" />
        )}
        {type === "core-techies" && (
          <div className="core-techies-ui">
            <div className="core-techies-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, selectTheme } = useTheme();

  function toggleTheme() {
    selectTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="navbar is-scrolled">
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="Aamir Khan, home"><span><img className="brand-logo-light" src="/logo-icon-black.svg" alt="" /><img className="brand-logo-dark" src="/logo-icon-white.svg" alt="" /></span><b>Aamir Khan</b></a>
        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {[["Work", "#work"], ["About", "#about"], ["Experience", "#experience"], ["Contact", "#contact"]].map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="/resume">Resume</a>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}><i aria-hidden="true" /></button>
          <button className={`menu-toggle ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle menu"><i /><i /></button>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectTabsRef = useRef<HTMLDivElement>(null);
  const tabSwitchTimerRef = useRef<number | null>(null);
  const logoModalCloseRef = useRef<HTMLButtonElement>(null);
  const brandModalCloseRef = useRef<HTMLButtonElement>(null);
  const [activeProjectTab, setActiveProjectTab] = useState<(typeof projectTabs)[number]>("UX/UI");
  const [displayedProjectTab, setDisplayedProjectTab] = useState<(typeof projectTabs)[number]>("UX/UI");
  const [projectsChanging, setProjectsChanging] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<LogoItem | null>(null);
  const [selectedBrandCaseStudy, setSelectedBrandCaseStudy] = useState<Project | null>(null);
  const visibleProjects = projects.filter(project => project.categories.includes(displayedProjectTab));
  const visibleItemCount = displayedProjectTab === "Logos" ? logos.length : visibleProjects.length;

  useEffect(() => {
    projectsRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [displayedProjectTab]);

  useEffect(() => () => {
    if (tabSwitchTimerRef.current !== null) window.clearTimeout(tabSwitchTimerRef.current);
  }, []);

  useEffect(() => {
    if (!selectedLogo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    logoModalCloseRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedLogo(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedLogo]);

  useEffect(() => {
    if (!selectedBrandCaseStudy) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    brandModalCloseRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedBrandCaseStudy(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedBrandCaseStudy]);

  useLayoutEffect(() => {
    const tablist = projectTabsRef.current;
    const activeTab = tablist?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!tablist || !activeTab) return;

    const updateIndicator = () => {
      tablist.style.setProperty("--tab-indicator-left", `${activeTab.offsetLeft}px`);
      tablist.style.setProperty("--tab-indicator-width", `${activeTab.offsetWidth}px`);
      tablist.classList.add("is-ready");
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(tablist);
    return () => resizeObserver.disconnect();
  }, [activeProjectTab]);

  function selectProjectTab(tab: (typeof projectTabs)[number]) {
    if (tab === activeProjectTab) return;
    if (tabSwitchTimerRef.current !== null) window.clearTimeout(tabSwitchTimerRef.current);
    setActiveProjectTab(tab);
    setProjectsChanging(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
    tabSwitchTimerRef.current = window.setTimeout(() => {
      setDisplayedProjectTab(tab);
      setProjectsChanging(false);
      tabSwitchTimerRef.current = null;
    }, delay);
  }

  function handleProjectTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % projectTabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + projectTabs.length) % projectTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = projectTabs.length - 1;
    else return;
    event.preventDefault();
    const nextTab = projectTabs[nextIndex];
    selectProjectTab(nextTab);
    projectTabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
  }

  function scrollProjects(direction: -1 | 1) {
    const track = projectsRef.current;
    const card = track?.querySelector<HTMLElement>(".project, .logo-card");
    if (!track || !card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <main id="top">
      <Navbar />
      <div className="hero-scroll-stage">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-topline"><span>Lead Product Designer</span><span>12+ years · Product, UX & systems</span></div>
        <div className="hero-copy">
          <h1 id="hero-title">Aamir<br />Khan<span className="accent-dot">.</span></h1>
          <div className="hero-intro"><p className="hero-lede">I design thoughtful digital products that balance user needs, business goals and technical realities.</p><p>Products, platforms and experiences shaped with clarity, craft and a deep understanding of how they get built.</p></div>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">View case studies <Arrow /></a>
          <a className="button button-secondary" href="/resume">View résumé</a>
        </div>
        <div className="hero-foot"><span>Scroll to explore</span><i /></div>
      </section>

      <div className="hero-overlay-section">
        <section className="impact section-shell reveal" aria-labelledby="impact-title">
          <div className="impact-heading"><span className="eyebrow">Experience in numbers</span><h2 id="impact-title">Depth, not decoration<span className="accent-dot">.</span></h2><p>Experience across product design, UX strategy, design systems and technical collaboration.</p></div>
          <div className="stats">
            <div><b>200+</b><strong>Projects</strong><span>Across web, mobile &amp; platforms</span></div>
            <div><b>12+</b><strong>Years of Experience</strong><span>In product, UX &amp; UI design</span></div>
            <div><b>5+</b><strong>In-house Products Led</strong><span>From strategy through launch</span></div>
            <div><b>$2.0M+</b><strong>Revenue Impacted</strong><span>Creating measurable business value</span></div>
          </div>
        </section>
      </div>
      </div>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading section-shell reveal">
          <span className="eyebrow">Selected work</span>
          <h2 id="work-title">Products made clear<span className="accent-dot">.</span></h2>
          <p>A selection of products I&apos;ve designed across AI, SaaS, marketplaces, mobility and service platforms.</p>
        </div>
        <div className="project-tabs-shell section-shell">
          <div className="project-tabs" ref={projectTabsRef} role="tablist" aria-label="Filter selected projects">
            <span className="project-tab-indicator" aria-hidden="true" />
            {projectTabs.map((tab, index) => (
              <button key={tab} id={`project-tab-${tab.toLowerCase().replace(/[^a-z]+/g, "-")}`} type="button" role="tab" aria-selected={activeProjectTab === tab} aria-controls="project-panel" tabIndex={activeProjectTab === tab ? 0 : -1} className={activeProjectTab === tab ? "is-active" : ""} onClick={() => selectProjectTab(tab)} onKeyDown={event => handleProjectTabKeyDown(event, index)}>{tab}</button>
            ))}
          </div>
        </div>
        <div className={`projects ${displayedProjectTab === "Logos" ? "logo-projects" : ""} ${displayedProjectTab === "Marketing" ? "marketing-projects" : ""} ${projectsChanging ? "is-changing" : ""}`} key={displayedProjectTab} id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${activeProjectTab.toLowerCase().replace(/[^a-z]+/g, "-")}`} ref={projectsRef} tabIndex={0}>
          {displayedProjectTab === "Marketing" ? (
            <article className="marketing-coming-soon reveal">
              <h3>Coming Soon.</h3>
              <p>More work is on the way.</p>
            </article>
          ) : displayedProjectTab === "Logos" ? logos.map((logo, index) => logo.detailImage ? (
            <button className="logo-card logo-card-button reveal" type="button" key={logo.name} aria-label={`View ${logo.name} logo details`} style={{ animationDelay: `${Math.min(index, 5) * 45}ms` }} onClick={() => setSelectedLogo(logo)}>
              <div className="logo-image-frame">
                <img src={logo.src} alt={`${logo.name} logo`} className="logo-image" draggable={false} />
              </div>
            </button>
          ) : (
            <article className="logo-card reveal" key={logo.name} aria-label={`${logo.name} logo`} style={{ animationDelay: `${Math.min(index, 5) * 45}ms` }}>
              <div className="logo-image-frame">
                <img src={logo.src} alt={`${logo.name} logo`} className="logo-image" draggable={false} />
              </div>
            </article>
          )) : visibleProjects.map((project, index) => (
            <article className={`project project-${index + 1} reveal`} id={`project-${project.id}`} key={project.name}>
              <div className="project-inner">
                <div className="project-content">
                  <div className="project-index"><span>{project.name}</span><span>{project.number} / {project.platform}</span></div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-tags" aria-label={`${project.name} disciplines`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                  <p className="project-role"><span>My role</span>{project.role}</p>
                        {project.caseStudyImages?.length ? (
                          <button
                            className="case-study-link case-study-button"
                            type="button"
                            onClick={() => setSelectedBrandCaseStudy(project)}
                            aria-label={`View case study: ${project.name}`}
                          >
                            View case study <Arrow />
                          </button>
                        ) : project.caseStudy ? (
                          <a className="case-study-link" href={project.caseStudy} target={project.actionExternal ? "_blank" : undefined} rel={project.actionExternal ? "noreferrer" : undefined} aria-label={`${project.actionLabel ?? "View case study"}: ${project.name}${project.actionExternal ? " (opens in a new tab)" : ""}`}>{project.actionLabel ?? "View case study"} <Arrow /></a>
                  ) : (
                    <details className="case-details">
                      <summary>View case study <Arrow /></summary>
                      <div><p><span>The challenge</span>{project.problem}</p><p><span>The direction</span>{project.outcome}</p></div>
                    </details>
                  )}
                </div>
                <ProjectVisual type={project.visual} name={project.name} id={project.id} />
              </div>
            </article>
          ))}
        </div>
        {displayedProjectTab !== "Marketing" && (
          <div className="project-controls section-shell" aria-label="Project carousel controls">
            <button type="button" onClick={() => scrollProjects(-1)} aria-label="Previous project" disabled={visibleItemCount < 2}>←</button>
            <button type="button" onClick={() => scrollProjects(1)} aria-label="Next project" disabled={visibleItemCount < 2}>→</button>
          </div>
        )}
      </section>

      {selectedLogo?.detailImage && (
        <div className="logo-modal" role="dialog" aria-modal="true" aria-labelledby="logo-modal-title" onMouseDown={event => {
          if (event.target === event.currentTarget) setSelectedLogo(null);
        }}>
          <div className="logo-modal-panel">
            <div className="logo-modal-header">
              <div>
                <span>Logo design</span>
                <h2 id="logo-modal-title">{selectedLogo.name}</h2>
              </div>
              <button ref={logoModalCloseRef} className="logo-modal-close" type="button" onClick={() => setSelectedLogo(null)} aria-label="Close logo details">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="logo-modal-image-wrap">
              <img src={selectedLogo.detailImage} alt={`${selectedLogo.name} logo concept, meaning, colour psychology and brand variations`} />
            </div>
          </div>
        </div>
      )}

      {selectedBrandCaseStudy?.caseStudyImages?.length ? (
        <div
          className="logo-modal brand-case-study-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="brand-case-study-title"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setSelectedBrandCaseStudy(null);
          }}
        >
          <div className="logo-modal-panel brand-case-study-panel">
            <div className="logo-modal-header">
              <div>
                <span>Branding case study</span>
                <h2 id="brand-case-study-title">{selectedBrandCaseStudy.name}</h2>
              </div>
              <button
                ref={brandModalCloseRef}
                className="logo-modal-close"
                type="button"
                onClick={() => setSelectedBrandCaseStudy(null)}
                aria-label="Close Recrugo case study"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="brand-case-study-images">
              {selectedBrandCaseStudy.caseStudyImages.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Recrugo brand book page ${index + 1}`}
                  loading={index < 2 ? "eager" : "lazy"}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <section className="process-section reveal" aria-labelledby="process-title">
        <div className="section-shell"><div className="section-heading compact"><span className="eyebrow">Method, not ceremony</span><h2 id="process-title">How I work<span className="accent-dot">.</span></h2></div><div className="process-grid">{process.map(([number, title, copy], index) => <article key={title}><div><span>{number}</span>{index < process.length - 1 && <i aria-hidden="true">→</i>}</div><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
      </section>

      <section className="capabilities section-shell reveal" aria-labelledby="capabilities-title">
        <div className="section-heading compact"><span className="eyebrow">Capabilities</span><h2 id="capabilities-title">From problem to product<span className="accent-dot">.</span></h2></div>
        <div className="capability-grid">{capabilities.map(([title, ...items], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="tech-section reveal" aria-labelledby="tech-title">
        <div className="section-shell tech-layout"><div><span className="eyebrow">Technical collaboration</span><h2 id="tech-title">Design meets<br />technology<span className="accent-dot">.</span></h2></div><div className="tech-copy"><p>With a background in computer science and hands-on experience with modern frontend technologies, I collaborate closely with engineers to design experiences that are not only beautiful, but practical to build.</p><div className="tech-skill-groups">{technicalSkillGroups.map(([title, items]) => <section key={title}><h3>{title}</h3><p>{items.join(", ")}</p></section>)}</div></div></div>
      </section>

      <section className="experience section-shell reveal" id="experience" aria-labelledby="experience-title">
        <div className="section-heading compact"><span className="eyebrow">Experience</span><h2 id="experience-title">Leadership through clarity<span className="accent-dot">.</span></h2></div>
        <div className="experience-list">
          {experienceRoles.map((role, index) => (
            <article className="experience-row" key={role}>
              <div className="experience-number">{String(index + 1).padStart(2, "0")}</div>
              <div><h3>{role}</h3></div>
              <p className="experience-copy">Core Techies India</p>
              <p className="experience-date">{experienceDates[index]}</p>
              <span className={`experience-tag ${index === 0 ? "is-current" : ""}`}>{index === 0 ? "Current role" : "Previous role"}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about reveal" id="about" aria-labelledby="about-title">
        <div className="section-shell about-layout"><div><span className="eyebrow">About</span><h2 id="about-title">A little<br />about me<span className="accent-dot">.</span></h2></div><div className="about-copy"><p>I&apos;m Aamir Khan, a Lead Product Designer with 12+ years of experience designing digital products and experiences.</p><p>My work sits at the intersection of user experience, visual design, product thinking and technology. I&apos;ve worked across web and mobile products, SaaS platforms, AI-powered products, marketplaces and service platforms.</p><p>I enjoy simplifying complex problems, creating scalable design systems and partnering closely with engineering teams to turn ideas into meaningful products.</p><a className="text-link" href="/resume">More about me <Arrow /></a></div></div>
      </section>

      <section className="closing section-shell reveal" id="contact" aria-labelledby="contact-title">
        <span className="eyebrow">Have a product, problem or idea worth solving?</span>
        <h2 id="contact-title">Let&apos;s build<br />something meaningful<span className="accent-dot">.</span></h2>
        <a className="button button-primary button-large" href="mailto:?subject=Portfolio%20enquiry%20for%20Aamir%20Khan">Get in touch <Arrow /></a>
      </section>

      <PortfolioFooter />
    </main>
  );
}
