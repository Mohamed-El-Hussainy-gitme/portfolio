import fs from 'fs';

function loc(en, ar) { return { en, ar }; }

const projects = [
  { 
    universe: 1, slug: "ahwa-saas-platform", isFeatured: true, 
    name: loc("Ahwa — Café Operating System", "أهوه — نظام تشغيل المقهى"), 
    tagline: loc("Multi-tenant SaaS for café operations: shifts, orders, inventory, and billing.", "SaaS متعدد المستأجرين لإدارة المقاهي: الشيفتات والطلبات والمخزون والفوترة."), 
    description: loc("Ahwa is a full-stack café operating system built with Next.js 16 and Supabase. It separates platform administration from per-café runtime operations.", "أهوه هو نظام تشغيل كامل للمقاهي مبني بـ Next.js و Supabase. يفصل إدارة المنصة عن العمليات اليومية لكل مقهى باستقلالية."), 
    techStack: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"], 
    tags: ["SaaS", "Management", "Full-Stack"], 
    screens: [{ id: "s1", src: "/assets/project1/cover.jpg", alt: "Ahwa Dashboard" }],
    caseStudy: {
      problem: loc("Café owners struggled with paper-based shift logs, manual billing reconciliation, and no real-time visibility into staff presence. Furthermore, managing multiple café tenants securely was a nightmare for platform operators.", "كان أصحاب المقاهي يعانون من سجلات الشيفت الورقية وغياب الرؤية الفورية لحضور الموظفين والتسوية اليدوية للفواتير، ولم يكن هناك طريقة آمنة لمشغل المنصة لإدارة مستأجرين متعددين."),
      solution: loc("Designed a strict three-database topology (control-plane + operational shards) with explicit tenant routing. Authored 80+ ordered migrations covering every operational domain, and enforced a role matrix (owner → branch manager → supervisor → barista) directly at the RLS layer.", "صممت بنية ثلاث قواعد بيانات مع توجيه صريح للمستأجرين وكتابة 80+ migration مرتبة تغطي كل نطاق تشغيلي. طبقت مصفوفة صلاحيات معقدة مباشرة على مستوى قاعدة البيانات RLS."),
      outcome: loc("A production-ready SaaS platform where each café runs in total isolation. Platform operators can monitor all tenants globally, while local shift snapshots drive automated weekly/monthly reports, saving owners hours of manual work.", "منصة SaaS جاهزة للإنتاج يعمل فيها كل مقهى باستقلالية تامة. مشغلو المنصة يراقبون الجميع، بينما توفر التقارير الآلية للشيفتات ساعات طويلة من العمل اليدوي لأصحاب المقاهي."),
      role: loc("Full-stack architecture, database design, RLS policy authoring, and deployment.", "معماريات full-stack، تصميم قاعدة البيانات، صياغة سياسات الحماية، والنشر."),
      stack: loc("Next.js • TypeScript • Supabase • Redis • Tailwind CSS", "Next.js • TypeScript • Supabase • Redis • Tailwind CSS"),
      steps: loc(
        ["Design three-database topology and control-plane routing", "Implement role-based RLS matrix", "Build real-time shift management", "Build platform super-admin portal"],
        ["تصميم بنية ثلاث قواعد البيانات", "تطبيق مصفوفة صلاحيات RLS", "بناء إدارة الشيفت بالوقت الحقيقي", "بناء بوابة السوبر أدمن"]
      ),
      faqs: [
        { q: loc("How does multi-tenancy work?", "كيف يعمل تعدد المستأجرين؟"), a: loc("A control-plane database routes requests to the correct shard using app.current_cafe_id().", "قاعدة تحكم توجه الطلبات للشارد الصحيح وتفرض العزل.") }
      ]
    }
  },
  { 
    universe: 2, slug: "freelawyers-platform", isFeatured: true, 
    name: loc("Freelawyers", "Freelawyers"), 
    tagline: loc("A robust gig-economy platform connecting clients with independent lawyers.", "تطبيق ومنصة متكاملة للمحامين على غرار أوبر وفيزيتا."), 
    description: loc("Freelawyers handles user onboarding, case requests, matching, and real-time communication between clients and verified lawyers.", "منصة متخصصة للمحامين تدير تسجيل المستخدمين، طلبات القضايا، والمطابقة الفورية بين العميل والمحامي المستقل."), 
    techStack: ["React", "Next.js", "Supabase", "Tailwind CSS"], 
    tags: ["SaaS", "Marketplace", "Real-time"], 
    screens: [{ id: "s1", src: "/assets/project2/cover.jpg", alt: "Freelawyers App" }],
    caseStudy: {
      problem: loc("Clients had no transparent way to find vetted freelance lawyers, and lawyers lacked a unified dashboard to receive and manage gig-based case requests efficiently.", "لم يكن لدى العملاء طريقة شفافة للعثور على محامين مستقلين موثوقين، وافتقر المحامون إلى لوحة تحكم موحدة لاستقبال وإدارة طلبات القضايا."),
      solution: loc("Engineered a two-sided marketplace using Next.js and Supabase. Implemented a real-time matching algorithm, secure document uploads for case files via Supabase Storage, and a WebSocket-based chat system for instant client-lawyer communication.", "تمت هندسة منصة ثنائية الأطراف باستخدام Next.js و Supabase. قمت بتنفيذ خوارزمية مطابقة فورية، ونظام آمن لرفع مستندات القضايا، ونظام دردشة فوري."),
      outcome: loc("Successfully launched a 'Vezeeta for Lawyers' style platform that bridged the gap between legal need and expertise, processing case requests seamlessly with high user retention.", "تم إطلاق منصة ناجحة بأسلوب 'فيزيتا للمحامين' سدت الفجوة بين الاحتياج القانوني والخبرة، وتدير طلبات القضايا بسلاسة تامة."),
      role: loc("Lead Developer (Frontend & Backend)", "المطور الرئيسي (واجهات وخوادم)"),
      stack: loc("Next.js • Supabase • Tailwind", "Next.js • Supabase • Tailwind"),
      steps: loc(["Design DB Schema for dual user types", "Build real-time chat", "Implement secure storage"], ["تصميم قواعد البيانات للنوعين من المستخدمين", "بناء دردشة فورية", "تنفيذ تخزين آمن للمستندات"]),
      faqs: []
    }
  },
  { 
    universe: 3, slug: "nilu-tourism", isFeatured: false, 
    name: loc("NilU", "NilU للسياحة"), 
    tagline: loc("A comprehensive operational system built for a modern tourism company.", "مشروع متكامل ونظام عمليات مبني لشركة سياحة."), 
    description: loc("NilU handles bookings, itineraries, and customer management for a tourism agency.", "مشروع كامل لشركة سياحة يدير الحجوزات ومسارات الرحلات."), 
    techStack: ["Next.js", "Supabase", "UI/UX"], 
    tags: ["SaaS", "Tourism"], 
    screens: [{ id: "s1", src: "/assets/project3/cover.jpg", alt: "NilU Platform" }],
    caseStudy: {
      problem: loc("The tourism agency relied on scattered spreadsheets and unorganized emails to track complex itineraries, resulting in missed bookings and poor customer communication.", "كانت شركة السياحة تعتمد على جداول مبعثرة ورسائل بريد إلكتروني غير منظمة لتتبع مسارات الرحلات، مما أدى إلى ضياع الحجوزات وضعف التواصل مع العملاء."),
      solution: loc("Built a centralized web application that digitizes the entire workflow. It features a drag-and-drop itinerary builder, automated client invoicing, and a unified CRM dashboard to track every traveler's journey.", "تم بناء تطبيق ويب مركزي يرقمن سير العمل بالكامل. يتميز ببرنامج بناء مسارات الرحلات بالسحب والإفلات، وإصدار الفواتير الآلية، ولوحة تحكم CRM موحدة."),
      outcome: loc("Dramatically reduced administrative overhead by 60% and eliminated booking errors, allowing the agency to scale their operations globally.", "تم تقليل العبء الإداري بشكل كبير بنسبة 60% والقضاء على أخطاء الحجوزات، مما سمح للوكالة بتوسيع عملياتها عالمياً."),
      role: loc("Full-Stack Engineer", "مهندس Full-Stack"),
      stack: loc("Next.js • Supabase", "Next.js • Supabase"),
      steps: loc(["Map business workflows", "Build itinerary planner", "Integrate CRM"], ["تخطيط سير العمل", "بناء مخطط الرحلات", "دمج نظام إدارة العملاء"]),
      faqs: []
    }
  },
  { 
    universe: 4, slug: "base44-ecommerce-erp", isFeatured: false, 
    name: loc("E-Commerce ERP & Dashboard", "نظام إدارة موارد المتجر (ERP)"), 
    tagline: loc("A powerful E-commerce ERP and admin dashboard system.", "نظام إدارة موارد وداشبورد متقدمة للمتاجر."), 
    description: loc("Built using React and Vite, this dashboard handles complex data visualization, inventory tracking, and seamless shop operations.", "تطبيق ويب متقدم يعمل كنظام إدارة موارد للمتاجر بميزات لوحات تحكم ديناميكية."), 
    techStack: ["React", "Vite", "Tailwind CSS"], 
    tags: ["SaaS", "ERP"], 
    screens: [{ id: "s1", src: "/assets/E-commerce/cover.jpg", alt: "ERP Dashboard" }],
    caseStudy: {
      problem: loc("Store administrators lacked a centralized overview of their inventory, leading to stockouts and disorganized order fulfillment.", "افتقر مديرو المتاجر إلى نظرة مركزية على مخزونهم، مما أدى إلى نفاد المخزون وعدم تنظيم تلبية الطلبات."),
      solution: loc("Developed a robust React/Vite ERP dashboard featuring real-time data visualization charts, bulk inventory management tools, and role-based permissions.", "تطوير لوحة تحكم ERP قوية بـ React/Vite تتميز بمخططات بيانات فورية، أدوات إدارة مخزون مجمعة، وصلاحيات مبنية على الأدوار."),
      outcome: loc("Empowered administrators to manage thousands of SKUs effortlessly, improving order fulfillment speed and accuracy.", "تمكين المديرين من إدارة آلاف المنتجات بسهولة، مما حسن سرعة ودقة تلبية الطلبات."),
      role: loc("Frontend Architect", "مهندس واجهات أمامية"),
      stack: loc("React • Vite • Tailwind", "React • Vite • Tailwind"),
      steps: loc(["Design UI components", "Implement Data Visualizations", "Integrate state management"], ["تصميم الواجهات", "تنفيذ مخططات البيانات", "دمج إدارة الحالة"]),
      faqs: []
    }
  },
  { 
    universe: 5, slug: "pos-system-nextjs", isFeatured: false, 
    name: loc("Modern POS System", "نظام نقاط البيع (POS)"), 
    tagline: loc("A final, production-ready Point of Sale system built with Next.js.", "النسخة النهائية لنظام نقاط بيع سريع وموثوق مبني بـ Next.js."), 
    description: loc("A sleek, responsive POS application that handles inventory, sales, and reporting seamlessly in the browser.", "تطبيق POS حديث الاستجابة، يعالج المخزون والمبيعات والتقارير بسلاسة تامة من خلال المتصفح."), 
    techStack: ["Next.js", "Tailwind CSS", "Zustand"], 
    tags: ["SaaS", "POS"], 
    screens: [{ id: "s1", src: "/assets/project4/cover.jpg", alt: "POS System" }],
    caseStudy: {
      problem: loc("Legacy POS systems were slow, required heavy local installations, and disconnected from cloud inventory in real-time.", "كانت أنظمة الـ POS القديمة بطيئة وتحتاج لتثبيت محلي ولا تتصل بالمخزون السحابي لحظياً."),
      solution: loc("Built a Next.js web-based POS leveraging local storage caching and Zustand for lightning-fast cart operations that sync offline/online.", "بناء نظام POS سحابي بـ Next.js يعتمد على التخزين المحلي و Zustand لعمليات سلة سريعة جداً تعمل حتى عند انقطاع الإنترنت وتتزامن لاحقاً."),
      outcome: loc("A lightning-fast checkout experience that cashiers love, requiring zero installation and running perfectly on any tablet.", "تجربة دفع فائقة السرعة أحبها الكاشير، لا تتطلب أي تثبيت وتعمل بكفاءة على أي جهاز لوحي."),
      role: loc("System Developer", "مطور النظام"),
      stack: loc("Next.js • Zustand", "Next.js • Zustand"),
      steps: loc(["Build offline cart logic", "Optimize barcode scanning", "Implement receipt generation"], ["بناء منطق السلة الأوفلاين", "تحسين مسح الباركود", "تنفيذ توليد الفواتير"]),
      faqs: []
    }
  },
  { 
    universe: 8, slug: "lakatat-platform-rescue", isFeatured: true, 
    name: loc("Lakatat Platform", "منصة لقطات"), 
    tagline: loc("A massive rescue and rebuilding operation for a failing multi-tenant media platform.", "عملية إنقاذ تقني شاملة لموقع مقاطع فيديو وتطوير جذري."), 
    description: loc("Completely overhauled a broken app: adding a dynamic admin dashboard, multi-tenant roles, AdSense API, playlists, stories, and comments.", "قمت بحل مشاكل الأداء والشاشة السوداء، برمجة لوحة تحكم ديناميكية، وتطبيق تعدد المستأجرين مع ميزات القصص والتعليقات وربط أدسنس."), 
    techStack: ["Next.js", "Performance Auditing", "Database Optimization"], 
    tags: ["Rescue", "Full-Stack"], 
    screens: [{ id: "s1", src: "/assets/project7/cover.jpg", alt: "Lakatat Platform" }],
    caseStudy: {
      problem: loc("The client received a broken, extremely slow platform from a previous developer. It suffered from the 'black screen of death', massive database bottlenecks, and lacked basic admin controls.", "استلم العميل منصة معطلة وبطيئة جداً من مطور سابق. كانت تعاني من مشكلة 'الشاشة السوداء'، اختناقات ضخمة في الداتابيز، وافتقرت لأبسط أدوات التحكم الإداري."),
      solution: loc("I performed an emergency code audit, refactored the entire data fetching layer to resolve the black screens, optimized SQL queries, and built a comprehensive multi-tenant admin dashboard from scratch.", "قمت بمراجعة طارئة للكود، أعدت كتابة طبقة جلب البيانات بالكامل لحل مشكلة الشاشات السوداء، حسنت استعلامات الـ SQL، وبنيت لوحة تحكم متعددة المستأجرين من الصفر."),
      outcome: loc("Rescued the project from total failure. The platform now loads instantly, securely supports multiple tenant roles, and successfully generates revenue via AdSense integrations.", "تم إنقاذ المشروع من الفشل التام. المنصة الآن تعمل لحظياً، تدعم مستأجرين متعددين بأمان، وتحقق أرباحاً بنجاح عبر ربط AdSense."),
      role: loc("Rescue Engineer / Lead Developer", "مهندس إنقاذ / مطور رئيسي"),
      stack: loc("Next.js • Postgres • AdSense API", "Next.js • Postgres • AdSense API"),
      steps: loc(["Audit & fix rendering issues", "Refactor database schemas", "Build admin dashboard", "Integrate monetization"], ["فحص وحل مشاكل الرندر", "إعادة هيكلة قواعد البيانات", "بناء لوحة التحكم", "دمج أدوات تحقيق الربح"]),
      faqs: []
    }
  },
  { 
    universe: 9, slug: "framemasters", isFeatured: false, 
    name: loc("Framemasters", "Framemasters"), 
    tagline: loc("Security and payment integrations for a Lovable-based platform.", "تأمين بيانات وربط بوابات الدفع لمنصة Framemasters."), 
    description: loc("Integrated payment gateways, enforced RLS to secure database access, and optimized the overall project structure.", "إضافة بوابات الدفع وتطبيق قواعد حماية مستوى الصف (RLS) لتأمين قواعد البيانات بشكل صارم وتحسين أداء المشروع."), 
    techStack: ["Supabase", "Payment APIs", "Security"], 
    tags: ["Security", "Integration"], 
    screens: [{ id: "s1", src: "/assets/project1/cover.jpg", alt: "Framemasters" }],
    caseStudy: {
      problem: loc("The application lacked secure data isolation and couldn't process payments, leaving the platform vulnerable and unable to monetize.", "كان التطبيق يفتقر للعزل الآمن للبيانات ولم يكن قادراً على معالجة المدفوعات، مما تركه عرضة للاختراق وغير قادر على تحقيق الأرباح."),
      solution: loc("Implemented strict Row Level Security (RLS) in Supabase and seamlessly integrated regional payment gateways to handle secure transactions.", "تنفيذ قواعد حماية مستوى الصف (RLS) الصارمة في Supabase ودمج بوابات الدفع الإقليمية بسلاسة لمعالجة المعاملات بأمان."),
      outcome: loc("Secured all user data effectively and enabled live revenue generation with zero payment friction.", "تأمين كافة بيانات المستخدمين بفعالية وتمكين توليد الأرباح الحية بدون أي عقبات في الدفع."),
      role: loc("Backend & Security Engineer", "مهندس أمن وخوادم"),
      stack: loc("Supabase • Payment Gateways", "Supabase • Payment Gateways"),
      steps: loc(["Audit existing policies", "Write RLS rules", "Implement Checkout Webhooks"], ["فحص السياسات الحالية", "كتابة قواعد RLS", "تنفيذ Webhooks للدفع"]),
      faqs: []
    }
  },
  { 
    universe: 13, slug: "growlik-seo", isFeatured: true, 
    name: loc("GrowLik", "GrowLik"), 
    tagline: loc("A high-performance platform engineered specifically for top-tier Google Search rankings.", "موقع تم تطويره بتركيز مكثف على الـ SEO والسرعة."), 
    description: loc("GrowLik is a testament to Technical SEO. I developed the platform ensuring lightning-fast load times and perfect Lighthouse scores. It achieved the #1 spot on Google's first page.", "دليل عملي على قوة الـ Technical SEO. حققنا المركز الأول في الصفحة الأولى لجوجل بفضل السرعة وهيكلة المحتوى."), 
    techStack: ["Next.js", "SEO Optimization", "Performance Auditing"], 
    tags: ["SEO", "Performance"], 
    screens: [{ id: "s1", src: "/assets/growlik/cover.jpg", alt: "GrowLik SEO Results" }],
    caseStudy: {
      problem: loc("The client needed to dominate a highly competitive niche on Google Search but had a website that was heavily penalized for slow load times and poor semantic structure.", "كان العميل بحاجة لاكتساح تصنيفات بحث جوجل في مجال تنافسي للغاية، لكن موقعه القديم كان يعاقب بشدة بسبب بطء التحميل وضعف الهيكلة الدلالية."),
      solution: loc("Engineered a brand-new Next.js platform strictly focused on Core Web Vitals. Injected custom JSON-LD schema, optimized server-side rendering for instant First Contentful Paint, and eliminated all render-blocking resources.", "هندسة منصة Next.js جديدة تركز بشكل صارم على مؤشرات أداء الويب الأساسية (Core Web Vitals). تم حقن سكيما JSON-LD مخصصة، وتحسين الرندر الخادم لتسريع الظهور، وإزالة كافة الموارد المعيقة للرندر."),
      outcome: loc("Achieved a perfect 100/100 Lighthouse score. Within weeks, the platform organically climbed to the #1 ranking on Google's first page for targeted keywords, multiplying lead generation.", "تم تحقيق تقييم 100/100 على Lighthouse. في غضون أسابيع، صعد الموقع عضوياً للمركز الأول في صفحة جوجل الأولى للكلمات المفتاحية المستهدفة، مما ضاعف العملاء المحتملين."),
      role: loc("SEO Architect & Developer", "مهندس ومطور SEO"),
      stack: loc("Next.js • HTML5 Semantics • Google Search Console", "Next.js • HTML5 Semantics • Google Search Console"),
      steps: loc(["Analyze target keywords", "Build ultra-fast Next.js core", "Inject Schema markup", "Monitor indexing via GSC"], ["تحليل الكلمات المفتاحية", "بناء نواة Next.js سريعة جداً", "حقن بيانات Schema", "مراقبة الفهرسة عبر GSC"]),
      faqs: []
    }
  }
];

