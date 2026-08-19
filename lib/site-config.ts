const configuredEnvironment = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV;
const isTestBuild = process.env.PROCESMAAT_BUILD_MODE === "test" || configuredEnvironment === "test";
const deploymentEnvironment = configuredEnvironment ?? (isTestBuild ? "test" : "production");

const defaults = isTestBuild
  ? {
      siteUrl: "https://procesmaat.test",
      retentionPeriod: "Alleen gedurende de geautomatiseerde test",
      subprocessors: "Geen; testconfiguratie",
    }
  : {
      siteUrl: "https://www.procesmaatsoftware.nl",
      retentionPeriod: "Aanvragen bewaren we zolang dat nodig is om je vraag af te handelen.",
      subprocessors: "Formspree (verwerking van formulierinzendingen) en Cloudflare (hosting).",
    };

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaults.siteUrl;

/** Public, centrally managed configuration. Marketing copy lives in lib/content.ts. */
export const siteConfig = {
  name: "ProcesMaat",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "info@procesmaatsoftware.nl",
  siteUrl: rawSiteUrl.replace(/\/+$/, ""),
  deploymentEnvironment,
  isProduction: deploymentEnvironment === "production",
  isIndexable: deploymentEnvironment === "production",
  legalReviewCompleted: process.env.NEXT_PUBLIC_LEGAL_REVIEW_COMPLETED === "true",
  socials: { linkedIn: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "" },
  privacy: {
    retentionPeriod: process.env.NEXT_PUBLIC_RETENTION_PERIOD ?? defaults.retentionPeriod,
    subprocessors: process.env.NEXT_PUBLIC_SUBPROCESSORS ?? defaults.subprocessors,
  },
  builder: {
    name: process.env.NEXT_PUBLIC_BUILDER_NAME ?? "",
    role: process.env.NEXT_PUBLIC_BUILDER_ROLE ?? "",
    bio: process.env.NEXT_PUBLIC_BUILDER_BIO ?? "",
  },
} as const;
