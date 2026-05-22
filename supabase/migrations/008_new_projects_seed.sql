-- ============================================================
--  008_new_projects_seed.sql
--  5 مشاريع جديدة — مستخرجة من الكود الفعلي
--  universe: 6 → 10  (تكملةً للـ 5 الموجودة)
-- ============================================================

-- ────────────────────────────────────────────────────────────
--  PROJECT 6 — Ahwa (نظام إدارة المقهى)
-- ────────────────────────────────────────────────────────────
INSERT INTO projects (
  universe, slug, status, featured,
  name_en, name_ar,
  tagline_en, tagline_ar,
  description_en, description_ar,
  focus_keyword_en, focus_keyword_ar,
  seo_title_en, seo_title_ar,
  seo_description_en, seo_description_ar,
  tech_stack, tags,
  repo_url, live_url, screens,
  case_study_problem_en, case_study_problem_ar,
  case_study_solution_en, case_study_solution_ar,
  case_study_outcome_en, case_study_outcome_ar,
  case_study_role_en, case_study_role_ar,
  case_study_stack_en, case_study_stack_ar,
  case_study_steps_en, case_study_steps_ar,
  faqs,
  highlight_key_points_en, highlight_key_points_ar,
  highlight_focus_en, highlight_focus_ar,
  highlight_role_en, highlight_role_ar
) VALUES (
  6, 'ahwa-cafe-os', 'published', true,

  'Ahwa — Café Operating System',
  'أهوه — نظام تشغيل المقهى',

  'Multi-tenant SaaS for café operations: shifts, orders, inventory, billing, and real-time staff presence across a three-database topology.',
  'SaaS متعدد المستأجرين لإدارة المقاهي: الشيفتات والطلبات والمخزون والفوترة وحضور الموظفين في الوقت الحقيقي عبر بنية ثلاث قواعد بيانات.',

  'Ahwa is a full-stack café operating system built with Next.js 16 and Supabase. It separates platform administration (super-admin portal) from per-café runtime operations (owner + staff app) using a strict three-database topology: one control-plane database routing tenant traffic to two dedicated operational shards. The system covers 80+ Supabase migrations, real-time shift management, role-based access (owner, branch manager, supervisor, barista, shisha), PWA push notifications, archive pipelines with approval flows, and a billing/subscription layer for the platform operator.',
  'أهوه هو نظام تشغيل كامل للمقاهي مبني بـ Next.js 16 وSupabase. يفصل إدارة المنصة (بوابة السوبر أدمن) عن العمليات اليومية لكل مقهى (تطبيق المالك والموظفين) باستخدام بنية ثلاث قواعد بيانات: قاعدة تحكم مركزية توجه حركة المستأجرين إلى شاردين تشغيليين مخصصين. يغطي النظام أكثر من 80 migration في Supabase، وإدارة الشيفتات الحية، وصلاحيات متعددة المستويات، وإشعارات PWA، وخطوط أرشفة مع موافقات، وطبقة فوترة واشتراكات للمنصة.',

  'café management system', 'نظام إدارة مقهى',

  'Ahwa Café OS: Multi-Tenant SaaS Case Study', 'أهوه: دراسة حالة SaaS متعدد المستأجرين لإدارة المقاهي',

  'Real-time café operating system with shift management, role-based access, billing, and a three-database multi-tenant architecture built on Next.js and Supabase.',
  'نظام تشغيل مقاهي بالوقت الحقيقي يشمل إدارة الشيفتات وصلاحيات متدرجة وفوترة وبنية SaaS متعددة المستأجرين مبنية على Next.js وSupabase.',

  '[
    "Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL",
    "Tailwind CSS 4", "Zustand", "Zod", "ioredis", "web-push"
  ]'::jsonb,

  '["saas", "fullstack", "multi-tenant", "realtime", "backend", "postgresql"]'::jsonb,

  'https://github.com/Mohamed-El-Hussainy-gitme/ahwa',
  null,
  '[]'::jsonb,

  -- Case Study
  'Café owners struggled with paper-based shift logs, no real-time visibility into staff presence, manual billing reconciliation, and no way for a platform operator to manage multiple café tenants securely.',
  'كان أصحاب المقاهي يعانون من سجلات الشيفت الورقية وغياب الرؤية الفورية لحضور الموظفين والتسوية اليدوية للفواتير وعدم وجود طريقة آمنة لمشغل المنصة لإدارة مستأجرين متعددين.',

  'Designed a strict three-database topology (control-plane + two operational shards) with explicit tenant routing, 80+ ordered migrations covering every operational domain, and a role matrix (owner → branch manager → supervisor → barista → shisha) enforced at the RLS layer.',
  'صممت بنية ثلاث قواعد بيانات (control-plane + شاردان تشغيليان) مع توجيه صريح للمستأجرين و80+ migration مرتبة تغطي كل نطاق تشغيلي، ومصفوفة صلاحيات (مالك → مدير فرع → مشرف → باريستا → معلم شيشة) مطبّقة على مستوى RLS.',

  'A production-ready SaaS platform where each café runs in isolation, platform operators can monitor all tenants from a single dashboard, shift snapshots drive weekly/monthly/yearly reports, and the archive approval flow protects historical data from accidental deletion.',
  'منصة SaaS جاهزة للإنتاج حيث يعمل كل مقهى باستقلالية تامة، ومشغلو المنصة يراقبون جميع المستأجرين من لوحة واحدة، وتغذي لقطات الشيفت تقارير أسبوعية وشهرية وسنوية، وتحمي خطوط الأرشفة مع الموافقات البيانات التاريخية من الحذف العرضي.',

  'Full-stack architecture, database design (80+ migrations), RLS policy authoring, real-time presence, PWA push, billing layer, and deployment automation.',
  'معماريات full-stack، تصميم قاعدة البيانات (80+ migration)، صياغة سياسات RLS، الحضور الحي، إشعارات PWA، طبقة الفوترة، وأتمتة النشر.',

  'Next.js 16 • React 19 • TypeScript • Supabase (PostgreSQL + RLS + Realtime) • Redis • Zustand • Zod • Tailwind CSS 4 • web-push',
  'Next.js 16 • React 19 • TypeScript • Supabase (PostgreSQL + RLS + Realtime) • Redis • Zustand • Zod • Tailwind CSS 4 • web-push',

  '[
    "Design three-database topology and control-plane routing",
    "Author 80+ ordered migrations covering ops, platform, and archive domains",
    "Implement role-based RLS matrix (owner / branch manager / supervisor / barista / shisha)",
    "Build real-time shift management with atomic open/close RPCs",
    "Add PWA push notifications and outbox-backed realtime dispatch",
    "Implement billing, subscription, and archive approval flows",
    "Build platform super-admin portal (overview, cafes, support inbox, money)"
  ]'::jsonb,
  '[
    "تصميم بنية ثلاث قواعد البيانات وتوجيه control-plane",
    "كتابة 80+ migration مرتبة تغطي النطاقات التشغيلية والمنصة والأرشيف",
    "تطبيق مصفوفة صلاحيات RLS (مالك / مدير فرع / مشرف / باريستا / معلم شيشة)",
    "بناء إدارة الشيفت بالوقت الحقيقي مع RPCs ذرية للفتح والإغلاق",
    "إضافة إشعارات PWA وإرسال realtime بنظام outbox",
    "تطبيق تدفقات الفوترة والاشتراك والموافقة على الأرشفة",
    "بناء بوابة السوبر أدمن (نظرة عامة، المقاهي، صندوق الدعم، المال)"
  ]'::jsonb,

  '[
    {
      "q": {"en": "How does multi-tenancy work?", "ar": "كيف يعمل تعدد المستأجرين؟"},
      "a": {"en": "A control-plane database routes each request to the correct operational shard using app.current_cafe_id(). RLS policies enforce strict tenant isolation.", "ar": "قاعدة بيانات control-plane توجه كل طلب إلى الشارد التشغيلي الصحيح عبر app.current_cafe_id(). سياسات RLS تفرض العزل الصارم للمستأجرين."}
    },
    {
      "q": {"en": "How are historical reports protected?", "ar": "كيف تُحمى التقارير التاريخية؟"},
      "a": {"en": "The archive flow requires two approval secrets before deleting runtime detail. Post-archive verification asserts that deferred finance remains outside the archive schema.", "ar": "تتطلب عملية الأرشفة سرين للموافقة قبل حذف التفاصيل التشغيلية. يتحقق الفحص البعدي من بقاء المالية المؤجلة خارج مخطط الأرشيف."}
    },
    {
      "q": {"en": "What roles does the system support?", "ar": "ما الأدوار التي يدعمها النظام؟"},
      "a": {"en": "Owner, branch manager, supervisor, barista, shisha, and platform super-admin — each with distinct RLS policies and UI surfaces.", "ar": "مالك، مدير فرع، مشرف، باريستا، معلم شيشة، وسوبر أدمن للمنصة — لكل منهم سياسات RLS وواجهات مستقلة."}
    }
  ]'::jsonb,

  'Three-database multi-tenant topology, 80+ Supabase migrations, role-based RLS, real-time shift management, PWA push notifications, archive approval flow, and a platform super-admin portal.',
  'بنية SaaS ثلاثية قواعد البيانات، 80+ migration في Supabase، صلاحيات RLS متدرجة، إدارة شيفت بالوقت الحقيقي، إشعارات PWA، خط أرشفة مع موافقات، وبوابة سوبر أدمن.',

  'Building a production-grade multi-tenant SaaS with strict database isolation, ordered migration chains, and a real-time operational layer.',
  'بناء SaaS متعدد المستأجرين بمعايير الإنتاج مع عزل صارم لقواعد البيانات وسلاسل migration مرتبة وطبقة تشغيلية بالوقت الحقيقي.',

  'Full-stack architecture, database design, RLS authoring, realtime, PWA, billing, and deployment.',
  'معمارية full-stack، تصميم قاعدة البيانات، صياغة RLS، realtime، PWA، فوترة، ونشر.'
);


