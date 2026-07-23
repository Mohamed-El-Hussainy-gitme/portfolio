'use client';

import { useLanguage } from '@/core/i18n/LanguageContext';

export default function LangToggle() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-border bg-white hover:bg-slate-50 transition-all shadow-sm"
      title="Toggle language"
    >
      <span className={language === 'en' ? 'text-cobalt' : 'text-slate-400'}>EN</span>
      <span className="text-slate-300">/</span>
      <span className={language === 'ar' ? 'text-cobalt' : 'text-slate-400'}>AR</span>
    </button>
  );
}
