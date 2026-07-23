-- ============================================================
--  002_seed_data.sql
--  Mohamed El-Husseiny Portfolio — Initial Seed Data
--  Run AFTER 001_initial_schema.sql
-- ============================================================

-- ────────────────────────────────────────────────────────────
--  SITE SETTINGS
-- ────────────────────────────────────────────────────────────
insert into site_settings (
  "key", owner_name,
  tagline_en, tagline_ar,
  hero_heading_en, hero_heading_ar,
  hero_subheading_en, hero_subheading_ar,
  about_bio_en, about_bio_ar,
  email, phone_numbers, whatsapp, whatsapp_quote_message_en,
  github_url, linkedin_url, twitter_url,
  available_for_work, years_experience, projects_count,
  meta_title, meta_description
) values (
  'main', 'Mohamed El-Husseiny',
  'Web Developer Portfolio', 'معرض أعمال مطور ويب',
  'Engineering Scalable Web Solutions', 'بناء حلول ويب قابلة للتوسع',
  'I build company websites, landing pages, e-commerce, and dashboards — fast performance, technical SEO, and clean bilingual UX.',
  'أبني مواقع الشركات وصفحات الهبوط والمتاجر الإلكترونية ولوحات التحكم — أداء سريع وSEO تقني وتجربة مستخدم ثنائية اللغة.',
  'Hello! I''m Mohamed El Hussainy, a passionate Full Stack Web Developer with over one year of experience. I excel in collaborative teamwork and believe that working closely with clients leads to the best results. My goal is to develop modern, mobile-responsive, and fully functional websites that enhance your company''s digital presence.',
  'مرحباً! أنا محمد الحسيني، مطور ويب متكامل شغوف بأكثر من عام من الخبرة. أتميز في العمل الجماعي وأؤمن بأن التعاون الوثيق مع العملاء يؤدي إلى أفضل النتائج.',
  'mohamed.noda.b2@gmail.com',
  '["+201018557413"]',
  '201018557413',
  'Hi Mohamed, I''m interested in website development. Project type: [company/e-commerce/dashboard]. Pages: [number]. Language: [Arabic/English]. Goal: [increase sales/collect leads]. Target date: [date]. I''d like a quote.',
  'https://github.com/Mohamed-El-Hussainy-gitme',
  'https://www.linkedin.com/in/mohamed-el-hussainy',
  '',
  true, 1, 34,
  'Mohamed El-Husseiny — Full Stack Web Developer',
  'Full Stack Web Developer building fast, SEO-ready, bilingual websites. React, Next.js, WordPress, E-commerce.'
)
on conflict ("key") do update set
  owner_name = excluded.owner_name,
  tagline_en = excluded.tagline_en,
  tagline_ar = excluded.tagline_ar,
  hero_heading_en = excluded.hero_heading_en,
  hero_heading_ar = excluded.hero_heading_ar,
  hero_subheading_en = excluded.hero_subheading_en,
  hero_subheading_ar = excluded.hero_subheading_ar,
  about_bio_en = excluded.about_bio_en,
  about_bio_ar = excluded.about_bio_ar,
  email = excluded.email,
  phone_numbers = excluded.phone_numbers,
  whatsapp = excluded.whatsapp,
  whatsapp_quote_message_en = excluded.whatsapp_quote_message_en,
  github_url = excluded.github_url,
  linkedin_url = excluded.linkedin_url,
  twitter_url = excluded.twitter_url,
  available_for_work = excluded.available_for_work,
  years_experience = excluded.years_experience,
  projects_count = excluded.projects_count,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description;

-- ────────────────────────────────────────────────────────────
--  PROJECTS  (9 projects)
-- ────────────────────────────────────────────────────────────
insert into projects (
  universe, slug, status, featured,
  name_en, name_ar, tagline_en, tagline_ar,
  tech_stack, tags, repo_url, live_url, screens,
  case_study_problem_en, case_study_solution_en, case_study_outcome_en
) values

