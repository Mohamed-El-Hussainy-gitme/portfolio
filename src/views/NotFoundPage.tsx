'use client';

import Link from 'next/link';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function NotFoundPage() {
  const { language, href } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">404</p>
      <h1 className="text-3xl font-inter-tight font-black text-obsidian mb-3">
        {isAr ? 'الصفحة غير موجودة' : 'Page not found'}
      </h1>
      <p className="text-slate-600 mb-8 max-w-md">
        {isAr ? 'الرابط غير صحيح أو الصفحة نُقلت.' : 'The link may be wrong or the page was moved.'}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href={href('/')} className="bg-cobalt text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        <Link href={href('/projects')} className="border border-border text-slate-700 font-medium px-6 py-2.5 rounded-xl hover:bg-slate-50">
          {isAr ? 'المشاريع' : 'Projects'}
        </Link>
      </div>
    </div>
  );
}
