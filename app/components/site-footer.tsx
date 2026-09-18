import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="brand brand-light" href="/">
          <span className="brand-mark" aria-hidden="true">P</span><span>{siteConfig.name}</span>
        </Link>
        <p>AI-automatisering, maatwerksoftware en systeemkoppelingen voor Nederlandse mkb-teams.</p>
      </div>
      <div className="footer-column">
        <span>DIENSTEN</span>
        <Link href="/ai-automatisering">AI-automatisering</Link>
        <Link href="/ai-agents">AI-agents</Link>
        <Link href="/procesautomatisering">Procesautomatisering</Link>
        <Link href="/maatwerksoftware">Maatwerksoftware</Link>
        <Link href="/systeemkoppelingen">Systeemkoppelingen</Link>
      </div>
      <div className="footer-column">
        <span>PROCESMAAT</span>
        <Link href="/diensten">Alle diensten</Link>
        <Link href="/kennisbank">Kennisbank</Link>
        <Link href="/#werkwijze">Werkwijze</Link>
        <Link href="/#veelgestelde-vragen">Veelgestelde vragen</Link>
        <Link href="/#scan">Gratis automatiseringsscan</Link>
      </div>
      <div className="footer-column">
        <span>CONTACT & JURIDISCH</span>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <Link href="/privacy">Privacybeleid</Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        {!siteConfig.isProduction && <span>Development — gegevens vóór publicatie controleren</span>}
      </div>
    </footer>
  );
}
