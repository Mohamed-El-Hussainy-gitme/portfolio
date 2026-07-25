'use client';

import { useMemo } from 'react';
import { useSkills } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';

// Map skill names to their icon files in /skills/
// Covers all tech stack items found across real projects
const SKILL_ICON_MAP: Record<string, string> = {
  // ── Frontend ──────────────────────────────────────────
  'HTML':                  'html.svg',
  'HTML5':                 'html5.svg',
  'JavaScript':            'javascript.svg',
  'JS':                    'javascript.svg',
  'TypeScript':            'typescript.svg',
  'React':                 'react.svg',
  'Next.js':               'nextjs.svg',
  'Next.js 14':            'nextjs-app-router.svg',
  'Vite':                  'vite.svg',
  'React Router':          'react-router.svg',
  // ── Styling / Animation ───────────────────────────────
  'CSS':                   'css.svg',
  'Custom CSS':            'css.svg',
  'CSS Modules':           'css.svg',
  'CSS Generator':         'css-design-system-variables.svg',
  'Tailwind CSS':          'tailwind.svg',
  'Framer Motion':         'framer-motion.svg',
  'MUI':                   'mui.svg',
  'Swiper':                'swiper.svg',
  // ── State / Forms ─────────────────────────────────────
  'Redux':                 'redux.svg',
  'Zustand':               'zustand.svg',
  'Formik':                'formik.svg',
  'React Hook Form':       'react-hook-form.svg',
  // ── HTTP / Utils ──────────────────────────────────────
  'Axios':                 'axios.svg',
  // ── Maps / Data-Viz ───────────────────────────────────
  'D3.js':                 'd3.svg',
  'D3 Geo':                'd3-geo.svg',
  'Recharts':              'recharts.svg',
  'Leaflet':               'leaflet.svg',
  'React Leaflet':         'react-leaflet.svg',
  'TopoJSON':              'topojson.svg',
  // ── 3D / WebGL ────────────────────────────────────────
  'React Three Fiber':     'react-three-fiber.svg',
  'Drei':                  'react-three-drei.svg',
  // ── Backend ───────────────────────────────────────────
  'Node.js':               'nodejs.svg',
  'PHP':                   'php.svg',
  // ── Databases ─────────────────────────────────────────
  'Supabase':              'database.svg',
  'PostgreSQL':            'database.svg',
  'PostgreSQL RLS':        'database.svg',
  'MySQL':                 'database.svg',
  'Custom DB':             'database.svg',
  // ── DevOps / Tooling ──────────────────────────────────
  'Git':                   'git.svg',
  'GitHub':                'github.svg',
  'Static Export':         'static-export.svg',
  // ── SEO / Analytics ───────────────────────────────────
  'SEO':                   'seo.svg',
  'Technical SEO':         'technical-seo.svg',
  'Rank Math SEO':         'rank-math.svg',
  // ── WordPress ecosystem ───────────────────────────────
  'WordPress':             'wordpress.svg',
  'WooCommerce':           'ecommerce.svg',
  'Astra':                 'astra.svg',
  'Astra Child Theme':     'astra-child-theme.svg',
  'WPForms':               'wpforms.svg',
  // ── Admin / Dashboards ────────────────────────────────
  'Dashboard':             'admin-dashboard.svg',
  'Admin Dashboard':       'admin-dashboard.svg',
  'E-commerce':            'e-commerce.svg',
};

// Emoji fallback for techs without a local SVG
const SKILL_EMOJI_MAP: Record<string, string> = {
  'Python':               '🐍',
  'FastAPI':              '⚡',
  'SQLAlchemy':           '🗄️',
  'Alembic':              '🔄',
  'Docker':               '🐳',
  'OpenAI API':           '🤖',
  'Groq':                 '🧠',
  'Ollama':               '🦙',
  'WhatsApp API':         '💬',
  'Google Tag Manager':   '🏷️',
  'Maps API':             '🗺️',
  'Payment Gateway APIs': '💳',
  'WebGL':                '🌐',
  'Hardware API':         '🔌',
  'Real-time':            '⚡',
  'RLS':                  '🔒',
  'ERP Integration':      '🔗',
};

function SkillIcon({ name }: { name: string }) {
  const svgFile = SKILL_ICON_MAP[name];
  if (svgFile) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/skills/${svgFile}`}
        alt={name}
        width={18}
        height={18}
        className="w-[18px] h-[18px] object-contain flex-shrink-0"
      />
    );
  }
  const emoji = SKILL_EMOJI_MAP[name];
  if (emoji) {
    return <span className="text-base leading-none flex-shrink-0">{emoji}</span>;
  }
  // Generic code icon for unknown tech
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0 text-cobalt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}


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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">
          {isAr ? 'المهارات' : 'Skills'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-inter-tight font-black text-obsidian mb-8">
          {isAr ? 'المهارات التقنية' : 'Technical Skills'}
        </h2>

        <div className="space-y-6">
          {Object.entries(byCategory).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((sk) => (
                  <div
                    key={String(sk.id)}
                    className="inline-flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 hover:border-cobalt/40 hover:bg-blue-50/50 transition-colors"
                  >
                    <SkillIcon name={sk.name} />
                    <span className="text-sm font-medium text-obsidian">{sk.name}</span>
                    {sk.projectCount ? (
                      <span className="text-xs text-slate-400">{sk.projectCount}</span>
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
