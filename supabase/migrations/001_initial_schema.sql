-- ============================================================
--  001_initial_schema.sql
--  Mohamed El-Husseiny Portfolio — Full Schema
--  Run once in Supabase SQL Editor (or via Supabase CLI)
-- ============================================================

-- Enable UUID helper (already available in Supabase)
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────
--  1. SITE SETTINGS  (single row, key = 'main')
-- ────────────────────────────────────────────────────────────
create table if not exists site_settings (
  id                          uuid primary key default gen_random_uuid(),
  key                         text not null unique,          -- always 'main'

  owner_name                  text,
  tagline_en                  text,
  tagline_ar                  text,

  hero_heading_en             text,
  hero_heading_ar             text,
  hero_subheading_en          text,
  hero_subheading_ar          text,

  about_bio_en                text,
  about_bio_ar                text,

  email                       text,
  phone_numbers               jsonb    default '[]',         -- ["..."]
  whatsapp                    text,
  whatsapp_quote_message_en   text,

  github_url                  text,
  linkedin_url                text,
  twitter_url                 text,
  youtube_url                 text,
  facebook_url                text,
  instagram_url               text,
  tiktok_url                  text,
  telegram_url                text,

  available_for_work          boolean  default true,
  years_experience            integer  default 0,
  projects_count              integer  default 0,

  meta_title                  text,
  meta_description            text,
  og_image                    text,

  created_at                  timestamptz default now(),
  updated_at                  timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
--  2. PROJECTS
-- ────────────────────────────────────────────────────────────
create table if not exists projects (
  id                          uuid primary key default gen_random_uuid(),
  universe                    integer,
  slug                        text not null unique,
  status                      text not null default 'draft'
                                check (status in ('published','draft')),
  featured                    boolean  default false,

  name_en                     text not null,
  name_ar                     text,
  tagline_en                  text,
  tagline_ar                  text,
  description_en              text,
  description_ar              text,

  focus_keyword_en            text,
  focus_keyword_ar            text,
  seo_title_en                text,
  seo_title_ar                text,
  seo_description_en          text,
  seo_description_ar          text,

  tech_stack                  jsonb    default '[]',         -- ["React","Vite"]
  tags                        jsonb    default '[]',         -- ["ecommerce"]
  repo_url                    text,
  live_url                    text,
  screens                     jsonb    default '[]',         -- [{id,src,alt}]

  case_study_problem_en       text,
  case_study_problem_ar       text,
  case_study_solution_en      text,
  case_study_solution_ar      text,
  case_study_outcome_en       text,
  case_study_outcome_ar       text,
  case_study_role_en          text,
  case_study_role_ar          text,
  case_study_stack_en         text,
  case_study_stack_ar         text,
  case_study_steps_en         jsonb    default '[]',         -- ["step 1","step 2"]
  case_study_steps_ar         jsonb    default '[]',

  faqs                        jsonb    default '[]',         -- [{q_en,q_ar,a_en,a_ar}]

  highlight_key_points_en     text,
  highlight_key_points_ar     text,
  highlight_focus_en          text,
  highlight_focus_ar          text,
  highlight_role_en           text,
  highlight_role_ar           text,

  created_at                  timestamptz default now(),
  updated_at                  timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
--  3. BLOG POSTS
-- ────────────────────────────────────────────────────────────
create table if not exists blog_posts (
  id                          uuid primary key default gen_random_uuid(),
  slug                        text not null unique,
  status                      text not null default 'draft'
                                check (status in ('published','draft')),

  title_en                    text not null,
  title_ar                    text,
  summary_en                  text,
  summary_ar                  text,
  content_en                  text,
  content_ar                  text,

  tags                        jsonb    default '[]',
  cover_image                 text,
  published_date              date,
  reading_time_min            integer  default 5,

  created_at                  timestamptz default now(),
  updated_at                  timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
--  4. SERVICES
-- ────────────────────────────────────────────────────────────
create table if not exists services (
  id                          uuid primary key default gen_random_uuid(),
  "order"                     integer  default 0,
  status                      text not null default 'published'
                                check (status in ('published','draft')),
  slug                        text not null unique,
  icon                        text,
  cover_image                 text,

  keyword_en                  text,
  keyword_ar                  text,
  title_en                    text not null,
  title_ar                    text,
  description_en              text,
  description_ar              text,

  includes_en                 jsonb    default '[]',         -- ["item","item"]
  includes_ar                 jsonb    default '[]',

  seo_title_en                text,
  seo_title_ar                text,
  seo_description_en          text,
  seo_description_ar          text,

  created_at                  timestamptz default now(),
  updated_at                  timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
--  5. SKILLS
-- ────────────────────────────────────────────────────────────
create table if not exists skills (
  id                          uuid primary key default gen_random_uuid(),
  "order"                     integer  default 0,
  category                    text not null default 'Frontend'
                                check (category in (
                                  'Frontend','UI & Styling','Backend',
                                  'State & Data','Tooling','CMS & SEO','Other'
                                )),
  name                        text not null,
  logo_url                    text,
  project_count               integer  default 0,
  visible                     boolean  default true,

  created_at                  timestamptz default now(),
  updated_at                  timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
--  6. REVIEWS
-- ────────────────────────────────────────────────────────────
create table if not exists reviews (
  id                          uuid primary key default gen_random_uuid(),
  "order"                     integer  default 0,
  platform                    text not null,
  rating                      numeric(2,1) default 5
                                check (rating between 1 and 5),
  reviewer_name               text,
  review_text_en              text not null,
  review_text_ar              text,
  review_url                  text,
  screenshot_url              text,
  visible                     boolean  default true,

  created_at                  timestamptz default now(),
  updated_at                  timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
--  7. CONTACT MESSAGES
-- ────────────────────────────────────────────────────────────
create table if not exists contact_messages (
  id                          uuid primary key default gen_random_uuid(),
  name                        text not null,
  email                       text not null,
  budget                      text,
  timeline                    text,
  goal                        text,
  status                      text not null default 'new'
                                check (status in ('new','read','replied')),

  created_at                  timestamptz default now(),
  updated_at                  timestamptz default now()
);

-- ============================================================
--  AUTO-UPDATE updated_at  (trigger function)
-- ============================================================
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Attach trigger to every table
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings','projects','blog_posts',
    'services','skills','reviews','contact_messages'
  ] loop
    execute format(
      'create trigger trg_%s_updated_at
       before update on %I
       for each row execute function update_updated_at();',
      replace(t,'.','_'), t
    );
  end loop;
end;
$$;

-- ============================================================
--  ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
alter table site_settings      enable row level security;
alter table projects           enable row level security;
alter table blog_posts         enable row level security;
alter table services           enable row level security;
alter table skills             enable row level security;
alter table reviews            enable row level security;
alter table contact_messages   enable row level security;

-- ── Public READ policies (published content only) ──────────

drop policy if exists "public_read_site_settings" on site_settings;
create policy "public_read_site_settings"
  on site_settings for select
  using (true);                        -- settings are always public

drop policy if exists "public_read_projects" on projects;
create policy "public_read_projects"
  on projects for select
  using (status = 'published');

drop policy if exists "public_read_blog_posts" on blog_posts;
create policy "public_read_blog_posts"
  on blog_posts for select
  using (status = 'published');

drop policy if exists "public_read_services" on services;
create policy "public_read_services"
  on services for select
  using (status = 'published');

drop policy if exists "public_read_skills" on skills;
create policy "public_read_skills"
  on skills for select
  using (visible = true);

drop policy if exists "public_read_reviews" on reviews;
create policy "public_read_reviews"
  on reviews for select
  using (visible = true);

-- contact_messages: public INSERT only (no read for anonymous)
drop policy if exists "public_insert_contact" on contact_messages;
create policy "public_insert_contact"
  on contact_messages for insert
  with check (true);

-- ── Admin FULL ACCESS policies ─────────────────────────────
-- Authenticated users (your Supabase login) can do everything

drop policy if exists "admin_all_site_settings" on site_settings;
create policy "admin_all_site_settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_projects" on projects;
create policy "admin_all_projects"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_blog_posts" on blog_posts;
create policy "admin_all_blog_posts"
  on blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_services" on services;
create policy "admin_all_services"
  on services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_skills" on skills;
create policy "admin_all_skills"
  on skills for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_reviews" on reviews;
create policy "admin_all_reviews"
  on reviews for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_contact_messages" on contact_messages;
create policy "admin_all_contact_messages"
  on contact_messages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
--  STORAGE BUCKET  (for file uploads)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Allow authenticated users to upload (idempotent — safe to re-run)
drop policy if exists "admin_upload_media" on storage.objects;
create policy "admin_upload_media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "public_read_media" on storage.objects;
create policy "public_read_media"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "admin_manage_media" on storage.objects;
create policy "admin_manage_media"
  on storage.objects for all
  using (bucket_id = 'media' and auth.role() = 'authenticated');
