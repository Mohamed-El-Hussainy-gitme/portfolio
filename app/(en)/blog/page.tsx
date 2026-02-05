import type { Metadata } from "next";
import BlogIndexPage from "@/views/BlogIndexPage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { blogPosts } from "@/data/blog";
import { blogItemListSchema, breadcrumbList } from "@/core/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("en", {
    path: "/blog",
    title: { en: "Technical Blog", ar: "المدونة التقنية" },
    description: {
      en: "Practical articles on Next.js, performance, and technical SEO.",
      ar: "مقالات عملية عن Next.js والأداء و SEO التقني.",
    },
    keywords: PAGE_KEYWORDS.blog,
  });
}

export default function Page() {
  const locale = "en" as const;

  const jsonLd = [
    blogItemListSchema(locale, blogPosts),
    breadcrumbList(locale, [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogIndexPage />
    </>
  );
}
