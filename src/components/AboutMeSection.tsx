'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/core/i18n/LanguageContext';
import { useSettings } from '@/lib/useSiteData';

export default function AboutMeSection() {
  const { language, href } = useLanguage();
  const isAr = language === 'ar';
  const pathname = usePathname() || '';
  const { data: settings } = useSettings();
  const isOnAboutPage = pathname.includes('/about');

  const t = {
    tag: isAr ? 'عن المطور' : 'About Me',
    heading: isAr ? 'من أنا ولماذا أنا؟' : 'Who I am & why me',
    readMore: isAr ? 'اقرأ المزيد' : 'Read more',
    services: isAr ? 'خدماتي' : 'My services',
    values: isAr
      ? [
          { title: 'تسليم على مراحل', desc: 'راجع تقدم المشروع في كل مرحلة.' },
          { title: 'دعم ما بعد التسليم', desc: 'فترة صيانة 30 يوماً بعد المشروع.' },
          { title: 'كود نظيف', desc: 'كود منظم لتسهيل الصيانة.' },
          { title: 'ثنائي اللغة', desc: 'إتقان العربية والإنجليزية وتجربة RTL.' },
        ]
      : [
          { title: 'Milestone-Based', desc: 'Review progress in stages at every step.' },
          { title: 'Post-Delivery Support', desc: '30 days of maintenance after project delivery.' },
          { title: 'Clean Code', desc: 'Well-structured and commented for easy maintenance.' },
          { title: 'Bilingual UX', desc: 'Fluent in English and Arabic. RTL/LTR mastery.' },
        ],
  };

  const bio = isAr
    ? settings?.about_bio_ar || settings?.about_bio_en
    : settings?.about_bio_en;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">{t.tag}</p>
            <h2 className="text-3xl sm:text-4xl font-inter-tight font-black text-obsidian mb-6">{t.heading}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">{bio}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={isOnAboutPage ? href('#why-choose') : href('/about')}
                className="inline-flex items-center gap-2 border-2 border-obsidian text-obsidian font-semibold px-5 py-2.5 rounded-xl hover:bg-obsidian hover:text-white transition-all"
              >
                {t.readMore}
              </Link>
              <Link href={href('/services')} className="inline-flex items-center gap-2 text-cobalt font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all">
                {t.services} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {t.values.map((item, i) => (
              <div key={i} className="bg-surface border border-border rounded-2xl p-5">
                <div className="w-2 h-2 rounded-full bg-cobalt mb-3" />
                <h4 className="font-bold text-obsidian text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
