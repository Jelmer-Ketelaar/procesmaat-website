/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in.").max(100),
  companyName: z.string().trim().min(2, "Vul je bedrijfsnaam in.").max(150),
  email: z.string().trim().email("Vul een geldig zakelijk e-mailadres in.").max(254),
  phone: z.string().trim().max(50).optional().default(""),
  companySize: z.enum(["1-4", "5-10", "11-25", "26-50", "51+"]),
  processDescription: z.string().trim().min(20, "Beschrijf het proces in minimaal 20 tekens.").max(1200),
  hoursPerWeek: z.enum(["less-than-2", "2-5", "6-10", "11-20", "more-than-20"]),
  privacy: z.boolean().refine(Boolean, "Toestemming is nodig om contact met je op te nemen."),
  website: z.string().max(0).optional().default(""),
});

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  LEAD_WEBHOOK_URL?: string;
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

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/leads") {
      const json = (data: unknown, status: number) => new Response(JSON.stringify(data), {
        status,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });

      if (request.method !== "POST") {
        return new Response(null, { status: 405, headers: { Allow: "POST" } });
      }

      const contentLength = Number(request.headers.get("content-length") ?? 0);
      if (contentLength > 20_000) return json({ error: "De aanvraag is te groot." }, 413);
      if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
        return json({ error: "Ongeldig aanvraagformaat." }, 415);
      }

      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return json({ error: "De aanvraag kon niet worden gelezen." }, 400);
      }

      const parsed = leadSchema.safeParse(body);
      if (!parsed.success) {
        const fields: Record<string, string[]> = {};
        for (const issue of parsed.error.issues) {
          const field = String(issue.path[0] ?? "form");
          (fields[field] ??= []).push(issue.message);
        }
        return json({ error: "Controleer de gemarkeerde velden.", fields }, 400);
      }

      if (!env.LEAD_WEBHOOK_URL) {
        return json({
          error: "De leadontvangst is nog niet ingesteld. Voeg LEAD_WEBHOOK_URL toe aan de serveromgeving.",
        }, 503);
      }

      const { website: _honeypot, ...lead } = parsed.data;
      void _honeypot;
      try {
        const webhookResponse = await fetch(env.LEAD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "User-Agent": "ProcesMaatLeadForm/1.0" },
          body: JSON.stringify({ ...lead, source: "procesmaat-website", submittedAt: new Date().toISOString() }),
          signal: AbortSignal.timeout(10_000),
        });

        if (!webhookResponse.ok) {
          return json({ error: "De aanvraag kon niet worden doorgestuurd. Probeer het later opnieuw." }, 502);
        }
      } catch {
        return json({ error: "De aanvraag kon niet worden doorgestuurd. Probeer het later opnieuw." }, 502);
      }

      return json({ accepted: true }, 200);
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

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
