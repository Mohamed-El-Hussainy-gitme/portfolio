import type { MetadataRoute } from "next";

import { LOCALES } from "@/core/i18n/locale";
import { buildLangUrl } from "@/core/seo/siteMeta";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";

const STATIC_PATHS = ["/", "/about", "/contact", "/services", "/projects", "/blog"] as const;

// Required for `output: "export"`.
export const dynamic = "force-static";
export const revalidate = 0;

export default function sitemap(): MetadataRoute.Sitemap {
  // Use stable ISO string (better compatibility with parsers/GSC)
  const nowISO = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // Static pages
    for (const path of STATIC_PATHS) {
      entries.push({
        url: buildLangUrl(locale, path),
        lastModified: nowISO,
      });
    }

    // Services
    for (const s of services) {
      entries.push({
        url: buildLangUrl(locale, `/services/${s.slug}`),
        lastModified: nowISO,
      });
    }

    // Projects (use date if you have one, else build time)
    for (const p of projects) {
      // If your project has a date field, swap it here (e.g. p.dateISO)
      entries.push({
        url: buildLangUrl(locale, `/projects/${p.slug}`),
        lastModified: nowISO,
      });
    }

    // Blog posts (use post.dateISO when valid)
    for (const post of blogPosts) {
      const d = new Date(post.dateISO);
      entries.push({
        url: buildLangUrl(locale, `/blog/${post.slug}`),
        lastModified: Number.isNaN(d.getTime()) ? nowISO : d.toISOString(),
      });
    }
  }

  return entries;
}
