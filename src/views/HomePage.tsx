"use client";

import type { Locale } from "@/core/i18n/locale";
import HeroSection from "@/components/HeroSection";
import AboutMeSection from "@/components/AboutMeSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import SkillsSection from "@/components/SkillsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import BlogQueryPost from "@/components/BlogQueryPost";
import { blogPosts } from "@/data/blog";

export default function HomePage({ locale }: { locale: Locale }) {
  // `locale` is still useful for typed routing (even if the UI uses LanguageContext).
  void locale;

  // Navbar + footer are rendered once globally in <PageLayout />.
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
        <HeroSection />
        <WhyChooseSection />
        <AboutMeSection />
        <SkillsSection />
        <FeaturedProjectsSection />
        <ReviewsSection />
	    	{blogPosts[0] ? <BlogQueryPost post={blogPosts[0]} /> : null}
    </div>
  );
}
