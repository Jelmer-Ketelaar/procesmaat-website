# ProcesMaat website

Nederlandstalige B2B-website voor maatwerksoftware, systeemkoppelingen, dashboards en automatisering. De primaire conversie is een aanvraag voor een gratis automatiseringsscan van 30 minuten.

## Lokaal starten

Vereist Node.js `>=22.13.0`.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Lokale ontwikkeling draait met de standaardwaarden uit `lib/site-config.ts`. Alleen een omgeving die expliciet op `test` of `development` staat is niet indexeerbaar; standaard gedraagt een build zich als productie.

## Productieconfiguratie

De publieke configuratie staat centraal in [`lib/site-config.ts`](./lib/site-config.ts) en wordt via omgevingsvariabelen gevuld. `npm run build` blijft beschikbaar voor CI en previews. `npm run build:production` voert eerst de expliciete productie-readinesscontrole uit. Zet daarvoor:

- `NEXT_PUBLIC_DEPLOYMENT_ENV=production` en `APP_ENV=production`;
- `NEXT_PUBLIC_SITE_URL`: publieke HTTPS-origin zonder extra pad;
- `NEXT_PUBLIC_SITE_EMAIL`, `NEXT_PUBLIC_RETENTION_PERIOD` en `NEXT_PUBLIC_SUBPROCESSORS`: gecontroleerde publieke gegevens;
- `NEXT_PUBLIC_LEGAL_REVIEW_COMPLETED=true` na professionele controle van het privacybeleid;
- `CLOUDFLARE_RATE_LIMITING_CONFIGURED=true` nadat de edge-regel werkelijk actief is;
- `LEAD_WEBHOOK_URL`: bestemming voor gevalideerde aanvragen.

`NEXT_PUBLIC_LEGAL_REVIEW_COMPLETED=true` verbergt de controlewaarschuwing op de privacypagina; zet die uitsluitend na een professionele juridische controle.

De site toont geen juridische bedrijfsnaam, vestigingsadres, KvK-nummer of telefoonnummer. Die velden bestaan niet meer in de configuratie.

De optionele velden `NEXT_PUBLIC_BUILDER_NAME`, `NEXT_PUBLIC_BUILDER_ROLE` en `NEXT_PUBLIC_BUILDER_BIO` worden alleen getoond wanneer ze alle drie zijn ingevuld. Verzin hiervoor geen bio.

## Leadontvangst

De browser toont alleen succes wanneer `/api/leads` `{ "accepted": true }` teruggeeft. De eigen endpoint doet dat pas nadat de webhook een geldige `2xx`-status heeft teruggegeven.

De webhook ontvangt JSON met:

- `submissionId`, `name`, `companyName`, `email`, `phone`;
- `companySize`, `processDescription`, `hoursPerWeek`;
- een `attribution`-object met uitsluitend `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` en `landing_path`;
- `source` en `submittedAt`.

Het honeypotveld wordt nooit meegestuurd. De webhookaanroep bevat:

- `Authorization: Bearer <LEAD_WEBHOOK_SECRET>`;
- `Idempotency-Key: <submissionId>`.

### Formspree als ontvanger

Leadaflevering loopt bewust server-side via de Worker, ook met Formspree: de zod-validatie, honeypotcontrole, origincontrole en Cloudflare rate limiting blijven daardoor van kracht en de CSP hoeft geen externe `connect-src` toe te staan. Zet daarvoor:

```
LEAD_WEBHOOK_URL=https://formspree.io/f/xjybpozg
```

Voor een `formspree.io`-endpoint geldt:

