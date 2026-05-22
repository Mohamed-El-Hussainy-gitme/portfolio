-- ============================================================
--  RESET — يمسح كل بيانات وجداول المشروع (تشغيل يدوي فقط)
--  شغّله في Supabase SQL Editor قبل إعادة تطبيق المايجريشن
--  تحذير: لا يمكن التراجع — كل المحتوى سيُحذف
-- ============================================================

-- إيقاف triggers مؤقتًا
set session_replication_role = 'replica';

-- جداول التطبيق (ترتيب يعتمد على FK)
-- استخدم DROP IF EXISTS لتجنب الأخطاء
drop table if exists public.contact_messages cascade;
drop table if exists public.reviews cascade;
drop table if exists public.skills cascade;
drop table if exists public.blog_posts cascade;
drop table if exists public.services cascade;
drop table if exists public.projects cascade;
drop table if exists public.site_settings cascade;

-- جداول لوحة قديمة (إن وُجدت من schema قديم)
drop table if exists public.service_reviews cascade;

-- Auth profiles
drop table if exists public.profiles cascade;

-- دالة triggers
drop function if exists public.update_updated_at() cascade;
drop function if exists public.set_updated_at() cascade;

-- سياسات Storage (تبقى حتى بعد حذف الجداول)
-- لا حاجة لتنفيذ هذا إذا كانت الجداول لم تُنشأ بعد
-- drop policy if exists "admin_upload_media" on storage.objects;
-- drop policy if exists "public_read_media" on storage.objects;
-- drop policy if exists "admin_manage_media" on storage.objects;

set session_replication_role = 'origin';

-- اختياري: مسح ملفات bucket الوسائط (نفّذ من Storage UI أو):
-- delete from storage.objects where bucket_id = 'media';

-- بعد التنفيذ، طبّق المايجريشن بالترتيب:
-- 1. npm run db:reset (هذا الملف)
-- 2. 001_initial_schema.sql
-- 3. 002_seed_data.sql (إن لزم)
-- 4. 005_fix_site_settings.sql (الميجريشن الجديد)
