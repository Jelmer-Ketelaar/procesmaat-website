export const leadFieldLimits = {
  name: { min: 2, max: 100 },
  companyName: { min: 2, max: 150 },
  email: { max: 254 },
  phone: { max: 50 },
  processDescription: { min: 20, max: 1200 },
  attribution: { max: 100 },
  landingPath: { max: 300 },
} as const;

const emailLocalPart = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
const emailDomainLabel = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;

function hasEmailControlCharacters(input: string) {
  return Array.from(input).some((character) => {
    const codePoint = character.codePointAt(0) ?? 0;
    return codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f);
  });
}

/**
 * Conservative address validation for a public contact form.
 * Restricting input to an ASCII mailbox and DNS-style domain also prevents
 * control-character/header injection before the value reaches mail delivery.
 */
export function isSafeEmailAddress(input: string) {
  if (!input || input.length > leadFieldLimits.email.max || hasEmailControlCharacters(input)) return false;

  const value = input.trim();
  if (value !== input || !/^[\x21-\x7e]+$/.test(value)) return false;

  const parts = value.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || !domain || local.length > 64 || domain.length > 253) return false;
  if (!emailLocalPart.test(local) || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;

  const labels = domain.split(".");
  return labels.length >= 2 && labels.every((label) => emailDomainLabel.test(label));
}

export const companySizeValues = ["1-4", "5-10", "11-25", "26-50", "51+"] as const;

export const hoursPerWeekValues = [
  "unknown",
  "less-than-2",
  "2-5",
  "6-10",
  "11-20",
  "more-than-20",
] as const;

export const attributionQueryKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type AttributionQueryKey = (typeof attributionQueryKeys)[number];