-- 1 Mini Shop
(1, 'project-1', 'published', false,
 'Mini Shop – Single Page Store', 'Mini Shop – متجر صفحة واحدة',
 'Single-page Arabic storefront with cart and checkout, built in pure HTML, CSS, and JavaScript.',
 'متجر صفحة واحدة باللغة العربية مع سلة شراء وخطوة دفع، مبني بالكامل باستخدام HTML وCSS وJavaScript.',
 '["HTML","CSS","JavaScript"]', '["ecommerce","frontend","ui"]',
 'https://github.com/Mohamed-El-Hussainy-gitme/single-page-website',
 'https://mohamed-el-hussainy-gitme.github.io/single-page-website/',
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/project1/Screenshot%202025-11-27%20151701.png","alt":"Mini Shop hero and product grid"}]',
 'Users needed a quick single-page store experience in Arabic where product browsing, cart, and checkout feel immediate without multi-page complexity.',
 'Built a single scrolling layout that keeps product grid, cart, and checkout in one flow, with clear CTA and predictable UI states.',
 'A clean demo for single-page store UX that proves layout, cart interactions, and checkout clarity on desktop and mobile.'),

-- 2 Real Estate UI
(2, 'project-2', 'published', true,
 'Real Estate UI', 'Real Estate UI',
 'Arabic RTL real estate interface with advanced filters, dark mode, map, and detailed property pages.',
 'واجهة عقارات عربية باتجاه RTL مع فلاتر متقدمة، وضع داكن، خريطة تفاعلية وصفحات تفاصيل كاملة.',
 '["React","Vite","Tailwind CSS","React Router","React Leaflet","Swiper"]',
 '["real-estate","map","frontend","ui","rtl"]',
 'https://github.com/Mohamed-El-Hussainy-gitme/real-estate-ui',
 'https://mohamed-el-hussainy-gitme.github.io/real-estate-ui/',
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/project2/Screenshot%202025-12-01%20003246.png","alt":"Real estate UI — hero and filters panel"}]',
 'Property browsing becomes slow when filters and map context are separate. Users needed faster comparison with RTL-first Arabic UI.',
 'Built an RTL-first search experience: advanced filters + text search + dedicated details page with gallery and live map context.',
 'A real estate UI that makes discovery and comparison faster, with clear details and map-based trust signals.'),

-- 3 Admin Control Dashboard
(3, 'project-3', 'published', true,
 'Admin Control Dashboard', 'لوحة تحكم إدارية',
 'Admin dashboard with analytics, users, orders, products, settings, notifications, and themes.',
 'لوحة تحكم إدارية مع تحليلات ومستخدمين وطلبات ومنتجات وإعدادات وإشعارات وثيمات.',
 '["React","Vite","TypeScript","Tailwind CSS"]',
 '["dashboard","admin","frontend"]',
 null, null,
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/project3/Screenshot%202025-12-02%20190940.png","alt":"Admin dashboard analytics overview"}]',
 'Businesses need a centralized interface to manage all operations without switching between tools.',
 'Built a full-featured admin dashboard with role-based access, analytics charts, and real-time data tables.',
 'A production-ready dashboard template with all the common admin features in one clean interface.'),

-- 4 Animation Studio
(4, 'project-4', 'published', false,
 'Animation Studio', 'Animation Studio',
 'Web-based animation editor with timeline, layers, live preview, and export to CSS, HTML, JSON, and React.',
 'محرر رسوم متحركة على الويب مع timeline وطبقات ومعاينة مباشرة وتصدير.',
 '["HTML","CSS","TypeScript","Framer Motion"]',
 '["animation","tool","frontend"]',
 null, null,
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/project4/Screenshot%202025-12-01%20222924.png","alt":"Animation Studio timeline and layers panel"}]',
 'Developers need a visual tool to create and export CSS animations without writing complex keyframe code manually.',
 'Built a browser-based animation editor with a timeline, layers panel, and live preview that exports clean code.',
 'A unique tool demonstrating advanced front-end engineering and creative problem-solving.'),

-- 5 HoloSpace OS
(5, 'project-5', 'published', true,
 'HoloSpace OS', 'HoloSpace OS',
 '3D web operating system with desktop, windows, music player, gallery, notes, and system settings.',
 'نظام تشغيل ثلاثي الأبعاد على الويب مع سطح مكتب ونوافذ ومشغل موسيقى.',
 '["React","Vite","TypeScript","Tailwind CSS","React Three Fiber"]',
 '["3d","creative","frontend"]',
 null, null,
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/project5/Screenshot%202025-12-06%20235132.png","alt":"HoloSpace OS 3D web desktop"}]',
 'Pushing the limits of what''s possible in a browser — creating an immersive 3D desktop environment that runs entirely on the web.',
 'Built a full 3D web OS using React Three Fiber with draggable windows, a music player, gallery, and system settings.',
 'A creative portfolio piece that demonstrates mastery of 3D web rendering, state management, and creative UI design.'),

