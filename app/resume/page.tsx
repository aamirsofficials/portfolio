import type { Metadata } from "next";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Résumé — Aamir Khan",
  description: "Experience and capabilities of Aamir Khan, Lead Product Designer.",
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <nav className="resume-nav"><a href="/">← Portfolio</a><PrintButton /></nav>
      <header className="resume-header"><div><span>Lead Product Designer</span><h1>Aamir Khan</h1></div><p>15+ years designing thoughtful digital products, platforms and experiences across AI, SaaS, marketplaces, mobility and service platforms.</p></header>
      <section className="resume-summary"><h2>Profile</h2><p>Senior product designer working at the intersection of user experience, visual craft, product strategy and technology. Experienced in simplifying complex problems, creating scalable design systems and collaborating closely with engineering to bring meaningful products to life.</p></section>
      <section className="resume-columns"><div><h2>Experience</h2><article><span>Core Techies India</span><h3>UX Team Lead</h3><p>Leading product framing, experience strategy, design direction, systems and cross-functional engineering collaboration across complex digital platforms.</p></article><h2>Selected products</h2><ul className="resume-projects"><li><b>Bidvora</b><span>AI-powered bid platform</span></li><li><b>Northside Rentals</b><span>Car rental booking platform</span></li><li><b>Recrugo</b><span>AI recruitment assistance</span></li><li><b>Anceller</b><span>Home services platform</span></li><li><b>Expert Electrical</b><span>Retail offers & claims system</span></li></ul></div><div><h2>Capabilities</h2><ul className="resume-skills"><li>Product & UX strategy</li><li>Product, UX & UI design</li><li>Interaction design</li><li>Research & information architecture</li><li>Design systems & prototyping</li><li>Responsive design & accessibility</li><li>Technical collaboration</li><li>Stakeholder alignment</li></ul><h2>Technology</h2><p>React · Next.js · TypeScript · JavaScript · HTML · CSS · Tailwind · Git · Figma</p><h2>Impact</h2><p>15+ years · 200+ products · 5+ products led · $0.2M revenue impacted</p></div></section>
      <footer className="resume-footer"><span>Aamir Khan · Lead Product Designer</span><a href="mailto:?subject=Portfolio%20enquiry%20for%20Aamir%20Khan">Get in touch ↗</a></footer>
    </main>
  );
}
