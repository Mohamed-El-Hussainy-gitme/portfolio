"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

type LanguageContextValue = {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  href: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isSupportedLocale(v: string): v is Language {
  return v === "en" || v === "ar";
}

function getLocaleFromPath(pathname: string): Language | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isSupportedLocale(first) ? first : null;
}

function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (isSupportedLocale(parts[0])) parts.shift();
  return `/${parts.join("/")}` || "/";
}

function withLocale(pathname: string, locale: Language): string {
  const clean = stripLocalePrefix(pathname);
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value) || /^mailto:/i.test(value) || /^tel:/i.test(value);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();

  const [language, setLanguageState] = useState<Language>(() => getLocaleFromPath(pathname) || "ar");

  useEffect(() => {
    const fromPath = getLocaleFromPath(pathname);
    if (fromPath && fromPath !== language) setLanguageState(fromPath);
  }, [pathname, language]);

  const direction: Direction = language === "ar" ? "rtl" : "ltr";

  const href = useMemo(() => {
    return (to: string) => {
      if (!to) return withLocale(pathname, language);
      if (isExternalUrl(to)) return to;

      if (to.startsWith("#")) return withLocale(pathname, language) + to;

      const base = to.startsWith("/") ? to : `/${to}`;
      return withLocale(base, language);
    };
  }, [language, pathname]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const toggleLanguage = () => {
    const next = language === "ar" ? "en" : "ar";
    setLanguageState(next);

    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);

    u.pathname = withLocale(u.pathname, next);
    u.searchParams.delete("lang");
    router.push(u.pathname + u.search + u.hash);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ language, direction, toggleLanguage, setLanguage, href }),
    [language, direction, href]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