-- ────────────────────────────────────────────────────────────
--  PROJECT 7 — Arab Anglais (بورتفوليو ثنائي اللغة)
-- ────────────────────────────────────────────────────────────
INSERT INTO projects (
  universe, slug, status, featured,
  name_en, name_ar,
  tagline_en, tagline_ar,
  description_en, description_ar,
  focus_keyword_en, focus_keyword_ar,
  seo_title_en, seo_title_ar,
  seo_description_en, seo_description_ar,
  tech_stack, tags,
  repo_url, live_url, screens,
  case_study_problem_en, case_study_problem_ar,
  case_study_solution_en, case_study_solution_ar,
  case_study_outcome_en, case_study_outcome_ar,
  case_study_role_en, case_study_role_ar,
  case_study_stack_en, case_study_stack_ar,
  case_study_steps_en, case_study_steps_ar,
  faqs,
  highlight_key_points_en, highlight_key_points_ar,
  highlight_focus_en, highlight_focus_ar,
  highlight_role_en, highlight_role_ar
) VALUES (
  7, 'arab-anglais-portfolio', 'published', true,

  'Arab Anglais — Bilingual Agency Portfolio',
  'Arab Anglais — بورتفوليو وكالة ثنائي اللغة',

  'Full-stack bilingual agency site (AR/EN) with a headless CMS admin panel, drag-and-drop works gallery, team management, and Supabase-powered live data.',
  'موقع وكالة ثنائي اللغة (عربي/إنجليزي) بنظام إدارة محتوى headless، معرض أعمال بالسحب والإفلات، إدارة الفريق، وبيانات حية مدعومة بـ Supabase.',

  'Arab Anglais is a production bilingual agency portfolio built with React 18, Vite, Tailwind CSS, and Supabase as the backend. It features a full public-facing site (Home, Services, Works, Team, About, Contact) and a password-protected admin panel where the agency can manage every piece of content: services with ordered categories, portfolio works with drag-and-drop reordering, team members, page content, site settings, and incoming contact messages — all without touching code.',
  'Arab Anglais هو موقع وكالة ثنائي اللغة مبني بـ React 18 وVite وTailwind CSS وSupabase كباك إند. يضم موقعاً عاماً كاملاً (الرئيسية، الخدمات، الأعمال، الفريق، عنّا، تواصل) ولوحة إدارة محمية بكلمة سر تتيح للوكالة إدارة كل محتوى: خدمات بتصنيفات مرتبة، معرض أعمال بإعادة الترتيب بالسحب والإفلات، أعضاء الفريق، محتوى الصفحات، إعدادات الموقع، ورسائل التواصل الواردة — كل ذلك دون لمس الكود.',

  'bilingual agency portfolio', 'بورتفوليو وكالة ثنائي اللغة',

  'Arab Anglais: Bilingual Agency Portfolio Case Study', 'Arab Anglais: دراسة حالة بورتفوليو وكالة ثنائي اللغة',

  'Bilingual AR/EN agency portfolio with a headless CMS admin panel, Supabase backend, and drag-and-drop works management.',
  'بورتفوليو وكالة ثنائي اللغة عربي/إنجليزي بلوحة إدارة CMS وباك إند Supabase وإدارة أعمال بالسحب والإفلات.',

  '[
    "React 18", "Vite", "Tailwind CSS", "Supabase",
    "React Router v6", "TanStack Query", "React Hook Form",
    "Radix UI", "shadcn/ui", "@hello-pangea/dnd", "Sonner"
  ]'::jsonb,

  '["portfolio", "bilingual", "cms", "fullstack", "frontend", "supabase"]'::jsonb,

  'https://github.com/Mohamed-El-Hussainy-gitme/arab-anglais',
  null,
  '[]'::jsonb,

  'Agencies needed a bilingual (AR/EN) online presence where non-technical staff could update works, services, team members, and page content without developer intervention.',
  'كانت الوكالات بحاجة إلى حضور رقمي ثنائي اللغة يمكّن الموظفين غير التقنيين من تحديث الأعمال والخدمات وأعضاء الفريق ومحتوى الصفحات دون تدخل المطور.',

  'Built a headless CMS approach using Supabase as the data layer and a React admin panel as the editor. Drag-and-drop reordering for works, CRUD managers for every entity, and a keep-alive strategy to prevent cold-starts on the free tier.',
  'بنيت نهج CMS بدون رأس باستخدام Supabase كطبقة بيانات ولوحة إدارة React كمحرر. السحب والإفلات لإعادة ترتيب الأعمال، مديرو CRUD لكل كيان، واستراتيجية keep-alive لمنع Cold Start على الطبقة المجانية.',

  'A live bilingual agency site where the team manages all content from a single admin panel, with instant public updates via TanStack Query cache invalidation.',
  'موقع وكالة ثنائي اللغة حي يدير فيه الفريق كل المحتوى من لوحة إدارة واحدة مع تحديثات فورية عبر إبطال cache بـ TanStack Query.',

  'Full-stack build: React SPA, Supabase schema, RLS policies, admin panel, drag-and-drop, and deployment.',
  'بناء full-stack: React SPA، مخطط Supabase، سياسات RLS، لوحة الإدارة، السحب والإفلات، والنشر.',

  'React 18 • Vite • Tailwind CSS • Supabase • React Router v6 • TanStack Query • shadcn/ui • @hello-pangea/dnd',
  'React 18 • Vite • Tailwind CSS • Supabase • React Router v6 • TanStack Query • shadcn/ui • @hello-pangea/dnd',

  '[
    "Design bilingual database schema (categories, services, works, team, settings)",
    "Implement Supabase RLS for public-read / admin-write separation",
    "Build public site: Home with stats, Services, Works gallery, Team, About, Contact",
    "Build admin panel with CRUD managers for all entities",
    "Add drag-and-drop reordering for works with @hello-pangea/dnd",
    "Implement keep-alive strategy and data prefetching for performance",
    "Deploy and configure Supabase storage for media uploads"
  ]'::jsonb,
  '[
    "تصميم مخطط قاعدة البيانات ثنائي اللغة (تصنيفات، خدمات، أعمال، فريق، إعدادات)",
    "تطبيق RLS في Supabase للفصل بين القراءة العامة والكتابة الإدارية",
    "بناء الموقع العام: الرئيسية مع إحصاءات، الخدمات، معرض الأعمال، الفريق، عنّا، تواصل",
    "بناء لوحة الإدارة مع مديري CRUD لكل الكيانات",
    "إضافة إعادة الترتيب بالسحب والإفلات للأعمال بـ @hello-pangea/dnd",
    "تطبيق استراتيجية keep-alive والجلب المسبق للبيانات لتحسين الأداء",
    "النشر وإعداد Supabase storage لرفع الوسائط"
  ]'::jsonb,

  '[
    {
      "q": {"en": "How is bilingual content handled?", "ar": "كيف يُعالج المحتوى ثنائي اللغة؟"},
      "a": {"en": "Each content entity stores separate AR and EN fields. A LanguageContext hook switches the active locale across the entire site.", "ar": "كل كيان محتوى يخزن حقولاً منفصلة للعربية والإنجليزية. خطاف LanguageContext يبدّل اللغة النشطة عبر الموقع بالكامل."}
    },
    {
      "q": {"en": "Can the admin reorder works?", "ar": "هل يمكن للمدير إعادة ترتيب الأعمال؟"},
      "a": {"en": "Yes. The works gallery supports drag-and-drop reordering using @hello-pangea/dnd, with the new order persisted to Supabase.", "ar": "نعم. معرض الأعمال يدعم إعادة الترتيب بالسحب والإفلات بـ @hello-pangea/dnd مع حفظ الترتيب الجديد في Supabase."}
    },
    {
      "q": {"en": "How is the free-tier cold start handled?", "ar": "كيف تُعالج مشكلة Cold Start للطبقة المجانية؟"},
      "a": {"en": "A keep-alive script pings Supabase at regular intervals to keep the connection warm and avoid cold start delays for visitors.", "ar": "سكريبت keep-alive يرسل ping إلى Supabase على فترات منتظمة لإبقاء الاتصال دافئاً وتجنب تأخيرات Cold Start للزوار."}
    }
  ]'::jsonb,

  'Bilingual AR/EN content model, headless CMS admin panel, drag-and-drop works gallery, Supabase RLS, keep-alive strategy, and full CRUD for all agency content.',
  'نموذج محتوى ثنائي اللغة، لوحة إدارة CMS، معرض أعمال بالسحب والإفلات، RLS في Supabase، استراتيجية keep-alive، وCRUD كامل لمحتوى الوكالة.',

  'Delivering a fully editable bilingual agency site where non-technical staff control all content through a clean admin panel.',
  'تقديم موقع وكالة ثنائي اللغة قابل للتحرير بالكامل حيث يتحكم الموظفون غير التقنيين في كل المحتوى من لوحة إدارة أنيقة.',

  'Full-stack design and implementation: schema, RLS, public site, and admin panel.',
  'تصميم وتنفيذ full-stack: المخطط، RLS، الموقع العام، ولوحة الإدارة.'
);


