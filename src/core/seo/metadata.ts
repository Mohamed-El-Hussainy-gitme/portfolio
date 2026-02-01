import type { Metadata } from "next";
import { SITE_NAME, SITE_ORIGIN, buildLangUrl, type SiteLocale } from "./siteMeta";

export type SeoInput = {
  pathname: string; // locale-less: "/" | "/about" | "/blog/x"
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  keywords?: { en: ReadonlyArray<string>; ar: ReadonlyArray<string> };
  ogImage?: string; // absolute or "/file"
};

function toAbs(urlOrPath: string): string {
  if (!urlOrPath) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const p = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return `${SITE_ORIGIN}${p}`;
}

export function buildMetadata(locale: SiteLocale, input: SeoInput): Metadata {
  // Important: Root layout already applies the title template: `%s | SITE_NAME`
  const title = input.title[locale];
  const description = input.description[locale];

  const canonical = buildLangUrl(input.pathname, locale);
  const languages = {
    en: buildLangUrl(input.pathname, "en"),
    ar: buildLangUrl(input.pathname, "ar"),
  };

  const ogImage = input.ogImage ? toAbs(input.ogImage) : `${SITE_ORIGIN}/og-cover.png`;
  const keywords = input.keywords ? [...input.keywords[locale]] : undefined;

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title,
    description,
    keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}
