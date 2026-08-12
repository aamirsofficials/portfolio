import Link from "next/link";

export default function PortfolioFooter({ backToTopHref = "#top" }: { backToTopHref?: string }) {
  return (
    <footer>
      <div className="section-shell">
        <p>Aamir Khan © {new Date().getFullYear()}</p>
        <p className="availability"><i /> Available for remote/hybrid/onsite opportunities</p>
        <nav aria-label="Footer navigation">
          <a href="mailto:?subject=Portfolio%20enquiry%20for%20Aamir%20Khan">Email</a>
          <details className="footer-more">
            <summary>More <span aria-hidden="true">↑</span></summary>
            <div className="footer-dropup"><Link href="/for-hirer">For Hirer <span aria-hidden="true">↗</span></Link></div>
          </details>
          <a href={backToTopHref}>Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
