import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/views/ProjectDetailPage";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { breadcrumbList, projectCaseStudySchema } from "@/core/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
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
      pathname: "/projects",
      title: { en: "Project Not Found", ar: "المشروع غير موجود" },
      description: { en: "This project does not exist.", ar: "هذا المشروع غير موجود." },
      keywords: PAGE_KEYWORDS.projects,
    });
  }

  const title = p.seoTitle?.[locale] || p.name[locale];
  const description = p.seoDescription?.[locale] || p.description[locale];
  const focus = (p.focusKeyword?.[locale] || "").trim();

  const keywords = {
    en: dedupe([focus, ...p.tags, ...PAGE_KEYWORDS.projects.en]),
    ar: dedupe([focus, ...p.tags, ...PAGE_KEYWORDS.projects.ar]),
  };

  return buildMetadata(locale, {
    pathname: `/projects/${p.slug}`,
    title: { en: p.seoTitle?.en || p.name.en, ar: p.seoTitle?.ar || p.name.ar },
    description: { en: p.seoDescription?.en || p.description.en, ar: p.seoDescription?.ar || p.description.ar },
    keywords,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";
  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();

  const jsonLd = [
    projectCaseStudySchema(locale, p),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "المشاريع" : "Projects", path: "/projects" },
      { name: p.seoTitle?.[locale] || p.name[locale], path: `/projects/${p.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetailPage />
    </>
  );
}
