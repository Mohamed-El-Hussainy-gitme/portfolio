// src/data/projects.ts

export type Locale = "en" | "ar";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface ProjectScreen {
  id: string;
  src: string;
  alt: string;
}

export interface ProjectHighlight {
  id: "keyPoints" | "focus" | "role" | "deployment";
  label: LocalizedText;
  body: LocalizedText;
}

export interface ProjectFaq {
  q: LocalizedText;
  a: LocalizedText;
}

export interface ProjectCaseStudy {
  problem: LocalizedText;
  solution: LocalizedText;
  outcome: LocalizedText;
  role: LocalizedText;
  stack: LocalizedText;
  steps: { en: string[]; ar: string[] };
  faqs: ProjectFaq[];
}

export interface ProjectDefinition {
  id: string;
  universe: number;
  slug: string;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;

  /** SEO: simple short focus keyword (used across title/description/content). */
  focusKeyword?: LocalizedText;
  /** SEO: per-project title (recommended <= 60 chars; clamped at runtime). */
  seoTitle?: LocalizedText;
  /** SEO: per-project description (recommended <= 160 chars; clamped at runtime). */
  seoDescription?: LocalizedText;

  techStack: string[];
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;

  screens: ProjectScreen[];
  highlights: ProjectHighlight[];

  /** Case Study content unique per project */
  caseStudy?: ProjectCaseStudy;
}

