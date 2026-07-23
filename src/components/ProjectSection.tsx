"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../core/i18n/LanguageContext";
import { CinematicTitle } from "./CinematicTitle";
import type { ProjectDefinition, ProjectHighlight, ProjectCaseStudy, Locale } from "../data/projects";
import { getAssetPath } from "../core/utils/assetPath";
import { buildWhatsAppLink } from "../data/contact";

interface ProjectSectionProps {
  project: ProjectDefinition;
}

function inferFocusKeyword(techStack: string[], isArabic: boolean): string {
  const stack = techStack.map((t) => t.toLowerCase());
  const has = (s: string) => stack.some((t) => t.includes(s));

  if (has("seo")) return isArabic ? "تحسين SEO" : "SEO optimization";
  if (has("e-commerce") || has("store") || has("shop")) return isArabic ? "متجر إلكتروني" : "e-commerce website";
  if (has("dashboard") || has("admin")) return isArabic ? "لوحة تحكم" : "admin dashboard";
  if (has("wordpress")) return isArabic ? "موقع ووردبريس" : "WordPress website";
  if (has("next.js") || has("next")) return isArabic ? "تطوير Next.js" : "Next.js development";
  if (has("react")) return isArabic ? "تطوير React" : "React development";
  return isArabic ? "تصميم مواقع" : "website design";
}

function getCaseStudy(project: ProjectDefinition, isArabic: boolean): ProjectCaseStudy {
  if (project.caseStudy) return project.caseStudy;

  const kw = project.focusKeyword || {
    ar: inferFocusKeyword(project.techStack, true),
    en: inferFocusKeyword(project.techStack, false),
  };

  return {
    problem: {
      ar: `الحاجة إلى ${kw.ar} بواجهة واضحة ومحتوى منظم يساعد على التحويل والظهور في البحث.`,
      en: `Need a ${kw.en} with clear UI and structured content for conversions and search visibility.`,
    },
    solution: {
      ar: "تنفيذ واجهة منظمة مع أقسام واضحة، تحسين النصوص والعناوين، وضبط الأداء والـ alt وإمكانية الوصول.",
      en: "Implement a structured UI, improve copy and headings, and tune performance, alt text, and accessibility.",
    },
    outcome: {
      ar: "صفحة مشروع أوضح، تجربة أفضل للمستخدم، وفرص أعلى للظهور عبر كلمات مفتاحية بسيطة.",
      en: "Clearer project page, better UX, and stronger ranking potential with clean keywords.",
    },
    role: {
      ar: "تنفيذ واجهة وتجربة مستخدم.",
      en: "Front-end implementation and UX.",
    },
    stack: { ar: project.techStack.join(" • "), en: project.techStack.join(" • ") },
    steps: {
      ar: ["تحديد الهدف", "تصميم الأقسام", "تنفيذ الواجهة", "تحسين الأداء", "مراجعة SEO"],
      en: ["Define goal", "Design sections", "Implement UI", "Optimize performance", "SEO review"],
    },
    faqs: [
      {
        q: { ar: "هل يمكن تنفيذ مشروع مشابه؟", en: "Can you build something similar?" },
        a: {
          ar: "نعم. أرسل المتطلبات على واتساب وسأقترح خطة تنفيذ.",
          en: "Yes. Send requirements on WhatsApp and I will propose an execution plan.",
        },
      },
      {
        q: { ar: "هل يدعم الموقع العربية وRTL؟", en: "Does it support Arabic and RTL?" },
        a: { ar: "نعم عند الحاجة حسب نوع المشروع.", en: "Yes, depending on the project." },
      },
      {
        q: { ar: "هل يمكن تحسين SEO بعد الإطلاق؟", en: "Can SEO be improved after launch?" },
        a: {
          ar: "نعم عبر تحسين المحتوى والعناوين والروابط الداخلية.",
          en: "Yes, by improving content, titles, and internal links.",
        },
      },
    ],
  };
}

