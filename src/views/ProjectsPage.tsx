"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Locale } from "../core/i18n/locale";
import { useLanguage } from "../core/i18n/LanguageContext";
import { Seo } from "../core/seo/Seo";
import { breadcrumbList, projectsItemListSchema } from "../core/seo/schema";
import ProjectCard from "../components/ProjectCard";
import { buildWhatsAppLink } from "../data/contact";
import { useProjects } from "@/lib/useSiteData";
import { usePageContent } from "@/lib/usePageContent";
import { pageHeroField, pageSeoField } from "@/lib/pageContent";
import PageHero, { HeroLink } from "@/components/layout/PageHero";

const TAGS: Array<{ value: string; labelEn: string; labelAr: string }> = [
  { value: "all",        labelEn: "All",                    labelAr: "الكل" },
  { value: "saas",       labelEn: "SaaS & Web Apps",        labelAr: "منصات ويب" },
  { value: "erp-crm-pos",labelEn: "CRM / ERP / POS",        labelAr: "أنظمة إدارة أعمال" },
  { value: "corporate",  labelEn: "Corporate Websites",      labelAr: "مواقع شركات" },
  { value: "ecommerce",  labelEn: "E-Commerce",              labelAr: "متاجر إلكترونية" },
  { value: "rescue",     labelEn: "Project Rescue",          labelAr: "إنقاذ مشاريع" },
  { value: "seo",        labelEn: "SEO & Performance",       labelAr: "SEO وأداء" },
];


export default function ProjectsPage({ locale }: { locale: Locale }) {
  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";
  const { data: allProjects = [] } = useProjects();
  const { data: page } = usePageContent("projects");
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    if (activeTag === "all") return allProjects;
    return allProjects.filter((p) => p.tags.includes(activeTag));
  }, [activeTag, allProjects]);

  const lang = isArabic ? "ar" : "en";
  const title = pageSeoField(page.seo, "title", lang);
  const description = pageSeoField(page.seo, "description", lang);
  const heroLabel = pageHeroField(page.hero, "label", lang);
  const heroHeading = pageHeroField(page.hero, "heading", lang);
  const heroSub = pageHeroField(page.hero, "sub", lang);

  const whatsappLink = buildWhatsAppLink(
    isArabic
      ? "مرحبًا محمد، شاهدت مشاريعك وأريد مشروعًا مشابهًا."
      : "Hi Mohamed, I reviewed your projects and I want something similar."
  );

  return (
    <div dir={direction} className="min-h-screen bg-white">
      <Seo
        title={title}
        description={description}
        schema={[
          breadcrumbList(isArabic ? "ar" : "en", [
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "المشاريع" : "Projects", path: "/projects" },
          ]),
          projectsItemListSchema(isArabic ? "ar" : "en", filteredProjects),
        ]}
      />

      <PageHero
        label={heroLabel}
        heading={heroHeading}
        sub={heroSub}
        actions={
          <>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-cobalt text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              {isArabic ? "اطلب مشروعاً مشابهاً" : "Request a similar project"}
            </a>
            <HeroLink href={href("/services")}>{isArabic ? "الخدمات" : "Services"}</HeroLink>
            <HeroLink href={href("/contact")} variant="outline">
              {isArabic ? "تواصل" : "Contact"}
            </HeroLink>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          {TAGS.map((t) => {
            const label = isArabic ? t.labelAr : t.labelEn;
            const isActive = activeTag === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setActiveTag(t.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-obsidian text-white"
                    : "bg-surface text-slate-600 hover:bg-slate-200 border border-border"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} variant="standard" />
          ))}
        </div>
      </div>
    </div>
  );
}
