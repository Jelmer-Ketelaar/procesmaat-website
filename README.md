# ProcesMaat website

Nederlandstalige B2B-landingspagina voor maatwerksoftware, systeemkoppelingen, dashboards en automatisering. De primaire conversie is een aanvraag voor een gratis automatiseringsscan van 30 minuten; de agenda is een afzonderlijke secundaire route.

## Lokaal starten

Vereist Node.js `>=22.13.0`.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Lokale ontwikkeling mag bewust met de veilige placeholders uit `lib/site-config.ts` draaien. Niet-productieomgevingen zijn standaard niet indexeerbaar en tonen een launchwaarschuwing in de footer.

## Verplichte productieconfiguratie

De publieke configuratie blijft centraal in [`lib/site-config.ts`](./lib/site-config.ts) en wordt via omgevingsvariabelen gevuld. Een gewone `npm run build` stopt wanneer een launchblokkade aanwezig is. Vul vóór een publieke build minimaal in:

- `NEXT_PUBLIC_DEPLOYMENT_ENV=production` en `APP_ENV=production`;
- `NEXT_PUBLIC_SITE_URL`: publieke HTTPS-origin zonder extra pad;
- `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_SITE_ADDRESS` en `NEXT_PUBLIC_CHAMBER_OF_COMMERCE`;
- `NEXT_PUBLIC_SITE_EMAIL` en een echt `NEXT_PUBLIC_SITE_PHONE`;
- `NEXT_PUBLIC_RETENTION_PERIOD` en gecontroleerde `NEXT_PUBLIC_SUBPROCESSORS`-tekst;
- `NEXT_PUBLIC_LEGAL_REVIEW_COMPLETED=true`, uitsluitend na professionele juridische controle;
- `LEAD_WEBHOOK_URL` en, behalve bij een Formspree-endpoint, het serversecret `LEAD_WEBHOOK_SECRET` van minimaal 32 tekens;
- `CLOUDFLARE_RATE_LIMITING_CONFIGURED=true`, uitsluitend nadat de hieronder beschreven productieregel actief is.

De optionele velden `NEXT_PUBLIC_BUILDER_NAME`, `NEXT_PUBLIC_BUILDER_ROLE` en `NEXT_PUBLIC_BUILDER_BIO` worden alleen getoond wanneer ze alle drie zijn ingevuld. Verzin hiervoor geen bio. Beheer serversecrets in de Sites-/Cloudflare-omgeving en commit ze nooit.

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
```

`npm test` gebruikt expliciete testconfiguratie, maakt een deploymentbuild en test pagina’s, metadata, headers, launchchecks en de leadendpoint met gestubde webhooks. Een echte `npm run build` hoort zonder alle productievariabelen te mislukken; dat is de bedoelde launchbeveiliging.
