import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteConfig.isIndexable
      ? { userAgent: "*", allow: "/", disallow: ["/api/", "/_sites-preview/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
