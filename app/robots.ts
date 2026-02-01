import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/core/seo/siteMeta";

export const dynamic = "force-static";
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: new URL(SITE_ORIGIN).host,
  };
}
