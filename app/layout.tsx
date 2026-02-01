import type { Metadata } from "next";
import Providers from "./providers";
import { SITE_NAME, SITE_ORIGIN } from "@/core/seo/siteMeta";

import "@/styles/globals.css";
import "@/styles/animations.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${SITE_NAME} | Web Developer Portfolio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Portfolio website — projects, services, and blog.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [`${SITE_ORIGIN}/og-cover.svg`],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_ORIGIN}/og-cover.svg`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
