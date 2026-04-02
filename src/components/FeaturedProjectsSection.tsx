"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../core/i18n/LanguageContext";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjectsSection() {
  const { language, direction, href } = useLanguage();
  const isArabic = language === "ar";

  // Keep it simple: feature the flagship Rose project first, then two more.
  const featured = [
    projects.find((p) => p.slug === "rose-ecommerce-website-development"),
    projects.find((p) => p.slug === "growlik"),
    projects[0],
  ].filter(Boolean) as typeof projects;

  return (
    <section dir={direction} className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className={direction === "rtl" ? "text-right" : "text-left"}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-cyan-100/85">
          {isArabic ? "مشاريع مختارة" : "Featured projects"}
        </p>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          {isArabic ? "دراسات حالة مختصرة" : "Concise case studies"}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {isArabic
            ? "نماذج من مشاريع حقيقية: واجهات حديثة، أداء ممتاز، وتحسين SEO منظم."
            : "A few real builds—modern UI, strong performance, and clean technical SEO."}
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} variant="compact" />
        ))}
      </div>

      <div className="mt-10">
        <Link
          href={href("/projects")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/60 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-indigo-400"
        >
          {isArabic ? "كل المشاريع" : "All projects"}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