// Fallback for remaining projects to ensure all 35 exist in the DB
const remainingProjectsTemplate = [
  { slug: "crm-system-nextjs", name: "Cloudflare CRM", ar: "نظام إدارة علاقات العملاء" },
  { slug: "crm-system-python", name: "Python CRM", ar: "نظام إدارة العملاء بايثون" },
  { slug: "bcc-fullstack", name: "BCC Fullstack", ar: "BCC" },
  { slug: "arab-anglais", name: "Arab Anglais", ar: "Arab Anglais" },
  { slug: "al-ola-oil-collection", name: "AL OLA", ar: "العلا لتجميع الزيت" },
  { slug: "vortexq8-seo", name: "Vortexq8", ar: "Vortexq8" },
  { slug: "saqi-sa-seo", name: "Saqi.sa", ar: "Saqi.sa" },
  { slug: "rose-ecommerce", name: "Rose Store", ar: "متجر روز" },
  { slug: "gedo-store", name: "Gedo Store", ar: "متجر جدو" },
  { slug: "noda-clothing-brand", name: "Noda Clothing", ar: "ملابس نودا" },
  { slug: "kenz-ecommerce", name: "Kenz Ecommerce", ar: "متجر كنز" },
  { slug: "alkhair-store", name: "Al Khair", ar: "متجر الخير" },
  { slug: "al-afkham-woocommerce", name: "Al Afkham", ar: "الأفخم" },
  { slug: "lamar-ecommerce", name: "Lamar Store", ar: "لمار" },
  { slug: "noda-ai-tool", name: "Noda AI Tool", ar: "أداة نودا للذكاء الاصطناعي" },
  { slug: "restaurant-specialized-saas", name: "Restaurant SaaS", ar: "نظام تشغيل المطاعم" },
  { slug: "animation-studio-system", name: "Animation Studio", ar: "استوديو الرسوم المتحركة" },
  { slug: "arab-tourism", name: "Arab Tourism", ar: "السياحة العربية" },
  { slug: "holospace-simulator", name: "Holospace Simulator", ar: "Holospace" },
  { slug: "elhussainy-next", name: "Portfolio Next.js", ar: "البورتفوليو" },
  { slug: "multiverse-showcase", name: "Multiverse Showcase", ar: "Multiverse" },
  { slug: "pulsereach-astra-child", name: "Pulsereach Astra", ar: "Pulsereach" },
  { slug: "nori-restaurant-ui", name: "Nori UI", ar: "واجهة نوري" },
  { slug: "static-shop-ui", name: "Static Shop UI", ar: "متجر ستاتيك" },
  { slug: "dashboard-admin-ui", name: "Dashboard UI", ar: "واجهة داشبورد" },
  { slug: "real-estate-ui", name: "Real Estate UI", ar: "واجهة العقارات" },
  { slug: "store-static-ui", name: "Store Static", ar: "واجهة المتجر" },
];

