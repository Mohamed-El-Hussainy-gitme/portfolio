"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../core/i18n/LanguageContext";
import { Seo } from "../core/seo/Seo";
import { breadcrumbList, servicesItemListSchema } from "../core/seo/schema";
import { services } from "../data/services";

export default function ServicesPage() {
  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";

  const focusKeyword = isArabic ? "خدمات تطوير مواقع" : "web development services";

  const title = isArabic
    ? "خدمات تطوير مواقع احترافية | صفحات ومواقع ومتاجر"
    : "Web development services for speed and SEO";

  const description = isArabic
    ? "خدمات تطوير مواقع تشمل صفحات هبوط، مواقع شركات، متاجر إلكترونية، لوحات تحكم، وSEO تقني. صفحات مستقلة لكل خدمة بمخرجات وخطة تنفيذ."
    : "Web development services: landing pages, company websites, e-commerce, dashboards, and technical SEO. Separate pages per service with scope and deliverables.";

  return (
    <div dir={direction} className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <Seo
        title={title}
        description={description}
        focusKeyword={focusKeyword}
        schema={[
          breadcrumbList(isArabic ? "ar" : "en", [
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "الخدمات" : "Services", path: "/services" },
          ]),
          servicesItemListSchema(isArabic ? "ar" : "en", services, "/services"),
        ]}
      />

      <header className={direction === "rtl" ? "text-right" : "text-left"}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-cyan-100/85">
          {isArabic ? "الخدمات" : "Services"}
        </p>

        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          {isArabic ? "خدمات تطوير مواقع" : "Web development services"}
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {isArabic
            ? "كل خدمة لها صفحة مستقلة فيها النطاق والمخرجات والخطوات والمدة، حتى تكون الصورة واضحة قبل طلب عرض السعر."
            : "Each service has a dedicated page with scope, deliverables, process, and timeline—so everything is clear before requesting a quote."}
        </p>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            // Use the service slug as the unique key. `id` was never defined on
            // ServiceDefinition, causing TS errors and broken list rendering.
            key={service.slug}
            className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_55%),radial-gradient(circle_at_bottom,rgba(167,139,250,0.16),transparent_55%)] opacity-70" />
            <div className="relative">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {/* Guard against missing focusKeyword. Each service should
                     specify this field but fallback to an empty string if
                     undefined. */}
                  {service.focusKeyword?.[language] ?? ""}
              </p>

              <h2 className="mb-2 text-lg font-semibold tracking-tight text-slate-50">
                {service.title[language]}
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-slate-300">
                {service.summary[language]}
              </p>

              <div className="mb-5">
                <p className="mb-2 text-xs font-semibold text-slate-200">
                  {isArabic ? "يشمل" : "Includes"}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-200/90">
                  {service.deliverables.slice(0, 3).map((d) => (
                    <li key={d.en} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                      <span>{d[language as "en" | "ar"]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={href(`/services/${service.slug}`)}
                className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/60 px-5 py-2.5 text-xs font-semibold text-slate-100 transition hover:border-indigo-400"
              >
                {isArabic ? "تفاصيل الخدمة" : "Service details"}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-white/10 bg-slate-950/50 p-6">
        <h2 className="text-lg font-semibold text-slate-50">
          {isArabic ? "ماذا يحدث بعد طلب عرض السعر؟" : "What happens after you request a quote?"}
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-300">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-xs text-slate-200">
              1
            </span>
            <span>
              {isArabic
                ? "تحديد النطاق والهدف (مكالمة قصيرة أو رسالة واضحة)."
                : "Scope + goal alignment (short call or clear message)."}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-xs text-slate-200">
              2
            </span>
            <span>
              {isArabic
                ? "خطة تنفيذ + مخرجات + مدة زمنية واضحة."
                : "Implementation plan + deliverables + timeline."}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-xs text-slate-200">
              3
            </span>
            <span>
              {isArabic
                ? "بدء التنفيذ مع متابعة منظمة وإطلاق نسخة جاهزة."
                : "Execution with structured updates and a launch-ready delivery."}
            </span>
          </li>
        </ol>
      </section>
    </div>
  );
}
