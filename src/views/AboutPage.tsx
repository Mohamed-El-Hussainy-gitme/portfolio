"use client";

import type { Locale } from "@/core/i18n/locale";
import AboutMeSection from "@/components/AboutMeSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import SkillsSection from "@/components/SkillsSection";
import ReviewsSection from "@/components/ReviewsSection";

export default function AboutPage({ locale }: { locale: Locale }) {
  void locale;

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <AboutMeSection />

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
