import type { Metadata } from "next";
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
}: {
  title: string;
  description: string;
  path: string;
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
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
  };
}

export function serviceMetadata(service: ServicePageContent): Metadata {
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
  });
}
