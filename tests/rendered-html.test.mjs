import assert from "node:assert/strict";
import test from "node:test";

const securityHeaderNames = [
  "content-security-policy",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
];

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

async function request(path = "/", init = {}, extraEnv = {}, origin = "http://localhost") {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`${origin}${path}`, init),
    {
      APP_ENV: "test",
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
      ...extraEnv,
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function validLead(overrides = {}) {
  return {
    submissionId: "9b9e3888-21f6-4ddf-bdec-9b3903839bf3",
    name: "Sam de Vries",
    companyName: "Voorbeeldbedrijf",
    email: "sam@voorbeeldbedrijf.nl",
    phone: "",
    companySize: "11-25",
    processDescription: "Iedere week nemen we projectgegevens handmatig over in een rapportage.",
    hoursPerWeek: "6-10",
    attribution: {
      utm_source: "linkedin",
      utm_campaign: "scan",
      landing_path: "/?utm_source=linkedin",
    },
    website: "",
    ...overrides,
  };
}

function leadRequest(payload, headers = {}) {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload),
  };
}

async function withFetchStub(stub, callback) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = stub;
  try {
    return await callback();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function assertSecurityHeaders(response) {
  for (const name of securityHeaderNames) assert.ok(response.headers.get(name), `Ontbrekende header: ${name}`);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
}

test("server-renders the complete Dutch landing page with the accessible form contract", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assertSecurityHeaders(response);
  const html = await response.text();
  assert.match(html, /<html lang="nl">/i);
  assert.match(html, /Handwerk eruit\./);
  assert.match(html, /Maatwerksoftware en koppelingen voor mkb-teams/);
  assert.match(html, /Vraag de gratis scan aan/);
  assert.match(html, /Ga naar de hoofdinhoud/);
  assert.match(html, /<input(?=[^>]*name="name")(?=[^>]*required="")[^>]*>/i);
  assert.match(html, /<input(?=[^>]*name="email")(?=[^>]*maxlength="254")[^>]*>/i);
  assert.match(html, /Weet ik nog niet/);
  assert.doesNotMatch(html, /name="privacy"|codex-preview|react-loading-skeleton/i);
});

test("home metadata uses one validated test origin and the actual social-card dimensions", async () => {
  const response = await request();
  const html = await response.text();
  assert.match(html, /rel="canonical" href="https:\/\/procesmaat\.test\/?"/i);
  assert.match(html, /property="og:url" content="https:\/\/procesmaat\.test\/?"/i);
  assert.match(html, /property="og:image" content="https:\/\/procesmaat\.test\/og\.png"/i);
  assert.match(html, /property="og:image:width" content="1200"/i);
  assert.match(html, /property="og:image:height" content="629"/i);
  assert.match(html, /name="robots" content="noindex, nofollow"/i);
  assert.match(html, /Procesautomatisering voor het mkb \| ProcesMaat/);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /"@type":"Organization"/);
  assert.doesNotMatch(html, /"@type":"FAQPage"/);
});

test("commercial service pages render unique search metadata, useful content and structured data", async () => {
  const pages = [
    ["/procesautomatisering", "Procesautomatisering voor het mkb", "Wanneer is een proces geschikt voor automatisering"],
    ["/maatwerksoftware", "Maatwerksoftware voor het mkb", "Wanneer past maatwerksoftware bij je bedrijf"],
    ["/systeemkoppelingen", "Systemen koppelen en API-koppelingen", "Wanneer helpt een systeemkoppeling"],
  ];

  for (const [path, metadataTitle, heading] of pages) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(`rel="canonical" href="https:\\/\\/procesmaat\\.test${path}`), path);
    assert.match(html, new RegExp(metadataTitle), path);
    assert.match(html, new RegExp(heading), path);
    assert.match(html, /"@type":"Service"/, path);
    assert.match(html, /"@type":"BreadcrumbList"/, path);
    assert.doesNotMatch(html, /"@type":"FAQPage"/, path);
    assert.doesNotMatch(html, /property="og:image"|name="twitter:image"/i, path);
    assert.match(html, /Vraag een gratis scan aan/, path);
  }
});