- `LEAD_WEBHOOK_SECRET` is niet nodig en wordt niet meegestuurd; Formspree authenticeert op de endpoint-URL zelf. Behandel die URL daarom als een niet-publieke waarde.
- De aanvraag gaat met `Accept: application/json`, zodat Formspree JSON antwoordt in plaats van een browserredirect.
- De `attribution`-velden worden platgeslagen naar `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` en `landing_path`, omdat Formspree platte sleutel/waardeparen opslaat en mailt. Er wordt geen extra persoonsgegeven toegevoegd; alleen een `_subject` met de bedrijfsnaam.
- `Idempotency-Key` gaat wel mee, maar Formspree ontdubbelt niet. Dubbele inzendingen komen dus als twee submissions binnen; controleer dat handmatig of gebruik een eigen webhook wanneer ontdubbeling vereist is.
- Controleer in Formspree of het ontvangende e-mailadres is bevestigd; anders blijft de submission staan zonder notificatie.

De browser ziet nog steeds alleen succes wanneer `/api/leads` `{ "accepted": true }` teruggeeft, dus een mislukte Formspree-aanroep levert een `502` en geen valse bevestiging op.

De ontvangende automatisering moet `Idempotency-Key` bewaren en een dubbele verwerking met dezelfde waarde weigeren of als dezelfde inzending behandelen. De website logt geen formulierinhoud, webhook-URL’s, secrets of persoonsgegevens. Productiebezoekers krijgen bij configuratiefouten geen interne variabelenamen te zien.

## Verplichte Cloudflare-rate limiting

De huidige OpenAI Sites-hostingconfiguratie biedt in `.openai/hosting.json` geen declareerbare rate-limitbinding. Daarom is bewust geen onbetrouwbare in-memory limiter toegevoegd. Configureer vóór de publieke build in Cloudflare **Security → WAF → Rate limiting rules**:

1. Match: `http.request.uri.path eq "/api/leads" and http.request.method eq "POST"`.
2. Tel per bron-IP (voor deze anonieme formulierroute is geen stabiel accountkenmerk beschikbaar).
3. Start met maximaal 10 verzoeken per 60 seconden en blokkeer daarna 10 minuten.
4. Monitor foutieve blokkades, vooral bij gedeelde bedrijfsnetwerken, en stel de drempel op basis van echt verkeer bij.
5. Zet pas daarna `CLOUDFLARE_RATE_LIMITING_CONFIGURED=true`.

