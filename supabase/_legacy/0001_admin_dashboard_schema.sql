-- Supabase migrations for Admin Dashboard (match ADMIN-DASHBOARD.md)
-- Creates tables + indexes + RLS policies.

-- Ensure required extension for gen_random_uuid()
create extension if not exists pgcrypto;

-- ----------------------------
-- services
-- ----------------------------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  category text,
  image text,
  gallery jsonb default '[]'::jsonb,
  sections jsonb default '[]'::jsonb,
  sort_order int default 0,
  is_active boolean default true,
  icon_name text,
  price_min numeric(10,2),
  price_max numeric(10,2),
  price_label text,
  price_currency text default 'SAR',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists services_category_idx on public.services(category, is_active);

-- ----------------------------
-- projects
-- ----------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  featured_image text not null,
  gallery jsonb default '[]'::jsonb,
  technologies jsonb default '[]'::jsonb,
  category text,
  client_name text,
  project_url text,
  github_url text,
  sort_order int default 0,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists projects_featured_idx on public.projects(is_featured, is_active);

-- ----------------------------
-- blog_posts
-- ----------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text,
  featured_image text,
  category text,
  tags jsonb default '[]'::jsonb,
  author_id uuid references public.profiles(id),
  views_count int default 0,
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists blog_posts_published_idx on public.blog_posts(is_published, published_at desc);

-- ----------------------------
-- service_reviews
-- ----------------------------
create table if not exists public.service_reviews (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete cascade,
  reviewer_name text not null,
  reviewer_email text,
  rating int not null check (rating between 1 and 5),
  body text,
  is_approved boolean default false,
  is_featured boolean default false,
  created_at timestamptz default now()
);

create index if not exists reviews_service_idx on public.service_reviews(service_id, is_approved);

-- ----------------------------
-- contact_messages
-- ----------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text default 'new',
  priority text default 'normal',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists messages_status_idx on public.contact_messages(status, created_at desc);

-- ----------------------------
-- site_settings
-- ----------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text unique not null,
  setting_value text,
  data_type text default 'string',
  description text,
  updated_at timestamptz default now()
);

-- Seed common settings (safe upsert)
insert into public.site_settings (setting_key, setting_value, data_type)
values
  ('site_title', 'Elhussainy Portfolio', 'string'),
  ('site_description', 'Full Stack Developer Portfolio', 'string'),
  ('cv_download_url', '/files/cv.pdf', 'string'),
  ('review_external_url', 'https://google.com', 'string'),
  ('contact_email', 'hello@elhussainy.com', 'string')
on conflict (setting_key) do nothing;

-- ----------------------------
-- RLS helpers
-- Assumes `public.profiles` has `role` with values like: 'admin' | 'editor'
-- ----------------------------

-- services RLS
alter table public.services enable row level security;

-- Public read
drop policy if exists "public read active services" on public.services;
create policy "public read active services"
  on public.services for select
  using (is_active = true);

-- Admin/editor manage
drop policy if exists "admins manage services" on public.services;
create policy "admins manage services"
  on public.services for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','editor')
    )
  );

-- projects RLS
alter table public.projects enable row level security;

drop policy if exists "public read active projects" on public.projects;
create policy "public read active projects"
  on public.projects for select
  using (is_active = true);

drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects"
  on public.projects for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','editor')
    )
  );

-- blog_posts RLS
alter table public.blog_posts enable row level security;

drop policy if exists "public read published blog posts" on public.blog_posts;
create policy "public read published blog posts"
  on public.blog_posts for select
  using (is_published = true);

drop policy if exists "admins manage blog posts" on public.blog_posts;
create policy "admins manage blog posts"
  on public.blog_posts for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','editor')
    )
  );

-- service_reviews RLS
alter table public.service_reviews enable row level security;

drop policy if exists "public read approved reviews" on public.service_reviews;
create policy "public read approved reviews"
  on public.service_reviews for select
  using (is_approved = true);

drop policy if exists "admins manage reviews" on public.service_reviews;
create policy "admins manage reviews"
  on public.service_reviews for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','editor')
    )
  );

-- contact_messages RLS
alter table public.contact_messages enable row level security;

-- Public cannot read; but clients can insert (optional). Here allow insert for authenticated? Keeping permissive for public insert.
-- If you want to restrict inserts, adjust to match your contact form auth strategy.

drop policy if exists "public insert contact messages" on public.contact_messages;
create policy "public insert contact messages"
  on public.contact_messages for insert
  with check (true);

-- Admin/editor manage

drop policy if exists "admins manage contact messages" on public.contact_messages;
create policy "admins manage contact messages"
  on public.contact_messages for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','editor')
    )
  );

-- site_settings RLS
alter table public.site_settings enable row level security;

-- Public read of selected settings: allow all select (or restrict). Your app may need these values publicly.

drop policy if exists "public read site settings" on public.site_settings;
create policy "public read site settings"
  on public.site_settings for select
  using (true);

-- Admin/editor manage

drop policy if exists "admins manage site settings" on public.site_settings;
create policy "admins manage site settings"
  on public.site_settings for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','editor')
    )
  );

-- Note:
-- This migration does not create triggers for updated_at.
-- Add triggers if you need strict updated_at maintenance.

