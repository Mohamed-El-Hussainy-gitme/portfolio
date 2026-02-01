import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { buildMetadata } from "@/core/seo/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/core/i18n/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  const title = locale === "ar" ? "من أنا" : "About";
  const description =
    locale === "ar"
      ? "نبذة عني، المهارات، وطريقة العمل لبناء مواقع سريعة ومحسنة لمحركات البحث."
      : "About me, skills, and my approach to building fast, SEO-friendly websites.";

  return buildMetadata(locale, { title, description, path: "/about" });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <AboutPage locale={locale} />;
}