test("knowledge hub and articles render unique metadata, article schema and practical internal routes", async () => {
  const hub = await request("/kennisbank");
  assert.equal(hub.status, 200);
  const hubHtml = await hub.text();
  assert.match(hubHtml, /Kennisbank over procesautomatisering \| ProcesMaat/);
  assert.match(hubHtml, /rel="canonical" href="https:\/\/procesmaat\.test\/kennisbank"/i);
  assert.match(hubHtml, /"@type":"ItemList"/);
  assert.match(hubHtml, /href="\/kennisbank\/bedrijfsprocessen-automatiseren"/);

  const pages = [
    ["bedrijfsprocessen-automatiseren", "Bedrijfsprocessen automatiseren voor het mkb | ProcesMaat", "/procesautomatisering"],
    ["welk-proces-automatiseren", "Welk proces automatiseren? Praktische keuzehulp", "/procesautomatisering"],
    ["maatwerksoftware-of-standaardpakket", "Maatwerksoftware of standaardpakket kiezen", "/maatwerksoftware"],
    ["api-koppeling-checklist", "API-koppeling checklist voor het mkb", "/systeemkoppelingen"],
  ];

  for (const [slug, title, servicePath] of pages) {
    const path = `/kennisbank/${slug}`;
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(title), path);
    assert.ok(html.includes(`rel="canonical" href="https://procesmaat.test${path}"`), path);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, path);
    assert.match(html, /"@type":"Article"/, path);
    assert.match(html, /"@type":"BreadcrumbList"/, path);
    assert.match(html, /"datePublished":"2026-08-25"/, path);
    assert.match(html, new RegExp(`href="${servicePath}"`), path);
    assert.match(html, /href="\/#scan"/, path);
    assert.doesNotMatch(html, /property="og:image"|name="twitter:image"|"@type":"FAQPage"/i, path);
  }
});

test("services hub links every focused commercial page", async () => {
  const response = await request("/diensten");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Van terugkerend handwerk naar een beheerste digitale werkwijze/);
  assert.match(html, /href="\/procesautomatisering"/);
  assert.match(html, /href="\/maatwerksoftware"/);
  assert.match(html, /href="\/systeemkoppelingen"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("privacy has unique metadata and clears the inherited social image", async () => {
  const response = await request("/privacy");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Helder over je gegevens\./);
  assert.match(html, /Voor publicatie controleren/);
  assert.match(html, /Autoriteit Persoonsgegevens/);
  assert.match(html, /rel="canonical" href="https:\/\/procesmaat\.test\/privacy"/i);
  assert.match(html, /name="robots" content="noindex, follow"/i);
  assert.doesNotMatch(html, /property="og:image"|name="twitter:image"/i);
});

test("robots blocks test and preview builds and points to the configured sitemap", async () => {
  const response = await request("/robots.txt");
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.match(text, /Disallow: \//);
  assert.match(text, /Sitemap: https:\/\/procesmaat\.test\/sitemap\.xml/);
});

test("sitemap uses the same configured public origin", async () => {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.match(xml, /https:\/\/procesmaat\.test\/?</);
  assert.match(xml, /https:\/\/procesmaat\.test\/diensten/);
  assert.match(xml, /https:\/\/procesmaat\.test\/procesautomatisering/);
  assert.match(xml, /https:\/\/procesmaat\.test\/maatwerksoftware/);
  assert.match(xml, /https:\/\/procesmaat\.test\/systeemkoppelingen/);
  assert.match(xml, /https:\/\/procesmaat\.test\/kennisbank</);
  assert.match(xml, /https:\/\/procesmaat\.test\/kennisbank\/bedrijfsprocessen-automatiseren/);
  assert.match(xml, /https:\/\/procesmaat\.test\/kennisbank\/welk-proces-automatiseren/);
  assert.match(xml, /https:\/\/procesmaat\.test\/kennisbank\/maatwerksoftware-of-standaardpakket/);
  assert.match(xml, /https:\/\/procesmaat\.test\/kennisbank\/api-koppeling-checklist/);
  assert.doesNotMatch(xml, /https:\/\/procesmaat\.test\/privacy/);
});

test("custom 404 is useful, noindex and does not inherit the homepage canonical", async () => {
  const response = await request("/bestaat-niet");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Pagina niet gevonden \| ProcesMaat/);
  assert.match(html, /name="robots" content="noindex, follow"/i);
  assert.match(html, /href="\/kennisbank"/);
  assert.doesNotMatch(html, /rel="canonical"|property="og:image"|name="twitter:image"/i);
});

test("every rendered editorial and commercial page has one H1 and no broken internal page links", async () => {
  const paths = [
    "/",
    "/diensten",
    "/procesautomatisering",
    "/maatwerksoftware",
    "/systeemkoppelingen",
    "/kennisbank",
    "/kennisbank/bedrijfsprocessen-automatiseren",
    "/kennisbank/welk-proces-automatiseren",
    "/kennisbank/maatwerksoftware-of-standaardpakket",
    "/kennisbank/api-koppeling-checklist",
    "/privacy",
  ];
  const linkedPaths = new Set();

  for (const path of paths) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, path);
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
      const href = match[1];
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) continue;
      const url = new URL(href, `https://procesmaat.test${path}`);
      if (url.origin === "https://procesmaat.test") linkedPaths.add(url.pathname);
    }
  }

  for (const path of linkedPaths) {
    const response = await request(path);
    assert.ok(response.status < 400, `${path} returned ${response.status}`);
  }
});

