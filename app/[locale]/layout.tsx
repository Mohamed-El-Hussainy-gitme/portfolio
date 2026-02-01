import type { ReactNode } from "react";
import { LOCALES, DEFAULT_LOCALE, isLocale, localeToDir, type Locale } from "@/core/i18n/locale";

export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  // Next.js 15 types this as a Promise
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dir = localeToDir(locale);

  // Root <html> stays in app/layout.tsx.
  // We still add correct lang/dir for content + accessibility.
  return (
    <div lang={locale} dir={dir} className="min-h-screen">
      {children}
    </div>
  );
}
