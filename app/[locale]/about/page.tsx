import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { breadcrumbList, personSchema } from "@/core/seo/schema";

type Props = { params: Promise<{ locale: "en" | "ar" }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  return buildMetadata(locale, {
    pathname: "/about",
    title: { en: "About Mohamed El-Hussainy", ar: "من أنا" },
    description: {
      en: "Full-stack web developer focused on Next.js, SEO, and high-performance UI.",
      ar: "مطور فل ستاك متخصص في Next.js و SEO تقني وتحسين سرعة الموقع.",
    },
    keywords: PAGE_KEYWORDS.about,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const jsonLd = [
    personSchema(locale),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "من أنا" : "About", path: "/about" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutPage />
    </>
  );
}
