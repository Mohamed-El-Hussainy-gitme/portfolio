"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useLanguage } from "../core/i18n/LanguageContext";
import { buildWhatsAppLink } from "../data/contact";
import { useSettings, useReviews } from "@/lib/useSiteData";

export default function HeroSection() {
  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";
  const { data: settings } = useSettings();
  const { data: reviews = [] } = useReviews();

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  const waMessage =
    settings?.whatsapp_quote_message_en ||
    (isArabic
      ? "مرحبًا محمد، أريد عرض سعر لتطوير موقع."
      : "Hi Mohamed, I'd like a quote for website development.");

  const waLink = buildWhatsAppLink(waMessage);

  return (
    <section dir={direction} className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-cobalt text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
              {isArabic ? "خدمات · SEO تقني · أداء" : "Services · Technical SEO · Performance"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-inter-tight font-black text-obsidian leading-[1.1] tracking-tight mb-6">
              {isArabic
                ? settings?.hero_heading_ar || "بناء حلول ويب قابلة للتوسع"
                : settings?.hero_heading_en || "Engineering Scalable Web Solutions"}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              {isArabic
                ? settings?.hero_subheading_ar ||
                  "أبني مواقع الشركات وصفحات الهبوط والمتاجر الإلكترونية ولوحات التحكم."
                : settings?.hero_subheading_en ||
                  "I build company websites, landing pages, e-commerce, and dashboards."}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-600 font-medium">
                {avgRating}/5 · {reviews.length || 2}{" "}
                {isArabic ? "تقييمات موثقة" : "verified reviews"}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-cobalt text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md"
              >
                {isArabic ? "اطلب عرض سعر" : "Request a quote"}
                <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </a>
              <Link
                href={href("/projects")}
                className="inline-flex items-center gap-2 border-2 border-obsidian text-obsidian font-semibold px-6 py-3 rounded-xl hover:bg-obsidian hover:text-white transition-all"
              >
                {isArabic ? "شاهد المشاريع" : "View projects"}
              </Link>
              <Link
                href={href("/services")}
                className="inline-flex items-center gap-2 text-slate-600 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 border border-border transition-all"
              >
                {isArabic ? "الخدمات" : "Services"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
