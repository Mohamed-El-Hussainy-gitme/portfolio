// ============================================================
// THIS FILE IS AUTO-GENERATED – DO NOT EDIT MANUALLY
// Source: scripts/rebuild-projects-ts.js
// Last updated: Based on direct client Q&A (100% human accurate data)
// ============================================================

export type LocalizedText = { en: string; ar: string };

export interface HighlightItem {
  id: string;
  label: LocalizedText;
  body: LocalizedText;
}

export interface CaseStudyStep {
  en: string[];
  ar: string[];
}

export interface FAQ {
  q: LocalizedText;
  a: LocalizedText;
}

export interface CaseStudy {
  problem: LocalizedText;
  solution: LocalizedText;
  outcome: LocalizedText;
  role: LocalizedText;
  stack: LocalizedText;
  steps: CaseStudyStep;
  faqs: FAQ[];
}

export interface ProjectScreen {
  id: string;
  src: string;
  alt: string;
}

export interface ProjectDefinition {
  id: string;
  universe: number;
  slug: string;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  focusKeyword: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  techStack: string[];
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  screens: ProjectScreen[];
  highlights: HighlightItem[];
  caseStudy: CaseStudy;
  isFeatured: boolean;
}

export const projects: ProjectDefinition[] = [
  {
    "id": "ahwa-saas-platform",
    "universe": 1,
    "slug": "ahwa-saas-platform",
    "isFeatured": true,
    "name": {
      "en": "Ahwa — Café Operating System",
      "ar": "أهوه — نظام تشغيل المقهى"
    },
    "tagline": {
      "en": "A full-stack multi-tenant SaaS OS engineered from the ground up for café operations.",
      "ar": "نظام تشغيل SaaS متعدد المستأجرين مبني من الصفر لإدارة المقاهي بالكامل."
    },
    "description": {
      "ar": "نظام تشغيل وإدارة مخصص للمقاهي.",
      "en": "A specialized operating system and management platform for cafes."
    },
    "focusKeyword": {
      "en": "SaaS café management system",
      "ar": "نظام إدارة مقاهي SaaS"
    },
    "seoTitle": {
      "en": "Ahwa — SaaS Café Operating System | El Hussainy",
      "ar": "أهوه — نظام تشغيل مقاهي SaaS | الحسيني"
    },
    "seoDescription": {
      "en": "Multi-tenant SaaS platform for café management with shift control, inventory, QR ordering, full reporting, and role-based access for every staff member.",
      "ar": "منصة SaaS متعددة المستأجرين لإدارة المقاهي مع التحكم في الورديات والمخزون والطلبات عبر QR والتقارير الشاملة وصلاحيات مبنية على الأدوار."
    },
    "techStack": [
      "Next.js",
      "PostgreSQL",
      "Supabase"
    ],
    "tags": [
      "SaaS",
      "Multi-tenant",
      "Full-Stack",
      "PostgreSQL",
      "Management"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project1/cover.jpg",
        "alt": "Ahwa Dashboard"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "نظام تشغيل وإدارة مخصص للمقاهي.",
        "en": "A specialized operating system and management platform for cafes."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Next.js • PostgreSQL • Supabase",
        "en": "Next.js • PostgreSQL • Supabase"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "freelawyers-platform",
    "universe": 2,
    "slug": "freelawyers-platform",
    "isFeatured": true,
    "name": {
      "en": "Freelawyers",
      "ar": "Freelawyers"
    },
    "tagline": {
      "en": "A two-sided legal marketplace with escrow payments, offer lifecycle, dispute resolution, and dynamic lawyer ranking.",
      "ar": "سوق قانوني ثنائي الأطراف مع مدفوعات الضمان، دورة حياة العروض، حل النزاعات، وتصنيف ديناميكي للمحامين."
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "legal marketplace platform",
      "ar": "منصة سوق قانوني"
    },
    "seoTitle": {
      "en": "Freelawyers — Legal Marketplace Platform | El Hussainy",
      "ar": "Freelawyers — منصة سوق قانوني | الحسيني"
    },
    "seoDescription": {
      "en": "Full-stack legal gig marketplace with role-based auth, request lifecycle, escrow payments, real-time chat, dispute resolution, and automatic lawyer ranking.",
      "ar": "منصة سوق قانوني كاملة مع مصادقة مبنية على الأدوار، دورة حياة الطلبات، مدفوعات الضمان، دردشة فورية، حل النزاعات، وتصنيف تلقائي للمحامين."
    },
    "techStack": [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "RLS",
      "Real-time"
    ],
    "tags": [
      "Marketplace",
      "Legal",
      "SaaS",
      "Escrow",
      "Full-Stack"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project2/cover.jpg",
        "alt": "Freelawyers App"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Next.js 14 • TypeScript • Supabase • PostgreSQL • RLS • Real-time",
        "en": "Next.js 14 • TypeScript • Supabase • PostgreSQL • RLS • Real-time"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "lakatat-platform-rescue",
    "universe": 3,
    "slug": "lakatat-platform-rescue",
    "isFeatured": true,
    "name": {
      "en": "Lakatat — Platform Rescue",
      "ar": "منصة لقطات — عملية الإنقاذ"
    },
    "tagline": {
      "en": "Inherited a broken media platform. Rebuilt the entire backend, shipped 16 new features, and turned a liability into a revenue-generating product.",
      "ar": "استلمت منصة ميديا معطلة. أعدت بناء الخوادم بالكامل، أطلقت 16 ميزة جديدة، وحوّلت العبء إلى منتج يحقق أرباحًا."
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "video platform development FastAPI",
      "ar": "تطوير منصة فيديو FastAPI"
    },
    "seoTitle": {
      "en": "Lakatat Media Platform Rescue | El Hussainy",
      "ar": "إنقاذ منصة لقطات الإعلامية | الحسيني"
    },
    "seoDescription": {
      "en": "Rescued a broken FastAPI + React video platform: fixed black screens, rebuilt admin, added stories, playlists, comments, likes, AdSense, and multi-tenant role management.",
      "ar": "إنقاذ منصة فيديو FastAPI + React معطلة: إصلاح الشاشات السوداء، إعادة بناء الأدمن، إضافة القصص والقوائم والتعليقات والإعجابات وAdSense وإدارة الأدوار."
    },
    "techStack": [
      "FastAPI",
      "Python",
      "React",
      "Vite",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Redux"
    ],
    "tags": [
      "Rescue",
      "Media",
      "FastAPI",
      "Full-Stack"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project7/cover.jpg",
        "alt": "Lakatat Platform"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "FastAPI • Python • React • Vite • PostgreSQL • SQLAlchemy • Alembic • Redux",
        "en": "FastAPI • Python • React • Vite • PostgreSQL • SQLAlchemy • Alembic • Redux"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "nilu-tourism",
    "universe": 4,
    "slug": "nilu-tourism",
    "isFeatured": false,
    "name": {
      "en": "Nilu Tourism",
      "ar": "نظام شركة Nilu للسياحة"
    },
    "tagline": {
      "en": "A private booking system built around the company’s way of working",
      "ar": "نظام حجوزات خاص مصمم حول طريقة عمل الشركة نفسها"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "tourism management platform",
      "ar": "منصة إدارة سياحة"
    },
    "seoTitle": {
      "en": "Nilu Tourism | Private Booking & Management System",
      "ar": "نظام Nilu | محرك حجوزات متكامل لشركات السياحة"
    },
    "seoDescription": {
      "en": "A complete booking engine and operations dashboard developed for Nilu tourism, allowing end-to-end management of client itineraries.",
      "ar": "محرك حجوزات ولوحة تشغيل متكاملة لشركة Nilu السياحية، تتيح إدارة رحلات العملاء وعمليات الحجز من البداية للنهاية."
    },
    "techStack": [
      "Next.js",
      "Booking Engine",
      "Dashboard"
    ],
    "tags": [
      "Booking",
      "Tourism",
      "Fullstack"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project3/cover.jpg",
        "alt": "NilU Platform"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Next.js • Booking Engine • Dashboard",
        "en": "Next.js • Booking Engine • Dashboard"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "al-ola-oil-collection",
    "universe": 5,
    "slug": "al-ola-oil-collection",
    "isFeatured": false,
    "name": {
      "en": "AL OLA Oil Collection",
      "ar": "منصة العلا لتجميع الزيت"
    },
    "tagline": {
      "en": "From informal collection to a trusted digital logistics network",
      "ar": "من الجمع غير الرسمي إلى شبكة لوجستية رقمية موثوقة"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "logistics PWA oil collection",
      "ar": "تطبيق لوجستيات تجميع زيت PWA"
    },
    "seoTitle": {
      "en": "AL OLA | Logistics App for Oil Collection",
      "ar": "منصة العلا | تطبيق لوجستي ذكي لتجميع الزيت"
    },
    "seoDescription": {
      "en": "A robust logistics and collection web application functioning like Uber for used oil collection, featuring a comprehensive ERP and CRM dashboard.",
      "ar": "تطبيق لوجستي ذكي يعمل بنظام مشابه لأوبر لتجميع الزيت المستهلك، مدعوم بلوحة تحكم ERP و CRM شاملة لإدارة الأسطول والمناديب."
    },
    "techStack": [
      "Next.js",
      "Maps API",
      "ERP Integration",
      "PostgreSQL"
    ],
    "tags": [
      "Logistics",
      "ERP",
      "CRM",
      "Web App"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project5/cover.jpg",
        "alt": "AL OLA App"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Next.js • Maps API • ERP Integration • PostgreSQL",
        "en": "Next.js • Maps API • ERP Integration • PostgreSQL"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "bcc-fullstack",
    "universe": 6,
    "slug": "bcc-fullstack",
    "isFeatured": false,
    "name": {
      "en": "BCC Commercial",
      "ar": "شركة BCC التجارية"
    },
    "tagline": {
      "en": "A luxury digital front for a high-profile agency",
      "ar": "واجهة رقمية فاخرة لوكالة ذات مكانة عالية"
    },
    "description": {
      "ar": "إنشاء منصة كاملة من الصفر، تشمل لوحة التحكم وقواعد البيانات (Fullstack).",
      "en": "Built a complete platform from scratch, including dashboard and database (Fullstack)."
    },
    "focusKeyword": {
      "en": "multi-channel marketing communication hub",
      "ar": "محور اتصالات تسويقية متعدد القنوات"
    },
    "seoTitle": {
      "en": "BCC Commercial | Luxury Agency Portal & Dashboard",
      "ar": "شركة BCC التجارية | منصة رقمية فاخرة ولوحة تحكم"
    },
    "seoDescription": {
      "en": "A full-stack React and Supabase platform for BCC Commercial in KSA, featuring luxury UI and dynamic service management.",
      "ar": "منصة متكاملة لشركة BCC التجارية في السعودية باستخدام React و Supabase، تتميز بواجهة جذابة ولوحة تحكم قوية لإدارة الخدمات والمنتجات."
    },
    "techStack": [
      "Next.js",
      "Node.js",
      "PostgreSQL"
    ],
    "tags": [
      "Fullstack",
      "Admin Dashboard",
      "Luxury UI",
      "Agency"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project3/cover.jpg",
        "alt": "BCC Dashboard"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "إنشاء منصة كاملة من الصفر، تشمل لوحة التحكم وقواعد البيانات (Fullstack).",
        "en": "Built a complete platform from scratch, including dashboard and database (Fullstack)."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Next.js • Node.js • PostgreSQL",
        "en": "Next.js • Node.js • PostgreSQL"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "framemasters",
    "universe": 7,
    "slug": "framemasters",
    "isFeatured": false,
    "name": {
      "en": "Framemasters",
      "ar": "Framemasters"
    },
    "tagline": {
      "en": "Hardened a Lovable-built platform with strict Supabase RLS policies and live payment gateway integration.",
      "ar": "تحصين منصة مبنية بـ Lovable بسياسات RLS صارمة في Supabase ودمج بوابة دفع حية."
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "Supabase RLS security payment integration",
      "ar": "أمان Supabase RLS ودمج الدفع"
    },
    "seoTitle": {
      "en": "Framemasters — Security & Payment Integration | El Hussainy",
      "ar": "Framemasters — أمان ودمج دفع | الحسيني"
    },
    "seoDescription": {
      "en": "Implemented strict Supabase Row Level Security and live payment gateway integration for a Lovable-built platform.",
      "ar": "تطبيق Supabase Row Level Security الصارم ودمج بوابة الدفع الحية لمنصة مبنية بـ Lovable."
    },
    "techStack": [
      "Supabase",
      "PostgreSQL RLS",
      "Payment Gateway APIs",
      "TypeScript"
    ],
    "tags": [
      "Security",
      "Integration",
      "Supabase"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project1/cover.jpg",
        "alt": "Framemasters"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Supabase • PostgreSQL RLS • Payment Gateway APIs • TypeScript",
        "en": "Supabase • PostgreSQL RLS • Payment Gateway APIs • TypeScript"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "growlik-seo",
    "universe": 8,
    "slug": "growlik-seo",
    "isFeatured": true,
    "name": {
      "en": "GrowLik SEO",
      "ar": "GrowLik — تحسين محركات البحث"
    },
    "tagline": {
      "en": "Page 1 Google Ranking Success",
      "ar": "نجاح تصنيف الصفحات الأولى على Google"
    },
    "description": {
      "ar": "تغيير محتوى الموقع بالكامل وعمل 8 صفحات إضافية لتحسين المحتوى وتفصيل الخدمات لتصدر نتائج البحث الأولى.",
      "en": "Completely revamped site content and added 8 pages to optimize services and rank first in search results."
    },
    "focusKeyword": {
      "en": "technical SEO WordPress performance",
      "ar": "WordPress SEO تقني أداء"
    },
    "seoTitle": {
      "en": "GrowLik — Technical SEO Platform | El Hussainy",
      "ar": "GrowLik — منصة SEO التقني | الحسيني"
    },
    "seoDescription": {
      "en": "WordPress platform engineered for Google page-one rankings through Core Web Vitals optimisation, JSON-LD schema injection, and performance-first architecture.",
      "ar": "منصة WordPress مهندَسة لتصنيفات الصفحة الأولى بجوجل من خلال تحسين Core Web Vitals وحقن JSON-LD ومعمارية الأداء أولًا."
    },
    "techStack": [
      "SEO",
      "Content Strategy"
    ],
    "tags": [
      "SEO",
      "Marketing",
      "Ranking"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/growlik/cover.jpg",
        "alt": "GrowLik SEO Results"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "تغيير محتوى الموقع بالكامل وعمل 8 صفحات إضافية لتحسين المحتوى وتفصيل الخدمات لتصدر نتائج البحث الأولى.",
        "en": "Completely revamped site content and added 8 pages to optimize services and rank first in search results."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "SEO • Content Strategy",
        "en": "SEO • Content Strategy"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "pos-system-nextjs",
    "universe": 9,
    "slug": "pos-system-nextjs",
    "isFeatured": false,
    "name": {
      "en": "Next.js POS & ERP System",
      "ar": "نظام نقاط البيع POS و ERP"
    },
    "tagline": {
      "en": "Hardware-Integrated Point of Sale",
      "ar": "نظام نقاط بيع متصل بالهاردوير"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "browser-based POS system",
      "ar": "نظام POS قائم على المتصفح"
    },
    "seoTitle": {
      "en": "Advanced POS & ERP System built with Next.js",
      "ar": "نظام نقاط بيع (POS) و ERP متقدم باستخدام Next.js"
    },
    "seoDescription": {
      "en": "A highly scalable POS software with a built-in ERP and Kitchen Display System, seamlessly integrated with retail hardware.",
      "ar": "برنامج نقاط بيع قابل للتوسع يضم نظام ERP متكامل وشاشة مطبخ (KDS)، مع دعم كامل للأجهزة كطابعات الكاشير والباركود."
    },
    "techStack": [
      "Next.js",
      "ERP Integration",
      "Hardware API"
    ],
    "tags": [
      "POS",
      "ERP",
      "SaaS",
      "Hardware"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project4/cover.jpg",
        "alt": "POS System"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Next.js • ERP Integration • Hardware API",
        "en": "Next.js • ERP Integration • Hardware API"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "rose-ecommerce",
    "universe": 11,
    "slug": "rose-ecommerce",
    "isFeatured": true,
    "name": {
      "en": "Custom PHP E-Commerce (Noda, Gedo, Rose)",
      "ar": "متجر إلكتروني مخصص (Noda, Gedo, Rose)"
    },
    "tagline": {
      "en": "PHP/MySQL Multi-Tenant E-Commerce",
      "ar": "تجارة إلكترونية متعددة المستأجرين باستخدام PHP/MySQL"
    },
    "description": {
      "ar": "لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.",
      "en": "A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store."
    },
    "focusKeyword": {
      "en": "headless WooCommerce Next.js storefront",
      "ar": "WooCommerce مفصولة الرأس Next.js"
    },
    "seoTitle": {
      "en": "Rose Store — Headless WooCommerce | El Hussainy",
      "ar": "متجر روز — WooCommerce مفصولة الرأس | الحسيني"
    },
    "seoDescription": {
      "en": "Luxury beauty e-commerce built as headless WooCommerce on Next.js with sub-0.8s load time, ISR caching, and mobile-first luxury UX.",
      "ar": "تجارة إلكترونية تجميل فاخرة مبنية كـ WooCommerce مفصولة الرأس على Next.js مع وقت تحميل أقل من 0.8 ثانية وISR caching وتجربة فاخرة للجوال أولًا."
    },
    "techStack": [
      "PHP",
      "MySQL",
      "HTML",
      "CSS"
    ],
    "tags": [
      "E-Commerce",
      "PHP",
      "Dashboard"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project1/cover.jpg",
        "alt": "Rose Store"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.",
        "en": "A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "PHP • MySQL • HTML • CSS",
        "en": "PHP • MySQL • HTML • CSS"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "al-afkham-woocommerce",
    "universe": 12,
    "slug": "al-afkham-woocommerce",
    "isFeatured": false,
    "name": {
      "en": "Al Afkham Store",
      "ar": "متجر الأفخم"
    },
    "tagline": {
      "en": "Premium WooCommerce Experience",
      "ar": "تجربة WooCommerce مميزة"
    },
    "description": {
      "ar": "مشروع ووردبريس ووكمرس متكامل.",
      "en": "A complete WordPress WooCommerce project."
    },
    "focusKeyword": {
      "en": "WooCommerce luxury perfume store",
      "ar": "متجر عطور فاخر WooCommerce"
    },
    "seoTitle": {
      "en": "Al Afkham — Luxury WooCommerce Perfume Store | El Hussainy",
      "ar": "الأفخم — متجر عطور WooCommerce فاخر | الحسيني"
    },
    "seoDescription": {
      "en": "Bespoke WooCommerce luxury perfume boutique with Elementor Pro, Polylang multilingual, LiteSpeed performance, and premium dark-mode design.",
      "ar": "بوتيك عطور WooCommerce فاخر مخصص مع Elementor Pro وPolylang متعدد اللغات وأداء LiteSpeed وتصميم وضع مظلم راقٍ."
    },
    "techStack": [
      "WordPress",
      "WooCommerce",
      "PHP"
    ],
    "tags": [
      "E-Commerce",
      "WordPress"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project6/cover.jpg",
        "alt": "Al Afkham Store"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "مشروع ووردبريس ووكمرس متكامل.",
        "en": "A complete WordPress WooCommerce project."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "WordPress • WooCommerce • PHP",
        "en": "WordPress • WooCommerce • PHP"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "arab-anglais",
    "universe": 13,
    "slug": "arab-anglais",
    "isFeatured": false,
    "name": {
      "en": "Arab Anglais",
      "ar": "Arab Anglais"
    },
    "tagline": {
      "en": "Bilingual Services Portal",
      "ar": "بوابة خدمات ثنائية اللغة"
    },
    "description": {
      "ar": "منصة لتقديم الخدمات للعملاء.",
      "en": "A service platform for clients."
    },
    "focusKeyword": {
      "en": "Arabic English learning platform Supabase",
      "ar": "منصة تعلم عربي إنجليزي Supabase"
    },
    "seoTitle": {
      "en": "Arab Anglais E-Learning Platform | El Hussainy",
      "ar": "منصة التعلم الإلكتروني Arab Anglais | الحسيني"
    },
    "seoDescription": {
      "en": "Interactive language LMS with Supabase real-time quiz scoring, spaced-repetition vocabulary engine, and Framer Motion gamified progress.",
      "ar": "LMS لغة تفاعلي مع Supabase لتسجيل نقاط اختبارات فورية ومحرك مفردات التكرار المتباعد وتقدم ممتع بـ Framer Motion."
    },
    "techStack": [
      "Next.js",
      "Tailwind CSS"
    ],
    "tags": [
      "Services",
      "React",
      "Dashboard"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project4/cover.jpg",
        "alt": "Arab Anglais LMS"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "منصة لتقديم الخدمات للعملاء.",
        "en": "A service platform for clients."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Next.js • Tailwind CSS",
        "en": "Next.js • Tailwind CSS"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "noda-ai-tool",
    "universe": 14,
    "slug": "noda-ai-tool",
    "isFeatured": false,
    "name": {
      "en": "Noda AI Tool",
      "ar": "أداة Noda AI"
    },
    "tagline": {
      "en": "Code Generation AI Assistant",
      "ar": "مساعد ذكاء اصطناعي لتوليد الأكواد"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "AI content generator SSE streaming",
      "ar": "مولّد محتوى AI SSE بث فوري"
    },
    "seoTitle": {
      "en": "Noda AI | Intelligent Code Generation Tool",
      "ar": "Noda AI | منصة توليد الأكواد بالذكاء الاصطناعي"
    },
    "seoDescription": {
      "en": "A powerful AI tool that generates software code using Ollama, Groq, and OpenAI, built for rapid component and UI generation.",
      "ar": "أداة ذكاء اصطناعي قوية لتوليد الأكواد البرمجية باستخدام نماذج Ollama و Groq و OpenAI، مصممة لتسريع عملية التطوير."
    },
    "techStack": [
      "Next.js",
      "OpenAI API",
      "Groq",
      "Ollama"
    ],
    "tags": [
      "AI",
      "LLM",
      "Tooling"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project1/cover.jpg",
        "alt": "Noda AI"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Next.js • OpenAI API • Groq • Ollama",
        "en": "Next.js • OpenAI API • Groq • Ollama"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "restaurant-specialized-saas",
    "universe": 15,
    "slug": "restaurant-specialized-saas",
    "isFeatured": false,
    "name": {
      "en": "Restaurant QR Menu SaaS",
      "ar": "نظام قائمة QR للمطاعم SaaS"
    },
    "tagline": {
      "en": "One QR code per table. One price update in the dashboard. Every customer's phone updates instantly — no reprint, ever.",
      "ar": "رمز QR واحد لكل طاولة. تحديث سعر واحد في لوحة التحكم. هاتف كل عميل يتحدث فوريًا — بدون إعادة طباعة، أبدًا."
    },
    "description": {
      "ar": "نظام مشابه لقهوة ولكنه مخصص أكثر لإدارة المطاعم.",
      "en": "A system similar to Ahwa but specialized for restaurant management."
    },
    "focusKeyword": {
      "en": "QR menu SaaS restaurant system",
      "ar": "نظام قائمة QR SaaS للمطاعم"
    },
    "seoTitle": {
      "en": "Restaurant QR Menu SaaS | El Hussainy",
      "ar": "نظام قائمة QR للمطاعم SaaS | الحسيني"
    },
    "seoDescription": {
      "en": "Multi-tenant restaurant QR menu system with instant price updates, allergen management, and branch-level menu isolation.",
      "ar": "نظام قائمة QR متعدد المستأجرين للمطاعم مع تحديثات فورية للأسعار وإدارة الحساسيات وعزل القوائم على مستوى الفرع."
    },
    "techStack": [
      "Next.js",
      "PostgreSQL",
      "Supabase"
    ],
    "tags": [
      "SaaS",
      "F&B",
      "QR"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project2/cover.jpg",
        "alt": "QR Menu System"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "نظام مشابه لقهوة ولكنه مخصص أكثر لإدارة المطاعم.",
        "en": "A system similar to Ahwa but specialized for restaurant management."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Next.js • PostgreSQL • Supabase",
        "en": "Next.js • PostgreSQL • Supabase"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "kenz-ecommerce",
    "universe": 16,
    "slug": "kenz-ecommerce",
    "isFeatured": false,
    "name": {
      "en": "Kenz Ecommerce",
      "ar": "متجر كنز"
    },
    "tagline": {
      "en": "Zero dropped transactions: engineered Tabby, Tamara, and Moyasar BNPL flows with server-side webhook verification.",
      "ar": "صفر معاملات مفقودة: هندسة تدفقات Tabby وTamara وMoyasar BNPL مع التحقق من webhook من جانب الخادم."
    },
    "description": {
      "ar": "مشروع React بلوحة تحكم واحدة. نظام متجر إلكتروني متكامل (ليس SaaS) لمتجر واحد متعدد المنتجات يشمل ERP و CRM وتتبع للمخزون والفواتير المحاسبية.",
      "en": "A React project with a single dashboard. Full e-commerce system (not SaaS) for a single vendor with multiple products, including ERP, CRM, inventory tracking, and accounting."
    },
    "focusKeyword": {
      "en": "Tabby Tamara Moyasar payment integration Next.js",
      "ar": "دمج Tabby Tamara Moyasar للدفع Next.js"
    },
    "seoTitle": {
      "en": "Kenz Ecommerce — Gulf Payment Integration | El Hussainy",
      "ar": "متجر كنز — دمج الدفع الخليجي | الحسيني"
    },
    "seoDescription": {
      "en": "Next.js e-commerce with Tabby, Tamara BNPL and Moyasar payment integration, server-side webhook verification, and zero transaction failure rate.",
      "ar": "تجارة إلكترونية Next.js مع دمج Tabby وTamara BNPL وMoyasar، والتحقق من webhook من جانب الخادم، ومعدل فشل معاملات صفر."
    },
    "techStack": [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    "tags": [
      "E-Commerce",
      "FinTech",
      "Payments"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project4/cover.jpg",
        "alt": "Kenz Store"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "مشروع React بلوحة تحكم واحدة. نظام متجر إلكتروني متكامل (ليس SaaS) لمتجر واحد متعدد المنتجات يشمل ERP و CRM وتتبع للمخزون والفواتير المحاسبية.",
        "en": "A React project with a single dashboard. Full e-commerce system (not SaaS) for a single vendor with multiple products, including ERP, CRM, inventory tracking, and accounting."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "React • Node.js • PostgreSQL",
        "en": "React • Node.js • PostgreSQL"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "holospace-simulator",
    "universe": 17,
    "slug": "holospace-simulator",
    "isFeatured": false,
    "name": {
      "en": "Holospace",
      "ar": "Holospace"
    },
    "tagline": {
      "en": "Web-Based Desktop Simulator",
      "ar": "محاكي سطح مكتب يعمل على الويب"
    },
    "description": {
      "ar": "نظام محاكاة ويب لتطبيقات سطح المكتب (مثل winapp) عبر الإنترنت.",
      "en": "A web simulation of desktop applications (like winapp) online."
    },
    "focusKeyword": {
      "en": "WebGL 3D room configurator React Three Fiber",
      "ar": "مُهيّئ غرف ثلاثي الأبعاد WebGL React Three Fiber"
    },
    "seoTitle": {
      "en": "Holospace 3D VR Room Configurator | El Hussainy",
      "ar": "مُهيّئ غرف VR ثلاثي الأبعاد Holospace | الحسيني"
    },
    "seoDescription": {
      "en": "Browser-native WebGL 3D room configurator for VR hardware with React Three Fiber, drag-drop nodes, and spatial collision detection.",
      "ar": "مُهيّئ غرف ثلاثي الأبعاد WebGL في المتصفح لأجهزة VR مع React Three Fiber وعقد سحب وإفلات وكشف تصادم مكاني."
    },
    "techStack": [
      "React",
      "CSS Modules"
    ],
    "tags": [
      "Simulator",
      "WebGL",
      "Three.js",
      "3D"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project5/cover.jpg",
        "alt": "Holospace 3D"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "نظام محاكاة ويب لتطبيقات سطح المكتب (مثل winapp) عبر الإنترنت.",
        "en": "A web simulation of desktop applications (like winapp) online."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "React • CSS Modules",
        "en": "React • CSS Modules"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "multiverse-showcase",
    "universe": 18,
    "slug": "multiverse-showcase",
    "isFeatured": false,
    "name": {
      "en": "Multiverse Showcase",
      "ar": "Multiverse Showcase"
    },
    "tagline": {
      "en": "Cinematic 3D Portfolio",
      "ar": "ملف شخصي سينمائي ثلاثي الأبعاد"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "HTML5 Canvas interactive galaxy map",
      "ar": "خريطة مجرة تفاعلية HTML5 Canvas"
    },
    "seoTitle": {
      "en": "Multiverse Showcase — Canvas Galaxy Map | El Hussainy",
      "ar": "عرض الأكوان — خريطة مجرة Canvas | الحسيني"
    },
    "seoDescription": {
      "en": "Custom HTML5 Canvas infinite galaxy map with trigonometric star plotting, pan/zoom controls, and node relationship graph navigation.",
      "ar": "خريطة مجرة Canvas HTML5 مخصصة لا نهائية مع رسم نجوم مثلثي وضوابط تحريك/تكبير وتنقل بين رسوم علاقات العقد."
    },
    "techStack": [
      "React",
      "WebGL",
      "Cinematic Animations"
    ],
    "tags": [
      "Portfolio",
      "3D",
      "Cinematic"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project6/cover.jpg",
        "alt": "Multiverse Map"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "React • WebGL • Cinematic Animations",
        "en": "React • WebGL • Cinematic Animations"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "pulsereach-astra-child",
    "universe": 19,
    "slug": "pulsereach-astra-child",
    "isFeatured": false,
    "name": {
      "en": "Pulsereach Marketing",
      "ar": "Pulsereach للتسويق"
    },
    "tagline": {
      "en": "Custom WordPress Agency Site",
      "ar": "موقع وكالة WordPress مخصص"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "WordPress React hybrid Astra child theme",
      "ar": "WordPress React هجين قالب Astra فرعي"
    },
    "seoTitle": {
      "en": "Pulsereach Hybrid WordPress React Site | El Hussainy",
      "ar": "موقع Pulsereach الهجين WordPress React | الحسيني"
    },
    "seoDescription": {
      "en": "Custom Astra Child Theme with Webpack pipeline injecting React components into WordPress shortcodes for hybrid CMS architecture.",
      "ar": "قالب Astra فرعي مخصص مع مسار Webpack يحقن مكونات React في WordPress shortcodes لمعمارية CMS هجينة."
    },
    "techStack": [
      "WordPress",
      "Astra Child Theme",
      "PHP",
      "CSS"
    ],
    "tags": [
      "Digital Marketing",
      "WordPress",
      "Agency"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project7/cover.jpg",
        "alt": "Pulsereach"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "WordPress • Astra Child Theme • PHP • CSS",
        "en": "WordPress • Astra Child Theme • PHP • CSS"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "nori-restaurant-ui",
    "universe": 20,
    "slug": "nori-restaurant-ui",
    "isFeatured": false,
    "name": {
      "en": "Nori Sushi UI",
      "ar": "واجهة Nori Sushi"
    },
    "tagline": {
      "en": "Static Frontend Excellence",
      "ar": "تفوق الواجهة الثابتة"
    },
    "description": {
      "ar": "مشروع منفصل لواجهة أمامية (Static) لمطعم.",
      "en": "A separate static frontend project for a restaurant."
    },
    "focusKeyword": {
      "en": "luxury restaurant UI glassmorphism",
      "ar": "واجهة مطعم فاخرة glassmorphism"
    },
    "seoTitle": {
      "en": "Nori Restaurant UI — Luxury Design | El Hussainy",
      "ar": "واجهة نوري للمطعم — تصميم فاخر | الحسيني"
    },
    "seoDescription": {
      "en": "Premium restaurant landing page with glassmorphism design, parallax food photography, micro-animations, and online table reservation.",
      "ar": "صفحة هبوط مطعم فاخرة مع تصميم glassmorphism وتصوير طعام parallax ورسوم دقيقة وحجز طاولات عبر الإنترنت."
    },
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "tags": [
      "UI",
      "Frontend",
      "Restaurant"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project1/cover.jpg",
        "alt": "Nori Sushi UI"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "مشروع منفصل لواجهة أمامية (Static) لمطعم.",
        "en": "A separate static frontend project for a restaurant."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "HTML • CSS • JavaScript",
        "en": "HTML • CSS • JavaScript"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "crm-system-python",
    "universe": 21,
    "slug": "crm-system-python",
    "isFeatured": false,
    "name": {
      "en": "Python Odoo-Clone CRM",
      "ar": "نظام CRM شبيه بـ Odoo مبني بـ Python"
    },
    "tagline": {
      "en": "Dockerized Python CRM",
      "ar": "CRM Python مع Docker"
    },
    "description": {
      "ar": "نظام CRM محاكاة لـ Odoo 17 مبني على بايثون و Docker مع أتمتة واتساب وكافة ميزات إدارة العملاء.",
      "en": "A CRM simulation of Odoo 17 built with Python and Docker, including WhatsApp automation and full CRM features."
    },
    "focusKeyword": {
      "en": "Python FastAPI CRM data pipeline",
      "ar": "مسار بيانات Python FastAPI CRM"
    },
    "seoTitle": {
      "en": "Python Enterprise CRM | El Hussainy",
      "ar": "CRM المؤسسي بـ Python | الحسيني"
    },
    "seoDescription": {
      "en": "Enterprise CRM backend with FastAPI and Pandas data ingestion pipeline, CSV sanitisation, deduplication, and RESTful query API.",
      "ar": "خادم CRM مؤسسي مع مسار استيعاب بيانات FastAPI و Pandas وتنظيف CSV وإزالة التكرار وواجهة API استعلام RESTful."
    },
    "techStack": [
      "Python",
      "Docker",
      "PostgreSQL"
    ],
    "tags": [
      "CRM",
      "Python",
      "Docker"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project2/cover.jpg",
        "alt": "Python CRM"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "نظام CRM محاكاة لـ Odoo 17 مبني على بايثون و Docker مع أتمتة واتساب وكافة ميزات إدارة العملاء.",
        "en": "A CRM simulation of Odoo 17 built with Python and Docker, including WhatsApp automation and full CRM features."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Python • Docker • PostgreSQL",
        "en": "Python • Docker • PostgreSQL"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "animation-studio-system",
    "universe": 22,
    "slug": "animation-studio-system",
    "isFeatured": false,
    "name": {
      "en": "Animation Studio Manager",
      "ar": "مدير استوديو الرسوم المتحركة"
    },
    "tagline": {
      "en": "Team & Asset Management Platform",
      "ar": "منصة إدارة الفريق والأصول"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "secure video review portal AWS S3",
      "ar": "بوابة مراجعة فيديو آمنة AWS S3"
    },
    "seoTitle": {
      "en": "Animation Studio Video Review Portal | El Hussainy",
      "ar": "بوابة مراجعة فيديو استوديو الرسوم | الحسيني"
    },
    "seoDescription": {
      "en": "Secure animation draft review portal with AWS S3 signed URLs, timestamped client annotations, and frame-accurate feedback system.",
      "ar": "بوابة مراجعة مسودات رسوم آمنة مع AWS S3 signed URLs وتعليقات عملاء بطابع زمني ونظام تغذية راجعة دقيق الإطارات."
    },
    "techStack": [
      "Asset Management",
      "CSS Generator",
      "Workflow"
    ],
    "tags": [
      "Management",
      "Animation",
      "Tooling"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project3/cover.jpg",
        "alt": "Animation Studio"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Asset Management • CSS Generator • Workflow",
        "en": "Asset Management • CSS Generator • Workflow"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "arab-tourism",
    "universe": 23,
    "slug": "arab-tourism",
    "isFeatured": false,
    "name": {
      "en": "Arab Tourism Portal",
      "ar": "بوابة السياحة العربية"
    },
    "tagline": {
      "en": "Tourism Directory Interface",
      "ar": "واجهة دليل سياحي"
    },
    "description": {
      "ar": "واجهة أمامية لدليل سياحي فقط.",
      "en": "Frontend interface for a tourist guide only."
    },
    "focusKeyword": {
      "en": "tourism CRM visa tracking SMS notifications",
      "ar": "CRM سياحة تتبع تأشيرة إشعارات SMS"
    },
    "seoTitle": {
      "en": "Arab Tourism Visa CRM Portal | El Hussainy",
      "ar": "بوابة CRM التأشيرات السياحية | الحسيني"
    },
    "seoDescription": {
      "en": "Tourism agency CRM with visa status milestone tracking and automated SMS traveler notifications, reducing support calls by 80%.",
      "ar": "CRM وكالة سياحة مع تتبع معالم حالة التأشيرة وإشعارات SMS تلقائية للمسافرين، تخفّض مكالمات الدعم 80%."
    },
    "techStack": [
      "Next.js",
      "Tailwind CSS"
    ],
    "tags": [
      "Tourism",
      "Frontend",
      "UI"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project4/cover.jpg",
        "alt": "Arab Tourism Portal"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "واجهة أمامية لدليل سياحي فقط.",
        "en": "Frontend interface for a tourist guide only."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Next.js • Tailwind CSS",
        "en": "Next.js • Tailwind CSS"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "real-estate-ui",
    "universe": 24,
    "slug": "real-estate-ui",
    "isFeatured": false,
    "name": {
      "en": "Real Estate Explorer UI",
      "ar": "واجهة مستكشف العقارات"
    },
    "tagline": {
      "en": "Experimental Frontend Concept",
      "ar": "فكرة واجهة أمامية تجريبية"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "real estate geospatial filter React",
      "ar": "تصفية جغرافية عقارية React"
    },
    "seoTitle": {
      "en": "Real Estate Property Search UI | El Hussainy",
      "ar": "واجهة بحث العقارات | الحسيني"
    },
    "seoDescription": {
      "en": "Real estate search React app with client-side geospatial filtering, instant bounding-box spatial queries, and map-synced property listings.",
      "ar": "تطبيق بحث عقاري React مع تصفية جغرافية مكانية من جانب العميل واستعلامات bounding-box فورية وقوائم عقارات متزامنة مع الخريطة."
    },
    "techStack": [
      "React",
      "UI/UX",
      "Framer Motion"
    ],
    "tags": [
      "Frontend",
      "UI",
      "Showcase"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project3/cover.jpg",
        "alt": "Real Estate Explorer"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "React • UI/UX • Framer Motion",
        "en": "React • UI/UX • Framer Motion"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "gedo-store",
    "universe": 25,
    "slug": "gedo-store",
    "isFeatured": false,
    "name": {
      "en": "Custom PHP E-Commerce (Noda, Gedo, Rose)",
      "ar": "متجر إلكتروني مخصص بـ PHP (Noda, Gedo, Rose)"
    },
    "tagline": {
      "en": "PHP/MySQL Multi-Tenant E-Commerce",
      "ar": "تجارة إلكترونية متعددة المستأجرين باستخدام PHP/MySQL"
    },
    "description": {
      "ar": "لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.",
      "en": "A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store."
    },
    "focusKeyword": {
      "en": "WooCommerce POS inventory sync plugin",
      "ar": "إضافة مزامنة مخزون WooCommerce POS"
    },
    "seoTitle": {
      "en": "Gedo Store — WooCommerce POS Sync | El Hussainy",
      "ar": "متجر جدو — مزامنة WooCommerce POS | الحسيني"
    },
    "seoDescription": {
      "en": "Custom WordPress plugin for real-time bidirectional inventory sync between physical POS and WooCommerce, eliminating overselling.",
      "ar": "إضافة WordPress مخصصة لمزامنة مخزون ثنائية الاتجاه بالوقت الحقيقي بين POS والفعلي وWooCommerce، تُلغي البيع الزائد."
    },
    "techStack": [
      "PHP",
      "MySQL",
      "HTML",
      "CSS"
    ],
    "tags": [
      "E-Commerce",
      "PHP",
      "Dashboard"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project2/cover.jpg",
        "alt": "Gedo Store"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.",
        "en": "A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "PHP • MySQL • HTML • CSS",
        "en": "PHP • MySQL • HTML • CSS"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "dashboard-admin-ui",
    "universe": 26,
    "slug": "dashboard-admin-ui",
    "isFeatured": false,
    "name": {
      "en": "Dashboard Admin UI Toolkit",
      "ar": "مجموعة أدوات واجهة الأدمن"
    },
    "tagline": {
      "en": "An Atomic Design React component library with Framer Motion — dark mode, complex data tables, and a sidebar navigation system that reduced internal tool dev time by 70%.",
      "ar": "مكتبة مكونات React بالتصميم الذري مع Framer Motion — وضع مظلم وجداول بيانات معقدة ونظام تنقل جانبي قلّص وقت تطوير الأدوات الداخلية 70%."
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "React admin dashboard component library Framer Motion",
      "ar": "مكتبة مكونات لوحة أدمن React Framer Motion"
    },
    "seoTitle": {
      "en": "Admin Dashboard UI Toolkit | El Hussainy",
      "ar": "مجموعة أدوات واجهة لوحة الأدمن | الحسيني"
    },
    "seoDescription": {
      "en": "Atomic Design React admin component library with Framer Motion, dark mode, complex data tables, and animated sidebar navigation.",
      "ar": "مكتبة مكونات أدمن React بالتصميم الذري مع Framer Motion ووضع مظلم وجداول بيانات معقدة وتنقل جانبي متحرك."
    },
    "techStack": [
      "React",
      "Framer Motion",
      "Tailwind CSS",
      "Atomic Design"
    ],
    "tags": [
      "UI Kit",
      "Dashboard",
      "Design System"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project2/cover.jpg",
        "alt": "Admin UI Kit"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "React • Framer Motion • Tailwind CSS • Atomic Design",
        "en": "React • Framer Motion • Tailwind CSS • Atomic Design"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "lamar-ecommerce",
    "universe": 27,
    "slug": "lamar-ecommerce",
    "isFeatured": false,
    "name": {
      "en": "Lamar E-Commerce",
      "ar": "Lamar للتجارة الإلكترونية"
    },
    "tagline": {
      "en": "Custom Fullstack E-Commerce",
      "ar": "متجر إلكتروني مخصص بالكامل"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "Next.js i18n Edge Middleware international ecommerce",
      "ar": "Next.js i18n Edge Middleware تجارة دولية"
    },
    "seoTitle": {
      "en": "Lamar International Store — Next.js i18n | El Hussainy",
      "ar": "متجر لمار الدولي — Next.js i18n | الحسيني"
    },
    "seoDescription": {
      "en": "International Next.js e-commerce with Edge Middleware locale routing, live currency conversion, and per-country shipping rules.",
      "ar": "تجارة إلكترونية دولية Next.js مع توجيه locale بـ Edge Middleware وتحويل عملة حي وقواعد شحن لكل دولة."
    },
    "techStack": [
      "Fullstack",
      "Custom DB",
      "Dashboard"
    ],
    "tags": [
      "E-Commerce",
      "Fullstack",
      "Custom"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project7/cover.jpg",
        "alt": "Lamar Store"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Fullstack • Custom DB • Dashboard",
        "en": "Fullstack • Custom DB • Dashboard"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "alkhair-store",
    "universe": 28,
    "slug": "alkhair-store",
    "isFeatured": false,
    "name": {
      "en": "Al Khair React Store & POS",
      "ar": "متجر الخير React & POS"
    },
    "tagline": {
      "en": "Omnichannel React E-Commerce",
      "ar": "تجارة إلكترونية Omnichannel"
    },
    "description": {
      "ar": "مشروع React بلوحة تحكم واحدة مع نظام نقطة بيع (POS) داخلية للمحل لربط المبيعات الأوفلاين والأونلاين.",
      "en": "A React project with a single dashboard and an internal POS system linking offline and online sales."
    },
    "focusKeyword": {
      "en": "WooCommerce B2B wholesale bulk order",
      "ar": "WooCommerce B2B جملة طلب جماعي"
    },
    "seoTitle": {
      "en": "Al Khair B2B Wholesale WooCommerce | El Hussainy",
      "ar": "متجر الخير B2B جملة WooCommerce | الحسيني"
    },
    "seoDescription": {
      "en": "B2B wholesale WooCommerce with bulk order matrix UI, dynamic server-side volume discounts, and business-specific checkout flows.",
      "ar": "WooCommerce B2B جملة مع واجهة مصفوفة طلبات جماعية وخصومات حجم ديناميكية من جانب الخادم وتدفقات دفع خاصة بالأعمال."
    },
    "techStack": [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    "tags": [
      "E-Commerce",
      "React",
      "POS"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project5/cover.jpg",
        "alt": "Al Khair B2B"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "مشروع React بلوحة تحكم واحدة مع نظام نقطة بيع (POS) داخلية للمحل لربط المبيعات الأوفلاين والأونلاين.",
        "en": "A React project with a single dashboard and an internal POS system linking offline and online sales."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "React • Node.js • PostgreSQL",
        "en": "React • Node.js • PostgreSQL"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "noda-clothing-brand",
    "universe": 29,
    "slug": "noda-clothing-brand",
    "isFeatured": false,
    "name": {
      "en": "Custom PHP E-Commerce (Noda, Gedo, Rose)",
      "ar": "متجر إلكتروني مخصص (Noda, Gedo, Rose)"
    },
    "tagline": {
      "en": "PHP/MySQL Multi-Tenant E-Commerce",
      "ar": "تجارة إلكترونية متعددة المستأجرين باستخدام PHP/MySQL"
    },
    "description": {
      "ar": "لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.",
      "en": "A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store."
    },
    "focusKeyword": {
      "en": "fashion storefront Shopify Framer Motion",
      "ar": "متجر أزياء Shopify Framer Motion"
    },
    "seoTitle": {
      "en": "Noda Clothing — Fashion Storefront | El Hussainy",
      "ar": "ملابس نودا — واجهة متجر أزياء | الحسيني"
    },
    "seoDescription": {
      "en": "Editorial fashion e-commerce with Shopify Storefront API, Framer Motion scroll parallax, and immersive full-screen product discovery.",
      "ar": "تجارة إلكترونية أزياء تحريرية مع Shopify Storefront API وFramer Motion scroll parallax واكتشاف منتجات غامر بشاشة كاملة."
    },
    "techStack": [
      "PHP",
      "MySQL",
      "HTML",
      "CSS"
    ],
    "tags": [
      "E-Commerce",
      "PHP",
      "Dashboard"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project3/cover.jpg",
        "alt": "Noda Clothing"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.",
        "en": "A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "PHP • MySQL • HTML • CSS",
        "en": "PHP • MySQL • HTML • CSS"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "saqi-sa-seo",
    "universe": 30,
    "slug": "saqi-sa-seo",
    "isFeatured": false,
    "name": {
      "en": "Saqi SA SEO",
      "ar": "Saqi SA SEO"
    },
    "tagline": {
      "en": "Technical Schema & GTM Optimization",
      "ar": "تحسين المخططات التقنية وGTM"
    },
    "description": {
      "ar": "تحدي مشابه لمنصة رمز، تم الربط وحقن الفهرسة عبر Google Tag Manager.",
      "en": "A challenge similar to the Ramz platform, integrated and indexed via Google Tag Manager."
    },
    "focusKeyword": {
      "en": "Arabic programmatic SEO Saudi Arabia",
      "ar": "SEO عربي برمجي السعودية"
    },
    "seoTitle": {
      "en": "Saqi.sa Programmatic SEO | El Hussainy",
      "ar": "SEO برمجي Saqi.sa | الحسيني"
    },
    "seoDescription": {
      "en": "Arabic programmatic SEO for Saudi water delivery: hyper-localised landing pages per neighbourhood with NLP intent matching, driving 50K monthly organic visitors.",
      "ar": "SEO عربي برمجي لتوصيل مياه سعودي: صفحات هبوط محلية للغاية لكل حي مع مطابقة نية NLP، تجلب 50K زائر عضوي شهريًا."
    },
    "techStack": [
      "Google Tag Manager",
      "SEO"
    ],
    "tags": [
      "SEO",
      "GTM",
      "Schema"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project7/cover.jpg",
        "alt": "Saqi SEO"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "تحدي مشابه لمنصة رمز، تم الربط وحقن الفهرسة عبر Google Tag Manager.",
        "en": "A challenge similar to the Ramz platform, integrated and indexed via Google Tag Manager."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Google Tag Manager • SEO",
        "en": "Google Tag Manager • SEO"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "vortexq8-seo",
    "universe": 31,
    "slug": "vortexq8-seo",
    "isFeatured": false,
    "name": {
      "en": "Vortexq8",
      "ar": "Vortexq8"
    },
    "tagline": {
      "en": "Custom JS SEO Injection",
      "ar": "حقن SEO مخصص بلغة JavaScript"
    },
    "description": {
      "ar": "تغيير التصميم بالكامل بـ Custom CSS و Custom JS، مع حقن فهرسة جوجل في منصة رمز (التي لا تقبل تعديل HTML).",
      "en": "Completely redesigned using Custom CSS and JS, injecting Google indexing into the Ramz platform which restricts HTML edits."
    },
    "focusKeyword": {
      "en": "Google Core Update penalty recovery SEO",
      "ar": "استعادة عقوبة Google Core Update SEO"
    },
    "seoTitle": {
      "en": "Vortexq8 Google Penalty Recovery | El Hussainy",
      "ar": "استعادة عقوبة جوجل Vortexq8 | الحسيني"
    },
    "seoDescription": {
      "en": "Google Core Update penalty recovery: toxic link disavow, Next.js performance rebuild, structured data injection, and top-3 ranking restoration.",
      "ar": "استعادة عقوبة Google Core Update: تنصّل روابط سامة وإعادة بناء أداء Next.js وحقن بيانات منظمة واستعادة تصنيفات أعلى 3."
    },
    "techStack": [
      "Custom CSS",
      "Custom JS",
      "SEO"
    ],
    "tags": [
      "SEO",
      "Redesign",
      "JavaScript"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project6/cover.jpg",
        "alt": "Vortexq8 Analytics"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "تغيير التصميم بالكامل بـ Custom CSS و Custom JS، مع حقن فهرسة جوجل في منصة رمز (التي لا تقبل تعديل HTML).",
        "en": "Completely redesigned using Custom CSS and JS, injecting Google indexing into the Ramz platform which restricts HTML edits."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Custom CSS • Custom JS • SEO",
        "en": "Custom CSS • Custom JS • SEO"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  },
  {
    "id": "store-static-ui",
    "universe": 32,
    "slug": "store-static-ui",
    "isFeatured": false,
    "name": {
      "en": "Store Static UI",
      "ar": "واجهة متجر ثابتة"
    },
    "tagline": {
      "en": "E-Commerce Frontend Showcase",
      "ar": "عرض واجهة تجارة إلكترونية"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "Next.js SSG product catalogue GitHub Pages",
      "ar": "كتالوج منتجات Next.js SSG GitHub Pages"
    },
    "seoTitle": {
      "en": "Static Product Catalogue — Next.js Jamstack | El Hussainy",
      "ar": "كتالوج المنتجات الثابت — Next.js Jamstack | الحسيني"
    },
    "seoDescription": {
      "en": "Zero-cost Jamstack product catalogue built with Next.js SSG, GitHub Pages hosting, and GitHub Actions CI/CD deployment.",
      "ar": "كتالوج منتجات Jamstack بتكلفة صفر مبني بـ Next.js SSG واستضافة GitHub Pages ونشر GitHub Actions CI/CD."
    },
    "techStack": [
      "HTML",
      "CSS",
      "JS",
      "UI/UX"
    ],
    "tags": [
      "Frontend",
      "UI",
      "Showcase"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project4/cover.jpg",
        "alt": "Static Store"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "HTML • CSS • JS • UI/UX",
        "en": "HTML • CSS • JS • UI/UX"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "monera-platform",
    "universe": 33,
    "slug": "monera-platform",
    "isFeatured": false,
    "name": {
      "en": "Monera Platform",
      "ar": "منصة Monera"
    },
    "tagline": {
      "en": "Completed Undelivered Project",
      "ar": "مشروع مكتمل غير مُسلَّم"
    },
    "description": {
      "ar": "مشروع تم برمجته وتنفيذه بنجاح.",
      "en": "Project successfully developed and implemented."
    },
    "focusKeyword": {
      "en": "service management platform React",
      "ar": "منصة إدارة خدمات React"
    },
    "seoTitle": {
      "en": "Monera Service Platform | El Hussainy",
      "ar": "منصة منيرة للخدمات | الحسيني"
    },
    "seoDescription": {
      "en": "Full-featured service management React platform with Framer Motion animations and premium user experience.",
      "ar": "منصة إدارة خدمات React كاملة المزايا مع رسوم Framer Motion وتجربة مستخدم راقية."
    },
    "techStack": [
      "Web Platform",
      "Frontend",
      "Backend"
    ],
    "tags": [
      "Web App",
      "Portfolio"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project5/cover.jpg",
        "alt": "Monera"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "الطلب والتنفيذ",
        "en": "Requirement & Execution"
      },
      "solution": {
        "ar": "تم تنفيذ المطلوب برمجياً.",
        "en": "Requirements implemented programmatically."
      },
      "outcome": {
        "ar": "اكتمال المشروع والتسليم.",
        "en": "Project completed and delivered."
      },
      "role": {
        "ar": "تطوير",
        "en": "Development"
      },
      "stack": {
        "ar": "Web Platform • Frontend • Backend",
        "en": "Web Platform • Frontend • Backend"
      },
      "steps": {
        "ar": [],
        "en": []
      },
      "faqs": []
    }
  },
  {
    "id": "crm-system-nextjs",
    "universe": 36,
    "slug": "crm-system-nextjs",
    "isFeatured": false,
    "name": {
      "en": "Next.js CRM Ecosystem",
      "ar": "نظام CRM مبني على Next.js"
    },
    "tagline": {
      "en": "Automated CRM with WhatsApp Integration",
      "ar": "CRM آلي مع تكامل واتساب"
    },
    "description": {
      "ar": "نظام CRM كامل للشركات مبني بـ Next.js يحتوي على أتمتة بالواتساب، أجندة، وإدارة الصفقات (Deals).",
      "en": "A complete CRM system for companies built with Next.js, featuring WhatsApp automation, agenda, and deals management."
    },
    "focusKeyword": {
      "en": "Cloudflare Workers CRM edge computing",
      "ar": "CRM Cloudflare Workers حوسبة طرفية"
    },
    "seoTitle": {
      "en": "Edge CRM — Cloudflare Workers | El Hussainy",
      "ar": "CRM الطرفي — Cloudflare Workers | الحسيني"
    },
    "seoDescription": {
      "en": "Cloudflare Workers-powered CRM with edge-computed API routes delivering 90% latency reduction for distributed global sales teams.",
      "ar": "CRM مدعوم بـ Cloudflare Workers مع مسارات API محسوبة على الحافة تقدّم تقليص وقت استجابة 90% للفرق مبيعات عالمية موزعة."
    },
    "techStack": [
      "Next.js",
      "WhatsApp API",
      "Tailwind CSS"
    ],
    "tags": [
      "CRM",
      "Next.js",
      "Automation"
    ],
    "repoUrl": "",
    "liveUrl": "",
    "screens": [
      {
        "id": "s1",
        "src": "/assets/project1/cover.jpg",
        "alt": "Edge CRM"
      }
    ],
    "highlights": [],
    "caseStudy": {
      "problem": {
        "ar": "التطوير البرمجي والتنفيذ",
        "en": "Software development and implementation"
      },
      "solution": {
        "ar": "نظام CRM كامل للشركات مبني بـ Next.js يحتوي على أتمتة بالواتساب، أجندة، وإدارة الصفقات (Deals).",
        "en": "A complete CRM system for companies built with Next.js, featuring WhatsApp automation, agenda, and deals management."
      },
      "outcome": {
        "ar": "تم بناء المشروع وتطويره بنجاح",
        "en": "Project successfully built and developed"
      },
      "role": {
        "ar": "مطور",
        "en": "Developer"
      },
      "stack": {
        "ar": "Next.js • WhatsApp API • Tailwind CSS",
        "en": "Next.js • WhatsApp API • Tailwind CSS"
      },
      "steps": {
        "ar": [
          "التحليل",
          "التنفيذ"
        ],
        "en": [
          "Analysis",
          "Execution"
        ]
      },
      "faqs": []
    }
  }
];
