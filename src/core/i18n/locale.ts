export const SUPPORTED_LOCALES = ["en", "ar"] as const;

export const LOCALES = SUPPORTED_LOCALES;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const DIR_BY_LOCALE: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function localeToDir(locale: Locale): "ltr" | "rtl" {
  return DIR_BY_LOCALE[locale];
}
