import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/views/ServiceDetailPage";
import { services } from "@/data/services";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { breadcrumbList, serviceSchema } from "@/core/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

type Props = { params: Promise<{ locale: "en" | "ar"; slug: string }> };

function dedupe(list: string[]): string[] {
  return Array.from(new Set(list.filter(Boolean)));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const s = services.find((x) => x.slug === slug);

  if (!s) {
    return buildMetadata(locale, {
      path: "/services",
      title: { en: "Service Not Found", ar: "الخدمة غير موجودة" },
      description: { en: "This service does not exist.", ar: "هذه الخدمة غير موجودة." },
      keywords: PAGE_KEYWORDS.services,
    });
  }

  const title = (s.title?.[locale] || "").trim();
  const description = (s.summary?.[locale] || "").trim();
  const focus = (s.focusKeyword?.[locale] || title || "").trim();

  const keywords = {
    en: dedupe([focus, ...PAGE_KEYWORDS.services.en]),
    ar: dedupe([focus, ...PAGE_KEYWORDS.services.ar]),
  };

  return buildMetadata(locale, {
    path: `/services/${s.slug}`,
    title: { en: s.title.en, ar: s.title.ar },
    description: { en: description || s.summary.en, ar: description || s.summary.ar },
    keywords,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const s = services.find((x) => x.slug === slug);
  if (!s) return notFound();

  const jsonLd = [
    // Pass the full path (including slug) to serviceSchema so that the
    // generated URL points to the service detail page instead of using an
    // anchor on the index page.
    serviceSchema(locale, s, `/services/${s.slug}`),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "الخدمات" : "Services", path: "/services" },
      { name: s.title[locale], path: `/services/${s.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailPage />
    </>
  );
}