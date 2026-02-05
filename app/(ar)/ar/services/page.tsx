import type { Metadata } from "next";
import ServicesPage from "@/views/ServicesPage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { services } from "@/data/services";
import { breadcrumbList, servicesItemListSchema } from "@/core/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("ar", {
    path: "/services",
    title: { en: "Web Development Services", ar: "خدمات تصميم وتطوير المواقع" },
    description: {
      en: "Landing pages, company websites, ecommerce, dashboards, and technical SEO.",
      ar: "صفحات هبوط، مواقع شركات، متاجر إلكترونية، لوحات تحكم، و SEO تقني.",
    },
    keywords: PAGE_KEYWORDS.services,
  });
}

export default function Page() {
  const locale = "ar" as const;

  const jsonLd = [
    servicesItemListSchema(locale, services, "/services"),
    breadcrumbList(locale, [
      { name: "الرئيسية", path: "/" },
      { name: "الخدمات", path: "/services" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServicesPage />
    </>
  );
}
