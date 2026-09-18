import type { Metadata } from "next";
import type { KnowledgeArticle } from "@/lib/knowledge";
import type { ServicePageContent } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

const socialImage = {
  url: "/og.png",
  width: 1200,
  height: 629,
  alt: "ProcesMaat — Handwerk eruit. Grip terug.",
};

export function pageMetadata({
  title,
  description,
  path,
  socialPreview = true,
}: {
  title: string;
  description: string;
  path: string;
  socialPreview?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: siteConfig.name,
      title,
      description,
      url: path,
      images: socialPreview ? [socialImage] : [],
    },
    twitter: { card: "summary_large_image", title, description, images: socialPreview ? [socialImage.url] : [] },
  };
}

export function serviceMetadata(service: ServicePageContent): Metadata {
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
    socialPreview: false,
  });
}

export function knowledgeMetadata(article: KnowledgeArticle): Metadata {
  const path = `/kennisbank/${article.slug}`;
  const metadata = pageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path,
    socialPreview: false,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [],
    },
  };
}
