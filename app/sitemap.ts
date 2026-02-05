import type { MetadataRoute } from "next";

import { SUPPORTED_LOCALES, type Locale } from "@/core/i18n/locale";
import { buildLangUrl } from "@/core/seo/siteMeta";

import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";

export const dynamic = "force-static";
export const revalidate = 0;

const STATIC_PATHS = ["/", "/about", "/projects", "/services", "/blog", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // IMPORTANT: no root without locale. Only canonical locale URLs.
  for (const locale of SUPPORTED_LOCALES) {
    const l = locale as Locale;

    for (const p of STATIC_PATHS) {
      entries.push({
        url: buildLangUrl(l, p),
        lastModified,
        changeFrequency: p === "/" ? "weekly" : "monthly",
        priority: p === "/" ? 1 : 0.7,
      });
    }

    for (const project of projects) {
      entries.push({
        url: buildLangUrl(l, `/projects/${project.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const service of services) {
      entries.push({
        url: buildLangUrl(l, `/services/${service.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const post of blogPosts) {
      entries.push({
        url: buildLangUrl(l, `/blog/${post.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
