import type { Metadata } from "next";
import Providers from "./providers";
import { SITE_ORIGIN } from "@/core/seo/siteMeta";

import "@/styles/globals.css";
import "@/styles/animations.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Mohamed El-Hussainy | Web Developer Portfolio",
    template: "%s | Mohamed El-Hussainy",
  },
  description: "Portfolio website — projects, services, and blog.",
  openGraph: {
    title: "Mohamed El-Hussainy | Web Developer Portfolio",
    description: "Projects, services, and blog.",
    url: SITE_ORIGIN,
    siteName: "Mohamed El-Hussainy",
    images: ["/og-cover.svg"],
    locale: "en_US",
    type: "website",
  },
  // ❌ لا تضع canonical ثابت هنا
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
