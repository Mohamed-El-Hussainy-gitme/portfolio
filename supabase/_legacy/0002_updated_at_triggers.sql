-- Adds updated_at triggers for tables used in the Admin Dashboard.
-- Fixes updated_at automatically on any UPDATE.

-- Create function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;



-- services
drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

-- projects
drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

-- blog_posts
drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- service_reviews (no updated_at column in ADMIN-DASHBOARD.md)
-- Only create trigger if column exists.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'service_reviews' and column_name = 'updated_at'
  ) then
    drop trigger if exists set_service_reviews_updated_at on public.service_reviews;
    create trigger set_service_reviews_updated_at
    before update on public.service_reviews
    for each row execute function public.set_updated_at();
  end if;
end$$;

-- contact_messages (has updated_at)
drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
create trigger set_contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

-- site_settings (has updated_at)
drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

