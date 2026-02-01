import type { Locale } from "@/core/i18n/locale";

/**
 * Alias used by the SEO helpers. We deliberately expose a separate name for the
 * type of locale used in URL construction and schema generation. Keeping a
 * distinct alias here makes it clear that SEO functions accept the same
 * locale values defined in the i18n layer. Without re‑exporting this alias
 * consumers (e.g. schema.ts) attempted to import a non‑existent `SiteLocale`
 * type which resulted in TS errors. See schema.ts for usage.
 */
export type SiteLocale = Locale;

export const SITE_ORIGIN = "https://elhussainy.pages.dev";
export const SITE_NAME = "Mohamed El-Husseiny";
export const SITE_TAGLINE = "Web developer portfolio";

export const SITE_DESCRIPTION =
  "Web developer portfolio — projects, services, and blog. Technical SEO, performance, and clean bilingual UX.";

// NOTE: keep this in-sync with /public/_headers (cache rules) and /public assets.
// SVG is fine for in-browser previews; if you later add a PNG for social crawlers,
// update this to "/og-cover.png".
export const OG_IMAGE_PATH = "/og-cover.png";
export const FAVICON_PATH = "/favicon.svg";

function normalizePath(path: string): string {
  // expects "/about" or "/" — returns "/" or "/about" (no trailing slash)
  if (!path) return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) return withSlash.slice(0, -1);
  return withSlash;
}

export function buildLangUrl(locale: Locale, path: string = "/"): string {
  const p = normalizePath(path);
  // home pages are "/ar" and "/en" (no trailing slash)
  if (p === "/") return `${SITE_ORIGIN}/${locale}`;
  return `${SITE_ORIGIN}/${locale}${p}`;
}

// Some modules (schema, metadata, etc.) import this helper.
// Keep as a function to make refactors easier (e.g., custom domain switch).
export function getSiteOrigin(): string {
  return SITE_ORIGIN;
}
