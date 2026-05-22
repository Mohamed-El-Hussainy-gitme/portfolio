"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "../core/i18n/locale";
import { useLanguage } from "../core/i18n/LanguageContext";
import { Seo } from "../core/seo/Seo";
import { blogItemListSchema, breadcrumbList } from "../core/seo/schema";
import { buildWhatsAppLink } from "../data/contact";
import BlogQueryPost from "../components/BlogQueryPost";
import { useBlogPosts, useServices } from "@/lib/useSiteData";
import { usePageContent } from "@/lib/usePageContent";
import { pageHeroField, pageSeoField } from "@/lib/pageContent";
import PageHero, { HeroLink } from "@/components/layout/PageHero";

export default function BlogIndexPage({ locale }: { locale: Locale }) {
  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";

  const { data: blogPosts = [] } = useBlogPosts();
  const { data: services = [] } = useServices();
  const { data: page } = usePageContent("blog");

  const lang = isArabic ? "ar" : "en";
  const focusKeyword = pageSeoField(page.seo, "focus_keyword", lang);
  const title = pageSeoField(page.seo, "title", lang);
  const description = pageSeoField(page.seo, "description", lang);
  const heroLabel = pageHeroField(page.hero, "label", lang);
  const heroHeading = pageHeroField(page.hero, "heading", lang);
  const heroSub = pageHeroField(page.hero, "sub", lang);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [blogPosts]);

  const [activeTag, setActiveTag] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeTag === "all") return blogPosts;
    return blogPosts.filter((p) => p.tags.includes(activeTag));
  }, [activeTag, blogPosts]);

  const topServices = useMemo(() => services.slice(0, 6), [services]);

  const blogWhatsApp = buildWhatsAppLink(
    isArabic
      ? "مرحبًا محمد، قرأت من المدونة وأريد خطة واضحة لتنفيذ موقع + تحسين (SEO). رابط المقال الذي قرأته: "
      : "Hi Mohamed, I read your blog and want a clear plan to build a site + improve SEO. Here is the post link: "
  );

  return (
    <div dir={direction} className="min-h-screen bg-white">
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

      <PageHero
        label={heroLabel}
        heading={heroHeading}
        sub={heroSub}
        actions={
          <>
            <HeroLink href={href("/contact")}>{isArabic ? "تواصل" : "Contact"}</HeroLink>
            <HeroLink href={href("/services")} variant="outline">
              {isArabic ? "الخدمات" : "Services"}
            </HeroLink>
          </>
        }
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="py-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
            activeTag === "all"
              ? "bg-obsidian text-white border-obsidian"
              : "bg-surface text-slate-600 border-border hover:bg-slate-200"
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
                ? "bg-obsidian text-white border-obsidian"
                : "bg-surface text-slate-600 border-border hover:bg-slate-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <section className="grid gap-6 sm:grid-cols-2">
        {filtered.map((post) => (
          <BlogQueryPost key={post.slug} post={post} />
        ))}
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-surface p-8">
        <h2 className="mb-3 text-xl font-inter-tight font-bold text-obsidian">
          {isArabic ? "كيف تستخدم مدونة تطوير مواقع بذكاء؟" : "How to use this web development blog"}
        </h2>

        <div className="space-y-4 text-sm leading-relaxed text-slate-600">
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
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cobalt" />
                  <span>بناء ويب سايت لشركة: ما الذي يرفع التحويل ويزيد الثقة؟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cobalt" />
                  <span>تصميم مواقع (RTL): كيف تمنع خلط اللغة وتحافظ على تجربة نظيفة؟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cobalt" />
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
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cobalt" />
                  <span>Website development for a company: what builds trust and increases leads?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cobalt" />
                  <span>RTL engineering: how to prevent language mixing and layout regressions?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cobalt" />
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
      <section className="mt-10 rounded-2xl border border-border bg-white p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-inter-tight font-bold text-obsidian">
              {isArabic ? "جاهز للتنفيذ؟ اختر خدمة" : "Ready to implement? Pick a service"}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              {isArabic
                ? "بعد قراءة المقال، اختر الخدمة الأقرب لهدفك. كل خدمة لها مخرجات واضحة وخطوات تنفيذ، ثم زر (اطلب عرض سعر) برسالة مباشرة."
                : "After reading a post, pick the service that matches your goal. Each service has clear deliverables and a direct quote request message."}
            </p>
          </div>

          <a
            href={blogWhatsApp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-cobalt px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            {isArabic ? "اطلب تنفيذ الفكرة" : "Request implementation"}
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topServices.map((s) => (
            <Link
	              key={s.slug}
	              href={href(`/services/${s.slug}`)}
              className="group border border-border rounded-2xl bg-white p-6 hover:shadow-lg hover:border-cobalt/30 transition-all"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-cobalt">
                  {s.focusKeyword?.[language] ?? ""}
                </p>
                <h3 className="mt-2 text-lg font-inter-tight font-bold text-obsidian group-hover:text-cobalt transition-colors">
                  {s.title[language]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.summary[language]}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-cobalt">
                  <span>{isArabic ? "تفاصيل الخدمة" : "Service details"}</span>
                  <span className="transition group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
            </Link>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
