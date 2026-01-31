// functions/_middleware.ts
type PagesContext = { request: Request; next: () => Promise<Response> };

const LOCALES = new Set(["en", "ar"]);

// locale-less routes اللي كانت تسبب duplicate قبل 301
const LOCALELESS_PREFIXES = ["about", "contact", "projects", "services", "blog"];

// هنشيل lang + أشهر tracking params عشان ما يحصلش دوبلكيت بالـ query strings
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
  // keep leading slash, collapse the rest
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

function isLocalePath(pathname: string): boolean {
  const seg = firstSegment(pathname);
  return !!seg && LOCALES.has(seg);
}

function isLocaleLessKnownRoute(pathname: string): boolean {
  const seg = firstSegment(pathname);
  if (!seg) return false;
  return LOCALELESS_PREFIXES.includes(seg);
}

function addNoSniff(res: Response): Response {
  const out = new Response(res.body, res);
  out.headers.set("X-Content-Type-Options", "nosniff");
  out.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return out;
}

export async function onRequest(context: PagesContext) {
  const url = new URL(context.request.url);

  const originalPath = url.pathname;
  const originalSearch = url.search;

  // ---- 1) Normalize pathname ----
  let pathname = collapseSlashes(url.pathname);
  pathname = stripIndexHtml(pathname);
  pathname = stripTrailingSlash(pathname);

  // sitemap-index.xml => sitemap.xml
  if (pathname === "/sitemap-index.xml") pathname = "/sitemap.xml";

  // root => /en
  if (pathname === "/") pathname = "/en";

  // locale-less known routes => prefix /en
  if (!isLocalePath(pathname) && isLocaleLessKnownRoute(pathname)) {
    pathname = `/en${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  }

  // ---- 2) Normalize query params (kill ?lang= and tracking) ----
  let changedQuery = false;
  for (const key of Array.from(url.searchParams.keys())) {
    if (STRIP_QUERY_KEYS.has(key)) {
      url.searchParams.delete(key);
      changedQuery = true;
    }
  }

  // rebuild URL if any change happened
  const changedPath = pathname !== originalPath;
  const newSearch = url.searchParams.toString();
  const rebuiltSearch = newSearch ? `?${newSearch}` : "";
  const changed = changedPath || changedQuery || originalSearch !== rebuiltSearch;

  if (changed) {
    const redirectUrl = `${url.origin}${pathname}${rebuiltSearch}`;
    return Response.redirect(redirectUrl, 301);
  }

  // ---- 3) Pass-through & add minimal security headers ----
  const res = await context.next();
  return addNoSniff(res);
}
