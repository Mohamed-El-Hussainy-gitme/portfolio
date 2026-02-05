import type { Metadata } from "next";
import HomePage from "@/views/HomePage";
import { buildMetadata } from "@/core/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("ar", {
    title: "ملف أعمال مطور ويب",
    description: "مشاريع، خدمات، ومدونة — SEO تقني وأداء وتجربة عربية/إنجليزية بدون خلط.",
  });
}

export default function Page() {
  return <HomePage locale="ar" />;
}
