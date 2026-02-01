import type { Metadata } from "next";

import ServicesPage from "@/views/ServicesPage";
import { SERVICES } from "@/data/services";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { breadcrumbList, servicesItemListSchema } from "@/core/seo/schema";

type Props = { params: Promise<{ locale: "en" | "ar" }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  return buildMetadata(locale, {
    path: "/services",
    title: { en: "Services", ar: "الخدمات" },
    description: {
      en: "Full-stack web development services with technical SEO and performance focus.",
      ar: "خدمات تطوير مواقع فل ستاك مع SEO تقني وتركيز على الأداء.",
    },
    keywords: PAGE_KEYWORDS.services,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const jsonLd = [
    servicesItemListSchema(locale, SERVICES, "/services"),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "الخدمات" : "Services", path: "/services" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServicesPage locale={locale} />
    </>
  );
}
