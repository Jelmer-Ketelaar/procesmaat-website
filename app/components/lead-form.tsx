"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { emitAnalyticsEvent } from "@/lib/analytics";
import { attributionQueryKeys, isSafeEmailAddress, leadFieldLimits } from "@/lib/lead-fields";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string[]>;

function validateClient(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(formData.get("name") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const processDescription = String(formData.get("processDescription") ?? "").trim();

  if (name.length < leadFieldLimits.name.min) errors.name = ["Vul je naam in (minimaal 2 tekens)."];
  else if (name.length > leadFieldLimits.name.max) errors.name = ["Je naam mag maximaal 100 tekens bevatten."];
  if (companyName && companyName.length < leadFieldLimits.companyName.min) errors.companyName = ["Vul je bedrijfsnaam in (minimaal 2 tekens)."];
  else if (companyName.length > leadFieldLimits.companyName.max) errors.companyName = ["De bedrijfsnaam mag maximaal 150 tekens bevatten."];
  if (email.length > leadFieldLimits.email.max) errors.email = ["Het e-mailadres mag maximaal 254 tekens bevatten."];
  else if (!isSafeEmailAddress(email)) errors.email = ["Vul een geldig e-mailadres in."];
  if (processDescription.length < 20) errors.processDescription = ["Beschrijf het proces in minimaal 20 tekens."];
  else if (processDescription.length > leadFieldLimits.processDescription.max) errors.processDescription = ["De procesomschrijving mag maximaal 1200 tekens bevatten."];
  if (!formData.get("hoursPerWeek")) errors.hoursPerWeek = ["Maak een inschatting van het aantal uren."];
  const softwareTools = String(formData.get("softwareTools") ?? "").trim();
  const desiredOutcome = String(formData.get("desiredOutcome") ?? "").trim();
  if (softwareTools.length < leadFieldLimits.softwareTools.min) errors.softwareTools = ["Noem de software die je gebruikt."];
  else if (softwareTools.length > leadFieldLimits.softwareTools.max) errors.softwareTools = ["Gebruik maximaal 400 tekens voor je software."];
  if (desiredOutcome.length < leadFieldLimits.desiredOutcome.min) errors.desiredOutcome = ["Beschrijf het gewenste resultaat in minimaal 10 tekens."];
  else if (desiredOutcome.length > leadFieldLimits.desiredOutcome.max) errors.desiredOutcome = ["Gebruik maximaal 1200 tekens voor het gewenste resultaat."];
  if (!formData.get("weeklyVolume")) errors.weeklyVolume = ["Kies een aantal of kies ‘Weet ik nog niet’."];
  return errors;
}

function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {
    landing_path: window.location.pathname.slice(0, leadFieldLimits.landingPath.max),
  };

  for (const key of attributionQueryKeys) {
    const value = params.get(key)?.trim();
    if (value && value.length <= leadFieldLimits.attribution.max) attribution[key] = value;
  }

  return attribution;
}

