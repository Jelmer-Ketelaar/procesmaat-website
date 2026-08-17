import assert from "node:assert/strict";
import test from "node:test";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

async function request(path = "/", init = {}, extraEnv = {}) {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`http://localhost${path}`, init),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
      ...extraEnv,
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Dutch landing page", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html lang="nl">/i);
  assert.match(html, /Handwerk eruit\./);
  assert.match(html, /Gratis automatiseringsscan/);
  assert.match(html, /Welk terugkerend proces kost nu veel tijd\?/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the privacy page with reviewable placeholders", async () => {
  const response = await request("/privacy");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Helder over je gegevens\./);
  assert.match(html, /Voor publicatie controleren/);
  assert.match(html, /Autoriteit Persoonsgegevens/);
});

test("lead endpoint returns accessible field errors for invalid input", async () => {
  const response = await request("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "" }),
  });
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "Controleer de gemarkeerde velden.");
  assert.ok(json.fields.name);
  assert.equal(json.accepted, undefined);
});

test("lead endpoint never pretends to save when the webhook is missing", async () => {
  const response = await request("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Sam de Vries",
      companyName: "Voorbeeldbedrijf",
      email: "sam@voorbeeldbedrijf.nl",
      phone: "",
      companySize: "11-25",
      processDescription: "Iedere week nemen we projectgegevens handmatig over in een rapportage.",
      hoursPerWeek: "6-10",
      privacy: true,
      website: "",
    }),
  });
  assert.equal(response.status, 503);
  const json = await response.json();
  assert.match(json.error, /LEAD_WEBHOOK_URL/);
  assert.equal(json.accepted, undefined);
});
