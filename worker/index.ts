/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { z } from "zod";
import { companySizeValues, hoursPerWeekValues, isSafeEmailAddress, leadFieldLimits } from "../lib/lead-fields";

const MAX_REQUEST_BYTES = 20_000;

const attributionSchema = z.object({
  utm_source: z.string().trim().max(leadFieldLimits.attribution.max, "Campagnebron is te lang.").optional(),
  utm_medium: z.string().trim().max(leadFieldLimits.attribution.max, "Campagnemedium is te lang.").optional(),
  utm_campaign: z.string().trim().max(leadFieldLimits.attribution.max, "Campagnenaam is te lang.").optional(),
  utm_content: z.string().trim().max(leadFieldLimits.attribution.max, "Campagne-inhoud is te lang.").optional(),
  utm_term: z.string().trim().max(leadFieldLimits.attribution.max, "Campagneterm is te lang.").optional(),
  landing_path: z.string().trim()
    .max(leadFieldLimits.landingPath.max, "Het landingspad is te lang.")
    .refine((value) => value.startsWith("/") && !value.startsWith("//"), "Het landingspad is ongeldig."),
}).strict();

const leadSchema = z.object({
  submissionId: z.string({ error: "De inzending heeft geen geldige identificatie." }).uuid("De inzending heeft geen geldige identificatie."),
  name: z.string({ error: "Vul je naam in (minimaal 2 tekens)." }).trim()
    .min(leadFieldLimits.name.min, "Vul je naam in (minimaal 2 tekens).")
    .max(leadFieldLimits.name.max, "Je naam mag maximaal 100 tekens bevatten."),
  companyName: z.string({ error: "Vul je bedrijfsnaam in (minimaal 2 tekens)." }).trim()
    .min(leadFieldLimits.companyName.min, "Vul je bedrijfsnaam in (minimaal 2 tekens).")
    .max(leadFieldLimits.companyName.max, "De bedrijfsnaam mag maximaal 150 tekens bevatten."),
  email: z.string({ error: "Vul een geldig e-mailadres in." })
    .max(leadFieldLimits.email.max, "Het e-mailadres mag maximaal 254 tekens bevatten.")
    .refine(isSafeEmailAddress, "Vul een geldig e-mailadres in."),
  phone: z.string().trim()
    .max(leadFieldLimits.phone.max, "Het telefoonnummer mag maximaal 50 tekens bevatten.")
    .optional()
    .default(""),
  companySize: z.enum(companySizeValues, { error: "Kies je bedrijfsgrootte." }),
  processDescription: z.string({ error: "Beschrijf het proces in minimaal 20 tekens." }).trim()
    .min(leadFieldLimits.processDescription.min, "Beschrijf het proces in minimaal 20 tekens.")
    .max(leadFieldLimits.processDescription.max, "De procesomschrijving mag maximaal 1200 tekens bevatten."),
  hoursPerWeek: z.enum(hoursPerWeekValues, { error: "Maak een inschatting van het aantal uren." }),
  attribution: attributionSchema.optional().default({ landing_path: "/" }),
  website: z.string().max(200, "De aanvraag kon niet worden verwerkt.").optional().default(""),
}).strict();

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
  APP_ENV?: "development" | "test" | "production";
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function securityHeaders(request: Request, env: Env, api = false): Headers {
  const production = env.APP_ENV === "production";
  const headers = new Headers({
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "X-Frame-Options": "DENY",
  });

  headers.set(
    "Content-Security-Policy",
    api
      ? "default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
      : production
        ? "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'"
        : "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' ws: wss:",
  );

  if (production && new URL(request.url).protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  return headers;
}

function jsonResponse(request: Request, env: Env, data: unknown, status: number, extraHeaders?: HeadersInit) {
  const headers = securityHeaders(request, env, true);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  if (extraHeaders) new Headers(extraHeaders).forEach((value, key) => headers.set(key, value));
  return new Response(JSON.stringify(data), { status, headers });
}

function isTrustedFormOrigin(request: Request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function withDocumentSecurity(request: Request, env: Env, response: Response) {
  const headers = new Headers(response.headers);
  securityHeaders(request, env).forEach((value, key) => headers.set(key, value));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function readJsonWithinLimit(request: Request): Promise<
  | { ok: true; value: unknown }
  | { ok: false; reason: "invalid" | "too-large" }
> {
  if (!request.body) return { ok: false, reason: "invalid" };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return { ok: false, reason: "too-large" };
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return { ok: true, value: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}

type LeadDelivery = Omit<z.infer<typeof leadSchema>, "website"> & {
  source: string;
  submittedAt: string;
};

/**
 * Formspree authenticates by endpoint URL, so no bearer secret is required or sent there.
 */
function isFormspreeWebhook(value: string | undefined) {
  if (!value) return false;
  try {
    return ["formspree.io", "www.formspree.io"].includes(new URL(value).hostname);
  } catch {
    return false;
  }
}

/**
 * Formspree stores and mails flat key/value pairs, so the nested campaign data is
 * flattened and a readable subject is added. No new personal data is introduced.
 */
function formspreeSubmission(lead: LeadDelivery) {
  const { attribution, ...fields } = lead;
  return {
    ...fields,
    ...attribution,
    _subject: `Nieuwe scanaanvraag: ${fields.companyName}`,
  };
}

function webhookConfigurationError(request: Request, env: Env) {
  const developmentDetails = [];
  if (!env.LEAD_WEBHOOK_URL) developmentDetails.push("LEAD_WEBHOOK_URL");
  if (!env.LEAD_WEBHOOK_SECRET && !isFormspreeWebhook(env.LEAD_WEBHOOK_URL)) {
    developmentDetails.push("LEAD_WEBHOOK_SECRET");
  }
  const publicMessage = "Het aanvraagsysteem is tijdelijk niet beschikbaar. Probeer het later opnieuw.";
  const message = env.APP_ENV === "production"
    ? publicMessage
    : `${publicMessage} Ontbrekende serverconfiguratie: ${developmentDetails.join(", ") || "ongeldige webhook-URL"}.`;
  return jsonResponse(request, env, { error: message }, 503);
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/leads") {
      if (request.method !== "POST") {
        return jsonResponse(request, env, { error: "Deze endpoint accepteert alleen POST-verzoeken." }, 405, {
          Allow: "POST",
        });
      }

      if (!isTrustedFormOrigin(request)) {
        return jsonResponse(request, env, { error: "De aanvraag kon niet worden verwerkt." }, 403);
      }

      const contentLength = Number(request.headers.get("content-length") ?? 0);
      if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
        return jsonResponse(request, env, { error: "De aanvraag is te groot." }, 413);
      }
      if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
        return jsonResponse(request, env, { error: "Ongeldig aanvraagformaat." }, 415);
      }

      const body = await readJsonWithinLimit(request);
      if (!body.ok) {
        return body.reason === "too-large"
          ? jsonResponse(request, env, { error: "De aanvraag is te groot." }, 413)
          : jsonResponse(request, env, { error: "De aanvraag kon niet worden gelezen." }, 400);
      }

      const parsed = leadSchema.safeParse(body.value);
      if (!parsed.success) {
        const fields: Record<string, string[]> = {};
        for (const issue of parsed.error.issues) {
          const path = String(issue.path[0] ?? "form");
          const field = ["attribution", "submissionId", "website"].includes(path) ? "form" : path;
          const message = issue.code === "unrecognized_keys" ? "De aanvraag bevat onbekende velden." : issue.message;
          (fields[field] ??= []).push(message);
        }
        return jsonResponse(request, env, { error: "Controleer de gemarkeerde velden.", fields }, 400);
      }

      if (parsed.data.website) {
        return jsonResponse(request, env, { error: "De aanvraag kon niet worden verwerkt." }, 400);
      }

      if (!env.LEAD_WEBHOOK_URL) return webhookConfigurationError(request, env);

      const formspree = isFormspreeWebhook(env.LEAD_WEBHOOK_URL);
      if (!formspree && !env.LEAD_WEBHOOK_SECRET) return webhookConfigurationError(request, env);

      let webhookUrl: URL;
      try {
        webhookUrl = new URL(env.LEAD_WEBHOOK_URL);
        if (!/^https?:$/.test(webhookUrl.protocol) || (env.APP_ENV === "production" && webhookUrl.protocol !== "https:")) {
          return webhookConfigurationError(request, env);
        }

        const { website: _honeypot, ...lead } = parsed.data;
        void _honeypot;
        const delivery: LeadDelivery = {
          ...lead,
          source: "procesmaat-website",
          submittedAt: new Date().toISOString(),
        };
        const webhookHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          "Idempotency-Key": parsed.data.submissionId,
          "User-Agent": "ProcesMaatLeadForm/2.0",
        };
        if (formspree) {
          // Without this Formspree answers a browser redirect instead of JSON.
          webhookHeaders["Accept"] = "application/json";
        } else {
          webhookHeaders["Authorization"] = `Bearer ${env.LEAD_WEBHOOK_SECRET}`;
        }
        const webhookResponse = await fetch(env.LEAD_WEBHOOK_URL, {
          method: "POST",
          headers: webhookHeaders,
          body: JSON.stringify(formspree ? formspreeSubmission(delivery) : delivery),
          signal: AbortSignal.timeout(10_000),
        });

        if (!webhookResponse.ok) {
          return jsonResponse(request, env, { error: "De aanvraag kon niet worden doorgestuurd. Probeer het later opnieuw." }, 502);
        }
      } catch {
        return jsonResponse(request, env, { error: "De aanvraag kon niet worden doorgestuurd. Probeer het later opnieuw." }, 502);
      }

      return jsonResponse(request, env, { accepted: true, submissionId: parsed.data.submissionId }, 200);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const response = await handler.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") ?? "";
    return contentType.includes("text/html") ? withDocumentSecurity(request, env, response) : response;
  },
};

export default worker;
