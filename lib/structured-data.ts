import type { ServicePageContent } from "@/lib/services";
import type { KnowledgeArticle } from "@/lib/knowledge";
import { siteConfig } from "@/lib/site-config";

const organizationId = `${siteConfig.siteUrl}/#organization`;
const websiteId = `${siteConfig.siteUrl}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    logo: `${siteConfig.siteUrl}/favicon.png`,
    areaServed: siteConfig.location.areaServed,
    // Alleen een adres opnemen zodra er een vestigingsplaats is geconfigureerd.
    ...(siteConfig.location.city
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.location.city,
            ...(siteConfig.location.region ? { addressRegion: siteConfig.location.region } : {}),
            addressCountry: "NL",
          },
        }
      : {}),
    ...(siteConfig.socials.linkedIn ? { sameAs: [siteConfig.socials.linkedIn] } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.siteUrl,
    name: siteConfig.name,
    inLanguage: "nl-NL",
    publisher: { "@id": organizationId },
  };
}

export function webPageSchema(path: string, name: string, description: string) {
  const url = `${siteConfig.siteUrl}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "nl-NL",
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
  };
}

export function serviceSchema(service: ServicePageContent) {
  const url = `${siteConfig.siteUrl}/${service.slug}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.shortTitle,
    description: service.metaDescription,
    url,
    areaServed: { "@type": "Country", name: "Nederland" },
    audience: { "@type": "BusinessAudience", audienceType: "Nederlandse mkb-bedrijven" },
    provider: { "@id": organizationId },
  };
}

export function articleSchema(article: KnowledgeArticle) {
  const url = `${siteConfig.siteUrl}/kennisbank/${article.slug}`;
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.metaDescription,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "nl-NL",
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
  };
}

export function itemListSchema(items: readonly { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${siteConfig.siteUrl}${item.path}`,
    })),
  };
}

export function breadcrumbSchema(items: readonly { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.path}`,
    })),
  };
}

export function graphSchema(items: Array<Record<string, unknown>>) {
  return { "@context": "https://schema.org", "@graph": items };
}
