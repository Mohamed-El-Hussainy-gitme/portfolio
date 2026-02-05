import type { Metadata } from "next";
import Providers from "./providers";

import HtmlLangSync from "./HtmlLangSync";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/core/seo/siteMeta";
import { DEFAULT_LOCALE, localeToDir } from "@/core/i18n/locale";

import "@/styles/globals.css";
import "@/styles/animations.css";

// --- GA ID (static export safe) ---
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
      <head>
        {/* Google Analytics (GA4) */}
        {GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });
                `.trim(),
              }}
            />
          </>
        ) : null}
      </head>

      <body>
        <HtmlLangSync />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
