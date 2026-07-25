-- Migration: 018_update_services
-- Replace the 4 old services with the updated 6 services
-- matching the new services.ts definitions

BEGIN;

DELETE FROM services;

INSERT INTO services (
    "order", status, slug, icon,
    keyword_en, keyword_ar,
    title_en, title_ar,
    description_en, description_ar,
    includes_en, includes_ar
  ) VALUES (
    1, 'published', 'saas-development', 'code',
    'SaaS Development', 'تطوير SaaS',
    'SaaS & Custom Web Applications', 'بناء منصات الـ SaaS والأنظمة المخصصة',
    'End-to-end development of scalable SaaS platforms and custom web applications (like Ahwa and Freelawyers). I handle everything from database architecture to frontend implementation.',
    'تطوير شامل لمنصات الـ SaaS وتطبيقات الويب المخصصة (مثل منصات قهوة ومحامين). أهتم بكل شيء بدءاً من البنية التحتية وقواعد البيانات وحتى الواجهات النهائية.',
    '["Multi-tenant architectures","Complex dashboards and POS systems","Real-time database integrations","Scalable Next.js and Node.js backends"]'::jsonb,
    '["بناء أنظمة متعددة المستأجرين (Multi-tenant)","تطوير لوحات تحكم وأنظمة نقاط بيع معقدة","تكامل مع قواعد البيانات اللحظية (Real-time)","خوادم خلفية قابلة للتوسع باستخدام Next.js و Node.js"]'::jsonb
  );

INSERT INTO services (
    "order", status, slug, icon,
    keyword_en, keyword_ar,
    title_en, title_ar,
    description_en, description_ar,
    includes_en, includes_ar
  ) VALUES (
    2, 'published', 'business-management-systems', 'layout-dashboard',
    'CRM ERP POS Systems', 'أنظمة CRM ERP POS',
    'Business Management Systems (CRM / ERP / POS)', 'أنظمة إدارة الأعمال (CRM / ERP / POS)',
    'Building the operational backbone real businesses run on — CRM, ERP, and point-of-sale systems that unify inventory, invoicing, customers, and reporting in one dashboard (like Kenz, Al Khair, and AL OLA''s logistics platform), instead of juggling disconnected tools.',
    'بناء العمود الفقري التشغيلي اللي بيدير بيه أصحاب البزنس شغلهم فعليًا — أنظمة CRM وERP ونقاط بيع بتوحّد المخزون والفواتير والعملاء والتقارير في لوحة تحكم واحدة (زي كنز والخير ومنصة العلا اللوجستية)، بدل التعامل مع أدوات متفرقة عن بعض.',
    '["Unified online + in-store POS with shared inventory","WhatsApp-automated CRM (agenda, deals, follow-ups)","Odoo-style systems built independently, no licensing","Driver/field logistics matching and dispatch dashboards"]'::jsonb,
    '["نقطة بيع أونلاين وأوفلاين موحدة بمخزون مشترك","أنظمة CRM بأتمتة واتساب (أجندة، صفقات، متابعات)","أنظمة على طراز أودو مبنية بشكل مستقل بدون ترخيص","لوحات تحكم لمطابقة وتوزيع مناديب ميدانيين"]'::jsonb
  );

INSERT INTO services (
    "order", status, slug, icon,
    keyword_en, keyword_ar,
    title_en, title_ar,
    description_en, description_ar,
    includes_en, includes_ar
  ) VALUES (
    3, 'published', 'corporate-websites', 'building',
    'Corporate Website Development', 'تطوير مواقع شركات',
    'Corporate & Business Websites', 'مواقع الشركات والوكالات',
    'Full-stack websites for real companies and agencies (like BCC and Lamar) — built with a content dashboard the client''s own team can use to add services, products, and clients, without needing me for every update.',
    'مواقع Full-Stack كاملة لشركات ووكالات حقيقية (زي BCC ولامار) — مبنية بلوحة تحكم محتوى يقدر فريق العميل نفسه يستخدمها لإضافة الخدمات والمنتجات والعملاء، بدون ما يحتاجوا لي في كل تحديث.',
    '["Editable content dashboards (services, products, clients)","Contact forms wired to real inquiry handling","Payment gateway integration where needed","Database security hardening (Row Level Security)"]'::jsonb,
    '["لوحات تحكم محتوى قابلة للتعديل (خدمات، منتجات، عملاء)","نماذج تواصل مربوطة فعليًا باستقبال الاستفسارات","ربط بوابات دفع لو محتاج المشروع","تأمين قاعدة البيانات (Row Level Security)"]'::jsonb
  );

