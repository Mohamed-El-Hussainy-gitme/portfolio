import type { Metadata } from "next";
import type { ReactNode } from "react";

import LocaleProviders from "../LocaleProviders";
import GoogleAnalytics from "../GoogleAnalytics";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN, FAVICON_PATH } from "@/core/seo/siteMeta";

import "@/styles/globals.css";
import "@/styles/animations.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  icons: { icon: FAVICON_PATH },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: new URL(OG_IMAGE_PATH, SITE_ORIGIN).toString() }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <LocaleProviders locale="en">{children}</LocaleProviders>
      </body>
    </html>
  );
}
