"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import { useLanguage } from "../core/i18n/LanguageContext";
import type { Locale } from "../core/i18n/locale";

import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import GlowCard from "../components/ui/GlowCard";
import Tag from "../components/ui/Tag";
import BlogQueryPost from "../components/BlogQueryPost";

import { blogPosts as BLOG_POSTS, type BlogPost } from "../data/blog";
import { SERVICES } from "../data/services";

type Props = { locale?: Locale };

export default function BlogIndexPage({ locale }: Props) {
  const ctx = useLanguage();
  const language = locale ?? ctx.language;
  const direction = language === "ar" ? "rtl" : "ltr";
  const href = ctx.href;

  const isArabic = language === "ar";

  const posts = useMemo(() => {
    return [...(BLOG_POSTS as BlogPost[])].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  }, []);

  const services = useMemo(() => {
    return SERVICES.map((s) => ({
      slug: s.slug,
      title: s.title[language],
      summary: s.summary[language],
      keywords: [s.focusKeyword?.[language], ...s.bullets[language]].filter(Boolean).slice(0, 4) as string[],
    }));
  }, [language]);

  return (
    <main dir={direction} className="py-12">
      <Container>
        <SectionHeading
          title={isArabic ? "المقالات" : "Blog"}
          subtitle={
            isArabic
              ? "محتوى عملي عن Next.js وSEO والأداء وهندسة الواجهة — بدون حشو."
              : "Practical notes on Next.js, technical SEO, performance, and frontend architecture."
          }
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-4">
            {posts.map((post) => (
              <BlogQueryPost key={post.slug} post={post} />
            ))}
          </section>

          <aside className="space-y-4">
            <GlowCard>
              <h2 className="text-base font-semibold text-white">{isArabic ? "خدمات مرتبطة" : "Related services"}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {isArabic
                  ? "اختر خدمة مرتبطة بالمقال وستجد تفاصيل واضحة وخطوات التنفيذ."
                  : "Pick a service and see scope, structure, and how the work is delivered."}
              </p>

              <div className="mt-4 space-y-3">
                {services.slice(0, 6).map((s) => (
                  <div key={s.slug}>
                    <Link
                      href={href(`/services/${s.slug}`)}
                      className="font-medium text-white underline-offset-4 hover:underline"
                    >
                      {s.title}
                    </Link>
                    <p className="mt-1 text-sm text-slate-300">{s.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {s.keywords.map((k) => (
                        <Tag key={k}>{k}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <Link href={href("/services")} className="text-sm text-slate-300 underline-offset-4 hover:underline">
                  {isArabic ? "عرض كل الخدمات" : "View all services"}
                </Link>
              </div>
            </GlowCard>

            <GlowCard>
              <h2 className="text-base font-semibold text-white">{isArabic ? "تواصل سريع" : "Quick contact"}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {isArabic
                  ? "لو عندك سؤال عن مقال أو تريد تدقيق SEO تقني للموقع، ابعت تفاصيل بسيطة."
                  : "If you want a technical SEO audit or help with a Next.js issue, send a short message."}
              </p>
              <div className="mt-5">
                <Link
                  href={href("/contact")}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
                >
                  {isArabic ? "صفحة التواصل" : "Contact page"}
                </Link>
              </div>
            </GlowCard>
          </aside>
        </div>
      </Container>
    </main>
  );
}