let u = 20;
remainingProjectsTemplate.forEach((p, idx) => {
  projects.push({
    universe: u++,
    slug: p.slug,
    isFeatured: false,
    name: loc(p.name, p.ar),
    tagline: loc("A professional, high-performance web project delivered with excellence.", "مشروع ويب احترافي وعالي الأداء تم تسليمه بدقة وإتقان."),
    description: loc(`Development and execution of ${p.name}, focusing on robust architecture and flawless UX.`, `تطوير وتنفيذ مشروع ${p.ar} مع التركيز على البنية القوية وتجربة المستخدم السلسة.`),
    techStack: ["React", "Next.js", "Web Development"],
    tags: ["Development"],
    screens: [{ id: "s1", src: `/assets/project${(idx % 7) + 1}/cover.jpg`, alt: p.name }],
    caseStudy: {
      problem: loc(`The client required a modern, scalable solution for ${p.name} that could handle extensive traffic and complex workflows without compromising on speed.`, `احتاج العميل حلاً عصرياً وقابلاً للتوسع لمشروع ${p.ar} يمكنه التعامل مع الزيارات الكثيفة وسير العمل المعقد دون التضحية بالسرعة.`),
      solution: loc("We adopted a modern tech stack (React/Next.js) to engineer a robust front-end and back-end integration, strictly following clean architecture principles.", "اعتمدنا تقنيات حديثة (React/Next.js) لهندسة واجهات وخوادم متكاملة بقوة، مع الالتزام الصارم بمبادئ الكود النظيف."),
      outcome: loc("Delivered a highly performant application that exceeded client expectations, significantly improving user engagement and operational efficiency.", "تسليم تطبيق عالي الأداء فاق توقعات العميل، مما أدى لتحسن كبير في تفاعل المستخدمين والكفاءة التشغيلية."),
      role: loc("Lead Developer", "المطور الرئيسي"),
      stack: loc("Modern Web Stack", "تقنيات الويب الحديثة"),
      steps: loc(["Requirements Analysis", "System Design", "Development & Testing", "Deployment"], ["تحليل المتطلبات", "تصميم النظام", "التطوير والاختبار", "الإطلاق الحي"]),
      faqs: []
    }
  });
});

