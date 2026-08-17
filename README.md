# ProcesMaat website

Nederlandstalige conversielandingspagina voor maatwerksoftware en automatisering voor het mkb. De site bevat een complete one-page funnel, een privacy-pagina en een gevalideerd leadformulier dat aanvragen serverzijdig doorstuurt naar een configureerbare webhook.

## Starten

Vereist Node.js `>=22.13.0`.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open daarna `http://localhost:3000`.

## Leadformulier instellen

Vul in `.env.local` een serverzijdige webhookbestemming in:

```env
LEAD_WEBHOOK_URL=https://jouw-automatisering.example/webhook/procesmaat
```

De webhook ontvangt alleen aanvragen die zowel aan de clientzijde als serverzijde zijn gevalideerd. De website toont pas een successtatus wanneer de webhook een succesvolle HTTP-status (`2xx`) terugstuurt. Zonder `LEAD_WEBHOOK_URL` geeft de website bewust een configuratiemelding en wordt niets als opgeslagen voorgesteld.

Verwachte JSON-velden: `name`, `companyName`, `email`, `phone`, `companySize`, `processDescription`, `hoursPerWeek`, `privacy`, `source` en `submittedAt`.

## Gegevens aanpassen vóór publicatie

Alle bedrijfsgegevens staan in [`lib/site-config.ts`](./lib/site-config.ts):

- werknaam en juridische bedrijfsnaam;
- e-mailadres en telefoonnummer;
- adres en KvK-nummer;
- losse afspraak-URL;
- publieke site-URL;
- sociale links;
- privacy-bewaartermijn en subverwerkers.

Algemene marketinginhoud en herhaalbare secties staan in [`lib/content.ts`](./lib/content.ts). Controleer vóór publicatie ook de volledige privacytekst en vervang alle waarden tussen blokhaken.

## Analytics en cookies

De site laadt geen trackingsoftware en bevat geen echte tracking-ID’s. De events `cta_click`, `booking_click`, `lead_form_start`, `lead_submit` en `lead_submit_success` worden uitsluitend als interne `procesmaat:analytics` browser-events uitgestuurd. Een later toegevoegde tracker mag daar pas na geldige cookie-toestemming op aansluiten.

## Controle

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` maakt een productiebuild en controleert de belangrijkste pagina’s, de validatie van de leadendpoint en de expliciete foutstatus wanneer de webhook ontbreekt.
