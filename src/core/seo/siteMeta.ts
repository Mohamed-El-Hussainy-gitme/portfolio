import type { Locale } from "@/core/i18n/locale";

export type SiteLocale = Locale;

const RAW_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://elhussainy.pages.dev";
export const SITE_ORIGIN = RAW_ORIGIN.replace(/\/+$/, "");

// ...
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
  // collapse multiple slashes
  p = p.replace(/\/{2,}/g, "/");
  // remove trailing slash except root "/"
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

function stripTrailingSlash(url: string): string {
  // keep "https://domain.com" but remove ending "/" for paths
  return url.replace(/\/+$/, "");
}

// 2) Build locale URL without trailing slash (even for "/")
export function buildLangUrl(locale: Locale, path: string = "/"): string {
  const p = normalizePath(path);

  // Home: "/en" not "/en/"
  const raw = p === "/" ? `${SITE_ORIGIN}/${locale}` : `${SITE_ORIGIN}/${locale}${p}`;

  // Safety: ensure no trailing slash at end
  return stripTrailingSlash(raw);
}
