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

type Props = { params: { locale: "en" | "ar"; slug: string } };

function dedupe(list: string[]): string[] {
  return Array.from(new Set(list.filter(Boolean)));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug  } = params;
  const locale = raw === "ar" ? "ar" : "en";
  const s = services.find((x) => x.slug === slug);

  if (!s) {
    return buildMetadata(locale, {
      pathname: "/services",
      title: { en: "Service Not Found", ar: "الخدمة غير موجودة" },
      description: { en: "This service does not exist.", ar: "هذه الخدمة غير موجودة." },
      keywords: PAGE_KEYWORDS.services,
    });
  }

  const focus = (s.focusKeyword[locale] || s.title[locale]).trim();
  const keywords = {
    en: dedupe([focus, ...PAGE_KEYWORDS.services.en]),
    ar: dedupe([focus, ...PAGE_KEYWORDS.services.ar]),
  };

  return buildMetadata(locale, {
    pathname: `/services/${s.slug}`,
    title: { en: s.title.en, ar: s.title.ar },
    description: { en: s.summary.en, ar: s.summary.ar },
    keywords,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw, slug  } = params;
  const locale = raw === "ar" ? "ar" : "en";
  const s = services.find((x) => x.slug === slug);
  if (!s) return notFound();

  const jsonLd = [
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
