"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import { useLanguage } from "../core/i18n/LanguageContext";
import type { Locale } from "../core/i18n/locale";

import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import GlowCard from "../components/ui/GlowCard";
import Tag from "../components/ui/Tag";

import { SERVICES, type ServiceDefinition } from "../data/services";

type Props = { locale?: Locale };

export default function ServicesPage({ locale }: Props) {
  const ctx = useLanguage();
  const language = locale ?? ctx.language;
  const href = ctx.href;
  const isArabic = language === "ar";

  const cards = useMemo(
    () =>
      SERVICES.map((s: ServiceDefinition) => ({
        ...s,
        title: s.title[language],
        summary: s.summary[language],
        bullets: s.bullets[language],
      })),
    [language]
  );

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-slate-950 text-slate-100">
      <Container className="py-14">
        <SectionHeading
          align={isArabic ? "right" : "left"}
          title={isArabic ? "الخدمات" : "Services"}
          subtitle={
            isArabic
              ? "خدمات ويب عملية: تصميم وتنفيذ وSEO تقني وأداء وتجربة مستخدم. اختر الخدمة المناسبة وشاهد التفاصيل."
              : "Practical web services: design, implementation, technical SEO, performance, and UX. Pick a service to see the details."
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((s) => (
            <GlowCard key={s.slug} className="flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.summary}</p>
                </div>

                <Tag className="shrink-0">{s.icon}</Tag>
              </div>

              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-300">
                {s.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between">
                <Link
                  href={href(`/services/${s.slug}`)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
                >
                  {isArabic ? "عرض التفاصيل" : "View details"}
                  <span aria-hidden>→</span>
                </Link>

                {s.focusKeyword?.[language] ? (
                  <span className="text-xs text-slate-400">{s.focusKeyword[language]}</span>
                ) : null}
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-lg font-semibold">
            {isArabic ? "هل تحتاج ترشيح الخدمة المناسبة؟" : "Not sure which service fits?"}
          </h3>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            {isArabic
              ? "ابعث رابط موقعك (أو وصف الفكرة) وسأقترح خطة تنفيذ واضحة تشمل أهم أولويات SEO التقني والأداء والتصميم."
              : "Send your site URL (or a short project brief) and I’ll propose a clear execution plan with technical SEO, performance, and design priorities."}
          </p>
          <Link
            href={href("/contact")}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            {isArabic ? "تواصل الآن" : "Contact me"}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </main>
  );
}
