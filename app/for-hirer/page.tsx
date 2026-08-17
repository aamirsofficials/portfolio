import type { Metadata } from "next";
import PortfolioFooter from "../components/PortfolioFooter";
import PortfolioSubpageHeader from "../components/PortfolioSubpageHeader";
import { RemoteReadinessSection } from "../components/RemoteReadinessSection";
import { SeeMeAsSection } from "../components/SeeMeAsSection";

export const metadata: Metadata = {
  title: "For Hirers — Aamir Khan",
  description: "Aamir Khan's remote and hybrid work setup, equipment, connectivity, and workspace readiness.",
};

export default function ForHirerPage() {
  return (
    <>
      <PortfolioSubpageHeader />
      <main className="for-hirer-page" id="top">
        <SeeMeAsSection />
        <RemoteReadinessSection />
        <section className="for-hirer-contact section-shell" aria-labelledby="for-hirer-contact-title">
          <span className="eyebrow">Start a conversation</span>
          <h2 id="for-hirer-contact-title">Looking for a product design lead?</h2>
          <a className="button button-primary" href="mailto:?subject=Portfolio%20enquiry%20for%20Aamir%20Khan">Get in touch <span aria-hidden="true">↗</span></a>
        </section>
        <PortfolioFooter />
      </main>
    </>
  );
}
