'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '@/core/i18n/LanguageContext';
import type { BlogPost } from '@/data/blog';

type Props = {
  post: BlogPost;
};

function formatDate(dateISO: string, language: 'en' | 'ar') {
  const d = new Date(dateISO);
  try {
    return d.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return dateISO;
  }
}

export default function BlogQueryPost({ post }: Props) {
  const { language, href } = useLanguage();
  const isAr = language === 'ar';

  const title = post.title[language];
  const desc = post.description[language];
  const date = formatDate(post.dateISO, language);

  return (
    <article className="group">
      <Link
        href={href(`/blog/${post.slug}`)}
        className="block bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:border-cobalt/30 transition-all"
      >
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(post.tags || []).slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-xs bg-blue-50 text-cobalt font-medium px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <h2 className="font-inter-tight font-bold text-obsidian text-lg leading-snug mb-2 group-hover:text-cobalt transition-colors">
          {title}
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
          <Clock className="w-3 h-3" />
          <span>{date}</span>
          {post.focusKeyword?.[language] ? (
            <>
              <span aria-hidden>·</span>
              <span>{post.focusKeyword[language]}</span>
            </>
          ) : null}
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4">{desc}</p>

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-cobalt group-hover:gap-2 transition-all">
          {isAr ? 'اقرأ المقال' : 'Read article'}
          <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </span>
      </Link>
    </article>
  );
}
