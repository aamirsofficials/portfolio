import Image from "next/image";
import Link from "next/link";

export default function PortfolioSubpageHeader() {
  return (
    <header className="portfolio-subpage-header">
      <div className="portfolio-subpage-header-inner">
        <Link className="portfolio-subpage-brand" href="/" aria-label="Aamir Khan portfolio home">
          <span>
            <Image className="portfolio-subpage-logo-light" src="/logo-icon-black.svg" alt="" width={30} height={30} />
            <Image className="portfolio-subpage-logo-dark" src="/logo-icon-white.svg" alt="" width={30} height={30} />
          </span>
          <b>Aamir Khan</b>
        </Link>
        <Link className="portfolio-subpage-back" href="/#work"><span aria-hidden="true">&larr;</span> Back to work</Link>
      </div>
    </header>
  );
}
