import type { Metadata } from "next";

import ProjectsPage from "@/views/ProjectsPage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { projects } from "@/data/projects";
import { breadcrumbList, projectsItemListSchema } from "@/core/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("en", {
    path: "/projects",
    title: { en: "Projects", ar: "المشاريع" },
    description: { en: "Selected projects and case studies.", ar: "مختارات من المشاريع ودراسات الحالة." },
    keywords: PAGE_KEYWORDS.projects,
  });
}

export default function Page() {
  const locale = "en" as const;

  const jsonLd = [
    projectsItemListSchema(locale, projects),
    breadcrumbList(locale, [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectsPage />
    </>
  );
}
