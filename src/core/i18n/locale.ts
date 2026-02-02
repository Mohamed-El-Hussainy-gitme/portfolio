export type Locale = "en" | "ar";

export const SUPPORTED_LOCALES: Locale[] = ["en", "ar"];

/**
 * The locale used when we can't infer a valid locale from the URL.
 * IMPORTANT: Keep this aligned with the platform redirect logic (Cloudflare Pages middleware).
 */
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE_NAME = "LANG";

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(seg) ? seg : null;
}

export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (isLocale(parts[0]!)) parts.shift();
  return "/" + parts.join("/");
}

export function localeToDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * Normalize a pathname to a single canonical shape:
 * - collapse duplicate slashes
 * - remove trailing slash for non-root
 */
export function normalizePathname(pathname: string): string {
  let out = pathname.replace(/\/{2,}/g, "/");
  if (out.length > 1) out = out.replace(/\/+$/, "");
  return out;
}
