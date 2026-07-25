'use client';

import { Star, ExternalLink } from 'lucide-react';
import { useReviews } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';
import LazyImage from '@/components/LazyImage';

function getInitials(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

const avatarColors = [
  'bg-blue-600',
  'bg-violet-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-cyan-600',
  'bg-indigo-600',
];

function getAvatarColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export default function ReviewsSection() {
  const { data: reviews = [] } = useReviews();
  const { language } = useLanguage();
  const isAr = language === 'ar';

  if (!reviews.length) return null;

  const t = {
    tag: isAr ? 'آراء العملاء' : 'Social Proof',
    heading: isAr ? 'ماذا يقول العملاء' : 'Verified Client Reviews',
    viewReview: isAr ? 'عرض التقييم' : 'View review',
    client: isAr ? 'عميل' : 'Client',
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">{t.tag}</p>
          <h2 className="text-3xl sm:text-4xl font-inter-tight font-black text-obsidian">{t.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => {
            const name = review.reviewerName || t.client;
            const initials = getInitials(name);
            const colorClass = getAvatarColor(review.id ?? String(i));

            return (
              <div key={String(review.id ?? i)} className="border border-border rounded-2xl p-6 bg-white hover:shadow-md transition-shadow">
                {/* Header: avatar + name + rating + link */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar circle */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colorClass} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-obsidian leading-tight">{name}</p>
                      <span className="text-xs text-slate-400">{review.platform}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= (Number(review.rating) || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                      <span className="text-xs font-bold text-obsidian ms-1">{review.rating || 5}/5</span>
                    </div>
                    {review.reviewUrl && (
                      <a href={review.reviewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-cobalt hover:underline">
                        {t.viewReview} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">{review.reviewText[language]}</p>
                {review.screenshotUrl && (
                  <LazyImage src={review.screenshotUrl} alt="Review screenshot" className="rounded-xl h-40 w-full object-cover" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

