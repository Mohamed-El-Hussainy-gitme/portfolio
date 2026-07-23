# Hussainy Unified Portfolio

Merged Next.js portfolio + admin dashboard. Single Supabase database (bilingual schema).

## Stack

- Next.js 15 (App Router)
- Supabase (PostgreSQL + Auth + Storage)
- TanStack Query
- Tailwind (dashboard theme: obsidian / cobalt)

## Setup

```bash
cd hussainy-unified
npm install
cp .env.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Database

Run migrations in order in Supabase SQL Editor:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_seed_data.sql` (optional baseline)
3. `supabase/migrations/003_real_seed_data.sql` (canonical data from Hussainy-next)

Regenerate seed from TypeScript data:

```bash
npx tsx src/data/generate_seed.ts
```

## Dev

```bash
npm run dev
```

- Public site: `/` (en), `/ar` (ar)
- Admin: `/admin` (requires Supabase Auth user)

## Source projects

| Folder | Role |
|--------|------|
| `elhussainy-next-extracted` | Content source of truth |
| Root `dashboard for hussainy` | UI theme + admin patterns |
| `hussainy-unified` | **Final merged app** |
