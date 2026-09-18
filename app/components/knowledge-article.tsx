import Link from "next/link";
import { JsonLd } from "@/app/components/json-ld";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { knowledgeList, type KnowledgeArticle } from "@/lib/knowledge";
import {
  articleSchema,
  breadcrumbSchema,
  graphSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/structured-data";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Amsterdam",
  }).format(new Date(`${value}T12:00:00+02:00`));
}

export function KnowledgeArticlePage({ article }: { article: KnowledgeArticle }) {
  const path = `/kennisbank/${article.slug}`;
  const related = knowledgeList.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={graphSchema([
        organizationSchema(),
        websiteSchema(),
        webPageSchema(path, article.metaTitle, article.metaDescription),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Kennisbank", path: "/kennisbank" },
          { name: article.title, path },
        ]),
        articleSchema(article),
      ])} />
      <SiteHeader />
      <main id="main-content" className="knowledge-page">
        <div className="knowledge-shell">
          <nav className="breadcrumbs" aria-label="Broodkruimelpad">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/kennisbank">Kennisbank</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{article.title}</span>
          </nav>

          <header className="knowledge-hero">
            <p className="eyebrow"><span /> Praktische kennis voor mkb-teams</p>
            <h1>{article.title}</h1>
            <p className="knowledge-intro">{article.intro}</p>
            <div className="knowledge-meta" aria-label="Artikelinformatie">
              <span>Bijgewerkt {formatDate(article.updatedAt)}</span>
              <span>{article.readingTime} leestijd</span>
              <span>Redactie: ProcesMaat</span>
            </div>
          </header>

          <div className="knowledge-layout">
            <aside className="knowledge-aside">
              <nav aria-label="Inhoudsopgave">
                <span>OP DEZE PAGINA</span>
                {article.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
              </nav>
              <Link className="button" href="/#scan">Ontvang gratis digitaal advies <span aria-hidden="true">↗</span></Link>
            </aside>

            <article className="knowledge-content">
              {article.sections.map((section, sectionIndex) => (
                <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
                  <span className="knowledge-number">{String(sectionIndex + 1).padStart(2, "0")}</span>
                  <h2 id={`${section.id}-title`}>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

                  {section.bullets && (
                    <div className="knowledge-card-list">
                      {section.bullets.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}
                    </div>
                  )}

                  {section.steps && (
                    <ol className="knowledge-steps">
                      {section.steps.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}
                    </ol>
                  )}

                  {section.table && (
                    // A keyboard-focusable scroll region keeps wide comparison tables usable at high zoom.
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    <div className="knowledge-table-wrap" role="region" aria-label={section.table.caption} tabIndex={0}>
                      <table>
                        <caption>{section.table.caption}</caption>
                        <thead><tr>{section.table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join("|")}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${index}-${cell}`}>{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.note && <aside className="knowledge-note"><h3>{section.note.title}</h3><p>{section.note.text}</p></aside>}
                </section>
              ))}

              <section className="knowledge-next" aria-labelledby="knowledge-next-title">
                <p className="eyebrow light"><span /> Van uitleg naar jouw proces</p>
                <h2 id="knowledge-next-title">Begin bij één concrete werkwijze.</h2>
                <p>Gebruik het digitale advies om een terugkerend proces, de uitzonderingen en een passende eerste stap te onderzoeken. We benoemen het ook als een standaardfunctie of eenvoudiger aanpassing waarschijnlijk beter past.</p>
                <div>
                  <Link className="button button-lime" href="/#scan">Ontvang gratis digitaal advies <span aria-hidden="true">↗</span></Link>
                  <Link className="knowledge-service-link" href={article.primaryService}>{article.primaryServiceLabel} <span aria-hidden="true">→</span></Link>
                </div>
              </section>
            </article>
          </div>

          <section className="knowledge-related section-rule" aria-labelledby="knowledge-related-title">
            <div className="section-label"><span>+</span><p>Verder lezen</p></div>
            <div>
              <h2 id="knowledge-related-title">Verdiep je volgende keuze</h2>
              <div className="knowledge-related-grid">
                {related.map((item) => (
                  <article key={item.slug}>
                    <span>{item.readingTime}</span>
                    <h3><Link href={`/kennisbank/${item.slug}`}>{item.title}</Link></h3>
                    <p>{item.metaDescription}</p>
                    <Link href={`/kennisbank/${item.slug}`} aria-label={`Lees ${item.title}`}>Lees artikel <i aria-hidden="true">↗</i></Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
