'use client';

import { useMemo } from 'react';
import { useSkills } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function SkillsSection() {
  const { data: skills = [] } = useSkills();
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const byCategory = useMemo(() => {
    const map: Record<string, typeof skills> = {};
    for (const sk of skills) {
      const cat = String(sk.category || 'Other');
      if (!map[cat]) map[cat] = [];
      map[cat].push(sk);
    }
    return map;
  }, [skills]);

  if (!skills.length) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">
          {isAr ? 'المهارات' : 'Skills'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-inter-tight font-black text-obsidian mb-10">
          {isAr ? 'المهارات التقنية' : 'Technical Skills'}
        </h2>

        <div className="space-y-10">
          {Object.entries(byCategory).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-bold text-obsidian mb-4">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {items.map((sk) => (
                  <div
                    key={String(sk.id)}
                    className="bg-surface border border-border rounded-xl px-4 py-3 text-center hover:border-cobalt/40 transition-colors"
                  >
                    <p className="text-sm font-semibold text-obsidian">{sk.name}</p>
                    {sk.projectCount ? (
                      <p className="text-xs text-slate-500 mt-1">
                        {sk.projectCount} {isAr ? 'مشاريع' : 'projects'}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
