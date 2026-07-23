export type LocalizedText = { en: string; ar: string };

export type BlogBlock =
  | { type: "h2"; text: LocalizedText }
  | { type: "h3"; text: LocalizedText }
  | { type: "p"; text: LocalizedText }
  | { type: "code"; lang: string; code: string };

export type BlogPost = {
  slug: string;
  dateISO: string;
  tags: string[];
  focusKeyword: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  blocks: BlogBlock[];
  readingTimeMin?: number;
  coverImage?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "rescuing-failing-platform-multi-tenant",
    dateISO: "2024-03-15T10:00:00Z",
    tags: ["Next.js", "Performance", "Architecture", "Multi-tenant"],
    focusKeyword: { en: "Platform Rescue", ar: "إنقاذ المشاريع التقنية" },
    title: {
      en: "How I Rescued a Failing Media Platform and Converted It to Multi-Tenant",
      ar: "كيف قمت بإنقاذ منصة ميديا متعثرة وتحويلها إلى نظام Multi-Tenant",
    },
    description: {
      en: "A deep dive into fixing the 'black screen of death', dramatically improving load times, and building a missing admin dashboard from scratch.",
      ar: "رحلة تقنية في إنقاذ مشروع متعثر: من حل مشكلة الشاشة السوداء وبطء التصفح إلى بناء لوحة تحكم وإعداد تعدد المستأجرين.",
    },
    readingTimeMin: 6,
    coverImage: "blog/rescue-cover.jpg",
    blocks: [
      {
        type: "p",
        text: {
          en: "I recently took over a failing project (Lakatat) that was suffering from severe performance issues. The client was experiencing a 'black screen' on load, extremely slow navigation, and shockingly, the platform had absolutely no admin control panel.",
          ar: "مؤخراً استلمت مشروع منصة (لقطات) وهو في حالة انهيار تقني. العميل كان يواجه 'شاشة سوداء' عند التحميل، وبطء شديد في التصفح، والمفاجأة أن النظام لم يكن يحتوي على أي لوحة تحكم للإدارة.",
        },
      },
      {
        type: "h2",
        text: {
          en: "Step 1: Diagnosing the Black Screen & Speed Issues",
          ar: "الخطوة الأولى: تشخيص الشاشة السوداء ومشاكل السرعة",
        },
      },
      {
        type: "p",
        text: {
          en: "The first priority was stopping the bleeding. The black screen was caused by unhandled client-side exceptions during hydration and massive, unoptimized API payloads blocking the main thread. I rewrote the fetching logic to use proper server-side rendering (SSR) and implemented pagination for the video feeds. The difference was night and day.",
          ar: "الأولوية الأولى كانت إيقاف النزيف. الشاشة السوداء كانت بسبب أخطاء غير معالجة في الواجهة (Client-side) وحمولات بيانات ضخمة تعطل المتصفح. قمت بإعادة كتابة منطق جلب البيانات ليعتمد على الخادم (SSR)، وطبقت نظام الترقيم (Pagination) للفيديوهات. النتيجة كانت فورية.",
        },
      },
      {
        type: "h2",
        text: {
          en: "Step 2: Building the Missing Admin & Multi-Tenant Architecture",
          ar: "الخطوة الثانية: بناء لوحة التحكم المفقودة وبنية Multi-Tenant",
        },
      },
      {
        type: "p",
        text: {
          en: "A platform without an admin panel is a ticking time bomb. I developed a comprehensive dynamic dashboard allowing complete control over videos, playlists, stories, and the footer content. Moreover, I overhauled the database schema to support multi-tenant user roles, ensuring secure and isolated environments for different types of users and content creators.",
          ar: "أي منصة بدون لوحة تحكم هي قنبلة موقوتة. قمت ببرمجة لوحة تحكم ديناميكية شاملة تتيح التحكم بالفيديوهات، القصص، السلاسل، وحتى فوتر الموقع. الأهم من ذلك، أعدت هندسة قاعدة البيانات لتدعم تعدد المستأجرين (Multi-tenant)، مما وفر بيئة آمنة ومعزولة لصناع المحتوى.",
        },
      },
      {
        type: "p",
        text: {
          en: "Finally, I integrated Google AdSense indexing APIs and designated ad spaces. The project went from a broken, unusable state to a fast, profitable, and highly manageable platform.",
          ar: "أخيراً، قمت بربط واجهات فهرسة Google AdSense وتخصيص مساحات إعلانية. تحول المشروع من حالة الفشل التام إلى منصة سريعة، مربحة، وسهلة الإدارة تماماً.",
        },
      },
    ],
  },
  {
    slug: "building-ahwa-saas-operating-system",
    dateISO: "2024-05-20T14:30:00Z",
    tags: ["SaaS", "Next.js", "PostgreSQL", "System Design"],
    focusKeyword: { en: "SaaS Development", ar: "تطوير SaaS" },
    title: {
      en: "Building Ahwa: A SaaS Operating System for Coffee Shops",
      ar: "بناء نظام 'قهوة': منصة SaaS ونظام تشغيل متكامل للمقاهي",
    },
    description: {
      en: "How I engineered a complete SaaS ecosystem encompassing POS, inventory, and analytics from scratch using Next.js.",
      ar: "كيف قمت بهندسة بيئة SaaS متكاملة تشمل نقاط البيع (POS)، المخزون، والتحليلات من الصفر باستخدام Next.js.",
    },
    readingTimeMin: 8,
    coverImage: "blog/ahwa-cover.jpg",
    blocks: [
      {
        type: "p",
        text: {
          en: "When I started developing 'Ahwa', the goal wasn't just to build another Point of Sale (POS) software. I wanted to build an entire Operating System (OS) for coffee shops and restaurants—a single unified platform handling everything from the cashier's screen to backend inventory and staff management.",
          ar: "عندما بدأت في تطوير مشروع 'قهوة' (Ahwa)، لم يكن الهدف مجرد بناء برنامج نقاط بيع (POS) آخر. أردت بناء نظام تشغيل (OS) متكامل للمقاهي والمطاعم؛ منصة واحدة موحدة تدير كل شيء من شاشة الكاشير إلى جرد المخزون في الخلفية وإدارة الموظفين.",
        },
      },
      {
        type: "h2",
        text: {
          en: "The Complexity of Real-Time Inventory",
          ar: "تعقيدات جرد المخزون اللحظي",
        },
      },
      {
        type: "p",
        text: {
          en: "One of the biggest challenges in a restaurant SaaS is inventory mapping. When a cashier sells a 'Latte', the system needs to dynamically deduct 15g of coffee beans, 200ml of milk, and 1 paper cup in real-time. Designing a relational database schema in PostgreSQL that maps final products to raw ingredients without causing massive performance bottlenecks during peak hours required meticulous query optimization.",
          ar: "أحد أكبر التحديات في أنظمة SaaS للمطاعم هو ربط المبيعات بالمخزون. عندما يبيع الكاشير 'لاتيه'، يجب أن يخصم النظام 15 جراماً من القهوة، و200 مل من الحليب، وكوباً ورقياً واحداً في نفس اللحظة. هندسة قاعدة بيانات (PostgreSQL) تربط المنتجات النهائية بالمواد الخام دون التسبب باختناقات في الأداء وقت الذروة تطلب تحسيناً دقيقاً للاستعلامات.",
        },
      },
      {
        type: "h2",
        text: {
          en: "Offline-First and Reliability",
          ar: "دعم العمل بدون إنترنت والموثوقية",
        },
      },
      {
        type: "p",
        text: {
          en: "Coffee shops can't stop operating if the internet goes down. Leveraging modern web capabilities, I ensured the core POS functionalities remained active offline, syncing seamlessly with the server once the connection is restored. This robust architecture is what makes Ahwa a true OS for the F&B industry.",
          ar: "لا يمكن للمقهى أن يتوقف عن العمل إذا انقطع الإنترنت. باستخدام التقنيات الحديثة للويب، ضمنت أن تظل الوظائف الأساسية للكاشير تعمل بدون إنترنت (Offline)، ليتم مزامنة البيانات بسلاسة مع السيرفر بمجرد عودة الاتصال. هذه البنية التحتية القوية هي ما يجعل Ahwa نظام تشغيل حقيقي لقطاع الأغذية والمشروبات.",
        },
      },
    ],
  },
  {
    slug: "technical-seo-more-than-meta-tags",
    dateISO: "2024-06-10T09:15:00Z",
    tags: ["SEO", "Lighthouse", "Core Web Vitals", "Next.js"],
    focusKeyword: { en: "Technical SEO", ar: "SEO التقني" },
    title: {
      en: "Why Technical SEO is the Secret to Google Page 1 Rankings",
      ar: "لماذا الـ SEO التقني هو السر الحقيقي لتصدر الصفحة الأولى في جوجل",
    },
    description: {
      en: "A look into how extreme performance tuning and proper schema injection helped GrowLik dominate search results.",
      ar: "نظرة على كيف ساعد التحسين الجذري للأداء وحقن البيانات المنظمة موقع GrowLik في السيطرة على نتائج البحث.",
    },
    readingTimeMin: 5,
    coverImage: "blog/seo-cover.jpg",
    blocks: [
      {
        type: "p",
        text: {
          en: "Most developers think SEO is just about adding `<title>` and `<meta name='description'>` tags. While content is king, Google’s crawler heavily penalizes slow, poorly structured websites. In my work on the GrowLik platform, Technical SEO was the absolute priority.",
          ar: "يعتقد معظم المطورين أن الـ SEO يقتصر على إضافة وسوم `<title>` و `<meta>`. رغم أهمية المحتوى، إلا أن عناكب جوجل تعاقب بشدة المواقع البطيئة وذات الهيكلة السيئة. في عملي على منصة GrowLik، كان الـ Technical SEO هو الأولوية المطلقة.",
        },
      },
      {
        type: "h2",
        text: {
          en: "Performance as a Ranking Factor",
          ar: "الأداء كعامل أساسي في الترتيب",
        },
      },
      {
        type: "p",
        text: {
          en: "Google uses Core Web Vitals (LCP, FID, CLS) to rank pages. For GrowLik, I utilized Next.js Server-Side Rendering (SSR) and aggressive image optimization to ensure a 100/100 Lighthouse score. The site loads almost instantly, keeping bounce rates extremely low.",
          ar: "يستخدم جوجل مؤشرات أداء الويب الأساسية (Core Web Vitals) لترتيب الصفحات. بالنسبة لـ GrowLik، استخدمت التصيير من جهة الخادم (SSR) في Next.js والتحسين القوي للصور لضمان تحقيق تقييم 100/100 في Lighthouse. الموقع يحمل بشكل شبه فوري، مما يبقي معدلات الارتداد (Bounce Rates) منخفضة جداً.",
        },
      },
      {
        type: "h2",
        text: {
          en: "Structured Data (Schema.org)",
          ar: "البيانات المنظمة (Structured Data)",
        },
      },
      {
        type: "p",
        text: {
          en: "To give Google exact context, I injected dynamic JSON-LD structured data into every page. This translates raw text into semantic entities that search engines understand perfectly. Combined with custom GTM (Google Tag Manager) tracking, these engineering practices propelled the site to the #1 spot on Google's first page.",
          ar: "لإعطاء جوجل السياق الدقيق، قمت بحقن بيانات منظمة ديناميكية (JSON-LD) في كل صفحة. هذا يترجم النصوص العادية إلى كيانات دلالية تفهمها محركات البحث تماماً. وبدمج ذلك مع تتبع مخصص عبر GTM، دفعت هذه الممارسات الهندسية الموقع لتصدر المركز الأول في الصفحة الأولى لجوجل.",
        },
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
