// functions/_middleware.ts

type PagesContext = { request: Request; next: () => Promise<Response> };

type Locale = "en" | "ar";

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

// System / SEO files that must never be locale-rewritten
const SEO_BYPASS = new Set([
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.svg",
  "/googlebfee5bd7eb86337c.html",
  "/llms.txt",
  "/ai.txt",
  "/og-cover.svg",
]);

// Legacy / duplicate sitemap paths → force single canonical sitemap
const LEGACY_SITEMAPS = new Set([
  "/sitemap-index.xml",
  "/sitemap-en.xml",
  "/sitemap-ar.xml",
  "/en/sitemap.xml",
  "/ar/sitemap.xml",
]);

function collapseSlashes(pathname: string): string {
  return pathname.replace(/\/{2,}/g, "/");
}

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

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

function redirect(origin: string, pathname: string, search: string, status: 301 | 302 = 301) {
  const url = `${origin}${pathname}${search}`;
  return Response.redirect(url, status);
}

export async function onRequest(context: PagesContext) {
  const url = new URL(context.request.url);
  // Force all legacy sitemap endpoints to the single canonical sitemap
const LEGACY_SITEMAPS = new Set([
  "/sitemap-index.xml",
  "/sitemap-en.xml",
  "/sitemap-ar.xml",
  "/en/sitemap.xml",
  "/ar/sitemap.xml",
]);

if (LEGACY_SITEMAPS.has(url.pathname)) {
  return Response.redirect(`${url.origin}/sitemap.xml`, 301);
}


  const originalPath = url.pathname;
  const originalSearch = url.search;

  // ---- A) Normalize path (canonical) ----
  let pathname = collapseSlashes(url.pathname);
  pathname = stripIndexHtml(pathname);
  pathname = stripTrailingSlash(pathname);

  // ---- B) Force single sitemap URL (kills duplicates forever) ----
  if (LEGACY_SITEMAPS.has(pathname)) {
    return redirect(url.origin, "/sitemap.xml", "", 301);
  }

  // ---- C) System/SEO files: strip ANY query then pass-through ----
  if (SEO_BYPASS.has(pathname)) {
    // also canonicalize if user hits /sitemap.xml?x or /robots.txt?x
    if (url.search) {
      return redirect(url.origin, pathname, "", 301);
    }
    // if path got normalized (index.html or trailing slash), redirect to canonical
    if (pathname !== originalPath) {
      return redirect(url.origin, pathname, "", 301);
    }
    return context.next();
  }

  // ---- D) Assets pass-through ----
  if (isAssetOrNext(pathname)) {
    return context.next();
  }

  // ---- E) Detect desired locale from ?lang= (legacy) ----
  // We keep this ONLY to migrate old links. We will REMOVE the parameter from the final URL.
  let desiredLocale: Locale | null = null;
  const langParam = url.searchParams.get("lang");
  if (langParam === "en" || langParam === "ar") desiredLocale = langParam;

  // ---- F) Canonicalize root + locale-less known routes ----
  if (pathname === "/") {
    pathname = `/${desiredLocale ?? "en"}`;
  }

  if (!isLocalePath(pathname) && isLocaleLessKnownRoute(pathname)) {
    pathname = `/${desiredLocale ?? "en"}${pathname}`;
  }

  if (desiredLocale && isLocalePath(pathname)) {
    pathname = withLocale(pathname, desiredLocale);
  }

  // ---- G) Strip query params (lang + tracking) ----
  let changedQuery = false;
  for (const key of Array.from(url.searchParams.keys())) {
    if (STRIP_QUERY_KEYS.has(key)) {
      url.searchParams.delete(key);
      changedQuery = true;
    }
  }

  const newSearch = url.searchParams.toString();
  const rebuiltSearch = newSearch ? `?${newSearch}` : "";

  const changedPath = pathname !== originalPath;
  const changedSearch = originalSearch !== rebuiltSearch;

  if (changedPath || changedQuery || changedSearch) {
    return redirect(url.origin, pathname, rebuiltSearch, 301);
  }

  // ---- H) Pass-through ----
  const res = await context.next();
  return addSecurityHeaders(res);
}
