/// <reference types="@cloudflare/workers-types" />

import { SITE_ORIGIN } from "../src/core/seo/siteMeta";

export const onRequestGet: PagesFunction = async () => {
  const base = SITE_ORIGIN.replace(/\/$/, "");
  const body =
    `User-agent: *\n` +
    `Allow: /\n\n` +
    `Sitemap: ${base}/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
      // ضمان إضافي إن Cloudflare/أي layer مش تحط noindex
      "x-robots-tag": "all",
    },
  });
};
