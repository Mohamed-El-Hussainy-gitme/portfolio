'use client';

import type { Locale } from '@/core/i18n/locale';
import WhyChooseSection from '@/components/WhyChooseSection';
import SkillsSection from '@/components/SkillsSection';
import ReviewsSection from '@/components/ReviewsSection';
import PageHero from '@/components/layout/PageHero';
import { useLanguage } from '@/core/i18n/LanguageContext';
import { useSettings } from '@/lib/useSiteData';
import { usePageContent } from '@/lib/usePageContent';
import { pageHeroField } from '@/lib/pageContent';

export default function AboutPage({ locale }: { locale: Locale }) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const { data: settings } = useSettings();
  const { data: page } = usePageContent('about');
  const lang = isAr ? 'ar' : 'en';
  const bioFallback = isAr ? settings?.about_bio_ar : settings?.about_bio_en;

  return (
    <div className="w-full min-h-screen bg-white">
      <PageHero
        label={pageHeroField(page.hero, 'label', lang)}
        heading={pageHeroField(page.hero, 'heading', lang)}
        sub={pageHeroField(page.hero, 'sub', lang) || bioFallback || ''}
      />
      <section id="why-choose">
        <WhyChooseSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="reviews">
        <ReviewsSection />
      </section>
    </div>
  );
}
