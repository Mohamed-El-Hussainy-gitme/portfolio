-- إصلاح: إعادة تشغيل المايجريشن دون خطأ "policy already exists"
-- شغّل هذا الملف إذا ظهر خطأ 42710 على storage.objects أو جداول public

-- Storage
drop policy if exists "admin_upload_media" on storage.objects;
drop policy if exists "public_read_media" on storage.objects;
drop policy if exists "admin_manage_media" on storage.objects;

create policy "admin_upload_media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "public_read_media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "admin_manage_media"
  on storage.objects for all
  using (bucket_id = 'media' and auth.role() = 'authenticated');
