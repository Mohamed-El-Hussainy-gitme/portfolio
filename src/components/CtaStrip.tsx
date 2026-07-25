"use client";

import React from "react";
import { useLanguage } from "../core/i18n/LanguageContext";
import { buildWhatsAppLink } from "../data/contact";

export default function CtaStrip() {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";

  const focusKeyword = isArabic ? "مشروع جديد" : "new project";
  const title = isArabic ? "جاهز نبني مشروعك الجاي؟" : "Ready to build your next big thing?";
  const body = isArabic
    ? `ابعث لي رسالة على واتساب نتكلم فيها عن متطلبات مشروعك، وهحطلك خطة تنفيذ واضحة.`
    : `Message me on WhatsApp to discuss your business needs, and I'll give you a clear roadmap.`;

  const waLink = buildWhatsAppLink(
    isArabic
      ? `مرحبًا محمد، أريد ${focusKeyword} وأرغب في طلب عرض سعر الآن.`
      : `Hi Mohamed, I need ${focusKeyword} and would like a quote today.`
  );

  return (
    <section dir={direction} className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900 p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(167,139,250,0.18),transparent_55%)] opacity-80" />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className={direction === "rtl" ? "text-right" : "text-left"}>
            <h3 className="mb-2 text-xl font-semibold tracking-tight text-slate-50">
              {title}
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
              {body}
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-cyan-400/25 transition hover:brightness-105"
          >
            {isArabic ? "اطلب عرض سعر" : "Request a quote"}
          </a>
        </div>
      </div>
    </section>
  );
}
