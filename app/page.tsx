import Link from "next/link";
import { AutomationDemo } from "@/app/components/automation-demo";
import { JsonLd } from "@/app/components/json-ld";
import { QuickScan } from "@/app/components/quick-scan";
import { LeadForm } from "@/app/components/lead-form";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { TrackedLink } from "@/app/components/tracked-link";
import { automationExamples, homeSeo, faqs, problemItems, processSteps } from "@/lib/content";
import { knowledgeList } from "@/lib/knowledge";
import { siteConfig } from "@/lib/site-config";
import { graphSchema, organizationSchema, webPageSchema, websiteSchema } from "@/lib/structured-data";



export default function Home() {
  return (
    <>
      <JsonLd data={graphSchema([
        organizationSchema(),
        websiteSchema(),
        webPageSchema("/", homeSeo.title, homeSeo.description),
      ])} />
      <SiteHeader />
      <main id="main-content">
        <section className="hero hero-ai" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span /> AI-automatisering voor het mkb</p>
            <h1>Laat je bedrijf<br /><em>vooruitwerken.</em></h1>
            <p className="hero-intro">Van een volle inbox naar opgevolgde aanvragen. Van losse documenten naar bruikbare gegevens. Wij bouwen AI-automatisering en software die het werk ertussen overneemt. Jij houdt de regie.</p>
            <div className="hero-actions">
              <TrackedLink className="button" href="#scan" event="cta_click" location="hero">Ontvang gratis digitaal advies <span aria-hidden="true">&#8599;</span></TrackedLink>
              <a className="text-link" href="#quickscan">Doe de korte zelftest <span aria-hidden="true">&#8595;</span></a>
            </div>
            <p className="reassurance">Binnen één werkdag <i /> Gratis en vrijblijvend <i /> Per e-mail</p>
          </div>

          <AutomationDemo />

        </section>

        <nav className="expertise-strip" aria-label="Onze expertise"><span>VAN IDEE NAAR DAGELIJKS GEBRUIK</span><Link href="/ai-automatisering">AI-automatisering</Link><Link href="/ai-agents">AI-agents</Link><Link href="/systeemkoppelingen">Systeemkoppelingen</Link><Link href="/maatwerksoftware">Maatwerksoftware</Link></nav>

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
            <h2 id="examples-title">AI en automatisering <em>voor het mkb.</em></h2>
            <p>Dit zijn voorbeelden van processen die vaak geschikt zijn voor automatisering — geen klantcases of kant-en-klare pakketten. Wat zinvol is, hangt af van jouw proces.</p>
          </div>
          <div className="examples-grid">
            {automationExamples.map((example) => (
              <article className="example-item" key={example.number}>
                <div className="example-meta"><span>{example.number}</span><i>{example.tag}</i></div>
                <h3><Link href={example.href}>{example.title}</Link></h3><p>{example.text}</p>
                <Link className="example-link" href={example.href} aria-label={`Lees meer over ${example.title.toLowerCase()}`}>Lees meer <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="integration-section section-rule" aria-labelledby="integration-title">
          <div>
            <p className="eyebrow"><span /> Werk verder met je eigen software</p>
            <h2 id="integration-title">Je tools zijn er al.<br /><em>Nu de verbinding nog.</em></h2>
            <p>Staat dezelfde informatie in je webshop, CRM én boekhouding? We onderzoeken hoe gegevens tussen die systemen kunnen doorstromen, met controles op ontbrekende of dubbele invoer.</p>
          </div>
          <div>
            <div className="integration-flow" aria-label="Voorbeeld: gegevens van webshop via CRM naar boekhouding">
              <span>Webshop<small>Bestelling</small></span><b aria-hidden="true">→</b><span>CRM<small>Klantgegevens</small></span><b aria-hidden="true">→</b><span>Boekhouding<small>Factuur</small></span>
            </div>
            <p className="integration-note">Gebruik je bijvoorbeeld WooCommerce, HubSpot, Exact Online, Moneybird of AFAS? Vertel ons welke pakketten je gebruikt. We controleren per pakket en abonnement welke koppelmogelijkheden beschikbaar zijn.</p>
            <Link className="text-link" href="/crm-boekhouding-koppelen">CRM en boekhouding koppelen <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="transformation-section section-rule" aria-labelledby="transformation-title">
          <div className="section-label"><span>03</span><p>Voor & na</p></div>
          <div className="transformation-heading"><p className="eyebrow"><span /> Eén proces, anders ingericht</p><h2 id="transformation-title">Handwerk eruit.<br /><em>Grip terug.</em></h2></div>
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

        <section className="scenario-section" aria-labelledby="scenario-title">
          <div>
            <p className="eyebrow"><span /> Uitgewerkt voorbeeld · geen klantcase</p>
            <h2 id="scenario-title">Een bestelling.<br /><em>Eén keer invoeren.</em></h2>
            <p>Stel: na iedere webshopbestelling neemt iemand klantgegevens en orderregels over in de administratie. Een correctie betekent opnieuw zoeken en aanpassen.</p>
          </div>
          <ol className="scenario-steps">
            <li><span>01</span><div><h3>Bestelling ontvangen</h3><p>De koppeling haalt de benodigde ordergegevens op uit de webshop.</p></div></li>
            <li><span>02</span><div><h3>Controleren vóór verwerken</h3><p>Ontbrekende gegevens of een dubbele bestelling gaan naar een medewerker. Alleen geldige gegevens gaan door.</p></div></li>
            <li><span>03</span><div><h3>Klaarzetten in de boekhouding</h3><p>De status blijft zichtbaar. Je team ziet wat verwerkt is en wat nog aandacht vraagt.</p></div></li>
          </ol>
          <p className="scenario-measure">Wat je vervolgens meet: tijd per bestelling, aantal correcties en openstaande uitzonderingen. Zo toets je of de oplossing in de praktijk iets oplevert.</p>
        </section>

        <section className="pricing-section section-rule" id="investering" aria-labelledby="pricing-title">
          <div className="pricing-intro">
            <p className="eyebrow"><span /> Duidelijkheid vóór de bouw</p>
            <h2 id="pricing-title">Hoe we jouw <em>investering bepalen.</em></h2>
            <p>Je eerste digitale advies is gratis. Na afbakening van je aanvraag ontvang je een voorstel met een vaste projectprijs, exclusief btw. Je ziet wat we bouwen, wat inbegrepen is en welke kosten terugkeren.</p>
            <a className="text-link" href="#scan">Leg je proces aan ons voor <span aria-hidden="true">↗</span></a>
          </div>
          <div className="pricing-factors">
            <article><span>01</span><h3>Systemen en datastromen</h3><p>Een rechtstreekse koppeling tussen twee pakketten vraagt iets anders dan een keten van applicaties met gegevensverkeer in beide richtingen.</p></article>
            <article><span>02</span><h3>Toegang tot je software</h3><p>Beschikbare API’s, webhooks en exportmogelijkheden bepalen hoeveel maatwerk nodig is. We controleren ook beperkingen van je abonnement.</p></article>
            <article><span>03</span><h3>Logica en AI</h3><p>Vaste beslisregels of interpretatie van vrije tekst en documenten: de gekozen aanpak, volumes en benodigde controles bepalen de omvang.</p></article>
            <article><span>04</span><h3>Uitzonderingen en validatie</h3><p>We bepalen welke afwijkingen automatisch afgehandeld kunnen worden en waar je team een voorstel moet controleren of goedkeuren.</p></article>
          </div>
          <p className="pricing-note"><strong>Ook de terugkerende kosten zijn vooraf duidelijk.</strong> Hosting, modelgebruik, onderhoud en monitoring benoemen we apart in het voorstel. Aanvullend werk voeren we pas uit na een nieuwe afspraak. Je betaalt pas voor uitvoering nadat je akkoord hebt gegeven.</p>
        </section>

        <QuickScan />

        <section className="process-section" id="werkwijze" aria-labelledby="process-title">
          <div className="section-label section-label-light"><span>04</span><p>Werkwijze</p></div>
          <div className="process-heading"><h2 id="process-title">Eerst begrijpen.<br /><em>Dan pas bouwen.</em></h2><p>Automatisering werkt pas goed als de uitzonderingen net zo duidelijk zijn als de standaardroute.</p></div>
          <ol className="process-list">{processSteps.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
        </section>

        <section className="fit-section section-rule" aria-labelledby="fit-title">
          <div className="section-label"><span>05</span><p>Past dit?</p></div>
          <div className="fit-heading"><h2 id="fit-title">Een goede automatisering begint bij een <em>echt proces.</em></h2><p>De digitaal advies is bedoeld om snel en eerlijk te bepalen of bouwen de moeite waard kan zijn.</p></div>
          <div className="fit-grid">
            <article className="fit-yes"><span className="fit-status">DIT PAST WAARSCHIJNLIJK</span><h3>Je herkent dit:</h3><ul><li><i>✓</i><span>Hetzelfde proces komt wekelijks of dagelijks terug.</span></li><li><i>✓</i><span>Meerdere collega’s of systemen zijn erbij betrokken.</span></li><li><i>✓</i><span>Je wilt tijd besparen én meer controle houden.</span></li><li><i>✓</i><span>Er is iemand die het huidige proces goed kent.</span></li></ul></article>
            <article className="fit-no"><span className="fit-status">DIT PAST WAARSCHIJNLIJK NIET</span><h3>Je zoekt vooral:</h3><ul><li><i>×</i><span>Een los softwareproject zonder terugkerend bedrijfsproces.</span></li><li><i>×</i><span>Een kant-en-klare app zonder procesonderzoek.</span></li><li><i>×</i><span>Een één-klik-AI-oplossing zonder menselijke controle.</span></li><li><i>×</i><span>Automatisering voor een eenmalige taak.</span></li></ul></article>
          </div>
        </section>

        <section className="credibility-section" aria-labelledby="credibility-title">
          <div className="credibility-copy"><p className="eyebrow light"><span /> Persoonlijk advies, helemaal online</p><h2 id="credibility-title">Van jouw aanvraag<br /><em>naar een helder plan.</em></h2><p>Je hoeft je vraag niet technisch uit te leggen. Beschrijf waar je werk vastloopt. Je krijgt een reactie van degene die de oplossing bouwt, met gerichte vervolgstappen per e-mail.</p></div>
          <div className="credibility-grid">
            <div><span>01</span><h3>Direct contact</h3><p>Je mailt tijdens analyse, bouw en oplevering rechtstreeks met degene die de oplossing bouwt.</p></div>
            <div><span>02</span><h3>Techniek met een reden</h3><p>Van vaste softwarelogica tot API-koppeling of AI: we kiezen wat aantoonbaar bij de taak past.</p></div>
            <div><span>03</span><h3>Controle op uitzonderingen</h3><p>Niet alles hoeft automatisch. Onzekere of afwijkende situaties kunnen bewust bij een medewerker terechtkomen.</p></div>
            <div><span>04</span><h3>Stapsgewijs opleveren</h3><p>Een vroeg prototype maakt aannames zichtbaar voordat een groter deel van het proces wordt gebouwd.</p></div>
          </div>
          {siteConfig.builder.name && siteConfig.builder.role && siteConfig.builder.bio && (
            <aside className="builder-profile" aria-label="Over de bouwer">
              <span>DE BOUWER</span>
              <h3>{siteConfig.builder.name}</h3>
              <p><strong>{siteConfig.builder.role}</strong> — {siteConfig.builder.bio}</p>
            </aside>
          )}
        </section>

        <section className="home-knowledge section-rule" aria-labelledby="home-knowledge-title">
          <div className="section-label"><span>06</span><p>Kennisbank</p></div>
          <div>
            <div className="home-knowledge-heading">
              <h2 id="home-knowledge-title">Eerst scherp kiezen.<br /><em>Dan pas bouwen.</em></h2>
              <p>Praktische uitleg voor teams die minder handwerk willen, maar eerst willen begrijpen welke route betrouwbaar en beheersbaar is.</p>
            </div>
            <div className="home-knowledge-grid">
              {knowledgeList.slice(0, 3).map((article) => (
                <article key={article.slug}>
                  <span>{article.readingTime}</span>
                  <h3><Link href={`/kennisbank/${article.slug}`}>{article.title}</Link></h3>
                  <p>{article.metaDescription}</p>
                  <Link href={`/kennisbank/${article.slug}`}>Lees artikel <i aria-hidden="true">↗</i></Link>
                </article>
              ))}
            </div>
            <Link className="home-knowledge-all" href="/kennisbank">Bekijk de volledige kennisbank <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="faq-section section-rule" id="veelgestelde-vragen" aria-labelledby="faq-title">
          <div className="section-label"><span>07</span><p>Veelgestelde vragen</p></div>
          <div className="faq-heading"><h2 id="faq-title">Eerst weten<br />waar je aan toe bent.</h2><p>Staat je vraag er niet tussen? Stuur je vraag mee met je digitale aanvraag.</p></div>
          <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span><b>{faq.question}</b><i aria-hidden="true">+</i></summary><div><p>{faq.answer}</p></div></details>)}</div>
        </section>

        <section className="scan-section" id="scan" aria-labelledby="scan-title">
          <div className="scan-intro">
            <p className="eyebrow light"><span /> Digitale quick-scan · gratis en vrijblijvend</p>
            <h2 id="scan-title">Jouw proces.<br />Ons advies in je inbox.</h2>
            <p>Ontvang binnen één werkdag een eerste digitaal automatiseringsadvies. Vertel welke software je gebruikt, wat nu tijd kost en welk resultaat je wilt bereiken.</p>
            <ol className="scan-steps">
              <li><span>1</span><div><strong>Vul je proces online in</strong><p>Beschrijf de huidige stappen, de aantallen en de gewenste uitkomst. Technische kennis is niet nodig.</p></div></li>
              <li><span>2</span><div><strong>Ontvang advies binnen één werkdag</strong><p>We beoordelen je aanvraag en mailen een eerste richting. Zijn er nog vragen? Die stellen we per e-mail.</p></div></li>
              <li><span>3</span><div><strong>Beslis op basis van een duidelijk voorstel</strong><p>Na afbakening ontvang je de aanpak en een vaste projectprijs exclusief btw. Bouw start pas na jouw akkoord.</p></div></li>
            </ol>
            <div className="booking-alternative"><span>Helemaal online: geen videoafspraak, telefoongesprek of live scan. Het eerste advies is gratis en je zit nergens aan vast.</span></div>
          </div>
          <div className="form-panel"><div className="form-panel-heading"><span>BEGIN BIJ JOUW PROCES</span><p>* verplicht</p></div><LeadForm /></div>
        </section>
      </main>

      <SiteFooter />
      <TrackedLink className="mobile-sticky-cta" href="#scan" event="cta_click" location="mobile_sticky">Ontvang gratis digitaal advies <span aria-hidden="true">↗</span></TrackedLink>
    </>
  );
}
