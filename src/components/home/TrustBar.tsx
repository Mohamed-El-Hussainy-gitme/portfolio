'use client';

import { useSettings } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function TrustBar() {
  const { data: s } = useSettings();
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const stats = [
    { value: `${s?.years_experience ?? 1}+`, label: isAr ? 'سنة خبرة' : 'Year of Experience' },
    { value: `${s?.projects_count ?? 9}+`, label: isAr ? 'مشروع منجز' : 'Projects Delivered' },
    { value: '5/5', label: isAr ? 'تقييم العملاء' : 'Client Rating' },
    { value: isAr ? '✓ مشمول' : '✓ Included', label: isAr ? 'دعم 30 يوماً' : '30-Day Support' },
    { value: 'AR/EN', label: isAr ? 'ثنائي اللغة' : 'Bilingual' },
  ];

  return (
    <section className="bg-obsidian py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-white">
              <span className="text-lg font-black text-cobalt">{stat.value}</span>
              <span className="text-sm text-slate-400">{stat.label}</span>
              {i < stats.length - 1 && <span className="hidden sm:block text-slate-700 ms-4 select-none">·</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
