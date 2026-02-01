import type { ReactNode } from "react";
import { normalizeLocale, LOCALES } from "@/core/i18n/locale";

export const dynamicParams = false;

export function generateStaticParams() {
  // Arabic first (primary audience), then English
  return LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      {children}
    </div>
  );
}
