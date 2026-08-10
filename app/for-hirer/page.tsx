import type { Metadata } from "next";
import { RemoteReadinessSection } from "../components/RemoteReadinessSection";
import { SeeMeAsSection } from "../components/SeeMeAsSection";

export const metadata: Metadata = {
  title: "For Hirers — Aamir Khan",
  description: "Aamir Khan's remote and hybrid work setup, equipment, connectivity, and workspace readiness.",
};

export default function ForHirerPage() {
  return (
    <main className="for-hirer-page">
      <nav className="for-hirer-nav section-shell" aria-label="For hirers navigation">
        <a href="/">← Portfolio</a>
        <a href="/resume">Résumé</a>
      </nav>
      <RemoteReadinessSection />
      <SeeMeAsSection />
      <section className="for-hirer-contact section-shell" aria-labelledby="for-hirer-contact-title">
        <span className="eyebrow">Start a conversation</span>
        <h2 id="for-hirer-contact-title">Looking for a product design lead?</h2>
        <a className="button button-primary" href="mailto:?subject=Portfolio%20enquiry%20for%20Aamir%20Khan">Get in touch <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
