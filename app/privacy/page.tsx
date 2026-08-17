import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const privacyTitle = `Privacybeleid — ${siteConfig.name}`;
const privacyDescription = `Lees hoe ${siteConfig.name} omgaat met persoonsgegevens bij contact- en scanverzoeken.`;

export const metadata: Metadata = {
  title: privacyTitle,
  description: privacyDescription,
  alternates: { canonical: "/privacy" },
  openGraph: { title: privacyTitle, description: privacyDescription, url: "/privacy", images: [] },
  twitter: { title: privacyTitle, description: privacyDescription, images: [] },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="site-header privacy-header">
        <Link className="brand" href="/" aria-label={`${siteConfig.name} — naar de homepage`}><span className="brand-mark" aria-hidden="true">P</span><span>{siteConfig.name}</span></Link>
        <Link className="text-link" href="/">← Terug naar de homepage</Link>
      </header>
      <main className="privacy-page">
        <div className="privacy-hero">
          <p className="eyebrow"><span /> Privacy</p>
          <h1>Helder over je gegevens.</h1>
          <p>Dit privacybeleid beschrijft welke persoonsgegevens we verwerken wanneer je contact opneemt of een gratis automatiseringsscan aanvraagt.</p>
        </div>

        <aside className="privacy-review-note">
          <strong>Voor publicatie controleren</strong>
          <p>Deze concepttekst bevat bewust configureerbare waarden. Vul de juridische bedrijfsnaam, het adres, KvK-nummer, de bewaartermijn en subverwerkers in <code>lib/site-config.ts</code> in en laat de definitieve tekst beoordelen voor jouw situatie.</p>
        </aside>

        <div className="privacy-layout">
          <nav className="privacy-toc" aria-label="Op deze pagina">
            <span>OP DEZE PAGINA</span>
            <a href="#verantwoordelijke">Verantwoordelijke</a>
            <a href="#gegevens">Welke gegevens</a>
            <a href="#doelen">Doelen en grondslagen</a>
            <a href="#bewaren">Bewaren en delen</a>
            <a href="#rechten">Jouw rechten</a>
            <a href="#cookies">Cookies en meting</a>
          </nav>

          <article className="privacy-content">
            <section id="verantwoordelijke">
              <span className="privacy-number">01</span>
              <h2>Wie is verantwoordelijk?</h2>
              <p><strong>{siteConfig.legalName}</strong>, gevestigd aan {siteConfig.address}, KvK-nummer {siteConfig.chamberOfCommerce}, is verantwoordelijk voor de verwerking die in dit beleid wordt beschreven.</p>
              <p>Vragen over privacy kun je sturen naar <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
            </section>

            <section id="gegevens">
              <span className="privacy-number">02</span>
              <h2>Welke gegevens verwerken we?</h2>
              <p>Als je het formulier invult, verwerken we je naam, bedrijfsnaam, zakelijk e-mailadres, eventueel telefoonnummer, bedrijfsgrootte, je procesomschrijving en de geschatte tijd die het proces kost.</p>
              <p>De website kan daarnaast strikt noodzakelijke technische gegevens verwerken om de pagina veilig te leveren en misbruik te voorkomen. Deel in het formulier geen bijzondere of gevoelige persoonsgegevens.</p>
            </section>

            <section id="doelen">
              <span className="privacy-number">03</span>
              <h2>Waarom verwerken we gegevens?</h2>
              <p>We gebruiken formuliergegevens om je aanvraag te beoordelen, contact met je op te nemen en de gratis automatiseringsscan voor te bereiden. De verwerking is gebaseerd op je verzoek om vóór een mogelijke overeenkomst met elkaar in gesprek te gaan en, waar van toepassing, op ons gerechtvaardigd belang om aanvragen zorgvuldig af te handelen.</p>
              <p>We gebruiken je aanvraag niet automatisch voor een nieuwsbrief of andere marketing waar aparte toestemming voor nodig is.</p>
            </section>

            <section id="bewaren">
              <span className="privacy-number">04</span>
              <h2>Hoe lang bewaren en met wie delen we?</h2>
              <p>De ingestelde bewaartermijn is: <strong>{siteConfig.privacy.retentionPeriod}</strong>. Gegevens worden niet langer bewaard dan nodig voor het doel waarvoor ze zijn verzameld, tenzij een wettelijke bewaarplicht anders vereist.</p>
              <p>Het formulier stuurt gevalideerde aanvragen naar een beveiligde, serverzijdig ingestelde webhook. Mogelijke subverwerkers moeten vóór publicatie hier worden vastgelegd: <strong>{siteConfig.privacy.subprocessors}</strong>. We verkopen je persoonsgegevens niet.</p>
            </section>

            <section>
              <span className="privacy-number">05</span>
              <h2>Hoe beveiligen we gegevens?</h2>
              <p>We nemen passende technische en organisatorische maatregelen, zoals versleutelde verbindingen, invoervalidatie, beperkte toegang en het niet opnemen van persoonsgegevens in applicatielogs. Geen enkele methode kan ieder risico volledig uitsluiten.</p>
            </section>

            <section id="rechten">
              <span className="privacy-number">06</span>
              <h2>Welke rechten heb je?</h2>
              <p>Je kunt vragen om inzage, correctie, verwijdering, beperking of overdracht van je persoonsgegevens. Ook kun je bezwaar maken tegen bepaalde verwerkingen. Stuur je verzoek naar <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. We kunnen vragen je identiteit op een passende manier te bevestigen.</p>
              <p>Je hebt daarnaast het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.</p>
            </section>

            <section id="cookies">
              <span className="privacy-number">07</span>
              <h2>Cookies en meting</h2>
              <p>De website laadt standaard geen optionele marketingtracking. Er zijn wel gebeurtenishaken voorbereid om bijvoorbeeld CTA-klikken en formulierstappen te meten. Eventuele marketing- of analysetools mogen pas worden aangesloten nadat een bezoeker daar uitdrukkelijk toestemming voor heeft gegeven.</p>
            </section>

            <section>
              <span className="privacy-number">08</span>
              <h2>Wijzigingen</h2>
              <p>Als de website, dienstverlening of regelgeving verandert, kan dit beleid worden aangepast. De meest recente versie staat altijd op deze pagina.</p>
              <p className="privacy-date">Laatste conceptwijziging: 17 augustus 2026.</p>
            </section>
          </article>
        </div>
      </main>
      <footer className="privacy-footer"><span>© {new Date().getFullYear()} {siteConfig.name}</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></footer>
    </>
  );
}
