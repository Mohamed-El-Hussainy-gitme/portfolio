-- Migration: 013_batch1_stack_and_links
-- Confirmed tech_stack + live_url for the 5 batch-1 projects, based on
-- actual code inspection (package.json / requirements.txt) plus explicit
-- user confirmation on the two open questions (Flutter repo, Stripe status).

BEGIN;

UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Redis","Zustand","Zod","Web Push","PWA"]'::jsonb,
  live_url = 'https://ahwa.vercel.app',
  case_study_stack_en = 'Next.js • Supabase • TypeScript • Redis • Zustand • PWA',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • Redis • Zustand • PWA'
WHERE slug = 'ahwa-saas-platform';

UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","React Hook Form","Zod"]'::jsonb,
  case_study_stack_en = 'Next.js • Supabase • TypeScript',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript'
WHERE slug = 'freelawyers-platform';

-- Al-Ola: web app is Next.js/Supabase; mobile app is a separate Flutter repo (confirmed).
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Leaflet","Flutter"]'::jsonb,
  live_url = 'https://al-ola.vercel.app',
  description_en = 'AL OLA is a real, live web application that digitizes used cooking oil collection, with a companion Flutter mobile app for the field/driver side. Consumers register themselves as a pickup point in the web app; a fleet of company drivers gets notified and heads to the nearest registered points to collect. It works like a ride-hailing app, but instead of matching a rider with a driver, it matches a seller with a collection driver at a meeting point — the oil then moves to the company''s stores. A full company-side dashboard runs everything the business needs: CRM, ERP, resource management, and reporting.',
  description_ar = 'العلا تطبيق ويب حقيقي وشغال فعليًا بيحول تجميع زيت الطعام المستهلك لعملية رقمية، مع تطبيق موبايل مصاحب بـFlutter لجانب المناديب/الميدان. المستهلك بيسجل نفسه كنقطة تجميع في تطبيق الويب؛ أسطول من مناديب الشركة بيوصله إشعار وبيتوجه لأقرب نقاط مسجلة عشان يستلم. بتشتغل بنفس منطق تطبيقات المواصلات، بس بدل ما تربط راكب بسائق، بتربط بائع بمندوب تجميع في نقطة تلاقي — وبعدين الزيت بيروح لمخازن الشركة. في لوحة تحكم كاملة لطرف الشركة بتدير كل احتياجاتها: CRM، ERP، إدارة موارد، وتقارير.',
  case_study_stack_en = 'Next.js • Supabase • TypeScript • Leaflet (web) • Flutter (mobile)',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • Leaflet (ويب) • Flutter (موبايل)'
WHERE slug = 'al-ola-oil-collection';

-- NilU: Stripe is confirmed connected on the client-delivered copy (not on the
-- copy inspected here), so it's included in tech_stack and the case study
-- solution now mentions payment integration as delivered to the client.
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Stripe","Radix UI","TanStack Query","Framer Motion","Three.js","next-intl"]'::jsonb,
  live_url = 'https://nil-u.vercel.app',
  case_study_solution_en = 'I built a dedicated booking system tied directly to how this company operates, with Stripe payment integration connected on the delivered client copy, letting clients book and pay for an entire trip with the company in advance, before arrival.',
  case_study_solution_ar = 'بنيت نظام حجوزات مخصص مرتبط مباشرة بطريقة شغل الشركة، مع ربط بوابة دفع Stripe في النسخة المُسلَّمة للعميل، بيسمح للعميل يحجز ويدفع رحلته كاملة مع الشركة مقدمًا قبل الوصول.',
  case_study_stack_en = 'Next.js • Supabase • TypeScript • Stripe',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • Stripe'
WHERE slug = 'nilu-tourism';

UPDATE projects SET
  tech_stack = '["React","Vite","TanStack Query","Zustand","FastAPI","PostgreSQL","SQLAlchemy","Alembic","Docker"]'::jsonb,
  live_url = 'https://lakatat.net',
  case_study_stack_en = 'React (Vite) frontend • FastAPI + PostgreSQL backend • Docker',
  case_study_stack_ar = 'فرونت إند React (Vite) • باك إند FastAPI + PostgreSQL • Docker'
WHERE slug = 'lakatat-platform-rescue';

COMMIT;
