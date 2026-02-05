import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostPage from "@/views/BlogPostPage";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/core/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return buildMetadata("ar", {
      title: "Blog",
      noIndex: true,
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata("ar", {
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const exists = blogPosts.some((p) => p.slug === slug);
  if (!exists) notFound();

  return <BlogPostPage slug={slug} />;
}
