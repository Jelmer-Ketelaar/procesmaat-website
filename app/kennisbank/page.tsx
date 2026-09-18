import Link from "next/link";
import { JsonLd } from "@/app/components/json-ld";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { knowledgeList } from "@/lib/knowledge";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  graphSchema,
  itemListSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/structured-data";

const title = "Kennisbank over procesautomatisering | ProcesMaat";
const description = "Praktische uitleg over bedrijfsprocessen automatiseren, een eerste proces kiezen, maatwerksoftware afwegen en betrouwbare API-koppelingen.";

export const metadata = pageMetadata({ title, description, path: "/kennisbank" });

export default function KennisbankPage() {
  return (
    <>
      <JsonLd data={graphSchema([
        organizationSchema(),
        websiteSchema(),
        webPageSchema("/kennisbank", title, description),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Kennisbank", path: "/kennisbank" }]),
        itemListSchema(knowledgeList.map((article) => ({ name: article.title, path: `/kennisbank/${article.slug}` }))),
      ])} />
      <SiteHeader />
      <main id="main-content" className="knowledge-index">
        <div className="knowledge-shell">
          <nav className="breadcrumbs" aria-label="Broodkruimelpad"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Kennisbank</span></nav>
          <header className="knowledge-index-hero">
            <p className="eyebrow"><span /> Kennisbank</p>
            <h1>Praktische keuzes vóór je automatiseert</h1>
            <p>Geen generieke lijst met tools, maar concrete uitleg over processen, uitzonderingen, softwarekeuzes, koppelingen en meetbaar resultaat voor Nederlandse mkb-teams.</p>
          </header>

          <section className="knowledge-index-list" aria-labelledby="articles-title">
            <div className="section-label section-label-light"><span>01</span><p>Artikelen</p></div>
            <div>
              <h2 id="articles-title">Begin bij je huidige werkwijze</h2>
              <div className="knowledge-index-grid">
                {knowledgeList.map((article, index) => (
                  <article key={article.slug}>
                    <span>0{index + 1} / {article.readingTime}</span>
                    <h3><Link href={`/kennisbank/${article.slug}`}>{article.title}</Link></h3>
                    <p>{article.metaDescription}</p>
                    <div><Link href={`/kennisbank/${article.slug}`}>Lees artikel <i aria-hidden="true">↗</i></Link><Link href={article.primaryService}>{article.primaryServiceLabel}</Link></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="service-cta" aria-labelledby="knowledge-cta-title">
            <div><p className="eyebrow light"><span /> Gratis digitaal automatiseringsadvies</p><h2 id="knowledge-cta-title">Leg één terugkerend proces op tafel.</h2><p>Beschrijf je proces in het formulier. Binnen één werkdag ontvang je een eerste advies per e-mail over vereenvoudigen, koppelen of maatwerk. Een afspraak is niet nodig.</p></div>
            <Link className="button button-lime" href="/#scan">Ontvang gratis digitaal advies <span aria-hidden="true">↗</span></Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