function buildNarrative(locale: Locale, project: ProjectDefinition, cs: ProjectCaseStudy, focusKeyword: string): string[] {
  const title = project.name[locale];
  const techLine = project.techStack.join(" • ");

  if (locale === "ar") {
    return [
      `هذا المشروع يوضح قيمة ${focusKeyword} بشكل عملي: صفحة واضحة، أقسام مرتبة، ورسالة سهلة الفهم للمستخدم.`,
      `في "${title}" تم التعامل مع ${focusKeyword} كهدف تجاري: تقليل التشتت وزيادة وضوح القرار من أول شاشة.`,
      `محتوى دراسة الحالة هنا ليس زخرفة؛ كل جزء (المشكلة/الحل/النتيجة) يخدم ${focusKeyword} ويجعل الصفحة قابلة للفهرسة بوضوح.`,
      `الصور داخل المشروع ليست للعرض فقط؛ كل صورة لها alt مرتبط بـ ${focusKeyword} لرفع الفهم والسياق داخل نتائج البحث.`,
      `من ناحية التنفيذ، تم الاعتماد على ${techLine} مع مراعاة أداء الموبايل وتجربة المستخدم، لأن ${focusKeyword} لا ينجح مع صفحات ثقيلة.`,
      `وجود خطوات تنفيذ وFAQ يضيف قيمة ويجعل ${focusKeyword} صفحة قوية بدلًا من صفحة قصيرة.`,
    ];
  }

  return [
    `This project proves ${focusKeyword} as a real outcome: clear UI, structured sections, and readable intent for users.`,
    `In "${title}", ${focusKeyword} was treated as a business goal: reduce friction and improve decision clarity from the first viewport.`,
    `The case study content is not decoration. Problem/solution/outcome are written to support ${focusKeyword} and clear indexing signals.`,
    `Screenshots are contextual: each image has alt text aligned with ${focusKeyword} to improve accessibility and search understanding.`,
    `Implementation uses ${techLine} with attention to mobile performance, because ${focusKeyword} fails when pages are heavy.`,
    `Execution steps and FAQs add value and make ${focusKeyword} page stronger than a short showcase.`,
  ];
}

