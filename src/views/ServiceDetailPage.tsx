"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "../core/i18n/LanguageContext";
import { Seo } from "../core/seo/Seo";
import { breadcrumbList, serviceSchema } from "../core/seo/schema";
import { services, type ServiceItem } from "../data/services";
import { blogPosts, type BlogPost } from "../data/blog";
import { projects } from "../data/projects";
import { buildWhatsAppLink } from "../data/contact";
import ProjectCard from "../components/ProjectCard";

type Locale = "en" | "ar";

function bySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

type TimelineDef = { en: string; ar: string };

const TIMELINES: Record<string, TimelineDef> = {
  "landing-page": { en: "5–10 days", ar: "5–10 أيام" },
  "company-website": { en: "10–20 days", ar: "10–20 يومًا" },
  ecommerce: { en: "3–6 weeks", ar: "3–6 أسابيع" },
  dashboard: { en: "3–6 weeks", ar: "3–6 أسابيع" },
  "seo-performance": { en: "7–14 days", ar: "7–14 يومًا" },
  maintenance: { en: "Monthly support", ar: "دعم شهري" },
};

const WHAT_I_NEED: Record<string, { en: string[]; ar: string[] }> = {
  "landing-page": {
    en: [
      "Your offer + target audience (one clear goal)",
      "Brand assets (logo/colors) if available",
      "Any existing copy or references you like",
      "A contact method (WhatsApp / email / form)",
    ],
    ar: [
      "العرض + الجمهور المستهدف (هدف واحد واضح)",
      "هوية بصرية (لوجو/ألوان) إن وجدت",
      "أي محتوى جاهز أو أمثلة تعجبك",
      "طريقة تواصل (واتساب/إيميل/نموذج)",
    ],
  },
  "company-website": {
    en: [
      "Services list + positioning (what makes you different)",
      "Brand assets + business details",
      "Any existing content/pages you want to keep",
      "Target locations (if local SEO matters)",
    ],
    ar: [
      "قائمة الخدمات + ما يميزك في السوق",
      "الهوية البصرية + معلومات الشركة",
      "أي صفحات/محتوى تريد الاحتفاظ به",
      "المناطق المستهدفة (لو SEO محلي مهم)",
    ],
  },
  ecommerce: {
    en: [
      "Product catalog (names, prices, images, categories)",
      "Shipping/returns policy (basic rules)",
      "Payment method preference (if applicable)",
      "Admin needs (optional)",
    ],
    ar: [
      "كتالوج المنتجات (أسماء/أسعار/صور/أقسام)",
      "سياسة الشحن والاسترجاع (قواعد أساسية)",
      "تفضيل طرق الدفع (إن وجدت)",
      "احتياج لوحة تحكم (اختياري)",
    ],
  },
  dashboard: {
    en: [
      "Entities and workflows (what users do daily)",
      "Data source/API details (if available)",
      "Roles/permissions (admin/staff/etc.)",
      "Key tables + filters + reporting needs",
    ],
    ar: [
      "الكيانات ومسارات العمل اليومية",
      "مصدر البيانات/تفاصيل API إن وجدت",
      "الصلاحيات (أدمن/موظف/…)",
      "الجداول والفلاتر والتقارير المطلوبة",
    ],
  },
  "seo-performance": {
    en: [
      "Your current website URL",
      "Top pages that matter (home/services/blog)",
      "Main keyword targets per page",
      "Access to analytics (optional)",
    ],
    ar: [
      "رابط موقعك الحالي",
      "أهم الصفحات (الرئيسية/الخدمات/المدونة)",
      "الكلمات الأساسية المستهدفة لكل صفحة",
      "صلاحية تحليلات الموقع (اختياري)",
    ],
  },
  maintenance: {
    en: [
      "Website URL + tech stack info",
      "List of recurring issues or tasks",
      "Access method (Git/repo or hosting dashboard)",
      "Priority rules (what matters most)",
    ],
    ar: [
      "رابط الموقع + تفاصيل التقنيات",
      "قائمة مهام/مشاكل متكررة",
      "طريقة الوصول (Git/الاستضافة)",
      "تحديد الأولويات (ما الأهم دائمًا)",
    ],
  },
};

