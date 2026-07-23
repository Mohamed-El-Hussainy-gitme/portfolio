-- Supabase migration: profiles table for admin/editor role-based access
-- This is required by later migrations (0001_admin_dashboard_schema.sql)

-- Ensure required extension for gen_random_uuid()
create extension if not exists pgcrypto;

-- Create profiles table if it doesn't exist
create table if not exists public.profiles (
  id uuid primary key,
  role text not null default 'editor' check (role in ('admin','editor')),
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint profiles_id_fkey
    foreign key (id)
    references auth.users(id)
    on delete cascade
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
-- Users can read their own profile
drop policy if exists "public read own profile" on public.profiles;
create policy "public read own profile"
  on public.profiles for select
  using (id = auth.uid());

-- Users can update their own profile
drop policy if exists "public update own profile" on public.profiles;
create policy "public update own profile"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- Admin/editor can read profiles (optional; can be tightened)
-- Using the role column requires that policies themselves don't deadlock.
-- So we allow only authenticated users with known role.
drop policy if exists "admins read profiles" on public.profiles;
create policy "admins read profiles"
  on public.profiles for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin','editor')
  ));

-- Keep updated_at in sync
-- (If you later add the trigger elsewhere, having it here is harmless.)
drop function if exists public.set_profiles_updated_at();
create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_profiles_updated_at();

