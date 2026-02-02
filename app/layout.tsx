import type { Metadata } from "next";
import "./globals.css";
import HtmlLangSync from "./HtmlLangSync";
import { DEFAULT_LOCALE, localeToDir } from "@/core/i18n/locale";

export const metadata: Metadata = {
  title: "Elhussainy | Portfolio",
  description: "Elhussainy portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE} dir={localeToDir(DEFAULT_LOCALE)}>
      <body>
        <HtmlLangSync />
        {children}
      </body>
    </html>
  );
}
