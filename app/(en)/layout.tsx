import type { ReactNode } from "react";

import LocaleProviders from "../LocaleProviders";
import GoogleAnalytics from "../GoogleAnalytics";
import { buildLayoutMetadata } from "@/core/seo/metadata";

import "@/styles/globals.css";
import "@/styles/animations.css";

export const metadata = buildLayoutMetadata("en");

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
