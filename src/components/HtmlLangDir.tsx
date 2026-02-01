"use client";

import { useEffect } from "react";
import type { Locale } from "@/core/i18n/locale";

export default function HtmlLangDir({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
