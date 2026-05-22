'use client';

import Link from 'next/link';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function WhyChooseSection() {
  const { language, href } = useLanguage();
  const isAr = language === 'ar';

  const items = [
    {
      title: isAr ? 'تسليم على مراحل' : 'Milestone delivery',
      desc: isAr ? 'مراجعة التقدم في كل مرحلة قبل الانتقال للتالية.' : 'Review progress at each milestone before moving on.',
    },
    {
      title: isAr ? 'دعم 30 يوماً' : '30-day support',
      desc: isAr ? 'صيانة وتعديلات بسيطة بعد التسليم.' : 'Maintenance and minor fixes after launch.',
    },
    {
      title: isAr ? 'كود نظيف' : 'Clean code',
      desc: isAr ? 'كود منظم وموثّق يسهّل التطوير لاحقاً.' : 'Structured, documented code for future updates.',
    },
    {
      title: isAr ? 'تواصل ثنائي اللغة' : 'Bilingual communication',
      desc: isAr ? 'عربي وإنجليزي بوضوح في المتطلبات والتسليم.' : 'Clear Arabic and English throughout the project.',
    },
    {
      title: isAr ? 'SEO تقني' : 'Technical SEO',
      desc: isAr ? 'أساسيات فهرسة وأداء مدمجة من البداية.' : 'Indexing and performance built in from day one.',
    },
    {
      title: isAr ? 'تسليم ملفات التصميم' : 'Design handoff',
      desc: isAr ? 'ملفات Figma عند الحاجة مع المشروع.' : 'Figma files included when design is in scope.',
    },
  ];

  return (
    <section id="why-choose" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">
          {isAr ? 'لماذا أنا' : 'Why me'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-inter-tight font-black text-obsidian mb-10">
          {isAr ? 'لماذا تختارني؟' : 'Why choose me?'}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-2 h-2 rounded-full bg-cobalt mb-3" />
              <h3 className="font-inter-tight font-bold text-obsidian mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href={href('/contact')} className="inline-flex items-center bg-cobalt text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all">
            {isAr ? 'ابدأ مشروعك' : 'Start your project'}
          </Link>
        </div>
      </div>
    </section>
  );
}
