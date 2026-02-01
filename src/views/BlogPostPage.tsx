"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import { useLanguage } from "../core/i18n/LanguageContext";
import type { Locale } from "../core/i18n/locale";

import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import GlowCard from "../components/ui/GlowCard";
import Tag from "../components/ui/Tag";

import { blogPosts, type BlogBlock, type BlogPost } from "../data/blog";
import { SERVICES, type ServiceDefinition } from "../data/services";

type Props = {
  slug: string;
  locale?: Locale;
};

function renderBlock(block: BlogBlock, locale: Locale, key: string | number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={key} className="mt-10 text-2xl font-semibold text-white">
          {block.text[locale]}
        </h2>
      );
    case "h3":
      return (
        <h3 key={key} className="mt-8 text-xl font-semibold text-white">
          {block.text[locale]}
        </h3>
      );
    case "p":
      return (
        <p key={key} className="mt-4 leading-relaxed text-slate-300">
          {block.text[locale]}
        </p>
      );
    case "code":
      return (
        <pre
          key={key}
          className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200"
        >
          <code>{block.code}</code>
        </pre>
      );
    default:
      return null;
  }
}

function scoreServiceForPost(service: ServiceDefinition, post: BlogPost, locale: Locale): number {
  const blob = `${post.title[locale]} ${post.description[locale]} ${post.focusKeyword[locale]} ${post.tags.join(" ")}`
    .toLowerCase();

  const slug = service.slug.toLowerCase();
  const title = service.title.en.toLowerCase();

  let score = 0;

  // Language-agnostic signals
  if (blob.includes("seo") || blob.includes("سيو")) {
    if (slug.includes("seo") || title.includes("seo")) score += 4;
  }
  if (blob.includes("performance") || blob.includes("سرعة") || blob.includes("الأداء")) {
    if (slug.includes("performance") || slug.includes("seo") || title.includes("performance")) score += 3;
  }
  if (blob.includes("dashboard") || blob.includes("لوحة") || blob.includes("admin")) {
    if (slug.includes("dashboard") || title.includes("dashboard")) score += 3;
  }
  if (blob.includes("e-commerce") || blob.includes("ecommerce") || blob.includes("متجر") || blob.includes("store")) {
    if (slug.includes("ecommerce") || slug.includes("online-store") || title.includes("store")) score += 3;
  }
  if (blob.includes("landing") || blob.includes("صفحة") || blob.includes("هبوط")) {
    if (slug.includes("landing") || title.includes("landing")) score += 2;
  }
  if (blob.includes("wordpress")) {
    if (slug.includes("wordpress") || title.includes("wordpress")) score += 2;
  }

  // Tag overlap (weak signal)
  const tagSet = new Set(post.tags.map((t) => t.toLowerCase()));
  const serviceWords = `${service.title.en} ${service.summary.en} ${service.slug}`.toLowerCase().split(/[^a-z0-9]+/g);
  for (const w of serviceWords) {
    if (!w) continue;
    if (tagSet.has(w)) score += 1;
  }

  return score;
}

export default function BlogPostPage({ slug, locale }: Props) {
  const { language, href } = useLanguage();
  const lang: Locale = locale ?? language;
  const isArabic = lang === "ar";

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  const relatedServices = useMemo(() => {
    if (!post) return [] as ServiceDefinition[];

    return SERVICES.slice()
      .sort((a, b) => scoreServiceForPost(b, post, lang) - scoreServiceForPost(a, post, lang))
      .slice(0, 4);
  }, [post, lang]);

  const relatedPosts = useMemo(() => {
    if (!post) return [] as BlogPost[];

    const tags = new Set(post.tags.map((t) => t.toLowerCase()));

    return blogPosts
      .filter((p) => p.slug !== post.slug)
      .map((p) => {
        const overlap = p.tags.reduce((acc, t) => (tags.has(t.toLowerCase()) ? acc + 1 : acc), 0);
        return { post: p, overlap };
      })
      .sort((a, b) => b.overlap - a.overlap || b.post.dateISO.localeCompare(a.post.dateISO))
      .slice(0, 4)
      .map((x) => x.post);
  }, [post]);

  if (!post) {
    return (
      <main dir={isArabic ? "rtl" : "ltr"} className="py-16">
        <Container>
          <SectionHeading
            title={isArabic ? "المقال غير موجود" : "Post not found"}
            subtitle={
              isArabic
                ? "الرابط غير صحيح أو تم حذف المقال."
                : "The link is incorrect or the post was removed."
            }
          />

          <div className="mt-8">
            <Link
              href={href("/blog")}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {isArabic ? "الرجوع للمدونة" : "Back to blog"}
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <article>
            <header>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                {post.title[lang]}
              </h1>
              <p className="mt-4 text-lg text-slate-300">{post.description[lang]}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.slice(0, 10).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className="mt-6 text-sm text-slate-400">
                <span>{new Date(post.dateISO).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</span>
              </div>
            </header>

            <div className="mt-10">
              {post.blocks.map((b, idx) => renderBlock(b, lang, idx))}
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href={href("/contact")}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white"
              >
                {isArabic ? "اسأل عن هذا المقال" : "Ask about this post"}
              </Link>
              <Link
                href={href("/services/seo-audit")}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {isArabic ? "تدقيق SEO تقني" : "Technical SEO audit"}
              </Link>
            </div>
          </article>

          <aside className="space-y-6">
            <GlowCard>
              <SectionHeading
                title={isArabic ? "خدمات مرتبطة" : "Related services"}
                subtitle={
                  isArabic
                    ? "اختيارات مبنية على محتوى المقال والكلمات المفتاحية."
                    : "Picked based on the post topic and keywords."
                }
              />

              <div className="mt-6 space-y-3">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={href(`/services/${s.slug}`)}
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                  >
                    <div className="text-sm font-semibold text-white">{s.title[lang]}</div>
                    <div className="mt-1 text-sm text-slate-300">{s.summary[lang]}</div>
                  </Link>
                ))}
              </div>
            </GlowCard>

            <GlowCard>
              <SectionHeading
                title={isArabic ? "مقالات مشابهة" : "Similar posts"}
                subtitle={
                  isArabic
                    ? "مواضيع قريبة قد تساعدك في نفس الهدف."
                    : "More posts that support the same goal."
                }
              />

              <div className="mt-6 space-y-3">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={href(`/blog/${p.slug}`)}
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                  >
                    <div className="text-sm font-semibold text-white">{p.title[lang]}</div>
                    <div className="mt-1 text-sm text-slate-300">{p.description[lang]}</div>
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
