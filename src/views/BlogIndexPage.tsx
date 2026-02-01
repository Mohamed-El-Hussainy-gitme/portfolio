"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "../core/i18n/LanguageContext";
import { Seo } from "../core/seo/Seo";
import { blogItemListSchema, breadcrumbList } from "../core/seo/schema";
import { blogPosts } from "../data/blog";
import { services } from "../data/services";
import { buildWhatsAppLink } from "../data/contact";
import BlogQueryPost from "../components/BlogQueryPost";

export default function BlogIndexPage() {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";

  // Focus keyword (simple + short) — repeated naturally in the content below.
  const focusKeyword = isArabic ? "مدونة تطوير مواقع" : "web development blog";

  const title = isArabic ? "مدونة تطوير مواقع: Next.js و(SEO) وواجهات (RTL)" : "Web Development Blog: Next.js, SEO, RTL";

  const description = isArabic
    ? "مدونة تطوير مواقع بمقالات عملية عن أداء Next.js، تحسين (SEO)، واجهات (RTL)، ولوحات التحكم. للمطورين والعملاء مع أمثلة كود وخطوات واضحة."
    : "Web development blog with practical posts on Next.js performance, technical SEO, RTL UI, dashboards, and deployment. For developers and clients.";

  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const [activeTag, setActiveTag] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeTag === "all") return blogPosts;
    return blogPosts.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  // Show up to 6 services (as requested), blog links to services.
  const topServices = useMemo(() => services.slice(0, 6), []);

  const blogWhatsApp = buildWhatsAppLink(
    isArabic
      ? "مرحبًا محمد، قرأت من المدونة وأريد خطة واضحة لتنفيذ موقع + تحسين (SEO). رابط المقال الذي قرأته: "
      : "Hi Mohamed, I read your blog and want a clear plan to build a site + improve SEO. Here is the post link: "
  );

  return (
    <div dir={direction} className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <Seo
        title={title}
        description={description}
        focusKeyword={focusKeyword}
        schema={[
          breadcrumbList(isArabic ? "ar" : "en", [
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "المدونة" : "Blog", path: "/blog" },
          ]),
          blogItemListSchema(isArabic ? "ar" : "en", filtered),
        ]}
      />

      <header className={direction === "rtl" ? "text-right" : "text-left"}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-cyan-100/85">{isArabic ? "المدونة" : "Blog"}</p>

        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          {isArabic ? "مدونة تطوير مواقع بمحتوى عملي" : "A practical web development blog"}
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {isArabic
            ? "هذه مدونة تطوير مواقع تركّز على التطبيق: أداء Next.js، تحسين (SEO)، وتجربة (RTL) النظيفة. ستجد أسئلة يبحث عنها المطور مثل (LCP) و(التخزين المؤقت) وبناء المكوّنات، وأسئلة يبحث عنها العميل مثل: بناء ويب سايت، تصميم مواقع، وطلب عرض سعر — لكن بإجابات واضحة وخطوات تنفيذ."
            : "This web development blog is practical and implementation-first: Next.js performance, technical SEO, and clean RTL UX. You will find developer answers (LCP, caching, architecture) and client answers (website development, SEO basics, and what the build process looks like)."}
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
            activeTag === "all"
              ? "border-cyan-300/60 bg-cyan-400/10 text-cyan-100"
              : "border-slate-700/70 bg-slate-950/40 text-slate-200 hover:border-slate-500"
          }`}
        >
          {isArabic ? "الكل" : "All"}
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              activeTag === tag
                ? "border-violet-300/60 bg-violet-400/10 text-violet-100"
                : "border-slate-700/70 bg-slate-950/40 text-slate-200 hover:border-slate-500"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <section className="mt-10 space-y-7">
        {filtered.map((post) => (
          <div
            key={post.slug}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right_bottom,rgba(167,139,250,0.16),transparent_55%)] opacity-70" />
            <div className="relative">
              <BlogQueryPost post={post} />
            </div>
          </div>
        ))}
      </section>

      {/* SEO / GEO-rich content (visible, but kept clean) */}
      <section className="mt-14 rounded-3xl border border-white/10 bg-slate-950/40 p-7">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-50">
          {isArabic ? "كيف تستخدم مدونة تطوير مواقع بذكاء؟" : "How to use this web development blog"}
        </h2>

        <div className="space-y-4 text-sm leading-relaxed text-slate-300">
          {isArabic ? (
            <>
              <p>
                إذا كنت مطورًا: استخدم <strong>مدونة تطوير مواقع</strong> كمرجع سريع للأداء و(SEO). ستلاحظ أن كل مقال يشرح
                الفكرة، ثم يعطي خطوات تنفيذ وأمثلة كود. الهدف ليس الكلام العام، بل تقليل الأخطاء المتكررة وتسريع التسليم.
              </p>
              <p>
                إذا كنت عميلًا: <strong>مدونة تطوير مواقع</strong> تساعدك تفهم الصورة كاملة قبل ما تطلب عرض سعر. ستعرف
                الفرق بين بناء ويب سايت سريع وبين موقع بطيء، وستفهم لماذا تحسين (SEO) لا يبدأ من الكلمات فقط بل من العناوين،
                الوصف، السكيما، والسرعة.
              </p>
              <p>
                ستجد أيضًا صياغات بحث عربية شائعة (كيف يسأل الناس في جوجل والذكاء الاصطناعي) حتى تصل للمعلومة أسرع. هذه
                الصياغات مفيدة لأن <strong>مدونة تطوير مواقع</strong> تستهدف أسئلة حقيقية، وليس كلمات عشوائية.
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>بناء ويب سايت لشركة: ما الذي يرفع التحويل ويزيد الثقة؟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>تصميم مواقع (RTL): كيف تمنع خلط اللغة وتحافظ على تجربة نظيفة؟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>تحسين (SEO) لمتجر إلكتروني: عناوين + وصف + سكيما + سرعة.</span>
                </li>
              </ul>
              <p className="pt-2">
                في النهاية، <strong>مدونة تطوير مواقع</strong> ليست منفصلة عن الخدمات: اقرأ الفكرة، ثم اختر الخدمة المناسبة،
                وستصل برسالة واضحة.
              </p>
            </>
          ) : (
            <>
              <p>
                If you are a developer, use this <strong>web development blog</strong> as an implementation checklist for
                performance and SEO. Each post focuses on practical steps and short code examples—less theory, more
                shipping.
              </p>
              <p>
                If you are a client, this <strong>web development blog</strong> helps you understand what you are buying:
                speed, clean UX, clear structure, and measurable SEO foundations (titles, descriptions, schema, and
                internal links).
              </p>
              <p>
                You will also find “real search queries” patterns (how people ask Google / AI) so you can locate the exact
                answer faster. That is the point of a <strong>web development blog</strong> built for real questions, not
                random keywords.
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>Website development for a company: what builds trust and increases leads?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>RTL engineering: how to prevent language mixing and layout regressions?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>Technical SEO for e-commerce: titles + descriptions + schema + speed.</span>
                </li>
              </ul>
              <p className="pt-2">
                This <strong>web development blog</strong> supports the services: read the post, then choose the right
                service and reach out with a clear request.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Blog -> Services */}
      <section className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-slate-950/60 to-slate-900/40 p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-50">
              {isArabic ? "جاهز للتنفيذ؟ اختر خدمة" : "Ready to implement? Pick a service"}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              {isArabic
                ? "بعد قراءة المقال، اختر الخدمة الأقرب لهدفك. كل خدمة لها مخرجات واضحة وخطوات تنفيذ، ثم زر (اطلب عرض سعر) برسالة مباشرة."
                : "After reading a post, pick the service that matches your goal. Each service has clear deliverables and a direct quote request message."}
            </p>
          </div>

          <a
            href={blogWhatsApp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 px-6 py-2.5 text-sm font-semibold text-slate-950"
          >
            {isArabic ? "اطلب تنفيذ الفكرة" : "Request implementation"}
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topServices.map((s) => (
            <Link
	              key={s.slug}
	              href={`/${language}/services/${s.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 transition hover:border-white/20"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(34,211,238,0.10),transparent_55%)] opacity-70" />
              <div className="relative">
	                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
	                  {s.focusKeyword?.[language] ?? ""}
	                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-50">{s.title[language]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.summary[language]}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200/90">
                  <span>{isArabic ? "تفاصيل الخدمة" : "Service details"}</span>
                  <span className="transition group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
