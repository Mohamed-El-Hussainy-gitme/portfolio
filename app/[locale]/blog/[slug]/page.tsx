import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostPage from "@/views/BlogPostPage";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/core/seo/metadata";
import { DEFAULT_LOCALE, isLocale, SUPPORTED_LOCALES, type Locale } from "@/core/i18n/locale";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: string; slug: string }> {
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const safeLocale: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    // امنع الأرشفة في حالة slug غلط بدل ما تعمل صفحة تتفهرس
    return buildMetadata(safeLocale, {
      title: "Blog",
      noIndex: true,
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata(safeLocale, {
    title: post.title,
    description: post.description, // ✅ مفيش excerpt في BlogPost عندك
    path: `/blog/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const exists = blogPosts.some((p) => p.slug === slug);
  if (!exists) notFound();

  // ✅ BlogPostPage بياخد prop اسمها slug مش initialSlug
  return <BlogPostPage slug={slug} />;
}
