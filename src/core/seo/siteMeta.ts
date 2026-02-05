import type { Locale } from "@/core/i18n/locale";

export type SiteLocale = Locale;

const RAW_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://elhussainy.pages.dev";
export const SITE_ORIGIN = RAW_ORIGIN.replace(/\/+$/, "");

export function getSiteOrigin(): string {
  return SITE_ORIGIN;
}

export const SITE_NAME = "Mohamed El-Husseiny";
export const SITE_TAGLINE = "Web developer portfolio";
export const SITE_DESCRIPTION =
  "Web developer portfolio — projects, services, and blog. Technical SEO, performance, and clean bilingual UX.";

export const OG_IMAGE_PATH = "/og-cover.png";
export const FAVICON_PATH = "/favicon.svg";

function normalizePath(path: string): string {
  if (!path) return "/";
  let p = path.startsWith("/") ? path : `/${path}`;
  p = p.replace(/\/{2,}/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Canonical URL builder (FINAL RULESET):
 * - EN is default and lives on root (no /en prefix)
 *   "/"      -> https://domain
 *   "/about" -> https://domain/about
 *
 * - AR lives under /ar
 *   "/"      -> https://domain/ar
 *   "/about" -> https://domain/ar/about
 *
 * Always returns NO trailing slash.
 */
export function buildLangUrl(locale: Locale, path: string = "/"): string {
  const p = normalizePath(path);

  const prefix = locale === "ar" ? "/ar" : ""; // EN root, AR prefixed

  // Home path:
  // - EN: origin
  // - AR: origin/ar
  const raw =
    p === "/" ? `${SITE_ORIGIN}${prefix}` : `${SITE_ORIGIN}${prefix}${p}`;

  return stripTrailingSlash(raw);
}
