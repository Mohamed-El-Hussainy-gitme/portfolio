"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_ID = "G-R9E32B32BQ";

/**
 * Sends a page_view on App Router navigations.
 * (Google tag snippet fires once; this makes SPA navigations track properly.)
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;

    const page_path = `${pathname}${window.location.search || ""}`;
    window.gtag("config", GA_ID, { page_path });
  }, [pathname]);

  return null;
}
