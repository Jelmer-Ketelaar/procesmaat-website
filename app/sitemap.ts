import type { MetadataRoute } from "next";
import { knowledgeList } from "@/lib/knowledge";
import { siteConfig } from "@/lib/site-config";
import { serviceList } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-25");

  return [
    { url: siteConfig.siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/diensten`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/procesautomatisering`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/maatwerksoftware`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/systeemkoppelingen`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/kennisbank`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...knowledgeList.map((article) => ({
      url: `${siteConfig.siteUrl}/kennisbank/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
