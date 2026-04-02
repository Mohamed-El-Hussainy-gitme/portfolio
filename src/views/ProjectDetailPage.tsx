"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "../core/i18n/LanguageContext";
import { Seo } from "../core/seo/Seo";
import { breadcrumbList, projectCaseStudySchema } from "../core/seo/schema";
import { projects } from "../data/projects";
import { ProjectSection } from "../components/ProjectSection";

type LocalizedText = { en: string; ar: string };

const PROJECT_SEO_OVERRIDES: Record<
  string,
  { focusKeyword: LocalizedText; seoTitle: LocalizedText; seoDescription: LocalizedText }
> = {
  "rose-ecommerce-website-development": {
    focusKeyword: { ar: "متجر إلكتروني", en: "e-commerce website" },
    seoTitle: { ar: "متجر إلكتروني Rose: دراسة حالة", en: "Rose E-commerce Website: Case Study" },
    seoDescription: {
      ar: "متجر إلكتروني مع لوحة تحكم وقاعدة بيانات. تجربة شراء واضحة وإدارة أسهل وبنية SEO قوية.",
      en: "E-commerce website with admin dashboard and database. Clean UX, easier operations, strong SEO structure.",
    },
  },
  growlik: {
    focusKeyword: { ar: "تحسين SEO", en: "SEO optimization" },
    seoTitle: { ar: "تحسين SEO لـ GrowLik: دراسة حالة", en: "GrowLik SEO Optimization: Case Study" },
    seoDescription: {
      ar: "تحسين SEO تقني: عناوين ووصف وهيدنجز وسكيما وروابط داخلية. ترتيب أفضل ومقتطفات أوضح.",
      en: "Technical SEO optimization: titles, descriptions, headings, schema, and internal links for clearer snippets.",
    },
  },
};

function inferFocusKeyword(techStack: string[], isArabic: boolean): string {
  const stack = techStack.map((t) => t.toLowerCase());
  const has = (s: string) => stack.some((t) => t.includes(s));

  if (has("seo")) return isArabic ? "تحسين SEO" : "SEO optimization";
  if (has("e-commerce") || has("store") || has("shop")) return isArabic ? "متجر إلكتروني" : "e-commerce website";
  if (has("dashboard") || has("admin")) return isArabic ? "لوحة تحكم" : "admin dashboard";
  if (has("wordpress")) return isArabic ? "موقع ووردبريس" : "WordPress website";
  if (has("next.js") || has("next")) return isArabic ? "تطوير Next.js" : "Next.js development";
  if (has("react")) return isArabic ? "تطوير React" : "React development";
  return isArabic ? "تصميم مواقع" : "website design";
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slugParam = (params as any)?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <div dir={direction} className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <Seo
          title={isArabic ? "المشروع غير موجود" : "Project not found"}
          description={isArabic ? "لم يتم العثور على هذا المشروع." : "The requested project was not found."}
        />
        <h1 className="mb-3 text-2xl font-semibold text-slate-50">{isArabic ? "المشروع غير موجود" : "Project not found"}</h1>
        <p className="mb-6 text-sm text-slate-300">{isArabic ? "جرّب العودة لصفحة المشاريع." : "Please return to the projects page."}</p>
        <Link
          href={href("/projects")}
          className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-950/60 px-5 py-2 text-sm font-medium text-slate-100 hover:border-indigo-400"
        >
          {isArabic ? "العودة للمشاريع" : "Back to projects"}
        </Link>
      </div>
    );
  }

  const override = PROJECT_SEO_OVERRIDES[project.slug];

  const focusKeyword =
    project.focusKeyword?.[language] || override?.focusKeyword?.[language] || inferFocusKeyword(project.techStack, isArabic);

  const title =
    project.seoTitle?.[language] ||
    override?.seoTitle?.[language] ||
    `${project.name[language]} | ${isArabic ? "دراسة حالة" : "Case study"}`;

  const description = project.seoDescription?.[language] || override?.seoDescription?.[language] || project.tagline[language];

  const backArrow = direction === "rtl" ? "→" : "←";

  return (
    <div dir={direction} className="pt-24">
      <Seo
        title={title}
        description={description}
        focusKeyword={focusKeyword}
        schema={[
          breadcrumbList(isArabic ? "ar" : "en", [
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "المشاريع" : "Projects", path: "/projects" },
            { name: project.name[language], path: `/projects/${project.slug}` },
          ]),
          projectCaseStudySchema(isArabic ? "ar" : "en", project),
        ]}
      />

      <div className="mx-auto max-w-6xl px-6 pt-4 lg:px-0">
        <Link
          href={href("/projects")}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white"
        >
          <span aria-hidden>{backArrow}</span>
          <span>{isArabic ? "العودة للمشاريع" : "Back to projects"}</span>
        </Link>
      </div>

      <ProjectSection project={project} />
    </div>
  );
}
