type RemoteReadinessIcon = "desktop" | "laptop" | "memory" | "storage" | "network" | "power" | "room" | "accessories";

type RemoteReadinessItem = {
  icon: RemoteReadinessIcon;
  title: string;
  description: string;
};

const remoteReadinessItems: RemoteReadinessItem[] = [
  {
    icon: "desktop",
    title: "Dedicated Modern Desktop System",
    description: "Powerful, up-to-date hardware built for smooth multitasking and demanding creative work.",
  },
  {
    icon: "laptop",
    title: "MacBook Pro 15",
    description: "Reliable performance and portability for seamless work across locations.",
  },
  {
    icon: "memory",
    title: "Dedicated High-Speed RAM with 32 GB+",
    description: "Smooth multitasking, faster workflows, and responsive performance without unnecessary slowdowns.",
  },
  {
    icon: "storage",
    title: "Dedicated High-Capacity SSD with 4 TB+",
    description: "Ample high-speed storage for large design files, projects, assets, and backups.",
  },
  {
    icon: "network",
    title: "High-Speed Fiber Internet · Powered by JIO",
    description: "Stable, high-speed connectivity designed for reliable meetings, collaboration, uploads, and day-to-day work.",
  },
  {
    icon: "power",
    title: "Dual Power Backup · Branded Battery Inverter",
    description: "Reliable backup power that helps keep work running during outages and power fluctuations.",
  },
  {
    icon: "room",
    title: "Separate Working Room",
    description: "A dedicated, non-shared workspace designed for focus, privacy, and distraction-free work.",
  },
  {
    icon: "accessories",
    title: "Professional Work Accessories",
    description: "Headphones, speakers, webcam, official-purpose smartphone, and other essentials for clear communication and productive work.",
  },
];

function ReadinessIcon({ icon }: { icon: RemoteReadinessIcon }) {
  return <span className={`remote-readiness-icon remote-readiness-icon--${icon}`} aria-hidden="true"><i /></span>;
}

export function RemoteReadinessSection() {
  return (
    <section className="remote-readiness reveal" aria-labelledby="remote-readiness-title">
      <div className="section-shell">
        <div className="remote-readiness-heading">
          <span className="eyebrow">Remote ready</span>
          <h2 id="remote-readiness-title">Why I&apos;m suited for Remote / Hybrid mode<span className="accent-dot">.</span></h2>
          <p>I have the right environment, tools, and setup to deliver high-quality work consistently—no matter where I work from.</p>
        </div>
        <div className="remote-readiness-grid">
          <article className="remote-readiness-card remote-readiness-card--reserved">
            <span className="remote-readiness-feature-label">Flexible collaboration</span>
            <h3>12+ years of experience across <span className="remote-readiness-accent">onsite</span> and <span className="remote-readiness-accent">remote</span> teams.</h3>
            <span className="remote-readiness-plus" aria-hidden="true">+</span>
          </article>
          {remoteReadinessItems.map(item => (
            <article className="remote-readiness-card" key={item.title}>
              <ReadinessIcon icon={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
