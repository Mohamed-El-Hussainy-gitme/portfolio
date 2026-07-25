'use client';

import Link from 'next/link';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function WhyChooseSection() {
  const { language, href } = useLanguage();
  const isAr = language === 'ar';

  const items = [
    {
      title: isAr ? 'بفهم البزنس بتاعك' : 'Business-First Approach',
      desc: isAr ? 'بصفتي مؤسس شركة (العلا)، ببرمج لك بناءً على احتياجك الفعلي في السوق مش مجرد كود وخلاص.' : 'As a founder myself (Al-Ola), I build solutions that actually serve your market needs.',
    },
    {
      title: isAr ? 'نظام حقيقي مش قالب' : 'Custom Systems, Not Templates',
      desc: isAr ? 'ببني مشروعك بالتقنية الأنسب لاحتياجك الفعلي، مش قالب جاهز بطيء.' : 'I build your project with whatever stack actually fits your needs — not a slow, generic template.',
    },
    {
      title: isAr ? 'تطوير شامل من الصفر' : 'End-to-End Development',
      desc: isAr ? 'بنفذ الـ Front-end والـ Back-end كامل، لتسليم مشروع شغال 100% من مكان واحد.' : 'I handle both Front-end and Back-end, delivering a 100% functional product.',
    },
    {
      title: isAr ? 'دعم فني وتواصل مباشر' : 'Direct Support',
      desc: isAr ? 'أنا اللي ببرمج وأنا اللي برد عليك. مفيش وسطاء، ومفيش مماطلة في التعديلات.' : 'You deal directly with the developer who built your system. No middlemen.',
    },
    {
      title: isAr ? 'SEO وأداء سريع' : 'Performance & SEO',
      desc: isAr ? 'بهتم بسرعة الموقع وتهيئته لمحركات البحث من أول سطر كود عشان تظهر في جوجل.' : 'Fast load times and Google-ready indexing built-in from day one.',
    },
    {
      title: isAr ? 'تواصل واضح وشفاف' : 'Clear Communication',
      desc: isAr ? 'بشرح لك كل خطوة، وبوثق الكود، وبسلمك المشروع كأنه منتجي الخاص.' : 'I explain every step, document the code, and treat your project like my own.',
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