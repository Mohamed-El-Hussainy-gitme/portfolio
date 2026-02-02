import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/core/i18n/locale";

export const dynamic = "force-static";

const SITE_URL = "https://elhussainy.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SUPPORTED_LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
  }));
}