-- ────────────────────────────────────────────────────────────
--  PROJECT 8 — BCC Commercial (موقع شركة هدايا فاخرة)
-- ────────────────────────────────────────────────────────────
INSERT INTO projects (
  universe, slug, status, featured,
  name_en, name_ar,
  tagline_en, tagline_ar,
  description_en, description_ar,
  focus_keyword_en, focus_keyword_ar,
  seo_title_en, seo_title_ar,
  seo_description_en, seo_description_ar,
  tech_stack, tags,
  repo_url, live_url, screens,
  case_study_problem_en, case_study_problem_ar,
  case_study_solution_en, case_study_solution_ar,
  case_study_outcome_en, case_study_outcome_ar,
  case_study_role_en, case_study_role_ar,
  case_study_stack_en, case_study_stack_ar,
  case_study_steps_en, case_study_steps_ar,
  faqs,
  highlight_key_points_en, highlight_key_points_ar,
  highlight_focus_en, highlight_focus_ar,
  highlight_role_en, highlight_role_ar
) VALUES (
  8, 'bcc-commercial', 'published', true,

  'BCC Commercial — Luxury Gifts & Corporate Solutions',
  'البنط التجارية — هدايا فاخرة وحلول مؤسسية',

  'Corporate website for a Saudi luxury-gifts and events company, featuring an animated hero, a Supabase-powered CMS with admin panel, a blog, lazy-loaded image galleries, and dark/light mode.',
  'موقع شركة سعودية للهدايا الفاخرة والفعاليات المؤسسية، يتضمن هيرو متحرك، نظام CMS مدعوم بـ Supabase مع لوحة إدارة، مدونة، معارض صور بالتحميل الكسول، ووضع داكن وفاتح.',

  'BCC Commercial is a full-stack corporate website built for a Saudi luxury-gifts and office-furniture company. Built with React 18, Vite, Framer Motion, and Supabase, it presents the company''s eight service lines (promotional gifts, luxury custom gifts, golden and silver swords, event and exhibition services, corporate furniture, outdoor branding, photography, and screen printing) through animated service cards with multi-image carousels. A Supabase-backed CMS admin panel lets the team manage services, works gallery, blog posts, banners, clients, and all page content including hero sections and About page. The site includes an SEO-optimized blog with rich article sections, a Lumina interactive component, and a keep-alive mechanism for free-tier reliability.',
  'البنط التجارية هو موقع شركة سعودية متكامل للهدايا الفاخرة والأثاث المكتبي. مبني بـ React 18 وVite وFramer Motion وSupabase، يقدم ثماني خطوط خدمة (هدايا دعائية، هدايا فاخرة حسب الطلب، سيوف وخناجر ذهبية وفضية، خدمات فعاليات ومعارض، أثاث مكتبي، إعلانات خارجية، تصوير، وطباعة شاشة) عبر بطاقات خدمة متحركة مع كاروسيلات صور متعددة. لوحة إدارة CMS مدعومة بـ Supabase تتيح للفريق إدارة الخدمات والأعمال والمدونة والبانرات والعملاء وكل محتوى الصفحات. الموقع يضم مدونة محسّنة لـ SEO مع أقسام مقالات غنية ومكوّن Lumina تفاعلي وآلية keep-alive.',

  'luxury gifts corporate website Saudi Arabia', 'موقع شركة هدايا فاخرة السعودية',

  'BCC Commercial: Luxury Gifts & Corporate Solutions Website', 'البنط التجارية: موقع الهدايا الفاخرة والحلول المؤسسية',

  'Animated corporate website for a Saudi luxury-gifts company with a Supabase CMS, service galleries, blog, and admin panel.',
  'موقع شركة سعودية للهدايا الفاخرة مع Supabase CMS ومعارض خدمات ومدونة ولوحة إدارة.',

  '[
    "React 18", "Vite", "Tailwind CSS", "Supabase",
    "Framer Motion", "React Router v6", "TanStack Query",
    "shadcn/ui", "Radix UI", "react-helmet-async",
    "React Hook Form", "Sonner"
  ]'::jsonb,

  '["corporate", "cms", "fullstack", "frontend", "animation", "supabase", "blog"]'::jsonb,

  'https://github.com/Mohamed-El-Hussainy-gitme/bcc-commercial',
  null,
  '[]'::jsonb,

  'A Saudi luxury-gifts and corporate-events company needed a professional online presence that showcased their eight service lines with rich photo galleries, published a company blog, and allowed non-technical staff to update all content independently.',
  'كانت شركة سعودية للهدايا الفاخرة والفعاليات المؤسسية بحاجة إلى حضور رقمي احترافي يعرض ثماني خطوط خدمة بمعارض صور غنية وينشر مدونة الشركة ويتيح للموظفين غير التقنيين تحديث المحتوى باستقلالية.',

  'Built an animated service showcase with multi-image carousels per service, a Supabase CMS for all content, a structured blog with rich article sections, lazy-loaded images for performance, and a full admin panel covering services, works, blog, banners, clients, and page content.',
  'بنيت واجهة خدمات متحركة مع كاروسيلات صور متعددة لكل خدمة، وCMS بـ Supabase لكل المحتوى، ومدونة منظمة بأقسام مقالات غنية، وصور بالتحميل الكسول للأداء، ولوحة إدارة كاملة تغطي الخدمات والأعمال والمدونة والبانرات والعملاء ومحتوى الصفحات.',

  'A fully editable corporate website that presents all service lines with animated galleries, gives the team complete content control from the admin panel, and maintains fast load times through lazy loading and code splitting.',
  'موقع شركة قابل للتحرير بالكامل يعرض جميع خطوط الخدمة بمعارض متحركة، ويمنح الفريق التحكم الكامل في المحتوى من لوحة الإدارة، ويحافظ على سرعة التحميل عبر التحميل الكسول وتقسيم الكود.',

  'Full-stack build: React SPA, Supabase schema and storage, Framer Motion animations, blog engine, admin panel, and deployment.',
  'بناء full-stack: React SPA، مخطط Supabase والتخزين، حركات Framer Motion، محرك المدونة، لوحة الإدارة، والنشر.',

  'React 18 • Vite • Tailwind CSS • Supabase • Framer Motion • TanStack Query • shadcn/ui • react-helmet-async',
  'React 18 • Vite • Tailwind CSS • Supabase • Framer Motion • TanStack Query • shadcn/ui • react-helmet-async',

  '[
    "Design Supabase schema for services, works, blog, banners, clients, and site settings",
    "Build animated hero with floating logo and stats section",
    "Implement service cards with multi-image carousels and Framer Motion transitions",
    "Build blog engine with rich article sections and SEO meta tags",
    "Develop admin panel: services, works gallery, blog, banners, clients, contact, and page editors",
    "Add lazy-loaded images, code splitting, and keep-alive for performance",
    "Implement dark/light mode with ThemeProvider"
  ]'::jsonb,
  '[
    "تصميم مخطط Supabase للخدمات والأعمال والمدونة والبانرات والعملاء وإعدادات الموقع",
    "بناء هيرو متحرك مع شعار عائم وقسم إحصاءات",
    "تنفيذ بطاقات خدمة مع كاروسيلات صور متعددة وانتقالات Framer Motion",
    "بناء محرك مدونة بأقسام مقالات غنية وعلامات SEO",
    "تطوير لوحة الإدارة: خدمات، معرض أعمال، مدونة، بانرات، عملاء، تواصل، ومحررات صفحات",
    "إضافة صور بالتحميل الكسول وتقسيم الكود وkeep-alive للأداء",
    "تطبيق الوضع الداكن/الفاتح بـ ThemeProvider"
  ]'::jsonb,

  '[
    {
      "q": {"en": "What services does the site showcase?", "ar": "ما الخدمات التي يعرضها الموقع؟"},
      "a": {"en": "Eight service lines: promotional gifts, luxury custom gifts, golden and silver swords/daggers, events and exhibitions, corporate furniture, outdoor branding, photography, and screen printing.", "ar": "ثماني خطوط خدمة: هدايا دعائية، هدايا فاخرة حسب الطلب، سيوف وخناجر ذهبية وفضية، فعاليات ومعارض، أثاث مكتبي، إعلانات خارجية، تصوير، وطباعة شاشة."}
    },
    {
      "q": {"en": "How is content managed?", "ar": "كيف يُدار المحتوى؟"},
      "a": {"en": "All content is managed through a Supabase-backed admin panel. No code changes are needed to update services, works, blog posts, banners, or page text.", "ar": "كل المحتوى يُدار عبر لوحة إدارة مدعومة بـ Supabase. لا حاجة لتغييرات في الكود لتحديث الخدمات أو الأعمال أو المقالات أو البانرات أو نصوص الصفحات."}
    },
    {
      "q": {"en": "Is the site bilingual?", "ar": "هل الموقع ثنائي اللغة؟"},
      "a": {"en": "The primary language is Arabic targeting a Saudi audience, with the UI components and admin panel supporting English for the management team.", "ar": "اللغة الأساسية عربية تستهدف الجمهور السعودي، مع دعم مكونات الواجهة ولوحة الإدارة للإنجليزية للفريق الإداري."}
    }
  ]'::jsonb,

  'Animated multi-image service galleries, Supabase CMS with full admin panel, SEO blog engine, lazy loading, dark/light mode, and code splitting.',
  'معارض خدمات متحركة متعددة الصور، CMS بـ Supabase مع لوحة إدارة كاملة، محرك مدونة SEO، تحميل كسول، وضع داكن/فاتح، وتقسيم كود.',

  'Presenting eight luxury service lines with rich animated galleries while keeping all content fully editable by non-technical staff.',
  'عرض ثماني خطوط خدمة فاخرة بمعارض متحركة غنية مع إبقاء كل المحتوى قابلاً للتحرير من قبل الموظفين غير التقنيين.',

  'Full-stack build: UI design, animation, CMS, blog engine, admin panel, and deployment.',
  'بناء full-stack: تصميم الواجهة، الحركة، CMS، محرك المدونة، لوحة الإدارة، والنشر.'
);


