type PagesContext = {
  request: Request;
  next: (req?: Request) => Promise<Response>;
};

const DEFAULT_LOCALE = "en";
const LOCALES = new Set(["en", "ar"]);

// Paths that must never be locale-redirected
const PASSTHROUGH_PATHS = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/favicon.svg",
  "/manifest.json",
  "/llms.txt",
  "/ai.txt",
]);

function isAssetPath(pathname: string): boolean {
  // Treat typical static assets as pass-through, BUT NOT ".html"
  const last = pathname.split("/").pop() || "";
  if (!last.includes(".") || last.startsWith(".")) return false;

  // we will redirect .html to clean URLs
  if (last.toLowerCase().endsWith(".html")) return false;

  return true;
}

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function normalizePathname(pathname: string): string {
  let p = pathname || "/";
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/{2,}/g, "/");
  p = stripTrailingSlash(p);
  return p;
}

function getFirstSegment(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg || "";
}

function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  const first = parts[0];
  if (LOCALES.has(first)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

function stripIndexHtml(pathname: string): string | null {
  if (pathname === "/index.html") return "/";
  if (pathname.endsWith("/index.html")) {
    const base = pathname.slice(0, -"/index.html".length);
    return base === "" ? "/" : base;
  }
  return null;
}

function stripHtmlExtension(pathname: string): string | null {
  if (!pathname.toLowerCase().endsWith(".html")) return null;

  // keep Google verification files intact
  if (/^\/google[a-z0-9]+\.html$/i.test(pathname)) return null;

  // keep 404.html as-is
  if (pathname === "/404.html") return null;

  const base = pathname.slice(0, -".html".length);
  return base === "" ? "/" : base;
}

function buildRedirectResponse(url: URL, targetPathname: string): Response {
  const target = new URL(url.toString());
  target.pathname = targetPathname;
  return new Response(null, {
    status: 301,
    headers: {
      Location: target.toString(),
      "Cache-Control": "public, max-age=300",
    },
  });
}

export async function onRequest(context: PagesContext) {
  const { request } = context;
  const url = new URL(request.url);

  const originalPath = url.pathname;
  const pathname = normalizePathname(originalPath);

  // 0) Redirect ".../index.html" -> canonical path
  const withoutIndex = stripIndexHtml(pathname);
  if (withoutIndex !== null) {
    if (withoutIndex === "/") return buildRedirectResponse(url, `/${DEFAULT_LOCALE}`);
    return buildRedirectResponse(url, withoutIndex);
  }

  // 0.5) Redirect any ".html" -> clean URL (prevents duplicates)
  const withoutHtml = stripHtmlExtension(pathname);
  if (withoutHtml !== null) {
    if (withoutHtml === "/") return buildRedirectResponse(url, `/${DEFAULT_LOCALE}`);
    return buildRedirectResponse(url, withoutHtml);
  }

  // Pass-through: known system files
  if (PASSTHROUGH_PATHS.has(pathname)) {
    return context.next();
  }

  // Pass-through: assets and _next
  if (pathname.startsWith("/_next") || isAssetPath(pathname) || pathname.startsWith("/images")) {
    if (originalPath !== pathname) return buildRedirectResponse(url, pathname);
    return context.next();
  }

  // 1) Root "/" -> "/en"
  if (pathname === "/") {
    return buildRedirectResponse(url, `/${DEFAULT_LOCALE}`);
  }

  // 2) Canonicalize slashes
  if (originalPath !== pathname) {
    return buildRedirectResponse(url, pathname);
  }

  const first = getFirstSegment(pathname);

  // 3) Missing locale -> redirect to default locale
  if (!LOCALES.has(first)) {
    const base = stripLocalePrefix(pathname);
    const target = base === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${base}`;
    return buildRedirectResponse(url, target);
  }

  return context.next();
}