const FAQS: Record<string, { q: { en: string; ar: string }; a: { en: string; ar: string } }[]> = {
  "landing-page": [
    {
      q: { en: "Is copywriting included?", ar: "هل كتابة المحتوى ضمن الخدمة؟" },
      a: {
        en: "Yes—light copy polish is included. If you have a draft, we refine it for clarity and conversion.",
        ar: "نعم—يوجد ضبط وصياغة خفيفة. إذا كان لديك مسودة سنحسنها لتكون أوضح وأكثر تحويلًا.",
      },
    },
    {
      q: { en: "Will it be fast on mobile?", ar: "هل ستكون سريعة على الموبايل؟" },
      a: {
        en: "Yes. Performance and clean UI are part of the delivery, with attention to LCP and layout stability.",
        ar: "نعم. الأداء جزء أساسي من التنفيذ مع اهتمام بـ LCP وثبات التخطيط.",
      },
    },
    {
      q: { en: "Can we track conversions?", ar: "هل يمكن تتبع التحويل؟" },
      a: {
        en: "We can wire tracking events if you provide the tools (GA/GTM or platform).",
        ar: "يمكن إضافة تتبع إذا وفرت أدوات القياس (GA/GTM أو المنصة).",
      },
    },
  ],
  "company-website": [
    {
      q: { en: "Do you set up SEO for each page?", ar: "هل يتم ضبط SEO لكل صفحة؟" },
      a: {
        en: "Yes. Titles, descriptions, headings, internal links, and schema are part of the baseline.",
        ar: "نعم. العناوين والوصف وHeading والروابط الداخلية والسكيما ضمن الأساسيات.",
      },
    },
    {
      q: { en: "Can we add new pages later?", ar: "هل يمكن إضافة صفحات لاحقًا؟" },
      a: {
        en: "Yes. The structure is designed to scale: services, case studies, and blog expansion.",
        ar: "نعم. الهيكلة مصممة للتوسع: خدمات، دراسات حالة، ومدونة.",
      },
    },
    {
      q: { en: "Arabic and English both supported?", ar: "هل يدعم العربية والإنجليزية؟" },
      a: {
        en: "Yes—clean language separation with correct direction and safe mixed tokens (numbers/brands).",
        ar: "نعم—فصل محتوى صحيح واتجاه مضبوط مع حماية مزج الرموز والأرقام.",
      },
    },
  ],
  ecommerce: [
    {
      q: { en: "Is checkout included?", ar: "هل مسار الشراء ضمن الخدمة؟" },
      a: {
        en: "Yes. A clear cart + checkout flow is included. Payment wiring depends on provider choice.",
        ar: "نعم. السلة ومسار الشراء ضمن الخدمة. ربط الدفع يعتمد على مزود الدفع المختار.",
      },
    },
    {
      q: { en: "Can we add an admin dashboard?", ar: "هل يمكن إضافة لوحة تحكم؟" },
      a: {
        en: "Yes. Admin basics can be added as a scoped extension based on your workflows.",
        ar: "نعم. يمكن إضافة لوحة تحكم كأسكوب إضافي حسب احتياجك.",
      },
    },
    {
      q: { en: "Will product pages be SEO-ready?", ar: "هل صفحات المنتج جاهزة للـ SEO؟" },
      a: {
        en: "Yes. Clean metadata, structured content, and image optimization are part of the plan.",
        ar: "نعم. ميتا قوية ومحتوى منظم وتحسين صور ضمن التنفيذ.",
      },
    },
  ],
  dashboard: [
    {
      q: { en: "Do you handle complex tables and filters?", ar: "هل تدعم جداول وفلاتر معقدة؟" },
      a: {
        en: "Yes. Query-driven state, predictable pagination, and clear empty/error states are included.",
        ar: "نعم. حالة Query منظمة وترقيم واضح وحالات فراغ/أخطاء محسوبة.",
      },
    },
    {
      q: { en: "What about permissions/roles?", ar: "وماذا عن الصلاحيات؟" },
      a: {
        en: "Access patterns are included and can be extended depending on roles and security needs.",
        ar: "أنماط الصلاحيات موجودة ويمكن توسيعها حسب الأدوار واحتياجات الأمان.",
      },
    },
    {
      q: { en: "Can it integrate with APIs?", ar: "هل يمكن ربطه بـ API؟" },
      a: {
        en: "Yes. Typed API integration patterns and stable loading/error UX are part of the build.",
        ar: "نعم. ربط API بأنواع واضحة وتجربة تحميل/أخطاء مستقرة ضمن التنفيذ.",
      },
    },
  ],
  "seo-performance": [
    {
      q: { en: "Do you change content or only technical fixes?", ar: "هل التعديل محتوى أم تقني فقط؟" },
      a: {
        en: "Both. We tune structure, content signals, and technical performance depending on what blocks ranking.",
        ar: "كلاهما. نضبط الهيكلة وإشارات المحتوى والأداء حسب السبب الذي يمنع الترتيب.",
      },
    },
    {
      q: { en: "When do results appear?", ar: "متى تظهر النتائج؟" },
      a: {
        en: "Some improvements are immediate (speed, clarity). Ranking changes usually take time and iterations.",
        ar: "بعض التحسينات فورية (السرعة/الوضوح). تغيّر الترتيب يحتاج وقتًا وتكرار تحسين.",
      },
    },
    {
      q: { en: "Do you add schema?", ar: "هل تضيف سكيما؟" },
      a: {
        en: "Yes. Schema is applied where it makes sense: BlogPosting, Service, Breadcrumb, etc.",
        ar: "نعم. نضيف السكيما المناسبة مثل BlogPosting وService وBreadcrumb وغيرها.",
      },
    },
  ],
  maintenance: [
    {
      q: { en: "What tasks are included?", ar: "ما الذي يشمله الدعم؟" },
      a: {
        en: "Bug fixes, content updates, and small improvements—plus performance checks when needed.",
        ar: "إصلاح أخطاء وتحديث محتوى وتحسينات صغيرة، وفحوصات أداء عند الحاجة.",
      },
    },
    {
      q: { en: "How do we manage requests?", ar: "كيف ندير الطلبات؟" },
      a: {
        en: "We set priorities and deliver in batches with a predictable weekly/monthly rhythm.",
        ar: "نحدد الأولويات وننفذ دفعات بجدول أسبوعي/شهري واضح.",
      },
    },
    {
      q: { en: "Can this include SEO updates?", ar: "هل يشمل ذلك تحديثات SEO؟" },
      a: {
        en: "Yes, lightweight SEO content/metadata updates can be included in the maintenance scope.",
        ar: "نعم، يمكن إضافة تحديثات SEO الخفيفة ضمن نطاق الصيانة.",
      },
    },
  ],
};

