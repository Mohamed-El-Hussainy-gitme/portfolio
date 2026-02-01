import { DEFAULT_LOCALE, isLocale, type Locale } from "../src/core/i18n/locale";

type PagesContext = { request: Request; next: (req?: Request) => Promise<Response> };

const BYPASS = new Set([
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
  "/ai.txt",
  "/favicon.svg",
  "/og-cover.svg",
  "/og-cover.png",
  "/googlebfee5bd7eb86337c.html",
]);

function isAsset(pathname: string): boolean {
  if (pathname.startsWith("/_next/")) return true;
  if (pathname.startsWith("/assets/")) return true;
  if (pathname.startsWith("/brand/")) return true;
  if (pathname.startsWith("/reviews/")) return true;
  if (pathname.startsWith("/skills/")) return true;

  return (
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".map") ||
    pathname.endsWith(".txt") ||
    pathname.endsWith(".xml")
  );
}

function normalize(pathname: string): string {
  let p = pathname.replace(/\/{2,}/g, "/");
  if (p === "/index.html") p = "/";
  if (p.endsWith("/index.html")) p = p.slice(0, -"/index.html".length) || "/";
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

function addSecurityHeaders(res: Response): Response {
  const out = new Response(res.body, res);
  out.headers.set("X-Content-Type-Options", "nosniff");
  out.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return out;
}

function firstSeg(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  return parts[0] ?? null;
}

function stripConditionalHeaders(headers: Headers) {
  headers.delete("if-none-match");
  headers.delete("if-modified-since");
  headers.delete("if-match");
  headers.delete("if-unmodified-since");
  headers.delete("if-range");
  return headers;
}

export async function onRequest(context: PagesContext) {
  const url = new URL(context.request.url);

  const originalPath = url.pathname;
  const originalSearch = url.search;

  let pathname = normalize(url.pathname);

  // 0) SYSTEM FILES: rewrite داخلي + امنع 304 + امنع 301 للـ / في آخر الرابط
  if (BYPASS.has(pathname)) {
    const nextUrl = new URL(context.request.url);
    nextUrl.pathname = pathname; // يضمن أن /sitemap.xml/ تصبح /sitemap.xml بدون Redirect

    const headers = stripConditionalHeaders(new Headers(context.request.headers));

    // keep method (GET/HEAD) كما هو
    const nextReq = new Request(nextUrl.toString(), {
      method: context.request.method,
      headers,
    });

    const res = await context.next(nextReq);
    return addSecurityHeaders(res);
  }

  // 1) BYPASS assets (بدون لمس locale redirects)
  if (isAsset(pathname)) {
    // لو فيه تطبيع (//, index.html, trailing slash) نعمل rewrite داخلي بدل redirect
    if (pathname !== originalPath) {
      const nextUrl = new URL(context.request.url);
      nextUrl.pathname = pathname;

      const nextReq = new Request(nextUrl.toString(), {
        method: context.request.method,
        headers: new Headers(context.request.headers),
      });

      const res = await context.next(nextReq);
      return addSecurityHeaders(res);
    }

    const res = await context.next();
    return addSecurityHeaders(res);
  }

  // 2) Force locale prefix for all non-asset pages
  const seg = firstSeg(pathname);
  const hasLocale = isLocale(seg);

  // Optional: allow ?lang=en|ar to switch
  const langParam = url.searchParams.get("lang");
  const desiredLocale: Locale | null = isLocale(langParam) ? langParam : null;

  let targetLocale: Locale = DEFAULT_LOCALE;
  if (hasLocale) targetLocale = seg as Locale;
  if (desiredLocale) targetLocale = desiredLocale;

  // If no locale in path → redirect to /{targetLocale}{pathname}
  if (!hasLocale) {
    pathname = pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;
  } else if (desiredLocale && hasLocale && (seg as Locale) !== desiredLocale) {
    // Replace locale prefix
    const rest = `/${pathname.split("/").filter(Boolean).slice(1).join("/")}`;
    pathname = rest === "/" ? `/${desiredLocale}` : `/${desiredLocale}${rest}`;
  }

  // 3) Strip tracking params
  const STRIP = new Set([
    "lang",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
  ]);

  let changedQuery = false;
  for (const k of Array.from(url.searchParams.keys())) {
    if (STRIP.has(k)) {
      url.searchParams.delete(k);
      changedQuery = true;
    }
  }

  const newSearch = url.searchParams.toString();
  const rebuiltSearch = newSearch ? `?${newSearch}` : "";

  const changedPath = pathname !== originalPath;
  const changed = changedPath || changedQuery || originalSearch !== rebuiltSearch;

  if (changed) {
    const redirectUrl = `${url.origin}${pathname}${rebuiltSearch}`;
    const res = Response.redirect(redirectUrl, 301);
    return addSecurityHeaders(res);
  }

  const res = await context.next();
  return addSecurityHeaders(res);
}
