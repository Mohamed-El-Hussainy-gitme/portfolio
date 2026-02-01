import type { Locale } from "@/core/i18n/locale";

export type Profile = {
  hero: Record<Locale, { title: string; subtitle: string }>;
  highlights: Record<Locale, string[]>;
  about: Record<Locale, string>;
  techStack: Record<Locale, string[]>;
};

export const PROFILE: Profile = {
  hero: {
    en: {
      title: "Full-stack Web Developer",
      subtitle: "Next.js, React, TypeScript, and technical SEO — building fast, indexable websites that convert.",
    },
    ar: {
      title: "مطور فل ستاك ويب",
      subtitle: "Next.js وReact وTypeScript مع SEO تقني — مواقع سريعة قابلة للفهرسة وتحقق نتائج.",
    },
  },
  highlights: {
    en: [
      "Technical SEO and Core Web Vitals",
      "Clean architecture and scalable components",
      "Arabic/English multi-language support",
      "Production-ready Next.js apps",
    ],
    ar: [
      "SEO تقني وقياس Core Web Vitals",
      "هندسة نظيفة وقابلة للتوسّع",
      "دعم عربي/إنجليزي",
      "تطبيقات Next.js جاهزة للإنتاج",
    ],
  },
  about: {
    en: "I build modern web products with strong technical SEO, performance-first UI, and maintainable full-stack architecture. My focus is shipping measurable outcomes: better indexing, faster pages, and clearer conversion paths.",
    ar: "أطوّر منتجات ويب حديثة بهندسة فل ستاك مع SEO تقني وأولوية للأداء. هدفي تقديم نتائج قابلة للقياس: فهرسة أفضل، صفحات أسرع، ومسارات تحويل أوضح.",
  },
  techStack: {
    en: ["Next.js", "React", "TypeScript", "Node.js", "REST APIs", "Tailwind", "Technical SEO"],
    ar: ["Next.js", "React", "TypeScript", "Node.js", "REST APIs", "Tailwind", "SEO تقني"],
  },
};
