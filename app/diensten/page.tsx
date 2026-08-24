import Link from "next/link";
import { JsonLd } from "@/app/components/json-ld";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { pageMetadata } from "@/lib/metadata";
import { serviceList } from "@/lib/services";
import { breadcrumbSchema, graphSchema, organizationSchema, webPageSchema, websiteSchema } from "@/lib/structured-data";

const title = "Procesautomatisering en maatwerksoftware | ProcesMaat";
const description = "Ontdek hoe ProcesMaat mkb-teams helpt met procesautomatisering, maatwerksoftware en systeemkoppelingen. Eerst het proces begrijpen, dan gericht bouwen.";

export const metadata = pageMetadata({ title, description, path: "/diensten" });

export default function DienstenPage() {
  return (
    <>
      <JsonLd data={graphSchema([
        organizationSchema(),
        websiteSchema(),
        webPageSchema("/diensten", title, description),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Diensten", path: "/diensten" }]),
      ])} />
      <SiteHeader />
      <main id="main-content" className="services-page">
        <div className="service-shell">
          <nav className="breadcrumbs" aria-label="Broodkruimelpad"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Diensten</span></nav>
          <header className="services-hero">
            <p className="eyebrow"><span /> Diensten voor het mkb</p>
            <h1>Van terugkerend handwerk naar een beheerste digitale werkwijze</h1>
            <p>ProcesMaat onderzoekt waar werk blijft liggen en kiest daarna de kleinste passende oplossing: een proces automatiseren, gerichte maatwerksoftware bouwen of bestaande systemen koppelen.</p>
          </header>
          <section className="services-overview" aria-labelledby="services-overview-title">
            <div className="section-label section-label-light"><span>01</span><p>Mogelijkheden</p></div>
            <div>
              <h2 id="services-overview-title">Techniek volgt het proces</h2>
              <p className="services-lead">De onderstaande diensten overlappen vaak. Daarom bepalen we pas na een procesanalyse welke combinatie zinvol is.</p>
              <div className="services-grid">
                {serviceList.map((service, index) => (
                  <article key={service.slug}>
                    <span>0{index + 1}</span>
                    <h3>{service.shortTitle}</h3>
                    <p>{service.metaDescription}</p>
                    <Link href={`/${service.slug}`}>Bekijk {service.shortTitle.toLowerCase()} <i aria-hidden="true">↗</i></Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="services-choice section-rule" aria-labelledby="services-choice-title">
            <div className="section-label"><span>02</span><p>Keuze</p></div>
            <div>
              <h2 id="services-choice-title">Wat is de juiste route?</h2>
              <div className="services-choice-grid">
                <article><h3>Vaste stappen blijven terugkomen</h3><p>Procesautomatisering past wanneer invoer, regels en uitvoer herkenbaar zijn en menselijke uitzonderingen benoemd kunnen worden.</p></article>
                <article><h3>Standaardsoftware past structureel niet</h3><p>Maatwerksoftware past wanneer een belangrijk proces een gerichte gebruikersomgeving of workflow nodig heeft.</p></article>
                <article><h3>Gegevens staan al in verschillende tools</h3><p>Een systeemkoppeling past wanneer bestaande software bruikbaar is, maar informatie nog handmatig wordt overgedragen.</p></article>
              </div>
            </div>
          </section>
          <section className="service-cta" aria-labelledby="services-cta-title">
            <div><p className="eyebrow light"><span /> Gratis automatiseringsscan</p><h2 id="services-cta-title">Je hoeft de oplossing nog niet te kennen.</h2><p>Begin met het proces dat tijd kost. Samen onderzoeken we welke aanpak passend is en benoemen we het ook als bouwen niet zinvol blijkt.</p></div>
            <Link className="button button-lime" href="/#scan">Vraag de gratis scan aan <span aria-hidden="true">↗</span></Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
