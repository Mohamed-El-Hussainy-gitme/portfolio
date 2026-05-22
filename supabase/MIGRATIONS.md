# Supabase migrations — ترتيب التشغيل

## 1) تصفير قاعدة البيانات (مرة واحدة)

في **SQL Editor** شغّل:

```
supabase/reset-database.sql
```

## 2) المايجريشن بالترتيب (بعد التصفير)

| # | الملف | الوصف |
|---|--------|--------|
| 1 | `migrations/0000_profiles_schema.sql` | profiles + أدوار المشرف |
| 2 | `migrations/001_initial_schema.sql` | المخطط الرئيسي (ثنائي اللغة) |
| 3 | `migrations/004_pages_cms.sql` | هيرو الصفحات + SEO إضافي |
| 4 | `migrations/005_updated_at_triggers.sql` | triggers لـ updated_at |
| 5 | `migrations/002_seed_data.sql` | بذور أساسية (اختياري) |

**إذا ظهر خطأ `policy already exists`:** شغّل `migrations/006_idempotent_policies.sql` ثم أكمل باقي الملفات.

**اختياري ثقيل:** `003_real_seed_data.sql` — يحذف مشاريع موجودة ويملأ بيانات كثيرة.

## لا تشغّل (قديم / متعارض)

نُقل إلى `supabase/_legacy/`:

- `0001_admin_dashboard_schema.sql` — مخطط KV قديم
- `0002_updated_at_triggers.sql` — مكرر (استبدل بـ 005)
- `seed.sql` — بذور لـ schema 0001

## CLI

```bash
supabase db push
```

أو الصق كل ملف بالترتيب في SQL Editor.
