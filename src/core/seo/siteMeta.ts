export type SiteLocale = "en" | "ar";

export const SITE_NAME = "Mohamed El-Hussainy";
export const SITE_EMAIL = "mohamed.noda.b2@gmail.com";

export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://elhussainy.pages.dev").replace(
  /\/$/,
  ""
);

export function getSiteOrigin(): string {
  return SITE_ORIGIN;
}

function stripLocalePrefix(pathname: string): string {
  const p = (pathname || "/").startsWith("/") ? pathname : `/${pathname}`;
  const parts = p.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "ar") parts.shift();
  return parts.length ? `/${parts.join("/")}` : "/";
}

/** Build canonical URL using /en/... and /ar/... (NO ?lang=) */
export function buildLangUrl(pathname: string, locale: SiteLocale): string {
  const clean = stripLocalePrefix(pathname);
  const withLocale = clean === "/" ? `/${locale}` : `/${locale}${clean}`;
  return `${SITE_ORIGIN}${withLocale}`;
}

export function localeToOg(locale: SiteLocale): string {
  return locale === "ar" ? "ar_EG" : "en_US";
}
