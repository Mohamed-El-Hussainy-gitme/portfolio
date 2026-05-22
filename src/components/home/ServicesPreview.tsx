'use client';

import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { useServices } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function ServicesPreview() {
  const { data: services = [] } = useServices();
  const { language, href } = useLanguage();
  const isAr = language === 'ar';
  const visible = services.slice(0, 6);

  const t = {
    tag: isAr ? 'ماذا أقدم' : 'What I Build',
    heading: isAr ? 'الخدمات' : 'Services',
    allServices: isAr ? 'كل الخدمات' : 'All services',
    details: isAr ? 'تفاصيل الخدمة' : 'Service details',
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">{t.tag}</p>
            <h2 className="text-3xl sm:text-4xl font-inter-tight font-black text-obsidian">{t.heading}</h2>
          </div>
          <Link href={href('/services')} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-cobalt hover:underline">
            {t.allServices} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((service) => {
            const title = service.title[language];
            const desc = service.summary[language];
            const keyword = service.focusKeyword?.[language];

            return (
              <Link
                key={service.slug}
                href={href(`/services/${service.slug}`)}
                className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-cobalt/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-cobalt flex items-center justify-center mb-4 group-hover:bg-cobalt group-hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                {keyword && <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{keyword}</p>}
                <h3 className="font-inter-tight font-bold text-obsidian text-base mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{desc}</p>
                <div className="flex items-center gap-1 mt-4 text-sm font-semibold text-cobalt">
                  {t.details} <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
