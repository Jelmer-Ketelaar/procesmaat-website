import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const title = "ProcesMaat — Slimme software voor minder handwerk";
const description = "Maatwerksoftware en systeemkoppelingen voor Nederlandse mkb-teams. Vraag een gratis automatiseringsscan van 30 minuten aan en onderzoek eerst wat zinvol is.";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f3f0e8" };

const socialImage = new URL("/og.png", siteConfig.siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title,
  description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.png?v=2", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.png?v=2",
    apple: [{ url: "/favicon.png?v=2", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: socialImage, width: 1200, height: 629, alt: "ProcesMaat — Handwerk eruit. Grip terug." }],
  },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  robots: { index: siteConfig.isIndexable, follow: siteConfig.isIndexable },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body><a className="skip-link" href="#main-content">Ga naar de hoofdinhoud</a>{children}</body>
    </html>
  );
}
