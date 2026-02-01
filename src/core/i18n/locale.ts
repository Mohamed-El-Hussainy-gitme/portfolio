export type Locale = "ar" | "en";

export const LOCALES = ["ar", "en"] as const;

export const DEFAULT_LOCALE: Locale = "ar";

export function isLocale(v: string | null | undefined): v is Locale {
  return v === "ar" || v === "en";
}

export function localeToDir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
