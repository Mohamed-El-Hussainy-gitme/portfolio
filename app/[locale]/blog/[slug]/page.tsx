import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostPage from "@/views/BlogPostPage";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/core/seo/metadata";
import { PAGE_KEYWORDS } from "@/core/seo/keywords";
import { blogPostingSchema, breadcrumbList } from "@/core/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) => blogPosts.map((p) => ({ locale, slug: p.slug })));
}

type Props = { params: Promise<{ locale: "en" | "ar"; slug: string }> };

function dedupe(list: string[]): string[] {
  return Array.from(new Set(list.filter(Boolean)));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return buildMetadata(locale, {
      path: "/blog",
      title: { en: "Post Not Found", ar: "المقال غير موجود" },
      description: { en: "This post does not exist.", ar: "هذا المقال غير موجود." },
      keywords: PAGE_KEYWORDS.blog,
    });
  }

  const focus = (post.focusKeyword?.[locale] || "").trim();
  const keywords = {
    en: dedupe([focus, ...post.tags, ...PAGE_KEYWORDS.blog.en]),
    ar: dedupe([focus, ...post.tags, ...PAGE_KEYWORDS.blog.ar]),
  };

  // ✅ BlogPost has title + description (no seoTitle/seoDescription)
  return buildMetadata(locale, {
    path: `/blog/${post.slug}`,
    title: { en: post.title.en, ar: post.title.ar },
    description: { en: post.description.en, ar: post.description.ar },
    keywords,
    ogType: "article",
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = raw === "ar" ? "ar" : "en";

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const jsonLd = [
    blogPostingSchema(locale, post),
    breadcrumbList(locale, [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "المدونة" : "Blog", path: "/blog" },
      { name: post.title[locale], path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostPage slug={slug} locale={locale} />
    </>
  );
}
