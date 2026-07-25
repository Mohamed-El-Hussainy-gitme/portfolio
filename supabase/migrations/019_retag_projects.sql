-- Migration: 019_retag_projects
-- Reassign project tags to match the new 6 service categories:
-- saas | erp-crm-pos | corporate | ecommerce | rescue | seo

BEGIN;

-- ── SaaS & Custom Web Applications ────────────────────────────────
UPDATE projects SET tags = '["saas"]'::jsonb WHERE slug = 'ahwa-saas-platform';
UPDATE projects SET tags = '["saas"]'::jsonb WHERE slug = 'freelawyers-platform';
UPDATE projects SET tags = '["saas"]'::jsonb WHERE slug = 'nilu-tourism';
UPDATE projects SET tags = '["saas"]'::jsonb WHERE slug = 'restaurant-specialized-saas';
UPDATE projects SET tags = '["saas"]'::jsonb WHERE slug = 'noda-ai-tool';
UPDATE projects SET tags = '["saas"]'::jsonb WHERE slug = 'arab-anglais';
UPDATE projects SET tags = '["saas"]'::jsonb WHERE slug = 'monera-platform';

-- ── Business Management Systems (CRM / ERP / POS) ─────────────────
UPDATE projects SET tags = '["erp-crm-pos"]'::jsonb WHERE slug = 'al-ola-oil-collection';
UPDATE projects SET tags = '["erp-crm-pos"]'::jsonb WHERE slug = 'pos-system-nextjs';
UPDATE projects SET tags = '["erp-crm-pos"]'::jsonb WHERE slug = 'kenz-ecommerce';
UPDATE projects SET tags = '["erp-crm-pos"]'::jsonb WHERE slug = 'crm-system-python';
UPDATE projects SET tags = '["erp-crm-pos"]'::jsonb WHERE slug = 'crm-system-nextjs';
UPDATE projects SET tags = '["erp-crm-pos"]'::jsonb WHERE slug = 'dashboard-admin-ui';
UPDATE projects SET tags = '["erp-crm-pos"]'::jsonb WHERE slug = 'animation-studio-system';

-- ── Corporate & Business Websites ─────────────────────────────────
UPDATE projects SET tags = '["corporate"]'::jsonb WHERE slug = 'bcc-fullstack';
UPDATE projects SET tags = '["corporate"]'::jsonb WHERE slug = 'arab-tourism';
UPDATE projects SET tags = '["corporate"]'::jsonb WHERE slug = 'real-estate-ui';
UPDATE projects SET tags = '["corporate"]'::jsonb WHERE slug = 'nori-restaurant-ui';
UPDATE projects SET tags = '["corporate"]'::jsonb WHERE slug = 'noda-clothing-brand';
UPDATE projects SET tags = '["corporate"]'::jsonb WHERE slug = 'holospace-simulator';
UPDATE projects SET tags = '["corporate"]'::jsonb WHERE slug = 'multiverse-showcase';

-- ── E-Commerce Development ─────────────────────────────────────────
UPDATE projects SET tags = '["ecommerce"]'::jsonb WHERE slug = 'rose-ecommerce';
UPDATE projects SET tags = '["ecommerce"]'::jsonb WHERE slug = 'al-afkham-woocommerce';
UPDATE projects SET tags = '["ecommerce"]'::jsonb WHERE slug = 'gedo-store';
UPDATE projects SET tags = '["ecommerce"]'::jsonb WHERE slug = 'lamar-ecommerce';
UPDATE projects SET tags = '["ecommerce"]'::jsonb WHERE slug = 'alkhair-store';
UPDATE projects SET tags = '["ecommerce"]'::jsonb WHERE slug = 'store-static-ui';

-- ── Project Rescue & Technical Optimization ────────────────────────
UPDATE projects SET tags = '["rescue"]'::jsonb WHERE slug = 'lakatat-platform-rescue';
UPDATE projects SET tags = '["rescue"]'::jsonb WHERE slug = 'pulsereach-astra-child';
UPDATE projects SET tags = '["rescue"]'::jsonb WHERE slug = 'framemasters';

-- ── Technical SEO & Performance ────────────────────────────────────
UPDATE projects SET tags = '["seo"]'::jsonb WHERE slug = 'growlik-seo';
UPDATE projects SET tags = '["seo"]'::jsonb WHERE slug = 'saqi-sa-seo';
UPDATE projects SET tags = '["seo"]'::jsonb WHERE slug = 'vortexq8-seo';

COMMIT;
