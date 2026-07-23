import type { Metadata } from "next";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/core/i18n/locale";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
  OG_IMAGE_PATH,
  FAVICON_PATH,
  GOOGLE_SITE_VERIFICATION,
  buildLangUrl,
} from "@/core/seo/siteMeta";

export type MetadataInput = {
  title: LocalizedText;
  description?: LocalizedText;
  path?: string;
  keywords?: ReadonlyArray<string> | Partial<Record<Locale, ReadonlyArray<string>>>;
  noIndex?: boolean;
};

export type LocalizedText = string | Partial<Record<Locale, string>>;

function resolveText(input: LocalizedText | undefined, locale: Locale): string {
  if (!input) return "";
  if (typeof input === "string") return input;

  return input[locale] ?? input[DEFAULT_LOCALE] ?? Object.values(input).find(Boolean) ?? "";
}

function resolveKeywords(input: MetadataInput["keywords"], locale: Locale): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return Array.from(input);

  const map = input as Partial<Record<Locale, ReadonlyArray<string>>>;
  const byLocale =
    map[locale] ??
    map[DEFAULT_LOCALE] ??
    Object.values(map).find((v) => Array.isArray(v) && v.length > 0);

  return byLocale ? Array.from(byLocale) : [];
}

function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = buildLangUrl(locale, path);
  }

  languages["x-default"] = buildLangUrl(DEFAULT_LOCALE, path);
  return languages;
}

function buildVerification(): Metadata["verification"] | undefined {
  if (!GOOGLE_SITE_VERIFICATION) return undefined;

  return {
    google: GOOGLE_SITE_VERIFICATION,
  };
}

export function buildLayoutMetadata(locale: Locale): Metadata {
  const canonical = buildLangUrl(locale, "/");
  const ogImageAbs = new URL(OG_IMAGE_PATH, SITE_ORIGIN).toString();

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    alternates: {
      canonical,
      languages: buildLanguageAlternates("/"),
    },
    verification: buildVerification(),
    openGraph: {
      type: "website",
      url: canonical,
      title: SITE_NAME,
      siteName: SITE_NAME,
      description: SITE_DESCRIPTION,
      locale,
      images: [{ url: ogImageAbs }],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [ogImageAbs],
    },
    icons: {
      icon: FAVICON_PATH,
    },
  };
}

export function buildMetadata(locale: Locale, input: MetadataInput): Metadata {
  const title = resolveText(input.title, locale);
  const description = resolveText(input.description ?? SITE_DESCRIPTION, locale);
  const path = input.path ?? "/";
  const canonical = buildLangUrl(locale, path);
  const ogImageAbs = new URL(OG_IMAGE_PATH, SITE_ORIGIN).toString();
  const keywords = resolveKeywords(input.keywords, locale);

  const metadata: Metadata = {
    metadataBase: new URL(SITE_ORIGIN),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    verification: buildVerification(),
    openGraph: {
      type: "website",
      url: canonical,
      title,
      siteName: SITE_NAME,
      description,
      locale,
      images: [{ url: ogImageAbs }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageAbs],
    },
    icons: {
      icon: FAVICON_PATH,
    },
  };

  if (keywords.length > 0) {
    metadata.keywords = keywords;
  }

  return metadata;
}
