import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/core/seo/siteMeta";

// Required for output: "export"
export const dynamic = "force-static";
export const revalidate = 0;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
