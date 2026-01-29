import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/core/seo/siteMeta";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";

type Locale = "en" | "ar";

function buildUrl(locale: Locale, path: string): string {
  // We publish localized routes as /en/* and /ar/*
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${SITE_ORIGIN}/${locale}${clean}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales: Locale[] = ["en", "ar"];

  const staticRoutes = ["/", "/about", "/services", "/projects", "/blog", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: buildUrl(locale, route),
        lastModified: now,
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : 0.7,
      });
    }

    for (const s of services) {
      entries.push({
        url: buildUrl(locale, `/services/${s.slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }

    for (const p of projects) {
      entries.push({
        url: buildUrl(locale, `/projects/${p.slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const post of blogPosts) {
      entries.push({
        url: buildUrl(locale, `/blog/${post.slug}`),
        lastModified: new Date(post.dateISO),
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  return entries;
}
