import type { Locale } from "./locale";

/**
 * Returns a canonical, root-relative path according to FINAL RULESET:
 * - EN is default (no /en prefix)
 *   withLocale("en", "/")        -> "/"
 *   withLocale("en", "/about")   -> "/about"
 *
 * - AR lives under /ar
 *   withLocale("ar", "/")        -> "/ar"
 *   withLocale("ar", "/about")   -> "/ar/about"
 */
export function withLocale(locale: Locale, path: string): string {
  const trimmed = (path ?? "").trim();
  const normalized = trimmed === "" ? "/" : trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  if (locale === "en") {
    return normalized === "/" ? "/" : normalized;
  }

  // locale === "ar"
  return normalized === "/" ? "/ar" : `/ar${normalized}`;
}
