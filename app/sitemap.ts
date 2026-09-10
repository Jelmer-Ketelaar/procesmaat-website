import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { serviceList } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  // Editorial dates: only advance when the page content actually changes.
  const updated = "2026-09-08";
  return [
    { url: siteConfig.siteUrl, lastModified: updated },
    { url: `${siteConfig.siteUrl}/diensten`, lastModified: updated },
    ...serviceList.map((service) => ({
      url: `${siteConfig.siteUrl}/${service.slug}`,
      lastModified: service.slug.startsWith("ai-") ? updated : "2026-08-24",
    })),
  ];
}