export function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const started = useRef(false);
  const submissionId = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
      return;
    }
    if (status !== "error") return;
    const firstInvalidField = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
    (firstInvalidField ?? feedbackRef.current)?.focus();
  }, [errors, message, status]);

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
      emitAnalyticsEvent("lead_validation_error", {
        fields: Object.keys(nextErrors).sort().join(","),
        location: "final_cta",
      });
      return;
    }

    submissionId.current ??= crypto.randomUUID();
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.submissionId = submissionId.current;
    payload.attribution = getAttribution();
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
        const serverErrors = result?.fields ?? {};
        setErrors(serverErrors);
        setMessage(result?.error ?? "Versturen is niet gelukt. Probeer het later opnieuw of neem rechtstreeks contact op.");
        setStatus("error");
        if (Object.keys(serverErrors).length > 0) {
          emitAnalyticsEvent("lead_validation_error", {
            fields: Object.keys(serverErrors).sort().join(","),
            location: "final_cta",
          });
        } else {
          emitAnalyticsEvent("lead_submit_error", { category: "server", location: "final_cta" });
        }
        return;
      }

      form.reset();
      setStatus("success");
      setErrors({});
      emitAnalyticsEvent("lead_submit_success", { location: "final_cta" });
    } catch {
      setMessage("Er kon geen verbinding worden gemaakt. Controleer je verbinding en probeer het opnieuw.");
      setStatus("error");
      emitAnalyticsEvent("lead_submit_error", { category: "network", location: "final_cta" });
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow light"><span /> Aanvraag ontvangen</p>
        <h3>Dank je. Je aanvraag is ontvangen.</h3>
        <p>Binnen één werkdag ontvang je ons eerste automatiseringsadvies per e-mail. Mist er informatie? Dan stellen we gerichte vragen per e-mail. Je hoeft geen afspraak te plannen.</p>
      </div>
    );
  }

  const fieldError = (name: string) => errors[name]?.[0];

  return (
    <form ref={formRef} className="lead-form" onSubmit={handleSubmit} onFocus={markStarted} noValidate aria-busy={status === "submitting"}>
      {status === "error" && message && <div className="form-message" role="alert" tabIndex={-1} ref={feedbackRef}>{message}</div>}

      <div className="field process-first">
        <label htmlFor="processDescription">Welk terugkerend proces kost nu veel tijd? <span>*</span></label>
        <textarea id="processDescription" name="processDescription" rows={3} required aria-required="true" maxLength={leadFieldLimits.processDescription.max} placeholder="Bijv. bestellingen overtypen of facturen controleren." aria-invalid={Boolean(fieldError("processDescription"))} aria-describedby={`process-help${fieldError("processDescription") ? " process-error" : ""}`} />
        <p className="field-help" id="process-help">Bijvoorbeeld: “We typen bestellingen uit onze webshop over in de boekhouding.” Een paar zinnen is genoeg; technische kennis is niet nodig. Deel geen gevoelige persoonsgegevens.</p>
        {fieldError("processDescription") && <p className="field-error" id="process-error">{fieldError("processDescription")}</p>}
      </div>

      <div className="field process-first">
        <label htmlFor="softwareTools">Welke software gebruik je voor dit proces? <span>*</span></label>
        <input id="softwareTools" name="softwareTools" required maxLength={leadFieldLimits.softwareTools.max} placeholder="Bijv. WooCommerce, Moneybird en Excel" aria-invalid={Boolean(fieldError("softwareTools"))} aria-describedby={`software-help${fieldError("softwareTools") ? " software-error" : ""}`} />
        <p className="field-help" id="software-help">Noem twee of drie pakketten, of geef aan dat je nog zonder software werkt. Deel geen wachtwoorden of toegangscodes.</p>
        {fieldError("softwareTools") && <p className="field-error" id="software-error">{fieldError("softwareTools")}</p>}
      </div>
      <div className="field process-first">
        <label htmlFor="desiredOutcome">Wat moet er straks concreet gebeuren? <span>*</span></label>
        <textarea id="desiredOutcome" name="desiredOutcome" rows={3} required maxLength={leadFieldLimits.desiredOutcome.max} placeholder="Bijv. na een webshopbestelling automatisch een conceptfactuur klaarzetten in Moneybird." aria-invalid={Boolean(fieldError("desiredOutcome"))} aria-describedby={`outcome-help${fieldError("desiredOutcome") ? " outcome-error" : ""}`} />
        <p className="field-help" id="outcome-help">Vertel wat de uitkomst moet zijn en welke stap je zelf wilt blijven controleren.</p>
        {fieldError("desiredOutcome") && <p className="field-error" id="outcome-error">{fieldError("desiredOutcome")}</p>}
      </div>
      <fieldset className="choice-field volume-field" role="radiogroup" tabIndex={-1} aria-invalid={Boolean(fieldError("weeklyVolume"))} aria-describedby={`volume-help${fieldError("weeklyVolume") ? " volume-error" : ""}`}>
        <legend>Om hoeveel documenten, e-mails of aanvragen gaat het per week? <span>*</span></legend>
        <div className="choice-options">
          {[["less-than-25", "Minder dan 25"], ["25-100", "25–100"], ["101-500", "101–500"], ["more-than-500", "Meer dan 500"], ["unknown", "Weet ik nog niet"]].map(([value, label]) => (
            <label className="choice-option" key={value}><input type="radio" name="weeklyVolume" value={value} required /><span>{label}</span></label>
          ))}
        </div>
        <p className="field-help" id="volume-help">Een schatting is voldoende. Dit helpt ons de omvang van je proces te begrijpen.</p>
        {fieldError("weeklyVolume") && <p className="field-error" id="volume-error">{fieldError("weeklyVolume")}</p>}
      </fieldset>
      <p className="form-contact-intro">Waar mogen we je advies naartoe sturen?</p>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="name">Naam <span>*</span></label>
          <input id="name" name="name" autoComplete="name" required aria-required="true" maxLength={leadFieldLimits.name.max} aria-invalid={Boolean(fieldError("name"))} aria-describedby={fieldError("name") ? "name-error" : undefined} />
          {fieldError("name") && <p className="field-error" id="name-error">{fieldError("name")}</p>}
        </div>
        <div className="field">
          <label htmlFor="email">E-mailadres <span>*</span></label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required aria-required="true" maxLength={leadFieldLimits.email.max} aria-invalid={Boolean(fieldError("email"))} aria-describedby={fieldError("email") ? "email-error" : undefined} />
          {fieldError("email") && <p className="field-error" id="email-error">{fieldError("email")}</p>}
        </div>
        <div className="field">
          <label htmlFor="companyName">Bedrijfsnaam <small>optioneel</small></label>
          <input id="companyName" name="companyName" autoComplete="organization" maxLength={leadFieldLimits.companyName.max} aria-invalid={Boolean(fieldError("companyName"))} aria-describedby={fieldError("companyName") ? "company-error" : undefined} />
          {fieldError("companyName") && <p className="field-error" id="company-error">{fieldError("companyName")}</p>}
        </div>
      </div>

      <fieldset className="choice-field" role="radiogroup" tabIndex={-1} aria-invalid={Boolean(fieldError("hoursPerWeek"))} aria-describedby={fieldError("hoursPerWeek") ? "hours-error" : undefined}>
        <legend>Hoeveel tijd kost dit per week? <span>*</span></legend>
        <div className="choice-options">
          {[
            ["less-than-2", "Minder dan 2 uur"], ["2-5", "2–5 uur"], ["6-10", "6–10 uur"],
            ["11-20", "11–20 uur"], ["more-than-20", "Meer dan 20 uur"], ["unknown", "Weet ik nog niet"],
          ].map(([value, label]) => (
            <label className="choice-option" key={value}>
              <input type="radio" name="hoursPerWeek" value={value} required aria-describedby={fieldError("hoursPerWeek") ? "hours-error" : undefined} />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {fieldError("hoursPerWeek") && <p className="field-error" id="hours-error">{fieldError("hoursPerWeek")}</p>}
      </fieldset>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="privacy-notice" id="form-privacy-note">
        Door de aanvraag te versturen kan ProcesMaat je gegevens gebruiken om je adviesaanvraag te beoordelen en contact met je op te nemen. Lees het <a href="/privacy" target="_blank" rel="noreferrer" aria-label="Privacybeleid (opent in een nieuw tabblad)">privacybeleid <span aria-hidden="true">↗</span></a>. Deel geen gevoelige persoonsgegevens.
      </p>

      <div className="submit-row">
        <button className="button button-lime submit-button" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? <><span className="spinner" aria-hidden="true" /> Bezig met versturen…</> : <>Ontvang gratis digitaal advies <span aria-hidden="true">&#8599;</span></>}
        </button>
        <p><strong>Binnen één werkdag advies per e-mail.</strong><br />Gratis en vrijblijvend. Geen afspraak, geen nieuwsbrief.</p>
      </div>
    </form>
  );
}
