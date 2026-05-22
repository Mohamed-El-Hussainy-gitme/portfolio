'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { useBlogPosts } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function BlogPreview() {
  const { data: posts = [] } = useBlogPosts();
  const { language, href } = useLanguage();
  const isAr = language === 'ar';
  const published = posts.slice(0, 3);

  if (!published.length) return null;

  const t = {
    label: isAr ? 'مدونة المطور' : 'Developer Blog',
    heading: isAr ? 'أحدث المقالات' : 'Latest Articles',
    allArticles: isAr ? 'كل المقالات' : 'All articles',
    minRead: (n: number) => (isAr ? `${n} دقائق قراءة` : `${n} min read`),
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">{t.label}</p>
            <h2 className="text-3xl sm:text-4xl font-inter-tight font-black text-obsidian">{t.heading}</h2>
          </div>
          <Link href={href('/blog')} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-cobalt hover:underline">
            {t.allArticles} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {published.map((post) => (
            <Link
              key={post.slug}
              href={href(`/blog/${post.slug}`)}
              className="group bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-cobalt/30 transition-all"
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(post.tags || []).slice(0, 2).map((tag: string) => (
                  <span key={tag} className="text-xs bg-blue-50 text-cobalt font-medium px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-inter-tight font-bold text-obsidian text-base leading-snug mb-2 group-hover:text-cobalt transition-colors">
                {post.title[language]}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{post.description[language]}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                <span>{t.minRead(post.readingTimeMin || 5)}</span>
                {post.dateISO && <span>· {String(post.dateISO)}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
