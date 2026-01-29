import { Suspense } from "react";

import { blogPosts } from "@/data/blog";
import BlogDetailsClient from "./BlogDetailsClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <Suspense fallback={null}>
      <BlogDetailsClient slug={slug} />
    </Suspense>
  );
}