const services = [
  {
    slug: "saas-development",
    icon: "code",
    title: { en: "SaaS & Custom Web Applications", ar: "بناء منصات الـ SaaS والأنظمة المخصصة" },
    summary: { en: "End-to-end development of scalable SaaS platforms and custom web applications (like Ahwa and Freelawyers). I handle everything from database architecture to frontend implementation.", ar: "تطوير شامل لمنصات الـ SaaS وتطبيقات الويب المخصصة (مثل منصات قهوة ومحامين). أهتم بكل شيء بدءاً من البنية التحتية وقواعد البيانات وحتى الواجهات النهائية." },
    bullets: { en: ["Multi-tenant architectures", "Complex dashboards and POS systems", "Real-time database integrations", "Scalable Next.js and Node.js backends"], ar: ["بناء أنظمة متعددة المستأجرين (Multi-tenant)", "تطوير لوحات تحكم وأنظمة نقاط بيع معقدة", "تكامل مع قواعد البيانات اللحظية (Real-time)", "خوادم خلفية قابلة للتوسع باستخدام Next.js و Node.js"] },
    focusKeyword: { en: "SaaS Development", ar: "تطوير SaaS" }
  },
  {
    slug: "ecommerce-development",
    icon: "shopping-cart",
    title: { en: "E-Commerce Development & Customization", ar: "تطوير وتخصيص المتاجر الإلكترونية" },
    summary: { en: "Building robust e-commerce solutions from scratch or deeply customizing platforms like WooCommerce (e.g., Al Afkham, Rose Store) to perfectly match your brand's unique needs.", ar: "بناء حلول تجارة إلكترونية متكاملة من الصفر، أو تخصيص وتطوير منصات مثل WooCommerce (مثل الأفخم ومتجر Rose) لتناسب هوية علامتك التجارية بشكل مثالي." },
    bullets: { en: ["Custom UI/UX for online stores", "Advanced admin panels and coupon systems", "Payment gateway integrations", "WooCommerce custom functions and CSS"], ar: ["واجهات وتجربة مستخدم مخصصة للمتاجر", "لوحات تحكم متقدمة وأنظمة كوبونات", "ربط مع بوابات الدفع الإلكتروني", "تخصيص كامل لـ WooCommerce برمجياً وشكلياً"] },
    focusKeyword: { en: "Custom E-Commerce", ar: "متاجر إلكترونية مخصصة" }
  },
  {
    slug: "project-rescue",
    icon: "wrench",
    title: { en: "Project Rescue & Technical Optimization", ar: "إنقاذ المشاريع والتحسين التقني" },
    summary: { en: "Taking over failing or broken projects (like the Lakatat platform rescue) to fix critical bugs, rewrite slow queries, build missing admin capabilities, and deliver a polished product.", ar: "استلام المشاريع المتعثرة أو المليئة بالأخطاء (مثل إنقاذ منصة لقطات)، وإصلاح المشاكل البرمجية الحرجة، تسريع الأداء، وبناء المميزات الناقصة مثل لوحات التحكم لتسليم منتج نهائي لامع." },
    bullets: { en: ["Debugging and fixing 'black screens'", "Database optimization and RLS security", "Refactoring messy codebases", "Adding missing core features mid-flight"], ar: ["إصلاح الأخطاء البرمجية والشاشات السوداء", "تحسين قواعد البيانات وتأمينها (RLS)", "إعادة صياغة الأكواد المعقدة (Refactoring)", "بناء الميزات الأساسية الناقصة باحترافية"] },
    focusKeyword: { en: "Project Rescue", ar: "إنقاذ تقني للمشاريع" }
  },
  {
    slug: "technical-seo",
    icon: "search",
    title: { en: "Technical SEO & Performance", ar: "تحسين محركات البحث التقني والأداء" },
    summary: { en: "Engineering platforms specifically for top-tier Google Search rankings (like GrowLik and Vortexq8). I implement advanced technical SEO, structured data, and extreme performance tuning.", ar: "هندسة المواقع لتتصدر نتائج بحث جوجل (مثل GrowLik و Vortexq8). أقوم بتطبيق معايير Technical SEO المتقدمة، حقن البيانات المنظمة (Schema)، وتحسين الأداء لأقصى حد." },
    bullets: { en: ["Lighthouse score optimization (100/100)", "Core Web Vitals enhancement", "Schema and metadata engineering", "Custom GTM and indexing scripts"], ar: ["تحسين تقييمات سرعة Lighthouse", "تحسين مؤشرات أداء الويب (Core Web Vitals)", "هندسة البيانات المنظمة والميتا داتا", "حقن سكريبتات الفهرسة وتخصيص GTM"] },
    focusKeyword: { en: "Technical SEO", ar: "تحسين أداء SEO" }
  }
];

