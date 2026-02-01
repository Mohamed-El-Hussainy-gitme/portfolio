import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/core/i18n/locale";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
  OG_IMAGE_PATH,
  FAVICON_PATH,
  buildLangUrl,
} from "@/core/seo/siteMeta";

// Accept metadata configuration for a page. When working with localized
// metadata we allow consumers to provide either simple strings or per-locale
// records. The `path` property identifies the locale‑less portion of the
// route (e.g. "/", "/about", "/services/my-service"). It is optional and
// defaults to the root path when omitted. To support richer SERP display we
// also expose a `keywords` property; callers may supply either a flat array
// of keywords or an object keyed by locale. When omitted, no `keywords`
// section will be emitted. Finally, `noIndex` may be set to true to
// instruct robots to avoid indexing the page.
export type MetadataInput = {
  title: LocalizedText;
  description?: LocalizedText;
  /**
   * Locale‑less path, like "/", "/about", "/services/landing-page". When
   * undefined the path defaults to "/".
   */
  path?: string;
  /**
   * Optional keywords. May be a flat array of strings applied to all
   * locales or an object keyed by locale with arrays of keywords. When
   * undefined, no keywords will be added to the metadata.
   */
  keywords?: ReadonlyArray<string> | Partial<Record<Locale, ReadonlyArray<string>>>;
  noIndex?: boolean;
};

export type LocalizedText = string | Partial<Record<Locale, string>>;

function resolveText(input: LocalizedText | undefined, locale: Locale): string {
  if (!input) return "";
  if (typeof input === "string") return input;

  // Prefer exact locale, then default locale, then any available value.
  return (
    input[locale] ??
    input[DEFAULT_LOCALE] ??
    Object.values(input).find(Boolean) ??
    ""
  );
}

function resolveKeywords(input: MetadataInput["keywords"], locale: Locale): string[] {
  if (!input) return [];
  // If a plain array is provided it applies to all locales.
  if (Array.isArray(input)) return Array.from(input);
  // Otherwise fall back to locale specific or default keywords.
  //
  // NOTE: `Array.isArray()` does not narrow `ReadonlyArray<T>` in a union well
  // enough for some TS versions (notably the one bundled with VSCode for some
  // users), which can cause TS7053 on `input[locale]`. To keep this strict and
  // type-safe, we explicitly treat this branch as the locale-keyed object.
  const map = input as Partial<Record<Locale, ReadonlyArray<string>>>;
  const byLocale =
    map[locale] ??
    map[DEFAULT_LOCALE] ??
    Object.values(map).find((v) => Array.isArray(v) && v.length > 0);

  return byLocale ? Array.from(byLocale) : [];
}

export function buildMetadata(locale: Locale, input: MetadataInput): Metadata {
  const title = resolveText(input.title, locale);
  const description = resolveText(input.description ?? SITE_DESCRIPTION, locale);

  // Default the path to the root. Normalize undefined and empty strings.
  const path = input.path ?? "/";

  const canonical = buildLangUrl(locale, path);

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = buildLangUrl(l, path);
  }
  languages["x-default"] = buildLangUrl(DEFAULT_LOCALE, path);

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
      languages,
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
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
  // Only add keywords when provided.
  if (keywords.length > 0) {
    // Next.js metadata supports keywords as string[]; convert any readonly
    // tuples/arrays to a mutable array.
    metadata.keywords = keywords;
  }
  return metadata;
}
