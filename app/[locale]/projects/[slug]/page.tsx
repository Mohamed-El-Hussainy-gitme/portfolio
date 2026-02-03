import { LOCALES } from "@/core/i18n/locale";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetailPage from "@/views/ProjectDetailPage";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { breadcrumbList, projectCaseStudySchema } from "@/core/seo/schema";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ locale: "en" | "ar"; slug: string }>> {
  const locales = ["en", "ar"] as const;
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

type Props = { params: Promise<{ locale: "en" | "ar"; slug: string }> };

function dedupe(list: string[]): string[] {
  return Array.from(new Set(list.filter(Boolean)));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const p = projects.find((x) => x.slug === slug);
  if (!p) {
    return buildMetadata(locale, {
      path: "/projects",
      title: { en: "Project Not Found", ar: "المشروع غير موجود" },
      description: { en: "This project does not exist.", ar: "هذا المشروع غير موجود." },
      keywords: PAGE_KEYWORDS.projects,
    });
  }

  const title = (p.seoTitle?.[locale] || p.name?.[locale] || "").trim();
  const description = (p.seoDescription?.[locale] || p.description?.[locale] || "").trim();
  const focus = (p.focusKeyword?.[locale] || "").trim();

  const keywords = {
    en: dedupe([focus, ...(p.tags || []), ...PAGE_KEYWORDS.projects.en]),
    ar: dedupe([focus, ...(p.tags || []), ...PAGE_KEYWORDS.projects.ar]),
  };

  return buildMetadata(locale, {
    path: `/projects/${p.slug}`,
    title: {
      en: (p.seoTitle?.en || p.name?.en || title || "Project").trim(),
      ar: (p.seoTitle?.ar || p.name?.ar || title || "مشروع").trim(),
    },
    description: {
      en: (p.seoDescription?.en || p.description?.en || description || "").trim(),
      ar: (p.seoDescription?.ar || p.description?.ar || description || "").trim(),
    },
    keywords,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();

  const pageTitle = (p.seoTitle?.[locale] || p.name?.[locale] || "").trim();

  const jsonLd = [
    projectCaseStudySchema(locale, p),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "المشاريع" : "Projects", path: "/projects" },
      { name: pageTitle || (locale === "ar" ? "تفاصيل المشروع" : "Project"), path: `/projects/${p.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetailPage />
    </>
  );
}