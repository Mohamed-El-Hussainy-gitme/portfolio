"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, localeToDir } from "@/core/i18n/locale";

export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const seg = pathname?.split("/").filter(Boolean)[0] ?? "";
    const locale = isLocale(seg) ? seg : DEFAULT_LOCALE;

    document.documentElement.lang = locale;
    document.documentElement.dir = localeToDir(locale);
  }, [pathname]);

  return null;
}
