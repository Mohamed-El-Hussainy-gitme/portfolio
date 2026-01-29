import type { Metadata } from "next";
import HomePage from "@/views/HomePage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { breadcrumbList, personSchema, websiteSchema } from "@/core/seo/schema";

type Props = { params: { locale: "en" | "ar" } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw  } = params;
  const locale = raw === "ar" ? "ar" : "en";
  return buildMetadata(locale, {
    pathname: "/",
    title: { en: "Website Development and SEO", ar: "إنشاء مواقع وتحسين محركات البحث" },
    description: {
      en: "Modern websites built with Next.js, optimized for speed and SEO.",
      ar: "مواقع حديثة بـ Next.js مع تحسين السرعة و SEO.",
    },
    keywords: PAGE_KEYWORDS.home,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw  } = params;
  const locale = raw === "ar" ? "ar" : "en";

  const jsonLd = [
    websiteSchema(locale),
    personSchema(locale),
    breadcrumbList(locale, [{ name: locale === "ar" ? "الرئيسية" : "Home", path: "/" }]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage />
    </>
  );
}
