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
  // any file with extension -> treat as asset (e.g. .png, .css, .js, .xml, .txt)
  const last = pathname.split("/").pop() || "";
  return last.includes(".") && !last.startsWith("."); // ignore "/.well-known" patterns
}

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function normalizePathname(pathname: string): string {
  // collapse multiple slashes, ensure leading slash
  let p = pathname || "/";
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/{2,}/g, "/");
  // remove trailing slash except root
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
  // "/en/index.html" -> "/en"
  // "/en/projects/index.html" -> "/en/projects"
  // "/index.html" -> "/"
  if (pathname === "/index.html") return "/";
  if (pathname.endsWith("/index.html")) {
    const base = pathname.slice(0, -"/index.html".length);
    return base === "" ? "/" : base;
  }
  return null;
}

function buildRedirectResponse(url: URL, targetPathname: string): Response {
  const target = new URL(url.toString());
  target.pathname = targetPathname;
  // preserve query string
  return new Response(null, {
    status: 301,
    headers: {
      Location: target.toString(),
      // good practice: avoid caching wrong redirects during tests
      "Cache-Control": "public, max-age=300",
    },
  });
}

export async function onRequest(context: PagesContext) {
  const { request } = context;
  const url = new URL(request.url);

  const originalPath = url.pathname;
  const pathname = normalizePathname(originalPath);

  // 0) Prevent duplicate URLs: "/.../index.html"
  // Cloudflare Pages can serve both "/en" and "/en/index.html".
  // We redirect index.html to the canonical path.
  const withoutIndex = stripIndexHtml(pathname);
  if (withoutIndex !== null) {
    if (withoutIndex === "/") {
      return buildRedirectResponse(url, `/${DEFAULT_LOCALE}`);
    }
    return buildRedirectResponse(url, withoutIndex);
  }

  // Pass-through: known system files
  if (PASSTHROUGH_PATHS.has(pathname)) {
    return context.next();
  }

  // Pass-through: assets and _next (safety)
  if (pathname.startsWith("/_next") || isAssetPath(pathname) || pathname.startsWith("/images")) {
    // also normalize asset trailing slash (rare)
    if (originalPath !== pathname) return buildRedirectResponse(url, pathname);
    return context.next();
  }

  // 1) Root "/" -> "/en"
  if (pathname === "/") {
    return buildRedirectResponse(url, `/${DEFAULT_LOCALE}`);
  }

  // 2) Canonicalize trailing slashes, multiple slashes, ...
  if (originalPath !== pathname) {
    return buildRedirectResponse(url, pathname);
  }

  const first = getFirstSegment(pathname);

  // 3) Missing locale prefix -> redirect to default locale + same path
  if (!LOCALES.has(first)) {
    const base = stripLocalePrefix(pathname); // usually same as pathname here
    const target = base === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${base}`;
    return buildRedirectResponse(url, target);
  }

  // 4) Locale-prefixed route: already normalized.
  return context.next();
}
