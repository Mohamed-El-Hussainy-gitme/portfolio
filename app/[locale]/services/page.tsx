import type { Metadata } from "next";
import ServicesPage from "@/views/ServicesPage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { services } from "@/data/services";
import { breadcrumbList, servicesItemListSchema } from "@/core/seo/schema";

type Props = { params: Promise<{ locale: "en" | "ar" }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";
  return buildMetadata(locale, {
    pathname: "/services",
    title: { en: "Web Development Services", ar: "خدمات تصميم وتطوير المواقع" },
    description: {
      en: "Landing pages, company websites, ecommerce, dashboards, and technical SEO.",
      ar: "صفحات هبوط، مواقع شركات، متاجر إلكترونية، لوحات تحكم، و SEO تقني.",
    },
    keywords: PAGE_KEYWORDS.services,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const jsonLd = [
    servicesItemListSchema(locale, services, "/services"),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "الخدمات" : "Services", path: "/services" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServicesPage />
    </>
  );
}