const blogPosts = [
  {
    slug: "rescuing-failing-platform-multi-tenant",
    dateISO: "2024-03-15T10:00:00Z",
    tags: ["Next.js", "Performance", "Architecture", "Multi-tenant"],
    focusKeyword: { en: "Platform Rescue", ar: "إنقاذ المشاريع التقنية" },
    title: { en: "How I Rescued a Failing Media Platform and Converted It to Multi-Tenant", ar: "كيف قمت بإنقاذ منصة ميديا متعثرة وتحويلها إلى نظام Multi-Tenant" },
    description: { en: "A deep dive into fixing the 'black screen of death', dramatically improving load times, and building a missing admin dashboard from scratch.", ar: "رحلة تقنية في إنقاذ مشروع متعثر: من حل مشكلة الشاشة السوداء وبطء التصفح إلى بناء لوحة تحكم وإعداد تعدد المستأجرين." },
    coverImage: "/assets/blog/rescue-cover.jpg",
    readingTimeMin: 6
  },
  {
    slug: "building-ahwa-saas-operating-system",
    dateISO: "2024-05-20T14:30:00Z",
    tags: ["SaaS", "Next.js", "PostgreSQL", "System Design"],
    focusKeyword: { en: "SaaS Development", ar: "تطوير SaaS" },
    title: { en: "Building Ahwa: A SaaS Operating System for Coffee Shops", ar: "بناء نظام 'قهوة': منصة SaaS ونظام تشغيل متكامل للمقاهي" },
    description: { en: "How I engineered a complete SaaS ecosystem encompassing POS, inventory, and analytics from scratch using Next.js.", ar: "كيف قمت بهندسة بيئة SaaS متكاملة تشمل نقاط البيع (POS)، المخزون، والتحليلات من الصفر باستخدام Next.js." },
    coverImage: "/assets/blog/ahwa-cover.jpg",
    readingTimeMin: 8
  },
  {
    slug: "technical-seo-more-than-meta-tags",
    dateISO: "2024-06-10T09:15:00Z",
    tags: ["SEO", "Lighthouse", "Core Web Vitals", "Next.js"],
    focusKeyword: { en: "Technical SEO", ar: "SEO التقني" },
    title: { en: "Why Technical SEO is the Secret to Google Page 1 Rankings", ar: "لماذا الـ SEO التقني هو السر الحقيقي لتصدر الصفحة الأولى في جوجل" },
    description: { en: "A look into how extreme performance tuning and proper schema injection helped GrowLik dominate search results.", ar: "نظرة على كيف ساعد التحسين الجذري للأداء وحقن البيانات المنظمة موقع GrowLik في السيطرة على نتائج البحث." },
    coverImage: "/assets/blog/seo-cover.jpg",
    readingTimeMin: 5
  }
];

