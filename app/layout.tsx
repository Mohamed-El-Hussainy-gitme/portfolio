import type { Metadata } from "next";
import Providers from "./providers";
import { SITE_NAME, SITE_ORIGIN } from "@/core/seo/siteMeta";

import "@/styles/globals.css";
import "@/styles/animations.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: "Portfolio website — projects, services, and blog.",

  // ✅ FIX: Explicit favicon (you only have favicon.svg in /public)
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },

  // (Optional but safe) keep OG default image absolute via metadataBase
  openGraph: {
    images: ["/og-cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-cover.png"],
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