-- 6 PulseReach Media
(6, 'project-6', 'published', false,
 'PulseReach Media Website', 'موقع PulseReach Media',
 'Conversion-focused bilingual landing pages for social media management packages (WordPress + coded templates).',
 'صفحات هبوط ثنائية اللغة تركز على التحويل لحزم إدارة وسائل التواصل الاجتماعي.',
 '["WordPress","PHP","Astra (Child Theme)","HTML5"]',
 '["wordpress","landing-page","seo"]',
 null, null,
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/project6/1.png","alt":"WordPress website Arabic hero and conversion layout"}]',
 'A social media agency needed a professional bilingual website that converts visitors into clients.',
 'Built a WordPress site with a custom child theme, optimized for bilingual Arabic/English content and conversion.',
 'A professional agency website with clear service pages, a conversion-focused layout, and strong SEO foundations.'),

-- 7 Arab Tourism Platform
(7, 'project-7', 'published', false,
 'Arab Tourism Platform', 'منصة السياحة العربية',
 'Arabic-first static tourism directory with an interactive SVG map, country theming, and rich landmark pages.',
 'دليل سياحي ثابت بالعربية أولاً مع خريطة SVG تفاعلية وصفحات معالم غنية.',
 '["Next.js (App Router)","React","Tailwind CSS","Static Export"]',
 '["tourism","next-js","seo"]',
 null, null,
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/project7/1.png","alt":"Tourism website home with SVG map"}]',
 'Arabic tourism content online is scattered, not structured. Users need a well-organized, fast, and searchable destination guide.',
 'Built a Next.js static export with an interactive SVG map, country-themed pages, and structured SEO metadata.',
 'A fast, fully static tourism directory that ranks for Arabic travel queries and demonstrates Next.js + SEO mastery.'),

-- 8 NODA E-commerce
(8, 'E-ecommerce-website-development', 'published', true,
 'NODA E-commerce Website Development', 'تطوير موقع NODA للتجارة الإلكترونية',
 'Full store + admin dashboard + database for operational speed.',
 'متجر كامل + لوحة تحكم إدارية + قاعدة بيانات للسرعة التشغيلية.',
 '["E-commerce","Admin Dashboard","Database"]',
 '["ecommerce","dashboard","fullstack"]',
 null, null,
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/E-commerce/1.png","alt":"NODA store UI"}]',
 'A business needed a full e-commerce solution with a product catalog, secure checkout, and an admin dashboard to manage orders.',
 'Delivered a complete e-commerce system: storefront, cart, checkout, and an admin dashboard with product and order management.',
 'A fully operational e-commerce system that reduced manual order management time and improved the customer purchase flow.'),

-- 9 GrowLik SEO
(9, 'growlik', 'published', false,
 'GrowLik SEO Optimization', 'تحسين SEO لـ GrowLik',
 'Technical SEO improvements for higher visibility and better snippets.',
 'تحسينات SEO تقنية لرؤية أعلى ومقتطفات أفضل.',
 '["SEO","Technical SEO","Schema"]',
 '["seo","performance"]',
 null, null,
 '[{"id":"s1","src":"https://elhussainy.pages.dev/assets/growlik/01.png","alt":"GrowLik page structure"}]',
 'GrowLik''s website was not appearing in search results despite having good content due to technical SEO issues.',
 'Audited and fixed technical SEO issues: structured data, canonical tags, sitemap, robots.txt, and Core Web Vitals.',
 'Improved search visibility, better rich snippets, and a healthier crawl budget after the technical SEO overhaul.')
on conflict (slug) do update set
  universe = excluded.universe,
  status = excluded.status,
  featured = excluded.featured,
  name_en = excluded.name_en,
  name_ar = excluded.name_ar,
  tagline_en = excluded.tagline_en,
  tagline_ar = excluded.tagline_ar,
  tech_stack = excluded.tech_stack,
  tags = excluded.tags,
  repo_url = excluded.repo_url,
  live_url = excluded.live_url,
  screens = excluded.screens,
  case_study_problem_en = excluded.case_study_problem_en,
  case_study_solution_en = excluded.case_study_solution_en,
  case_study_outcome_en = excluded.case_study_outcome_en;

-- ────────────────────────────────────────────────────────────
--  SERVICES  (8 services)
-- ────────────────────────────────────────────────────────────
insert into services (
  "order", status, slug, icon,
  keyword_en, keyword_ar,
  title_en, title_ar,
  description_en, description_ar,
  includes_en, includes_ar
) values

