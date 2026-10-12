import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand brand-light" href="/" aria-label={`${siteConfig.name} — homepage`}>
          <span className="brand-mark" aria-hidden="true">P</span><span>{siteConfig.name}</span>
        </a>
        <p>AI-automatisering, maatwerksoftware en systeemkoppelingen voor Nederlandse mkb-teams.</p>
      </div>
      <div className="footer-column">
        <span>DIENSTEN</span>
        <a href="/ai-automatisering">AI-automatisering</a>
        <a href="/ai-agents">AI-agents</a>
        <a href="/procesautomatisering">Procesautomatisering</a>
        <a href="/maatwerksoftware">Maatwerksoftware</a>
        <a href="/systeemkoppelingen">Systeemkoppelingen</a>
      </div>
      <div className="footer-column">
        <span>PROCESMAAT</span>
        <a href="/diensten">Alle diensten</a>
        <a href="/kennisbank">Kennisbank</a>
        <a href="/#investering">Investering</a>
        <a href="/#werkwijze">Werkwijze</a>
        <a href="/#veelgestelde-vragen">Veelgestelde vragen</a>
        <a href="/#scan">Gratis digitaal automatiseringsadvies</a>
      </div>
      <div className="footer-column">
        <span>CONTACT & JURIDISCH</span>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <a href="/privacy">Privacybeleid</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        {!siteConfig.isProduction && <span>Development — gegevens vóór publicatie controleren</span>}
      </div>
    </footer>
  );
}
