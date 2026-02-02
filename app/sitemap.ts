import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/core/i18n/locale";

const SITE_URL = "https://elhussainy.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const base: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: now,
    },
  ];

  // Add localized roots
  for (const locale of SUPPORTED_LOCALES) {
    base.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
    });
  }

  return base;
}