(1,'published','landing-page','Rocket',
 'create online website attract customers','إنشاء موقع إلكتروني لجذب العملاء',
 'Landing Page (Ads & Campaigns)','صفحة هبوط (إعلانات وحملات)',
 'Create an online landing page that attracts customers and converts clicks into leads—fast, responsive, tracking-ready, and built with technical SEO foundations.',
 'إنشاء صفحة هبوط إلكترونية تجذب العملاء وتحول النقرات إلى عملاء محتملين.',
 '["Responsive landing page UI with clear CTA","Analytics and conversion tracking integration","Optimised performance and Core Web Vitals"]',
 '["واجهة صفحة هبوط متجاوبة مع CTA واضح","تكامل تتبع التحليلات والتحويل","أداء محسّن ومقاييس Core Web Vitals"]'),

(2,'published','company-website','Building2',
 'develop professional websites','تطوير مواقع احترافية',
 'Company Website (Brand & Leads)','موقع شركة (علامة تجارية وعملاء)',
 'Develop a professional company website that builds trust, ranks for core services, and attracts customers—responsive UI, clean UX, and technical SEO from day one.',
 'تطوير موقع شركة احترافي يبني الثقة ويجذب العملاء.',
 '["Modern responsive multi-page website","Company services and about pages","Lead capture forms and CRM integration"]',
 '["موقع متعدد الصفحات حديث ومتجاوب","صفحات خدمات الشركة وصفحة عنا","نماذج التقاط العملاء المحتملين"]'),

(3,'published','ecommerce','ShoppingCart',
 'build complete website frontend backend database','بناء موقع كامل فرونت وباك إند وقاعدة بيانات',
 'E-commerce Store (Catalog & Checkout)','متجر إلكتروني (كتالوج وسداد)',
 'Build a complete e-commerce website (frontend + backend + database) with product SEO templates, fast browsing, secure checkout flow, and clean tracking.',
 'بناء موقع تجارة إلكترونية كامل مع كتالوج المنتجات وعملية الدفع الآمنة.',
 '["Full e-commerce site with catalog and product pages","Secure cart and checkout flow","Admin dashboard for product and order management"]',
 '["موقع تجارة إلكترونية كامل مع كتالوج","سلة تسوق وعملية دفع آمنة","لوحة تحكم إدارية لإدارة المنتجات والطلبات"]'),

(4,'published','dashboard','LayoutDashboard',
 'build full dashboard responsive UI rest api auth integrations','بناء لوحة تحكم كاملة',
 'Dashboard UI (Tables & Roles)','واجهة لوحة التحكم (جداول وأدوار)',
 'Build full dashboard UI for data-heavy systems—tables, filters, roles, and state management—ready for REST API integration and authentication.',
 'بناء واجهة لوحة تحكم كاملة للأنظمة الثقيلة بالبيانات.',
 '["Custom dashboard UI with tables and filters","Role-based access control and authentication","Data visualisation and export features"]',
 '["واجهة لوحة تحكم مخصصة مع جداول وفلاتر","التحكم في الوصول القائم على الأدوار والمصادقة","تصور البيانات وميزات التصدير"]'),

(5,'published','fullstack-system','Server',
 'build complete websites frontend backend database','بناء مواقع ويب كاملة',
 'Full-Stack System (Web App + API + Database)','نظام متكامل (تطبيق ويب + API + قاعدة بيانات)',
 'Build complete websites and systems (frontend, backend, database) with responsive UI, technical SEO, performance, REST APIs, auth, integrations, and SQL/NoSQL—deployment and maintenance included.',
 'بناء مواقع وأنظمة كاملة مع واجهة مستجيبة وSEO تقني.',
 '["Frontend application with responsive UI","Backend API with authentication and roles","Database schema (SQL/NoSQL) and migrations"]',
 '["تطبيق الواجهة الأمامية مع UI متجاوب","API الخلفية مع المصادقة والأدوار","مخطط قاعدة البيانات والترحيلات"]'),

(6,'published','wordpress-website','Globe',
 'create a professional website on wordpress','إنشاء موقع احترافي على ووردبريس',
 'WordPress Website (Professional & SEO-ready)','موقع WordPress (احترافي وجاهز لـ SEO)',
 'Create a professional website on WordPress—clean theme setup, performance optimisation, technical SEO, and a structured content system that attracts customers.',
 'إنشاء موقع ويب احترافي على WordPress مع إعداد ثيم نظيف وتحسين الأداء.',
 '["Professional WordPress site with custom theme","Clean navigation and responsive design","Performance optimisation and caching"]',
 '["موقع WordPress احترافي مع ثيم مخصص","تنقل نظيف وتصميم متجاوب","تحسين الأداء والتخزين المؤقت"]'),

