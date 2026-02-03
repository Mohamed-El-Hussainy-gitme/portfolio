import type { Locale } from "./locale";

/**
 * Returns a locale-prefixed, root-relative path.
 * Examples:
 * - withLocale("en", "/") -> "/en"
 * - withLocale("ar", "/contact") -> "/ar/contact"
 * - withLocale("en", "projects") -> "/en/projects"
 */
export function withLocale(locale: Locale, path: string): string {
  const trimmed = path.trim();
  if (trimmed === "" || trimmed === "/") return `/${locale}`;

  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `/${locale}${normalized}`;
}
