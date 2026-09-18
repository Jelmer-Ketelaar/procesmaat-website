import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Pagina niet gevonden | ProcesMaat",
  description: "Deze pagina bestaat niet of is verplaatst. Ga terug naar ProcesMaat of bekijk de kennisbank en diensten.",
  alternates: {},
  openGraph: { images: [] },
  twitter: { images: [] },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="not-found-page">
        <div>
          <p className="eyebrow"><span /> Foutcode 404</p>
          <h1>Deze pagina is niet gevonden.</h1>
          <p>De link kan verouderd zijn of de pagina is verplaatst. Kies een veilige route terug naar de informatie die je zoekt.</p>
          <div>
            <Link className="button" href="/">Naar de homepage <span aria-hidden="true">→</span></Link>
            <Link className="text-link" href="/kennisbank">Bekijk de kennisbank <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

