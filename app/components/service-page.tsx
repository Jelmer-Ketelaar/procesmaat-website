import { JsonLd } from "@/app/components/json-ld";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { serviceList, type ServicePageContent } from "@/lib/services";
import {
  breadcrumbSchema,
  faqPageSchema,
  graphSchema,
  organizationSchema,
  serviceSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/structured-data";

export function ServicePage({ service }: { service: ServicePageContent }) {
  const related = serviceList.filter((item) => item.slug !== service.slug);
  const path = `/${service.slug}`;

  return (
    <>
      <JsonLd data={graphSchema([
        organizationSchema(),
        websiteSchema(),
        webPageSchema(path, service.metaTitle, service.metaDescription),
        serviceSchema(service),
        faqPageSchema(service.faq),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Diensten", path: "/diensten" },
          { name: service.shortTitle, path },
        ]),
      ])} />
      <SiteHeader />
      <main id="main-content" className="service-page">
        <div className="service-shell">
          <nav className="breadcrumbs" aria-label="Broodkruimelpad">
            <a href="/">Home</a><span aria-hidden="true">/</span>
            <a href="/diensten">Diensten</a><span aria-hidden="true">/</span>
            <span aria-current="page">{service.shortTitle}</span>
          </nav>

          <header className="service-hero">
            <div>
              <p className="eyebrow"><span /> {service.eyebrow}</p>
              <h1>{service.title}</h1>
            </div>
            <div className="service-hero-copy">
              <p>{service.intro}</p>
              <a className="button" href="/#scan">Ontvang gratis digitaal advies <span aria-hidden="true">↗</span></a>
            </div>
          </header>

          <section className="service-fit section-rule" aria-labelledby="service-fit-title">
            <div className="section-label"><span>01</span><p>Herkenning</p></div>
            <div className="service-section-heading">
              <h2 id="service-fit-title">{service.fitTitle}</h2>
              <p>{service.fitIntro}</p>
            </div>
            <ul className="service-signal-list">
              {service.fitSignals.map((signal, index) => <li key={signal}><span>0{index + 1}</span><p>{signal}</p></li>)}
            </ul>
          </section>

          <section className="service-explanation" aria-labelledby="service-explanation-title">
            <div className="section-label section-label-light"><span>02</span><p>Aanpak</p></div>
            <div>
              <h2 id="service-explanation-title">{service.explanationTitle}</h2>
              {service.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className="service-deliverables section-rule" aria-labelledby="service-deliverables-title">
            <div className="section-label"><span>03</span><p>Resultaat</p></div>
            <div>
              <h2 id="service-deliverables-title">{service.deliverablesTitle}</h2>
              <div className="service-card-grid">
                {service.deliverables.map((item, index) => (
                  <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>
                ))}
              </div>
            </div>
          </section>

          <section className="service-examples" aria-labelledby="service-examples-title">
            <div className="section-label section-label-light"><span>04</span><p>Voorbeelden</p></div>
            <div>
              <h2 id="service-examples-title">{service.examplesTitle}</h2>
              <div className="service-example-grid">
                {service.examples.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
              </div>
            </div>
          </section>

          <section className="service-faq section-rule" aria-labelledby="service-faq-title">
            <div className="section-label"><span>05</span><p>Veelgestelde vragen</p></div>
            <div>
              <h2 id="service-faq-title">Vragen over {service.shortTitle.toLowerCase()}</h2>
              <div className="faq-list">
                {service.faq.map((faq, index) => (
                  <details key={faq.question}>
                    <summary><span>0{index + 1}</span><b>{faq.question}</b><i aria-hidden="true">+</i></summary>
                    <div><p>{faq.answer}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="service-related" aria-labelledby="related-title">
            <div>
              <p className="eyebrow light"><span /> Verder kijken</p>
              <h2 id="related-title">Ook relevant voor jouw proces</h2>
            </div>
            <div className="related-links">
              {related.map((item) => <a key={item.slug} href={`/${item.slug}`}>{item.shortTitle}<span aria-hidden="true">↗</span></a>)}
              <a href="/kennisbank">Praktische kennisbank<span aria-hidden="true">↗</span></a>
            </div>
          </section>

          <section className="service-cta" aria-labelledby="service-cta-title">
            <div>
              <p className="eyebrow light"><span /> Gratis digitaal automatiseringsadvies</p>
              <h2 id="service-cta-title">Begin met één terugkerend proces.</h2>
              <p>Beschrijf je proces, gebruikte software en het gewenste resultaat. Binnen één werkdag ontvang je een eerste advies per e-mail. Helemaal online, zonder afspraak.</p>
            </div>
            <a className="button button-lime" href="/#scan">Ontvang gratis digitaal advies <span aria-hidden="true">↗</span></a>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
