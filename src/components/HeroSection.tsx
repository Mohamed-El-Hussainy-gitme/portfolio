"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <section dir={direction} className="relative overflow-hidden bg-white py-8 lg:py-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/60 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text column */}
          <div
            className={`lg:col-span-7 flex flex-col items-center text-center ${
              isArabic ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-cobalt text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
              {isArabic ? "مطور ويب ومؤسس" : "Web Developer & Founder"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-inter-tight font-black text-obsidian leading-[1.2] tracking-tight mb-5">
              {isArabic
                ? settings?.hero_heading_ar || "بناء حلول ويب قابلة للتوسع"
                : settings?.hero_heading_en || "Engineering Scalable Web Solutions"}
            </h1>

            <p
              className={`text-lg text-slate-600 leading-relaxed mb-4 max-w-xl ${
                isArabic ? "lg:mr-0" : "lg:ml-0"
              }`}
            >
              {isArabic
                ? settings?.hero_subheading_ar ||
                  "أبني مواقع الشركات وصفحات الهبوط والمتاجر الإلكترونية ولوحات التحكم."
                : settings?.hero_subheading_en ||
                  "I build company websites, landing pages, e-commerce, and dashboards."}
            </p>

            <div className="flex items-center gap-3 mb-6 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-2xl">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-700 font-medium">
                {avgRating}/5 · {reviews.length || 2}{" "}
                {isArabic ? "تقييمات موثقة" : "verified reviews"}
              </span>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-cobalt text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                {isArabic ? "اطلب عرض سعر" : "Request a quote"}
                <ArrowRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
              </a>
              <Link
                href={href("/projects")}
                className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-obsidian font-semibold px-7 py-3.5 rounded-xl hover:border-obsidian hover:bg-slate-50 transition-all shadow-sm"
              >
                {isArabic ? "شاهد المشاريع" : "View projects"}
              </Link>
            </div>
          </div>

          {/* Photo column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 via-blue-50 to-transparent rounded-full blur-2xl opacity-70" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/assets/profile.png"
                  alt="Mohamed El Hussainy"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}