import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { validateProductionReadiness } from "../scripts/check-production-readiness.mjs";

const validProductionEnv = {
  APP_ENV: "production",
  NEXT_PUBLIC_DEPLOYMENT_ENV: "production",
  NEXT_PUBLIC_SITE_URL: "https://www.procesmaat.nl",
  NEXT_PUBLIC_LEGAL_NAME: "ProcesMaat Testonderneming B.V.",
  NEXT_PUBLIC_SITE_EMAIL: "contact@procesmaat.test",
  NEXT_PUBLIC_SITE_PHONE: "+31 20 123 45 67",
  NEXT_PUBLIC_SITE_ADDRESS: "Teststraat 1, 1000 AA Amsterdam",
  NEXT_PUBLIC_CHAMBER_OF_COMMERCE: "12345678",
  NEXT_PUBLIC_RETENTION_PERIOD: "Een gecontroleerde testtermijn",
  NEXT_PUBLIC_SUBPROCESSORS: "Gecontroleerde testinformatie",
  NEXT_PUBLIC_LEGAL_REVIEW_COMPLETED: "true",
  LEAD_WEBHOOK_URL: "https://hooks.procesmaat.test/leads",
  LEAD_WEBHOOK_SECRET: "test-secret-with-at-least-thirty-two-characters",
  CLOUDFLARE_RATE_LIMITING_CONFIGURED: "true",
};

test("production readiness passes only with complete explicit configuration", () => {
  assert.deepEqual(validateProductionReadiness(validProductionEnv), []);
});

test("production readiness catches placeholders, fake contacts and missing server controls", () => {
  const errors = validateProductionReadiness({
    ...validProductionEnv,
    NEXT_PUBLIC_LEGAL_NAME: "[Vul juridische bedrijfsnaam in]",
    NEXT_PUBLIC_SITE_PHONE: "+31 00 000 00 00",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    LEAD_WEBHOOK_URL: "",
    LEAD_WEBHOOK_SECRET: "kort",
    CLOUDFLARE_RATE_LIMITING_CONFIGURED: "false",
  });

  assert.ok(errors.some((error) => error.includes("blokhaken")));
  assert.ok(errors.some((error) => error.includes("nep- of leeg nummer")));
  assert.ok(errors.some((error) => error.includes("LEAD_WEBHOOK_URL")));
  assert.ok(errors.some((error) => error.includes("LEAD_WEBHOOK_SECRET")));
  assert.ok(errors.some((error) => error.includes("rate-limitingregel")));
});

test("a Formspree endpoint needs no bearer secret, other webhooks still do", () => {
  assert.deepEqual(validateProductionReadiness({
    ...validProductionEnv,
    LEAD_WEBHOOK_URL: "https://formspree.io/f/xjybpozg",
    LEAD_WEBHOOK_SECRET: "",
  }), []);

  const errors = validateProductionReadiness({
    ...validProductionEnv,
    LEAD_WEBHOOK_URL: "https://hooks.procesmaat.test/leads",
    LEAD_WEBHOOK_SECRET: "",
  });
  assert.ok(errors.some((error) => error.includes("LEAD_WEBHOOK_SECRET")));
});

test("test builds require an explicit test mode and bypass no production safeguard implicitly", () => {
  assert.deepEqual(validateProductionReadiness({ PROCESMAAT_BUILD_MODE: "test" }), []);
  assert.ok(validateProductionReadiness({}).length > 0);
});

test("client source contains focus restoration and success-focus contracts", async () => {
  const [formSource, headerSource] = await Promise.all([
    readFile(new URL("../app/components/lead-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-header.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(formSource, /successRef\.current\?\.focus\(\)/);
  assert.match(formSource, /querySelector<HTMLElement>\("\[aria-invalid='true'\]"\)/);
  assert.match(formSource, /status === "submitting"/);
  assert.match(headerSource, /event\.key !== "Escape"/);
  assert.match(headerSource, /menuButtonRef\.current\?\.focus\(\)/);
  assert.match(headerSource, /inert=\{!menuOpen\}/);
});
