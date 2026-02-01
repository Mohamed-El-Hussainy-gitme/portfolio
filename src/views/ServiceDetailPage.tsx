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
import { buildWhatsAppLink } from "../data/contact";

type Props = { slug: string; locale?: Locale };

type DetailSection = {
  whatYouGet: string[];
  process: string[];
  faq: Array<{ q: string; a: string }>;
};

function getServiceDetails(locale: Locale, service: ServiceDefinition): DetailSection {
  const isArabic = locale === "ar";
  const slug = service.slug;

  const defaults: DetailSection = {
    whatYouGet: isArabic
      ? [
          "تنفيذ نظيف وقابل للتوسع مع TypeScript",
          "بنية SEO تقنية جاهزة للفهرسة (ميتا + Canonical + hreflang + Schema)",
          "تحسينات أداء أساسية (Core Web Vitals)",
          "توثيق مختصر لما تم تنفيذه وكيفية الصيانة",
        ]
      : [
          "Clean, scalable TypeScript implementation",
          "Indexable SEO setup (meta, canonical, hreflang, schema)",
          "Baseline performance work (Core Web Vitals)",
          "Short handover notes for maintenance",
        ],
    process: isArabic
      ? ["جمع المتطلبات", "تصميم الهيكل", "التنفيذ", "مراجعة SEO والأداء", "إطلاق ومتابعة"]
      : ["Requirements", "Architecture", "Implementation", "SEO & performance pass", "Launch & follow-up"],
    faq: isArabic
      ? [
          {
            q: "هل يوجد ضمان على الجودة؟",
            a: "نعم. يوجد مراجعة بعد التسليم لإصلاح أي أخطاء مرتبطة بما تم تنفيذه.",
          },
          {
            q: "هل يمكن العمل على جزء محدد فقط؟",
            a: "نعم، ممكن (مثل SEO تقني فقط أو تحسين أداء فقط) حسب الأولويات.",
          },
        ]
      : [
          {
            q: "Do you offer a quality guarantee?",
            a: "Yes. There is a post-delivery review window to fix any implementation-related issues.",
          },
          {
            q: "Can we do only a specific part?",
            a: "Yes (e.g., technical SEO only or performance only) depending on priorities.",
          },
        ],
  };

  const overrides: Partial<DetailSection> = (() => {
    switch (slug) {
      case "seo-audit":
        return {
          whatYouGet: isArabic
            ? [
                "تدقيق SEO تقني شامل (Indexing, Canonicals, hreflang, robots, sitemap)",
                "خطة إصلاح أولويات + Quick wins",
                "تحسينات Core Web Vitals ومراجعة الـ JS/CSS",
                "Schema.org مناسب لنوع الصفحات + Breadcrumbs",
              ]
            : [
                "Full technical SEO audit (indexing, canonicals, hreflang, robots, sitemap)",
                "Prioritized fix plan + quick wins",
                "Core Web Vitals improvements and JS/CSS review",
                "Schema.org tailored to your pages + breadcrumbs",
              ],
          process: isArabic
            ? ["تحليل Search Console وLogs", "فحص Sitemap/Robots", "مراجعة بنية الصفحات", "إصلاحات", "تقرير نهائي"]
            : ["Review GSC & logs", "Check sitemap/robots", "Review page architecture", "Fixes", "Final report"],
        };

      case "landing-page":
        return {
          whatYouGet: isArabic
            ? [
                "Landing page موجهة للتحويل (CTA واضح + نموذج)",
                "تتبع Google Tag + أحداث أساسية",
                "تصميم متجاوب + سرعة تحميل ممتازة",
                "تهيئة SEO لصفحة واحدة (عنوان/وصف/OG/Schema)",
              ]
            : [
                "Conversion-focused landing page (clear CTA + form)",
                "Google Tag tracking + basic events",
                "Responsive layout + fast load",
                "Single-page SEO setup (title/description/OG/schema)",
              ],
        };

      case "admin-dashboard":
        return {
          whatYouGet: isArabic
            ? [
                "لوحة تحكم بصلاحيات Roles",
                "CRUD + بحث/فلترة/ترتيب",
                "تسجيل دخول آمن + حماية مسارات",
                "لوغز ومقاييس أساسية لتحسين الاستقرار",
              ]
            : [
                "Role-based admin dashboard",
                "CRUD + search/filter/sort",
                "Secure auth + route protection",
                "Basic logs/metrics for stability",
              ],
        };

      case "online-store":
      case "ecommerce-store":
        return {
          whatYouGet: isArabic
            ? [
                "هيكلة صفحات منتجات قابلة للفهرسة",
                "تحسين تجربة الدفع (Checkout) وتقليل الاحتكاك",
                "Schema للمنتجات والتقييمات (عند توفر البيانات)",
                "تحسين الأداء على الموبايل",
              ]
            : [
                "Indexable product page architecture",
                "Checkout UX improvements to reduce friction",
                "Product/review schema (when data is available)",
                "Mobile performance improvements",
              ],
        };

      default:
        return {};
    }
  })();

  return {
    whatYouGet: overrides.whatYouGet ?? defaults.whatYouGet,
    process: overrides.process ?? defaults.process,
    faq: overrides.faq ?? defaults.faq,
  };
}