test("all emitted JSON-LD blocks parse and keep identifiers on the configured origin", async () => {
  const paths = [
    "/",
    "/diensten",
    "/procesautomatisering",
    "/maatwerksoftware",
    "/systeemkoppelingen",
    "/kennisbank",
    "/kennisbank/bedrijfsprocessen-automatiseren",
    "/kennisbank/welk-proces-automatiseren",
    "/kennisbank/maatwerksoftware-of-standaardpakket",
    "/kennisbank/api-koppeling-checklist",
  ];

  for (const path of paths) {
    const html = await (await request(path)).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    assert.ok(blocks.length > 0, path);
    for (const [, source] of blocks) {
      const schema = JSON.parse(source);
      assert.equal(schema["@context"], "https://schema.org", path);
      assert.ok(Array.isArray(schema["@graph"]), path);
      assert.doesNotMatch(JSON.stringify(schema), /localhost|www\.procesmaatsoftware\.nl/i, path);
    }
  }
});

test("lead endpoint returns explicit Dutch field errors", async () => {
  const response = await request("/api/leads", leadRequest({
    submissionId: "9b9e3888-21f6-4ddf-bdec-9b3903839bf3",
    name: "",
    companyName: "",
    email: "geen-adres",
    companySize: "",
    processDescription: "te kort",
    hoursPerWeek: "",
    attribution: { landing_path: "/" },
    website: "",
  }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "Controleer de gemarkeerde velden.");
  assert.equal(json.fields.name[0], "Vul je naam in (minimaal 2 tekens).");
  assert.equal(json.fields.companyName[0], "Vul je bedrijfsnaam in (minimaal 2 tekens).");
  assert.equal(json.fields.email[0], "Vul een geldig e-mailadres in.");
  assert.equal(json.fields.processDescription[0], "Beschrijf het proces in minimaal 20 tekens.");
  assert.equal(json.accepted, undefined);
});

test("email header injection and control characters are rejected before delivery", async () => {
  for (const email of [
    "sam@voorbeeld.nl\r\nBcc: aanvaller@example.com",
    "sam@voorbeeld.nl\u0000",
    "sam..dubbel@voorbeeld.nl",
    "sam@-voorbeeld.nl",
  ]) {
    const response = await withFetchStub(
      async () => { throw new Error("Webhook mag niet worden aangeroepen"); },
      () => request("/api/leads", leadRequest(validLead({ email }))),
    );
    assert.equal(response.status, 400, email);
    const json = await response.json();
    assert.equal(json.fields.email[0], "Vul een geldig e-mailadres in.");
  }
});

test("cross-site browser submissions are rejected before delivery", async () => {
  const response = await withFetchStub(
    async () => { throw new Error("Webhook mag niet worden aangeroepen"); },
    () => request("/api/leads", leadRequest(validLead(), { Origin: "https://aanvaller.example" })),
  );
  assert.equal(response.status, 403);
  assert.equal((await response.json()).error, "De aanvraag kon niet worden verwerkt.");
});

test("lead endpoint accepts maximum field lengths and sends auth plus idempotency headers", async () => {
  let captured;
  const response = await withFetchStub(async (input, init) => {
    captured = { input, init };
    return new Response(null, { status: 204 });
  }, () => request("/api/leads", leadRequest(validLead({
    name: "N".repeat(100),
    companyName: "B".repeat(150),
    phone: "1".repeat(50),
    processDescription: "P".repeat(1200),
  })), {
    LEAD_WEBHOOK_URL: "https://hooks.test/leads",
    LEAD_WEBHOOK_SECRET: "test-secret-with-at-least-thirty-two-characters",
  }));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    accepted: true,
    submissionId: "9b9e3888-21f6-4ddf-bdec-9b3903839bf3",
  });
  assert.equal(String(captured.input), "https://hooks.test/leads");
  const headers = new Headers(captured.init.headers);
  assert.equal(headers.get("authorization"), "Bearer test-secret-with-at-least-thirty-two-characters");
  assert.equal(headers.get("idempotency-key"), "9b9e3888-21f6-4ddf-bdec-9b3903839bf3");
  const webhookBody = JSON.parse(captured.init.body);
  assert.equal(webhookBody.submissionId, "9b9e3888-21f6-4ddf-bdec-9b3903839bf3");
  assert.equal(webhookBody.attribution.utm_source, "linkedin");
  assert.equal(webhookBody.website, undefined);
  assert.equal(webhookBody.privacy, undefined);
});

