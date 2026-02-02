import type { MetadataRoute } from "next";

import { LOCALES } from "@/core/i18n/locale";
import { buildLangUrl } from "@/core/seo/siteMeta";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";

// حط هنا الصفحات اللي موجودة فعليًا عندك فقط
const STATIC_PATHS = ["/", "/about", "/contact", "/services", "/projects", "/blog"] as const;

// Required for static export / force static generation
export const dynamic = "force-static";
export const revalidate = 0;

export default function sitemap(): MetadataRoute.Sitemap {
  // build-time timestamp (good enough for static export)
  const buildTime = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // Static pages
    for (const path of STATIC_PATHS) {
      const isHome = path === "/";

      entries.push({
        url: buildLangUrl(locale, path),
        lastModified: buildTime,
        changeFrequency: isHome ? "weekly" : "monthly",
        priority: isHome ? 1 : 0.7,
      });
    }

    // Services
    for (const s of services) {
      entries.push({
        url: buildLangUrl(locale, `/services/${s.slug}`),
        lastModified: buildTime,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    // Projects
    for (const p of projects) {
      entries.push({
        url: buildLangUrl(locale, `/projects/${p.slug}`),
        lastModified: buildTime,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    // Blog posts
    for (const post of blogPosts) {
      entries.push({
        url: buildLangUrl(locale, `/blog/${post.slug}`),
        lastModified: new Date(post.dateISO),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
