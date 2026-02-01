export type Locale = "ar" | "en";

export const LOCALES = ["ar", "en"] as const;

/**
 * Normalizes any input to a supported locale.
 * - Defaults to Arabic because the primary audience is Arabic.
 * - Defensive only; generateStaticParams + dynamicParams=false ensures only ar/en are built.
 */
export function normalizeLocale(input: string | undefined | null): Locale {
  return input === "en" ? "en" : "ar";
}