INSERT INTO services (
    "order", status, slug, icon,
    keyword_en, keyword_ar,
    title_en, title_ar,
    description_en, description_ar,
    includes_en, includes_ar
  ) VALUES (
    4, 'published', 'ecommerce-development', 'shopping-cart',
    'Custom E-Commerce', 'متاجر إلكترونية مخصصة',
    'E-Commerce Development & Customization', 'تطوير وتخصيص المتاجر الإلكترونية',
    'Building robust e-commerce solutions from scratch or deeply customizing platforms like WooCommerce (e.g., Al Afkham, Rose Store) to perfectly match your brand''s unique needs.',
    'بناء حلول تجارة إلكترونية متكاملة من الصفر، أو تخصيص وتطوير منصات مثل WooCommerce (مثل الأفخم ومتجر Rose) لتناسب هوية علامتك التجارية بشكل مثالي.',
    '["Custom UI/UX for online stores","Advanced admin panels and coupon systems","Payment gateway integrations","WooCommerce custom functions and CSS"]'::jsonb,
    '["واجهات وتجربة مستخدم مخصصة للمتاجر","لوحات تحكم متقدمة وأنظمة كوبونات","ربط مع بوابات الدفع الإلكتروني","تخصيص كامل لـ WooCommerce برمجياً وشكلياً"]'::jsonb
  );

INSERT INTO services (
    "order", status, slug, icon,
    keyword_en, keyword_ar,
    title_en, title_ar,
    description_en, description_ar,
    includes_en, includes_ar
  ) VALUES (
    5, 'published', 'project-rescue', 'wrench',
    'Project Rescue', 'إنقاذ تقني للمشاريع',
    'Project Rescue & Technical Optimization', 'إنقاذ المشاريع والتحسين التقني',
    'Taking over failing or broken projects (like the Lakatat platform rescue) to fix critical bugs, rewrite slow queries, build missing admin capabilities, and deliver a polished product.',
    'استلام المشاريع المتعثرة أو المليئة بالأخطاء (مثل إنقاذ منصة لقطات)، وإصلاح المشاكل البرمجية الحرجة، تسريع الأداء، وبناء المميزات الناقصة مثل لوحات التحكم لتسليم منتج نهائي لامع.',
    '["Debugging and fixing ''black screens''","Database optimization and RLS security","Refactoring messy codebases","Adding missing core features mid-flight"]'::jsonb,
    '["إصلاح الأخطاء البرمجية والشاشات السوداء","تحسين قواعد البيانات وتأمينها (RLS)","إعادة صياغة الأكواد المعقدة (Refactoring)","بناء الميزات الأساسية الناقصة باحترافية"]'::jsonb
  );

INSERT INTO services (
    "order", status, slug, icon,
    keyword_en, keyword_ar,
    title_en, title_ar,
    description_en, description_ar,
    includes_en, includes_ar
  ) VALUES (
    6, 'published', 'technical-seo', 'search',
    'Technical SEO', 'تحسين أداء SEO',
    'Technical SEO & Performance', 'تحسين محركات البحث التقني والأداء',
    'Engineering platforms specifically for top-tier Google Search rankings (like GrowLik and Vortexq8). I implement advanced technical SEO, structured data, and extreme performance tuning.',
    'هندسة المواقع لتتصدر نتائج بحث جوجل (مثل GrowLik و Vortexq8). أقوم بتطبيق معايير Technical SEO المتقدمة، حقن البيانات المنظمة (Schema)، وتحسين الأداء لأقصى حد.',
    '["Lighthouse score optimization (100/100)","Core Web Vitals enhancement","Schema and metadata engineering","Custom GTM and indexing scripts"]'::jsonb,
    '["تحسين تقييمات سرعة Lighthouse","تحسين مؤشرات أداء الويب (Core Web Vitals)","هندسة البيانات المنظمة والميتا داتا","حقن سكريبتات الفهرسة وتخصيص GTM"]'::jsonb
  );

COMMIT;
