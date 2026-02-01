import type { Metadata } from "next";
import BlogIndexPage from "@/views/BlogIndexPage";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { blogPosts } from "@/data/blog";
import { blogItemListSchema, breadcrumbList } from "@/core/seo/schema";

type Props = { params: Promise<{ locale: "en" | "ar" }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  return buildMetadata(locale, {
    path: "/blog",
    title: { en: "Technical Blog", ar: "المدونة التقنية" },
    description: {
      en: "Practical articles on Next.js, performance, and technical SEO.",
      ar: "مقالات عملية عن Next.js والأداء و SEO التقني.",
    },
    keywords: PAGE_KEYWORDS.blog,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const jsonLd = [
    blogItemListSchema(locale, blogPosts),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "المدونة" : "Blog", path: "/blog" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogIndexPage />
    </>
  );
}
