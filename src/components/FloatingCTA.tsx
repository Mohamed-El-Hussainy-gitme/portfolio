'use client';

import { MessageCircle } from 'lucide-react';
import { useSettings } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function FloatingCTA() {
  const { data: settings } = useSettings();
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const url = `https://wa.me/${settings?.whatsapp || '201018557413'}?text=${encodeURIComponent(
    settings?.whatsapp_quote_message_en || "Hi Mohamed, I'd like a quote."
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-50 flex items-center gap-2 bg-cobalt text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm hidden sm:inline">{isAr ? 'احجز استشارة' : 'Book a Consult'}</span>
    </a>
  );
}
