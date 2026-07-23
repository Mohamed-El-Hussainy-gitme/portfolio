-- ============================================================
--  005_fix_site_settings.sql
--  Fix SETTING_COLUMN_MAP conflicts and add missing columns
--  Update contact_messages schema to match Admin Dashboard UI
-- ============================================================

-- ────────────────────────────────────────────────────────────
--  1. ADD MISSING COLUMNS TO site_settings
-- ────────────────────────────────────────────────────────────

-- Add bilingual About section columns
alter table site_settings add column if not exists about_title_en text;
alter table site_settings add column if not exists about_title_ar text;

-- Add bilingual Story section columns
alter table site_settings add column if not exists story_title_en text;
alter table site_settings add column if not exists story_title_ar text;
alter table site_settings add column if not exists story_content_en text;
alter table site_settings add column if not exists story_content_ar text;

-- Add bilingual Location/About Location columns
alter table site_settings add column if not exists about_location_en text;
alter table site_settings add column if not exists about_location_ar text;

-- Add avatar and clients count
alter table site_settings add column if not exists about_avatar_url text;
alter table site_settings add column if not exists clients_count integer default 0;

-- Add CTA link if missing
alter table site_settings add column if not exists hero_cta_link text;

-- Add metadata keywords if missing
alter table site_settings add column if not exists meta_keywords text;

-- Add analytics ID if missing
alter table site_settings add column if not exists google_analytics_id text;

-- Add CV download URL if missing
alter table site_settings add column if not exists cv_download_url text;

-- Add review external URL if missing
alter table site_settings add column if not exists review_external_url text;

-- Add home_sections JSONB for dynamic sections (skills, why, cta, etc.)
alter table site_settings add column if not exists home_sections jsonb default '{}';

-- Add pages_meta JSONB for per-page metadata and content
alter table site_settings add column if not exists pages_meta jsonb default '{}';

-- ────────────────────────────────────────────────────────────
--  2. UPDATE contact_messages SCHEMA
-- ────────────────────────────────────────────────────────────

-- Add phone, subject, message columns
alter table contact_messages add column if not exists phone text;
alter table contact_messages add column if not exists subject text;
alter table contact_messages add column if not exists message text;

-- Keep budget, timeline, goal for backward compatibility (but no longer map to them)
-- The UI will use phone, subject, message instead

-- ────────────────────────────────────────────────────────────
--  3. VERIFY TRIGGERS AND INDEXES
-- ────────────────────────────────────────────────────────────

-- Ensure updated_at trigger exists for site_settings
do $$
begin
  if not exists(select 1 from pg_trigger where tgname = 'trg_site_settings_updated_at') then
    create trigger trg_site_settings_updated_at
      before update on site_settings
      for each row execute function update_updated_at();
  end if;
end
$$;

-- Index for faster contact message queries
create index if not exists idx_contact_messages_status_date
  on contact_messages(status, created_at desc);
