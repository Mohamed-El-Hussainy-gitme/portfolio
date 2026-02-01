import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/core/i18n/locale";
import { buildLangUrl } from "@/core/seo/siteMeta";

import { projects } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";
export const revalidate = false;

const STATIC_PATHS = ["/", "/about", "/contact", "/projects", "/services", "/blog"] as const;

function asDate(v: string | Date): Date {
  return v instanceof Date ? v : new Date(v);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  const addPath = (locale: Locale, path: string, lastModified: Date) => {
    entries.push({
      url: buildLangUrl(locale, path),
      lastModified,
    });
  };

  for (const locale of LOCALES) {
    for (const p of STATIC_PATHS) addPath(locale, p, now);

    for (const s of SERVICES) addPath(locale, `/services/${s.slug}`, now);

    for (const pr of projects) addPath(locale, `/projects/${pr.slug}`, now);

    for (const post of blogPosts) {
      addPath(locale, `/blog/${post.slug}`, asDate(post.dateISO));
    }
  }

  return entries;
}
