'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '@/core/i18n/LanguageContext';
import { Seo } from '@/core/seo/Seo';
import { breadcrumbList, projectCaseStudySchema } from '@/core/seo/schema';
import { useProject, useSettings } from '@/lib/useSiteData';
import LazyImage from '@/components/LazyImage';
import { getAssetPath } from '@/core/utils/assetPath';

export default function ProjectDetailPage() {
  const params = useParams();
  const slugParam = (params as { slug?: string | string[] })?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const { language, href } = useLanguage();
  const isAr = language === 'ar';
  const { data: project, isLoading } = useProject(slug || '');
  const { data: settings } = useSettings();
  const [imgIdx, setImgIdx] = useState(0);

  const t = {
    back: isAr ? 'العودة إلى المشاريع' : 'Back to projects',
    myRole: isAr ? 'دوري' : 'My Role',
    focus: isAr ? 'التركيز' : 'Focus',
    keyPoints: isAr ? 'النقاط الرئيسية' : 'Key Points',
    caseStudy: isAr ? 'دراسة الحالة' : 'Case Study',
    problem: isAr ? 'المشكلة والقيود' : 'Problem & Constraints',
    solution: isAr ? 'الحل والقرارات' : 'Solution & Decisions',
    outcome: isAr ? 'النتائج والمخرجات' : 'Outcome & Results',
    steps: isAr ? 'خطوات التنفيذ' : 'Execution Steps',
    faqs: isAr ? 'الأسئلة الشائعة' : 'Project FAQs',
    request: isAr ? 'اطلب مشروعاً مشابهاً' : 'Request a similar project',
    services: isAr ? 'الخدمات' : 'Services',
    gallery: isAr ? 'المعرض' : 'Gallery',
    techSpecs: isAr ? 'التقنيات المستخدمة' : 'Tech Specs',
    openLive: isAr ? 'فتح الموقع' : 'Open live',
    notFound: isAr ? 'المشروع غير موجود.' : 'Project not found.',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-cobalt border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-500 mb-4">{t.notFound}</p>
          <Link href={href('/projects')} className="text-cobalt font-semibold hover:underline">
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  const screens = (project.screens || []).map((s) => ({ ...s, src: getAssetPath(s.src) }));
  const roleH = project.highlights?.find((h) => h.id === 'role');
  const focusH = project.highlights?.find((h) => h.id === 'focus');
  const keyH = project.highlights?.find((h) => h.id === 'keyPoints');
  const caseStudy = project.caseStudy;
  const steps = isAr ? (caseStudy?.steps.ar ?? []) : (caseStudy?.steps.en ?? []);

  const waMsg = isAr
    ? `مرحباً محمد، أنا مهتم بمشروع مشابه لـ "${project.name.ar}". أريد عرض سعر.`
    : `Hi Mohamed, I'm interested in a project similar to "${project.name.en}". I'd like a quote.`;

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={project.seoTitle?.[language] || project.name[language]}
        description={project.seoDescription?.[language] || project.tagline[language]}
        schema={[
          breadcrumbList(isAr ? 'ar' : 'en', [
            { name: isAr ? 'الرئيسية' : 'Home', path: '/' },
            { name: isAr ? 'المشاريع' : 'Projects', path: '/projects' },
            { name: project.name[language], path: `/projects/${project.slug}` },
          ]),
          projectCaseStudySchema(isAr ? 'ar' : 'en', project),
        ]}
      />

      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={href('/projects')}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-obsidian transition-colors"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t.back}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <div>
            <p className="text-xs font-mono text-slate-400 mb-1">
              UNIVERSE {String(project.universe || '').padStart(2, '0')}
            </p>
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">{project.tagline[language]}</p>
            <h1 className="text-4xl sm:text-5xl font-inter-tight font-black text-obsidian mb-4">
              {project.name[language]}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">{project.description[language]}</p>

            {(roleH || focusH || keyH) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {roleH?.body[language] && (
                  <div className="bg-surface border border-border rounded-xl p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">{t.myRole}</p>
                    <p className="text-sm text-slate-700 leading-snug">{roleH.body[language]}</p>
                  </div>
                )}
                {focusH?.body[language] && (
                  <div className="bg-surface border border-border rounded-xl p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">{t.focus}</p>
                    <p className="text-sm text-slate-700 leading-snug">{focusH.body[language]}</p>
                  </div>
                )}
                {keyH?.body[language] && (
                  <div className="bg-surface border border-border rounded-xl p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">{t.keyPoints}</p>
                    <p className="text-sm text-slate-700 leading-snug">{keyH.body[language]}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-10">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            {(caseStudy?.problem[language] ||
              caseStudy?.solution[language] ||
              caseStudy?.outcome[language]) && (
              <div className="mb-10">
                <h2 className="text-2xl font-inter-tight font-black text-obsidian mb-6">{t.caseStudy}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: t.problem, value: caseStudy?.problem[language], color: 'border-l-red-400' },
                    { label: t.solution, value: caseStudy?.solution[language], color: 'border-l-cobalt' },
                    { label: t.outcome, value: caseStudy?.outcome[language], color: 'border-l-emerald-500' },
                  ]
                    .filter((i) => i.value)
                    .map((item, i) => (
                      <div
                        key={i}
                        className={`bg-white border border-border border-l-4 ${item.color} rounded-xl p-5`}
                      >
                        <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">{item.label}</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{item.value}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {steps?.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-obsidian mb-4">{t.steps}</h3>
                <ol className="space-y-2">
                  {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-cobalt text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {(caseStudy?.faqs?.length ?? 0) > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-obsidian mb-4">{t.faqs}</h3>
                <div className="space-y-3">
                  {caseStudy!.faqs.map((faq, i) => (
                    <div key={i} className="bg-surface border border-border rounded-xl p-5">
                      <p className="font-semibold text-obsidian text-sm mb-1">{faq.q[language]}</p>
                      <p className="text-sm text-slate-600">{faq.a[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={`https://wa.me/${settings?.whatsapp || '201018557413'}?text=${encodeURIComponent(waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cobalt text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> {t.request}
              </a>
              <Link
                href={href('/services')}
                className="inline-flex items-center gap-2 border border-border text-slate-700 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 transition-all"
              >
                {t.services}
              </Link>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit space-y-5">
            {screens.length > 0 && (
              <div className="border border-border rounded-2xl overflow-hidden bg-white">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <p className="text-xs font-semibold text-slate-500">{t.gallery}</p>
                  <p className="text-xs text-slate-400">
                    {imgIdx + 1} / {screens.length}
                  </p>
                </div>
                <LazyImage src={screens[imgIdx]?.src} alt={screens[imgIdx]?.alt} className="aspect-video w-full object-cover" />
                {screens.length > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                    <button
                      type="button"
                      onClick={() => setImgIdx((i) => Math.max(0, i - 1))}
                      disabled={imgIdx === 0}
                      className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex gap-1">
                      {screens.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImgIdx(i)}
                          className={`w-2 h-2 rounded-full ${i === imgIdx ? 'bg-cobalt' : 'bg-slate-200'}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setImgIdx((i) => Math.min(screens.length - 1, i + 1))}
                      disabled={imgIdx === screens.length - 1}
                      className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="bg-surface border border-border rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">{t.techSpecs}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs bg-white border border-border text-slate-700 px-2.5 py-1 rounded-full font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-border text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-cobalt text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-blue-700"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t.openLive}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
