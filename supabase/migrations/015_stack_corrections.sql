-- Migration: 015_stack_corrections
-- Corrections based on actual file inspection of:
--   D:\opened projects\* and D:\works inshaa-allah\*
-- Every entry below was verified from a real package.json, requirements.txt,
-- or folder structure. Migration 014 had several wrong stacks; this corrects them.

BEGIN;

-- ──────────────────────────────────────────────────────────────────
-- 1. AHWA — added Upstash Redis + QStash (from ahwa versions env.txt)
--    Confirmed: Next.js 16, Supabase, Zustand, ioredis/Upstash,
--               Web Push, Zod, QStash
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Redis (Upstash)","Zustand","Zod","Web Push","QStash","PWA"]'::jsonb,
  case_study_stack_en = 'Next.js • Supabase • TypeScript • Redis (Upstash) • Zustand • Zod • Web Push • PWA',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • Redis (Upstash) • Zustand • Zod • Web Push • PWA'
WHERE slug = 'ahwa-saas-platform';

-- ──────────────────────────────────────────────────────────────────
-- 2. NILU — complete stack from NilUEgy folder
--    Confirmed: Next.js 16, Supabase SSR, Stripe, TanStack Query,
--               Framer Motion, Three.js, Leaflet, next-intl,
--               Radix UI, Recharts, Resend, Zod
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Stripe","TanStack Query","Framer Motion","Three.js","Leaflet","Radix UI","next-intl","Recharts","Resend","Zod"]'::jsonb,
  case_study_stack_en = 'Next.js • Supabase • TypeScript • Stripe • Radix UI • Framer Motion • Three.js • next-intl',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • Stripe • Radix UI • Framer Motion • Three.js • next-intl'
WHERE slug = 'nilu-tourism';

-- ──────────────────────────────────────────────────────────────────
-- 3. FREELAWYERS — corrected: Next.js 15, Supabase SSR, React Hook Form, Zod
--    Confirmed from D:\opened projects\freelawyers
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","React Hook Form","Zod","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'Next.js • Supabase • TypeScript • React Hook Form • Zod',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • React Hook Form • Zod'
WHERE slug = 'freelawyers-platform';

-- ──────────────────────────────────────────────────────────────────
-- 4. BCC FULLSTACK — corrected from "bcc run time" folder
--    Migration 014 was missing: Supabase, TanStack Query, Leaflet, Three.js, Recharts
--    Confirmed: React, Vite, Supabase, TanStack Query, Framer Motion,
--               Leaflet, Three.js, Tailwind CSS, TypeScript, Recharts
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Supabase","TanStack Query","Framer Motion","Three.js","Leaflet","Recharts","TypeScript","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • Supabase • TanStack Query • Framer Motion • Three.js • Leaflet',
  case_study_stack_ar = 'React • Vite • Supabase • TanStack Query • Framer Motion • Three.js • Leaflet'
WHERE slug = 'bcc-fullstack';

-- ──────────────────────────────────────────────────────────────────
-- 5. FRAMEMASTERS (ayat) — corrected: NO Tabby/Tamara in package.json
--    Confirmed from D:\works inshaa-allah\ayat\framemasters-main:
--    React, Vite, Supabase, TanStack Query, Radix UI, TypeScript, Tailwind, Bun
--    (Payment gateways were integrated manually, not via npm packages)
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Supabase","TanStack Query","Radix UI","TypeScript","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • Supabase • TanStack Query • Radix UI',
  case_study_stack_ar = 'React • Vite • Supabase • TanStack Query • Radix UI'
WHERE slug = 'framemasters';

-- ──────────────────────────────────────────────────────────────────
-- 6. LAMAR — MAJOR CORRECTION from "lamar-website-sourcecode"
--    Migration 014 said React/Vite — WRONG.
--    Confirmed: Next.js 16 (App Router), Prisma ORM, NextAuth.js,
--               PostgreSQL, Cloudinary, Resend, TypeScript, Zod
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","TypeScript","Prisma","PostgreSQL","NextAuth.js","Cloudinary","Resend","Zod","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'Next.js • TypeScript • Prisma (PostgreSQL) • NextAuth.js • Cloudinary • Resend',
  case_study_stack_ar = 'Next.js • TypeScript • Prisma (PostgreSQL) • NextAuth.js • Cloudinary • Resend'
