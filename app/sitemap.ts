import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/core/seo/siteMeta";

export const dynamic = "force-static";

type Locale = "en" | "ar";
const locales: Locale[] = ["en", "ar"];

const staticPaths = ["/", "/projects", "/services", "/blog", "/contact"];

const projectSlugs = [
  "project-1",
  "project-2",
  "project-3",
  "project-4",
  "project-5",
  "project-6",
  "project-7",
  "rose-ecommerce-website-development",
  "growlik",
];

const serviceSlugs = ["landing-page", "company-website", "ecommerce", "dashboard", "seo-performance", "maintenance"];

const blogSlugs = [
  "nextjs-performance-patterns",
  "technical-seo-foundations",
  "rtl-ui-best-practices",
  "dashboard-ui-patterns",
  "react-component-architecture",
  "api-integration-patterns",
  "image-optimization-lcp",
  "form-handling-validation",
  "auth-route-protection",
  "deploy-ci-maintainability",
];

function buildUrl(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${SITE_ORIGIN}/${locale}${clean}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static pages
    for (const path of staticPaths) {
      entries.push({
        url: buildUrl(locale, path),
        lastModified: now,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
      });
    }

    // Projects
    for (const slug of projectSlugs) {
      entries.push({
        url: buildUrl(locale, `/projects/${slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    // Services
    for (const slug of serviceSlugs) {
      entries.push({
        url: buildUrl(locale, `/services/${slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }

    // Blog
    for (const slug of blogSlugs) {
      entries.push({
        url: buildUrl(locale, `/blog/${slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  return entries;
}