-- ────────────────────────────────────────────────────────────
--  PROJECT 9 — Smart CRM (نظام إدارة العملاء الذكي)
-- ────────────────────────────────────────────────────────────
INSERT INTO projects (
  universe, slug, status, featured,
  name_en, name_ar,
  tagline_en, tagline_ar,
  description_en, description_ar,
  focus_keyword_en, focus_keyword_ar,
  seo_title_en, seo_title_ar,
  seo_description_en, seo_description_ar,
  tech_stack, tags,
  repo_url, live_url, screens,
  case_study_problem_en, case_study_problem_ar,
  case_study_solution_en, case_study_solution_ar,
  case_study_outcome_en, case_study_outcome_ar,
  case_study_role_en, case_study_role_ar,
  case_study_stack_en, case_study_stack_ar,
  case_study_steps_en, case_study_steps_ar,
  faqs,
  highlight_key_points_en, highlight_key_points_ar,
  highlight_focus_en, highlight_focus_ar,
  highlight_role_en, highlight_role_ar
) VALUES (
  9, 'smart-crm', 'published', true,

  'Smart CRM — AI-Powered Sales Intelligence Platform',
  'Smart CRM — منصة ذكاء مبيعات بالذكاء الاصطناعي',

  'Full-stack CRM monorepo with a Cloudflare Workers backend, Next.js frontend, AI-powered lead capture from Google Maps, contact intelligence scoring, deal pipeline, WhatsApp integration, and role-based access.',
  'CRM متكامل monorepo بباك إند Cloudflare Workers وواجهة Next.js وأداة استخراج عملاء محتملين من خرائط جوجل بالذكاء الاصطناعي، وتسجيل ذكاء جهات الاتصال، وخط صفقات، وتكامل واتساب، وصلاحيات متدرجة.',

  'Smart CRM is a full-stack sales intelligence platform built as a TypeScript monorepo (shared, backend, web). The backend runs as a Cloudflare Worker with a hand-rolled router (no framework), Supabase as the database, and cookie-based session auth. Key features: AI-powered acquisition from Google Maps URLs (phone extraction, location normalization, duplicate detection, confidence scoring), an 8-stage contact pipeline (LEAD → CLIENT), deal lifecycle management with 7 stages, automated follow-up scheduling, call logging, WhatsApp broadcast automation, payment tracking, company profiles, a task system with FOLLOW_UP/CALL/WHATSAPP/MEETING/PAYMENT/GENERAL types, a notification center, an audit trail, and an intelligence engine that scores contacts by momentum (HOT/WARM/COLD) and risk, surfacing hot leads and rescue lists.',
  'Smart CRM هو منصة ذكاء مبيعات متكاملة مبنية كـ TypeScript monorepo (shared, backend, web). الباك إند يعمل كـ Cloudflare Worker بـ router مكتوب يدوياً بدون إطار عمل، وSupabase كقاعدة بيانات، وجلسات مبنية على الكوكيز. الميزات الرئيسية: استخراج عملاء محتملين من روابط خرائط جوجل بالذكاء الاصطناعي (استخراج أرقام الهاتف، تطبيع الموقع، كشف المكررات، تسجيل الثقة)، خط اتصال ثماني مراحل (LEAD → CLIENT)، إدارة دورة حياة الصفقات بـ 7 مراحل، جدولة المتابعة التلقائية، تسجيل المكالمات، أتمتة بث واتساب، تتبع المدفوعات، ملفات الشركات، نظام مهام بأنواع متعددة، مركز إشعارات، سجل تدقيق، ومحرك ذكاء يسجّل جهات الاتصال حسب الزخم (ساخن/دافئ/بارد) والمخاطر.',

  'AI CRM sales intelligence platform', 'منصة CRM ذكاء مبيعات بالذكاء الاصطناعي',

  'Smart CRM: AI-Powered Sales Intelligence Platform Case Study', 'Smart CRM: دراسة حالة منصة ذكاء المبيعات بالذكاء الاصطناعي',

  'Full-stack TypeScript CRM with AI lead capture from Google Maps, 8-stage contact pipeline, deal management, WhatsApp automation, and contact intelligence scoring.',
  'CRM TypeScript متكامل مع استخراج عملاء بالذكاء الاصطناعي من خرائط جوجل، خط اتصال ثماني مراحل، إدارة صفقات، أتمتة واتساب، وتسجيل ذكاء جهات الاتصال.',

  '[
    "TypeScript", "Next.js", "Cloudflare Workers", "Supabase",
    "PostgreSQL", "Zod", "React", "Tailwind CSS",
    "cookie-based auth", "AI / NLP"
  ]'::jsonb,

  '["crm", "saas", "fullstack", "ai", "backend", "typescript", "cloudflare"]'::jsonb,

  'https://github.com/Mohamed-El-Hussainy-gitme/smart-crm',
  null,
  '[]'::jsonb,

  'Sales teams wasted hours manually entering leads from Google Maps searches, had no unified view of deal progress across pipeline stages, and lacked automated intelligence to prioritize follow-ups and identify at-risk contacts.',
  'كانت فرق المبيعات تضيع ساعات في إدخال العملاء المحتملين يدوياً من بحثات خرائط جوجل، وتفتقر إلى رؤية موحدة لتقدم الصفقات عبر مراحل الخط، وتخلو من ذكاء آلي لتحديد أولويات المتابعة وتحديد جهات الاتصال المعرضة للخطر.',

  'Built an AI acquisition pipeline that parses Google Maps URLs to extract phone numbers, normalize locations (area, city, coordinates), detect duplicates, and score lead confidence. Layered an 8-stage contact pipeline, 7-stage deal lifecycle, automated follow-up scheduler, and an intelligence engine that computes momentum scores and risk levels for every contact.',
  'بنيت خط استخراج بالذكاء الاصطناعي يحلل روابط خرائط جوجل لاستخراج أرقام الهاتف وتطبيع المواقع (منطقة، مدينة، إحداثيات) وكشف المكررات وتسجيل ثقة العميل المحتمل. أضفت خط اتصال ثماني مراحل ودورة حياة صفقات بـ 7 مراحل وجدولة متابعة تلقائية ومحرك ذكاء يحسب درجات الزخم ومستويات المخاطر لكل جهة اتصال.',

  'Sales reps can drop a Google Maps URL and get a pre-filled, de-duplicated lead in seconds. The intelligence dashboard surfaces hot leads and rescue lists so managers always know where to focus, and WhatsApp automation keeps follow-up cadences on track.',
  'يمكن لمندوبي المبيعات إسقاط رابط خرائط جوجل والحصول على عميل محتمل مُعبأ مسبقاً وخالٍ من التكرار في ثوانٍ. لوحة الذكاء تعرض العملاء الساخنين وقوائم الإنقاذ حتى يعرف المديرون دائماً أين يركزون، وأتمتة واتساب تبقي إيقاعات المتابعة على المسار الصحيح.',

  'Full-stack architecture: Cloudflare Workers backend with hand-rolled router, Supabase schema, AI acquisition pipeline, intelligence engine, Next.js frontend, and role-based access (VIEWER / SALES_REP / SALES_MANAGER / ADMIN).',
  'معمارية full-stack: باك إند Cloudflare Workers بـ router مكتوب يدوياً، مخطط Supabase، خط استخراج بالذكاء الاصطناعي، محرك ذكاء، واجهة Next.js، وصلاحيات متدرجة (مشاهد / مندوب / مدير / أدمن).',

  'TypeScript • Cloudflare Workers • Next.js • Supabase (PostgreSQL) • Zod • cookie-based sessions • AI / NLP pipeline',
  'TypeScript • Cloudflare Workers • Next.js • Supabase (PostgreSQL) • Zod • جلسات مبنية على الكوكيز • خط معالجة AI/NLP',

  '[
    "Design TypeScript monorepo (shared types/schemas, backend Worker, Next.js frontend)",
    "Build hand-rolled Cloudflare Worker router with cookie session auth",
    "Implement AI acquisition pipeline: phone extraction, location normalization, duplicate detection",
    "Build 8-stage contact pipeline and 7-stage deal lifecycle",
    "Implement follow-up scheduler, call logging, and WhatsApp broadcast automation",
    "Build intelligence engine: momentum scoring (HOT/WARM/COLD), risk assessment, hot leads and rescue lists",
    "Add company profiles, payment tracking, audit trail, and notification center",
    "Build Next.js frontend with role-based access (VIEWER/SALES_REP/SALES_MANAGER/ADMIN)"
  ]'::jsonb,
  '[
    "تصميم monorepo بـ TypeScript (أنواع/مخططات مشتركة، باك إند Worker، واجهة Next.js)",
    "بناء router Cloudflare Worker مكتوب يدوياً مع مصادقة جلسة مبنية على الكوكيز",
    "تطبيق خط استخراج AI: استخراج أرقام الهاتف، تطبيع الموقع، كشف المكررات",
    "بناء خط اتصال ثماني مراحل ودورة حياة صفقات بـ 7 مراحل",
    "تطبيق جدولة المتابعة وتسجيل المكالمات وأتمتة بث واتساب",
    "بناء محرك الذكاء: تسجيل الزخم (ساخن/دافئ/بارد)، تقييم المخاطر، العملاء الساخنون وقوائم الإنقاذ",
    "إضافة ملفات الشركات وتتبع المدفوعات وسجل التدقيق ومركز الإشعارات",
    "بناء واجهة Next.js بصلاحيات متدرجة (مشاهد/مندوب/مدير/أدمن)"
  ]'::jsonb,

  '[
    {
      "q": {"en": "How does the AI lead capture work?", "ar": "كيف يعمل استخراج العملاء بالذكاء الاصطناعي؟"},
      "a": {"en": "Paste a Google Maps URL. The pipeline extracts phone numbers, normalizes the location into area/city/coordinates, detects duplicates by phone, and assigns a confidence score (HIGH/MEDIUM/LOW).", "ar": "الصق رابط خرائط جوجل. يستخرج الخط أرقام الهاتف ويطبّع الموقع إلى منطقة/مدينة/إحداثيات ويكشف المكررات بالهاتف ويعيّن درجة ثقة (عالية/متوسطة/منخفضة)."}
    },
    {
      "q": {"en": "What is the intelligence engine?", "ar": "ما هو محرك الذكاء؟"},
      "a": {"en": "It analyses each contact''s tasks, payments, deals, and last interaction to compute a momentum score (HOT/WARM/COLD) and risk level, surfacing hot leads and rescue lists on the dashboard.", "ar": "يحلل مهام وطلبات وصفقات وآخر تفاعل لكل جهة اتصال لحساب درجة زخم (ساخن/دافئ/بارد) ومستوى مخاطر، ويعرض العملاء الساخنين وقوائم الإنقاذ على لوحة التحكم."}
    },
    {
      "q": {"en": "Why Cloudflare Workers instead of a traditional server?", "ar": "لماذا Cloudflare Workers بدلاً من خادم تقليدي؟"},
      "a": {"en": "Workers run at the edge with near-zero cold start, globally distributed, and scale automatically — ideal for a CRM where response time matters for sales reps in the field.", "ar": "Workers تعمل على الحافة بدون تقريباً Cold Start، موزعة عالمياً وتتوسع تلقائياً — مثالية لـ CRM حيث زمن الاستجابة مهم لمندوبي المبيعات في الميدان."}
    }
  ]'::jsonb,

  'AI lead capture from Google Maps, 8-stage contact pipeline, 7-stage deal lifecycle, intelligence engine with momentum and risk scoring, WhatsApp automation, Cloudflare Workers backend, and role-based access.',
  'استخراج عملاء AI من خرائط جوجل، خط اتصال ثماني مراحل، دورة حياة صفقات بـ 7 مراحل، محرك ذكاء بتسجيل زخم ومخاطر، أتمتة واتساب، باك إند Cloudflare Workers، وصلاحيات متدرجة.',

  'Building an AI-powered acquisition pipeline and intelligence engine that turns raw Google Maps data into scored, de-duplicated leads with automated follow-up workflows.',
  'بناء خط استخراج بالذكاء الاصطناعي ومحرك ذكاء يحوّل بيانات خرائط جوجل الخام إلى عملاء محتملين مُسجَّلين وخالين من التكرار مع سير عمل متابعة تلقائي.',

  'Full-stack TypeScript monorepo: Cloudflare Worker backend, AI pipeline, intelligence engine, Next.js frontend, and RBAC.',
  'TypeScript monorepo متكامل: باك إند Cloudflare Worker، خط AI، محرك ذكاء، واجهة Next.js، وصلاحيات متدرجة.'
);