WHERE slug = 'lamar-ecommerce';

-- ──────────────────────────────────────────────────────────────────
-- 7. KENZ ERP — complete stack from "E-Commrece with dashboard and ERP"
--    Migration 014 was incomplete. Confirmed:
--    React, Vite, TanStack Query, Stripe, Leaflet, Framer Motion,
--    Three.js, Recharts, Radix UI, TypeScript, Zod, Tailwind CSS
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","TanStack Query","Stripe","Leaflet","Framer Motion","Three.js","Recharts","Radix UI","TypeScript","Zod","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • TanStack Query • Stripe • Framer Motion • Three.js • Leaflet • Recharts',
  case_study_stack_ar = 'React • Vite • TanStack Query • Stripe • Framer Motion • Three.js • Leaflet • Recharts'
WHERE slug = 'kenz-ecommerce-erp';

-- ──────────────────────────────────────────────────────────────────
-- 8. AL KHAIR (rebrand of Kenz) — confirmed from "al khair" folder
--    Same stack as Kenz + Supabase
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Supabase","TanStack Query","Stripe","Leaflet","Framer Motion","Three.js","Recharts","TypeScript","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • Supabase • TanStack Query • Stripe • Framer Motion • Three.js',
  case_study_stack_ar = 'React • Vite • Supabase • TanStack Query • Stripe • Framer Motion • Three.js'
WHERE slug = 'alkhair-store';

-- ──────────────────────────────────────────────────────────────────
-- 9. CRM (Next.js) — corrected: Cloudflare Workers confirmed, WhatsApp not npm
--    Confirmed from D:\opened projects\crm:
--    Next.js 16, TypeScript, Cloudflare Workers/Wrangler, Zod, Lucide React
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","TypeScript","Cloudflare Workers","Zod","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'Next.js • TypeScript • Cloudflare Workers • Zod',
  case_study_stack_ar = 'Next.js • TypeScript • Cloudflare Workers • Zod'
WHERE slug = 'crm-system-nextjs';

-- ──────────────────────────────────────────────────────────────────
-- 10. PYTHON CRM — MAJOR CORRECTION: it is Odoo 17, NOT FastAPI
--     Migration 014 said FastAPI — WRONG.
--     Confirmed from D:\opened projects\python CRM (__manifest__.py, docker-compose.yml):
--     Python, Odoo 17.0, Docker, PostgreSQL 16
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Python","Odoo 17","Docker","PostgreSQL"]'::jsonb,
  case_study_stack_en = 'Python • Odoo 17 • Docker • PostgreSQL',
  case_study_stack_ar = 'Python • Odoo 17 • Docker • PostgreSQL'
WHERE slug = 'crm-system-python';

-- ──────────────────────────────────────────────────────────────────
-- 11. POS (Next.js slug) — MAJOR CORRECTION: NOT Next.js
--     Confirmed from D:\opened projects\POS + pos erp folders:
--     React, Vite, Express, TanStack Query, Framer Motion,
--     Dexie.js (offline IndexedDB), Drizzle ORM, JWT, Workbox (PWA)
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Express","TanStack Query","Framer Motion","Dexie.js","Drizzle ORM","JWT","Workbox (PWA)","TypeScript","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • Express • Dexie.js (offline PWA) • Drizzle ORM • TanStack Query',
  case_study_stack_ar = 'React • Vite • Express • Dexie.js (PWA أوفلاين) • Drizzle ORM • TanStack Query'
WHERE slug = 'pos-system-nextjs';

-- ──────────────────────────────────────────────────────────────────
-- 12. RESTAURANT — corrected: Next.js + PostgreSQL (no Supabase)
--     Migration 014 said Supabase — WRONG.
--     Confirmed from D:\opened projects\restaurant:
--     Next.js 16, React, PostgreSQL (pg driver directly), TypeScript
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","TypeScript","PostgreSQL","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'Next.js • TypeScript • PostgreSQL',
  case_study_stack_ar = 'Next.js • TypeScript • PostgreSQL'
