export type CaseStudyMeta = {
  label: string;
  value: string;
};

export type CaseStudyVisual = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudy = {
  slug: string;
  accent: string;
  category: string;
  title: string;
  proposition: string;
  metadata: CaseStudyMeta[];
  hero: CaseStudyVisual;
  overview: {
    heading: string;
    paragraphs: string[];
    evidence: string[];
  };
  problem: {
    intro: string;
    points: { title: string; description: string }[];
  };
  research: {
    intro: string;
    methods: { label: string; title: string; description: string }[];
  };
  insights: { number: string; title: string; description: string }[];
  strategy: {
    heading: string;
    description: string;
    steps: { label: string; detail: string }[];
  };
  exploration: {
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
  designSystem: {
    heading: string;
    description: string;
    foundations: { label: string; value: string }[];
  };
  validation: {
    intro: string;
    study: string[];
    cycle: { label: string; detail: string; placeholder?: boolean }[];
    visual: CaseStudyVisual;
  };
  finalSolution: {
    heading: string;
    intro: string;
    visual: CaseStudyVisual;
    flows: { number: string; title: string; description: string }[];
  };
  outcomes: {
    items: { value: string; label: string; detail: string; placeholder?: boolean }[];
    quote?: string;
  };
  learning: string;
  sourcePdf?: string;
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
      { label: "Team", value: "Details to be added" },
      { label: "Platform", value: "Mobile · Tablet · Desktop" },
      { label: "Contribution", value: "Research · Wireframing · UI · Prototyping · Usability study" },
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
      intro: "Remembering a dose is not only a scheduling problem. The experience also needs to make the medicine, timing and completion state immediately clear.",
      points: [
        { title: "Memory", description: "Users may forget that a dose is due during a busy or disrupted day." },
        { title: "Context", description: "A reminder without the medicine name and dose context does not answer what to take." },
        { title: "Confidence", description: "People need a visible record of what is upcoming, completed or still outstanding." },
      ],
    },
    research: {
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
      items: [
        { value: "Clearer", label: "Daily schedule", detail: "Medicine, time and completion state share one hierarchy." },
        { value: "Scalable", label: "Responsive foundation", detail: "The core experience adapts across three form factors." },
        { value: "To add", label: "Measured product impact", detail: "Add verified adoption, completion or support metrics when available.", placeholder: true },
      ],
      quote: "“The application flow is so easy and intuitive and the concept is nice.” — Peer feedback recorded in the original case study",
    },
    learning: "The first interface is only the beginning. Research, usability work and peer feedback are what turn an initial idea into a clearer product experience.",
    sourcePdf: "/case-studies/medicine-reminder-case-study.pdf",
  },
};

export const caseStudySlugs = Object.keys(caseStudies);

export function getCaseStudy(slug: string) {
  return caseStudies[slug];
}
