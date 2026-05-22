import type { PageContent, PageKey, PagesMetaMap } from '@/types/pageContent';

export const PAGE_KEYS: PageKey[] = ['projects', 'services', 'about', 'blog', 'contact'];

export const PAGE_LABELS: Record<PageKey, string> = {
  projects: 'المشاريع',
  services: 'الخدمات',
  about: 'من نحن',
  blog: 'المدونة',
  contact: 'تواصل',
};

const EMPTY_HERO = {
  label_en: '',
  label_ar: '',
  heading_en: '',
  heading_ar: '',
  sub_en: '',
  sub_ar: '',
};

const EMPTY_SEO = {
  title_en: '',
  title_ar: '',
  description_en: '',
  description_ar: '',
  focus_keyword_en: '',
  focus_keyword_ar: '',
};

export function emptyPageContent(): PageContent {
  return { hero: { ...EMPTY_HERO }, seo: { ...EMPTY_SEO } };
}

/** Defaults mirror current hardcoded copy so the site looks the same before CMS edits. */
export const DEFAULT_PAGES_META: PagesMetaMap = {
  projects: {
    hero: {
      label_en: 'Portfolio',
      label_ar: 'معرض الأعمال',
      heading_en: 'Projects & Case Studies',
      heading_ar: 'المشاريع ودراسات الحالة',
      sub_en:
        'Real projects with case studies that show the problem, solution, and outcome. Filter by type and request a similar build.',
      sub_ar:
        'مشاريع حقيقية مع دراسات حالة تُظهر المشكلة والحل والنتيجة. اختر النوع المناسب واطلب تنفيذ مشروع مشابه.',
    },
    seo: {
      title_en: 'Projects & Case Studies',
      title_ar: 'المشاريع ودراسات الحالة',
      description_en:
        'Real projects with case studies that show the problem, solution, and outcome. Filter by type and request a similar build.',
      description_ar:
        'مشاريع حقيقية مع دراسات حالة تُظهر المشكلة والحل والنتيجة. اختر النوع المناسب واطلب تنفيذ مشروع مشابه.',
      focus_keyword_en: 'portfolio projects',
      focus_keyword_ar: 'مشاريع تطوير مواقع',
    },
  },
  services: {
    hero: {
      label_en: 'Services',
      label_ar: 'الخدمات',
      heading_en: 'Web development services',
      heading_ar: 'خدمات تطوير مواقع',
      sub_en:
        'Web development services: landing pages, company websites, e-commerce, dashboards, and technical SEO. Separate pages per service with scope and deliverables.',
      sub_ar:
        'خدمات تطوير مواقع تشمل صفحات هبوط، مواقع شركات، متاجر إلكترونية، لوحات تحكم، وSEO تقني. صفحات مستقلة لكل خدمة بمخرجات وخطة تنفيذ.',
    },
    seo: {
      title_en: 'Web development services for speed and SEO',
      title_ar: 'خدمات تطوير مواقع احترافية | صفحات ومواقع ومتاجر',
      description_en:
        'Web development services: landing pages, company websites, e-commerce, dashboards, and technical SEO. Separate pages per service with scope and deliverables.',
      description_ar:
        'خدمات تطوير مواقع تشمل صفحات هبوط، مواقع شركات، متاجر إلكترونية، لوحات تحكم، وSEO تقني. صفحات مستقلة لكل خدمة بمخرجات وخطة تنفيذ.',
      focus_keyword_en: 'web development services',
      focus_keyword_ar: 'خدمات تطوير مواقع',
    },
  },
  about: {
    hero: {
      label_en: 'About',
      label_ar: 'عن المطور',
      heading_en: 'Who I Am',
      heading_ar: 'من أنا؟',
      sub_en: '',
      sub_ar: '',
    },
    seo: {
      title_en: 'About Mohamed El-Husseiny',
      title_ar: 'من نحن | محمد الحسيني',
      description_en: 'Full-stack developer portfolio — experience, skills, and client reviews.',
      description_ar: 'مطور Full Stack — خبرة، مهارات، وتقييمات العملاء.',
      focus_keyword_en: 'about developer',
      focus_keyword_ar: 'عن المطور',
    },
  },
  blog: {
    hero: {
      label_en: 'Blog',
      label_ar: 'المدونة',
      heading_en: 'Web Development Blog: Next.js, SEO, RTL',
      heading_ar: 'مدونة تطوير مواقع: Next.js و(SEO) وواجهات (RTL)',
      sub_en:
        'Web development blog with practical posts on Next.js performance, technical SEO, RTL UI, dashboards, and deployment.',
      sub_ar:
        'مدونة تطوير مواقع بمقالات عملية عن أداء Next.js، تحسين (SEO)، واجهات (RTL)، ولوحات التحكم.',
    },
    seo: {
      title_en: 'Web Development Blog: Next.js, SEO, RTL',
      title_ar: 'مدونة تطوير مواقع: Next.js و(SEO) وواجهات (RTL)',
      description_en:
        'Web development blog with practical posts on Next.js performance, technical SEO, RTL UI, dashboards, and deployment.',
      description_ar:
        'مدونة تطوير مواقع بمقالات عملية عن أداء Next.js، تحسين (SEO)، واجهات (RTL)، ولوحات التحكم.',
      focus_keyword_en: 'web development blog',
      focus_keyword_ar: 'مدونة تطوير مواقع',
    },
  },
  contact: {
    hero: {
      label_en: 'Contact',
      label_ar: 'تواصل',
      heading_en: 'Let’s build your next project',
      heading_ar: 'لنبدأ مشروعك القادم',
      sub_en: 'Tell me about your goals — I reply on WhatsApp and email.',
      sub_ar: 'أخبرني عن هدفك — أرد عبر واتساب والبريد.',
    },
    seo: {
      title_en: 'Contact',
      title_ar: 'تواصل',
      description_en: 'Contact Mohamed El-Husseiny for web development quotes.',
      description_ar: 'تواصل مع محمد الحسيني لطلب عرض سعر لتطوير موقعك.',
      focus_keyword_en: 'contact developer',
      focus_keyword_ar: 'تواصل مطور مواقع',
    },
  },
};

export function mergePagesMeta(raw: unknown): PagesMetaMap {
  const stored = (raw && typeof raw === 'object' ? raw : {}) as PagesMetaMap;
  const merged: PagesMetaMap = {};
  for (const key of PAGE_KEYS) {
    const base = DEFAULT_PAGES_META[key] ?? emptyPageContent();
    const patch = stored[key];
    merged[key] = {
      hero: { ...base.hero, ...(patch?.hero ?? {}) },
      seo: { ...base.seo, ...(patch?.seo ?? {}) },
    };
  }
  return merged;
}

export function getPageContent(meta: PagesMetaMap, page: PageKey): PageContent {
  return meta[page] ?? DEFAULT_PAGES_META[page] ?? emptyPageContent();
}

export function pageHeroField(
  hero: PageContent['hero'],
  field: 'label' | 'heading' | 'sub',
  lang: 'en' | 'ar'
): string {
  const key = `${field}_${lang}` as keyof PageContent['hero'];
  return String(hero[key] ?? '');
}

export function pageSeoField(
  seo: PageContent['seo'],
  field: 'title' | 'description' | 'focus_keyword',
  lang: 'en' | 'ar'
): string {
  const key = `${field}_${lang}` as keyof PageContent['seo'];
  return String(seo[key] ?? '');
}
