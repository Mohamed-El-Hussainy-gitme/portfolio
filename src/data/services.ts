import type { Locale } from "@/core/i18n/locale";

export type ServiceDefinition = {
  /**
   * Unique identifier used in routes. Also used as the default key when
   * iterating over services. Slugs should be stable and URL‑friendly.
   */
  slug: string;
  /**
   * Name of the icon representing the service. Consumed by various UI
   * components.
   */
  icon: string;
  /** Localised title for each service. */
  title: Record<Locale, string>;
  /** Summary describing the service. */
  summary: Record<Locale, string>;
  /** Short bullet points highlighting the scope of the service. */
  bullets: Record<Locale, string[]>;
  /** Primary keyword or phrase the service targets (per locale). */
  focusKeyword?: Record<Locale, string>;
  /**
   * Concrete deliverables you will receive. Each item is a localised string
   * describing a specific artefact or outcome of the service. These arrays
   * power the deliverables list on the service cards and detail pages.
   */
  deliverables: { en: string; ar: string }[];
  /**
   * Expected high‑level outcomes of the service. These help set
   * expectations for the benefits a client will gain.
   */
  outcomes: { en: string; ar: string }[];
  /**
   * Step‑by‑step process describing how the service is delivered. Keeping
   * these explicit improves transparency and clarity for clients.
   */
  process: { en: string; ar: string }[];
};

/**
 * Alias for the concrete service type consumed throughout the app. Some
 * modules import `ServiceItem` rather than `ServiceDefinition`; exporting
 * this alias here avoids duplicate definitions and TS errors.
 */