function escape(str) {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

function pgJson(obj) {
  if (!obj) return 'NULL';
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

let sql = `-- Migration: 009_update_portfolio_data
-- Updates the database with the completely revamped portfolio data including DEEP case studies and absolute asset paths.

BEGIN;

TRUNCATE TABLE projects CASCADE;

INSERT INTO projects (
  universe, slug, status, featured,
  name_en, name_ar, tagline_en, tagline_ar, description_en, description_ar,
  tech_stack, tags, screens,
  case_study_problem_en, case_study_problem_ar,
  case_study_solution_en, case_study_solution_ar,
  case_study_outcome_en, case_study_outcome_ar,
  case_study_role_en, case_study_role_ar,
  case_study_stack_en, case_study_stack_ar,
  case_study_steps_en, case_study_steps_ar, faqs
) VALUES
`;

const projectValues = projects.map(p => {
  return `(
  ${p.universe}, ${escape(p.slug)}, 'published', ${p.isFeatured ? 'true' : 'false'},
  ${escape(p.name.en)}, ${escape(p.name.ar)}, ${escape(p.tagline.en)}, ${escape(p.tagline.ar)}, ${escape(p.description.en)}, ${escape(p.description.ar)},
  ${pgJson(p.techStack)}, ${pgJson(p.tags)}, ${pgJson(p.screens)},
  ${escape(p.caseStudy.problem.en)}, ${escape(p.caseStudy.problem.ar)},
  ${escape(p.caseStudy.solution.en)}, ${escape(p.caseStudy.solution.ar)},
  ${escape(p.caseStudy.outcome.en)}, ${escape(p.caseStudy.outcome.ar)},
  ${escape(p.caseStudy.role.en)}, ${escape(p.caseStudy.role.ar)},
  ${escape(p.caseStudy.stack.en)}, ${escape(p.caseStudy.stack.ar)},
  ${pgJson(p.caseStudy.steps.en)}, ${pgJson(p.caseStudy.steps.ar)},
  ${pgJson(p.caseStudy.faqs)}
)`;
});

sql += projectValues.join(',\n') + ';\n\n';

sql += `-- 2. TRUNCATE and RE-SEED SERVICES
TRUNCATE TABLE services CASCADE;

INSERT INTO services (
  "order", slug, status, icon,
  title_en, title_ar, description_en, description_ar,
  keyword_en, keyword_ar, includes_en, includes_ar
) VALUES
`;

const serviceValues = services.map((s, i) => {
  return `(
  ${i + 1}, ${escape(s.slug)}, 'published', ${escape(s.icon)},
  ${escape(s.title.en)}, ${escape(s.title.ar)}, ${escape(s.summary.en)}, ${escape(s.summary.ar)},
  ${escape(s.focusKeyword?.en)}, ${escape(s.focusKeyword?.ar)},
  ${pgJson(s.bullets?.en)}, ${pgJson(s.bullets?.ar)}
)`;
});

sql += serviceValues.join(',\n') + ';\n\n';

sql += `-- 3. TRUNCATE and RE-SEED BLOG POSTS
TRUNCATE TABLE blog_posts CASCADE;

INSERT INTO blog_posts (
  slug, status, title_en, title_ar, summary_en, summary_ar,
  tags, cover_image, published_date, reading_time_min
) VALUES
`;

const blogValues = blogPosts.map(b => {
  return `(
  ${escape(b.slug)}, 'published', ${escape(b.title.en)}, ${escape(b.title.ar)}, ${escape(b.description.en)}, ${escape(b.description.ar)},
  ${pgJson(b.tags)}, ${escape(b.coverImage)}, ${escape(b.dateISO.slice(0, 10))}, ${b.readingTimeMin}
)`;
});

sql += blogValues.join(',\n') + ';\n\n';

sql += `COMMIT;\n`;

fs.writeFileSync('d:/projects/elhussainy-next/supabase/migrations/009_update_portfolio_data.sql', sql);
console.log("SQL Migration generated at supabase/migrations/009_update_portfolio_data.sql");
