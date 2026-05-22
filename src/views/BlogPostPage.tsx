'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/core/i18n/LanguageContext';
import { Seo } from '@/core/seo/Seo';
import { getPostBySlug, type BlogPost } from '@/data/blog';
import { services } from '@/data/services';
import { buildWhatsAppLink } from '@/data/contact';
import { useBlogPost } from '@/lib/useSiteData';
import DetailPageBar from '@/components/layout/DetailPageBar';

type RelatedServicePick = { slug: string; score: number };

function scoreServiceForPost(serviceSlug: string, postTags: string[]): number {
  const tags = new Set(postTags.map((t) => t.toLowerCase()));
  const rules: Record<string, string[]> = {
    'seo-performance': ['seo', 'performance', 'images', 'lcp', 'schema', 'content'],
    dashboard: ['dashboard', 'api', 'auth', 'security', 'routing', 'tables', 'state'],
    ecommerce: ['images', 'performance', 'seo'],
    'landing-page': ['forms', 'validation', 'ux', 'seo'],
    'company-website': ['seo', 'schema', 'content', 'rtl', 'ui'],
    maintenance: ['ci', 'deployment', 'maintainability'],
  };
  let score = 0;
  for (const w of rules[serviceSlug] ?? []) {
    if (tags.has(w.toLowerCase())) score += 2;
  }
  return score;
}

function mergePost(dbPost: BlogPost | null | undefined, slug: string): BlogPost | undefined {
  const staticPost = getPostBySlug(slug);
  if (!dbPost && !staticPost) return undefined;
  if (!dbPost) return staticPost;
  if (!staticPost) return dbPost;
  return {
    ...staticPost,
    ...dbPost,
    blocks: dbPost.blocks?.length ? dbPost.blocks : staticPost.blocks,
    focusKeyword: dbPost.focusKeyword?.en ? dbPost.focusKeyword : staticPost.focusKeyword,
  };
}

export default function BlogPostPage({ slug: initialSlug }: { slug?: string } = {}) {
  const params = useParams();
  const slugParam = (params as { slug?: string | string[] })?.slug;
  const slugFromParams = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const slug = initialSlug || slugFromParams || '';

  const { language, direction, href } = useLanguage();
  const isArabic = language === 'ar';
  const { data: dbPost, isLoading } = useBlogPost(slug);

  const post = useMemo(() => mergePost(dbPost ?? undefined, slug), [dbPost, slug]);

  const relatedServices = useMemo(() => {
    if (!post) return [];
    return services
      .map((s) => ({ slug: s.slug, score: scoreServiceForPost(s.slug, post.tags) }))
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((p) => services.find((s) => s.slug === p.slug))
      .filter(Boolean);
  }, [post]);

  const waLink = buildWhatsAppLink(
    isArabic
      ? `مرحبًا محمد، قرأت مقال: ${post?.title.ar ?? ''} وأريد تطبيق نفس الفكرة على مشروعي.`
      : `Hi Mohamed, I read: ${post?.title.en ?? ''} and want to apply it to my project.`
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-cobalt border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-500 mb-4">{isArabic ? 'المقال غير موجود.' : 'Post not found.'}</p>
          <Link href={href('/blog')} className="text-cobalt font-semibold hover:underline">
            {isArabic ? 'العودة للمدونة' : 'Back to blog'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir={direction} className="min-h-screen bg-white">
      <Seo
        title={post.title[language]}
        description={post.description[language]}
        focusKeyword={post.focusKeyword[language]}
      />

      <DetailPageBar
        backHref={href('/blog')}
        backLabel={isArabic ? 'العودة للمدونة' : 'Back to blog'}
        action={
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cobalt hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            {isArabic ? 'اطلب تطبيق الفكرة' : 'Request implementation'}
          </a>
        }
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">
          {new Date(post.dateISO).toLocaleDateString(language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <h1 className="font-inter-tight font-black text-3xl sm:text-4xl text-obsidian mb-4">
          {post.title[language]}
        </h1>

        <p className="text-lg text-slate-600 mb-6">{post.description[language]}</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((t) => (
            <span key={t} className="text-xs bg-blue-50 text-cobalt font-medium px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div
          className="prose prose-slate max-w-none prose-headings:font-inter-tight prose-headings:text-obsidian prose-a:text-cobalt"
          style={{ unicodeBidi: 'plaintext' }}
        >
          {post.blocks.map((b, idx) => {
            if (b.type === 'h2') {
              return (
                <h2 key={idx} className="font-inter-tight font-bold text-obsidian mt-8 mb-3">
                  {b.text[language]}
                </h2>
              );
            }
            if (b.type === 'h3') {
              return (
                <h3 key={idx} className="font-inter-tight font-semibold text-obsidian mt-6 mb-2">
                  {b.text[language]}
                </h3>
              );
            }
            if (b.type === 'p') {
              return (
                <p key={idx} className="text-slate-600 leading-relaxed mb-4">
                  {b.text[language]}
                </p>
              );
            }
            return (
              <pre
                key={idx}
                className="overflow-x-auto rounded-xl border border-border bg-surface p-4 text-sm"
              >
                <code>{b.code}</code>
              </pre>
            );
          })}
        </div>

        {relatedServices.length > 0 ? (
          <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-inter-tight font-bold text-obsidian text-lg mb-2">
              {isArabic ? 'خدمات مرتبطة' : 'Related services'}
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              {isArabic
                ? 'لتطبيق ما قرأته في مشروعك، هذه الصفحات مناسبة:'
                : 'To implement what you read, these service pages fit best:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedServices.map((s) => (
                <Link
                  key={s!.slug}
                  href={href(`/services/${s!.slug}`)}
                  className="inline-flex items-center rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-obsidian hover:border-cobalt/40 hover:text-cobalt transition"
                >
                  {s!.title[language]}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="font-inter-tight font-bold text-obsidian mb-2">
            {isArabic ? 'هل تريد تطبيق هذا على مشروعك؟' : 'Want this applied to your project?'}
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            {isArabic
              ? 'أرسل فكرتك أو رابط موقعك وسأقترح خطة تنفيذ واضحة.'
              : 'Send your idea or site link and I will propose a clear plan.'}
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cobalt text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
          >
            <MessageCircle className="w-4 h-4" />
            {isArabic ? 'اطلب عرض سعر' : 'Request a quote'}
          </a>
        </section>
      </article>
    </div>
  );
}