function renderFaqs(faqs: ProjectCaseStudy["faqs"] | undefined, locale: Locale) {
  if (!faqs || faqs.length === 0) return null;

  const validFaqs = faqs.filter(
    (item) => item?.q?.[locale] && item?.a?.[locale]
  );

  if (validFaqs.length === 0) return null;

  return (
    <div className="space-y-3">
      {validFaqs.map((item, idx) => (
        <details key={`faq-${idx}`} className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 overflow-hidden">
          <summary className="cursor-pointer text-sm font-semibold text-slate-100 break-words" style={{ unicodeBidi: "plaintext", wordBreak: "break-word", overflowWrap: "anywhere" }}>
            {item.q[locale]}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 break-words" style={{ unicodeBidi: "plaintext", wordBreak: "break-word", overflowWrap: "anywhere" }}>
            {item.a[locale]}
          </p>
        </details>
      ))}
    </div>
  );
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";
  const locale: Locale = isArabic ? "ar" : "en";

  const cs = useMemo(() => getCaseStudy(project, isArabic), [project, isArabic]);

  const [activeScreen, setActiveScreen] = useState(0);
  const screensCount = project.screens.length;

  const worldNumber = String(project.universe).padStart(2, "0");

  const title = project.name[language];
  const tagline = project.tagline[language];
  const description = project.description[language];

  const focusKeyword = project.focusKeyword?.[language] || inferFocusKeyword(project.techStack, isArabic);

  const getHighlight = (id: ProjectHighlight["id"]) => project.highlights.find((h) => h.id === id);

  const keyPoints = getHighlight("keyPoints");
  const focus = getHighlight("focus");
  const role = getHighlight("role");

  const currentScreen = project.screens[activeScreen];
  const currentScreenSrc = currentScreen ? getAssetPath(currentScreen.src) : "";
  const techLine = project.techStack.join(" • ");

  const screenCaption = currentScreen?.alt ?? "";

  const repoLabel = (() => {
    if (!project.repoUrl) return "";
    const isGitHub = project.repoUrl.toLowerCase().includes("github.com");
    if (isGitHub) return "GitHub";
    return isArabic ? "الكود" : "Source";
  })();

  const whatsappLink = buildWhatsAppLink(
    isArabic
      ? `مرحبًا محمد، أنا مهتم بخدمة ${focusKeyword} مشابهة لمشروع "${title}". نوع المشروع: [شركة/متجر/لوحة تحكم]. الصفحات: [عدد الصفحات]. اللغة: [عربية/إنجليزية]. الهدف: [زيادة المبيعات/جمع العملاء]. أريد عرض سعر.`
      : `Hi Mohamed, I'm interested in a ${focusKeyword} similar to "${title}". Project type: [company/shop/dashboard]. Pages: [number]. Language: [Arabic/English]. Goal: [increase sales/collect leads]. I'd like a quote.`
  );

  const narrative = useMemo(() => buildNarrative(locale, project, cs, focusKeyword), [locale, project, cs, focusKeyword]);

  const visibleNarrative = narrative.slice(0, 3);
  const moreNarrative = narrative.slice(3);

  const backArrow = direction === "rtl" ? "→" : "←";

  return (
    <section dir={direction} className="relative mx-auto max-w-6xl px-6 pb-20 lg:px-0">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/70 to-transparent" />

      <div className="mt-10 mb-6 flex items-center justify-between text-xs text-slate-400">
        <div className={direction === "rtl" ? "text-right" : "text-left"}>
          <div className="mb-1 text-[11px] uppercase tracking-[0.25em] text-slate-500">
            {isArabic ? "العالم" : "UNIVERSE"} {worldNumber}
          </div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-slate-500" style={{ unicodeBidi: "plaintext" }}>
            {tagline}
          </div>
        </div>

        <div
          className="hidden text-[11px] uppercase tracking-[0.25em] text-slate-500 md:block"
          style={{ unicodeBidi: "plaintext" }}
        >
          {techLine}
        </div>
      </div>

      <div className={`grid gap-10 md:grid-cols-2 ${direction === "rtl" ? "md:grid-flow-col-dense" : ""}`}>
        {/* Left column */}
        <div className={direction === "rtl" ? "md:order-2 text-right" : "md:order-1"}>
          <CinematicTitle text={title} className="mb-4 text-3xl font-semibold text-slate-50 md:text-4xl" />

          <p className="mb-3 text-sm font-medium text-slate-300" style={{ unicodeBidi: "plaintext" }}>
            {tagline}
          </p>

          <p className="mb-4 text-sm leading-relaxed text-slate-300" style={{ unicodeBidi: "plaintext" }}>
            {description}
          </p>

          <div className="mb-6 grid gap-4 text-xs text-slate-300 md:grid-cols-3">
            {role && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{role.label[language]}</p>
                <p className="leading-relaxed text-slate-200" style={{ unicodeBidi: "plaintext" }}>
                  {role.body[language]}
                </p>
              </div>
            )}
            {focus && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{focus.label[language]}</p>
                <p className="leading-relaxed text-slate-200" style={{ unicodeBidi: "plaintext" }}>
                  {focus.body[language]}
                </p>
              </div>
            )}
            {keyPoints && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{keyPoints.label[language]}</p>
                <p className="leading-relaxed text-slate-200" style={{ unicodeBidi: "plaintext" }}>
                  {keyPoints.body[language]}
                </p>
              </div>
            )}
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-6">
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-50">{isArabic ? "دراسة حالة" : "Case study"}</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 overflow-hidden">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {isArabic ? "المشكلة والقيود" : "Problem & constraints"}
                </p>
                <p className="text-sm leading-relaxed text-slate-200 break-words" style={{ unicodeBidi: "plaintext", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {cs.problem[language]}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 overflow-hidden">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {isArabic ? "الحل والقرارات" : "Solution & decisions"}
                </p>
                <p className="text-sm leading-relaxed text-slate-200 break-words" style={{ unicodeBidi: "plaintext", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {cs.solution[language]}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 overflow-hidden">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {isArabic ? "النتيجة والنتائج" : "Outcome & results"}
                </p>
                <p className="text-sm leading-relaxed text-slate-200 break-words whitespace-normal" style={{ unicodeBidi: "plaintext", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {cs.outcome[language]}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 overflow-hidden">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{isArabic ? "الدور" : "Role"}</p>
                <p className="text-sm leading-relaxed text-slate-200 break-words" style={{ unicodeBidi: "plaintext", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {cs.role[language]}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 overflow-hidden">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{isArabic ? "التقنيات" : "Stack"}</p>
                <p className="text-sm leading-relaxed text-slate-200 break-words" style={{ unicodeBidi: "plaintext", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {cs.stack[language]}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{isArabic ? "خطوات التنفيذ" : "Execution steps"}</p>
              <ol className="grid gap-2 text-sm leading-relaxed text-slate-200 sm:grid-cols-2" style={{ unicodeBidi: "plaintext" }}>
                {cs.steps[language].map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" aria-hidden />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className={direction === "rtl" ? "md:order-1" : "md:order-2"}>
          <div className="relative rounded-3xl bg-slate-950/90 p-[1px] shadow-[0_0_30px_rgba(15,23,42,0.9)]">
            <div className="relative rounded-[22px] bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-6">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {isArabic ? "المعرض" : "Gallery"} {worldNumber}
                </span>
                <span>
                  {screensCount ? activeScreen + 1 : 0} / {screensCount}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-slate-900/80">
                {currentScreen ? (
                  <div className="relative h-[330px] w-full">
                    <Image
                      src={currentScreenSrc}
                      alt={currentScreen.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                      priority={activeScreen === 0}
                    />
                  </div>
                ) : (
                  <div className="flex h-[330px] items-center justify-center text-xs text-slate-400">
                    {isArabic ? "أضف صور المشروع لاحقًا" : "Add project images later"}
                  </div>
                )}
              </div>

              {screensCount > 0 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {project.screens.map((screen, screenIndex) => {
                    const isActive = screenIndex === activeScreen;
                    return (
                      <button
                        key={screen.id}
                        type="button"
                        onClick={() => setActiveScreen(screenIndex)}
                        className="h-2.5 w-2.5 rounded-full"
                        aria-label={screen.alt}
                      >
                        <span
                          className={`block h-full w-full rounded-full transition-all ${
                            isActive ? "scale-110 bg-slate-50" : "bg-slate-500/60 hover:bg-slate-200/90"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate" style={{ unicodeBidi: "plaintext" }}>
                  {screenCaption}
                </span>
                <span className="text-slate-500" style={{ unicodeBidi: "plaintext" }}>
                  {repoLabel}
                </span>
              </div>

              {project.repoUrl && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/60 px-5 py-2 text-xs font-semibold text-slate-100 hover:border-indigo-400"
                  >
                    {repoLabel || (isArabic ? "الكود" : "Source")}
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-slate-50 px-5 py-2 text-xs font-semibold text-slate-950"
                    >
                      {isArabic ? "فتح الموقع" : "Open live"}
                    </a>
                  )}
                </div>
              )}

              {!project.repoUrl && project.liveUrl && (
                <div className="mt-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-slate-50 px-5 py-2 text-xs font-semibold text-slate-950"
                  >
                    {isArabic ? "فتح الموقع" : "Open live"}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/40 p-7">
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-50">{isArabic ? "شرح يساعد على SEO" : "SEO-friendly explanation"}</h2>

            <div className="space-y-4 text-sm leading-relaxed text-slate-300" style={{ unicodeBidi: "plaintext" }}>
              {visibleNarrative.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {moreNarrative.length > 0 && (
              <details className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <summary className="cursor-pointer text-sm font-semibold text-slate-100">{isArabic ? "اقرأ المزيد" : "Read more"}</summary>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300" style={{ unicodeBidi: "plaintext" }}>
                  {moreNarrative.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 px-6 py-2.5 text-sm font-semibold text-slate-950"
              >
                {isArabic ? "اطلب مثل هذا المشروع" : "Request a similar project"}
              </a>
              <Link
                href={href("/services")}
                className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/60 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-indigo-400"
              >
                {isArabic ? "الخدمات" : "Services"}
              </Link>
              <Link
                href={href("/projects")}
                className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-transparent px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-indigo-400"
              >
                <span aria-hidden>{backArrow}</span>
                <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{isArabic ? "كل المشاريع" : "All projects"}</span>
              </Link>
            </div>
          </div>

          {cs.faqs && cs.faqs.length > 0 && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/40 p-7">
              <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-50">{isArabic ? "أسئلة شائعة" : "Project FAQs"}</h2>
              {renderFaqs(cs.faqs, locale)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
