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
  // IMPORTANT:
  // Do NOT append SITE_NAME here because app/layout.tsx already has title.template
  const pageTitle = input.title[locale];
  const description = input.description[locale];

  const canonical = buildLangUrl(input.pathname, locale);
  const languages = {
    en: buildLangUrl(input.pathname, "en"),
    ar: buildLangUrl(input.pathname, "ar"),
  };

  const ogImage = input.ogImage ? toAbs(input.ogImage) : `${SITE_ORIGIN}/og-cover.svg`;
  const keywords = input.keywords ? [...input.keywords[locale]] : undefined;

  // OpenGraph/Twitter titles can include SITE_NAME safely (no template applied)
  const socialTitle = `${pageTitle} | ${SITE_NAME}`;

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: pageTitle,
    description,
    keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}
