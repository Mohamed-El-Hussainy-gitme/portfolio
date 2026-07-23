"use client";

import React from "react";
import Link from "next/link";
import type { Locale } from "../core/i18n/locale";
import { useLanguage } from "../core/i18n/LanguageContext";
import { Seo } from "../core/seo/Seo";
import { breadcrumbList, servicesItemListSchema } from "../core/seo/schema";
import { useServices } from "@/lib/useSiteData";
import { usePageContent } from "@/lib/usePageContent";
import { pageHeroField, pageSeoField } from "@/lib/pageContent";
import PageHero, { HeroLink } from "@/components/layout/PageHero";

export default function ServicesPage({ locale }: { locale: Locale }) {
  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";
  const { data: services = [] } = useServices();
  const { data: page } = usePageContent("services");

  const lang = isArabic ? "ar" : "en";
  const title = pageSeoField(page.seo, "title", lang);
  const description = pageSeoField(page.seo, "description", lang);
  const focusKeyword = pageSeoField(page.seo, "focus_keyword", lang);
  const heroLabel = pageHeroField(page.hero, "label", lang);
  const heroHeading = pageHeroField(page.hero, "heading", lang);
  const heroSub = pageHeroField(page.hero, "sub", lang);

  return (
    <div dir={direction} className="min-h-screen bg-white">
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

      <PageHero
        label={heroLabel}
        heading={heroHeading}
        sub={heroSub}
        actions={
          <>
            <HeroLink href={href("/contact")}>{isArabic ? "اطلب عرض سعر" : "Get a quote"}</HeroLink>
            <HeroLink href={href("/projects")} variant="outline">
              {isArabic ? "المشاريع" : "Projects"}
            </HeroLink>
          </>
        }
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            // Use the service slug as the unique key. `id` was never defined on
            // ServiceDefinition, causing TS errors and broken list rendering.
            key={service.slug}
            className="border border-border rounded-2xl bg-white p-6 hover:shadow-lg transition-shadow"
          >
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cobalt">
                  {/* Guard against missing focusKeyword. Each service should
                     specify this field but fallback to an empty string if
                     undefined. */}
                  {service.focusKeyword?.[language] ?? ""}
              </p>

              <h2 className="mb-2 text-lg font-inter-tight font-bold text-obsidian">
                {service.title[language]}
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {service.summary[language]}
              </p>

              <div className="mb-5">
                <p className="mb-2 text-xs font-semibold text-obsidian">
                  {isArabic ? "يشمل" : "Includes"}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {service.deliverables.slice(0, 3).map((d) => (
                    <li key={d.en} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cobalt" />
                      <span>{d[language as "en" | "ar"]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={href(`/services/${service.slug}`)}
                className="inline-flex items-center justify-center rounded-xl bg-cobalt px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                {isArabic ? "تفاصيل الخدمة" : "Service details"}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="rounded-2xl border border-border bg-surface p-8">
        <h2 className="text-lg font-inter-tight font-bold text-obsidian">
          {isArabic ? "ماذا يحدث بعد طلب عرض السعر؟" : "What happens after you request a quote?"}
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt text-xs text-white">
              1
            </span>
            <span>
              {isArabic
                ? "تحديد النطاق والهدف (مكالمة قصيرة أو رسالة واضحة)."
                : "Scope + goal alignment (short call or clear message)."}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt text-xs text-white">
              2
            </span>
            <span>
              {isArabic
                ? "خطة تنفيذ + مخرجات + مدة زمنية واضحة."
                : "Implementation plan + deliverables + timeline."}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt text-xs text-white">
              3
            </span>
            <span>
              {isArabic
                ? "بدء التنفيذ مع متابعة منظمة وإطلاق نسخة جاهزة."
                : "Execution with structured updates and a launch-ready delivery."}
            </span>
          </li>
        </ol>
      </div>
      </section>
    </div>
  );
}
