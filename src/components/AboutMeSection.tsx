"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/core/i18n/LanguageContext";

export default function AboutMeSection() {
  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";
  const pathname = usePathname() || "";

const isOnAboutPage = pathname === `/${language}/about` || pathname === "/about";

  const focusKeyword = isArabic ? "إنشاء موقع" : "website development";

  const title = isArabic ? "من أنا ولماذا أنا" : "Who I am & why me";
  const body = isArabic
    ? "مرحبًا! أنا محمد الحسيني، مطوّر ويب شامل (Full Stack) ولدي خبرة تزيد سنه في هذا المجال. أؤمن بأهمية العمل الجماعي والتعاون الوثيق مع العملاء وأفراد الفريق لتحقيق أفضل النتائج. هدفي هو تطوير مواقع حديثة ومتجاوبة مع كافة الأجهزة وكاملة الوظائف لتعزيز الحضور الرقمي لشركتك. ألتزم بتجسيد رؤيتك على أرض الواقع من خلال كود نظيف وحلول إبداعية."
    : "Hello! I'm Mohamed El Hussainy, a passionate Full Stack Web Developer with over one year of experience in the field. I excel in collaborative teamwork and believe that working closely with clients and other developers leads to the best results. My goal is to develop modern, mobile-responsive, and fully functional websites that enhance your company’s digital presence. I am committed to turning your vision into a reality with clean code and creative solutions.";

  const primaryCta = isOnAboutPage
    ? {
        href: href("#why-choose"),
        label: isArabic ? "لماذا تختارني؟" : "Why choose me?",
      }
    : {
        href: href("/about"),
        label: isArabic ? "اقرأ المزيد" : "Read more",
      };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">{focusKeyword}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{body}</p>

        <div
          className={`mt-8 flex flex-wrap gap-3 ${
            direction === "rtl" ? "flex-row-reverse justify-end" : "justify-start"
          }`}
        >
          <Link
            href={primaryCta.href}
            className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-950/60 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-indigo-400"
          >
            {primaryCta.label}
          </Link>

          <Link
            href={href("/services")}
            className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-950/60 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-indigo-400"
          >
            {isArabic ? "خدماتي" : "My services"}
          </Link>
        </div>
      </div>
    </section>
  );
}
