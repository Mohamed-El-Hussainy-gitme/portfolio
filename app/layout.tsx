import type { Metadata } from "next";
import Providers from "./providers";

import HtmlLangSync from "./HtmlLangSync";
import {
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/core/seo/siteMeta";

import "@/styles/globals.css";
import "@/styles/animations.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_ORIGIN },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: SITE_ORIGIN,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: new URL(OG_IMAGE_PATH, SITE_ORIGIN).toString() }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <HtmlLangSync />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
