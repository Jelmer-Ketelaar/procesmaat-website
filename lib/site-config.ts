const configuredEnvironment = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV;
const isTestBuild = process.env.PROCESMAAT_BUILD_MODE === "test" || configuredEnvironment === "test";
const deploymentEnvironment = configuredEnvironment ?? (isTestBuild ? "test" : "development");

const defaults = isTestBuild
  ? {
      legalName: "ProcesMaat Test B.V.",
      phone: "+31 20 123 45 67",
      address: "Teststraat 1, 1000 AA Amsterdam",
      chamberOfCommerce: "12345678",
      siteUrl: "https://procesmaat.test",
      retentionPeriod: "Alleen gedurende de geautomatiseerde test",
      subprocessors: "Geen; testconfiguratie",
    }
  : {
      legalName: "[Vul juridische bedrijfsnaam in]",
      phone: "+31 00 000 00 00",
      address: "[Vul vestigingsadres in]",
      chamberOfCommerce: "[Vul KvK-nummer in]",
      siteUrl: "http://localhost:3000",
      retentionPeriod: "[Vul bewaartermijn in]",
      subprocessors: "[Vul subverwerkers in]",
    };

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaults.siteUrl;

/** Public, centrally managed configuration. Marketing copy lives in lib/content.ts. */
export const siteConfig = {
  name: "ProcesMaat",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? defaults.legalName,
  email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "info@procesmaatsoftware.nl",
  phone: process.env.NEXT_PUBLIC_SITE_PHONE ?? defaults.phone,
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS ?? defaults.address,
  chamberOfCommerce: process.env.NEXT_PUBLIC_CHAMBER_OF_COMMERCE ?? defaults.chamberOfCommerce,
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
