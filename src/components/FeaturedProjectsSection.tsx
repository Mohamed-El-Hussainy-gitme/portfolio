'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/core/i18n/LanguageContext';
import { useProjects } from '@/lib/useSiteData';
import ProjectCard from './ProjectCard';

export default function FeaturedProjectsSection() {
  const { language, href } = useLanguage();
  const isAr = language === 'ar';
  const { data: projects = [] } = useProjects();

  const featured = projects.filter((p) => p.isFeatured);
  const displayed = featured.length > 0 ? featured : projects.slice(0, 3);

  const t = {
    label: isAr ? 'مصفوفة الأدلة' : 'Evidence Matrix',
    heading: isAr ? 'المشاريع المميزة' : 'Featured Projects',
    allProjects: isAr ? 'كل المشاريع' : 'All projects',
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">{t.label}</p>
            <h2 className="text-3xl sm:text-4xl font-inter-tight font-black text-obsidian">{t.heading}</h2>
          </div>
          <Link href={href('/projects')} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-cobalt hover:underline">
            {t.allProjects} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project) => (
            <ProjectCard key={project.id} project={project} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