test("a Formspree endpoint receives flattened campaign data without the bearer secret", async () => {
  let captured;
  const response = await withFetchStub(async (input, init) => {
    captured = { input, init };
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }, () => request("/api/leads", leadRequest(validLead()), {
    LEAD_WEBHOOK_URL: "https://formspree.io/f/xjybpozg",
  }));

  assert.equal(response.status, 200);
  assert.equal((await response.json()).accepted, true);
  assert.equal(String(captured.input), "https://formspree.io/f/xjybpozg");
  const headers = new Headers(captured.init.headers);
  assert.equal(headers.get("accept"), "application/json");
  assert.equal(headers.get("authorization"), null);
  assert.equal(headers.get("idempotency-key"), "9b9e3888-21f6-4ddf-bdec-9b3903839bf3");
  const body = JSON.parse(captured.init.body);
  assert.equal(body.email, "sam@voorbeeldbedrijf.nl");
  assert.equal(body.utm_source, "linkedin");
  assert.equal(body.landing_path, "/?utm_source=linkedin");
  assert.equal(body.attribution, undefined);
  assert.equal(body.website, undefined);
  assert.equal(body._subject, "Nieuwe scanaanvraag: Voorbeeldbedrijf");
});

test("a failing Formspree response keeps the submission unaccepted", async () => {
  const response = await withFetchStub(
    async () => new Response(JSON.stringify({ errors: [{ message: "Form not found" }] }), { status: 404 }),
    () => request("/api/leads", leadRequest(validLead()), {
      LEAD_WEBHOOK_URL: "https://formspree.io/f/xjybpozg",
    }),
  );

  assert.equal(response.status, 502);
  const json = await response.json();
  assert.equal(json.accepted, undefined);
  assert.doesNotMatch(JSON.stringify(json), /formspree|LEAD_WEBHOOK/i);
});

test("values above every configured maximum are rejected without webhook traffic", async () => {
  for (const [field, value] of [
    ["name", "N".repeat(101)],
    ["companyName", "B".repeat(151)],
    ["email", `${"e".repeat(247)}@test.nl`],
    ["phone", "1".repeat(51)],
    ["processDescription", "P".repeat(1201)],
  ]) {
    const response = await withFetchStub(
      async () => { throw new Error("Webhook mag niet worden aangeroepen"); },
      () => request("/api/leads", leadRequest(validLead({ [field]: value }))),
    );
    assert.equal(response.status, 400, field);
    const json = await response.json();
    assert.ok(json.fields[field], field);
  }
});

