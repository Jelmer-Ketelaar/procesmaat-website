import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-24");

  return [
    { url: siteConfig.siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/diensten`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/procesautomatisering`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/maatwerksoftware`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/systeemkoppelingen`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