WHERE slug = 'restaurant-specialized-saas';

-- ──────────────────────────────────────────────────────────────────
-- 13. NODA AI TOOL — corrected: OpenAI SDK (NOT Groq)
--     Migration 014 said Groq — WRONG.
--     Confirmed from D:\opened projects\noda AI + Noda-Groq-AI:
--     React, Vite, Express (Node.js API server), OpenAI SDK,
--     Drizzle ORM, Docker, Framer Motion, TypeScript
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Express","OpenAI API","Drizzle ORM","Docker","Framer Motion","TypeScript","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • Express (Node.js) • OpenAI API • Drizzle ORM • Docker',
  case_study_stack_ar = 'React • Vite • Express (Node.js) • OpenAI API • Drizzle ORM • Docker'
WHERE slug = 'noda-ai-tool';

-- ──────────────────────────────────────────────────────────────────
-- 14. LUXURY LEATHER — corrected: vanilla HTML/CSS/JS (NOT React/Vite)
--     Migration 014 assumed React/Vite — WRONG.
--     Confirmed from D:\works inshaa-allah\monera:
--     Static HTML/CSS/JS files spread across coding/, v2/, luxury leather v1/
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["HTML","CSS","JavaScript"]'::jsonb,
  case_study_stack_en = 'Vanilla HTML • CSS • JavaScript',
  case_study_stack_ar = 'HTML • CSS • JavaScript'
WHERE slug = 'luxury-leather';

-- ──────────────────────────────────────────────────────────────────
-- 15. LAKATAT — confirm correct stack (013 was mostly right)
--     Confirmed from D:\works inshaa-allah\lakatat:
--     React 19, Vite, TanStack Query, Framer Motion, Zustand (frontend)
--     FastAPI, SQLAlchemy, Alembic, PostgreSQL/SQLite, Uvicorn (backend)
--     Note: No Docker file found in the project — removing Docker from 013.
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","TanStack Query","Zustand","Framer Motion","FastAPI","SQLAlchemy","Alembic","PostgreSQL","Uvicorn","TypeScript","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React (Vite) frontend • FastAPI + SQLAlchemy + PostgreSQL backend',
  case_study_stack_ar = 'فرونت إند React (Vite) • باك إند FastAPI + SQLAlchemy + PostgreSQL'
WHERE slug = 'lakatat-platform-rescue';

-- ──────────────────────────────────────────────────────────────────
-- 16. AL OLA — confirmed final stack from D:\opened projects\AL OLA
--     Next.js 16, Supabase SSR, Leaflet, TypeScript, Tailwind CSS
--     (Flutter mobile app is a separate repo — not a JS package)
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Leaflet","Flutter","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'Next.js • Supabase • TypeScript • Leaflet (web) • Flutter (mobile)',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • Leaflet (ويب) • Flutter (موبايل)'
WHERE slug = 'al-ola-oil-collection';

-- ──────────────────────────────────────────────────────────────────
-- 17. GEDO STORE — confirmed PHP OOP MVC (not just PHP/MySQL generic)
--     From D:\works inshaa-allah\gedo store: custom PHP MVC (app/Core, Controllers, Models)
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["PHP","MySQL","Custom MVC"]'::jsonb,
  case_study_stack_en = 'PHP • MySQL • Custom MVC Framework',
  case_study_stack_ar = 'PHP • MySQL • إطار MVC مخصص'
WHERE slug = 'gedo-store';

-- ──────────────────────────────────────────────────────────────────
-- 18. AL AFKHAM — confirmed WordPress + WooCommerce + Hello Elementor
--     From D:\works inshaa-allah\alafkham
-- ──────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["WordPress","WooCommerce","PHP","Hello Elementor Theme"]'::jsonb,
  case_study_stack_en = 'WordPress • WooCommerce • PHP • Hello Elementor',
  case_study_stack_ar = 'WordPress • WooCommerce • PHP • Hello Elementor'
WHERE slug = 'al-afkham-woocommerce';

COMMIT;