const RELATED_POST_TAGS: Record<string, string[]> = {
  "landing-page": ["UX", "Forms", "Validation", "SEO"],
  "company-website": ["SEO", "Schema", "Content", "RTL"],
  ecommerce: ["Images", "Performance", "SEO"],
  dashboard: ["Dashboard", "API", "Auth", "Routing"],
  "seo-performance": ["SEO", "Performance", "Images", "LCP"],
  maintenance: ["CI", "Deployment", "Maintainability"],
};

const RELATED_PROJECT_TAGS: Record<string, string[]> = {
  "landing-page": ["ui", "frontend"],
  "company-website": ["frontend", "ui", "seo"],
  ecommerce: ["ecommerce"],
  dashboard: ["dashboard", "admin", "tables"],
  "seo-performance": ["seo", "performance"],
  maintenance: ["maintainability"],
};

function scorePostForService(post: BlogPost, serviceSlug: string): number {
  const wanted = RELATED_POST_TAGS[serviceSlug] ?? [];
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));

  let score = 0;
  for (const w of wanted) {
    if (tags.has(w.toLowerCase())) score += 2;
  }

  // fallback: keyword overlap by substring
  const kw = post.focusKeyword.en.toLowerCase();
  if (serviceSlug.includes("seo") && kw.includes("seo")) score += 1;
  if (serviceSlug === "dashboard" && kw.includes("dashboard")) score += 1;

  return score;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slugParam = (params as any)?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const { language, direction, href } = useLanguage();
  const lang: Locale = language === "ar" ? "ar" : "en";
  const isArabic = lang === "ar";

  const service = slug ? bySlug(slug) : undefined;

  const relatedPosts = useMemo(() => {
    if (!service) return [];
    return [...blogPosts]
      .map((p) => ({ post: p, score: scorePostForService(p, service.slug) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.post);
  }, [service]);

  const relatedProjects = useMemo(() => {
    if (!service) return [];
    const wanted = (RELATED_PROJECT_TAGS[service.slug] ?? []).map((t) => t.toLowerCase());

    const pick = projects
      .map((p) => {
        const tags = p.tags.map((t) => t.toLowerCase());
        const hit = wanted.filter((w) => tags.includes(w)).length;
        return { p, hit };
      })
      .filter((x) => x.hit > 0)
      .sort((a, b) => b.hit - a.hit)
      .slice(0, 2)
      .map((x) => x.p);

    return pick;
  }, [service]);

  if (!service) {
    return (
      <div dir={direction} className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <Seo
          title={isArabic ? "الخدمة غير موجودة" : "Service not found"}
          description={isArabic ? "لم يتم العثور على هذه الخدمة." : "The requested service was not found."}
        />
        <h1 className="mb-3 text-2xl font-semibold text-slate-50">
          {isArabic ? "الخدمة غير موجودة" : "Service not found"}
        </h1>
        <Link
          href={href("/services")}
          className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-950/60 px-5 py-2 text-sm font-medium text-slate-100 hover:border-indigo-400"
        >
          {isArabic ? "العودة للخدمات" : "Back to services"}
        </Link>
      </div>
    );
  }

  const focusKeyword =
    service.focusKeyword?.[lang] ??
    (lang === "ar" ? "تطوير مواقع" : "website development");

  const pageTitle =
    lang === "ar"
      ? `${focusKeyword} | ${service.title.ar}`
      : `${service.title.en} | ${focusKeyword}`;

  const pageDescription =
    lang === "ar"
      ? `${service.summary.ar} نطاق واضح، مخرجات قابلة للتسليم، وخطوات تنفيذ منظمة.`
      : `${service.summary.en} Clear scope, concrete deliverables, and a structured process.`;

  const timeline = TIMELINES[service.slug] ?? (lang === "ar" ? { en: "—", ar: "—" } : { en: "—", ar: "—" });

  const waMessage =
    lang === "ar"
      ? `مرحبًا محمد، أريد خدمة: ${service.title.ar}. الهدف: [زيادة طلبات/مبيعات/وضوح]. موعد الإطلاق: [تاريخ]. أريد عرض سعر.`
      : `Hi Mohamed, I'm interested in: ${service.title.en}. Goal: [leads/sales/clarity]. Target launch: [date]. I'd like a quote.`;

  const waLink = buildWhatsAppLink(waMessage);

  const needs = WHAT_I_NEED[service.slug]?.[lang] ?? [];
  const faqs = FAQS[service.slug] ?? [];

  return (
    <div dir={direction} className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <Seo
        title={pageTitle}
        description={pageDescription}
        focusKeyword={focusKeyword}
        schema={[
          breadcrumbList(isArabic ? "ar" : "en", [
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "الخدمات" : "Services", path: "/services" },
            { name: service.title[lang], path: `/services/${service.slug}` },
          ]),
          serviceSchema(isArabic ? "ar" : "en", service, `/services/${service.slug}`),
        ]}
      />

      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href={href("/services")}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white"
        >
          <span aria-hidden>←</span>
          <span>{isArabic ? "العودة للخدمات" : "Back to services"}</span>
        </Link>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-cyan-200/90 hover:text-cyan-100"
        >
          {isArabic ? "اطلب عرض سعر" : "Request a quote"}
        </a>
      </div>

      <header className={direction === "rtl" ? "text-right" : "text-left"}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-cyan-100/85">
          {isArabic ? "الخدمة" : "Service"} • {focusKeyword}
        </p>

        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          {service.title[lang]}
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base" style={{ unicodeBidi: "plaintext" }}>
          {service.summary[lang]}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 px-6 py-3 text-sm font-semibold text-slate-950"
          >
            {isArabic ? "اطلب عرض سعر" : "Request a quote"}
          </a>

          <Link
            href={href("/contact")}
            className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-400"
          >
            {isArabic ? "تواصل" : "Contact"}
          </Link>

          <div className="text-xs text-slate-400">
            <span className="tabular-nums" dir="ltr">
              {isArabic ? `المدة المتوقعة: ${timeline.ar}` : `Timeline: ${timeline.en}`}
            </span>
          </div>
        </div>
      </header>

      {/* What you get */}
      <section className="mt-12 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-slate-950/50 p-6">
          <h2 className="text-lg font-semibold text-slate-50">
            {isArabic ? "ماذا ستحصل عليه؟" : "What you get"}
          </h2>

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold text-slate-200">
              {isArabic ? "المخرجات" : "Deliverables"}
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              {service.deliverables.map((d) => (
                <li key={d.en} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>{d[lang]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold text-slate-200">
              {isArabic ? "نتائج متوقعة" : "Outcomes"}
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              {service.outcomes.map((o) => (
                <li key={o.en} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-300/80" />
                  <span>{o[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-slate-950/50 p-6">
          <h2 className="text-lg font-semibold text-slate-50">
            {isArabic ? "كيف سيتم التنفيذ؟" : "How it will be delivered"}
          </h2>

          <ol className="mt-4 space-y-3 text-sm text-slate-300">
            {service.process.map((p, idx) => (
              <li key={p.en} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-xs text-slate-200">
                  {idx + 1}
                </span>
                <span>{p[lang]}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-xs font-semibold text-slate-100">{isArabic ? "ما الذي أحتاجه منك؟" : "What I need from you"}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {needs.map((n) => (
                <li key={n} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300/80" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
            {isArabic ? "مشاريع مرتبطة" : "Relevant projects"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            {isArabic
              ? "أمثلة من مشاريع مشابهة لتوضيح شكل التنفيذ وجودة الواجهة."
              : "Examples of similar builds to show UI quality and execution style."}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} variant="compact" />
            ))}
          </div>
        </section>
      ) : null}

      {/* Related posts */}
      <section className="mt-14 rounded-3xl border border-white/10 bg-slate-950/40 p-6">
        <h2 className="text-xl font-semibold text-slate-50">
          {isArabic ? "مقالات مرتبطة بالخدمة" : "Related posts for this service"}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          {isArabic
            ? "محتوى تقني يساعدك تفهم الاختيارات (SEO/أداء/UX) قبل اتخاذ القرار."
            : "Technical content that explains key decisions (SEO, performance, UX) before you commit."}
        </p>

        {relatedPosts.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((p) => (
              <Link
                key={p.slug}
                href={href(`/blog/${p.slug}`)}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-white/20"
              >
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {p.focusKeyword[lang]}
                </p>
                <h3 className="mb-2 text-sm font-semibold text-slate-50">{p.title[lang]}</h3>
                <p className="text-sm text-slate-300">{p.description[lang]}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm text-slate-400">
            {isArabic ? "سيتم إضافة مقالات مرتبطة بهذه الخدمة قريبًا." : "More related posts will be added soon."}
          </p>
        )}
      </section>

      {/* FAQ */}
      {faqs.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
            {isArabic ? "أسئلة شائعة" : "FAQ"}
          </h2>

          <div className="mt-6 grid gap-4">
            {faqs.map((f) => (
              <details
                key={f.q.en}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
              >
                <summary className="cursor-pointer select-none text-sm font-semibold text-slate-50">
                  {f.q[lang]}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a[lang]}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <section className="mt-14 rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6">
        <h2 className="text-lg font-semibold text-slate-50">
          {isArabic ? "جاهز للبدء؟" : "Ready to start?"}
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          {isArabic
            ? "أرسل نوع المشروع والهدف وعدد الصفحات والموعد المتوقع، وسأرد عليك بخطة واضحة وعرض سعر."
            : "Send project type, goal, number of pages, and target date. I will reply with a clear plan and quote."}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 px-6 py-3 text-sm font-semibold text-slate-950"
          >
            {isArabic ? "اطلب عرض سعر" : "Request a quote"}
          </a>

          <Link
            href={href("/contact")}
            className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-400"
          >
            {isArabic ? "صفحة التواصل" : "Contact page"}
          </Link>
        </div>
      </section>
    </div>
  );
}
