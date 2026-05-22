# Admin Dashboard Continuation - TODO

## Plan confirmation
- [x] Gather repo understanding from `ADMIN-DASHBOARD.md` and existing admin code.

## DB migrations + RLS (Supabase)
- [ ] Add Supabase SQL migrations that create required tables:
  - services
  - projects
  - blog_posts
  - service_reviews
  - contact_messages
  - site_settings
  - plus required indexes and RLS policies (approved-only reads, admin/editor manage writes).
- [ ] Ensure auth/admin role checks align with `src/middleware.ts`.

## App wiring validation
- [ ] Verify `src/lib/db.ts` selects/upserts match the migration schema types (jsonb defaults, numeric conversions, etc.).
- [ ] Verify admin pages use all required fields (including home/about pages via `site_settings`).

## Testing
- [ ] Run `npm run lint` and `npm run build`.
- [ ] Smoke test admin routes:
  - /admin/login
  - /admin (dashboard)
  - /admin/services CRUD
  - /admin/projects CRUD
  - /admin/blog CRUD
  - /admin/reviews approve/delete
  - /admin/messages status update/delete
  - /admin/settings CRUD for `site_settings`
  - /admin/home-page and /admin/about-page site_settings fields

