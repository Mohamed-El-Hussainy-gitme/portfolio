import type { Metadata } from "next";
import Providers from "./providers";

import HtmlLangSync from "./HtmlLangSync";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/core/seo/siteMeta";
import { DEFAULT_LOCALE, localeToDir } from "@/core/i18n/locale";

import "@/styles/globals.css";
import "@/styles/animations.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,

  // IMPORTANT:
  // لا تعمل canonical عام في الـ Root Layout
  // لأن صفحات /[locale] بتبني canonical الصحيح عبر buildMetadata(...)
  icons: { icon: "/favicon.svg" },

  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: new URL(OG_IMAGE_PATH, SITE_ORIGIN).toString() }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} dir={localeToDir(DEFAULT_LOCALE)} suppressHydrationWarning>
      <body>
        <HtmlLangSync />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
