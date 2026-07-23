-- Page heroes, per-page SEO, and extra site settings for the admin dashboard

alter table site_settings
  add column if not exists pages_meta jsonb default '{}',
  add column if not exists meta_keywords text,
  add column if not exists google_analytics_id text,
  add column if not exists cv_download_url text,
  add column if not exists review_external_url text,
  add column if not exists hero_cta_link text,
  add column if not exists home_sections jsonb default '{}';

comment on column site_settings.pages_meta is 'Per-page hero + SEO: projects, services, about, blog, contact';

alter table blog_posts
  add column if not exists seo_title_en text,
  add column if not exists seo_title_ar text,
  add column if not exists seo_description_en text,
  add column if not exists seo_description_ar text;
