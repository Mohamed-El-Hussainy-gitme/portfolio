import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import LocaleProviders from "./providers";
import { SUPPORTED_LOCALES, isLocale, type Locale } from "@/core/i18n/locale";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: string }> {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return <LocaleProviders locale={locale as Locale}>{children}</LocaleProviders>;
}