export default function ServiceDetailPage({ slug, locale }: Props) {
  const ctx = useLanguage();
  const language = locale ?? ctx.language;
  const href = ctx.href;
  const isArabic = language === "ar";

  const service = useMemo(() => SERVICES.find((s) => s.slug === slug), [slug]);

  const otherServices = useMemo(() => {
    const list = SERVICES.filter((s) => s.slug !== slug);
    return list.slice(0, 3);
  }, [slug]);

  if (!service) {
    return (
      <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-slate-950 text-slate-100">
        <Container className="py-14">
          <SectionHeading
            align={isArabic ? "right" : "left"}
            title={isArabic ? "الخدمة غير موجودة" : "Service not found"}
            subtitle={
              isArabic
                ? "الرابط غير صحيح أو تم تغيير اسم الخدمة."
                : "The URL is invalid or the service slug has changed."
            }
          />
          <Link
            href={href("/services")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
          >
            {isArabic ? "العودة للخدمات" : "Back to services"}
            <span aria-hidden>→</span>
          </Link>
        </Container>
      </main>
    );
  }

  const details = getServiceDetails(language, service);

  const waMessage = isArabic
    ? `مرحبا، أريد تفاصيل عن خدمة: ${service.title[language]} (${service.slug})`
    : `Hi, I want more details about the service: ${service.title[language]} (${service.slug})`;

  const waLink = buildWhatsAppLink(waMessage);

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-slate-950 text-slate-100">
      <Container className="py-14">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{service.title[language]}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">{service.summary[language]}</p>
            </div>
            <Tag className="shrink-0">{service.icon}</Tag>
          </div>

          {service.focusKeyword?.[language] ? (
            <p className="text-xs text-slate-400">{service.focusKeyword[language]}</p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <GlowCard>
              <h2 className="text-lg font-semibold">{isArabic ? "ماذا ستحصل؟" : "What you get"}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-300">
                {details.whatYouGet.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>
            </GlowCard>

            <GlowCard>
              <h2 className="text-lg font-semibold">{isArabic ? "الخطوات" : "Process"}</h2>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-300">
                {details.process.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ol>
            </GlowCard>

            <GlowCard>
              <h2 className="text-lg font-semibold">{isArabic ? "نقاط التنفيذ" : "Implementation bullets"}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-300">
                {service.bullets[language].map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </GlowCard>

            <GlowCard>
              <h2 className="text-lg font-semibold">{isArabic ? "أسئلة شائعة" : "FAQ"}</h2>
              <div className="mt-4 space-y-4">
                {details.faq.map((f, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold">{f.q}</h3>
                    <p className="mt-1 text-sm text-slate-300">{f.a}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>

          <aside className="space-y-6">
            <GlowCard>
              <h2 className="text-lg font-semibold">{isArabic ? "ابدأ بسرعة" : "Quick start"}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {isArabic
                  ? "اكتب 3 نقاط: هدف الصفحة/الموقع، الرابط (إن وجد)، وما هي المشكلة الحالية."
                  : "Send 3 bullets: your goal, the URL (if any), and the current problem."}
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href={href("/contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  {isArabic ? "تواصل" : "Contact"}
                  <span aria-hidden>→</span>
                </Link>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
                >
                  {isArabic ? "WhatsApp" : "WhatsApp"}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </GlowCard>

            <GlowCard>
              <h2 className="text-lg font-semibold">{isArabic ? "خدمات أخرى" : "Other services"}</h2>
              <div className="mt-3 space-y-3">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={href(`/services/${s.slug}`)}
                    className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{s.title[language]}</div>
                        <div className="mt-1 text-xs text-slate-400">{s.summary[language]}</div>
                      </div>
                      <Tag className="shrink-0">{s.icon}</Tag>
                    </div>
                  </Link>
                ))}
              </div>
            </GlowCard>
          </aside>
        </div>
      </Container>
    </main>
  );
}
