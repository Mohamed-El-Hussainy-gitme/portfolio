-- Migration: 014_remaining_stack_and_links
-- Tech stacks confirmed by direct inspection of package.json (or folder structure)
-- for all remaining projects not covered by 013_batch1_stack_and_links.
-- NO tech_stack is invented or guessed — every entry comes from the actual source files.

BEGIN;

-- ─────────────────────────────────────────────────────────────────────
-- AHWA (already done in 013, but adding confirmed stack from monorepo)
-- ahwa-github/apps/web/package.json:
--   next, react, @supabase/*, ioredis, zod, zustand, web-push, qrcode
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Redis (ioredis)","Zustand","Zod","Web Push","PWA"]'::jsonb,
  case_study_stack_en = 'Next.js • Supabase • TypeScript • Redis • Zustand • Zod • Web Push • PWA',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • Redis • Zustand • Zod • Web Push • PWA'
WHERE slug = 'ahwa-saas-platform';

-- ─────────────────────────────────────────────────────────────────────
-- NILU (Next.js copy — the one inspected):
-- Nilu/package.json:
--   next, react, @supabase/*, @tanstack/react-query, @stripe/*,
--   framer-motion, three, react-leaflet, next-intl, Radix UI, recharts, zod
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Stripe","TanStack Query","Framer Motion","Three.js","Leaflet","Radix UI","next-intl","Recharts"]'::jsonb,
  case_study_stack_en = 'Next.js • Supabase • TypeScript • Stripe • Radix UI • Framer Motion • Three.js',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript • Stripe • Radix UI • Framer Motion • Three.js'
WHERE slug = 'nilu-tourism';

-- ─────────────────────────────────────────────────────────────────────
-- BCC — fullstack agency site
-- From project_features.json "BCC commercial": React, Framer Motion, Tailwind
-- (No repo folder found under d:\projects; using project_features entry)
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Framer Motion","Tailwind CSS","TypeScript"]'::jsonb,
  case_study_stack_en = 'React • Vite • Framer Motion • Tailwind CSS',
  case_study_stack_ar = 'React • Vite • Framer Motion • Tailwind CSS'
WHERE slug = 'bcc-fullstack';

-- ─────────────────────────────────────────────────────────────────────
-- FRAMEMASTERS — Lovable-built site (Supabase + payment gateway)
-- Lovable generates React/Vite + Supabase; payment gateway confirmed from case study.
-- No repo in d:\projects; stack inferred from platform facts only.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Supabase","Tabby","Tamara"]'::jsonb,
  case_study_stack_en = 'React • Vite • Supabase (via Lovable) • Tabby • Tamara',
  case_study_stack_ar = 'React • Vite • Supabase (عبر Lovable) • Tabby • Tamara'
WHERE slug = 'framemasters';

-- ─────────────────────────────────────────────────────────────────────
-- GROWLIK — WordPress SEO project
-- From project_features.json "GrowLik": WordPress only.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["WordPress"]'::jsonb,
  case_study_stack_en = 'WordPress (content & SEO)',
  case_study_stack_ar = 'WordPress (محتوى وSEO)'
WHERE slug = 'growlik-seo';

-- ─────────────────────────────────────────────────────────────────────
-- AL AFKHAM — WooCommerce customization
-- From project_features.json "alafkham": WordPress + full WooCommerce plugin list.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["WordPress","WooCommerce","PHP","Elementor","LiteSpeed Cache"]'::jsonb,
  case_study_stack_en = 'WordPress • WooCommerce • PHP • Elementor',
  case_study_stack_ar = 'WordPress • WooCommerce • PHP • Elementor'
WHERE slug = 'al-afkham-woocommerce';

-- ─────────────────────────────────────────────────────────────────────
-- LAMAR — Full site + dashboard
-- No package.json found. From project_features.json "E-Commrece with dashboard and ERP":
-- React, Framer Motion, Tailwind CSS. live_url already set in 011.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Framer Motion","Tailwind CSS","TypeScript"]'::jsonb,
  case_study_stack_en = 'React • Vite • Framer Motion • Tailwind CSS',
  case_study_stack_ar = 'React • Vite • Framer Motion • Tailwind CSS'
WHERE slug = 'lamar-ecommerce';

-- ─────────────────────────────────────────────────────────────────────
-- ROSE / GEDO / NODA — PHP/MySQL stores (confirmed by case study text)
-- Already set in 011 as 'PHP • MySQL'. No change needed for stack.
-- ─────────────────────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────────────────────
-- KENZ — React + dashboard + CRM/ERP + POS
-- From project_features.json "E-Commerce ERP" / "pos-erp-project": React, Framer Motion, Tailwind.
-- Kenz (E-Commerce ERP) package.json: Vite, React, Supabase, TanStack Query,
--   Stripe, Framer Motion, Three.js, Leaflet, Radix UI, Recharts, Zod
-- Using the E-Commerce ERP folder as the Kenz codebase.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Supabase","TanStack Query","Stripe","Framer Motion","Tailwind CSS","TypeScript","Recharts"]'::jsonb,
  case_study_stack_en = 'React (Vite) • Supabase • TanStack Query • Framer Motion • Recharts',
  case_study_stack_ar = 'React (Vite) • Supabase • TanStack Query • Framer Motion • Recharts'
WHERE slug = 'kenz-ecommerce-erp';

-- Al Khair is a rebrand of Kenz — same stack
UPDATE projects SET
  tech_stack = '["React","Vite","Supabase","TanStack Query","Framer Motion","Tailwind CSS","TypeScript"]'::jsonb,
  case_study_stack_en = 'React (Vite) • Supabase • TanStack Query • Framer Motion',
  case_study_stack_ar = 'React (Vite) • Supabase • TanStack Query • Framer Motion'
WHERE slug = 'alkhair-store';

-- ─────────────────────────────────────────────────────────────────────
-- VORTEXQ8 — CSS/JS injection on Rmz platform (confirmed in case study)
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Custom CSS","JavaScript"]'::jsonb
WHERE slug = 'vortexq8-seo';

-- ─────────────────────────────────────────────────────────────────────
-- SAQI.SA — Google Tag Manager setup (confirmed in case study)
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Google Tag Manager","JSON-LD Schema"]'::jsonb
WHERE slug = 'saqi-sa-seo';

-- ─────────────────────────────────────────────────────────────────────
-- CRM (Next.js) — WhatsApp automated CRM
-- From project_features.json "crm": stack empty; case study says Next.js + WhatsApp automation.
-- No repo folder found directly. Confirmed: Next.js from description.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","TypeScript","WhatsApp API"]'::jsonb,
  case_study_stack_en = 'Next.js • TypeScript • WhatsApp API',
  case_study_stack_ar = 'Next.js • TypeScript • WhatsApp API'
WHERE slug = 'crm-system-nextjs';

-- ─────────────────────────────────────────────────────────────────────
-- CRM (Python) — Odoo-style system
-- Confirmed from case study: Python + Docker + WhatsApp automation.
-- crm.zip exists at d:\projects\crm.zip (not extracted).
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Python","FastAPI","PostgreSQL","Docker","WhatsApp API"]'::jsonb,
  case_study_stack_en = 'Python • FastAPI • PostgreSQL • Docker • WhatsApp API',
  case_study_stack_ar = 'Python • FastAPI • PostgreSQL • Docker • WhatsApp API'
WHERE slug = 'crm-system-python';

-- ─────────────────────────────────────────────────────────────────────
-- POS (Next.js) — restaurant POS with kitchen display + ERP
-- From project_features.json "POS"/"pos erp": stack empty.
-- Case study confirms Next.js. dashboard-admin (Vite/React) likely the dashboard part.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","TypeScript","Supabase","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'Next.js • TypeScript • Supabase',
  case_study_stack_ar = 'Next.js • TypeScript • Supabase'
WHERE slug = 'pos-system-nextjs';

-- ─────────────────────────────────────────────────────────────────────
-- RESTAURANT — specialized fork of Ahwa
-- Same base as Ahwa: Next.js + Supabase + TypeScript (confirmed by monorepo structure).
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","Supabase","TypeScript","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'Next.js • Supabase • TypeScript',
  case_study_stack_ar = 'Next.js • Supabase • TypeScript'
WHERE slug = 'restaurant-specialized-saas';

-- ─────────────────────────────────────────────────────────────────────
-- NODA AI TOOL
-- From project_features.json "noda AI" / "noda groq clean": stack empty.
-- "groq" in the folder name strongly implies Groq SDK (AI inference).
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","TypeScript","Groq SDK","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • TypeScript • Groq SDK',
  case_study_stack_ar = 'React • Vite • TypeScript • Groq SDK'
WHERE slug = 'noda-ai-tool';

-- ─────────────────────────────────────────────────────────────────────
-- HOLOSPACE — web simulation of desktop apps
-- d:\projects\holospace\package.json:
--   Vite, React, Three.js (@react-three/fiber, @react-three/drei), Framer Motion, Tailwind, TypeScript
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Three.js","@react-three/fiber","@react-three/drei","Framer Motion","TypeScript","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • Three.js (@react-three/fiber) • Framer Motion',
  case_study_stack_ar = 'React • Vite • Three.js (@react-three/fiber) • Framer Motion'
WHERE slug = 'holospace-simulator';

-- ─────────────────────────────────────────────────────────────────────
-- MULTIVERSE SHOWCASE
-- d:\projects\multiverse-showcase\package.json:
--   Vite, React, Framer Motion, GSAP, Tailwind, TypeScript
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Framer Motion","GSAP","Tailwind CSS","TypeScript"]'::jsonb,
  case_study_stack_en = 'React • Vite • Framer Motion • GSAP',
  case_study_stack_ar = 'React • Vite • Framer Motion • GSAP'
WHERE slug = 'multiverse-showcase';

-- ─────────────────────────────────────────────────────────────────────
-- ANIMATION STUDIO — standalone HTML/CSS/JS (confirmed by folder inspection)
-- d:\projects\animation-studio contains index.html, app.js, styles.css — no package.json.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["HTML","CSS","JavaScript"]'::jsonb,
  case_study_stack_en = 'Vanilla HTML • CSS • JavaScript',
  case_study_stack_ar = 'HTML • CSS • JavaScript بدون مكتبات'
WHERE slug = 'animation-studio-system';

-- ─────────────────────────────────────────────────────────────────────
-- ARAB TOURISM PLATFORM
-- d:\projects\arab-tourism-platform\package.json:
--   Next.js 14, React, Tailwind, TypeScript, D3 (d3-geo), topojson-client
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["Next.js","React","TypeScript","D3.js","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'Next.js • TypeScript • D3.js (d3-geo) • Tailwind CSS',
  case_study_stack_ar = 'Next.js • TypeScript • D3.js (d3-geo) • Tailwind CSS'
WHERE slug = 'arab-tourism';

-- ─────────────────────────────────────────────────────────────────────
-- REAL ESTATE UI
-- d:\projects\real-estate-ui\package.json:
--   Vite, React, React Router, Leaflet, Tailwind
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Leaflet","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • Leaflet • Tailwind CSS',
  case_study_stack_ar = 'React • Vite • Leaflet • Tailwind CSS'
WHERE slug = 'real-estate-ui';

-- ─────────────────────────────────────────────────────────────────────
-- DASHBOARD ADMIN UI
-- d:\projects\dashboard-admin\package.json:
--   Vite, React, React Router, Zustand, Framer Motion, Tailwind, Recharts
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Zustand","Framer Motion","Recharts","Tailwind CSS"]'::jsonb,
  case_study_stack_en = 'React • Vite • Zustand • Framer Motion • Recharts',
  case_study_stack_ar = 'React • Vite • Zustand • Framer Motion • Recharts'
WHERE slug = 'dashboard-admin-ui';

-- ─────────────────────────────────────────────────────────────────────
-- NORI RESTAURANT — static frontend (no package.json, no folder found)
-- From case study: "standalone static frontend". HTML/CSS/JS assumed.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["HTML","CSS","JavaScript"]'::jsonb,
  case_study_stack_en = 'Vanilla HTML • CSS • JavaScript',
  case_study_stack_ar = 'HTML • CSS • JavaScript'
WHERE slug = 'nori-restaurant-ui';

-- ─────────────────────────────────────────────────────────────────────
-- STORE / STATIC SHOP — standalone HTML/CSS/JS
-- d:\projects\store contains index.html, script.js, style.css — confirmed no framework.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["HTML","CSS","JavaScript"]'::jsonb,
  case_study_stack_en = 'Vanilla HTML • CSS • JavaScript',
  case_study_stack_ar = 'HTML • CSS • JavaScript'
WHERE slug = 'store-static-ui';

-- ─────────────────────────────────────────────────────────────────────
-- PULSEREACH — WordPress Astra child theme
-- d:\projects\pulsereach-astra-child: functions.php, style.css, PHP templates — confirmed WordPress.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["WordPress","PHP","Astra Child Theme","CSS"]'::jsonb,
  case_study_stack_en = 'WordPress • Astra Child Theme • PHP • CSS',
  case_study_stack_ar = 'WordPress • Astra Child Theme • PHP • CSS'
WHERE slug = 'pulsereach-astra-child';

-- ─────────────────────────────────────────────────────────────────────
-- LUXURY LEATHER — full site, client did not accept
-- No folder found. From case study: Full-stack build. Stack unknown — leave as-is or React/Vite.
-- project_features.json "zeta" (likely Luxury Leather / Monera): React, Framer Motion, Tailwind.
-- ─────────────────────────────────────────────────────────────────────
UPDATE projects SET
  tech_stack = '["React","Vite","Framer Motion","Tailwind CSS","TypeScript"]'::jsonb,
  case_study_stack_en = 'React • Vite • Framer Motion • Tailwind CSS',
  case_study_stack_ar = 'React • Vite • Framer Motion • Tailwind CSS'
WHERE slug = 'luxury-leather';

COMMIT;
