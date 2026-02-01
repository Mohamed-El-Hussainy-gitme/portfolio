import type { Metadata } from "next";

import ContactPage from "@/views/ContactPage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { breadcrumbList, personSchema } from "@/core/seo/schema";
import { normalizeLocale } from "@/core/i18n/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);

  return buildMetadata(locale, {
    pathname: "/contact",
    title: { en: "Contact", ar: "تواصل" },
    description: {
      en: "Send a project inquiry — website, ecommerce, dashboard, or SEO improvements.",
      ar: "راسلني لطلب مشروع: موقع شركة، متجر إلكتروني، لوحة تحكم، أو تحسين SEO.",
    },
    keywords: PAGE_KEYWORDS.contact,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);

  const jsonLd = [
    personSchema(locale),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "تواصل" : "Contact", path: "/contact" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPage />
    </>
  );
}
