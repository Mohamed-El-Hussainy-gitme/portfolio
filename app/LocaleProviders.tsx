"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";

import { LanguageProvider } from "@/core/i18n/LanguageContext";
import type { Locale } from "@/core/i18n/locale";
import ScrollToHash from "@/core/router/ScrollToHash";
import PageLayout from "@/layout/PageLayout";

export default function LocaleProviders({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <LanguageProvider initialLanguage={locale}>
      <PageLayout>
        <Suspense fallback={null}>
          <ScrollToHash />
        </Suspense>
        {children}
      </PageLayout>
    </LanguageProvider>
  );
}