-- ────────────────────────────────────────────────────────────
--  PROJECT 10 — POS ERP (نقطة البيع + ERP)
-- ────────────────────────────────────────────────────────────
INSERT INTO projects (
  universe, slug, status, featured,
  name_en, name_ar,
  tagline_en, tagline_ar,
  description_en, description_ar,
  focus_keyword_en, focus_keyword_ar,
  seo_title_en, seo_title_ar,
  seo_description_en, seo_description_ar,
  tech_stack, tags,
  repo_url, live_url, screens,
  case_study_problem_en, case_study_problem_ar,
  case_study_solution_en, case_study_solution_ar,
  case_study_outcome_en, case_study_outcome_ar,
  case_study_role_en, case_study_role_ar,
  case_study_stack_en, case_study_stack_ar,
  case_study_steps_en, case_study_steps_ar,
  faqs,
  highlight_key_points_en, highlight_key_points_ar,
  highlight_focus_en, highlight_focus_ar,
  highlight_role_en, highlight_role_ar
) VALUES (
  10, 'pos-erp', 'published', true,

  'POS ERP — Restaurant & Retail Management System',
  'POS ERP — نظام إدارة المطاعم والمتاجر',

  'Full-stack point-of-sale and ERP system covering POS with barcode scanning and offline mode, inventory tracking, kitchen display, multi-branch management, employee scheduling, customer accounts, purchase orders, accounting, and analytics.',
  'نظام متكامل لنقطة البيع وإدارة الموارد يشمل POS مع مسح الباركود ووضع أوفلاين، تتبع المخزون، شاشة المطبخ، إدارة فروع متعددة، جداول الموظفين، حسابات العملاء، طلبات الشراء، محاسبة، وتحليلات.',

  'POS ERP is a comprehensive restaurant and retail management system built with React 18, Vite, and Supabase. The POS screen supports dine-in/takeaway/delivery order types, barcode scanner integration, multiple payment methods (cash, card, Apple Pay, STC Pay), order discounts, and offline mode with local storage fallback when the connection drops. Beyond the POS, the system includes: a product and category manager with inventory tracking and stock movement logs, a kitchen display system for order routing, a tables management module, a customer profiles system with deferred balances, a purchasing module for supplier purchase orders, a multi-branch management panel with employee scheduling, a full accounting view with revenue/tax/purchase reconciliation, and a KPI dashboard with area charts, bar charts, and pie charts powered by Recharts.',
  'POS ERP هو نظام شامل لإدارة المطاعم والمتاجر مبني بـ React 18 وVite وSupabase. شاشة POS تدعم أنواع الطلبات (داين إن، تيك أواي، توصيل)، تكامل ماسح الباركود، طرق دفع متعددة (نقداً، بطاقة، Apple Pay، STC Pay)، خصومات الطلبات، ووضع أوفلاين مع احتياطي التخزين المحلي عند انقطاع الاتصال. بجانب الـ POS، يشمل النظام: إدارة المنتجات والتصنيفات مع تتبع المخزون وسجلات حركة المخزون، نظام عرض المطبخ لتوجيه الطلبات، إدارة الطاولات، نظام ملفات العملاء مع الأرصدة المؤجلة، وحدة مشتريات لطلبات الموردين، لوحة إدارة فروع متعددة مع جداول الموظفين، عرض محاسبة كامل مع تسوية الإيرادات والضرائب والمشتريات، ولوحة KPI بمخططات مساحية وشريطية ودائرية مدعومة بـ Recharts.',

  'restaurant POS ERP system', 'نظام POS ERP للمطاعم',

  'POS ERP: Restaurant & Retail Management System Case Study', 'POS ERP: دراسة حالة نظام إدارة المطاعم والمتاجر',

  'Full-stack POS and ERP for restaurants with offline mode, barcode scanning, inventory, kitchen display, multi-branch, accounting, and analytics.',
  'POS وERP متكامل للمطاعم مع وضع أوفلاين، مسح باركود، مخزون، شاشة مطبخ، فروع متعددة، محاسبة، وتحليلات.',

  '[
    "React 18", "Vite", "Tailwind CSS", "Supabase",
    "TanStack Query", "Recharts", "React Router v6",
    "shadcn/ui", "Radix UI", "date-fns",
    "localStorage offline mode"
  ]'::jsonb,

  '["pos", "erp", "fullstack", "dashboard", "offline", "restaurant", "supabase"]'::jsonb,

  'https://github.com/Mohamed-El-Hussainy-gitme/pos-erp',
  null,
  '[]'::jsonb,

  'Restaurants and retail stores needed a unified system that could handle point-of-sale transactions (including offline scenarios), track inventory across multiple branches, route orders to the kitchen, manage employees and scheduling, and produce accounting and performance reports — without switching between multiple disconnected tools.',
  'كانت المطاعم والمتاجر بحاجة إلى نظام موحد قادر على معالجة معاملات نقطة البيع (بما فيها السيناريوهات الأوفلاين)، وتتبع المخزون عبر فروع متعددة، وتوجيه الطلبات للمطبخ، وإدارة الموظفين والجداول، وإنتاج تقارير محاسبية وأداء — دون التبديل بين أدوات متعددة منفصلة.',

  'Built a unified React SPA covering the full operational loop: POS with offline fallback and barcode scanning, inventory management with adjustment logs, kitchen display for order routing, customer profiles with deferred balances, a purchasing module, multi-branch management, employee scheduling, full accounting reconciliation, and a KPI dashboard with Recharts visualizations.',
  'بنيت SPA موحدة بـ React تغطي الحلقة التشغيلية الكاملة: POS مع احتياطي أوفلاين ومسح باركود، إدارة مخزون مع سجلات تعديل، شاشة مطبخ لتوجيه الطلبات، ملفات عملاء مع أرصدة مؤجلة، وحدة مشتريات، إدارة فروع متعددة، جداول موظفين، تسوية محاسبية كاملة، ولوحة KPI بمرئيات Recharts.',

  'A single system that covers the entire operational lifecycle from order intake to accounting close, works offline when connectivity drops, and gives managers real-time KPI visibility across all branches.',
  'نظام واحد يغطي دورة التشغيل الكاملة من استلام الطلب إلى الإغلاق المحاسبي، يعمل أوفلاين عند انقطاع الاتصال، ويمنح المديرين رؤية KPI بالوقت الحقيقي عبر جميع الفروع.',

  'Full-stack build: React SPA, Supabase schema (products, orders, inventory, customers, employees, branches, purchasing), offline mode, kitchen display, and analytics dashboard.',
  'بناء full-stack: React SPA، مخطط Supabase (منتجات، طلبات، مخزون، عملاء، موظفون، فروع، مشتريات)، وضع أوفلاين، شاشة مطبخ، ولوحة تحليلات.',

  'React 18 • Vite • Tailwind CSS • Supabase • TanStack Query • Recharts • shadcn/ui • date-fns • localStorage offline',
  'React 18 • Vite • Tailwind CSS • Supabase • TanStack Query • Recharts • shadcn/ui • date-fns • تخزين محلي أوفلاين',

  '[
    "Design Supabase schema: products, categories, orders, inventory, customers, employees, branches, purchase orders",
    "Build POS screen with dine-in/takeaway/delivery, barcode scanning, and multi-payment methods",
    "Implement offline mode with localStorage fallback and sync on reconnect",
    "Build inventory manager with stock adjustment logs and low-stock alerts",
    "Implement kitchen display system for order routing",
    "Build tables management, customer profiles with deferred balances, and purchasing module",
    "Add multi-branch management and employee scheduling",
    "Build accounting view with revenue/tax/purchase reconciliation",
    "Implement KPI dashboard with Recharts area, bar, and pie charts"
  ]'::jsonb,
  '[
    "تصميم مخطط Supabase: منتجات، تصنيفات، طلبات، مخزون، عملاء، موظفون، فروع، طلبات شراء",
    "بناء شاشة POS بأنواع طلبات (داين إن/تيك أواي/توصيل) ومسح باركود وطرق دفع متعددة",
    "تطبيق وضع أوفلاين مع احتياطي localStorage ومزامنة عند إعادة الاتصال",
    "بناء مدير المخزون مع سجلات تعديل المخزون وتنبيهات نفاد المخزون",
    "تطبيق نظام عرض المطبخ لتوجيه الطلبات",
    "بناء إدارة الطاولات وملفات العملاء مع الأرصدة المؤجلة ووحدة المشتريات",
    "إضافة إدارة فروع متعددة وجداول الموظفين",
    "بناء عرض المحاسبة مع تسوية الإيرادات والضرائب والمشتريات",
    "تطبيق لوحة KPI بمخططات Recharts مساحية وشريطية ودائرية"
  ]'::jsonb,

  '[
    {
      "q": {"en": "How does offline mode work?", "ar": "كيف يعمل وضع الأوفلاين؟"},
      "a": {"en": "When connectivity drops, new orders are saved to localStorage with a generated order number. An online status hook detects reconnection and syncs pending orders to Supabase.", "ar": "عند انقطاع الاتصال، تُحفظ الطلبات الجديدة في localStorage برقم طلب مُولَّد. خطاف حالة الاتصال يكتشف إعادة الاتصال ويزامن الطلبات المعلقة مع Supabase."}
    },
    {
      "q": {"en": "What payment methods are supported?", "ar": "ما طرق الدفع المدعومة؟"},
      "a": {"en": "Cash, card, Apple Pay, and STC Pay — selectable per order on the POS screen with split-payment support.", "ar": "نقداً، بطاقة، Apple Pay، وSTC Pay — قابلة للاختيار لكل طلب على شاشة POS مع دعم الدفع المقسّم."}
    },
    {
      "q": {"en": "Can it handle multiple branches?", "ar": "هل يدعم فروع متعددة؟"},
      "a": {"en": "Yes. The multi-branch panel lets managers set up branches, assign employees, manage schedules, and view per-branch KPIs from a single interface.", "ar": "نعم. لوحة الفروع المتعددة تتيح للمديرين إعداد الفروع وتعيين الموظفين وإدارة الجداول وعرض KPIs لكل فرع من واجهة واحدة."}
    }
  ]'::jsonb,

  'POS with offline mode and barcode scanning, inventory with adjustment logs, kitchen display, tables management, customer profiles with deferred balances, multi-branch management, employee scheduling, accounting reconciliation, and KPI dashboard.',
  'POS مع وضع أوفلاين ومسح باركود، مخزون مع سجلات تعديل، شاشة مطبخ، إدارة طاولات، ملفات عملاء مع أرصدة مؤجلة، إدارة فروع متعددة، جداول موظفين، تسوية محاسبية، ولوحة KPI.',

  'Building a complete operational loop from POS intake to accounting close, with offline resilience, multi-branch visibility, and real-time KPI analytics.',
  'بناء حلقة تشغيل كاملة من استلام POS إلى الإغلاق المحاسبي مع مرونة أوفلاين ورؤية فروع متعددة وتحليلات KPI بالوقت الحقيقي.',

  'Full-stack build: React SPA, Supabase schema, offline mode, kitchen display, multi-branch, accounting, and analytics.',
  'بناء full-stack: React SPA، مخطط Supabase، وضع أوفلاين، شاشة مطبخ، فروع متعددة، محاسبة، وتحليلات.'
);
