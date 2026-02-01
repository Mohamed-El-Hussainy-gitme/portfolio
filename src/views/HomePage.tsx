"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import { useLanguage } from "../core/i18n/LanguageContext";
import type { Locale } from "../core/i18n/locale";

import Container from "../components/layout/Container";
import GlowCard from "../components/ui/GlowCard";
import Tag from "../components/ui/Tag";
import ReviewsSection from "../components/ReviewsSection";

import { PROFILE } from "../data/profile";
import { SERVICES } from "../data/services";
import { projects as PROJECTS, type ProjectDefinition } from "../data/projects";
import { blogPosts as BLOG_POSTS, type BlogPost } from "../data/blog";

type Props = { locale?: Locale };

export default function HomePage({ locale }: Props) {
  const ctx = useLanguage();
  const language = locale ?? ctx.language;
  const direction = language === "ar" ? "rtl" : "ltr";
  const href = ctx.href;

  const isArabic = language === "ar";

  const hero = useMemo(() => (isArabic ? PROFILE.hero.ar : PROFILE.hero.en), [isArabic]);
  const highlights = useMemo(() => (isArabic ? PROFILE.highlights.ar : PROFILE.highlights.en), [isArabic]);

  const services = useMemo(() => {
    return SERVICES.map((s) => ({
      ...s,
      title: s.title[language],
      summary: s.summary[language],
      bullets: s.bullets[language],
    }));
  }, [language]);

  const projects = useMemo(() => {
    return (PROJECTS as ProjectDefinition[]).map((p) => ({
      ...p,
      name: p.name[language],
      tagline: p.tagline[language],
    }));
  }, [language]);

  const posts = useMemo(() => {
    return (BLOG_POSTS as BlogPost[]).map((b) => ({
      ...b,
      title: b.title[language],
      description: b.description[language],
    }));
  }, [language]);

  return (
    <main dir={direction} className="py-12">
      <Container>
        {/* HERO */}
        <section>
          <h1 className="text-balance text-3xl font-bold text-white sm:text-4xl">{hero.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{hero.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={href("/contact")}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              {isArabic ? "تواصل" : "Contact"}
            </Link>

            <Link
              href={href("/projects")}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              {isArabic ? "المشاريع" : "Projects"}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {highlights.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">{isArabic ? "الخدمات" : "Services"}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {isArabic ? "اختر خدمة أو اطلب نظام كامل حسب احتياجك." : "Pick a service or request a full system."}
              </p>
            </div>

            <Link href={href("/services")} className="text-sm text-slate-300 underline-offset-4 hover:underline">
              {isArabic ? "عرض الكل" : "View all"}
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {services.slice(0, 4).map((s) => (
              <GlowCard key={s.slug} as="article">
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.summary}</p>

                <ul className="mt-4 list-disc space-y-1 ps-5 text-sm text-slate-300">
                  {s.bullets.slice(0, 3).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="mt-5">
                  <Link href={href(`/services/${s.slug}`)} className="text-sm text-white underline-offset-4 hover:underline">
                    {isArabic ? "التفاصيل" : "Details"}
                  </Link>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">{isArabic ? "مشاريع مختارة" : "Featured projects"}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {isArabic ? "نماذج أعمال توضح الجودة والأداء والتنظيم." : "A few examples that show quality, performance, and structure."}
              </p>
            </div>

            <Link href={href("/projects")} className="text-sm text-slate-300 underline-offset-4 hover:underline">
              {isArabic ? "عرض الكل" : "View all"}
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <GlowCard key={p.id} as="article">
                <h3 className="text-base font-semibold text-white">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.tagline}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-5">
                  <Link href={href(`/projects/${p.slug}`)} className="text-sm text-white underline-offset-4 hover:underline">
                    {isArabic ? "دراسة حالة" : "Case study"}
                  </Link>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">{isArabic ? "مقالات" : "Blog"}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {isArabic ? "ملاحظات عملية عن Next.js وSEO والأداء." : "Practical notes on Next.js, SEO, and performance."}
              </p>
            </div>

            <Link href={href("/blog")} className="text-sm text-slate-300 underline-offset-4 hover:underline">
              {isArabic ? "عرض الكل" : "View all"}
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {posts.slice(0, 3).map((b) => (
              <GlowCard key={b.slug} as="article">
                <h3 className="text-base font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{b.description}</p>

                <div className="mt-5">
                  <Link href={href(`/blog/${b.slug}`)} className="text-sm text-white underline-offset-4 hover:underline">
                    {isArabic ? "اقرأ" : "Read"}
                  </Link>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section className="mt-14">
          <ReviewsSection />
        </section>

        {/* CTA */}
        <section className="mt-16">
          <GlowCard>
            <h2 className="text-xl font-semibold text-white">{isArabic ? "ابدأ الآن" : "Start now"}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {isArabic
                ? "أرسل تفاصيل مشروعك وسأقترح أفضل خطة تنفيذ واضحة خطوة بخطوة."
                : "Send your project details and I’ll propose a clear step-by-step plan."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={href("/contact")}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
              >
                {isArabic ? "تواصل" : "Contact"}
              </Link>

              <Link
                href={href("/services")}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                {isArabic ? "الخدمات" : "Services"}
              </Link>
            </div>
          </GlowCard>
        </section>
      </Container>
    </main>
  );
}