(7,'published','seo-performance','TrendingUp',
 'technical SEO performance core web vitals','SEO تقني وأداء ومقاييس Core Web Vitals',
 'SEO & Performance (Core Web Vitals)','SEO والأداء (Core Web Vitals)',
 'Technical SEO + performance work focused on crawling, indexing, sitemap/robots correctness, and Core Web Vitals improvements.',
 'SEO التقني + عمل الأداء مع التركيز على الزحف والفهرسة وتحسينات Core Web Vitals.',
 '["Technical SEO audit and fixes","Core Web Vitals optimisation","Sitemap/robots and canonical corrections"]',
 '["تدقيق وإصلاح SEO التقني","تحسين Core Web Vitals","تصحيحات Sitemap/robots والعناوين الأساسية"]'),

(8,'published','maintenance','Wrench',
 'website maintenance security updates','صيانة الموقع وتحديثات الأمان',
 'Maintenance (Fixes & Content)','الصيانة (إصلاحات ومحتوى)',
 'Keep your website stable: fixes, content updates, monitoring, and small iterations—SEO and performance kept healthy over time.',
 'حافظ على استقرار موقعك: الإصلاحات وتحديثات المحتوى والمراقبة.',
 '["Monthly bug fixes and updates","Content updates and small iterations","Security patches and hardening"]',
 '["إصلاح الأخطاء الشهرية والتحديثات","تحديثات المحتوى والتكرارات الصغيرة","تصحيحات الأمان والتقوية"]) 
on conflict (slug) do update set
  "order" = excluded."order",
  status = excluded.status,
  icon = excluded.icon,
  keyword_en = excluded.keyword_en,
  keyword_ar = excluded.keyword_ar,
  title_en = excluded.title_en,
  title_ar = excluded.title_ar,
  description_en = excluded.description_en,
  description_ar = excluded.description_ar,
  includes_en = excluded.includes_en,
  includes_ar = excluded.includes_ar;

-- ────────────────────────────────────────────────────────────
--  SKILLS  (12 skills)
-- ────────────────────────────────────────────────────────────
insert into skills ("order", category, name, logo_url, project_count, visible)
select 1, 'Frontend', 'React', 'https://elhussainy.pages.dev/skills/react.svg', 4, true
where not exists (select 1 from skills where name = 'React');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 2, 'Frontend', 'Next.js', 'https://elhussainy.pages.dev/skills/nextjs-app-router.svg', 1, true
where not exists (select 1 from skills where name = 'Next.js');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 3, 'Frontend', 'JavaScript', 'https://elhussainy.pages.dev/skills/javascript.svg', 1, true
where not exists (select 1 from skills where name = 'JavaScript');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 4, 'Frontend', 'TypeScript', 'https://elhussainy.pages.dev/skills/typescript.svg', 3, true
where not exists (select 1 from skills where name = 'TypeScript');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 5, 'Frontend', 'HTML5', 'https://elhussainy.pages.dev/skills/html5.svg', 2, true
where not exists (select 1 from skills where name = 'HTML5');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 6, 'UI & Styling', 'Tailwind CSS', 'https://elhussainy.pages.dev/skills/tailwind-css.svg', 4, true
where not exists (select 1 from skills where name = 'Tailwind CSS');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 7, 'UI & Styling', 'Framer Motion', 'https://elhussainy.pages.dev/skills/framer-motion.svg', 3, true
where not exists (select 1 from skills where name = 'Framer Motion');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 8, 'UI & Styling', 'CSS', 'https://elhussainy.pages.dev/skills/css.svg', 2, true
where not exists (select 1 from skills where name = 'CSS');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 9, 'Tooling', 'Vite', 'https://elhussainy.pages.dev/skills/vite.svg', 3, true
where not exists (select 1 from skills where name = 'Vite');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 10, 'CMS & SEO', 'WordPress', 'https://elhussainy.pages.dev/skills/wordpress.svg', 1, true
where not exists (select 1 from skills where name = 'WordPress');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 11, 'CMS & SEO', 'Technical SEO', 'https://elhussainy.pages.dev/skills/technical-seo.svg', 1, true
where not exists (select 1 from skills where name = 'Technical SEO');

insert into skills ("order", category, name, logo_url, project_count, visible)
select 12, 'CMS & SEO', 'Schema', 'https://elhussainy.pages.dev/skills/schema.svg', 1, true
where not exists (select 1 from skills where name = 'Schema');

-- ────────────────────────────────────────────────────────────
--  REVIEWS  (4 reviews — 2 verified Khamsat + 2 from portfolio)
-- ────────────────────────────────────────────────────────────
insert into reviews (
  "order", platform, rating, reviewer_name,
  review_text_en, review_text_ar,
  review_url, screenshot_url, visible
) values

(1,'Khamsat',5,null,
 'Excellent execution and fast delivery. Thank you.',
 'تنفيذ ممتاز وتسليم سريع. شكراً.',
 'https://khamsat.com/user/mohamed_hussainy/reviews/1114962',
 'https://elhussainy.pages.dev/reviews/khamsat/khamsat-01.png', true),

(2,'Khamsat',5,null,
 'Very professional. Highly recommended.',
 'متميز جداً. أنصح بالتعامل معه.',
 'https://khamsat.com/user/mohamed_hussainy/reviews/1115268',
 'https://elhussainy.pages.dev/reviews/khamsat/khamsat-02.png', true),

(3,'Client',5,'Client A',
 'Clear communication, fast delivery, and the final UI felt premium. Performance and SEO basics were handled properly from day one.',
 'تواصل واضح وتسليم سريع والواجهة النهائية كانت بمستوى احترافي. الأداء وSEO التقني تم ضبطهم من البداية بشكل صحيح.',
 null, null, true),

(4,'Client',5,'Client B',
 'The page structure improved conversions. Headings, internal linking, and mobile UX were clearly built with intent.',
 'هيكلة الصفحة رفعت التحويلات. العناوين والروابط الداخلية وتجربة الموبايل كانت مبنية بوضوح على هدف محدد.',
 null, null, true);

-- ────────────────────────────────────────────────────────────
--  BLOG POSTS  (5 posts)
-- ────────────────────────────────────────────────────────────
insert into blog_posts (
  slug, status, title_en, title_ar,
  summary_en, summary_ar,
  tags, published_date, reading_time_min
) values

('nextjs-performance-patterns','published',
 'Next.js performance patterns that improve LCP',
 'أنماط أداء Next.js التي تحسن LCP',
 'Speed up LCP, reduce JS, and cache smartly. Improve Next.js performance with real patterns and a checklist.',
 'تسريع LCP وتقليل JS والتخزين المؤقت الذكي.',
 '["Next.js","Performance","LCP"]', '2026-01-13', 7),

('technical-seo-foundations','published',
 'Technical SEO foundations for higher ranking',
 'أسس SEO التقني للحصول على تصنيف أعلى',
 'Titles, descriptions, schema, internal links, and crawl clarity. A technical SEO guide that drives qualified clicks.',
 'العناوين والأوصاف والمخطط والروابط الداخلية ووضوح الزحف.',
 '["SEO","Schema","Technical"]', '2026-01-13', 8),

('rtl-ui-best-practices','published',
 'RTL UI engineering for clean Arabic products',
 'هندسة واجهة RTL للمنتجات العربية النظيفة',
 'Spacing, icons, typography, forms, and tables. Build RTL UI without language mixing and with consistent behavior.',
 'التباعد والأيقونات والطباعة والنماذج والجداول.',
 '["RTL","Arabic","UI"]', '2026-01-13', 6),

('dashboard-ui-patterns','published',
 'Dashboard UI patterns for tables and filters',
 'أنماط واجهة لوحة التحكم للجداول والفلاتر',
 'Stable query state, pagination, empty states, and filters. Build dashboard UI that feels fast and predictable.',
 'حالة الاستعلام الثابتة والترقيم والحالات الفارغة والفلاتر.',
 '["Dashboard","Tables","UI"]', '2026-01-13', 5),

('react-component-architecture','published',
 'React architecture that scales in real apps',
 'معمارية React التي تتوسع في التطبيقات الحقيقية',
 'State boundaries, naming, testing, and stable exports. A practical React architecture approach for fewer bugs.',
 'حدود الحالة والتسمية والاختبار والصادرات الثابتة.',
 '["React","TypeScript","Architecture"]', '2026-01-13', 6)
on conflict (slug) do update set
  status = excluded.status,
  title_en = excluded.title_en,
  title_ar = excluded.title_ar,
  summary_en = excluded.summary_en,
  summary_ar = excluded.summary_ar,
  tags = excluded.tags,
  published_date = excluded.published_date,
  reading_time_min = excluded.reading_time_min;