Zie de officiële Cloudflare-documentatie voor [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) en [regelvoorbeelden](https://developers.cloudflare.com/waf/rate-limiting-rules/use-cases/).

## Privacy, analytics en attributie

Het scanformulier vraagt geen marketingtoestemming en gebruikt geen toestemmingscheckbox als voorwaarde voor een gewone aanvraag. De microcopy beschrijft verwerking om de scanvraag af te handelen en verwijst naar het privacybeleid. Laat de definitieve privacytekst vóór lancering professioneel beoordelen.

Standaard wordt geen tracker geladen en worden geen optionele cookies of lokale bezoekersprofielen geplaatst. Interne `procesmaat:analytics`-events bevatten alleen eventnaam, CTA-locatie, foutcategorie of veldnamen—nooit naam, e-mail, telefoon, bedrijfsnaam of procesomschrijving. Een later aangesloten tracker mag deze events alleen na geldige toestemming ontvangen.

Campagne-attributie wordt uitsluitend uit de huidige URL gelezen, niet opgeslagen in cookies of local storage en server-side met de aanvraag meegestuurd. `gclid`, `fbclid` en andere advertentie-identifiers worden genegeerd.

## Securityheaders

De Worker voegt aan HTML en API-responses onder meer CSP met `frame-ancestors 'none'`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` en `X-Frame-Options` toe. HSTS wordt alleen op HTTPS-productie gezet. De CSP staat voorlopig inline scripts en styles toe voor Vinext/React-hydration; verwijder die uitzonderingen pas nadat nonce-ondersteuning end-to-end is ingevoerd en getest.

## Controle

```bash
npm run lint
npm run typecheck
npm test
npm run build:test
npm run build:production
```

`npm test` gebruikt expliciete testconfiguratie, maakt een deploymentbuild en test pagina’s, metadata, headers, launchchecks en de leadendpoint met gestubde webhooks. `npm run build:production` hoort zonder alle gecontroleerde productievariabelen te mislukken; `npm run build` is bewust geschikt voor CI en previews.

## Branches en deployment

`dev` is de ontwikkelbranch en `main` bevat uitsluitend de gevalideerde productiebron. De GitHub Actions-workflow voert lint, typecheck, tests en een build uit op beide branches en op pull requests. Hij publiceert niet zelfstandig.

- De homepage geeft een breed overzicht; `/ai-automatisering` richt zich op het automatiseren van tekst- en documentprocessen, `/ai-agents` op gerichte assistenten met kennisbronnen en begrensde hulpmiddelen.
- De productiebuild gebruikt `https://procesmaatsoftware.nl`, gelijk aan de bestaande www-redirect. Iedere dienst heeft een eigen canonical, titel, beschrijving, zichtbare FAQ en Service/Breadcrumb-gegevens. De sitemap wordt uit dezelfde dienstenlijst opgebouwd; wijzig redactionele datums alleen bij echte inhoudelijke wijzigingen.
- Zie [`docs/seo-benchmark-2026-08-25.md`](./docs/seo-benchmark-2026-08-25.md) voor de zoekbenchmark, het paginamodel en het 30/60/90-dagenplan.
- De interactieve homepagevoorbeelden zijn lokale demonstraties met fictieve gegevens. Ze doen geen modelaanroepen, slaan niets op en presenteren geen gemeten klantresultaten. De eerste demonstratie is ook server-rendered leesbaar.
- Bestaande social-previewafbeeldingen, leadvalidatie, webhookaflevering en privacyvriendelijke analytics blijven behouden. Er zijn geen advertentietrackers toegevoegd.

### Na publicatie

1. Controleer in Google Search Console de domeineigenschap `procesmaatsoftware.nl` en dien `https://procesmaatsoftware.nl/sitemap.xml` in. De bestaande optionele `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` ondersteunt verificatie met een HTML-metatag voor een URL-prefixeigenschap; een domeineigenschap vereist DNS-verificatie.
2. Inspecteer de homepage en beide AI-pagina’s met URL-inspectie en controleer indexeerbaarheid, gekozen canonical en gerenderde inhoud. Dien belangrijke nieuwe URL’s zo nodig in voor indexering.
3. Beoordeel prestaties per pagina en zoekvraag: vertoningen, klikken, CTR en relevante aanvragen. Geen ranking of tijdwinst is vooraf gegarandeerd.
4. Publiceer echte praktijkcases zodra daarvoor bewijs en toestemming beschikbaar zijn. Beschrijf het oorspronkelijke probleem, de aanpak en gemeten uitkomsten inclusief beperkingen. Voeg geen verzonnen referenties of resultaten toe.
5. Meet mobiele praktijkprestaties zodra er voldoende verkeer is; een succesvolle build is geen Core Web Vitals-meting.

Bronnen: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) en [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features). Voor AI-zoekfuncties blijven de normale SEO-principes gelden; extra speciale AI-markup is niet nodig.


## Digitale adviesaanvraag

De aanvraag verloopt volledig via het formulier en e-mail. De bezoeker ontvangt binnen één werkdag een eerste advies; eventuele aanvullende vragen volgen per e-mail. Er worden geen afspraken of live scans aangeboden.

Het formulier verstuurt ook `softwareTools` (2–400 tekens), `desiredOutcome` (10–1200 tekens) en `weeklyVolume` (less-than-25, 25-100, 101-500, more-than-500 of unknown). Deze velden zijn server-side verplicht en gaan mee naar de bestaande webhook. Bedrijfsnaam is optioneel en bedrijfsgrootte wordt niet meer gevraagd. De zelftest bewaart antwoorden alleen in de pagina.

De investering wordt na afbakening aangeboden als vaste projectprijs exclusief btw. Hosting, modelgebruik, onderhoud en monitoring worden apart benoemd. De voorbeeldprocessen zijn illustraties, geen klantcases of gemeten prestaties.
