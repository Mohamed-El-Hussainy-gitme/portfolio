interface Env {}

type PagesContext = {
  request: Request;
  next: () => Promise<Response>;
  env: Env;
};

const LOCALES = ["en", "ar"] as const;
type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = "en";
const LOCALE_COOKIE = "LANG";

const BYPASS_PREFIXES = ["/_next/", "/api/", "/static/", "/images/", "/favicon"];
const BYPASS_EXT = /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|json|xml|txt)$/i;

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

function getLocaleFromPathname(pathname: string): Locale | null {
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(seg) ? seg : null;
}

function getCookieLocale(cookieHeader: string | null): Locale | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)LANG=([^;]+)/);
  if (!match) return null;
  const val = decodeURIComponent(match[1] ?? "").trim();
  return isLocale(val) ? val : null;
}

function getBestLocale(request: Request): Locale {
  const cookieLocale = getCookieLocale(request.headers.get("Cookie"));
  if (cookieLocale) return cookieLocale;

  const accept = request.headers.get("Accept-Language");
  if (!accept) return DEFAULT_LOCALE;

  const candidates = accept
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [tagRaw, ...params] = part.split(";").map((x) => x.trim());
      const tag = (tagRaw || "").toLowerCase();
      let q = 1;
      for (const p of params) {
        if (p.startsWith("q=")) {
          const v = Number(p.slice(2));
          if (!Number.isNaN(v)) q = v;
        }
      }
      return { tag, q };
    })
    .sort((a, b) => b.q - a.q);

  for (const c of candidates) {
    const base = c.tag.split("-")[0] ?? "";
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

function shouldBypass(pathname: string): boolean {
  if (BYPASS_EXT.test(pathname)) return true;
  return BYPASS_PREFIXES.some((p) => pathname.startsWith(p));
}

function normalizePathname(pathname: string): string {
  let out = pathname.replace(/\/{2,}/g, "/");
  if (out.length > 1) out = out.replace(/\/+$/, "");
  return out;
}

function redirectWithLangCookie(url: URL, pathname: string, locale: Locale): Response {
  const target = new URL(url.toString());
  target.pathname = pathname;

  const res = Response.redirect(target.toString(), 302);
  res.headers.append(
    "Set-Cookie",
    `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`
  );
  res.headers.set("Vary", "Accept-Language, Cookie");
  return res;
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const { request, next } = context;

  const url = new URL(request.url);
  const originalPath = url.pathname;

  if (shouldBypass(originalPath)) {
    return next();
  }

  // Canonicalize path shape (permanent)
  const normalized = normalizePathname(originalPath);
  if (normalized !== originalPath) {
    url.pathname = normalized;
    return Response.redirect(url.toString(), 308);
  }

  // Already locale-prefixed
  const localeInPath = getLocaleFromPathname(normalized);
  if (localeInPath) {
    return next();
  }

  // Enforce locale prefix
  const best = getBestLocale(request);

  if (normalized === "/") {
    return redirectWithLangCookie(url, `/${best}`, best);
  }

  return redirectWithLangCookie(url, `/${best}${normalized}`, best);
};
