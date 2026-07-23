-- Supabase seed (English + Arabic)
-- Safe inserts for site_settings and optional demo profile roles.

-- Seed common settings (safe upsert)
insert into public.site_settings (setting_key, setting_value, data_type)
values
  ('site_title', 'Elhussainy Portfolio', 'string'),
  ('site_description', 'Full Stack Developer Portfolio', 'string'),
  ('cv_download_url', '/files/cv.pdf', 'string'),
  ('review_external_url', 'https://google.com', 'string'),
  ('contact_email', 'hello@elhussainy.com', 'string')
on conflict (setting_key) do nothing;

-- Arabic seeds (optional, if you display i18n settings)
insert into public.site_settings (setting_key, setting_value, data_type)
values
  ('site_title_ar', 'محفظة حسني الإحساني', 'string'),
  ('site_description_ar', 'محفظة مطور ويب متكامل', 'string'),
  ('contact_email_ar', 'hello@elhussainy.com', 'string')
on conflict (setting_key) do nothing;

-- NOTE:
-- Do not seed roles/users here unless you have a known auth user id.
-- Profiles will be created by your auth/on-signup hook or by application logic.

