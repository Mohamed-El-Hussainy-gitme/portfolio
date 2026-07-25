import type { Locale } from "@/core/i18n/locale";

export type ServiceDefinition = {
  slug: string;
  icon: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
  focusKeyword?: Record<Locale, string>;
  deliverables: { en: string; ar: string }[];
  outcomes: { en: string; ar: string }[];
  process: { en: string; ar: string }[];
};

export type ServiceItem = ServiceDefinition;

export const services: ServiceDefinition[] = [
  {
    slug: "saas-development",
    icon: "code",
    title: {
      en: "SaaS & Custom Web Applications",
      ar: "بناء منصات الـ SaaS والأنظمة المخصصة",
    },
    summary: {
      en: "End-to-end development of scalable SaaS platforms and custom web applications (like Ahwa and Freelawyers). I handle everything from database architecture to frontend implementation.",
      ar: "تطوير شامل لمنصات الـ SaaS وتطبيقات الويب المخصصة (مثل منصات قهوة ومحامين). أهتم بكل شيء بدءاً من البنية التحتية وقواعد البيانات وحتى الواجهات النهائية.",
    },
    bullets: {
      en: [
        "Multi-tenant architectures",
        "Complex dashboards and POS systems",
        "Real-time database integrations",
        "Scalable Next.js and Node.js backends",
      ],
      ar: [
        "بناء أنظمة متعددة المستأجرين (Multi-tenant)",
        "تطوير لوحات تحكم وأنظمة نقاط بيع معقدة",
        "تكامل مع قواعد البيانات اللحظية (Real-time)",
        "خوادم خلفية قابلة للتوسع باستخدام Next.js و Node.js",
      ],
    },
    focusKeyword: {
      en: "SaaS Development",
      ar: "تطوير SaaS",
    },
    deliverables: [
      { en: "Fully functional SaaS product", ar: "منتج SaaS متكامل يعمل بكفاءة" },
      { en: "Secure and scalable database architecture", ar: "بنية قواعد بيانات آمنة وقابلة للتوسع" },
      { en: "Admin and user dynamic dashboards", ar: "لوحات تحكم ديناميكية للإدارة والمستخدمين" },
      { en: "API documentation and integrations", ar: "توثيق برمجي ودمج مع واجهات برمجية API" },
    ],
    outcomes: [
      { en: "A product ready for market launch", ar: "منتج جاهز للإطلاق في السوق الفعلي" },
      { en: "High performance under heavy load", ar: "أداء عالي تحت ضغط المستخدمين" },
      { en: "Seamless user experience", ar: "تجربة مستخدم سلسة واحترافية" },
      { en: "Easy to maintain and scale", ar: "سهولة في الصيانة والتوسع مستقبلاً" },
    ],
    process: [
      { en: "System Architecture Design", ar: "تصميم بنية النظام وهندسة البيانات" },
      { en: "MVP Development", ar: "تطوير النسخة الأولية القابلة للعمل (MVP)" },
      { en: "Iterative Feature Implementation", ar: "بناء الميزات الإضافية بشكل متكرر" },
      { en: "Testing & Security Audits", ar: "الاختبار ومراجعة الأمان (RLS)" },
      { en: "Deployment & Scaling", ar: "الإطلاق وإعداد خوادم التوسع" },
    ],
  },
  {
    slug: "business-management-systems",
    icon: "layout-dashboard",
    title: {
      en: "Business Management Systems (CRM / ERP / POS)",
      ar: "أنظمة إدارة الأعمال (CRM / ERP / POS)",
    },
    summary: {
      en: "Building the operational backbone real businesses run on — CRM, ERP, and point-of-sale systems that unify inventory, invoicing, customers, and reporting in one dashboard (like Kenz, Al Khair, and AL OLA's logistics platform), instead of juggling disconnected tools.",
      ar: "بناء العمود الفقري التشغيلي اللي بيدير بيه أصحاب البزنس شغلهم فعليًا — أنظمة CRM وERP ونقاط بيع بتوحّد المخزون والفواتير والعملاء والتقارير في لوحة تحكم واحدة (زي كنز والخير ومنصة العلا اللوجستية)، بدل التعامل مع أدوات متفرقة عن بعض.",
    },
    bullets: {
      en: [
        "Unified online + in-store POS with shared inventory",
        "WhatsApp-automated CRM (agenda, deals, follow-ups)",
        "Odoo-style systems built independently, no licensing",
        "Driver/field logistics matching and dispatch dashboards",
      ],
      ar: [
        "نقطة بيع أونلاين وأوفلاين موحدة بمخزون مشترك",
        "أنظمة CRM بأتمتة واتساب (أجندة، صفقات، متابعات)",
        "أنظمة على طراز أودو مبنية بشكل مستقل بدون ترخيص",
        "لوحات تحكم لمطابقة وتوزيع مناديب ميدانيين",
      ],
    },
    focusKeyword: {
      en: "CRM ERP POS Systems",
      ar: "أنظمة CRM ERP POS",
    },
    deliverables: [
      { en: "Unified management dashboard (CRM/ERP/POS)", ar: "لوحة تحكم إدارية موحدة (CRM/ERP/POS)" },
      { en: "Shared inventory and invoicing across channels", ar: "مخزون وفواتير موحدة عبر كل قنوات البيع" },
      { en: "Automation integrations (WhatsApp, notifications)", ar: "تكاملات أتمتة (واتساب، إشعارات)" },
      { en: "Sales, stock, and performance reports", ar: "تقارير مبيعات ومخزون وأداء" },
    ],
    outcomes: [
      { en: "One system instead of scattered spreadsheets and tools", ar: "نظام واحد بدل إكسيل وأدوات متفرقة" },
      { en: "Accurate real-time inventory across online and in-store sales", ar: "مخزون دقيق لحظيًا عبر البيع الأونلاين والداخلي" },
      { en: "Faster customer follow-up through automation", ar: "متابعة أسرع للعملاء عن طريق الأتمتة" },
      { en: "A system the owner can actually run day to day", ar: "نظام يقدر صاحب البزنس يديره فعليًا يوم بيوم" },
    ],
    process: [
      { en: "Mapping the real business workflow", ar: "رسم سير العمل الفعلي للبزنس" },
      { en: "Dashboard & data model architecture", ar: "هيكلة لوحة التحكم ونموذج البيانات" },
      { en: "Core module development (inventory, invoicing, CRM)", ar: "بناء الوحدات الأساسية (مخزون، فواتير، CRM)" },
      { en: "Automation & third-party integrations", ar: "ربط الأتمتة والتكاملات الخارجية" },
      { en: "Handover and team training", ar: "التسليم وتدريب الفريق على الاستخدام" },
    ],
  },
  {
    slug: "corporate-websites",
    icon: "building",
    title: {
      en: "Corporate & Business Websites",
      ar: "مواقع الشركات والوكالات",
    },
    summary: {
      en: "Full-stack websites for real companies and agencies (like BCC and Lamar) — built with a content dashboard the client's own team can use to add services, products, and clients, without needing me for every update.",
      ar: "مواقع Full-Stack كاملة لشركات ووكالات حقيقية (زي BCC ولامار) — مبنية بلوحة تحكم محتوى يقدر فريق العميل نفسه يستخدمها لإضافة الخدمات والمنتجات والعملاء، بدون ما يحتاجوا لي في كل تحديث.",
    },
    bullets: {
      en: [
        "Editable content dashboards (services, products, clients)",
        "Contact forms wired to real inquiry handling",
        "Payment gateway integration where needed",
        "Database security hardening (Row Level Security)",
      ],
      ar: [
        "لوحات تحكم محتوى قابلة للتعديل (خدمات، منتجات، عملاء)",
        "نماذج تواصل مربوطة فعليًا باستقبال الاستفسارات",
        "ربط بوابات دفع لو محتاج المشروع",
        "تأمين قاعدة البيانات (Row Level Security)",
      ],
    },
    focusKeyword: {
      en: "Corporate Website Development",
      ar: "تطوير مواقع شركات",
    },
    deliverables: [
      { en: "Full corporate website with admin dashboard", ar: "موقع شركة كامل بلوحة تحكم إدارية" },
      { en: "Self-service content management for the client's team", ar: "إدارة محتوى ذاتية لفريق العميل" },
      { en: "Working contact/inquiry form", ar: "نموذج تواصل/استفسارات شغال فعليًا" },
      { en: "Secured, production-ready database", ar: "قاعدة بيانات مؤمنة وجاهزة للإنتاج" },
    ],
    outcomes: [
      { en: "A professional online presence matching the company's scale", ar: "حضور احترافي أونلاين يعكس حجم الشركة" },
      { en: "Content the client updates without touching code", ar: "محتوى يقدر العميل يحدثه بدون لمس الكود" },
      { en: "Credibility with large institutional clients", ar: "مصداقية أمام عملاء مؤسسيين كبار" },
      { en: "A secure, stable platform to build on later", ar: "منصة آمنة ومستقرة تقدر تُبنى عليها لاحقًا" },
    ],
    process: [
      { en: "Identity & requirements discovery", ar: "استكشاف الهوية والمتطلبات" },
      { en: "Site architecture & dashboard design", ar: "تصميم هيكلة الموقع ولوحة التحكم" },
      { en: "Frontend & backend development", ar: "تطوير الفرونت إند والباك إند" },
      { en: "Integrations (payments, forms, security)", ar: "التكاملات (دفع، نماذج، تأمين)" },
      { en: "Launch and handover", ar: "الإطلاق والتسليم" },
    ],
  },
  {
    slug: "ecommerce-development",
    icon: "shopping-cart",
    title: {
      en: "E-Commerce Development & Customization",
      ar: "تطوير وتخصيص المتاجر الإلكترونية",
    },
    summary: {
      en: "Building robust e-commerce solutions from scratch or deeply customizing platforms like WooCommerce (e.g., Al Afkham, Rose Store) to perfectly match your brand's unique needs.",
      ar: "بناء حلول تجارة إلكترونية متكاملة من الصفر، أو تخصيص وتطوير منصات مثل WooCommerce (مثل الأفخم ومتجر Rose) لتناسب هوية علامتك التجارية بشكل مثالي.",
    },
    bullets: {
      en: [
        "Custom UI/UX for online stores",
        "Advanced admin panels and coupon systems",
        "Payment gateway integrations",
        "WooCommerce custom functions and CSS",
      ],
      ar: [
        "واجهات وتجربة مستخدم مخصصة للمتاجر",
        "لوحات تحكم متقدمة وأنظمة كوبونات",
        "ربط مع بوابات الدفع الإلكتروني",
        "تخصيص كامل لـ WooCommerce برمجياً وشكلياً",
      ],
    },
    focusKeyword: {
      en: "Custom E-Commerce",
      ar: "متاجر إلكترونية مخصصة",
    },
    deliverables: [
      { en: "Fully customized online store front", ar: "واجهة متجر إلكتروني مخصصة بالكامل" },
      { en: "Integrated payment and shipping", ar: "ربط مع بوابات الدفع والشحن" },
      { en: "Smart admin panel for inventory", ar: "لوحة تحكم ذكية لإدارة المخزون" },
      { en: "Conversion-optimized product pages", ar: "صفحات منتجات محسنة لزيادة المبيعات" },
    ],
    outcomes: [
      { en: "Increased sales conversion rates", ar: "زيادة معدلات التحويل والمبيعات" },
      { en: "Unique brand identity stand-out", ar: "إبراز هوية العلامة التجارية بشكل مميز" },
      { en: "Easy day-to-day store management", ar: "سهولة إدارة المتجر اليومية للمالك" },
      { en: "Secure and fast checkout flow", ar: "عملية دفع سريعة وآمنة للعملاء" },
    ],
    process: [
      { en: "Brand & Requirement Analysis", ar: "تحليل متطلبات المتجر وهوية العلامة" },
      { en: "Store Architecture Setup", ar: "إعداد البنية التحتية للمتجر" },
      { en: "Custom Theme & UI Development", ar: "تطوير القالب والواجهات المخصصة" },
      { en: "Integrations (Payments, APIs)", ar: "دمج بوابات الدفع والإضافات" },
      { en: "Launch and Handover", ar: "إطلاق المتجر وتسليمه للعميل" },
    ],
  },
  {
    slug: "project-rescue",
    icon: "wrench",
    title: {
      en: "Project Rescue & Technical Optimization",
      ar: "إنقاذ المشاريع والتحسين التقني",
    },
    summary: {
      en: "Taking over failing or broken projects (like the Lakatat platform rescue) to fix critical bugs, rewrite slow queries, build missing admin capabilities, and deliver a polished product.",
      ar: "استلام المشاريع المتعثرة أو المليئة بالأخطاء (مثل إنقاذ منصة لقطات)، وإصلاح المشاكل البرمجية الحرجة، تسريع الأداء، وبناء المميزات الناقصة مثل لوحات التحكم لتسليم منتج نهائي لامع.",
    },
    bullets: {
      en: [
        "Debugging and fixing 'black screens'",
        "Database optimization and RLS security",
        "Refactoring messy codebases",
        "Adding missing core features mid-flight",
      ],
      ar: [
        "إصلاح الأخطاء البرمجية والشاشات السوداء",
        "تحسين قواعد البيانات وتأمينها (RLS)",
        "إعادة صياغة الأكواد المعقدة (Refactoring)",
        "بناء الميزات الأساسية الناقصة باحترافية",
      ],
    },
    focusKeyword: {
      en: "Project Rescue",
      ar: "إنقاذ تقني للمشاريع",
    },
    deliverables: [
      { en: "Comprehensive technical audit report", ar: "تقرير مراجعة تقنية شامل" },
      { en: "Patched and stabilized application", ar: "تطبيق مستقر وخالٍ من الأخطاء الحرجة" },
      { en: "Optimized database and fast queries", ar: "قاعدة بيانات محسنة واستعلامات سريعة" },
      { en: "Newly built admin dashboard", ar: "لوحة تحكم إدارية جديدة بالكامل" },
    ],
    outcomes: [
      { en: "Saved investments in failing projects", ar: "إنقاذ استثمارات في مشاريع كادت أن تفشل" },
      { en: "Platform ready for real users and ads", ar: "منصة جاهزة للمستخدمين وعرض الإعلانات" },
      { en: "Restored client trust and momentum", ar: "استعادة ثقة العميل وزخم المشروع" },
      { en: "Secure and scalable foundation", ar: "بنية أساسية آمنة وقابلة للتوسع" },
    ],
    process: [
      { en: "Codebase & Bug Audit", ar: "مراجعة الكود البرمجي وحصر الأخطاء" },
      { en: "Critical Hotfixes (Stabilization)", ar: "إصلاحات عاجلة لاستقرار النظام" },
      { en: "Performance & DB Optimization", ar: "تحسين الأداء وقواعد البيانات" },
      { en: "Feature Implementation (Dashboards)", ar: "تنفيذ الميزات الناقصة كلوحات التحكم" },
      { en: "Final Review & Handoff", ar: "المراجعة النهائية والتسليم" },
    ],
  },
  {
    slug: "technical-seo",
    icon: "search",
    title: {
      en: "Technical SEO & Performance",
      ar: "تحسين محركات البحث التقني والأداء",
    },
    summary: {
      en: "Engineering platforms specifically for top-tier Google Search rankings (like GrowLik and Vortexq8). I implement advanced technical SEO, structured data, and extreme performance tuning.",
      ar: "هندسة المواقع لتتصدر نتائج بحث جوجل (مثل GrowLik و Vortexq8). أقوم بتطبيق معايير Technical SEO المتقدمة، حقن البيانات المنظمة (Schema)، وتحسين الأداء لأقصى حد.",
    },
    bullets: {
      en: [
        "Lighthouse score optimization (100/100)",
        "Core Web Vitals enhancement",
        "Schema and metadata engineering",
        "Custom GTM and indexing scripts",
      ],
      ar: [
        "تحسين تقييمات سرعة Lighthouse",
        "تحسين مؤشرات أداء الويب (Core Web Vitals)",
        "هندسة البيانات المنظمة والميتا داتا",
        "حقن سكريبتات الفهرسة وتخصيص GTM",
      ],
    },
    focusKeyword: {
      en: "Technical SEO",
      ar: "تحسين أداء SEO",
    },
    deliverables: [
      { en: "Lightning-fast website load times", ar: "أوقات تحميل فائقة السرعة للموقع" },
      { en: "Advanced structured data schema", ar: "هياكل بيانات منظمة ومتقدمة" },
      { en: "SEO-injected custom components", ar: "مكونات مخصصة ومحقونة بأكواد الـ SEO" },
      { en: "Analytics and GTM integration", ar: "دمج تحليلات جوجل وإدارة العلامات (GTM)" },
    ],
    outcomes: [
      { en: "First-page Google rankings", ar: "تصدر الصفحة الأولى في بحث جوجل" },
      { en: "Higher organic search traffic", ar: "زيادة الزيارات العضوية المجانية" },
      { en: "Better user retention via speed", ar: "احتفاظ أفضل بالمستخدمين بفضل السرعة" },
      { en: "Accurate tracking for marketing", ar: "تتبع دقيق جداً للحملات التسويقية" },
    ],
    process: [
      { en: "SEO & Performance Audit", ar: "مراجعة وتحليل الـ SEO والأداء الحالي" },
      { en: "Code & Asset Optimization", ar: "تحسين الأكواد والصور والموارد" },
      { en: "Meta & Schema Implementation", ar: "تطبيق علامات الميتا والبيانات المنظمة" },
      { en: "Indexing & GTM Setup", ar: "إعداد الفهرسة و Google Tag Manager" },
      { en: "Result Monitoring & Tweaking", ar: "مراقبة النتائج وإجراء التعديلات الدقيقة" },
    ],
  },
];
