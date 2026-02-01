import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import Providers from "./providers";
import GoogleAnalytics from "./google-analytics";

import { DEFAULT_LOCALE, isLocale, localeToDir, type Locale } from "@/core/i18n/locale";
import { SITE_NAME, SITE_DESCRIPTION, SITE_ORIGIN } from "@/core/seo/siteMeta";

import "@/styles/globals.css";
import "@/styles/animations.css";

const GA_ID = "G-R9E32B32BQ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: SITE_ORIGIN,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: new URL("/og-cover.png", SITE_ORIGIN).toString() }],
  },
};

type Props = {
  children: ReactNode;
  // Next.js 15 types this as a Promise
  params?: Promise<{ locale?: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const p = params ? await params : { locale: undefined };
  const locale: Locale = isLocale(p.locale) ? p.locale : DEFAULT_LOCALE;
  const dir = localeToDir(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </head>
      <body>
        {/* SPA route-change page_view tracking */}
        <GoogleAnalytics />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
