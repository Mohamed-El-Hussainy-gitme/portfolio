"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "../core/i18n/LanguageContext";
import type { Locale } from "../core/i18n/locale";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { ICONS } from "../data/icons";
import { GlowCard } from "../components/ui/GlowCard";

type Props = { locale?: Locale };

export default function ContactPage({ locale }: Props) {
  const ctx = useLanguage();
  const language = locale ?? ctx.language;
  const direction = language === "ar" ? "rtl" : "ltr";
  const href = ctx.href;

  const isArabic = language === "ar";
  const [copied, setCopied] = useState(false);

  const content = useMemo(() => {
    return {
      title: isArabic ? "تواصل" : "Contact",
      subtitle: isArabic
        ? "لو عندك مشروع وعايز تنفيذ منظم + SEO + أداء — ابعت التفاصيل."
        : "If you have a project and want structured delivery + SEO + performance — send details.",
      emailLabel: isArabic ? "البريد" : "Email",
      copy: isArabic ? "نسخ" : "Copy",
      copied: isArabic ? "تم النسخ" : "Copied",
      whatsapp: isArabic ? "اطلب عرض سعر" : "Request a Quote",
    };
  }, [isArabic]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText("mohamed.noda.b2@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <main dir={direction} className="py-12">
      <Container>
        <SectionHeading title={content.title} subtitle={content.subtitle} />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <GlowCard>
            <h2 className="text-lg font-semibold text-white">{content.emailLabel}</h2>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="mailto:mohamed.noda.b2@gmail.com"
                className="text-sm text-slate-300 underline-offset-4 hover:underline"
              >
                mohamed.noda.b2@gmail.com
              </Link>

              <button
                onClick={onCopy}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200 hover:bg-white/5"
              >
                {copied ? content.copied : content.copy}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={href("/services")}
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
              >
                {isArabic ? "الخدمات" : "Services"}
              </Link>

              <Link
                href={ICONS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-4 py-2 text-sm text-slate-900 hover:bg-slate-100"
              >
                {content.whatsapp}
              </Link>
            </div>
          </GlowCard>

          <GlowCard>
            <h2 className="text-lg font-semibold text-white">{isArabic ? "روابط" : "Links"}</h2>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href={ICONS.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 underline-offset-4 hover:underline"
              >
                GitHub
              </Link>
              <Link
                href={ICONS.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 underline-offset-4 hover:underline"
              >
                LinkedIn
              </Link>
            </div>
          </GlowCard>
        </div>
      </Container>
    </main>
  );
}
