import type { Metadata } from "next";
import type { ReactNode } from "react";

import LocaleProviders from "../LocaleProviders";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN, FAVICON_PATH } from "@/core/seo/siteMeta";

import "@/styles/globals.css";
import "@/styles/animations.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
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
        <LocaleProviders locale="ar">{children}</LocaleProviders>
      </body>
    </html>
  );
}
