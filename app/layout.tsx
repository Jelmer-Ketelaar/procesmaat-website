import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const title = "ProcesMaat — Slimme software voor minder handwerk";
const description = "We bouwen software, koppelingen en automatiseringen op maat voor Nederlandse mkb-bedrijven. Plan een gratis automatiseringsscan van 30 minuten.";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f3f0e8" };

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const requestOrigin = host ? `${protocol}://${host}` : siteConfig.siteUrl;
  const socialImage = new URL("/og.png", requestOrigin).toString();

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    applicationName: siteConfig.name,
    alternates: { canonical: "/" },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      url: "/",
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: socialImage, width: 1734, height: 908, alt: "ProcesMaat — Handwerk eruit. Grip terug." }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
