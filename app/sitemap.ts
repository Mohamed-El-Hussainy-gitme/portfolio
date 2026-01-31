// app/sitemap.ts
import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";

const BASE = "https://elhussainy.pages.dev";
const LOCALES = ["en", "ar"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const push = (url: string, lastModified?: Date) => {
    if (seen.has(url)) return;
    seen.add(url);
    out.push({ url, lastModified: lastModified ?? new Date("2026-01-31") });
  };

  // صفحات ثابتة (لا تضف root "/" إطلاقًا)
  const staticPaths = ["", "/about", "/projects", "/services", "/blog", "/contact"] as const;

  for (const locale of LOCALES) {
    for (const p of staticPaths) {
      const path = p === "" ? `/${locale}` : `/${locale}${p}`;
      push(`${BASE}${path}`);
    }
  }

  // Projects
  for (const pr of projects) {
    for (const locale of LOCALES) {
      push(`${BASE}/${locale}/projects/${encodeURIComponent(pr.slug)}`);
    }
  }

  // Services
  for (const s of services) {
    for (const locale of LOCALES) {
      push(`${BASE}/${locale}/services/${encodeURIComponent(s.slug)}`);
    }
  }

  // Blog
  for (const post of blogPosts) {
    const lm = safeDate(post.dateISO);
    for (const locale of LOCALES) {
      push(`${BASE}/${locale}/blog/${encodeURIComponent(post.slug)}`, lm);
    }
  }

  return out;
}

function safeDate(iso: string): Date {
  const d = new Date(iso);
  return Number.isFinite(d.getTime()) ? d : new Date("2026-01-31");
}
