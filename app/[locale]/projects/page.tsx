import type { Metadata } from "next";

import ProjectsPage from "@/views/ProjectsPage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { projects } from "@/data/projects";
import { breadcrumbList, projectsItemListSchema } from "@/core/seo/schema";

type Props = { params: Promise<{ locale: "en" | "ar" }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  return buildMetadata(locale, {
    pathname: "/projects",
    title: { en: "Projects", ar: "المشاريع" },
    description: { en: "Selected projects and case studies.", ar: "مختارات من المشاريع ودراسات الحالة." },
    keywords: PAGE_KEYWORDS.projects,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const jsonLd = [
    projectsItemListSchema(locale, projects),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "المشاريع" : "Projects", path: "/projects" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectsPage />
    </>
  );
}