export type ServiceItem = ServiceDefinition;

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
    deliverables: [
      { en: "Responsive landing page UI with clear CTA", ar: "واجهة صفحة هبوط متجاوبة مع CTA واضح" },
      { en: "Analytics and conversion tracking integration", ar: "دمج تحليلات وتتبع التحويل" },
      { en: "Optimised performance and Core Web Vitals", ar: "تحسين الأداء وCore Web Vitals" },
      { en: "Technical SEO setup with metadata and schema", ar: "إعداد SEO تقني مع ميتا وسكيما" },
    ],
    outcomes: [
      { en: "Higher conversion rate and more leads", ar: "نسبة تحويل أعلى وعملاء أكثر" },
      { en: "Faster load times and better UX", ar: "سرعة تحميل أعلى وتجربة مستخدم أفضل" },
      { en: "Clear messaging aligned to the target audience", ar: "رسالة واضحة متوافقة مع الجمهور المستهدف" },
      { en: "Accurate tracking of campaign ROI", ar: "تتبع دقيق لعائد الحملات" },
    ],
    process: [
      { en: "Plan goal and offer with you", ar: "تحديد الهدف والعرض معك" },
      { en: "Design content structure and copy", ar: "تصميم هيكل المحتوى والكتابة" },
      { en: "Develop the responsive page and animations", ar: "تطوير صفحة متجاوبة وحركات" },
      { en: "Integrate tracking and SEO basics", ar: "دمج التتبع وأساسيات SEO" },
      { en: "Review, iterate, and launch", ar: "مراجعة وتعديل وإطلاق" },
    ],
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
    deliverables: [
      { en: "Modern responsive multi‑page website", ar: "موقع متعدد الصفحات بواجهة حديثة متجاوبة" },
      { en: "Company services and about pages", ar: "صفحات خدمات الشركة والتعريف" },
      { en: "Lead capture forms and CRM integration", ar: "نماذج جمع العملاء وتكامل CRM" },
      { en: "Technical SEO with correct canonicals and hreflang", ar: "SEO تقني مع canonical و hreflang صحيح" },
      { en: "Optimised performance and accessibility", ar: "تحسين الأداء وإتاحة الوصول" },
    ],
    outcomes: [
      { en: "Professional online presence and trust", ar: "حضور إلكتروني احترافي وثقة أعلى" },
      { en: "Improved search rankings for your services", ar: "ترتيب أعلى لخدماتك في محركات البحث" },
      { en: "More inquiries and qualified leads", ar: "عدد أكبر من الاستفسارات والعملاء المحتملين" },
      { en: "Scalable structure for future pages", ar: "هيكل قابل للتوسع لصفحات مستقبلية" },
    ],
    process: [
      { en: "Discovery and sitemap planning", ar: "استكشاف وتخطيط خريطة الموقع" },
      { en: "Content collection and copywriting", ar: "جمع المحتوى وكتابة النصوص" },
      { en: "Design UI components and layout", ar: "تصميم الواجهة والمخطط" },
      { en: "Develop pages with responsive design and SEO", ar: "تطوير الصفحات بتصميم متجاوب وSEO" },
      { en: "Test, deploy, and train you on editing", ar: "اختبار، نشر، وتدريبك على التعديل" },
    ],
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
    deliverables: [
      { en: "Full e‑commerce site with catalog and product pages", ar: "متجر كامل مع كتالوج وصفحات منتجات" },
      { en: "Secure cart and checkout flow", ar: "مسار سلة وشراء آمن" },
      { en: "Admin dashboard for product and order management", ar: "لوحة تحكم لإدارة المنتجات والطلبات" },
      { en: "SEO templates for categories and products", ar: "قوالب SEO للأقسام والمنتجات" },
      { en: "Payment and shipping integrations", ar: "تكاملات الدفع والشحن" },
    ],
    outcomes: [
      { en: "Sell products online with confidence", ar: "بيع المنتجات عبر الإنترنت بثقة" },
      { en: "Fast browsing and frictionless checkout", ar: "تصفح سريع وشراء سلس" },
      { en: "Better product visibility in search engines", ar: "ظهور أفضل للمنتجات في محركات البحث" },
      { en: "Easy administration and analytics", ar: "إدارة سهلة وتحليلات واضحة" },
    ],
    process: [
      { en: "Gather catalog and requirements", ar: "جمع الكتالوج والمتطلبات" },
      { en: "Design UX for catalog and product pages", ar: "تصميم تجربة المستخدم للكتالوج وصفحات المنتج" },
      { en: "Develop storefront and admin dashboard", ar: "تطوير واجهة المتجر ولوحة الإدارة" },
      { en: "Integrate payment, shipping, and SEO templates", ar: "دمج الدفع والشحن وقوالب SEO" },
      { en: "Test thoroughly and launch store", ar: "اختبار شامل وإطلاق المتجر" },
    ],
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
    deliverables: [
      { en: "Custom dashboard UI with tables and filters", ar: "واجهة لوحة تحكم مخصصة مع جداول وفلاتر" },
      { en: "Role‑based access control and authentication", ar: "نظام صلاحيات وتوثيق المستخدم" },
      { en: "Data visualisation and export features", ar: "عرض البيانات وميزات التصدير" },
      { en: "API integration and state management", ar: "تكامل API وإدارة الحالة" },
    ],
    outcomes: [
      { en: "Efficient management of complex data", ar: "إدارة فعالة للبيانات المعقدة" },
      { en: "Improved user productivity and workflow", ar: "زيادة إنتاجية المستخدم وسلاسة العمل" },
      { en: "Secure access and operations", ar: "وصول آمن وعمليات موثوقة" },
      { en: "Scalable architecture for future modules", ar: "معمارية قابلة للتوسع للوحدات المستقبلية" },
    ],
    process: [
      { en: "Understand your data and roles", ar: "فهم بياناتك والأدوار" },
      { en: "Design user interface and permissions", ar: "تصميم واجهة المستخدم والصلاحيات" },
      { en: "Implement tables, filters, and RBAC", ar: "تنفيذ الجداول والفلاتر ونظام RBAC" },
      { en: "Integrate with your APIs and handle state", ar: "دمج مع API الخاص بك وإدارة الحالة" },
      { en: "Test access patterns and deploy", ar: "اختبار أنماط الوصول والنشر" },
    ],
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
    deliverables: [
      { en: "Frontend application with responsive UI", ar: "تطبيق واجهة أمامية بواجهة متجاوبة" },
      { en: "Backend API with authentication and roles", ar: "API خلفية مع مصادقة وصلاحيات" },
      { en: "Database schema (SQL/NoSQL) and migrations", ar: "مخطط قاعدة البيانات (SQL/NoSQL) و migrations" },
      { en: "Deployment pipeline and monitoring", ar: "خط نشر ومراقبة" },
      { en: "Documentation and handover", ar: "توثيق وتسليم" },
    ],
    outcomes: [
      { en: "End‑to‑end system ready for real users", ar: "نظام متكامل جاهز للمستخدمين" },
      { en: "Better maintainability and scalability", ar: "قابلية صيانة وتوسع أفضل" },
      { en: "Secure data and reliable performance", ar: "بيانات آمنة وأداء موثوق" },
      { en: "Confidence to launch and iterate", ar: "ثقة للإطلاق والتطوير المستمر" },
    ],
    process: [
      { en: "Define scope and architecture", ar: "تحديد النطاق والمعمارية" },
      { en: "Design UI/UX and database schemas", ar: "تصميم واجهة المستخدم ومخططات قاعدة البيانات" },
      { en: "Develop frontend, backend, and database", ar: "تطوير الواجهة الأمامية والخلفية وقاعدة البيانات" },
      { en: "Integrate auth, payments, and integrations", ar: "دمج المصادقة والدفع والتكاملات" },
      { en: "Deploy, monitor, and maintain", ar: "نشر ومراقبة وصيانة" },
    ],
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
    deliverables: [
      { en: "Professional WordPress site with custom theme", ar: "موقع ووردبريس احترافي مع قالب مخصص" },
      { en: "Clean navigation and responsive design", ar: "تنقل واضح وتصميم متجاوب" },
      { en: "Performance optimisation and caching", ar: "تحسين الأداء والتخزين المؤقت" },
      { en: "Technical SEO setup and schema", ar: "إعداد SEO تقني وسكيما" },
      { en: "Forms, integrations, and analytics", ar: "نماذج وتكاملات وتحليلات" },
    ],
    outcomes: [
      { en: "Modern website built on familiar platform", ar: "موقع حديث مبني على منصة مألوفة" },
      { en: "Better search visibility and user experience", ar: "ظهور أفضل في البحث وتجربة مستخدم محسنة" },
      { en: "Easy management via WordPress admin", ar: "إدارة سهلة عبر لوحة ووردبريس" },
      { en: "Prepared for future growth and content", ar: "جاهز للتوسع والمحتوى المستقبلي" },
    ],
    process: [
      { en: "Choose theme and define structure", ar: "اختيار القالب وتحديد الهيكل" },
      { en: "Install WordPress and configure plugins", ar: "تثبيت ووردبريس وإعداد الإضافات" },
      { en: "Develop pages and customise design", ar: "تطوير الصفحات وتخصيص التصميم" },
      { en: "Optimise performance and SEO", ar: "تحسين الأداء وSEO" },
      { en: "Launch and train on editing", ar: "الإطلاق وتدريبك على التحرير" },
    ],
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
    deliverables: [
      { en: "Technical SEO audit and fixes", ar: "تدقيق SEO تقني وتصحيح" },
      { en: "Core Web Vitals optimisation", ar: "تحسين Core Web Vitals" },
      { en: "Sitemap/robots and canonical corrections", ar: "تصحيح sitemap/robots/canonical" },
      { en: "Schema markup improvements", ar: "تحسين سكيما" },
      { en: "Performance reports and recommendations", ar: "تقارير أداء وتوصيات" },
    ],
    outcomes: [
      { en: "Improved search ranking and visibility", ar: "تحسين ترتيب البحث والظهور" },
      { en: "Faster page loads and better UX", ar: "سرعة تحميل أعلى وتجربة مستخدم أفضل" },
      { en: "Cleaner indexing and crawling", ar: "فهرسة وزحف أنظف" },
      { en: "Actionable insights for future improvements", ar: "إرشادات قابلة للتنفيذ للتحسين المستقبلي" },
    ],
    process: [
      { en: "Audit site crawl, index, and vitals", ar: "تدقيق الزحف والفهرسة والفور فيتالز" },
      { en: "Identify issues and prioritise fixes", ar: "تحديد المشكلات وترتيب الأولويات" },
      { en: "Implement technical fixes and schema", ar: "تنفيذ الإصلاحات التقنية والسكيما" },
      { en: "Re‑test and monitor metrics", ar: "إعادة الاختبار ومراقبة المقاييس" },
      { en: "Document results and recommendations", ar: "توثيق النتائج والتوصيات" },
    ],
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
    deliverables: [
      { en: "Monthly bug fixes and updates", ar: "إصلاحات وتحديثات شهرية" },
      { en: "Content updates and small iterations", ar: "تحديث المحتوى وتحسينات صغيرة" },
      { en: "Security patches and hardening", ar: "تصحيحات أمنية وتقوية" },
      { en: "Performance checks and optimisations", ar: "فحوصات أداء وتحسينات" },
      { en: "Regular reports and communication", ar: "تقارير منتظمة وتواصل" },
    ],
    outcomes: [
      { en: "Stable and secure website", ar: "موقع مستقر وآمن" },
      { en: "Up‑to‑date content and features", ar: "محتوى وميزات محدثة" },
      { en: "Peace of mind through monitoring", ar: "راحة البال عبر المتابعة" },
      { en: "Long‑term health of your site", ar: "صحة موقعك على المدى الطويل" },
    ],
    process: [
      { en: "Assess tasks and priorities", ar: "تقييم المهام والأولويات" },
      { en: "Schedule fixes and updates", ar: "جدولة الإصلاحات والتحديثات" },
      { en: "Implement and test changes", ar: "تنفيذ واختبار التغييرات" },
      { en: "Report progress and results", ar: "تقرير التقدم والنتائج" },
      { en: "Iterate each cycle", ar: "تكرار كل دورة" },
    ],
  },
];

// Backward-compatible alias (preferred import: { services })
export const services = SERVICES;
