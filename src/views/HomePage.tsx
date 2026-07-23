'use client';

import type { Locale } from '@/core/i18n/locale';
import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import AboutMeSection from '@/components/AboutMeSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import SkillsSection from '@/components/SkillsSection';
import ReviewsSection from '@/components/ReviewsSection';
import BlogPreview from '@/components/home/BlogPreview';

export default function HomePage({ locale }: { locale: Locale }) {
  // Locale is now explicitly passed and can be used by child components if needed
  // The LanguageContext provides fallback behavior for components that use it
  return (
    <div className="w-full" lang={locale}>
      <HeroSection />
      <TrustBar />
      <FeaturedProjectsSection />
      <ServicesPreview />
      <AboutMeSection />
      <WhyChooseSection />
      <SkillsSection />
      <ReviewsSection />
      <BlogPreview />
    </div>
  );
}
