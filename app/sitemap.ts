import type { MetadataRoute } from "next";

import { LOCALES } from "@/core/i18n/locale";
import { buildLangUrl } from "@/core/seo/siteMeta";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";

const STATIC_PATHS = ["/", "/about", "/contact", "/services", "/projects", "/blog"] as const;

// Required for `output: "export"`.
// Without this, Next.js treats /sitemap.xml as a dynamic route and fails the
// static export during "Collecting page data".
export const dynamic = "force-static";
export const revalidate = 0;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // Static pages
    for (const path of STATIC_PATHS) {
      entries.push({
        url: buildLangUrl(locale, path),
        lastModified: now,
      });
    }

    // Services
    for (const s of services) {
      entries.push({
        url: buildLangUrl(locale, `/services/${s.slug}`),
        lastModified: now,
      });
    }

    // Projects
    for (const p of projects) {
      entries.push({
        url: buildLangUrl(locale, `/projects/${p.slug}`),
        lastModified: now,
      });
    }

    // Blog posts
    for (const post of blogPosts) {
      entries.push({
        url: buildLangUrl(locale, `/blog/${post.slug}`),
        lastModified: new Date(post.dateISO),
      });
    }
  }

  return entries;
}
