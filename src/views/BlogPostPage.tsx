"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "../core/i18n/LanguageContext";
import { Seo } from "../core/seo/Seo";
import { getPostBySlug } from "../data/blog";
import { buildWhatsAppLink } from "../data/contact";
import { services } from "../data/services";

type RelatedServicePick = {
  slug: string;
  score: number;
};

function scoreServiceForPost(serviceSlug: string, postTags: string[]): number {
  const tags = new Set(postTags.map((t) => t.toLowerCase()));

  const rules: Record<string, string[]> = {
    "seo-performance": ["seo", "performance", "images", "lcp", "schema", "content"],
    dashboard: ["dashboard", "api", "auth", "security", "routing", "tables", "state"],
    ecommerce: ["images", "performance", "seo"],
    "landing-page": ["forms", "validation", "ux", "seo"],
    "company-website": ["seo", "schema", "content", "rtl", "ui"],
    maintenance: ["ci", "deployment", "maintainability"],
  };

  const wanted = rules[serviceSlug] ?? [];
  let score = 0;

  for (const w of wanted) {
    if (tags.has(w.toLowerCase())) score += 2;
  }

  return score;
}

export default function BlogPostPage({ slug: initialSlug }: { slug?: string } = {}) {
  const params = useParams();
  const slugParam = (params as any)?.slug;
  const slugFromParams = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const slug = initialSlug || slugFromParams;

  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";

  const post = slug ? getPostBySlug(slug) : undefined;

  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const relatedServices = useMemo(() => {
    if (!post) return [];

    const picks: RelatedServicePick[] = services.map((s) => ({
      slug: s.slug,
      score: scoreServiceForPost(s.slug, post.tags),
    }));

    return picks
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((p) => services.find((s) => s.slug === p.slug))
      .filter(Boolean);
  }, [post]);

  if (!post) {
    return (
      <div dir={direction} className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <Seo
          title={isArabic ? "المقال غير موجود" : "Post not found"}
          description={isArabic ? "لم يتم العثور على هذا المقال." : "The requested post was not found."}
        />
        <h1 className="mb-3 text-2xl font-semibold text-slate-50">
          {isArabic ? "المقال غير موجود" : "Post not found"}
        </h1>
        <Link
          href={href("/blog")}
          className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-950/60 px-5 py-2 text-sm font-medium text-slate-100 hover:border-indigo-400"
        >
          {isArabic ? "العودة للمدونة" : "Back to blog"}
        </Link>
      </div>
    );
  }

  const waLink = buildWhatsAppLink(
    isArabic
      ? `مرحبًا محمد، قرأت مقال: ${post.title.ar} وأريد تطبيق نفس الفكرة على مشروعي.\nرابط المقال: ${currentUrl}`
      : `Hi Mohamed, I read your post: ${post.title.en} and want to apply it to my project.\nPost link: ${currentUrl}`
  );

  return (
    <div dir={direction} className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <Seo title={post.title[language]} description={post.description[language]} focusKeyword={post.focusKeyword[language]} />

      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href={href("/blog")} className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white">
          <span aria-hidden>←</span>
          <span>{isArabic ? "العودة" : "Back"}</span>
        </Link>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-cyan-200/90 hover:text-cyan-100"
        >
          {isArabic ? "اطلب تطبيق الفكرة" : "Request implementation"}
        </a>
      </div>

      <header className={direction === "rtl" ? "text-right" : "text-left"}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-cyan-100/85">
          {new Date(post.dateISO).toLocaleDateString(language, {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </p>

        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          {post.title[language]}
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {post.description[language]}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-700/70 bg-slate-950/50 px-3 py-1 text-xs text-slate-200"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <article
        className="prose prose-invert mt-10 max-w-none prose-p:text-slate-200 prose-headings:text-slate-50 prose-strong:text-slate-50"
        style={{ unicodeBidi: "plaintext" }}
      >
        {post.blocks.map((b, idx) => {
          if (b.type === "h2") return <h2 key={idx}>{b.text[language]}</h2>;
          if (b.type === "h3") return <h3 key={idx}>{b.text[language]}</h3>;
          if (b.type === "p") return <p key={idx}>{b.text[language]}</p>;

          return (
            <pre key={idx} className="overflow-x-auto rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4">
              <code>{b.code}</code>
            </pre>
          );
        })}
      </article>

      {/* Blog -> Services (reverse direction) */}
      {relatedServices.length ? (
        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-950/50 p-6">
          <h2 className="text-lg font-semibold text-slate-50">
            {isArabic ? "خدمات مرتبطة بهذا المقال" : "Services related to this post"}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {isArabic
              ? "إذا أردت تطبيق الفكرة بشكل صحيح داخل مشروعك، هذه صفحات الخدمة المناسبة."
              : "If you want this implemented properly in your project, these service pages are a good fit."}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link
	                key={s!.slug}
	                href={href(`/services/${s!.slug}`)}
                className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-950/60 px-5 py-2 text-xs font-semibold text-slate-100 hover:border-indigo-400"
              >
                {s!.title[language]}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Single main CTA */}
      <div className="mt-10 rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6">
        <p className="mb-3 text-sm font-semibold text-slate-50">
          {isArabic ? "هل تريد تطبيق هذا على مشروعك؟" : "Want this applied to your project?"}
        </p>
        <p className="mb-4 text-sm text-slate-300">
          {isArabic
            ? "أرسل رابط موقعك أو فكرتك، وسأقترح خطوات تنفيذ واضحة تناسب هدفك."
            : "Send your site link or idea and I will propose a clear implementation plan for your goal."}
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 px-6 py-2.5 text-sm font-semibold text-slate-950"
        >
          {isArabic ? "اطلب عرض سعر" : "Request a quote"}
        </a>
      </div>
    </div>
  );
}
