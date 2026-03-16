import type { ReactNode } from "react";

import LocaleProviders from "../LocaleProviders";
import GoogleAnalytics from "../GoogleAnalytics";
import { buildLayoutMetadata } from "@/core/seo/metadata";

import "@/styles/globals.css";
import "@/styles/animations.css";

export const metadata = buildLayoutMetadata("ar");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <LocaleProviders locale="ar">{children}</LocaleProviders>
      </body>
    </html>
  );
}
