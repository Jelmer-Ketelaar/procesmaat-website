import type { ServicePageContent } from "@/lib/services";
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

export function faqSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
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
