'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/core/i18n/LanguageContext';
import type { ProjectDefinition } from '@/data/projects';
import LazyImage from '@/components/LazyImage';
import { getAssetPath } from '@/core/utils/assetPath';

type Props = {
  project: ProjectDefinition;
  variant?: 'standard' | 'compact';
};

export default function ProjectCard({ project, variant = 'standard' }: Props) {
  const { language, href } = useLanguage();
  const isAr = language === 'ar';

  const name = project.name[language];
  const tagline = project.tagline[language];
  const coverSrc = project.screens?.[0]?.src ? getAssetPath(project.screens[0].src) : undefined;
  const coverAlt = project.screens?.[0]?.alt || name;

  if (variant === 'compact') {
    return (
      <Link
        href={href(`/projects/${project.slug}`)}
        className="group border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
      >
        <div className="relative overflow-hidden aspect-video bg-slate-100">
          <LazyImage src={coverSrc} alt={coverAlt} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-semibold flex items-center gap-1">
              {isAr ? 'عرض التفاصيل' : 'View details'} <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs text-slate-400 font-mono mb-1">
            {isAr ? 'مشروع' : 'Project'} {String(project.universe || '').padStart(2, '0')}
          </p>
          <h3 className="font-inter-tight font-bold text-obsidian text-lg leading-tight mb-2">{name}</h3>
          <p className="text-sm text-slate-500 line-clamp-2 mb-4">{tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {(project.techStack || []).slice(0, 4).map((tech) => (
              <span key={tech} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href(`/projects/${project.slug}`)}
      className="group border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
    >
      <div className="relative overflow-hidden aspect-video bg-slate-100">
        <LazyImage src={coverSrc} alt={coverAlt} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm text-xs font-mono font-bold text-slate-500 px-2 py-1 rounded-full">
          PROJECT {String(project.universe || '').padStart(2, '0')}
        </div>
      </div>
      <div className="p-6">
        <h2 className="font-inter-tight font-bold text-obsidian text-xl leading-tight mb-2">{name}</h2>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {(project.techStack || []).slice(0, 5).map((tech) => (
            <span key={tech} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-cobalt group-hover:gap-2 transition-all">
          {isAr ? 'عرض التفاصيل' : 'View details'} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </Link>
  );
}
