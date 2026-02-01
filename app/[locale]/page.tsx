import type { Metadata } from "next";
import HomePage from "@/views/HomePage";
import { buildMetadata } from "@/core/seo/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/core/i18n/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  const title = locale === "ar" ? "ملف أعمال مطور ويب" : "Web Developer Portfolio";
  const description =
    locale === "ar"
      ? "مشاريع، خدمات، ومدونة — SEO تقني وأداء وتجربة عربية/إنجليزية بدون خلط."
      : "Projects, services, and blog — technical SEO, performance, and bilingual (AR/EN) UX.";

  return buildMetadata(locale, { title, description });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <HomePage locale={locale} />;
}