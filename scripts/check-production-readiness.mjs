import { pathToFileURL } from "node:url";

const requiredPublicValues = [
  ["NEXT_PUBLIC_LEGAL_NAME", "juridische bedrijfsnaam"],
  ["NEXT_PUBLIC_SITE_EMAIL", "contact-e-mailadres"],
  ["NEXT_PUBLIC_SITE_PHONE", "telefoonnummer"],
  ["NEXT_PUBLIC_SITE_ADDRESS", "vestigingsadres"],
  ["NEXT_PUBLIC_CHAMBER_OF_COMMERCE", "KvK-nummer"],
  ["NEXT_PUBLIC_SITE_URL", "publieke site-URL"],
  ["NEXT_PUBLIC_RETENTION_PERIOD", "bewaartermijn"],
  ["NEXT_PUBLIC_SUBPROCESSORS", "gecontroleerde subverwerkersinformatie"],
];

function hasPlaceholder(value = "") {
  return /\[[^\]]+\]/.test(value);
}

function isSecurePublicUrl(value, { allowPath = false } = {}) {
  try {
    const url = new URL(value);
    const isLocal = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    const isExample = url.hostname === "example.com" || url.hostname.endsWith(".example.com");
    const hasUnexpectedPath = !allowPath && !["", "/"].includes(url.pathname);
    return url.protocol === "https:" && !isLocal && !isExample && !url.username && !url.password && !hasUnexpectedPath;
  } catch {
    return false;
  }
}

function isFormspreeWebhook(value) {
  try {
    return ["formspree.io", "www.formspree.io"].includes(new URL(value ?? "").hostname);
  } catch {
    return false;
  }
}

export function validateProductionReadiness(env = process.env) {
  if (env.PROCESMAAT_BUILD_MODE === "test") return [];

  const errors = [];
  for (const [key, label] of requiredPublicValues) {
    const value = env[key]?.trim() ?? "";
    if (!value) errors.push(`${label} ontbreekt (${key}).`);
    else if (hasPlaceholder(value)) errors.push(`${label} bevat nog een waarde tussen blokhaken (${key}).`);
  }

  const phone = env.NEXT_PUBLIC_SITE_PHONE?.replace(/\D/g, "") ?? "";
  if (!phone || /^31?0+$/.test(phone) || phone.endsWith("000000000")) {
    errors.push("Het publieke telefoonnummer is nog een nep- of leeg nummer.");
  }

  if (!isSecurePublicUrl(env.NEXT_PUBLIC_SITE_URL ?? "")) {
    errors.push("NEXT_PUBLIC_SITE_URL moet een geldige publieke HTTPS-origin zonder pad zijn.");
  }
  if (!isSecurePublicUrl(env.LEAD_WEBHOOK_URL ?? "", { allowPath: true })) {
    errors.push("LEAD_WEBHOOK_URL moet een geldige publieke HTTPS-webhook zijn.");
  }
  // Formspree authenticeert op de endpoint-URL zelf; een eigen bearer-secret is daar zinloos.
  if (!isFormspreeWebhook(env.LEAD_WEBHOOK_URL) &&
    ((env.LEAD_WEBHOOK_SECRET?.trim().length ?? 0) < 32 || hasPlaceholder(env.LEAD_WEBHOOK_SECRET))) {
    errors.push("LEAD_WEBHOOK_SECRET ontbreekt of is korter dan 32 tekens.");
  }
  if (env.NEXT_PUBLIC_DEPLOYMENT_ENV !== "production") {
    errors.push("NEXT_PUBLIC_DEPLOYMENT_ENV moet voor een publieke productiebuild exact 'production' zijn.");
  }
  if (env.APP_ENV !== "production") {
    errors.push("APP_ENV moet voor een publieke productiebuild exact 'production' zijn.");
  }
  if (env.NEXT_PUBLIC_LEGAL_REVIEW_COMPLETED !== "true") {
    errors.push("Bevestig professionele juridische controle met NEXT_PUBLIC_LEGAL_REVIEW_COMPLETED=true.");
  }
  if (env.CLOUDFLARE_RATE_LIMITING_CONFIGURED !== "true") {
    errors.push("Bevestig de vereiste Cloudflare rate-limitingregel met CLOUDFLARE_RATE_LIMITING_CONFIGURED=true.");
  }

  return [...new Set(errors)];
}

function run() {
  const errors = validateProductionReadiness();
  if (errors.length === 0) {
    console.log("Productie-readinesscontrole geslaagd.");
    return;
  }

  console.error("Productiebuild geblokkeerd. Los eerst deze launchpunten op:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
