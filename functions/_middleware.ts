type PagesContext = { request: Request; next: () => Promise<Response> };

import { DEFAULT_LOCALE, isLocale, localeToDir, type Locale } from "../src/core/i18n/locale";

const BYPASS = new Set([
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.svg",
  "/og-cover.png",
  "/llms.txt",
  "/ai.txt",
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

export async function onRequest(context: PagesContext) {
  const url = new URL(context.request.url);

  const originalPath = url.pathname;
  const originalSearch = url.search;

  let pathname = normalize(url.pathname);

  // 1) BYPASS system SEO files + assets
  if (BYPASS.has(pathname) || isAsset(pathname)) {
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
  if (hasLocale) targetLocale = (seg as Locale);
  if (desiredLocale) targetLocale = desiredLocale;

  // If no locale in path → redirect to /{targetLocale}{pathname}
  if (!hasLocale) {
    pathname = pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;
  } else if (desiredLocale && hasLocale && (seg as Locale) !== desiredLocale) {
    // Replace locale prefix
    const rest = `/${pathname.split("/").filter(Boolean).slice(1).join("/")}`;
    pathname = rest === "/" ? `/${desiredLocale}` : `/${desiredLocale}${rest}`;
  }

  // 3) Strip tracking params (keep it minimal — لا تلمس حاجات تانية)
  const STRIP = new Set(["lang", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]);
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
  // (اختياري) تقدر تضيف هيدر dir/lang لكن الأفضل HtmlLangSync داخل Next
  return addSecurityHeaders(res);
}
