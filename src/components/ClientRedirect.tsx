"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientRedirect({ toEn, toAr }: { toEn: string; toAr: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const lang = searchParams?.get("lang");
    router.replace(lang === "ar" ? toAr : toEn);
  }, [router, searchParams, toEn, toAr]);

  return null;
}
