import { LOCALES } from "@/core/i18n/locale";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage";
import { buildMetadata } from "@/core/seo/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/core/i18n/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  const title = locale === "ar" ? "تواصل" : "Contact";
  const description =
    locale === "ar"
      ? "تواصل لطلب عرض سعر أو خطة تنفيذ: مواقع شركات، متاجر إلكترونية، لوحات تحكم، وSEO تقني."
      : "Contact me for a quote or an execution plan: company sites, e-commerce, dashboards, and technical SEO.";

  return buildMetadata(locale, { title, description, path: "/contact" });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <ContactPage locale={locale} />;
}