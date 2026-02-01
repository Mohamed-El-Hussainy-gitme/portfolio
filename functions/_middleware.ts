// Cloudflare Pages Functions Middleware
// - Force default locale to Arabic (/ar)
// - Remove ?lang and marketing params to prevent duplicate URLs
// - Normalize trailing slashes + /index.html
// - Keep SEO/system files at root: /sitemap.xml, /robots.txt, /llms.txt, /ai.txt, etc.

type PagesContext = { request: Request; next: () => Promise<Response> };

type Locale = "en" | "ar";
const DEFAULT_LOCALE: Locale = "ar";

const LOCALELESS_PREFIXES = new Set(["about", "contact", "projects", "services", "blog"]);

const STRIP_QUERY_KEYS = new Set([
  "lang",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "mc_cid",
  "mc_eid",
]);

const SEO_BYPASS_PATHS = new Set([
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.svg",
  "/googlebfee5bd7eb86337c.html",
  "/llms.txt",
  "/ai.txt",
  "/og-cover.svg",
]);

function collapseSlashes(pathname: string): string {
  return pathname.replace(/\/{2,}/g, "/");
}

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

// Only touch index.html (do NOT touch google-site-verification html file)
function stripIndexHtml(pathname: string): string {
  if (pathname === "/index.html") return "/";
  if (pathname.endsWith("/index.html")) return pathname.slice(0, -"/index.html".length) || "/";
  return pathname;
}

function firstSegment(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  return parts[0] || null;
}

function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "ar") parts.shift();
  return parts.length ? `/${parts.join("/")}` : "/";
}

function withLocale(pathname: string, locale: Locale): string {
  const clean = stripLocalePrefix(pathname);
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

function isLocalePath(pathname: string): boolean {
  const seg = firstSegment(pathname);
  return seg === "en" || seg === "ar";
}

function isLocaleLessKnownRoute(pathname: string): boolean {
  const seg = firstSegment(pathname);
  return !!seg && LOCALELESS_PREFIXES.has(seg);
}

function isAssetOrNext(pathname: string): boolean {
  // Don't touch assets (some filenames may contain spaces/case-sensitive parts)
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/brand/") ||
    pathname.startsWith("/reviews/") ||
    pathname.startsWith("/skills/") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".map")
  );
}

function addSecurityHeaders(res: Response): Response {
  const out = new Response(res.body, res);
  out.headers.set("X-Content-Type-Options", "nosniff");
  out.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return out;
}

export async function onRequest(context: PagesContext) {
  const req = context.request;

  // Avoid redirecting non-GET/HEAD requests
  if (req.method !== "GET" && req.method !== "HEAD") {
    return addSecurityHeaders(await context.next());
  }

  const url = new URL(req.url);

  const originalPath = url.pathname;
  const originalSearch = url.search;

  // ---- A) Normalize pathname ----
  let pathname = collapseSlashes(url.pathname);
  pathname = stripIndexHtml(pathname);
  pathname = stripTrailingSlash(pathname);

  // ---- B) Canonicalize sitemap aliases (keep ONE sitemap URL) ----
  // Old/alias sitemap locations -> /sitemap.xml
  if (
    pathname === "/sitemap-index.xml" ||
    pathname === "/sitemap-en.xml" ||
    pathname === "/sitemap-ar.xml" ||
    pathname === "/en/sitemap.xml" ||
    pathname === "/ar/sitemap.xml"
  ) {
    pathname = "/sitemap.xml";
  }

  // ---- C) Detect desired locale from ?lang= (if present) ----
  let desiredLocale: Locale | null = null;
  const langParam = url.searchParams.get("lang");
  if (langParam === "en" || langParam === "ar") desiredLocale = langParam;

  // ---- D) Strip query params (lang + tracking) ----
  let changedQuery = false;
  for (const key of Array.from(url.searchParams.keys())) {
    if (STRIP_QUERY_KEYS.has(key)) {
      url.searchParams.delete(key);
      changedQuery = true;
    }
  }

  const newSearch = url.searchParams.toString();
  const rebuiltSearch = newSearch ? `?${newSearch}` : "";

  // ---- E) If it's an SEO/system file, NEVER apply locale redirects ----
  if (SEO_BYPASS_PATHS.has(pathname)) {
    const changedPath = pathname !== originalPath;
    const changed = changedPath || changedQuery || originalSearch !== rebuiltSearch;

    if (changed) {
      const redirectUrl = `${url.origin}${pathname}${rebuiltSearch}`;
      return addSecurityHeaders(Response.redirect(redirectUrl, 301));
    }

    return addSecurityHeaders(await context.next());
  }

  // ---- F) If it’s an asset path, do not apply locale logic ----
  // We still allow stripping tracking params above.
  if (isAssetOrNext(pathname)) {
    const changed = changedQuery || originalSearch !== rebuiltSearch || pathname !== originalPath;
    if (changed) {
      const redirectUrl = `${url.origin}${pathname}${rebuiltSearch}`;
      return addSecurityHeaders(Response.redirect(redirectUrl, 301));
    }
    return addSecurityHeaders(await context.next());
  }

  // ---- G) Canonicalize root + locale-less known routes ----
  // Root:
  if (pathname === "/") {
    pathname = `/${desiredLocale ?? DEFAULT_LOCALE}`;
  }

  // Locale-less known routes (/about, /blog/x, ...)
  if (!isLocalePath(pathname) && isLocaleLessKnownRoute(pathname)) {
    pathname = `/${desiredLocale ?? DEFAULT_LOCALE}${pathname}`;
  }

  // If it's already a locale path but ?lang says otherwise, move to the right locale
  if (desiredLocale && isLocalePath(pathname)) {
    pathname = withLocale(pathname, desiredLocale);
  }

  // ---- H) Redirect if anything changed ----
  const changedPath = pathname !== originalPath;
  const changed = changedPath || changedQuery || originalSearch !== rebuiltSearch;

  if (changed) {
    const redirectUrl = `${url.origin}${pathname}${rebuiltSearch}`;
    return addSecurityHeaders(Response.redirect(redirectUrl, 301));
  }

  // ---- I) Pass-through ----
  return addSecurityHeaders(await context.next());
}