export const projects: ProjectDefinition[] = [
  /**
   * 01 – Mini Shop – Single Page Store
   */
  {
    id: "mini-shop",
    universe: 1,
    slug: "project-1",
    focusKeyword: {
      en: "single page store",
      ar: "متجر صفحة واحدة",
    },
    seoTitle: {
      en: "Single Page Store: Mini Shop Case Study",
      ar: "متجر صفحة واحدة: دراسة حالة Mini Shop",
    },
    seoDescription: {
      en: "Single page store with cart and checkout in Arabic. Clean UX, responsive layout, and simple e-commerce flow.",
      ar: "متجر صفحة واحدة مع سلة ودفع بالعربية. تجربة واضحة، تصميم متجاوب، وتدفق شراء بسيط.",
    },
    name: {
      en: "Mini Shop – Single Page Store",
      ar: "Mini Shop – متجر صفحة واحدة",
    },
    tagline: {
      en: "Single-page Arabic storefront with cart and checkout, built in pure HTML, CSS, and JavaScript.",
      ar: "متجر صفحة واحدة باللغة العربية مع سلة شراء وخطوة دفع، مبني بالكامل باستخدام HTML وCSS وJavaScript.",
    },
    description: {
      en: [
        "Mini Shop – Single Page Store is a lightweight demo shop built with HTML, CSS, and vanilla JavaScript.",
        "The page combines a simple hero, product grid, cart, and checkout section into one scrolling experience to showcase basic front-end e-commerce UX in Arabic.",
      ].join(" "),
      ar: [
        "Mini Shop – Single Page Store هو مشروع متجر إلكتروني خفيف مبني باستخدام HTML وCSS وJavaScript بدون أي إطار عمل.",
        "تجمع الصفحة بين قسم تعريفي بسيط وشبكة منتجات وسلة شراء وقسم دفع في تجربة تمرير واحدة تعرض أساسيات واجهات المتاجر العربية على الويب.",
      ].join(" "),
    },
    techStack: ["HTML", "CSS", "JavaScript"],
    tags: ["ecommerce", "frontend", "ui"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/single-page-website",
    liveUrl: "https://mohamed-el-hussainy-gitme.github.io/single-page-website/",
    screens: [
      { id: "mini-shop-1", src: "/assets/project1/Screenshot 2025-11-27 151701.png", alt: "Single page store Arabic UI — Mini Shop hero and product grid" },
      { id: "mini-shop-2", src: "/assets/project1/Screenshot 2025-11-27 152128.png", alt: "Single page store — product cards and add to cart" },
      { id: "mini-shop-3", src: "/assets/project1/Screenshot 2025-11-27 153625.png", alt: "Single page store — cart section UI" },
      { id: "mini-shop-4", src: "/assets/project1/Screenshot 2025-11-27 153722.png", alt: "Single page store — cart items and totals" },
      { id: "mini-shop-5", src: "/assets/project1/Screenshot 2025-11-27 153802.png", alt: "Single page store — checkout form layout" },
      { id: "mini-shop-6", src: "/assets/project1/Screenshot 2025-11-27 154052.png", alt: "Single page store — checkout confirmation flow" },
      { id: "mini-shop-7", src: "/assets/project1/Screenshot 2025-11-27 154118.png", alt: "Single page store — responsive layout section" },
      { id: "mini-shop-8", src: "/assets/project1/Screenshot 2025-11-27 154445.png", alt: "Single page store — footer and navigation" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "Fake products, add-to-cart flow, cart and checkout section, and a clean one-page responsive layout with navbar and footer.",
          ar: "منتجات تجريبية، إضافة للسلة مع عرض سلة الشراء وقسم الدفع، وتخطيط صفحة واحدة متجاوب مع شريط تنقّل وتذييل بسيطين.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Showcasing a compact Arabic shopping flow with product listing, cart, and checkout in a single scrollable page.",
          ar: "عرض تجربة تسوّق عربية مضغوطة تجمع عرض المنتجات والسلة والدفع في صفحة واحدة قابلة للتمرير.",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "Front-end design and implementation using pure HTML, CSS, and JavaScript.",
          ar: "تصميم الواجهة وتنفيذها بالكامل باستخدام HTML وCSS وJavaScript فقط.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Users needed a quick single-page store experience in Arabic where product browsing, cart, and checkout feel immediate without multi-page complexity.",
        ar: "كان الهدف تقديم متجر صفحة واحدة بالعربية يختصر رحلة الشراء: تصفح المنتجات ثم السلة ثم الدفع بدون تعقيد صفحات كثيرة.",
      },
      solution: {
        en: "Built a single scrolling layout that keeps product grid, cart, and checkout in one flow, with clear CTA and predictable UI states.",
        ar: "تم بناء تخطيط تمرير واحد يدمج شبكة المنتجات والسلة والدفع في مسار واضح مع أزرار وإشعارات حالة بسيطة وسهلة الفهم.",
      },
      outcome: {
        en: "A clean demo for single-page store UX that proves layout, cart interactions, and checkout clarity on desktop and mobile.",
        ar: "نتيجة المشروع نموذج عملي لمتجر صفحة واحدة يثبت وضوح الواجهة وتفاعل السلة وسهولة الوصول لخطوة الدفع على الموبايل والديسكتوب.",
      },
      role: {
        en: "UI build + vanilla JS cart logic + responsive layout.",
        ar: "تنفيذ الواجهة + منطق السلة بـ JavaScript + تصميم متجاوب.",
      },
      stack: {
        en: "HTML • CSS • JavaScript",
        ar: "HTML • CSS • JavaScript",
      },
      steps: {
        en: [
          "Define the single-page shopping flow",
          "Design product cards and cart UI states",
          "Implement add-to-cart and quantity updates",
          "Build checkout section and validation hints",
          "Test responsiveness and basic accessibility",
        ],
        ar: [
          "تحديد مسار الشراء في صفحة واحدة",
          "تصميم بطاقات المنتجات وحالات السلة",
          "تنفيذ الإضافة للسلة وتعديل الكميات",
          "إنشاء قسم الدفع وتلميحات التحقق",
          "اختبار التوافق مع الموبايل وإمكانية الوصول",
        ],
      },
      faqs: [
        {
          q: { en: "Is this a full e-commerce backend?", ar: "هل هذا متجر كامل بباك إند؟" },
          a: { en: "No. It is a front-end single page store demo focused on UX and cart/checkout behavior.", ar: "لا. هو نموذج واجهة يركز على تجربة المستخدم وتفاعل السلة والدفع." },
        },
        {
          q: { en: "Can it be converted to a real store?", ar: "هل يمكن تحويله لمتجر حقيقي؟" },
          a: { en: "Yes. The UI flow can be reused and connected to APIs, payments, and an admin dashboard.", ar: "نعم. يمكن إعادة استخدام نفس التدفق وربطه بـ API وبوابات الدفع ولوحة تحكم." },
        },
        {
          q: { en: "Does it support Arabic RTL?", ar: "هل يدعم العربية وRTL؟" },
          a: { en: "Yes. The layout is built with Arabic-first direction and spacing.", ar: "نعم. التخطيط مبني ليكون مناسبًا للعربية واتجاه RTL." },
        },
      ],
    },
  },

  /**
   * 02 – Real Estate UI
   */
  {
    id: "real-estate-ui",
    universe: 2,
    slug: "project-2",
    focusKeyword: { en: "real estate UI", ar: "واجهة عقارات" },
    seoTitle: { en: "Real Estate UI: Arabic RTL Case Study", ar: "واجهة عقارات: دراسة حالة RTL" },
    seoDescription: {
      en: "Real estate UI with advanced filters, property pages, and map. Arabic RTL, dark mode, and responsive UX.",
      ar: "واجهة عقارات بفلاتر متقدمة وصفحات تفاصيل وخريطة. دعم RTL، وضع داكن، وتجربة متجاوبة.",
    },
    name: { en: "Real Estate UI", ar: "Real Estate UI" },
    tagline: {
      en: "Arabic RTL real estate interface with advanced filters, dark mode, map, and detailed property pages.",
      ar: "واجهة عقارات عربية باتجاه RTL مع فلاتر متقدمة، وضع داكن، خريطة تفاعلية وصفحات تفاصيل كاملة للعقار.",
    },
    description: {
      en: [
        "Real Estate UI is a modern React + Vite front-end for browsing properties.",
        "It includes a full Arabic RTL layout, advanced filtering by price, area, rooms, property type, and city, text search in titles and locations, a dedicated property details page with image carousel and interactive map built with React Leaflet, plus a dark-mode theme and fully responsive layout.",
      ].join(" "),
      ar: [
        "Real Estate UI هو واجهة حديثة مبنية بـ React وVite لاستعراض العقارات.",
        "يوفّر تخطيطًا عربيًا كاملًا (RTL)، وفلاتر متقدمة حسب السعر والمساحة وعدد الغرف ونوع العقار والمدينة مع بحث نصي في العناوين والمواقع، وصفحة مخصّصة لتفاصيل العقار تضم معرض صور وخريطة تفاعلية مبنية بـ React Leaflet، بالإضافة إلى وضع داكن وتخطيط متجاوب بالكامل.",
      ].join(" "),
    },
    techStack: ["React", "Vite", "Tailwind CSS", "React Router", "React Leaflet", "Swiper"],
    tags: ["real-estate", "map", "frontend", "ui", "rtl"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/real-estate-ui",
    liveUrl: "https://mohamed-el-hussainy-gitme.github.io/real-estate-ui/",
    screens: [
      { id: "real-estate-1", src: "/assets/project2/Screenshot 2025-12-01 003246.png", alt: "Real estate UI — hero and filters panel (Arabic RTL)" },
      { id: "real-estate-2", src: "/assets/project2/Screenshot 2025-12-01 003410.png", alt: "Real estate UI — filtered properties grid" },
      { id: "real-estate-3", src: "/assets/project2/Screenshot 2025-12-01 003526.png", alt: "Real estate UI — property details page" },
      { id: "real-estate-4", src: "/assets/project2/Screenshot 2025-12-01 003635.png", alt: "Real estate UI — property details layout and gallery" },
      { id: "real-estate-5", src: "/assets/project2/Screenshot 2025-12-01 003653.png", alt: "Real estate UI — property map section (React Leaflet)" },
      { id: "real-estate-6", src: "/assets/project2/Screenshot 2025-12-01 003738.png", alt: "Real estate UI — dark mode view" },
      { id: "real-estate-7", src: "/assets/project2/Screenshot 2025-12-01 003810.png", alt: "Real estate UI — ordering / request section" },
      { id: "real-estate-8", src: "/assets/project2/Screenshot 2025-12-01 003825.png", alt: "Real estate UI — dark mode details" },
      { id: "real-estate-9", src: "/assets/project2/Screenshot 2025-12-01 003846.png", alt: "Real estate UI — dark mode details with map" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "Hero landing, advanced filters, Arabic RTL layout, property cards grid, details page with gallery, interactive map, and dark mode toggle.",
          ar: "واجهة رئيسية مع قسم Hero، فلاتر متقدمة، تخطيط عربي RTL كامل، شبكة بطاقات للعقارات، صفحة تفاصيل مع معرض صور، خريطة تفاعلية، وزر للتبديل إلى الوضع الداكن.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Make searching and comparing properties fast through filters, search, and map navigation.",
          ar: "جعل البحث عن العقارات ومقارنتها أسرع عبر الفلاتر والبحث النصي والتصفح من خلال الخريطة التفاعلية.",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "Front-end architecture, UI/UX design, RTL layout, and dark-mode implementation.",
          ar: "هندسة الواجهة الأمامية، تصميم واجهة وتجربة المستخدم، ضبط RTL، وتنفيذ نمط الوضع الداكن.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Property browsing becomes slow when filters and map context are separate. Users needed faster comparison with RTL-first Arabic UI.",
        ar: "تصفح العقارات يصبح بطيئًا عندما تكون الفلاتر والخريطة منفصلين. كان المطلوب مقارنة أسرع بواجهة عربية RTL صحيحة.",
      },
      solution: {
        en: "Built an RTL-first search experience: advanced filters + text search + dedicated details page with gallery and live map context.",
        ar: "تم بناء تجربة بحث RTL: فلاتر متقدمة + بحث نصي + صفحة تفاصيل بمعرض صور وخريطة تفاعلية تعطي سياقًا فوريًا للموقع.",
      },
      outcome: {
        en: "A real estate UI that makes discovery and comparison faster, with clear details and map-based trust signals.",
        ar: "واجهة عقارات تسهّل الاكتشاف والمقارنة بسرعة، مع تفاصيل واضحة وخريطة تدعم قرار المستخدم.",
      },
      role: {
        en: "UI architecture, RTL, filters state, and map integration.",
        ar: "هندسة الواجهة، RTL، إدارة حالة الفلاتر، ودمج الخريطة.",
      },
      stack: {
        en: "React • Tailwind • React Router • Leaflet",
        ar: "React • Tailwind • React Router • Leaflet",
      },
      steps: {
        en: [
          "Define filter taxonomy (price/area/rooms/type/city)",
          "Design RTL layout and responsive cards",
          "Build filter state + search behavior",
          "Implement details page + gallery",
          "Integrate map and coordinates display",
          "Add dark mode and polish interactions",
        ],
        ar: [
          "تحديد تصنيف الفلاتر (سعر/مساحة/غرف/نوع/مدينة)",
          "تصميم تخطيط RTL وبطاقات متجاوبة",
          "تنفيذ حالة الفلاتر والبحث النصي",
          "إنشاء صفحة التفاصيل ومعرض الصور",
          "دمج الخريطة وإظهار الإحداثيات",
          "إضافة الوضع الداكن وتحسين التفاعلات",
        ],
      },
      faqs: [
        {
          q: { en: "Is the map interactive?", ar: "هل الخريطة تفاعلية؟" },
          a: { en: "Yes. It uses React Leaflet with real markers and location context.", ar: "نعم. تم استخدام React Leaflet مع مؤشرات ومعلومات موقع." },
        },
        {
          q: { en: "Does it support Arabic RTL properly?", ar: "هل يدعم RTL للعربية بشكل صحيح؟" },
          a: { en: "Yes. Layout direction, spacing, and UI alignment are RTL-first.", ar: "نعم. الاتجاه والمسافات ومحاذاة العناصر تم ضبطها للعربية." },
        },
        {
          q: { en: "Can this UI connect to a backend?", ar: "هل يمكن ربط الواجهة بباك إند؟" },
          a: { en: "Yes. Filters and routes are ready to be connected to APIs.", ar: "نعم. الفلاتر والمسارات جاهزة للربط مع API." },
        },
      ],
    },
  },

  /**
   * 03 – Admin Dashboard – React + Vite
   */
  {
    id: "admin-dashboard",
    universe: 3,
    slug: "project-3",
    focusKeyword: { en: "admin dashboard", ar: "لوحة تحكم" },
    seoTitle: { en: "Admin Dashboard: Tables & Analytics Case Study", ar: "لوحة تحكم: دراسة حالة الجداول والتحليلات" },
    seoDescription: {
      en: "Admin dashboard with analytics, tables, routing, and themes. Clean UX, protected routes, and bilingual UI.",
      ar: "لوحة تحكم بتحليلات وجداول ومسارات وسمات. تجربة نظيفة، مسارات محمية، ودعم لغتين.",
    },
    name: { en: "Admin Control Dashboard", ar: "لوحة تحكم إدارية متكاملة" },
    tagline: {
      en: "Admin dashboard with analytics, users, orders, products, settings, notifications, and themes.",
      ar: "لوحة تحكم إدارية تضم التحليلات والمستخدمين والطلبات والمنتجات والإعدادات والتنبيهات والسمات.",
    },
    description: {
      en: [
        "A production-style admin dashboard built with React, Vite, Tailwind CSS, and Zustand.",
        "It includes a simple mock login flow, protected routes, responsive sidebar and topbar, analytics with Recharts, rich tables for users, orders, and products, plus notifications, themes, dark mode, and English/Arabic support.",
      ].join(" "),
      ar: [
        "لوحة تحكم إدارية احترافية مبنية بـ React وVite وTailwind CSS وZustand.",
        "توفّر تدفّق تسجيل دخول تجريبي، ومسارات محمية، وشريطًا جانبيًا ورأسيًا متجاوبين، وصفحات تحليلات بمخططات Recharts، وجداول متقدمة للمستخدمين والطلبات والمنتجات، إلى جانب نظام تنبيهات وسمات متعددة ووضع داكن ودعم للغتين العربية والإنجليزية.",
      ].join(" "),
    },
    techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Zustand", "React Router", "Recharts", "Framer Motion"],
    tags: ["dashboard", "admin", "ui", "frontend", "rtl"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/dashboard-admin",
    liveUrl: "https://mohamed-el-hussainy-gitme.github.io/dashboard-admin",
    screens: [
      { id: "admin-1", src: "/assets/project3/Screenshot 2025-12-02 190940.png", alt: "Admin dashboard — analytics overview" },
      { id: "admin-2", src: "/assets/project3/Screenshot 2025-12-02 191014.png", alt: "Admin dashboard — analytics sales view" },
      { id: "admin-3", src: "/assets/project3/Screenshot 2025-12-02 191048.png", alt: "Admin dashboard — users table" },
      { id: "admin-4", src: "/assets/project3/Screenshot 2025-12-02 191205.png", alt: "Admin dashboard — users sorting and filters" },
      { id: "admin-5", src: "/assets/project3/Screenshot 2025-12-02 191304.png", alt: "Admin dashboard — orders table sorting" },
      { id: "admin-6", src: "/assets/project3/Screenshot 2025-12-02 191353.png", alt: "Admin dashboard — products management table" },
      { id: "admin-7", src: "/assets/project3/Screenshot 2025-12-02 191426.png", alt: "Admin dashboard — notifications center" },
      { id: "admin-8", src: "/assets/project3/Screenshot 2025-12-02 191505.png", alt: "Admin dashboard — appearance settings" },
      { id: "admin-9", src: "/assets/project3/Screenshot 2025-12-02 191606.png", alt: "Admin dashboard — Arabic RTL settings" },
      { id: "admin-10", src: "/assets/project3/Screenshot 2025-12-02 191634.png", alt: "Admin dashboard — dark mode settings" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "Analytics, users, orders, products, settings, notifications, themes, dark mode, and a responsive dashboard layout.",
          ar: "صفحات تحليلات ولوحات بيانات، إدارة مستخدمين وطلبات ومنتجات، إعدادات وتنبيهات وسمات متعددة، ووضع داكن في تخطيط لوحة تحكم متجاوب.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Designing a clean admin UX with protected routes, flexible layout, and clear data presentation.",
          ar: "تصميم تجربة لوحة تحكم نظيفة مع مسارات محمية وتخطيط مرن وعرض واضح ومنظّم للبيانات.",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "Front-end engineering, state management with Zustand, chart integration, and UI system.",
          ar: "تطوير الواجهة الأمامية، وإدارة الحالة باستخدام Zustand، وربط المخططات، وبناء نظام مكوّنات الواجهة.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Dashboards fail when tables are inconsistent, filters reset, and navigation is unclear. Admin users needed predictable workflows.",
        ar: "لوحات التحكم تفشل عندما تكون الجداول غير ثابتة والفلاتر تُعاد دون سبب والتنقل غير واضح. كان المطلوب مسار إداري متوقع وسهل.",
      },
      solution: {
        en: "Built a structured admin dashboard: protected routes, consistent navigation, analytics, and rich tables with clear states (loading/empty/error).",
        ar: "تم بناء لوحة تحكم منظمة: مسارات محمية، تنقل ثابت، تحليلات، وجداول قوية مع حالات واضحة (تحميل/فارغ/خطأ).",
      },
      outcome: {
        en: "A production-style admin dashboard UI that feels stable, fast to use, and easy to scale for more modules.",
        ar: "نتيجة المشروع لوحة تحكم بطابع إنتاجي تبدو مستقرة وسريعة وسهلة التوسع لإضافة أقسام جديدة.",
      },
      role: {
        en: "Dashboard UI engineering + state design + table patterns.",
        ar: "هندسة واجهة لوحة التحكم + تصميم الحالة + أنماط الجداول.",
      },
      stack: {
        en: "React • TypeScript • Zustand • Recharts",
        ar: "React • TypeScript • Zustand • Recharts",
      },
      steps: {
        en: [
          "Design navigation and module layout",
          "Define protected routes and auth mock flow",
          "Build table components (sorting, pagination patterns)",
          "Add analytics charts and summary cards",
          "Implement themes + dark mode + RTL support",
          "Polish animations and responsiveness",
        ],
        ar: [
          "تصميم التنقل وهيكلة الأقسام",
          "تحديد المسارات المحمية وتدفق دخول تجريبي",
          "بناء مكونات الجداول (فرز/أنماط ترقيم)",
          "إضافة مخططات التحليلات وبطاقات الملخص",
          "تنفيذ السمات والوضع الداكن ودعم RTL",
          "تحسين الحركة والاستجابة للموبايل",
        ],
      },
      faqs: [
        {
          q: { en: "Does it include real authentication?", ar: "هل يوجد تسجيل دخول حقيقي؟" },
          a: { en: "It includes a mock flow and protected routes pattern. It can be connected to a real auth system.", ar: "يوجد تدفق تجريبي ونمط مسارات محمية ويمكن ربطه بمصادقة حقيقية." },
        },
        {
          q: { en: "Are tables reusable?", ar: "هل الجداول قابلة لإعادة الاستخدام؟" },
          a: { en: "Yes. The UI follows reusable table patterns and consistent states.", ar: "نعم. تم بناء أنماط جداول قابلة لإعادة الاستخدام مع حالات ثابتة." },
        },
        {
          q: { en: "Can it become a real admin for a store?", ar: "هل تصلح كلوحة لمتجر؟" },
          a: { en: "Yes. Modules like orders/products/users are already structured for a store admin.", ar: "نعم. أقسام الطلبات والمنتجات والمستخدمين منظمة لتناسب لوحة متجر." },
        },
      ],
    },
  },

  /**
   * 04 – Animation Studio
   */
  {
    id: "animation-studio",
    universe: 4,
    slug: "project-4",
    focusKeyword: { en: "web animation", ar: "تصميم حركات" },
    seoTitle: { en: "Web Animation Editor: Animation Studio Case Study", ar: "تصميم حركات: دراسة حالة Animation Studio" },
    seoDescription: {
      en: "Web animation editor with timeline and export. Generate CSS keyframes and React motion code from a visual UI.",
      ar: "محرر حركات بخط زمني وتصدير. إنشاء CSS keyframes وكود React للحركة من واجهة بصرية.",
    },
    name: { en: "Animation Studio", ar: "Animation Studio – محرر حركات للويب" },
    tagline: {
      en: "Web-based animation editor with timeline, layers, live preview, and export to CSS, HTML, JSON, and React.",
      ar: "محرر حركات على الويب بخط زمني وطبقات ومعاينة حيّة وتصدير إلى CSS وHTML وJSON وReact.",
    },
    description: {
      en: [
        "Animation Studio is a lightweight front-end animation editor that runs entirely in the browser.",
        "It gives you a mini timeline, layers panel, and live preview so you can design motion visually, then export clean CSS keyframes, HTML structure, JSON config, or a React component using Framer Motion, with undo/redo and localStorage-powered project saving.",
      ].join(" "),
      ar: [
        "Animation Studio هو محرر حركات خفيف يعمل بالكامل داخل المتصفّح.",
        "يوفّر خطًا زمنيًا مصغّرًا ولوحة طبقات ومعاينة مباشرة لتصميم الحركة بصريًا، مع تصدير كود CSS جاهز أو هيكل HTML أو إعدادات JSON أو مكوّن React يعتمد على Framer Motion، بالإضافة إلى دعم التراجع/الإعادة وحفظ المشاريع في المتصفح عبر localStorage.",
      ].join(" "),
    },
    techStack: ["HTML", "CSS", "TypeScript", "Framer Motion"],
    tags: ["animation", "motion", "frontend", "ui"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/animation-studio",
    liveUrl: "https://mohamed-el-hussainy-gitme.github.io/animation-studio/",
    screens: [
      { id: "animation-1", src: "/assets/project4/Screenshot 2025-12-01 222924.png", alt: "Web animation editor — timeline and layers panel" },
      { id: "animation-2", src: "/assets/project4/Screenshot 2025-12-01 223329.png", alt: "Web animation editor — live preview and controls" },
      { id: "animation-3", src: "/assets/project4/Screenshot 2025-12-01 223707.png", alt: "Web animation editor — export panel for CSS/HTML/JSON" },
      { id: "animation-4", src: "/assets/project4/Screenshot 2025-12-01 223957.png", alt: "Web animation editor — exported React motion code" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "Timeline, layers panel, live preview, undo/redo, device presets, and export to CSS, HTML, JSON, and React.",
          ar: "خط زمني ولوحة طبقات ومعاينة حيّة، مع تراجع وتقدّم، وخيارات أجهزة مختلفة، وتصدير إلى CSS وHTML وJSON وReact.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Make motion design approachable for front-end developers through a browser-based editor with clean exports.",
          ar: "تبسيط تصميم الحركات لمطوّري الواجهة الأمامية عبر محرر يعمل داخل المتصفح ويصدر كودًا نظيفًا.",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "Product idea, editor UX, animation engine, and export pipeline.",
          ar: "ابتكار الفكرة، UX للمحرر، منطق الحركة، ونظام التصدير.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Developers often waste time rewriting animation prototypes into production code. They need web animation tools that export clean code.",
        ar: "المطورون يضيعون وقتًا في تحويل نماذج الحركة إلى كود إنتاجي. كان المطلوب أداة تصميم حركات تصدر كودًا نظيفًا.",
      },
      solution: {
        en: "Created a browser-based web animation editor with timeline, layers, preview, and export to CSS keyframes and React motion components.",
        ar: "تم إنشاء محرر حركات يعمل داخل المتصفح مع خط زمني وطبقات ومعاينة وتصدير إلى CSS keyframes ومكوّنات React للحركة.",
      },
      outcome: {
        en: "A practical motion workflow: design visually, preview instantly, and export code ready to paste into real projects.",
        ar: "سير عمل عملي: تصميم بصري ثم معاينة فورية ثم تصدير كود قابل للاستخدام مباشرة داخل مشاريع حقيقية.",
      },
      role: {
        en: "Editor UX + animation logic + export formats.",
        ar: "UX للمحرر + منطق الحركة + صيغ التصدير.",
      },
      stack: {
        en: "TypeScript • Framer Motion • CSS keyframes",
        ar: "TypeScript • Framer Motion • CSS keyframes",
      },
      steps: {
        en: [
          "Define timeline model and layers structure",
          "Build preview renderer and playback controls",
          "Add undo/redo and local saving",
          "Design export pipeline (CSS/HTML/JSON/React)",
          "Polish UI states and responsive layout",
        ],
        ar: [
          "تحديد نموذج الخط الزمني وبنية الطبقات",
          "بناء المعاينة والتحكم في التشغيل",
          "إضافة التراجع/الإعادة والحفظ المحلي",
          "تصميم نظام التصدير (CSS/HTML/JSON/React)",
          "تحسين حالات الواجهة والتوافق مع الموبايل",
        ],
      },
      faqs: [
        {
          q: { en: "Does it export production-ready code?", ar: "هل التصدير مناسب للإنتاج؟" },
          a: { en: "It exports clean templates you can paste and adapt. The goal is reducing rewrite time.", ar: "يصدر قوالب نظيفة قابلة للصق والتعديل بهدف تقليل وقت إعادة الكتابة." },
        },
        {
          q: { en: "Why both CSS and React exports?", ar: "لماذا تصدير CSS وReact معًا؟" },
          a: { en: "Some projects need pure CSS; others use React motion. The tool supports both workflows.", ar: "بعض المشاريع تحتاج CSS فقط والبعض يستخدم React motion لذلك دعمنا المسارين." },
        },
        {
          q: { en: "Can designs be saved and resumed?", ar: "هل يمكن حفظ المشروع واستكماله لاحقًا؟" },
          a: { en: "Yes. Projects are saved locally and can be resumed quickly.", ar: "نعم. يتم حفظ المشاريع محليًا ويمكن استكمالها بسهولة." },
        },
      ],
    },
  },

  /**
   * 05 – HoloSpace OS
   */
  {
    id: "holospace-os",
    universe: 5,
    slug: "project-5",
    focusKeyword: { en: "3D web experience", ar: "تجربة ثلاثية الأبعاد" },
    seoTitle: { en: "3D Web Experience: HoloSpace OS Case Study", ar: "تجربة ثلاثية الأبعاد: دراسة حالة HoloSpace" },
    seoDescription: {
      en: "3D web desktop with apps, themes, and motion. WebGL-style UI with window manager and interactive modules.",
      ar: "سطح مكتب ثلاثي الأبعاد مع تطبيقات وسمات وحركة. واجهة WebGL بمدير نوافذ وتفاعل متقدم.",
    },
    name: { en: "HoloSpace OS", ar: "HoloSpace OS – نظام تشغيل ويب ثلاثي الأبعاد" },
    tagline: {
      en: "3D web operating system with desktop, windows, music player, gallery, notes, and system settings.",
      ar: "نظام تشغيل ويب ثلاثي الأبعاد مع سطح مكتب ونوافذ وتطبيقات مدمجة مثل مشغّل الموسيقى ومعرض الصور والملاحظات والإعدادات.",
    },
    description: {
      en: [
        "HoloSpace OS is a 3D spatial web operating system built with React, Vite, TypeScript, TailwindCSS, React Three Fiber, and Framer Motion.",
        "It simulates a futuristic desktop with glassmorphism UI, animated dock, launcher, command palette, notifications panel, and multiple apps such as Music, Gallery, Notes, and Settings with theme, profile, and club-mode visual/audio effects.",
      ].join(" "),
      ar: [
        "HoloSpace OS هو نظام تشغيل ويب ثلاثي الأبعاد مبني بـ React وVite وTypeScript وTailwindCSS وReact Three Fiber وFramer Motion.",
        "يقدّم سطح مكتب مستقبليًا بتصميم زجاجي، وشريط تطبيقات متحرك، وقائمة إطلاق، ولوحة أوامر، ولوحة تنبيهات، وتطبيقات مدمجة مثل مشغّل الموسيقى ومعرض الصور والملاحظات والإعدادات مع تحكم في السمات والملفات الشخصية وتأثيرات بصرية وصوتية مخصّصة لوضع Club Mode.",
      ].join(" "),
    },
    techStack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "React Three Fiber",
      "@react-three/drei",
      "Framer Motion",
      "HTML5 Audio",
    ],
    tags: ["3d", "webgl", "frontend", "ui", "motion"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/holospace-web",
    liveUrl: "https://mohamed-el-hussainy-gitme.github.io/holospace-web/",
    screens: [
      { id: "holospace-1", src: "/assets/project5/Screenshot 2025-12-06 235132.png", alt: "3D web desktop — main workspace" },
      { id: "holospace-2", src: "/assets/project5/Screenshot 2025-12-06 235225.png", alt: "3D web desktop — music player and visualizer" },
      { id: "holospace-3", src: "/assets/project5/Screenshot 2025-12-06 235303.png", alt: "3D web desktop — gallery and windows manager" },
      { id: "holospace-4", src: "/assets/project5/Screenshot 2025-12-06 235404.png", alt: "3D web desktop — themes and UI variations" },
      { id: "holospace-5", src: "/assets/project5/Screenshot 2025-12-06 235639.png", alt: "3D web desktop — notes app" },
      { id: "holospace-6", src: "/assets/project5/Screenshot 2025-12-06 235756.png", alt: "3D web desktop — settings appearance" },
      { id: "holospace-7", src: "/assets/project5/Screenshot 2025-12-06 235829.png", alt: "3D web desktop — quality settings" },
      { id: "holospace-8", src: "/assets/project5/Screenshot 2025-12-06 235902.png", alt: "3D web desktop — motion and FX settings" },
      { id: "holospace-9", src: "/assets/project5/screenshot 1.png", alt: "3D web desktop — mobile music player" },
      { id: "holospace-10", src: "/assets/project5/screenshot 2.png", alt: "3D web desktop — mobile home screen" },
      { id: "holospace-11", src: "/assets/project5/screenshot 3.png", alt: "3D web desktop — mobile theme view" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "3D desktop, glassmorphism UI, animated dock and launcher, window manager, notifications panel, and multiple built-in apps.",
          ar: "سطح مكتب ثلاثي الأبعاد، واجهة زجاجية، شريط تطبيقات وقائمة إطلاق متحركة، مدير نوافذ، لوحة تنبيهات، وتطبيقات مدمجة متعددة.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Exploring spatial OS concepts in the browser using WebGL, motion, and system-level theming and profiles.",
          ar: "استكشاف فكرة أنظمة التشغيل المكانية داخل المتصفّح باستخدام WebGL والحركة ونظام سمات وملفات شخصية على مستوى النظام.",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "System design, 3D scene composition, UI design, and front-end implementation.",
          ar: "تصميم النظام، وبناء المشهد الثلاثي الأبعاد، وتصميم الواجهة، وتنفيذ الواجهة الأمامية.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Building a 3D web experience often becomes a performance problem or a UI chaos. The goal was a usable 3D desktop that still feels like a real product.",
        ar: "تجارب الويب ثلاثية الأبعاد غالبًا تتحول لمشكلة أداء أو فوضى واجهة. الهدف كان بناء تجربة ثلاثية الأبعاد قابلة للاستخدام وتشبه منتجًا حقيقيًا.",
      },
      solution: {
        en: "Designed a 3D web desktop with clear UI layers: window manager, dock, launcher, and apps with theming and motion that does not overwhelm.",
        ar: "تم تصميم سطح مكتب ثلاثي الأبعاد بطبقات واجهة واضحة: مدير نوافذ وشريط تطبيقات وقائمة تشغيل وتطبيقات مع سمات وحركة محسوبة بدون إزعاج.",
      },
      outcome: {
        en: "A demo OS that proves interaction patterns (windows, apps, settings) inside a 3D web experience with responsive behavior.",
        ar: "نتيجة المشروع نظام تجريبي يثبت أنماط التفاعل (نوافذ/تطبيقات/إعدادات) داخل تجربة ثلاثية الأبعاد مع دعم الموبايل.",
      },
      role: {
        en: "3D scene + UI layering + motion + app modules.",
        ar: "المشهد ثلاثي الأبعاد + طبقات الواجهة + الحركة + بناء التطبيقات.",
      },
      stack: {
        en: "React Three Fiber • TypeScript • Framer Motion",
        ar: "React Three Fiber • TypeScript • Framer Motion",
      },
      steps: {
        en: [
          "Define desktop interaction model (windows, focus, z-index)",
          "Build 3D scene + camera behaviors",
          "Implement window manager and launcher",
          "Add apps (music, gallery, notes, settings)",
          "Create theming and profiles system",
          "Tune performance and FX settings",
        ],
        ar: [
          "تحديد نموذج التفاعل (نوافذ/تركيز/ترتيب الطبقات)",
          "بناء المشهد والكاميرا",
          "تنفيذ مدير النوافذ وقائمة التشغيل",
          "إضافة تطبيقات (موسيقى/معرض/ملاحظات/إعدادات)",
          "إنشاء نظام السمات والملفات الشخصية",
          "ضبط الأداء وإعدادات المؤثرات",
        ],
      },
      faqs: [
        {
          q: { en: "Is this built with WebGL?", ar: "هل المشروع مبني بـ WebGL؟" },
          a: { en: "Yes, through React Three Fiber with interactive UI layered on top.", ar: "نعم عبر React Three Fiber مع واجهة فوق المشهد." },
        },
        {
          q: { en: "Does it work on mobile?", ar: "هل يعمل على الموبايل؟" },
          a: { en: "Yes. Core modules have responsive views and mobile-friendly interaction.", ar: "نعم. توجد واجهات مناسبة للموبايل وتفاعل مبسط." },
        },
        {
          q: { en: "Can it be turned into a product?", ar: "هل يمكن تحويله لمنتج؟" },
          a: { en: "Yes. The architecture supports adding apps and improving performance progressively.", ar: "نعم. المعمارية تسمح بإضافة تطبيقات وتحسين الأداء تدريجيًا." },
        },
      ],
    },
  },

  /**
   * 06 – PulseReach Media (Website)
   */
  {
    id: "pulsereach-media",
    universe: 6,
    slug: "project-6",
    focusKeyword: { en: "WordPress website", ar: "موقع ووردبريس" },
    seoTitle: { en: "WordPress Website: PulseReach Media Case Study", ar: "موقع ووردبريس: دراسة حالة PulseReach" },
    seoDescription: {
      en: "WordPress website with bilingual landing pages and conversion sections. RTL-first Arabic, pricing, FAQs, and CTAs.",
      ar: "موقع ووردبريس بصفحات بيع ثنائية اللغة. RTL للعربية، باقات، FAQ، وCTA واضح للتحويل.",
    },
    name: {
      en: "PulseReach Media Website",
      ar: "PulseReach Media – موقع وكالة سوشيال ميديا (صفحات بيع باقات)",
    },
    tagline: {
      en: "Conversion-focused bilingual landing pages for social media management packages (WordPress + coded templates).",
      ar: "صفحات بيع باقات سوشيال ميديا ثنائية اللغة مع قوالب مبرمجة تركّز على التحويل داخل ووردبريس.",
    },
    description: {
      en: [
        "PulseReach Media is a bilingual (AR/EN) marketing agency website built on WordPress using Astra Child Theme and custom coded page templates.",
        "The project focuses on clean, modern UI, strong conversion sections (hero, social proof, pricing, FAQs, CTAs), RTL-first Arabic layout, and scalable template-based pages for Services, Packages, Results, and Contact with WPForms integration.",
      ].join(" "),
      ar: [
        "PulseReach Media هو موقع ثنائي اللغة (عربي/إنجليزي) لوكالة تسويق وسوشيال ميديا مبني على WordPress باستخدام Astra Child Theme وقوالب صفحات مبرمجة (Coded Templates).",
        "يركّز المشروع على واجهة حديثة وتجربة تحويل قوية عبر أقسام الهيرو، إثبات اجتماعي، الباقات والأسعار، الأسئلة الشائعة، وCTA واضح، مع دعم RTL للعربية وقابلية التوسع لصفحات الخدمات والباقات والنتائج والتواصل ودمج WPForms.",
      ].join(" "),
    },
    techStack: ["WordPress", "PHP", "Astra (Child Theme)", "HTML5", "CSS (Design System Variables)", "WPForms", "Rank Math SEO"],
    tags: ["wordpress", "landing", "seo", "technical-seo", "schema", "rtl"],
    repoUrl: "",
    liveUrl: "https://pulsereachmedia.wuaze.com/",
    screens: [
      { id: "pulsereach-1", src: "/assets/project6/1.png", alt: "WordPress website — Arabic hero and conversion layout" },
      { id: "pulsereach-2", src: "/assets/project6/2.png", alt: "WordPress website — pricing and packages section" },
      { id: "pulsereach-3", src: "/assets/project6/3.png", alt: "WordPress website — services landing section" },
      { id: "pulsereach-4", src: "/assets/project6/4.png", alt: "WordPress website — results/case studies page" },
      { id: "pulsereach-5", src: "/assets/project6/5.png", alt: "WordPress website — contact page with form CTA" },
      { id: "pulsereach-6", src: "/assets/project6/6.png", alt: "WordPress website — responsive navigation on mobile" },
      { id: "pulsereach-7", src: "/assets/project6/7.png", alt: "WordPress website — mobile layout view" },
      { id: "pulsereach-8", src: "/assets/project6/8.png", alt: "WordPress website — mobile pricing view" },
      { id: "pulsereach-9", src: "/assets/project6/9.png", alt: "WordPress website — mobile FAQ and CTA blocks" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "Bilingual AR/EN, RTL-first layout, coded templates for 8 pages, pricing and conversion sections, reusable design system, and fast iteration inside WordPress.",
          ar: "ثنائي اللغة عربي/إنجليزي، دعم RTL بشكل صحيح، قوالب مبرمجة لعدة صفحات (حتى 8 صفحات)، أقسام تحويل قوية (باقات/CTA/FAQ)، نظام تصميم CSS قابل لإعادة الاستخدام، وسهولة تطوير وتعديل داخل ووردبريس.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "High-conversion landing structure, clean responsive UI, SEO-ready pages, and scalable template-driven architecture for services and packages.",
          ar: "هيكلة Landing Pages عالية التحويل، تصميم Responsive نظيف، جاهزية SEO، وبنية Templates قابلة للتوسع لصفحات الخدمات والباقات.",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "UI structure, custom template coding (PHP), design system CSS, content architecture, and basic SEO setup.",
          ar: "بناء الهيكلة والواجهات، برمجة قوالب الصفحات (PHP)، تصميم نظام CSS، تنظيم المحتوى وأقسام التحويل، وتجهيز أساسيات SEO.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Agency websites fail when packages are unclear and CTAs are weak. The goal was a WordPress website built for conversion in AR/EN.",
        ar: "مواقع الوكالات تفشل عندما تكون الباقات غير واضحة وCTA ضعيف. كان المطلوب موقع ووردبريس مصمم للتحويل بالعربية والإنجليزية.",
      },
      solution: {
        en: "Implemented conversion-first landing templates: hero + proof + pricing + FAQ + CTA, with RTL-first Arabic and scalable template structure.",
        ar: "تم تنفيذ قوالب صفحات بيع: هيرو + إثبات اجتماعي + باقات + FAQ + CTA، مع RTL للعربية وبنية Templates قابلة للتوسع.",
      },
      outcome: {
        en: "A clearer sales structure that guides visitors to choose a package and contact through a single primary CTA.",
        ar: "بنية بيع أوضح تقود الزائر لاختيار باقة والتواصل عبر CTA أساسي واحد بدل تشتت الأزرار.",
      },
      role: {
        en: "Template coding + UI structure + SEO basics.",
        ar: "برمجة Templates + هيكلة الواجهة + أساسيات SEO.",
      },
      stack: {
        en: "WordPress • PHP templates • RankMath SEO",
        ar: "WordPress • قوالب PHP • RankMath SEO",
      },
      steps: {
        en: [
          "Define conversion sections and package layout",
          "Implement RTL-first templates and reusable blocks",
          "Integrate forms and trackable CTAs",
          "Optimize SEO titles/descriptions and schema",
          "Test responsiveness and page speed basics",
        ],
        ar: [
          "تحديد أقسام التحويل وبنية الباقات",
          "تنفيذ Templates للعربية وBlocks قابلة لإعادة الاستخدام",
          "دمج النماذج وCTA قابلة للقياس",
          "تهيئة SEO (عناوين/وصف/سكيما)",
          "اختبار الاستجابة وأساسيات السرعة",
        ],
      },
      faqs: [
        {
          q: { en: "Why WordPress for this project?", ar: "لماذا ووردبريس؟" },
          a: { en: "It enables fast iteration for content and packages while keeping templates consistent and SEO-friendly.", ar: "يسمح بتعديل المحتوى والباقات بسرعة مع الحفاظ على قوالب ثابتة وداعمة لـ SEO." },
        },
        {
          q: { en: "Is Arabic RTL handled correctly?", ar: "هل RTL مضبوط؟" },
          a: { en: "Yes. The layout is RTL-first with appropriate spacing and alignment.", ar: "نعم. تم ضبط الاتجاه والمسافات والمحاذاة للعربية." },
        },
        {
          q: { en: "Can more landing pages be added?", ar: "هل يمكن إضافة صفحات بيع جديدة؟" },
          a: { en: "Yes. Template-driven structure makes it easy to add more pages consistently.", ar: "نعم. بنية القوالب تجعل إضافة صفحات جديدة سهلة وبنفس الجودة." },
        },
      ],
    },
  },

  /**
   * 07 – Arab Tourism Platform (Website)
   */
  {
    id: "arab-tourism-platform",
    universe: 7,
    slug: "project-7",
    focusKeyword: { en: "tourism website", ar: "موقع سياحي" },
    seoTitle: { en: "Tourism Website: Arab Tourism Platform Case Study", ar: "موقع سياحي: دراسة حالة منصة السياحة" },
    seoDescription: {
      en: "Tourism website with interactive SVG map and static export. Country pages, landmark pages, and fast browsing.",
      ar: "موقع سياحي بخريطة SVG تفاعلية وتصدير Static. صفحات دول ومعالم وتصفح سريع.",
    },
    name: {
      en: "Arab Tourism Platform",
      ar: "Arab Tourism Platform – منصة المعالم السياحية العربية",
    },
    tagline: {
      en: "Arabic-first static tourism directory with an interactive SVG map, country theming, and rich landmark pages (Next.js Export).",
      ar: "دليل سياحي عربي أولًا بصفحات دول ومعالم + خريطة SVG تفاعلية + ثيمات لكل دولة، جاهز للتصدير كـ Static (Next.js Export).",
    },
    description: {
      en: [
        "Arab Tourism Platform is a modern Arabic-first tourism directory built with Next.js (App Router), React, and Tailwind CSS.",
        "It provides a country → landmarks browsing flow, an interactive SVG map of the Arab world (d3-geo + topojson + world-atlas), and detailed landmark pages including long narrative text, sources, coordinates, and image-search suggestions.",
        "The project is fully static-export ready (outputs an /out folder) and can be deployed to shared hosting like InfinityFree with no backend—data is shipped locally as JSON/CSV and generated into static pages.",
      ].join(" "),
      ar: [
        "Arab Tourism Platform هي منصة دليل سياحي عربية أولًا مبنية باستخدام Next.js (App Router) وReact وTailwind CSS.",
        "توفر تجربة تصفح دولة → معالم، وخريطة SVG تفاعلية للوطن العربي (d3-geo + topojson-client + world-atlas)، وصفحات معالم غنية تحتوي على سرد عربي طويل، مصادر، إحداثيات، واقتراحات بحث عن الصور.",
        "المشروع مُجهّز للتصدير كـ Static بالكامل (ينتج مجلد /out) ويمكن رفعه على استضافات Shared مثل InfinityFree بدون أي Backend، حيث يتم الاعتماد على بيانات محلية JSON/CSV تُحوّل إلى صفحات ثابتة.",
      ].join(" "),
    },
    techStack: [
      "Next.js (App Router)",
      "React",
      "Tailwind CSS",
      "Static Export (output: 'export')",
      "d3-geo",
      "topojson-client",
      "world-atlas",
      "Local JSON/CSV Dataset",
    ],
    tags: ["tourism", "map", "frontend", "seo"],
    repoUrl: "",
    liveUrl: "https://arabesque.lovestoblog.com/",
    screens: [
      { id: "arab-tourism-1", src: "/assets/project7/1.png", alt: "Tourism website — home with SVG map and countries directory" },
      { id: "arab-tourism-2", src: "/assets/project7/2.png", alt: "Tourism website — SVG map interactive states" },
      { id: "arab-tourism-3", src: "/assets/project7/3.png", alt: "Tourism website — country page with themed header and cards" },
      { id: "arab-tourism-4", src: "/assets/project7/4.png", alt: "Tourism website — landmark details page with long narrative" },
      { id: "arab-tourism-5", src: "/assets/project7/5.png", alt: "Tourism website — sources, coordinates, and image search suggestions" },
      { id: "arab-tourism-6", src: "/assets/project7/6.png", alt: "Tourism website — search results for landmarks" },
      { id: "arab-tourism-7", src: "/assets/project7/7.png", alt: "Tourism website — mobile responsive map layout" },
      { id: "arab-tourism-8", src: "/assets/project7/8.png", alt: "Tourism website — country theming via CSS variables" },
      { id: "arab-tourism-9", src: "/assets/project7/Screenshot_2025-12-28-22-08-38-245_com.android.chrome.jpg", alt: "Tourism website — mobile country details view" },
      { id: "arab-tourism-10", src: "/assets/project7/Screenshot_2025-12-28-22-07-12-883_com.android.chrome[1].jpg", alt: "Tourism website — mobile landmark page view" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "Arabic-first UI, country → landmarks directory, interactive SVG map (d3-geo/topojson), per-country theming via CSS variables, and rich landmark pages (narrative + sources + coordinates). Fully static export to /out for shared hosting.",
          ar: "واجهة عربية أولًا، دليل دول → معالم، خريطة SVG تفاعلية (d3-geo/topojson)، ثيم لكل دولة عبر CSS Variables، وصفحات معالم غنية (سرد + مصادر + إحداثيات). تصدير Static كامل إلى /out لرفع المشروع على استضافات Shared.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Performance-friendly static architecture, clean responsive UI, scalable dataset-driven pages, and map usability on mobile (hover/focus/tap).",
          ar: "بنية Static سريعة وخفيفة، واجهة Responsive نظيفة، صفحات قابلة للتوسع بالاعتماد على Dataset محلي، وتحسين تجربة الخريطة على الموبايل (tap/hover/focus).",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "UI/UX implementation, components system, static routing, SVG map integration, theming system, and data utilities for JSON/CSV.",
          ar: "تنفيذ الواجهات وتجربة المستخدم، بناء نظام مكوّنات، إعداد صفحات Static، دمج خريطة SVG، بناء نظام الثيمات، وتجهيز أدوات بيانات JSON/CSV.",
        },
      },
      {
        id: "deployment",
        label: { en: "Deployment", ar: "النشر والاستضافة" },
        body: {
          en: "Static export-ready producing /out for uploading via FTP to shared hosting.",
          ar: "جاهز للتصدير كـ Static مع مجلد /out للرفع عبر FTP على الاستضافات المشتركة.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Tourism directories become heavy when they rely on backend queries for every page. The project needed a fast tourism website that works on shared hosting.",
        ar: "مواقع الأدلة السياحية تصبح ثقيلة عندما تعتمد على باك إند لكل صفحة. كان المطلوب موقع سياحي سريع يعمل على استضافات Shared بدون باك إند.",
      },
      solution: {
        en: "Built a static-export architecture: dataset-driven pages (countries/landmarks) + interactive SVG map + long landmark pages with sources and coordinates.",
        ar: "تم بناء بنية Static Export: صفحات تولَّد من Dataset (دول/معالم) + خريطة SVG تفاعلية + صفحات معالم غنية بسرد ومصادر وإحداثيات.",
      },
      outcome: {
        en: "Fast browsing, easy deployment on shared hosting, and scalable content structure for adding more landmarks without backend complexity.",
        ar: "تصفح سريع ونشر سهل على الاستضافات المشتركة وبنية قابلة للتوسع لإضافة معالم جديدة بدون تعقيد باك إند.",
      },
      role: {
        en: "UI/UX + static routing + map integration + dataset utilities.",
        ar: "UI/UX + مسارات Static + دمج الخريطة + أدوات البيانات.",
      },
      stack: {
        en: "Next.js export • d3-geo • topojson • Tailwind",
        ar: "Next.js export • d3-geo • topojson • Tailwind",
      },
      steps: {
        en: [
          "Design country → landmark browsing flow",
          "Build interactive SVG map and theming",
          "Create static pages from JSON/CSV dataset",
          "Write long landmark page structure (facts/sources)",
          "Prepare static export and hosting-ready output",
        ],
        ar: [
          "تصميم تدفق دولة → معالم",
          "بناء خريطة SVG تفاعلية ونظام ثيمات",
          "توليد صفحات ثابتة من JSON/CSV",
          "إنشاء بنية صفحة المعلم (حقائق/مصادر)",
          "تجهيز التصدير والنشر على الاستضافة",
        ],
      },
      faqs: [
        {
          q: { en: "Why static export?", ar: "لماذا Static Export؟" },
          a: { en: "It removes backend cost and keeps pages fast on shared hosting.", ar: "لأنه يلغي تكلفة الباك إند ويجعل الصفحات سريعة على الاستضافات المشتركة." },
        },
        {
          q: { en: "Is the map usable on mobile?", ar: "هل الخريطة مناسبة للموبايل؟" },
          a: { en: "Yes. Interaction is designed for tap and focus, not hover-only.", ar: "نعم. تم ضبط التفاعل للمس والضغط وليس hover فقط." },
        },
        {
          q: { en: "Can new landmarks be added easily?", ar: "هل إضافة معالم جديدة سهلة؟" },
          a: { en: "Yes. Add data entries and rebuild; pages are generated automatically.", ar: "نعم. بإضافة البيانات ثم إعادة البناء يتم توليد الصفحات تلقائيًا." },
        },
      ],
    },
  },

  /**
   * 08 – Rose E-commerce
   */
  {
    id: "E-ecommerce",
    universe: 8,
    slug: "E-ecommerce-website-development",
    focusKeyword: { en: "e-commerce website", ar: "متجر إلكتروني" },
    seoTitle: { en: "E-commerce Website: NODA Store Case Study", ar: "متجر إلكتروني: دراسة حالة مشروع NODA" },
    seoDescription: {
      en: "E-commerce website + admin dashboard + database. Clean UX, fast flows, and SEO-ready structure for real sales.",
      ar: "متجر إلكتروني + لوحة تحكم + قاعدة بيانات. تجربة شراء واضحة، إدارة أسرع، وبنية جاهزة لـ SEO لتحقيق مبيعات.",
    },
    name: { en: "NODA E-commerce Website Development", ar: "تطوير متجر NODA الإلكتروني" },
    tagline: {
      en: "Full store + admin dashboard + database for operational speed.",
      ar: "متجر كامل + لوحة تحكم + قاعدة بيانات لتسريع الإدارة والبيع.",
    },
    description: {
      en: "A full e-commerce build that includes a customer-facing storefront, an admin dashboard for products/orders, and a structured database layer. The goal was to reduce friction in the buying flow while keeping daily operations simple for the business team.",
      ar: "مشروع متجر إلكتروني متكامل يشمل واجهة العميل، لوحة تحكم لإدارة المنتجات والطلبات، وقاعدة بيانات منظمة. الهدف كان تقليل الاحتكاك في رحلة الشراء مع الحفاظ على إدارة يومية سهلة وسريعة لفريق العمل.",
    },
    liveUrl: "https://e-commerce-website.42web.io/",
    repoUrl: "",
    techStack: ["E-commerce", "Admin Dashboard", "Database"],
    tags: ["ecommerce", "admin", "database", "seo"],
    screens: [
      { id: "E-commerce-01", src: "/assets/E-commerce/1.png", alt: "E-commerce website — NODA store UI 01" },
      { id: "E-commerce-02", src: "/assets/E-commerce/2.png", alt: "E-commerce website — NODA store UI 02" },
      { id: "E-commerce-03", src: "/assets/E-commerce/3.png", alt: "E-commerce website — NODA store UI 03" },
      { id: "E-commerce-04", src: "/assets/E-commerce/4.png", alt: "E-commerce website — NODA store UI 04" },
      { id: "E-commerce-05", src: "/assets/E-commerce/5.png", alt: "E-commerce website — NODA store UI 05" },
      { id: "E-commerce-06", src: "/assets/E-commerce/6.png", alt: "E-commerce website — NODA store UI 06" },
      { id: "E-commerce-07", src: "/assets/E-commerce/7.png", alt: "E-commerce website — NODA store UI 07" },
      { id: "E-commerce-08", src: "/assets/E-commerce/8.png", alt: "E-commerce website — NODA store UI 08" },
      { id: "E-commerce-09", src: "/assets/E-commerce/9.png", alt: "E-commerce website — NODA store UI 09" },
      { id: "E-commerce-10", src: "/assets/E-commerce/10.png", alt: "E-commerce website — NODA store UI 10" },
      { id: "E-commerce-11", src: "/assets/E-commerce/11.png", alt: "E-commerce website — NODA store UI 11" },
      { id: "E-commerce-12", src: "/assets/E-commerce/12.png", alt: "E-commerce website — NODA store UI 12" },
      { id: "E-commerce-13", src: "/assets/E-commerce/13.png", alt: "E-commerce website — NODA store UI 13" },
      { id: "E-commerce-14", src: "/assets/E-commerce/14.png", alt: "E-commerce website — NODA store UI 14" },
      { id: "E-commerce-15", src: "/assets/E-commerce/15.png", alt: "E-commerce website — NODA store UI 15" },
      { id: "E-commerce-16", src: "/assets/E-commerce/16.png", alt: "E-commerce website — NODA store UI 16" },
      { id: "E-commerce-17", src: "/assets/E-commerce/17.png", alt: "E-commerce website — NODA store UI 17" },
      { id: "E-commerce-18", src: "/assets/E-commerce/18.png", alt: "E-commerce website — NODA store UI 18" },
      { id: "E-commerce-19", src: "/assets/E-commerce/19.png", alt: "E-commerce website — NODA store UI 19" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "Storefront + admin dashboard + database. Clear navigation, fast checkout flows, and SEO-ready structure for categories and products.",
          ar: "واجهة متجر + لوحة تحكم + قاعدة بيانات. تصفح واضح، تدفق شراء سريع، وبنية جاهزة لـ SEO للمنتجات والتصنيفات.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Conversion-first UX for buyers, and admin experience that keeps operations simple.",
          ar: "تجربة شراء تدفع للتحويل، ولوحة تحكم تجعل الإدارة اليومية أبسط.",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "Full implementation across UI, dashboard flows, and data structure, with attention to mobile usability and SEO-friendly hierarchy.",
          ar: "تنفيذ شامل للواجهة وتجربة لوحة التحكم وبنية البيانات، مع عناية بالموبايل وبنية صفحات تدعم SEO.",
        },
      },
      {
        id: "deployment",
        label: { en: "Deployment", ar: "النشر والاستضافة" },
        body: {
          en: "Prepared for production hosting with a structure that supports future SEO landing pages.",
          ar: "مجهز للنشر مع هيكل واضح للتوسع لاحقًا وإضافة صفحات SEO إضافية.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "The business needed an e-commerce website that sells smoothly and an admin dashboard that saves time daily. Operations and sales had to scale.",
        ar: "كان المطلوب متجر إلكتروني يبيع بسلاسة مع لوحة تحكم توفر وقت الإدارة اليومي. الهدف هو تشغيل أسهل ونمو في المبيعات.",
      },
      solution: {
        en: "Built a full e-commerce website: storefront + admin dashboard + database with a clear product structure and an efficient workflow for orders and inventory.",
        ar: "تم بناء متجر إلكتروني كامل: واجهة متجر + لوحة تحكم + قاعدة بيانات مع تنظيم المنتجات وسير عمل فعال لإدارة الطلبات والمخزون.",
      },
      outcome: {
        en: "A clearer buying journey, faster admin operations, and a structure that supports SEO pages (categories/products) for long-term traffic.",
        ar: "رحلة شراء أوضح، إدارة أسرع، وبنية تدعم صفحات SEO (تصنيفات/منتجات) لزيارات طويلة المدى.",
      },
      role: {
        en: "End-to-end build: UX, storefront, dashboard flow, and data structure.",
        ar: "تنفيذ كامل: UX، واجهة المتجر، تدفق لوحة التحكم، وبنية البيانات.",
      },
      stack: {
        en: "Storefront • Admin Dashboard • Database",
        ar: "واجهة متجر • لوحة تحكم • قاعدة بيانات",
      },
      steps: {
        en: [
          "Map the checkout flow and key pages",
          "Build product/category structure and UI",
          "Implement admin workflow for products and orders",
          "Organize database and data rules",
          "Optimize mobile UX and performance basics",
          "Prepare SEO-ready hierarchy and internal linking",
        ],
        ar: [
          "تحديد مسار الشراء والصفحات الأساسية",
          "تنظيم التصنيفات والمنتجات وبناء الواجهة",
          "تنفيذ لوحة التحكم لإدارة المنتجات والطلبات",
          "تنظيم قاعدة البيانات وقواعد البيانات",
          "تحسين تجربة الموبايل وأساسيات الأداء",
          "تهيئة بنية SEO وروابط داخلية قوية",
        ],
      },
      faqs: [
        {
          q: { en: "Is it a full store with admin?", ar: "هل هو متجر كامل مع لوحة تحكم؟" },
          a: { en: "Yes. Storefront, admin dashboard, and database layer are included.", ar: "نعم. يوجد واجهة متجر ولوحة تحكم وقاعدة بيانات." },
        },
        {
          q: { en: "Can it support payments and shipping?", ar: "هل يدعم الدفع والشحن؟" },
          a: { en: "Yes, depending on providers. The structure supports adding integrations.", ar: "نعم حسب مزودي الخدمة. الهيكل يدعم إضافة التكاملات." },
        },
        {
          q: { en: "Does it help SEO?", ar: "هل يدعم SEO؟" },
          a: { en: "Yes. The hierarchy supports category and product pages with internal links.", ar: "نعم. البنية تدعم صفحات التصنيفات والمنتجات مع روابط داخلية." },
        },
      ],
    },
  },

  /**
   * 09 – GrowLik (SEO Only)
   */
  {
    id: "growlik",
    universe: 9,
    slug: "growlik",
    focusKeyword: { en: "SEO optimization", ar: "تحسين SEO" },
    seoTitle: { en: "SEO Optimization: GrowLik Case Study", ar: "تحسين SEO: دراسة حالة GrowLik" },
    seoDescription: {
      en: "Technical SEO improvements: titles, descriptions, headings, schema, and internal links for clearer snippets and ranking.",
      ar: "تحسين SEO تقني: عناوين ووصف وهيدنجز وسكيما وروابط داخلية لتحسين الترتيب والمقتطفات.",
    },
    name: { en: "GrowLik SEO Optimization", ar: "تحسين SEO لموقع GrowLik" },
    tagline: {
      en: "Technical SEO improvements for higher visibility and better snippets.",
      ar: "تحسينات SEO تقنية لرفع الظهور وتحسين المقتطفات في نتائج البحث.",
    },
    description: {
      en: "A focused SEO engagement: audit + fixes for titles, descriptions, heading structure, internal linking, and schema to improve Google visibility.",
      ar: "تعاون SEO مركز: تدقيق ثم إصلاحات للعناوين والوصف وبنية الهيدنجز والروابط الداخلية والسكيما لتحسين الظهور في Google.",
    },
    liveUrl: "",
    repoUrl: "",
    techStack: ["SEO", "Technical SEO", "Schema"],
    tags: ["seo", "technical-seo", "schema"],
    screens: [
      { id: "growlik-01", src: "/assets/growlik/01.png", alt: "SEO optimization — GrowLik page structure 01" },
      { id: "growlik-02", src: "/assets/growlik/02.png", alt: "SEO optimization — GrowLik metadata and headings 02" },
      { id: "growlik-03", src: "/assets/growlik/03.png", alt: "SEO optimization — GrowLik internal linking 03" },
      { id: "growlik-04", src: "/assets/growlik/04.png", alt: "SEO optimization — GrowLik schema and snippet clarity 04" },
    ],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key points", ar: "أبرز النقاط" },
        body: {
          en: "SEO audit + fixes: titles, meta descriptions, heading hierarchy, and structured data for clearer search snippets.",
          ar: "تدقيق SEO ثم إصلاحات: العناوين والوصف وبنية الهيدنجز وإضافة سكيما لرفع جودة المقتطفات في البحث.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Search visibility improvements with cleaner metadata and content structure (Google + AI search).",
          ar: "تحسين الظهور في البحث عبر ميتاداتا أوضح وبنية محتوى أنظف (Google + البحث بالذكاء الاصطناعي).",
        },
      },
      {
        id: "role",
        label: { en: "My role", ar: "الدور" },
        body: {
          en: "Technical SEO implementation: metadata, headings, internal links, schema markup, and basic performance checks.",
          ar: "تنفيذ SEO تقني: ميتاداتا، هيدنجز، روابط داخلية، سكيما، ومراجعة أساسيات الأداء.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "The site needed SEO optimization without redesign: weak titles, unclear headings, and missing schema reduced visibility and snippet quality.",
        ar: "الموقع كان يحتاج تحسين SEO بدون إعادة تصميم: عناوين ضعيفة وهيدنجز غير واضح وسكيما غير موجودة مما يضعف الظهور والمقتطفات.",
      },
      solution: {
        en: "Applied technical SEO: rewrite titles/descriptions, fix H1/H2, strengthen internal links, add schema, and improve image alt context.",
        ar: "تم تطبيق SEO تقني: إعادة كتابة title/description، ضبط H1/H2، تقوية الروابط الداخلية، إضافة سكيما، وتحسين alt للصور بسياق واضح.",
      },
      outcome: {
        en: "Cleaner indexing signals, clearer snippets, and a structure ready for scaling content with consistent metadata rules.",
        ar: "إشارات فهرسة أوضح، مقتطفات أفضل، وبنية جاهزة للتوسع في المحتوى مع قواعد ميتاداتا ثابتة.",
      },
      role: {
        en: "Audit + metadata rewrite + schema + linking plan.",
        ar: "تدقيق + إعادة كتابة الميتاداتا + سكيما + خطة روابط داخلية.",
      },
      stack: {
        en: "Metadata • Headings • Schema • Internal Links",
        ar: "ميتا • هيدنجز • سكيما • روابط داخلية",
      },
      steps: {
        en: ["Audit priority pages", "Rewrite title/description", "Fix heading hierarchy", "Add schema markup", "Improve alt text", "Strengthen internal links"],
        ar: ["مراجعة الصفحات الأهم", "إعادة كتابة العنوان والوصف", "ضبط الهيدنجز", "إضافة السكيما", "تحسين alt", "تقوية الروابط الداخلية"],
      },
      faqs: [
        {
          q: { en: "Was any UI redesigned?", ar: "هل تم تغيير التصميم؟" },
          a: { en: "No. The work focused on SEO structure, metadata, schema, and internal linking only.", ar: "لا. العمل كان على بنية SEO والميتا والسكيما والروابط الداخلية فقط." },
        },
        {
          q: { en: "Can the same SEO approach be applied to services pages?", ar: "هل يمكن تطبيق نفس الأسلوب على الخدمات؟" },
          a: { en: "Yes. Services pages benefit from focused keywords, FAQs, and schema with internal linking.", ar: "نعم. صفحات الخدمات تستفيد جدًا من كلمات مفتاحية وFAQ وسكيما وروابط داخلية." },
        },
        {
          q: { en: "Does alt text really matter?", ar: "هل alt مهم فعلًا؟" },
          a: { en: "Yes. It improves accessibility and provides image context for search engines.", ar: "نعم. يدعم الوصول ويعطي سياقًا لمحركات البحث." },
        },
      ],
    },
  },
  // ─── Project 10 — Ahwa Café OS ──────────────────────────────
  {
    id: "ahwa-cafe-os",
    universe: 10,
    slug: "ahwa-cafe-os",
    name: {
      en: "Ahwa — Café Operating System",
      ar: "أهوه — نظام تشغيل المقهى",
    },
    tagline: {
      en: "Multi-tenant SaaS for café operations: shifts, orders, inventory, billing, and real-time staff presence.",
      ar: "SaaS متعدد المستأجرين لإدارة المقاهي: الشيفتات والطلبات والمخزون والفوترة وحضور الموظفين.",
    },
    description: {
      en: "Ahwa is a full-stack café operating system built with Next.js 16 and Supabase. It uses a strict three-database topology — one control-plane database routing tenant traffic to two dedicated operational shards — covering 80+ Supabase migrations, real-time shift management, role-based access (owner, branch manager, supervisor, barista, shisha), PWA push notifications, archive pipelines with approval flows, and a billing layer.",
      ar: "أهوه هو نظام تشغيل كامل للمقاهي مبني بـ Next.js 16 وSupabase. يعتمد بنية ثلاث قواعد بيانات: قاعدة تحكم مركزية توجه حركة المستأجرين إلى شاردين تشغيليين. يغطي 80+ migration، وإدارة شيفت حية، وصلاحيات متدرجة، وإشعارات PWA، وخطوط أرشفة مع موافقات.",
    },
    focusKeyword: { en: "café management system", ar: "نظام إدارة مقهى" },
    seoTitle: {
      en: "Ahwa Café OS: Multi-Tenant SaaS Case Study",
      ar: "أهوه: دراسة حالة SaaS متعدد المستأجرين",
    },
    seoDescription: {
      en: "Real-time café operating system with shift management, role-based access, billing, and a three-database multi-tenant architecture.",
      ar: "نظام تشغيل مقاهي بالوقت الحقيقي يشمل إدارة الشيفتات وصلاحيات متدرجة وفوترة وبنية SaaS متعددة المستأجرين.",
    },
    techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS 4", "Zustand", "Zod", "Redis", "web-push"],
    tags: ["saas", "fullstack", "multi-tenant", "realtime", "backend", "postgresql"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/ahwa",
    screens: [],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key Points", ar: "أبرز النقاط" },
        body: {
          en: "Three-database multi-tenant topology, 80+ Supabase migrations, role-based RLS, real-time shift management, PWA push, archive approval flow, and a platform super-admin portal.",
          ar: "بنية SaaS ثلاثية قواعد البيانات، 80+ migration في Supabase، صلاحيات RLS متدرجة، إدارة شيفت بالوقت الحقيقي، إشعارات PWA، خط أرشفة مع موافقات، وبوابة سوبر أدمن.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Building a production-grade multi-tenant SaaS with strict database isolation, ordered migration chains, and a real-time operational layer.",
          ar: "بناء SaaS متعدد المستأجرين بمعايير الإنتاج مع عزل صارم لقواعد البيانات وسلاسل migration مرتبة وطبقة تشغيلية بالوقت الحقيقي.",
        },
      },
      {
        id: "role",
        label: { en: "Role", ar: "الدور" },
        body: {
          en: "Full-stack architecture, database design (80+ migrations), RLS policy authoring, real-time presence, PWA push, billing layer, and deployment.",
          ar: "معمارية full-stack، تصميم قاعدة البيانات (80+ migration)، صياغة سياسات RLS، الحضور الحي، إشعارات PWA، طبقة الفوترة، والنشر.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Café owners struggled with paper-based shift logs, no real-time visibility into staff presence, manual billing reconciliation, and no way for a platform operator to manage multiple café tenants securely.",
        ar: "كان أصحاب المقاهي يعانون من سجلات الشيفت الورقية وغياب الرؤية الفورية لحضور الموظفين والتسوية اليدوية للفواتير.",
      },
      solution: {
        en: "Designed a strict three-database topology with explicit tenant routing, 80+ ordered migrations, and a role matrix enforced at the RLS layer.",
        ar: "صممت بنية ثلاث قواعد بيانات مع توجيه صريح للمستأجرين و80+ migration مرتبة ومصفوفة صلاحيات مطبّقة على مستوى RLS.",
      },
      outcome: {
        en: "A production-ready SaaS platform where each café runs in isolation, shift snapshots drive weekly/monthly/yearly reports, and archive approval flows protect historical data.",
        ar: "منصة SaaS جاهزة للإنتاج حيث يعمل كل مقهى باستقلالية تامة ولقطات الشيفت تغذي تقارير أسبوعية وشهرية وسنوية.",
      },
      role: {
        en: "Full-stack architecture, database design, RLS authoring, real-time presence, PWA push, billing, and deployment.",
        ar: "معمارية full-stack، تصميم قاعدة البيانات، صياغة RLS، الحضور الحي، إشعارات PWA، فوترة، ونشر.",
      },
      stack: {
        en: "Next.js 16 • React 19 • TypeScript • Supabase • Redis • Zustand • Zod • Tailwind CSS 4 • web-push",
        ar: "Next.js 16 • React 19 • TypeScript • Supabase • Redis • Zustand • Zod • Tailwind CSS 4 • web-push",
      },
      steps: {
        en: ["Design three-database topology and control-plane routing", "Author 80+ ordered migrations", "Implement role-based RLS matrix", "Build real-time shift management with atomic RPCs", "Add PWA push notifications", "Implement billing and archive approval flows", "Build platform super-admin portal"],
        ar: ["تصميم بنية ثلاث قواعد البيانات", "كتابة 80+ migration مرتبة", "تطبيق مصفوفة صلاحيات RLS", "بناء إدارة الشيفت بالوقت الحقيقي", "إضافة إشعارات PWA", "تطبيق تدفقات الفوترة والأرشفة", "بناء بوابة السوبر أدمن"],
      },
      faqs: [
        {
          q: { en: "How does multi-tenancy work?", ar: "كيف يعمل تعدد المستأجرين؟" },
          a: { en: "A control-plane database routes each request to the correct operational shard using app.current_cafe_id(). RLS policies enforce strict tenant isolation.", ar: "قاعدة بيانات control-plane توجه كل طلب إلى الشارد التشغيلي الصحيح. سياسات RLS تفرض العزل الصارم." },
        },
        {
          q: { en: "How are historical reports protected?", ar: "كيف تُحمى التقارير التاريخية؟" },
          a: { en: "The archive flow requires two approval secrets before deleting runtime detail, with post-archive verification.", ar: "تتطلب عملية الأرشفة سرين للموافقة قبل الحذف مع تحقق بعدي." },
        },
        {
          q: { en: "What roles does the system support?", ar: "ما الأدوار التي يدعمها النظام؟" },
          a: { en: "Owner, branch manager, supervisor, barista, shisha, and platform super-admin — each with distinct RLS policies.", ar: "مالك، مدير فرع، مشرف، باريستا، معلم شيشة، وسوبر أدمن — لكل منهم سياسات RLS مستقلة." },
        },
      ],
    },
  },

  // ─── Project 11 — Arab Anglais ──────────────────────────────
  {
    id: "arab-anglais-portfolio",
    universe: 11,
    slug: "arab-anglais-portfolio",
    name: {
      en: "Arab Anglais — Bilingual Agency Portfolio",
      ar: "Arab Anglais — بورتفوليو وكالة ثنائي اللغة",
    },
    tagline: {
      en: "Full-stack bilingual agency site (AR/EN) with a headless CMS admin panel and drag-and-drop works gallery.",
      ar: "موقع وكالة ثنائي اللغة بنظام إدارة محتوى headless ومعرض أعمال بالسحب والإفلات.",
    },
    description: {
      en: "Arab Anglais is a production bilingual agency portfolio built with React 18, Vite, Tailwind CSS, and Supabase. It features a full public-facing site and a password-protected admin panel covering services, portfolio works with drag-and-drop reordering, team members, page content, site settings, and contact messages.",
      ar: "Arab Anglais هو موقع وكالة ثنائي اللغة مبني بـ React 18 وVite وTailwind CSS وSupabase. يضم موقعاً عاماً كاملاً ولوحة إدارة محمية تتيح إدارة الخدمات والأعمال بالسحب والإفلات وأعضاء الفريق ومحتوى الصفحات.",
    },
    focusKeyword: { en: "bilingual agency portfolio", ar: "بورتفوليو وكالة ثنائي اللغة" },
    seoTitle: {
      en: "Arab Anglais: Bilingual Agency Portfolio Case Study",
      ar: "Arab Anglais: دراسة حالة بورتفوليو وكالة ثنائي اللغة",
    },
    seoDescription: {
      en: "Bilingual AR/EN agency portfolio with a headless CMS admin panel, Supabase backend, and drag-and-drop works management.",
      ar: "بورتفوليو وكالة ثنائي اللغة بلوحة إدارة CMS وباك إند Supabase وإدارة أعمال بالسحب والإفلات.",
    },
    techStack: ["React 18", "Vite", "Tailwind CSS", "Supabase", "React Router v6", "TanStack Query", "shadcn/ui", "@hello-pangea/dnd", "Sonner"],
    tags: ["portfolio", "bilingual", "cms", "fullstack", "frontend", "supabase"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/arab-anglais",
    screens: [],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key Points", ar: "أبرز النقاط" },
        body: {
          en: "Bilingual AR/EN content model, headless CMS admin panel, drag-and-drop works gallery, Supabase RLS, keep-alive strategy, and full CRUD for all agency content.",
          ar: "نموذج محتوى ثنائي اللغة، لوحة إدارة CMS، معرض أعمال بالسحب والإفلات، RLS في Supabase، واستراتيجية keep-alive.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Delivering a fully editable bilingual agency site where non-technical staff control all content through a clean admin panel.",
          ar: "تقديم موقع وكالة ثنائي اللغة قابل للتحرير بالكامل حيث يتحكم الموظفون غير التقنيين في كل المحتوى.",
        },
      },
      {
        id: "role",
        label: { en: "Role", ar: "الدور" },
        body: {
          en: "Full-stack design and implementation: schema, RLS, public site, and admin panel.",
          ar: "تصميم وتنفيذ full-stack: المخطط، RLS، الموقع العام، ولوحة الإدارة.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Agencies needed a bilingual online presence where non-technical staff could update works, services, and team members without developer intervention.",
        ar: "كانت الوكالات بحاجة إلى حضور رقمي ثنائي اللغة يمكّن الموظفين غير التقنيين من التحديث دون تدخل المطور.",
      },
      solution: {
        en: "Built a headless CMS using Supabase as the data layer and a React admin panel as the editor, with drag-and-drop reordering and a keep-alive strategy.",
        ar: "بنيت CMS بدون رأس باستخدام Supabase كطبقة بيانات ولوحة إدارة React كمحرر مع السحب والإفلات واستراتيجية keep-alive.",
      },
      outcome: {
        en: "A live bilingual agency site where the team manages all content from a single admin panel with instant public updates.",
        ar: "موقع وكالة ثنائي اللغة حي يدير فيه الفريق كل المحتوى من لوحة واحدة مع تحديثات فورية.",
      },
      role: {
        en: "Full-stack build: React SPA, Supabase schema, RLS policies, admin panel, drag-and-drop, and deployment.",
        ar: "بناء full-stack: React SPA، مخطط Supabase، سياسات RLS، لوحة الإدارة، السحب والإفلات، والنشر.",
      },
      stack: {
        en: "React 18 • Vite • Tailwind CSS • Supabase • React Router v6 • TanStack Query • shadcn/ui • @hello-pangea/dnd",
        ar: "React 18 • Vite • Tailwind CSS • Supabase • React Router v6 • TanStack Query • shadcn/ui • @hello-pangea/dnd",
      },
      steps: {
        en: ["Design bilingual Supabase schema", "Implement RLS for public-read / admin-write", "Build public site (Home, Services, Works, Team, About, Contact)", "Build admin panel with CRUD managers", "Add drag-and-drop reordering", "Implement keep-alive and data prefetching", "Deploy and configure Supabase storage"],
        ar: ["تصميم مخطط Supabase ثنائي اللغة", "تطبيق RLS للفصل بين القراءة العامة والكتابة الإدارية", "بناء الموقع العام", "بناء لوحة الإدارة مع مديري CRUD", "إضافة السحب والإفلات", "تطبيق keep-alive والجلب المسبق", "النشر وإعداد التخزين"],
      },
      faqs: [
        {
          q: { en: "How is bilingual content handled?", ar: "كيف يُعالج المحتوى ثنائي اللغة؟" },
          a: { en: "Each entity stores separate AR and EN fields. A LanguageContext hook switches the active locale across the entire site.", ar: "كل كيان يخزن حقولاً منفصلة للعربية والإنجليزية. خطاف LanguageContext يبدّل اللغة النشطة." },
        },
        {
          q: { en: "Can the admin reorder works?", ar: "هل يمكن للمدير إعادة ترتيب الأعمال؟" },
          a: { en: "Yes. The works gallery supports drag-and-drop reordering with the new order persisted to Supabase.", ar: "نعم. معرض الأعمال يدعم السحب والإفلات مع حفظ الترتيب في Supabase." },
        },
        {
          q: { en: "How is the free-tier cold start handled?", ar: "كيف تُعالج مشكلة Cold Start؟" },
          a: { en: "A keep-alive script pings Supabase at regular intervals to keep the connection warm.", ar: "سكريبت keep-alive يرسل ping على فترات منتظمة لإبقاء الاتصال دافئاً." },
        },
      ],
    },
  },

  // ─── Project 12 — BCC Commercial ────────────────────────────
  {
    id: "bcc-commercial",
    universe: 12,
    slug: "bcc-commercial",
    name: {
      en: "BCC Commercial — Luxury Gifts & Corporate Solutions",
      ar: "البنط التجارية — هدايا فاخرة وحلول مؤسسية",
    },
    tagline: {
      en: "Corporate website for a Saudi luxury-gifts company with animated galleries, a Supabase CMS, a blog, and dark/light mode.",
      ar: "موقع شركة سعودية للهدايا الفاخرة مع معارض متحركة وCMS بـ Supabase ومدونة ووضع داكن وفاتح.",
    },
    description: {
      en: "BCC Commercial is a full-stack corporate website for a Saudi luxury-gifts and office-furniture company, presenting eight service lines through animated service cards with multi-image carousels. A Supabase CMS admin panel lets the team manage services, works gallery, blog posts, banners, clients, and all page content.",
      ar: "البنط التجارية موقع شركة سعودية متكامل للهدايا الفاخرة والأثاث المكتبي. يقدم ثماني خطوط خدمة عبر بطاقات خدمة متحركة مع كاروسيلات صور. لوحة إدارة CMS مدعومة بـ Supabase تتيح إدارة كل المحتوى.",
    },
    focusKeyword: { en: "luxury gifts corporate website", ar: "موقع شركة هدايا فاخرة" },
    seoTitle: {
      en: "BCC Commercial: Luxury Gifts & Corporate Solutions Website",
      ar: "البنط التجارية: موقع الهدايا الفاخرة والحلول المؤسسية",
    },
    seoDescription: {
      en: "Animated corporate website for a Saudi luxury-gifts company with a Supabase CMS, service galleries, blog, and admin panel.",
      ar: "موقع شركة سعودية للهدايا الفاخرة مع Supabase CMS ومعارض خدمات ومدونة ولوحة إدارة.",
    },
    techStack: ["React 18", "Vite", "Tailwind CSS", "Supabase", "Framer Motion", "TanStack Query", "shadcn/ui", "react-helmet-async"],
    tags: ["corporate", "cms", "fullstack", "frontend", "animation", "supabase", "blog"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/bcc-commercial",
    screens: [],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key Points", ar: "أبرز النقاط" },
        body: {
          en: "Animated multi-image service galleries, Supabase CMS with full admin panel, SEO blog engine, lazy loading, dark/light mode, and code splitting.",
          ar: "معارض خدمات متحركة متعددة الصور، CMS بـ Supabase مع لوحة إدارة كاملة، محرك مدونة SEO، تحميل كسول، ووضع داكن/فاتح.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Presenting eight luxury service lines with rich animated galleries while keeping all content fully editable by non-technical staff.",
          ar: "عرض ثماني خطوط خدمة فاخرة بمعارض متحركة غنية مع إبقاء كل المحتوى قابلاً للتحرير.",
        },
      },
      {
        id: "role",
        label: { en: "Role", ar: "الدور" },
        body: {
          en: "Full-stack build: UI design, animation, CMS, blog engine, admin panel, and deployment.",
          ar: "بناء full-stack: تصميم الواجهة، الحركة، CMS، محرك المدونة، لوحة الإدارة، والنشر.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "A Saudi luxury-gifts company needed a professional online presence with rich photo galleries and the ability for non-technical staff to update all content independently.",
        ar: "شركة سعودية للهدايا الفاخرة بحاجة إلى حضور رقمي احترافي بمعارض صور غنية يتيح للموظفين التحديث باستقلالية.",
      },
      solution: {
        en: "Built an animated service showcase with multi-image carousels, a Supabase CMS, a structured blog, lazy-loaded images, and a full admin panel.",
        ar: "بنيت واجهة خدمات متحركة مع كاروسيلات صور، وCMS بـ Supabase، ومدونة منظمة، وصور بالتحميل الكسول، ولوحة إدارة كاملة.",
      },
      outcome: {
        en: "A fully editable corporate website presenting all service lines with animated galleries, giving the team complete content control.",
        ar: "موقع شركة قابل للتحرير بالكامل يعرض جميع خطوط الخدمة بمعارض متحركة.",
      },
      role: {
        en: "Full-stack build: React SPA, Supabase schema and storage, Framer Motion, blog engine, admin panel, and deployment.",
        ar: "بناء full-stack: React SPA، مخطط Supabase والتخزين، Framer Motion، محرك المدونة، لوحة الإدارة، والنشر.",
      },
      stack: {
        en: "React 18 • Vite • Tailwind CSS • Supabase • Framer Motion • TanStack Query • shadcn/ui • react-helmet-async",
        ar: "React 18 • Vite • Tailwind CSS • Supabase • Framer Motion • TanStack Query • shadcn/ui • react-helmet-async",
      },
      steps: {
        en: ["Design Supabase schema for services, works, blog, banners, clients", "Build animated hero and service cards with multi-image carousels", "Build blog engine with rich article sections", "Develop full admin panel", "Add lazy loading, code splitting, and keep-alive", "Implement dark/light mode"],
        ar: ["تصميم مخطط Supabase للخدمات والأعمال والمدونة", "بناء هيرو متحرك وبطاقات خدمة مع كاروسيلات", "بناء محرك المدونة", "تطوير لوحة الإدارة الكاملة", "إضافة التحميل الكسول وتقسيم الكود", "تطبيق الوضع الداكن/الفاتح"],
      },
      faqs: [
        {
          q: { en: "What services does the site showcase?", ar: "ما الخدمات التي يعرضها الموقع؟" },
          a: { en: "Eight service lines: promotional gifts, luxury custom gifts, golden/silver swords, events, corporate furniture, outdoor branding, photography, and screen printing.", ar: "ثماني خطوط: هدايا دعائية، هدايا فاخرة، سيوف وخناجر، فعاليات، أثاث، إعلانات خارجية، تصوير، وطباعة شاشة." },
        },
        {
          q: { en: "How is content managed?", ar: "كيف يُدار المحتوى؟" },
          a: { en: "All content is managed through a Supabase-backed admin panel with no code changes needed.", ar: "كل المحتوى يُدار عبر لوحة إدارة مدعومة بـ Supabase بدون تغييرات في الكود." },
        },
        {
          q: { en: "Is the site bilingual?", ar: "هل الموقع ثنائي اللغة؟" },
          a: { en: "The primary language is Arabic targeting a Saudi audience, with the admin panel supporting English.", ar: "اللغة الأساسية عربية للجمهور السعودي مع دعم الإنجليزية في لوحة الإدارة." },
        },
      ],
    },
  },

  // ─── Project 13 — Smart CRM ─────────────────────────────────
  {
    id: "smart-crm",
    universe: 13,
    slug: "smart-crm",
    name: {
      en: "Smart CRM — AI-Powered Sales Intelligence Platform",
      ar: "Smart CRM — منصة ذكاء مبيعات بالذكاء الاصطناعي",
    },
    tagline: {
      en: "Full-stack CRM with AI lead capture from Google Maps, 8-stage pipeline, deal management, and WhatsApp automation.",
      ar: "CRM متكامل باستخراج عملاء من خرائط جوجل بالذكاء الاصطناعي وخط اتصال ثماني مراحل وأتمتة واتساب.",
    },
    description: {
      en: "Smart CRM is a full-stack sales intelligence platform built as a TypeScript monorepo. The backend runs as a Cloudflare Worker with Supabase as the database. Key features: AI-powered acquisition from Google Maps URLs, an 8-stage contact pipeline, deal lifecycle management, automated follow-up scheduling, WhatsApp broadcast automation, payment tracking, and an intelligence engine that scores contacts by momentum and risk.",
      ar: "Smart CRM هو منصة ذكاء مبيعات متكاملة كـ TypeScript monorepo. الباك إند يعمل كـ Cloudflare Worker مع Supabase. الميزات: استخراج عملاء من روابط خرائط جوجل بالذكاء الاصطناعي، خط اتصال ثماني مراحل، إدارة دورة الصفقات، جدولة المتابعة التلقائية، بث واتساب، تتبع المدفوعات، ومحرك ذكاء يسجّل الزخم والمخاطر.",
    },
    focusKeyword: { en: "AI CRM sales platform", ar: "منصة CRM ذكاء مبيعات" },
    seoTitle: {
      en: "Smart CRM: AI-Powered Sales Intelligence Platform",
      ar: "Smart CRM: منصة ذكاء المبيعات بالذكاء الاصطناعي",
    },
    seoDescription: {
      en: "Full-stack TypeScript CRM with AI lead capture from Google Maps, 8-stage contact pipeline, deal management, and WhatsApp automation.",
      ar: "CRM TypeScript متكامل مع استخراج عملاء من خرائط جوجل، خط اتصال ثماني مراحل، إدارة صفقات، وأتمتة واتساب.",
    },
    techStack: ["TypeScript", "Next.js", "Cloudflare Workers", "Supabase", "PostgreSQL", "Zod", "React", "Tailwind CSS"],
    tags: ["crm", "saas", "fullstack", "ai", "backend", "typescript", "cloudflare"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/smart-crm",
    screens: [],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key Points", ar: "أبرز النقاط" },
        body: {
          en: "AI lead capture from Google Maps, 8-stage contact pipeline, 7-stage deal lifecycle, intelligence engine with momentum and risk scoring, WhatsApp automation, and Cloudflare Workers backend.",
          ar: "استخراج عملاء AI من خرائط جوجل، خط اتصال ثماني مراحل، دورة صفقات بـ 7 مراحل، محرك ذكاء بتسجيل زخم ومخاطر، وأتمتة واتساب.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Building an AI acquisition pipeline and intelligence engine that turns raw Google Maps data into scored, de-duplicated leads with automated follow-up workflows.",
          ar: "بناء خط استخراج AI ومحرك ذكاء يحوّل بيانات خرائط جوجل إلى عملاء محتملين مُسجَّلين وخالين من التكرار.",
        },
      },
      {
        id: "role",
        label: { en: "Role", ar: "الدور" },
        body: {
          en: "Full-stack TypeScript monorepo: Cloudflare Worker backend, AI pipeline, intelligence engine, Next.js frontend, and RBAC.",
          ar: "TypeScript monorepo متكامل: باك إند Cloudflare Worker، خط AI، محرك ذكاء، واجهة Next.js، وصلاحيات متدرجة.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Sales teams wasted hours manually entering leads from Google Maps, had no unified pipeline view, and lacked automated intelligence to prioritize follow-ups.",
        ar: "كانت فرق المبيعات تضيع ساعات في إدخال العملاء يدوياً من خرائط جوجل وتفتقر إلى رؤية موحدة وذكاء آلي لتحديد أولويات المتابعة.",
      },
      solution: {
        en: "Built an AI acquisition pipeline that parses Google Maps URLs to extract phones, normalize locations, detect duplicates, and score confidence. Layered an 8-stage contact pipeline, 7-stage deal lifecycle, and an intelligence engine computing momentum and risk.",
        ar: "بنيت خط استخراج AI يحلل روابط خرائط جوجل لاستخراج الهواتف وتطبيع المواقع وكشف المكررات وتسجيل الثقة. أضفت خط اتصال ثماني مراحل ودورة صفقات ومحرك ذكاء.",
      },
      outcome: {
        en: "Sales reps can drop a Google Maps URL and get a pre-filled, de-duplicated lead in seconds, with the intelligence dashboard surfacing hot leads and rescue lists.",
        ar: "مندوبو المبيعات يحصلون على عميل مُعبأ وخالٍ من التكرار في ثوانٍ، ولوحة الذكاء تعرض العملاء الساخنين وقوائم الإنقاذ.",
      },
      role: {
        en: "Full-stack: Cloudflare Workers backend, Supabase schema, AI pipeline, intelligence engine, Next.js frontend, and RBAC.",
        ar: "Full-stack: باك إند Cloudflare Workers، مخطط Supabase، خط AI، محرك ذكاء، واجهة Next.js، وصلاحيات.",
      },
      stack: {
        en: "TypeScript • Cloudflare Workers • Next.js • Supabase (PostgreSQL) • Zod • cookie-based sessions",
        ar: "TypeScript • Cloudflare Workers • Next.js • Supabase (PostgreSQL) • Zod • جلسات مبنية على الكوكيز",
      },
      steps: {
        en: ["Design TypeScript monorepo (shared, backend, web)", "Build Cloudflare Worker router with cookie session auth", "Implement AI acquisition pipeline (phone extraction, location normalization, duplicate detection)", "Build 8-stage contact pipeline and 7-stage deal lifecycle", "Build intelligence engine with momentum and risk scoring", "Add WhatsApp automation, payment tracking, and audit trail", "Build Next.js frontend with RBAC"],
        ar: ["تصميم TypeScript monorepo", "بناء Cloudflare Worker router مع مصادقة الجلسة", "تطبيق خط استخراج AI", "بناء خط الاتصال ودورة الصفقات", "بناء محرك الذكاء", "إضافة أتمتة واتساب وتتبع المدفوعات وسجل التدقيق", "بناء واجهة Next.js بـ RBAC"],
      },
      faqs: [
        {
          q: { en: "How does the AI lead capture work?", ar: "كيف يعمل استخراج العملاء بالذكاء الاصطناعي؟" },
          a: { en: "Paste a Google Maps URL. The pipeline extracts phones, normalizes location, detects duplicates, and assigns a confidence score (HIGH/MEDIUM/LOW).", ar: "الصق رابط خرائط جوجل. الخط يستخرج الهواتف ويطبّع الموقع ويكشف المكررات ويعيّن درجة ثقة." },
        },
        {
          q: { en: "What is the intelligence engine?", ar: "ما هو محرك الذكاء؟" },
          a: { en: "It analyses tasks, payments, deals, and last interaction to compute a momentum score (HOT/WARM/COLD) and risk level.", ar: "يحلل المهام والمدفوعات والصفقات وآخر تفاعل لحساب درجة زخم (ساخن/دافئ/بارد) ومستوى مخاطر." },
        },
        {
          q: { en: "Why Cloudflare Workers?", ar: "لماذا Cloudflare Workers؟" },
          a: { en: "Workers run at the edge with near-zero cold start, globally distributed, and scale automatically.", ar: "Workers تعمل على الحافة بدون Cold Start تقريباً، موزعة عالمياً وتتوسع تلقائياً." },
        },
      ],
    },
  },

  // ─── Project 14 — POS ERP ───────────────────────────────────
  {
    id: "pos-erp",
    universe: 14,
    slug: "pos-erp",
    name: {
      en: "POS ERP — Restaurant & Retail Management System",
      ar: "POS ERP — نظام إدارة المطاعم والمتاجر",
    },
    tagline: {
      en: "Full-stack POS and ERP covering sales, inventory, kitchen display, multi-branch, accounting, and analytics.",
      ar: "نظام POS وERP متكامل يشمل المبيعات والمخزون وشاشة المطبخ والفروع والمحاسبة والتحليلات.",
    },
    description: {
      en: "POS ERP is a comprehensive restaurant and retail management system built with React 18, Vite, and Supabase. The POS screen supports dine-in/takeaway/delivery, barcode scanning, multiple payment methods (cash, card, Apple Pay, STC Pay), and offline mode. Beyond POS: inventory tracking with stock movement logs, kitchen display, tables management, customer profiles, purchasing, multi-branch management, employee scheduling, accounting reconciliation, and a KPI dashboard with Recharts.",
      ar: "POS ERP هو نظام شامل للمطاعم والمتاجر مبني بـ React 18 وVite وSupabase. شاشة POS تدعم الطلبات (داين إن، تيك أواي، توصيل)، مسح الباركود، طرق دفع متعددة، ووضع أوفلاين. بالإضافة: تتبع مخزون، شاشة مطبخ، إدارة طاولات، ملفات عملاء، مشتريات، إدارة فروع متعددة، جداول موظفين، محاسبة، ولوحة KPI.",
    },
    focusKeyword: { en: "restaurant POS ERP system", ar: "نظام POS ERP للمطاعم" },
    seoTitle: {
      en: "POS ERP: Restaurant & Retail Management System Case Study",
      ar: "POS ERP: دراسة حالة نظام إدارة المطاعم والمتاجر",
    },
    seoDescription: {
      en: "Full-stack POS and ERP for restaurants with offline mode, barcode scanning, inventory, kitchen display, multi-branch, and analytics.",
      ar: "POS وERP متكامل للمطاعم مع وضع أوفلاين ومسح باركود ومخزون وشاشة مطبخ وفروع متعددة وتحليلات.",
    },
    techStack: ["React 18", "Vite", "Tailwind CSS", "Supabase", "TanStack Query", "Recharts", "shadcn/ui", "date-fns"],
    tags: ["pos", "erp", "fullstack", "dashboard", "offline", "restaurant", "supabase"],
    repoUrl: "https://github.com/Mohamed-El-Hussainy-gitme/pos-erp",
    screens: [],
    highlights: [
      {
        id: "keyPoints",
        label: { en: "Key Points", ar: "أبرز النقاط" },
        body: {
          en: "POS with offline mode and barcode scanning, inventory with adjustment logs, kitchen display, tables management, customer profiles, multi-branch management, employee scheduling, accounting reconciliation, and KPI dashboard.",
          ar: "POS مع وضع أوفلاين ومسح باركود، مخزون مع سجلات تعديل، شاشة مطبخ، إدارة طاولات، ملفات عملاء، فروع متعددة، جداول موظفين، محاسبة، ولوحة KPI.",
        },
      },
      {
        id: "focus",
        label: { en: "Focus", ar: "التركيز" },
        body: {
          en: "Building a complete operational loop from POS intake to accounting close, with offline resilience, multi-branch visibility, and real-time KPI analytics.",
          ar: "بناء حلقة تشغيل كاملة من استلام POS إلى الإغلاق المحاسبي مع مرونة أوفلاين ورؤية فروع متعددة وتحليلات KPI.",
        },
      },
      {
        id: "role",
        label: { en: "Role", ar: "الدور" },
        body: {
          en: "Full-stack build: React SPA, Supabase schema, offline mode, kitchen display, multi-branch, accounting, and analytics.",
          ar: "بناء full-stack: React SPA، مخطط Supabase، وضع أوفلاين، شاشة مطبخ، فروع متعددة، محاسبة، وتحليلات.",
        },
      },
    ],
    caseStudy: {
      problem: {
        en: "Restaurants needed a unified system for POS transactions (including offline), inventory tracking, kitchen order routing, employee management, and accounting reports — without multiple disconnected tools.",
        ar: "المطاعم بحاجة إلى نظام موحد لمعالجة POS (بما فيها الأوفلاين) وتتبع المخزون وتوجيه الطلبات وإدارة الموظفين والتقارير.",
      },
      solution: {
        en: "Built a unified React SPA covering the full operational loop: POS with offline fallback, inventory with adjustment logs, kitchen display, customer profiles, purchasing, multi-branch management, and accounting with KPI dashboard.",
        ar: "بنيت SPA موحدة بـ React تغطي الحلقة التشغيلية الكاملة: POS مع احتياطي أوفلاين، مخزون مع سجلات تعديل، شاشة مطبخ، ملفات عملاء، مشتريات، إدارة فروع، ومحاسبة مع لوحة KPI.",
      },
      outcome: {
        en: "A single system covering the entire lifecycle from order intake to accounting close, working offline when connectivity drops, with real-time KPI visibility across all branches.",
        ar: "نظام واحد يغطي دورة التشغيل الكاملة من استلام الطلب إلى الإغلاق المحاسبي، يعمل أوفلاين عند انقطاع الاتصال.",
      },
      role: {
        en: "Full-stack: React SPA, Supabase schema, offline mode, kitchen display, multi-branch, accounting, and analytics.",
        ar: "Full-stack: React SPA، مخطط Supabase، وضع أوفلاين، شاشة مطبخ، فروع، محاسبة، وتحليلات.",
      },
      stack: {
        en: "React 18 • Vite • Tailwind CSS • Supabase • TanStack Query • Recharts • shadcn/ui • date-fns • localStorage offline",
        ar: "React 18 • Vite • Tailwind CSS • Supabase • TanStack Query • Recharts • shadcn/ui • date-fns • تخزين محلي أوفلاين",
      },
      steps: {
        en: ["Design Supabase schema (products, orders, inventory, customers, employees, branches)", "Build POS with dine-in/takeaway/delivery, barcode scanning, and multi-payment", "Implement offline mode with localStorage fallback", "Build inventory manager with stock adjustment logs", "Implement kitchen display and tables management", "Add multi-branch management and employee scheduling", "Build accounting view and KPI dashboard with Recharts"],
        ar: ["تصميم مخطط Supabase", "بناء POS بأنواع الطلبات ومسح الباركود وطرق الدفع", "تطبيق وضع الأوفلاين", "بناء مدير المخزون", "تطبيق شاشة المطبخ وإدارة الطاولات", "إضافة إدارة الفروع وجداول الموظفين", "بناء المحاسبة ولوحة KPI"],
      },
      faqs: [
        {
          q: { en: "How does offline mode work?", ar: "كيف يعمل وضع الأوفلاين؟" },
          a: { en: "When connectivity drops, orders are saved to localStorage with a generated order number and synced to Supabase on reconnect.", ar: "عند انقطاع الاتصال تُحفظ الطلبات في localStorage وتُزامن مع Supabase عند إعادة الاتصال." },
        },
        {
          q: { en: "What payment methods are supported?", ar: "ما طرق الدفع المدعومة؟" },
          a: { en: "Cash, card, Apple Pay, and STC Pay — selectable per order on the POS screen.", ar: "نقداً، بطاقة، Apple Pay، وSTC Pay — قابلة للاختيار لكل طلب على شاشة POS." },
        },
        {
          q: { en: "Can it handle multiple branches?", ar: "هل يدعم فروع متعددة؟" },
          a: { en: "Yes. The multi-branch panel lets managers set up branches, assign employees, and view per-branch KPIs from a single interface.", ar: "نعم. لوحة الفروع تتيح إعداد الفروع وتعيين الموظفين وعرض KPIs من واجهة واحدة." },
        },
      ],
    },
  },
];

export type ProjectId = (typeof projects)[number]["id"];