import type { Locale } from "@/core/i18n/locale";

/**
 * Canonical site origin.
 *
 * IMPORTANT (Cloudflare Pages + `output: "export"`): this must be known at build time.
 * Set it via `NEXT_PUBLIC_SITE_URL` (recommended) so:
 *   - sitemap.xml URLs
 *   - robots.txt sitemap/host
 *   - canonical / hreflang links
 * all match the real production domain.
 */
const FALLBACK_ORIGIN = "https://elhussainy.pages.dev";

function safeOrigin(urlLike: string): string | null {
  try {
    return new URL(urlLike).origin;
  } catch {
    return null;
  }
}

export function getSiteOrigin(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.SITE_ORIGIN || process.env.NEXT_PUBLIC_SITE_ORIGIN;

  if (!fromEnv) return FALLBACK_ORIGIN;
  return safeOrigin(fromEnv) ?? FALLBACK_ORIGIN;
}

/** Build-time constant origin (safe for metadata + sitemap routes). */
export const SITE_ORIGIN = getSiteOrigin();

export const SITE_NAME = "Mohamed El-Husseiny";
export const SITE_TAGLINE = "Web developer portfolio";

export const SITE_DESCRIPTION =
  "Web developer portfolio — projects, services, and blog. Technical SEO, performance, and clean bilingual UX.";

export const OG_IMAGE_PATH = "/og-cover.png";
export const FAVICON_PATH = "/favicon.svg";

function normalizePath(path: string): string {
  // expects "/about" or "/" — returns "/" or "/about" (no trailing slash)
  if (!path) return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) return withSlash.slice(0, -1);
  return withSlash;
}

/**
 * Builds an absolute URL for a locale-less path.
 * - Home pages are "/ar" and "/en" (no trailing slash)
 * - Everything else: "/{locale}{path}"
 */
export function buildLangUrl(locale: Locale, path: string = "/"): string {
  const p = normalizePath(path);
  if (p === "/") return `${SITE_ORIGIN}/${locale}`;
  return `${SITE_ORIGIN}/${locale}${p}`;
}
