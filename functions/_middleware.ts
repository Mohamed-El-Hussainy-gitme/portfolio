// functions/_middleware.ts

type PagesContext = { request: Request; next: () => Promise<Response> };

type Locale = "en" | "ar";
const LOCALES = new Set<Locale>(["en", "ar"]);

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
  return !!seg && (seg === "en" || seg === "ar");
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

export async function onRequest(context: PagesContext) {
  const url = new URL(context.request.url);

  const originalPath = url.pathname;
  const originalSearch = url.search;

  // ---- A) Normalize pathname ----
  let pathname = collapseSlashes(url.pathname);
  pathname = stripIndexHtml(pathname);
  pathname = stripTrailingSlash(pathname);

  // ✅ FIX 1: favicon.ico fallback -> favicon.svg
  if (pathname === "/favicon.ico") {
    const res = Response.redirect(`${url.origin}/favicon.svg`, 301);
    return addSecurityHeaders(res);
  }

  // ✅ FIX 2: hard bypass for system/seo files + og-cover + favicon
  const BYPASS = new Set([
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/ai.txt",
    "/googlebfee5bd7eb86337c.html",
    "/favicon.svg",
    "/og-cover.png",
  ]);

  if (BYPASS.has(pathname)) {
    // still strip tracking params if present
    let changedQuery = false;
    for (const key of Array.from(url.searchParams.keys())) {
      if (STRIP_QUERY_KEYS.has(key)) {
        url.searchParams.delete(key);
        changedQuery = true;
      }
    }
    const newSearch = url.searchParams.toString();
    const rebuiltSearch = newSearch ? `?${newSearch}` : "";

    const changed = pathname !== originalPath || changedQuery || originalSearch !== rebuiltSearch;
    if (changed) {
      const res = Response.redirect(`${url.origin}${pathname}${rebuiltSearch}`, 301);
      return addSecurityHeaders(res);
    }

    const res = await context.next();
    return addSecurityHeaders(res);
  }

  // ---- B) Detect desired locale from ?lang= (if present) ----
  let desiredLocale: Locale | null = null;
  const langParam = url.searchParams.get("lang");
  if (langParam === "en" || langParam === "ar") desiredLocale = langParam;

  // ---- C) Canonicalize root + locale-less known routes ----
  if (pathname === "/") {
    // أنت قلت الأغلبية عربي — خلي الافتراضي ar (أو غيّرها لو تحب)
    pathname = `/${desiredLocale ?? "ar"}`;
  }

  if (!isLocalePath(pathname) && isLocaleLessKnownRoute(pathname)) {
    pathname = `/${desiredLocale ?? "ar"}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  }

  if (desiredLocale && isLocalePath(pathname)) {
    pathname = withLocale(pathname, desiredLocale);
  }

  // ---- D) Strip query params (lang + tracking) ----
  let changedQuery = false;
  for (const key of Array.from(url.searchParams.keys())) {
    if (STRIP_QUERY_KEYS.has(key)) {
      url.searchParams.delete(key);
      changedQuery = true;
    }
  }

  // ---- E) Asset pass-through (after normalization) ----
  if (isAssetOrNext(pathname)) {
    const newSearch = url.searchParams.toString();
    const rebuiltSearch = newSearch ? `?${newSearch}` : "";
    const changed = pathname !== originalPath || changedQuery || originalSearch !== rebuiltSearch;

    if (changed) {
      const res = Response.redirect(`${url.origin}${pathname}${rebuiltSearch}`, 301);
      return addSecurityHeaders(res);
    }

    const res = await context.next();
    return addSecurityHeaders(res);
  }

  // ---- F) Redirect if changed ----
  const newSearch = url.searchParams.toString();
  const rebuiltSearch = newSearch ? `?${newSearch}` : "";

  const changedPath = pathname !== originalPath;
  const changed = changedPath || changedQuery || originalSearch !== rebuiltSearch;

  if (changed) {
    const res = Response.redirect(`${url.origin}${pathname}${rebuiltSearch}`, 301);
    return addSecurityHeaders(res);
  }

  // ---- G) Pass-through ----
  const res = await context.next();
  return addSecurityHeaders(res);
}
