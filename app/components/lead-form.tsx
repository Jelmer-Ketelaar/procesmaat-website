"use client";

import { useRef, useState, type FormEvent } from "react";
import { emitAnalyticsEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink } from "./tracked-link";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string[]>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateClient(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(formData.get("name") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const processDescription = String(formData.get("processDescription") ?? "").trim();

  if (name.length < 2) errors.name = ["Vul je naam in."];
  if (companyName.length < 2) errors.companyName = ["Vul je bedrijfsnaam in."];
  if (!emailPattern.test(email)) errors.email = ["Vul een geldig zakelijk e-mailadres in."];
  if (!formData.get("companySize")) errors.companySize = ["Kies je bedrijfsgrootte."];
  if (processDescription.length < 20) errors.processDescription = ["Beschrijf het proces in minimaal 20 tekens."];
  if (!formData.get("hoursPerWeek")) errors.hoursPerWeek = ["Maak een inschatting van het aantal uren."];
  if (formData.get("privacy") !== "on") errors.privacy = ["Toestemming is nodig om contact met je op te nemen."];
  return errors;
}

export function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const started = useRef(false);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    emitAnalyticsEvent("lead_form_start", { location: "final_cta" });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validateClient(formData);
    setErrors(nextErrors);
    setMessage("");

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    const payload: Record<string, FormDataEntryValue | boolean> = Object.fromEntries(formData.entries());
    payload.privacy = formData.get("privacy") === "on";
    emitAnalyticsEvent("lead_submit", { location: "final_cta" });
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { accepted?: boolean; error?: string; fields?: FieldErrors }
        | null;

      if (!response.ok || !result?.accepted) {
        setErrors(result?.fields ?? {});
        setMessage(result?.error ?? "Versturen is niet gelukt. Probeer het later opnieuw of neem rechtstreeks contact op.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
      setErrors({});
      emitAnalyticsEvent("lead_submit_success", { location: "final_cta" });
    } catch {
      setMessage("Er kon geen verbinding worden gemaakt. Controleer je verbinding en probeer het opnieuw.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" tabIndex={-1}>
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow light"><span /> Aanvraag ontvangen</p>
        <h3>Dank je. We nemen contact met je op.</h3>
        <p>Je aanvraag is veilig doorgestuurd. Wil je meteen een geschikt moment kiezen? Dat kan ook.</p>
        <TrackedLink className="button button-lime" href={siteConfig.bookingUrl} event="booking_click" location="form_success">
          Kies een moment <span aria-hidden="true">&#8599;</span>
        </TrackedLink>
      </div>
    );
  }

  const fieldError = (name: string) => errors[name]?.[0];

  return (
    <form className="lead-form" onSubmit={handleSubmit} onFocus={markStarted} noValidate aria-busy={status === "submitting"}>
      {status === "error" && message && <div className="form-message" role="alert">{message}</div>}

      <div className="field-grid">
        <div className="field">
          <label htmlFor="name">Naam <span>*</span></label>
          <input id="name" name="name" autoComplete="name" aria-invalid={Boolean(fieldError("name"))} aria-describedby={fieldError("name") ? "name-error" : undefined} />
          {fieldError("name") && <p className="field-error" id="name-error">{fieldError("name")}</p>}
        </div>
        <div className="field">
          <label htmlFor="companyName">Bedrijfsnaam <span>*</span></label>
          <input id="companyName" name="companyName" autoComplete="organization" aria-invalid={Boolean(fieldError("companyName"))} aria-describedby={fieldError("companyName") ? "company-error" : undefined} />
          {fieldError("companyName") && <p className="field-error" id="company-error">{fieldError("companyName")}</p>}
        </div>
        <div className="field">
          <label htmlFor="email">Zakelijk e-mailadres <span>*</span></label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={Boolean(fieldError("email"))} aria-describedby={fieldError("email") ? "email-error" : undefined} />
          {fieldError("email") && <p className="field-error" id="email-error">{fieldError("email")}</p>}
        </div>
        <div className="field">
          <label htmlFor="phone">Telefoonnummer <small>optioneel</small></label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(fieldError("phone"))} />
        </div>
        <div className="field">
          <label htmlFor="companySize">Bedrijfsgrootte <span>*</span></label>
          <select id="companySize" name="companySize" defaultValue="" aria-invalid={Boolean(fieldError("companySize"))} aria-describedby={fieldError("companySize") ? "size-error" : undefined}>
            <option value="" disabled>Kies het aantal medewerkers</option>
            <option value="1-4">1–4 medewerkers</option>
            <option value="5-10">5–10 medewerkers</option>
            <option value="11-25">11–25 medewerkers</option>
            <option value="26-50">26–50 medewerkers</option>
            <option value="51+">51+ medewerkers</option>
          </select>
          {fieldError("companySize") && <p className="field-error" id="size-error">{fieldError("companySize")}</p>}
        </div>
        <div className="field">
          <label htmlFor="hoursPerWeek">Tijd per week <span>*</span></label>
          <select id="hoursPerWeek" name="hoursPerWeek" defaultValue="" aria-invalid={Boolean(fieldError("hoursPerWeek"))} aria-describedby={fieldError("hoursPerWeek") ? "hours-error" : undefined}>
            <option value="" disabled>Geschat aantal uren</option>
            <option value="less-than-2">Minder dan 2 uur</option>
            <option value="2-5">2–5 uur</option>
            <option value="6-10">6–10 uur</option>
            <option value="11-20">11–20 uur</option>
            <option value="more-than-20">Meer dan 20 uur</option>
          </select>
          {fieldError("hoursPerWeek") && <p className="field-error" id="hours-error">{fieldError("hoursPerWeek")}</p>}
        </div>
      </div>

      <div className="field field-full">
        <label htmlFor="processDescription">Welk terugkerend proces kost nu veel tijd? <span>*</span></label>
        <textarea id="processDescription" name="processDescription" rows={5} maxLength={1200} placeholder="Bijvoorbeeld: iedere vrijdag combineren we handmatig gegevens uit drie spreadsheets voor onze projectrapportage…" aria-invalid={Boolean(fieldError("processDescription"))} aria-describedby={fieldError("processDescription") ? "process-error" : "process-help"} />
        <p className="field-help" id="process-help">Een paar zinnen is genoeg. Deel geen gevoelige persoonsgegevens.</p>
        {fieldError("processDescription") && <p className="field-error" id="process-error">{fieldError("processDescription")}</p>}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="consent-row">
        <input id="privacy" name="privacy" type="checkbox" aria-invalid={Boolean(fieldError("privacy"))} aria-describedby={fieldError("privacy") ? "privacy-error" : undefined} />
        <label htmlFor="privacy">Ik ga ermee akkoord dat ProcesMaat mijn gegevens gebruikt om contact op te nemen over deze aanvraag. Lees het <a href="/privacy">privacybeleid</a>. <span>*</span></label>
      </div>
      {fieldError("privacy") && <p className="field-error consent-error" id="privacy-error">{fieldError("privacy")}</p>}

      <div className="submit-row">
        <button className="button button-lime submit-button" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? <><span className="spinner" aria-hidden="true" /> Bezig met versturen…</> : <>Vraag gratis scan aan <span aria-hidden="true">&#8599;</span></>}
        </button>
        <p>We gebruiken je gegevens alleen voor deze aanvraag.</p>
      </div>
    </form>
  );
}
