"use client";

export type AnalyticsEvent =
  | "cta_click"
  | "lead_form_start"
  | "lead_submit"
  | "lead_submit_success"
  | "lead_validation_error"
  | "lead_submit_error";

/**
 * Consent-safe event hook. No tracker is loaded here: analytics tooling may
 * listen for this event after a visitor has granted marketing consent.
 */
export function emitAnalyticsEvent(event: AnalyticsEvent, detail: Record<string, string> = {}) {
  window.dispatchEvent(
    new CustomEvent("procesmaat:analytics", { detail: { event, ...detail } }),
  );
}
