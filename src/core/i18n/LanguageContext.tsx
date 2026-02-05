"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { DEFAULT_LOCALE, localeToDir, type Locale } from "./locale";
import { withLocale } from "./links";

export type Direction = "ltr" | "rtl";
export type Language = Locale;

type LangPathInfo = {
  locale: Locale;
  restPath: string;
};

export type LanguageContextValue = {
  language: Locale;
  direction: Direction;

  setLanguage: (next: Locale) => void;
  toggleLanguage: () => void;

  href: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function normalizePath(input: string): string {
  if (!input) return "/";
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (input.startsWith("#") || input.startsWith("mailto:") || input.startsWith("tel:")) return input;
  return input.startsWith("/") ? input : `/${input}`;
}

/**
 * FINAL ROUTE RULESET parser:
 * - "/ar" or "/ar/..." => locale=ar, restPath = "/" or "/..."
 * - otherwise => locale=en, restPath = pathname
 *
 * (Also strips legacy "/en" if it ever appears, for safety.)
 */
function parsePathname(pathname: string | null): LangPathInfo {
  const path = normalizePath(pathname ?? "/");

  // Match "/ar" or "/ar/..."
  if (path === "/ar") return { locale: "ar", restPath: "/" };
  if (path.startsWith("/ar/")) return { locale: "ar", restPath: path.slice(3) || "/" };

  // Safety: legacy "/en" or "/en/..."
  if (path === "/en") return { locale: "en", restPath: "/" };
  if (path.startsWith("/en/")) return { locale: "en", restPath: path.slice(3) || "/" };

  return { locale: DEFAULT_LOCALE, restPath: path };
}

function stripLocalePrefix(path: string): string {
  const p = normalizePath(path);

  if (p === "/ar") return "/";
  if (p.startsWith("/ar/")) return p.slice(3) || "/";

  // Safety: legacy "/en"
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) return p.slice(3) || "/";

  return p;
}

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage?: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const initial = useMemo(() => {
    if (initialLanguage) return initialLanguage;
    return parsePathname(pathname).locale;
  }, [initialLanguage, pathname]);

  const [language, setLanguageState] = useState<Locale>(initial);

  useEffect(() => {
    const parsed = parsePathname(pathname);
    if (parsed.locale !== language) setLanguageState(parsed.locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const direction = useMemo(() => localeToDir(language), [language]);

  const setLanguage = (next: Locale) => {
    setLanguageState(next);

    const current = normalizePath(pathname ?? "/");
    if (current.startsWith("http://") || current.startsWith("https://") || current.startsWith("#")) return;

    const rest = stripLocalePrefix(current);
    const target = withLocale(next, rest);
    router.push(target);
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");

  const href = (path: string) => {
    const normalized = normalizePath(path);

    if (
      normalized.startsWith("http://") ||
      normalized.startsWith("https://") ||
      normalized.startsWith("#") ||
      normalized.startsWith("mailto:") ||
      normalized.startsWith("tel:")
    ) {
      return normalized;
    }

    const rest = stripLocalePrefix(normalized);
    return withLocale(language, rest);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ language, direction, setLanguage, toggleLanguage, href }),
    [language, direction],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
