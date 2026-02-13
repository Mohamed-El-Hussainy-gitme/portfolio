/// <reference types="@cloudflare/workers-types" />

import { SITE_ORIGIN } from "../src/core/seo/siteMeta";
import { blogPosts } from "../src/data/blog";
import { projects } from "../src/data/projects";
import { services } from "../src/data/services";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const onRequestGet: PagesFunction = async () => {
  const base = SITE_ORIGIN.replace(/\/$/, "");
  const now = new Date().toISOString();

  const urls: string[] = [
    `${base}`,
    `${base}/about`,
    `${base}/blog`,
    `${base}/projects`,
    `${base}/services`,
    `${base}/contact`,

    `${base}/ar`,
    `${base}/ar/about`,
    `${base}/ar/blog`,
    `${base}/ar/projects`,
    `${base}/ar/services`,
    `${base}/ar/contact`,
  ];

  for (const p of blogPosts) {
    urls.push(`${base}/blog/${p.slug}`);
    urls.push(`${base}/ar/blog/${p.slug}`);
  }

  for (const p of projects) {
    urls.push(`${base}/projects/${p.slug}`);
    urls.push(`${base}/ar/projects/${p.slug}`);
  }

  for (const s of services) {
    urls.push(`${base}/services/${s.slug}`);
    urls.push(`${base}/ar/services/${s.slug}`);
  }

  // إزالة تكرارات احتياطياً
  const uniq = Array.from(new Set(urls));

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    uniq
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${esc(u)}</loc>\n` +
          `    <lastmod>${now}</lastmod>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
      "x-robots-tag": "all",
    },
  });
};
