"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "../core/i18n/LanguageContext";
import type { Locale } from "../core/i18n/locale";
import { PROFILE } from "../data/profile";
import { ICONS } from "../data/icons";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Tag from "../components/ui/Tag";
import { GlowCard } from "../components/ui/GlowCard";

type Props = { locale?: Locale };

export default function AboutPage({ locale }: Props) {
  const ctx = useLanguage();
  const language = locale ?? ctx.language;
  const direction = language === "ar" ? "rtl" : "ltr";
  const isArabic = language === "ar";

  const about = useMemo(() => {
    return isArabic ? PROFILE.about.ar : PROFILE.about.en;
  }, [isArabic]);

  const tech = useMemo(() => {
    return isArabic ? PROFILE.techStack.ar : PROFILE.techStack.en;
  }, [isArabic]);

  return (
    <main dir={direction} className="py-12">
      <Container>
        <SectionHeading
          title={isArabic ? "من أنا" : "About"}
          subtitle={
            isArabic
              ? "مطور ويب Full-Stack يركز على الأداء وSEO وتجربة مستخدم مرتبة."
              : "Full-Stack web developer focused on performance, SEO, and clean UX."
          }
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <GlowCard>
            <h2 className="text-lg font-semibold text-white">{isArabic ? "نبذة" : "Bio"}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{about}</p>
          </GlowCard>

          <GlowCard>
            <h2 className="text-lg font-semibold text-white">{isArabic ? "التقنيات" : "Tech Stack"}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </GlowCard>
        </div>

        <div className="mt-10">
          <GlowCard>
            <h2 className="text-lg font-semibold text-white">{isArabic ? "روابط" : "Links"}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={ICONS.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 underline-offset-4 hover:underline"
              >
                GitHub
              </Link>
              <Link
                href={ICONS.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 underline-offset-4 hover:underline"
              >
                LinkedIn
              </Link>
            </div>
          </GlowCard>
        </div>
      </Container>
    </main>
  );
}
