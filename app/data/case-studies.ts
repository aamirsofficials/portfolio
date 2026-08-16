export type CaseStudyMeta = {
  label: string;
  value: string;
};

export type CaseStudyVisual = {
  src: string;
  alt: string;
  caption?: string;
  secondarySrc?: string;
  secondaryAlt?: string;
  variant?: "standard" | "phone" | "phone-pair";
};

export type CaseStudyAnswer = {
  id: string;
  question: string;
  answer: string;
  evidence: string[];
  status?: "verified" | "qualitative" | "not-applicable" | "not-measured";
};

export type CaseStudy = {
  slug: string;
  accent: string;
  category: string;
  title: string;
  proposition: string;
  metadata: CaseStudyMeta[];
  answers?: CaseStudyAnswer[];
  hero: CaseStudyVisual;
  overview: {
    heading: string;
    paragraphs: string[];
    evidence: string[];
  };
  problem: {
    label?: string;
    heading?: string;
    intro: string;
    points: { title: string; description: string }[];
  };
  research: {
    label?: string;
    heading?: string;
    intro: string;
    methods: { label: string; title: string; description: string }[];
  };
  insights: { number: string; title: string; description: string }[];
  insightsLabel?: string;
  insightsHeading?: string;
  strategy: {
    label?: string;
    heading: string;
    description: string;
    steps: { label: string; detail: string }[];
  };
  exploration: {
    label?: string;
    heading: string;
    description: string;
    visual: CaseStudyVisual;
    notes: string[];
  };
  decisions: {
    number: string;
    title: string;
    changed: string;
    why: string;
    impact: string;
    visual?: CaseStudyVisual;
  }[];
  decisionsLabel?: string;
  decisionsHeading?: string;
  designSystem: {
    label?: string;
    heading: string;
    description: string;
    foundations: { label: string; value: string }[];
  };
  validation: {
    label?: string;
    heading?: string;
    intro: string;
    study: string[];
    cycle: { label: string; detail: string; placeholder?: boolean }[];
    visual: CaseStudyVisual;
  };
  finalSolution: {
    label?: string;
    heading: string;
    intro: string;
    visual: CaseStudyVisual;
    flows: { number: string; title: string; description: string }[];
  };
  outcomes: {
    label?: string;
    heading?: string;
    items: { value: string; label: string; detail: string; placeholder?: boolean }[];
    quote?: string;
  };
  learning: string;
  learningLabel?: string;
  sourcePdf?: string;
  navigation?: { label: string; href: string }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "medicine-reminder": {
    slug: "medicine-reminder",
    accent: "#3f6df2",
    category: "Product Design · UX/UI",
    title: "Medicine Reminder App",
    proposition: "Helping people remember what to take, when to take it, and what they have already completed.",
    metadata: [
      { label: "Role", value: "UX Designer" },
      { label: "Timeline", value: "Oct–Nov 2022" },
      { label: "Team", value: "Independent UX project · peer feedback" },
      { label: "Platform", value: "Mobile · Tablet · Desktop" },
      { label: "Contribution", value: "Research · Wireframing · UI · Prototyping · Usability study" },
    ],
    answers: [
      {
        id: "problem-answer",
        question: "What problem did I solve?",
        answer: "People taking regular medicine could forget when a dose was due, which medicine to take, or whether they had already completed it. I designed one dependable daily view that brings the medicine, time, and completion state together.",
        evidence: ["Medicine + time in one reminder", "Visible daily progress", "Upcoming and completed states"],
        status: "verified",
      },
      {
        id: "decision-answer",
        question: "Why did I make that decision?",
        answer: "Research showed that a time-only alert did not give people enough context. I made the day—not settings—the primary navigation model so the next dose and the status of the full routine could be understood without moving between screens.",
        evidence: ["Day-first information architecture", "Schedule before settings", "Direct quick-view access"],
        status: "verified",
      },
      {
        id: "research-answer",
        question: "How did I research it?",
        answer: "I conducted interviews and empathy mapping, created two personas representing memory and busy-schedule needs, audited competing reminder products, and tested the prototype in an unmoderated remote usability study with five participants in India.",
        evidence: ["User interviews", "2 personas", "Competitive audit", "5-person usability study"],
        status: "verified",
      },
      {
        id: "change-answer",
        question: "What changed after my solution?",
        answer: "The tested iteration made reminder access easier to find, refined the quick-view screen, and added text-size, audio, and motivation controls. The same hierarchy was then adapted for mobile, tablet, and desktop.",
        evidence: ["Revised home header", "Refined quick view", "3 accessibility controls", "3 responsive form factors"],
        status: "qualitative",
      },
      {
        id: "collaboration-answer",
        question: "How did I collaborate with developers and product teams?",
        answer: "This was an independent UX concept, so there was no developer or product-team delivery collaboration to claim. Peer critique informed the iterations; the responsive information architecture and reusable reminder-card pattern were prepared as a practical foundation for a future engineering handoff.",
        evidence: ["Independent project", "Peer feedback", "Handoff-ready responsive logic"],
        status: "not-applicable",
      },
      {
        id: "ai-answer",
        question: "Where did AI help me?",
        answer: "AI was not used in the original 2022 project. Interviews, synthesis, wireframing, prototyping, and usability work were completed through the documented UX process, so this case study does not attribute any design decision to AI.",
        evidence: ["No AI use claimed", "Human-led research and synthesis"],
        status: "not-applicable",
      },
      {
        id: "impact-answer",
        question: "What was the measurable impact?",
        answer: "The documented evidence is five usability participants, delivery across three form factors, and positive peer feedback about the flow. Because the concept was not shipped, adoption, adherence, conversion, and support metrics were not measured—and are not presented as outcomes.",
        evidence: ["5 usability participants", "3 form factors", "Qualitative peer feedback", "No production KPI available"],
        status: "not-measured",
      },
    ],
    hero: {
      src: "/images/projects/medicine-reminder-preview.jpg",
      alt: "Four final Medicine Reminder product screens showing the daily schedule, quick view, medicine details and settings",
      caption: "Final high-fidelity product flows",
    },
    overview: {
      heading: "Making an important routine easier to remember.",
      paragraphs: [
        "The Medicine Reminder App is designed for people who take regular medicines and need a dependable way to remember every dose.",
        "The project began with a simple but consequential problem: people can forget the time, the medicine itself, or whether a scheduled dose has already been taken.",
      ],
      evidence: ["Daily reminder schedule", "Dose progress and status", "Flexible alert settings", "Responsive product foundation"],
    },
    problem: {
      heading: "What problem did I solve?",
      intro: "Remembering a dose is not only a scheduling problem. The experience also needs to make the medicine, timing and completion state immediately clear.",
      points: [
        { title: "Memory", description: "Users may forget that a dose is due during a busy or disrupted day." },
        { title: "Context", description: "A reminder without the medicine name and dose context does not answer what to take." },
        { title: "Confidence", description: "People need a visible record of what is upcoming, completed or still outstanding." },
      ],
    },
    research: {
      heading: "How did I research it?",
      intro: "The source case study documents interviews, empathy mapping, two personas and a competitive audit before interface design began.",
      methods: [
        { label: "01", title: "User interviews", description: "Interviews were used to understand reminder habits and the needs behind missed medicines." },
        { label: "02", title: "Empathy mapping", description: "Observed needs were organized to clarify what people need to see and remember at the moment of a dose." },
        { label: "03", title: "Personas", description: "The study considered an older adult with memory challenges and a busy working professional." },
        { label: "04", title: "Competitive audit", description: "Existing reminder products were reviewed to compare the information and workflows they offered." },
      ],
    },
    insights: [
      { number: "01", title: "Time alone is not enough.", description: "The reminder must pair the scheduled time with a clearly identifiable medicine." },
      { number: "02", title: "Different routines share the same risk.", description: "Memory challenges and busy schedules can both result in a missed dose, so the flow must remain direct and forgiving." },
      { number: "03", title: "Progress needs to be visible.", description: "A day view should communicate what is complete and what is still outstanding without opening each reminder." },
    ],
    strategy: {
      heading: "Organize the experience around the day, not the settings.",
      description: "The information architecture gives the daily schedule priority, while medicine details and alert controls remain one level deeper.",
      steps: [
        { label: "Today", detail: "Date, progress and scheduled medicines" },
        { label: "Quick view", detail: "Immediate dose context and actions" },
        { label: "Details", detail: "Medicine information and repeat pattern" },
        { label: "Settings", detail: "Alarm tone, volume, snooze and text size" },
      ],
    },
    exploration: {
      heading: "From structure to interface.",
      description: "Early wireframes focused on the daily calendar, completion progress and a scannable reminder list before visual styling was introduced.",
      visual: {
        src: "/images/projects/medicine-reminder-wireframes.jpg",
        alt: "Annotated digital wireframe of the Medicine Reminder home screen",
        caption: "Digital wireframe · Home screen",
      },
      notes: ["Calendar and day selection establish context", "Progress makes the remaining workload visible", "Reminder rows combine medicine and time"],
    },
    decisions: [
      {
        number: "01",
        title: "Make the day the primary navigation model.",
        changed: "The home screen combines a date selector, overall progress and the day's medicine schedule.",
        why: "This keeps the most frequently needed information in one view instead of distributing it across separate screens.",
        impact: "People can scan the day, identify the next medicine and understand progress without navigating away.",
      },
      {
        number: "02",
        title: "Surface reminder access in the home header.",
        changed: "The revised home concept adds a notification entry point directly to the main header.",
        why: "Reminder controls need to be discoverable from the screen where users review their schedule.",
        impact: "The iteration creates a more direct relationship between the schedule and its alerts.",
        visual: {
          src: "/images/projects/medicine-reminder-iteration.jpg",
          alt: "Before and after usability study comparison of the Medicine Reminder home screen",
          caption: "Home-screen iteration documented in the source case study",
        },
      },
      {
        number: "03",
        title: "Keep the information model responsive.",
        changed: "The same schedule hierarchy adapts from a single mobile column to denser tablet and desktop arrangements.",
        why: "Responsive behavior should preserve priority rather than simply enlarge the mobile interface.",
        impact: "The design creates a foundation for consistent use across mobile, tablet and desktop.",
      },
    ],
    decisionsHeading: "Why did I make these product decisions?",
    designSystem: {
      heading: "A calm visual language for an important daily task.",
      description: "The final direction uses a restrained blue foundation, green completion states, generous white space and repeatable reminder cards.",
      foundations: [
        { label: "Primary", value: "Blue · navigation and actions" },
        { label: "Success", value: "Green · completed doses and progress" },
        { label: "Structure", value: "Cards · repeated medicine information" },
        { label: "Accessibility", value: "Text size · audio · snooze controls" },
      ],
    },
    validation: {
      heading: "What changed after testing?",
      intro: "The source case study records an unmoderated remote usability study. The detailed findings were not included, so this template preserves an explicit placeholder instead of inventing results.",
      study: ["5 participants", "India · remote", "30–60 minutes", "Unmoderated study"],
      cycle: [
        { label: "Problem", detail: "Validate whether the reminder flow and primary actions are understandable." },
        { label: "Test", detail: "An unmoderated usability study was conducted with five remote participants." },
        { label: "Finding", detail: "Add the documented study findings here before publishing this section as evidence.", placeholder: true },
        { label: "Change", detail: "The source documents a revised home header and refined quick-view screen after the study." },
      ],
      visual: {
        src: "/images/projects/medicine-reminder-iteration.jpg",
        alt: "Medicine Reminder home screen before and after the usability study",
        caption: "Before and after usability study",
      },
    },
    finalSolution: {
      heading: "One connected reminder journey.",
      intro: "The final solution moves from a scannable daily schedule into focused medicine context and flexible reminder controls.",
      visual: {
        src: "/images/projects/medicine-reminder-responsive.jpg",
        alt: "Medicine Reminder final responsive designs across mobile, tablet and desktop",
        caption: "Responsive final solution",
      },
      flows: [
        { number: "01", title: "Review the day", description: "See progress and every scheduled medicine in time order." },
        { number: "02", title: "Open quick view", description: "Check the next dose and access the immediate reminder actions." },
        { number: "03", title: "Confirm details", description: "Review medicine information, duration and repeat pattern." },
        { number: "04", title: "Adjust reminders", description: "Personalize sound, volume, snooze duration and text size." },
      ],
    },
    outcomes: {
      heading: "What was the measurable impact?",
      items: [
        { value: "5", label: "Usability participants", detail: "An unmoderated remote study was completed with five participants in India." },
        { value: "3", label: "Responsive form factors", detail: "The core schedule hierarchy was designed for mobile, tablet, and desktop." },
        { value: "Not measured", label: "Production KPIs", detail: "This was an unshipped concept, so adoption, adherence, and support metrics are not claimed.", placeholder: true },
      ],
      quote: "“The application flow is so easy and intuitive and the concept is nice.” — Peer feedback recorded in the original case study",
    },
    learning: "The first interface is only the beginning. Research, usability work and peer feedback are what turn an initial idea into a clearer product experience.",
    sourcePdf: "/case-studies/medicine-reminder-case-study.pdf",
    navigation: [
      { label: "Problem", href: "#problem-answer" },
      { label: "Decision", href: "#decision-answer" },
      { label: "Research", href: "#research-answer" },
      { label: "Change", href: "#change-answer" },
      { label: "Collaboration", href: "#collaboration-answer" },
      { label: "AI", href: "#ai-answer" },
      { label: "Impact", href: "#impact-answer" },
    ],
  },
  "car-rental": {
    slug: "car-rental",
    accent: "#f0b900",
    category: "Product Design · UX/UI",
    title: "Car Rental",
    proposition: "Making car rental simpler, from discovery to booking.",
    metadata: [
      { label: "Role", value: "Product Designer — UX/UI" },
      { label: "Scope", value: "UX Strategy · User Flows · Interaction Design · UI Design · Prototyping" },
      { label: "Platform", value: "Mobile" },
      { label: "Tool", value: "Figma" },
      { label: "Project type", value: "Product Design Concept" },
    ],
    hero: {
      src: "/images/projects/northside-home.png",
      alt: "Car Rental mobile home screen with rental search form, deals and featured vehicles",
      secondarySrc: "/images/projects/northside-search-results.png",
      secondaryAlt: "Car Rental mobile search results screen with vehicle cards and pricing",
      variant: "phone-pair",
      caption: "Home and search-results experience",
    },
    overview: {
      heading: "Renting a car shouldn't feel like managing a process.",
      paragraphs: [
        "Car rental involves several decisions before a user can make a booking—where to pick up the car, when they need it, what type of vehicle fits their needs, how much it costs, and whether the rental terms work for them.",
        "This concept explores a more straightforward mobile experience where people can move naturally from discovery to vehicle selection without unnecessary complexity.",
      ],
      evidence: ["Location and schedule setup", "Deals and featured vehicles", "Search results and filtering", "Vehicle inclusions and pricing"],
    },
    problem: {
      label: "02 · The challenge",
      heading: "Too many decisions can make a simple rental feel complicated.",
      intro: "The design challenge was to organize location, date and time, vehicle choice, pricing and rental conditions into a sequence that remains understandable on a mobile screen. This is the explored design scope—not a validated research finding.",
      points: [
        { title: "Set the rental", description: "Pickup and return locations, dates, times and driver age need to be entered without making the first step feel heavy." },
        { title: "Choose confidently", description: "Vehicle identity, seating, luggage capacity, included services and price all compete for attention during comparison." },
        { title: "Understand the offer", description: "Discounts, daily pricing and rental inclusions need a clear hierarchy before a person can commit." },
      ],
    },
    research: {
      label: "03 · Design goals",
      heading: "Four goals kept the experience focused.",
      intro: "No research artefacts were provided with this concept. These goals describe the intended design direction visible in the supplied screens.",
      methods: [
        { label: "01", title: "Make discovery effortless", description: "Help people quickly understand what is available and find relevant vehicles." },
        { label: "02", title: "Make comparison easier", description: "Present important vehicle information in a way that supports quick decision-making." },
        { label: "03", title: "Reduce booking friction", description: "Keep the path from rental setup to vehicle selection straightforward." },
        { label: "04", title: "Build confidence", description: "Make pricing, vehicle information and included conditions clear before commitment." },
      ],
    },
    insightsLabel: "04 · Experience principles",
    insightsHeading: "The interface prioritizes three moments of understanding.",
    insights: [
      { number: "01", title: "Start with the rental context.", description: "The home screen asks for location and schedule before presenting the primary Find Cars action." },
      { number: "02", title: "Let vehicle imagery lead.", description: "Large car imagery supports recognition while specifications and inclusions provide practical context." },
      { number: "03", title: "Keep the total offer visible.", description: "Discount, total price, daily rate and included conditions appear together on each result card." },
    ],
    strategy: {
      label: "05 · User journey & information architecture",
      heading: "A direct path from setup to relevant vehicles.",
      description: "The available screens establish this verified structure: Home → rental search → Search Results → filter. Vehicle-detail and booking screens were not supplied, so they are not represented as completed parts of the flow.",
      steps: [
        { label: "Home", detail: "Location, dates, times, age, deals and featured cars" },
        { label: "Search", detail: "Submit the rental criteria through one primary action" },
        { label: "Results", detail: "Review vehicle cards, inclusions and pricing" },
        { label: "Filter", detail: "Narrow the result set using the visible filter control" },
      ],
    },
    exploration: {
      label: "06 · Discovery & search",
      heading: "Answer the essential questions first.",
      description: "The home screen groups the rental setup into one yellow panel, then moves into deals and featured vehicles. This creates a clear transition from task setup to browsing.",
      visual: {
        src: "/images/projects/northside-home.png",
        alt: "Car Rental home screen showing pickup and return fields, dates, times, driver age, promo code, deals and featured cars",
        secondarySrc: "/images/projects/northside-search-results.png",
        secondaryAlt: "Car Rental search results with filter control, vehicle information, inclusions and pricing",
        variant: "phone-pair",
        caption: "Discovery and search-results screens",
      },
      notes: ["Rental criteria are grouped into one coherent form", "A single Find Cars action establishes the next step", "Deals and featured cars support browsing before search", "Results expose a filter control without hiding the vehicle cards"],
    },
    decisionsLabel: "07 · Key design decisions",
    decisionsHeading: "The visible UI makes the rental offer easier to scan.",
    decisions: [
      {
        number: "01",
        title: "Group setup around one primary action.",
        changed: "Pickup, return, schedule, driver age and promo code sit inside one visually connected search area.",
        why: "These inputs define the rental together and should read as one task rather than unrelated fields.",
        impact: "The screen creates an obvious sequence ending in the Find Cars action.",
        visual: {
          src: "/images/projects/northside-home.png",
          alt: "Car Rental home screen emphasizing the grouped search form and Find Cars button",
          variant: "phone",
          caption: "Rental setup on the home screen",
        },
      },
      {
        number: "02",
        title: "Make vehicle information scannable.",
        changed: "Each result uses a large vehicle image, name, model detail, seating and luggage indicators, then a compact inclusions list.",
        why: "People need to identify the car and understand its practical fit before evaluating the price.",
        impact: "The card moves from vehicle identity to utility and then cost in a predictable order.",
        visual: {
          src: "/images/projects/northside-search-results.png",
          alt: "Car Rental result card showing vehicle imagery, seating, luggage, inclusions and pricing",
          variant: "phone",
          caption: "Search-result information hierarchy",
        },
      },
      {
        number: "03",
        title: "Keep pricing and conditions together.",
        changed: "The result card presents the discount, previous price, current price, daily rate and included rental conditions in one unit.",
        why: "Separating these details would make the offer harder to evaluate at the moment of comparison.",
        impact: "The visible price is supported by the terms needed to understand it.",
      },
    ],
    designSystem: {
      label: "08 · UI design",
      heading: "A bold mobile system with clear functional roles.",
      description: "The interface uses yellow for primary rental actions and price emphasis, blue for navigation and utility controls, white cards for content, and large vehicle imagery as the main product evidence.",
      foundations: [
        { label: "Primary", value: "Yellow · search, price and primary actions" },
        { label: "Utility", value: "Blue · navigation, location and filter controls" },
        { label: "Structure", value: "White cards · grouped inputs and vehicle results" },
        { label: "Imagery", value: "Large vehicle renders · recognition and comparison" },
      ],
    },
    validation: {
      label: "09 · Prototype & validation",
      heading: "The interaction evidence still needs to be connected.",
      intro: "The supplied assets show two high-fidelity states, but no working Figma prototype link, usability study or validation findings were provided. This section remains explicit about that evidence gap.",
      study: ["Figma", "Mobile concept", "2 supplied screens", "Prototype link not provided"],
      cycle: [
        { label: "Flow", detail: "The visible path moves from rental setup on Home to Search Results." },
        { label: "Prototype", detail: "Add the working Figma prototype URL when it is available.", placeholder: true },
        { label: "Validation", detail: "No usability study or validated findings were provided for this concept.", placeholder: true },
        { label: "Next evidence", detail: "Add vehicle-detail and booking screens before documenting the complete booking journey.", placeholder: true },
      ],
      visual: {
        src: "/images/projects/northside-home.png",
        alt: "Car Rental home screen",
        secondarySrc: "/images/projects/northside-search-results.png",
        secondaryAlt: "Car Rental search-results screen",
        variant: "phone-pair",
        caption: "Current high-fidelity flow evidence",
      },
    },
    finalSolution: {
      label: "10 · Delivered experience",
      heading: "A clear discovery-to-results journey.",
      intro: "Within the supplied scope, the final experience takes a user from defining a rental to reviewing relevant vehicle offers and narrowing the results.",
      visual: {
        src: "/images/projects/northside-home.png",
        alt: "Car Rental home and rental search screen",
        secondarySrc: "/images/projects/northside-search-results.png",
        secondaryAlt: "Car Rental vehicle search results screen",
        variant: "phone-pair",
        caption: "Current end-to-end screen sequence",
      },
      flows: [
        { number: "01", title: "Define the rental", description: "Enter pickup and return locations, dates, times and driver age." },
        { number: "02", title: "Explore options", description: "Browse deals and featured vehicles or submit the search criteria." },
        { number: "03", title: "Review results", description: "Scan vehicle identity, capacity, inclusions and pricing." },
        { number: "04", title: "Narrow the choice", description: "Use the visible filter control to refine the available vehicles." },
      ],
    },
    outcomes: {
      label: "11 · Qualitative outcome",
      heading: "A focused foundation for a complete rental platform.",
      items: [
        { value: "Clear", label: "Rental setup", detail: "The essential search criteria share one structured entry point." },
        { value: "Scannable", label: "Vehicle comparison", detail: "Identity, capacity, inclusions and price follow a consistent card hierarchy." },
        { value: "Expandable", label: "Product foundation", detail: "The established mobile UI can be extended when vehicle-detail and booking flows are designed." },
      ],
    },
    learningLabel: "12 · What I learned",
    learning: "A rental experience isn't simply about helping someone find a car. It's about helping them make a decision they feel confident about. The biggest opportunity is not adding more information, but deciding what information matters at each stage of the journey.",
    navigation: [
      { label: "Overview", href: "#overview" },
      { label: "Challenge", href: "#problem" },
      { label: "Goals", href: "#discovery" },
      { label: "Decisions", href: "#decisions" },
      { label: "Prototype", href: "#validation" },
      { label: "Solution", href: "#solution" },
      { label: "Outcome", href: "#outcome" },
    ],
  },
};

export const caseStudySlugs = Object.keys(caseStudies).filter(slug => slug !== "car-rental");

export function getCaseStudy(slug: string) {
  if (slug === "car-rental") return undefined;
  return caseStudies[slug];
}
