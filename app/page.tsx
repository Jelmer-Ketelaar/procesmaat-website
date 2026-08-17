import { LeadForm } from "@/app/components/lead-form";
import { SiteHeader } from "@/app/components/site-header";
import { TrackedLink } from "@/app/components/tracked-link";
import { automationExamples, faqs, problemItems, processSteps } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Software op maat voor het mkb</p>
            <h1>Handwerk eruit.<br /><em>Grip</em> terug.</h1>
            <p className="hero-intro">We bouwen slimme software die terugkerend handwerk uit je bedrijf haalt. Geen standaardpakket, maar een praktische oplossing die aansluit op hoe je al werkt.</p>
            <div className="hero-actions">
              <TrackedLink className="button" href="#scan" event="cta_click" location="hero">Plan een gratis scan <span aria-hidden="true">&#8599;</span></TrackedLink>
              <a className="text-link" href="#mogelijkheden">Bekijk wat er mogelijk is <span aria-hidden="true">&#8595;</span></a>
            </div>
            <p className="reassurance">Vrijblijvend gesprek <i /> Geen standaardpakket <i /> Direct met de bouwer</p>
          </div>

          <div className="process-stage" aria-label="Voorbeeld van een geautomatiseerde werkstroom">
            <div className="stage-topline"><span>Proces 04 / Offerte-opvolging</span><span className="live"><i /> Actief</span></div>
            <div className="stage-path" aria-hidden="true">
              <span className="path-line" />
              <div className="process-node node-one"><b>01</b><span>Aanvraag<br />ontvangen</span></div>
              <div className="process-node node-two"><b>02</b><span>Gegevens<br />controleren</span></div>
              <div className="process-node node-three"><b>03</b><span>Taak<br />aanmaken</span></div>
              <div className="process-node node-four"><b>04</b><span>Opvolging<br />versturen</span></div>
              <span className="flow-dot" />
            </div>
            <div className="stage-metrics"><div><span>INVOER</span><strong>E-mail + formulier</strong></div><div><span>REGELS</span><strong>4 controles</strong></div><div><span>UITVOER</span><strong>CRM + opvolging</strong></div></div>
          </div>
        </section>

        <section className="problem-section section-rule" aria-labelledby="problem-title">
          <div className="section-label"><span>01</span><p>Herkenbaar?</p></div>
          <div className="problem-intro">
            <h2 id="problem-title">Je mensen zijn er voor het echte werk. <em>Niet voor kopiëren en plakken.</em></h2>
            <p>Veel processen groeien stap voor stap. Voor je het weet is een tijdelijke spreadsheet een vast onderdeel van de werkweek. Dat kost aandacht, maakt fouten waarschijnlijker en beperkt het overzicht.</p>
          </div>
          <ol className="problem-list">{problemItems.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p><i aria-hidden="true">↗</i></li>)}</ol>
        </section>

        <section className="examples-section" id="mogelijkheden" aria-labelledby="examples-title">
          <div className="section-label section-label-light"><span>02</span><p>Mogelijkheden</p></div>
          <div className="examples-heading">
            <h2 id="examples-title">Van losse handelingen naar één <em>slimme werkwijze.</em></h2>
            <p>Dit zijn voorbeelden van processen die vaak geschikt zijn voor automatisering — geen klantcases of kant-en-klare pakketten. Wat zinvol is, hangt af van jouw proces.</p>
          </div>
          <div className="examples-grid">
            {automationExamples.map((example) => (
              <article className="example-item" key={example.number}>
                <div className="example-meta"><span>{example.number}</span><i>{example.tag}</i></div>
                <h3>{example.title}</h3><p>{example.text}</p><span className="corner-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="transformation-section section-rule" aria-labelledby="transformation-title">
          <div className="section-label"><span>03</span><p>Voor & na</p></div>
          <div className="transformation-heading"><p className="eyebrow"><span /> Eén proces, anders ingericht</p><h2 id="transformation-title">Van losse acties naar een <em>beheerste stroom.</em></h2></div>
          <div className="workflow-compare">
            <div className="workflow-side workflow-before">
              <div className="workflow-title"><span>VOOR</span><strong>Versnipperd handwerk</strong></div>
              <div className="manual-map" aria-label="Handmatig proces met losse overdrachten">
                <div className="manual-node manual-a"><span>IN</span><b>E-mail</b></div><div className="manual-node manual-b"><span>01</span><b>Spreadsheet</b></div><div className="manual-node manual-c"><span>02</span><b>Controle</b></div><div className="manual-node manual-d"><span>03</span><b>Overtypen</b></div><div className="manual-node manual-e"><span>UIT</span><b>Opvolging</b></div>
                <i className="manual-line line-a" /><i className="manual-line line-b" /><i className="manual-line line-c" /><i className="manual-line line-d" />
              </div>
              <ul><li>Meerdere overdrachtsmomenten</li><li>Afhankelijk van losse herinneringen</li><li>Fouten zijn lastig terug te vinden</li></ul>
            </div>
            <div className="workflow-switch" aria-hidden="true"><span>WORDT</span><b>→</b></div>
            <div className="workflow-side workflow-after">
              <div className="workflow-title"><span>NA</span><strong>Gecontroleerde automatisering</strong></div>
              <div className="auto-map" aria-label="Geautomatiseerd proces met controles">
                <div className="auto-track" /><div className="auto-node"><span>IN</span><b>Aanvraag</b></div><div className="auto-node"><span>01</span><b>Valideren</b></div><div className="auto-node"><span>02</span><b>Verwerken</b></div><div className="auto-node auto-node-last"><span>UIT</span><b>Opvolgen</b></div><i className="auto-pulse" />
              </div>
              <ul><li>Duidelijke regels en uitzonderingen</li><li>Acties op het juiste moment</li><li>Inzicht in status en resultaat</li></ul>
            </div>
          </div>
        </section>

        <section className="process-section" id="werkwijze" aria-labelledby="process-title">
          <div className="section-label section-label-light"><span>04</span><p>Werkwijze</p></div>
          <div className="process-heading"><h2 id="process-title">Eerst begrijpen.<br /><em>Dan pas bouwen.</em></h2><p>Automatisering werkt pas goed als de uitzonderingen net zo duidelijk zijn als de standaardroute.</p></div>
          <ol className="process-list">{processSteps.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
        </section>

        <section className="fit-section section-rule" aria-labelledby="fit-title">
          <div className="section-label"><span>05</span><p>Past dit?</p></div>
          <div className="fit-heading"><h2 id="fit-title">Een goede automatisering begint bij een <em>echt proces.</em></h2><p>De gratis scan is bedoeld om snel en eerlijk te bepalen of bouwen de moeite waard kan zijn.</p></div>
          <div className="fit-grid">
            <article className="fit-yes"><span className="fit-status">DIT PAST WAARSCHIJNLIJK</span><h3>Je herkent dit:</h3><ul><li><i>✓</i><span>Hetzelfde proces komt wekelijks of dagelijks terug.</span></li><li><i>✓</i><span>Meerdere collega’s of systemen zijn erbij betrokken.</span></li><li><i>✓</i><span>Je wilt tijd besparen én meer controle houden.</span></li><li><i>✓</i><span>Er is iemand die het huidige proces goed kent.</span></li></ul></article>
            <article className="fit-no"><span className="fit-status">DIT PAST WAARSCHIJNLIJK NIET</span><h3>Je zoekt vooral:</h3><ul><li><i>×</i><span>Een gratis algemene website.</span></li><li><i>×</i><span>Een kant-en-klare app zonder procesonderzoek.</span></li><li><i>×</i><span>Een één-klik-AI-oplossing zonder menselijke controle.</span></li><li><i>×</i><span>Automatisering voor een eenmalige taak.</span></li></ul></article>
          </div>
        </section>

        <section className="credibility-section" aria-labelledby="credibility-title">
          <div className="credibility-copy"><p className="eyebrow light"><span /> Gebouwd om beheersbaar te blijven</p><h2 id="credibility-title">Geen black box.<br /><em>Wel duidelijkheid.</em></h2><p>Je hoeft de techniek niet te kennen. Je moet wel kunnen begrijpen wat de oplossing doet, wanneer er iets afwijkt en wie er kan ingrijpen.</p></div>
          <div className="credibility-grid">
            <div><span>01</span><h3>Direct contact</h3><p>Je spreekt tijdens analyse, bouw en oplevering rechtstreeks met degene die de oplossing bouwt.</p></div>
            <div><span>02</span><h3>Techniek met een reden</h3><p>Van vaste softwarelogica tot API-koppeling of AI: we kiezen wat aantoonbaar bij de taak past.</p></div>
            <div><span>03</span><h3>Controle op uitzonderingen</h3><p>Niet alles hoeft automatisch. Onzekere of afwijkende situaties kunnen bewust bij een medewerker terechtkomen.</p></div>
            <div><span>04</span><h3>Stapsgewijs opleveren</h3><p>Een vroeg prototype maakt aannames zichtbaar voordat een groter deel van het proces wordt gebouwd.</p></div>
          </div>
        </section>

        <section className="faq-section section-rule" id="veelgestelde-vragen" aria-labelledby="faq-title">
          <div className="section-label"><span>06</span><p>Veelgestelde vragen</p></div>
          <div className="faq-heading"><h2 id="faq-title">Eerst weten<br />waar je aan toe bent.</h2><p>Staat je vraag er niet tussen? Tijdens de gratis scan kijken we graag naar jouw situatie.</p></div>
          <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span><b>{faq.question}</b><i aria-hidden="true">+</i></summary><div><p>{faq.answer}</p></div></details>)}</div>
        </section>

        <section className="scan-section" id="scan" aria-labelledby="scan-title">
          <div className="scan-intro">
            <p className="eyebrow light"><span /> Gratis automatiseringsscan — 30 minuten</p><h2 id="scan-title">Waar blijft bij jullie tijd liggen?</h2><p>Vertel kort welk proces steeds terugkomt. Tijdens de scan brengen we de stappen, tijdvreters en haalbaarheid in beeld — zonder verkooppraat of verplichting.</p>
            <ul><li><i>✓</i><span>Eén concreet proces onder de loep</span></li><li><i>✓</i><span>Eerlijke inschatting van de haalbaarheid</span></li><li><i>✓</i><span>Direct contact met de bouwer</span></li></ul>
            <div className="booking-alternative"><span>Lievere meteen een moment kiezen?</span><TrackedLink href={siteConfig.bookingUrl} event="booking_click" location="final_cta">Open de agenda <i aria-hidden="true">↗</i></TrackedLink></div>
          </div>
          <div className="form-panel"><div className="form-panel-heading"><span>AANVRAAG / 01</span><p>Velden met * zijn verplicht</p></div><LeadForm /></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><a className="brand brand-light" href="#top"><span className="brand-mark">P</span><span>{siteConfig.name}</span></a><p>Slimme software die terugkerend handwerk uit je bedrijf haalt.</p></div>
        <div className="footer-column"><span>CONTACT</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a></div>
        <div className="footer-column"><span>NAVIGATIE</span><a href="#mogelijkheden">Mogelijkheden</a><a href="#werkwijze">Werkwijze</a><a href="#veelgestelde-vragen">Veelgestelde vragen</a></div>
        <div className="footer-column"><span>JURIDISCH</span><a href="/privacy">Privacybeleid</a><p>KvK: {siteConfig.chamberOfCommerce}</p></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span><span>Werknaam — gegevens vóór publicatie controleren</span></div>
      </footer>
      <TrackedLink className="mobile-sticky-cta" href="#scan" event="cta_click" location="mobile_sticky">Plan gratis scan <span aria-hidden="true">↗</span></TrackedLink>
    </>
  );
}