test("invalid submission IDs and unknown fields are rejected", async () => {
  const invalidId = await request("/api/leads", leadRequest(validLead({ submissionId: "retry-1" })));
  assert.equal(invalidId.status, 400);
  assert.match((await invalidId.json()).fields.form[0], /geldige identificatie/);

  const unknown = await request("/api/leads", leadRequest({ ...validLead(), unexpected: "value" }));
  assert.equal(unknown.status, 400);
  assert.equal((await unknown.json()).fields.form[0], "De aanvraag bevat onbekende velden.");
});

test("filled honeypots never reach the webhook and receive no honeypot hint", async () => {
  const response = await withFetchStub(
    async () => { throw new Error("Webhook mag niet worden aangeroepen"); },
    () => request("/api/leads", leadRequest(validLead({ website: "https://spam.test" }))),
  );
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "De aanvraag kon niet worden verwerkt.");
  assert.doesNotMatch(JSON.stringify(json), /website|honeypot/i);
});

test("request bodies above the limit are stopped without Content-Length", async () => {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ padding: "x".repeat(21_000) }),
  };
  assert.equal(new Request("http://localhost/api/leads", init).headers.get("content-length"), null);
  const response = await request("/api/leads", init);
  assert.equal(response.status, 413);
  assert.equal((await response.json()).error, "De aanvraag is te groot.");
});

test("missing webhook configuration is generic in production", async () => {
  const response = await request("/api/leads", leadRequest(validLead()), { APP_ENV: "production" }, "https://www.procesmaat.nl");
  assert.equal(response.status, 503);
  const json = await response.json();
  assert.equal(json.error, "Het aanvraagsysteem is tijdelijk niet beschikbaar. Probeer het later opnieuw.");
  assert.doesNotMatch(JSON.stringify(json), /LEAD_WEBHOOK/);
});

for (const webhookStatus of [400, 500]) {
  test(`webhook ${webhookStatus} never produces false success`, async () => {
    const response = await withFetchStub(
      async () => new Response(null, { status: webhookStatus }),
      () => request("/api/leads", leadRequest(validLead()), {
        LEAD_WEBHOOK_URL: "https://hooks.test/leads",
        LEAD_WEBHOOK_SECRET: "test-secret-with-at-least-thirty-two-characters",
      }),
    );
    assert.equal(response.status, 502);
    assert.equal((await response.json()).accepted, undefined);
  });
}

test("webhook network failures and timeouts never produce false success", async () => {
  const response = await withFetchStub(
    async () => { throw new DOMException("Timed out", "AbortError"); },
    () => request("/api/leads", leadRequest(validLead()), {
      LEAD_WEBHOOK_URL: "https://hooks.test/leads",
      LEAD_WEBHOOK_SECRET: "test-secret-with-at-least-thirty-two-characters",
    }),
  );
  assert.equal(response.status, 502);
  assert.equal((await response.json()).accepted, undefined);
});

test("405 responses include Allow, no-store and all security headers", async () => {
  const response = await request("/api/leads");
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assertSecurityHeaders(response);
});

test("HTTPS production HTML adds HSTS without losing the other headers", async () => {
  const response = await request("/", {}, { APP_ENV: "production" }, "https://www.procesmaat.nl");
  assertSecurityHeaders(response);
  assert.match(response.headers.get("strict-transport-security") ?? "", /max-age=31536000/);
  assert.equal(response.headers.get("cache-control"), "public, max-age=0, s-maxage=900, stale-while-revalidate=86400");
});

test("production redirects the www host permanently to the canonical apex host", async () => {
  const response = await request(
    "/procesautomatisering?utm_source=google",
    {},
    { APP_ENV: "production" },
    "https://www.procesmaatsoftware.nl",
  );

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://procesmaatsoftware.nl/procesautomatisering?utm_source=google");
  assert.match(response.headers.get("cache-control") ?? "", /max-age=3600/);
  assert.match(response.headers.get("strict-transport-security") ?? "", /max-age=31536000/);
  assertSecurityHeaders(response);
});
