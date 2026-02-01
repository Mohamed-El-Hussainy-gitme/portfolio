import type { Metadata } from "next";

import { DEFAULT_LOCALE, type Locale } from "@/core/i18n/locale";
import { buildLangUrl, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/core/seo/siteMeta";

export type Localized<T> = T | Readonly<Record<Locale, T>>;

type Keywords = ReadonlyArray<string>;

type OpenGraphType = "website" | "article";

export type MetadataInput = {
  /** Site-relative path without locale prefix (e.g. "/blog/my-post"). */
  path: string;
  title: Localized<string>;
  description: Localized<string>;
  keywords?: Localized<Keywords>;
  ogImage?: string;
  ogType?: OpenGraphType;
  noindex?: boolean;
};

function pickLocalized<T>(value: Localized<T> | undefined, locale: Locale): T | undefined {
  if (value === undefined) return undefined;

  // "value" is either a direct T or a Record<Locale, T>
  if (typeof value === "object" && value !== null && ("en" in value || "ar" in value)) {
    const rec = value as Record<Locale, T>;
    return rec[locale] ?? rec[DEFAULT_LOCALE];
  }

  return value as T;
}

function safePath(p: string): string {
  if (!p) return "/";
  return p.startsWith("/") ? p : `/${p}`;
}

export function buildMetadata(locale: Locale, input: MetadataInput): Metadata {
  const path = safePath(input.path);
  const canonical = buildLangUrl(locale, path);

  const title = pickLocalized(input.title, locale) ?? SITE_NAME;
  const description = pickLocalized(input.description, locale) ?? SITE_DESCRIPTION;

  const rawKeywords = pickLocalized(input.keywords, locale);
  // Next's Metadata type wants a mutable string[] (not readonly tuples).
  const keywords = rawKeywords ? [...rawKeywords] : undefined;

  const ogImage = input.ogImage ?? new URL("/og-cover.png", SITE_ORIGIN).toString();
  const ogType: OpenGraphType = input.ogType ?? "website";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: buildLangUrl("en", path),
        ar: buildLangUrl("ar", path),
      },
    },
    keywords,
    robots: input.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            // Safer defaults for snippets/previews
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType,
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
