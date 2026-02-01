import type { Locale } from "@/core/i18n/locale";

export type ServiceDefinition = {
  slug: string;
  icon: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
  focusKeyword?: Record<Locale, string>;
};

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "landing-page",
    icon: "landing page",
    title: {
      en: "Landing Page (Ads & Campaigns)",
      ar: "صفحة هبوط (إعلانات وحملات)",
    },
    summary: {
      en: "Create an online landing page that attracts customers and converts clicks into leads—fast, responsive, tracking-ready, and built with technical SEO foundations.",
      ar: "صفحة هبوط سريعة تركز على التحويل: CTA واضح، تتبع جاهز، وتجهيز SEO تقني يساعدك تظهر وتجمع عملاء.",
    },
    bullets: {
      en: [
        "Conversion-first layout and clear CTA",
        "Fast performance + Core Web Vitals focus",
        "Analytics/Pixel/UTM tracking setup",
        "Technical SEO (indexing, meta, schema basics)",
      ],
      ar: [
        "تصميم يركز على التحويل وCTA واضح",
        "أداء عالي وتحسين Core Web Vitals",
        "تجهيز التتبع (Analytics / Pixel / UTM)",
        "SEO تقني (فهرسة + ميتا + Schema أساسيات)",
      ],
    },
    focusKeyword: {
      en: "create online website attract customers",
      ar: "إنشاء صفحة هبوط لجذب العملاء وزيادة التحويل",
    },
  },

  {
    slug: "company-website",
    icon: "business website",
    title: {
      en: "Company Website (Brand & Leads)",
      ar: "موقع شركة (براند وعملاء)",
    },
    summary: {
      en: "Develop a professional company website that builds trust, ranks for core services, and attracts customers—responsive UI, clean UX, and technical SEO from day one.",
      ar: "موقع شركة احترافي يعزز الثقة ويستهدف كلمات بحث واضحة لخدماتك—واجهة Responsive وتجربة عربية/إنجليزية بدون أخطاء اتجاه مع SEO تقني.",
    },
    bullets: {
      en: [
        "Modern responsive UI + clean information architecture",
        "Technical SEO setup (crawl/index, canonicals, hreflang)",
        "Performance optimisation (Core Web Vitals)",
        "Lead capture (forms, WhatsApp, CRM integrations)",
      ],
      ar: [
        "واجهة حديثة Responsive + بنية صفحات واضحة",
        "SEO تقني (زحف/فهرسة، canonical، hreflang)",
        "تحسين الأداء (Core Web Vitals)",
        "تجهيز جمع العملاء (نماذج/واتساب/تكاملات)",
      ],
    },
    focusKeyword: {
      en: "develop professional websites",
      ar: "تطوير موقع شركة احترافي مع SEO وأداء عالي",
    },
  },

  {
    slug: "ecommerce",
    icon: "online store",
    title: {
      en: "E-commerce Store (Catalog & Checkout)",
      ar: "متجر إلكتروني (كتالوج وشراء)",
    },
    summary: {
      en: "Build a complete e-commerce website (frontend + backend + database) with product SEO templates, fast browsing, secure checkout flow, and clean tracking.",
      ar: "تطوير متجر إلكتروني كامل (واجهة + لوحة تحكم + قاعدة بيانات) مع قوالب SEO للمنتجات والأقسام ومسار شراء واضح وآمن.",
    },
    bullets: {
      en: [
        "Catalog, product pages, filters, and search UX",
        "SEO templates for categories/products + schema",
        "Checkout flow + integrations (payments/shipping)",
        "Admin dashboard + database (SQL/NoSQL) when needed",
      ],
      ar: [
        "كتالوج + صفحات منتجات + فلاتر + بحث",
        "قوالب SEO للأقسام/المنتجات + Schema",
        "شراء + تكاملات (دفع/شحن)",
        "لوحة تحكم + قاعدة بيانات (SQL/NoSQL) حسب الحاجة",
      ],
    },
    focusKeyword: {
      en: "build complete website frontend backend database",
      ar: "تطوير متجر إلكتروني كامل بواجهة ولوحة تحكم وقاعدة بيانات",
    },
  },

  {
    slug: "dashboard",
    icon: "admin dashboard",
    title: {
      en: "Dashboard UI (Tables & Roles)",
      ar: "لوحة تحكم (جداول وصلاحيات)",
    },
    summary: {
      en: "Build full dashboard UI for data-heavy systems—tables, filters, roles, and state management—ready for REST API integration and authentication.",
      ar: "لوحة تحكم احترافية للبيانات: جداول وفلاتر وصلاحيات وإدارة حالة منظمة—جاهزة للتكامل مع REST API والمصادقة.",
    },
    bullets: {
      en: [
        "Tables, filters, pagination, exports",
        "Role-based access (RBAC) + auth-ready UX",
        "REST API integrations + error-safe state",
        "Performance and accessibility best practices",
      ],
      ar: [
        "جداول + فلاتر + Pagination + تصدير",
        "صلاحيات (RBAC) وتجربة جاهزة للمصادقة",
        "تكاملات REST API وإدارة حالة آمنة",
        "أداء وإتاحة وصول (Accessibility) بشكل صحيح",
      ],
    },
    focusKeyword: {
      en: "build full dashboard responsive UI rest api auth integrations",
      ar: "تطوير لوحة تحكم احترافية مع تكامل API وصلاحيات",
    },
  },

  {
    slug: "fullstack-system",
    icon: "full system",
    title: {
      en: "Full-Stack System (Web App + API + Database)",
      ar: "نظام كامل (ويب + API + قاعدة بيانات)",
    },
    summary: {
      en: "Build complete websites and systems (frontend, backend, database) with responsive UI, technical SEO, performance, REST APIs, auth, integrations, and SQL/NoSQL—deployment and maintenance included.",
      ar: "بناء نظام كامل (Frontend + Backend + Database): واجهة Responsive + SEO + Performance + REST API + Auth + Integrations + SQL/NoSQL + نشر وصيانة.",
    },
    bullets: {
      en: [
        "Frontend: responsive UI + clean UX",
        "Backend: REST API, auth, roles, integrations",
        "Database: SQL/NoSQL design + migrations",
        "Deployment, monitoring, and maintenance plan",
      ],
      ar: [
        "Frontend: واجهة Responsive وتجربة UX واضحة",
        "Backend: REST API + Auth + Roles + Integrations",
        "Database: تصميم SQL/NoSQL + Migrations",
        "نشر ومتابعة وصيانة بشكل منظم",
      ],
    },
    focusKeyword: {
      en: "build complete websites frontend backend database responsive UI SEO performance REST API auth SQL NoSQL deployment maintenance",
      ar: "بناء موقع/نظام كامل Frontend Backend Database مع SEO وأداء وAPI ومصادقة",
    },
  },

  {
    slug: "wordpress-website",
    icon: "wordpress",
    title: {
      en: "WordPress Website (Professional & SEO-ready)",
      ar: "موقع ووردبريس (احترافي وجاهز للسيو)",
    },
    summary: {
      en: "Create a professional website on WordPress—clean theme setup, performance optimisation, technical SEO, and a structured content system that attracts customers.",
      ar: "إنشاء موقع ووردبريس احترافي: إعداد قالب نظيف، تحسين الأداء، SEO تقني، ونظام محتوى منظم يساعدك تجذب العملاء.",
    },
    bullets: {
      en: [
        "Theme setup + child theme (when needed)",
        "Performance + caching + Core Web Vitals",
        "Technical SEO (sitemap, robots, schema basics)",
        "Forms, tracking, and integrations",
      ],
      ar: [
        "إعداد قالب + Child Theme عند الحاجة",
        "تحسين أداء + كاش + Core Web Vitals",
        "SEO تقني (Sitemap/Robots/Schema أساسيات)",
        "نماذج + تتبع + تكاملات",
      ],
    },
    focusKeyword: {
      en: "create a professional website on wordpress",
      ar: "إنشاء موقع ووردبريس احترافي مع SEO وأداء",
    },
  },

  {
    slug: "seo-performance",
    icon: "SEO audit",
    title: {
      en: "SEO & Performance (Core Web Vitals)",
      ar: "SEO وأداء (Core Web Vitals)",
    },
    summary: {
      en: "Technical SEO + performance work focused on crawling, indexing, sitemap/robots correctness, and Core Web Vitals improvements.",
      ar: "SEO تقني + تحسين أداء: زحف وفهرسة، صحة sitemap/robots، وتحسين Core Web Vitals وقراءة محركات البحث.",
    },
    bullets: {
      en: [
        "Crawl/index diagnostics + fix priorities",
        "Sitemap/robots/canonicals/hreflang correctness",
        "Core Web Vitals optimisation",
        "Schema + snippet improvements",
      ],
      ar: [
        "تشخيص الزحف والفهرسة وترتيب الأولويات",
        "تصحيح sitemap/robots/canonicals/hreflang",
        "تحسين Core Web Vitals",
        "Schema وتحسين المقتطفات",
      ],
    },
    focusKeyword: {
      en: "technical SEO performance core web vitals",
      ar: "سيو تقني وتحسين أداء Core Web Vitals",
    },
  },

  {
    slug: "maintenance",
    icon: "website maintenance",
    title: {
      en: "Maintenance (Fixes & Content)",
      ar: "صيانة (إصلاحات ومحتوى)",
    },
    summary: {
      en: "Keep your website stable: fixes, content updates, monitoring, and small iterations—SEO and performance kept healthy over time.",
      ar: "حافظ على موقعك ثابتًا: إصلاحات وتحديث محتوى ومتابعة وتحسينات صغيرة—مع الحفاظ على SEO والأداء بشكل مستمر.",
    },
    bullets: {
      en: [
        "Bug fixes + content updates",
        "Monitoring + deployment safety checks",
        "Ongoing SEO + performance hygiene",
        "Security updates and hardening",
      ],
      ar: [
        "إصلاح أخطاء + تحديث محتوى",
        "متابعة + فحوصات نشر آمنة",
        "تحسين SEO وأداء بشكل مستمر",
        "تحديثات أمنية وتقوية الموقع",
      ],
    },
    focusKeyword: {
      en: "website maintenance security updates",
      ar: "صيانة مواقع وتحديثات أمنية وتحسين SEO",
    },
  },
];
