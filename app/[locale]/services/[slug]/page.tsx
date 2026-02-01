import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/views/ServiceDetailPage";
import { SERVICES, type ServiceDefinition } from "@/data/services";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { breadcrumbList, serviceSchema } from "@/core/seo/schema";

export const dynamic = "force-static";
export const dynamicParams = false;

type Props = { params: Promise<{ locale: "en" | "ar"; slug: string }> };

function dedupe(list: string[]): string[] {
  return Array.from(new Set(list.filter(Boolean)));
}

export async function generateStaticParams(): Promise<Array<{ locale: "en" | "ar"; slug: string }>> {
  const locales = ["en", "ar"] as const;
  return locales.flatMap((locale) => SERVICES.map((s: ServiceDefinition) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const s = SERVICES.find((x) => x.slug === slug);

  if (!s) {
    return buildMetadata(locale, {
      path: `/services/${slug}`,
      title: { en: "Service Not Found", ar: "الخدمة غير موجودة" },
      description: { en: "This service does not exist.", ar: "هذه الخدمة غير موجودة." },
      keywords: PAGE_KEYWORDS.services,
      noindex: true, // ✅ correct key
    });
  }

  const focus = (s.focusKeyword?.[locale] || s.title[locale] || "").trim();

  const kw = {
    en: dedupe([focus, ...PAGE_KEYWORDS.services.en, ...s.bullets.en.slice(0, 4)]).slice(0, 20),
    ar: dedupe([focus, ...PAGE_KEYWORDS.services.ar, ...s.bullets.ar.slice(0, 4)]).slice(0, 20),
  };

  return buildMetadata(locale, {
    path: `/services/${s.slug}`,
    title: s.title,
    description: s.summary,
    keywords: kw,
    ogType: "website",
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return notFound();

  const pageTitle = (s.title?.[locale] || "").trim();

  const jsonLd = [
    serviceSchema(locale, s, "/services"),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "الخدمات" : "Services", path: "/services" },
      { name: pageTitle || (locale === "ar" ? "تفاصيل الخدمة" : "Service"), path: `/services/${s.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailPage slug={slug} locale={locale} />
    </>
  );
}
