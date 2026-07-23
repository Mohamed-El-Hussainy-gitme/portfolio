'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Edit, Trash2 } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchBlogPosts, upsertBlogPost, deleteBlogPost, blogToAdminForm } from '@/lib/db';
import SeoFieldsGroup, { type SeoFormFields } from '@/components/admin/SeoFieldsGroup';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { getAssetPath } from '@/core/utils/assetPath';

const EMPTY_FORM = {
  slug: '',
  status: 'draft' as 'draft' | 'published',
  title_en: '',
  title_ar: '',
  summary_en: '',
  summary_ar: '',
  content_en: '',
  content_ar: '',
  cover_image: '',
  published_date: '',
  reading_time_min: 5,
  tags: [] as string[],
  seo_title_en: '',
  seo_title_ar: '',
  seo_description_en: '',
  seo_description_ar: '',
  focus_keyword_en: '',
  focus_keyword_ar: '',
};

function FieldSet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-border rounded-lg p-4 space-y-4 bg-muted/10">
      <legend className="px-2 font-heading text-lg text-primary">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function AdminBlog() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [tagsInput, setTagsInput] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: () => fetchBlogPosts(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      editing?.id ? upsertBlogPost({ ...data, id: editing.id }) : upsertBlogPost(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-blog'] });
      qc.invalidateQueries({ queryKey: ['blog'] });
      setOpen(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      setTagsInput('');
      toast.success('تم الحفظ بنجاح');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-blog'] });
      toast.success('تم الحذف بنجاح');
    },
  });

  const handleOpen = (post?: Record<string, unknown>) => {
    if (post) {
      setEditing(post);
      const f = blogToAdminForm(post);
      setForm({ ...EMPTY_FORM, ...f });
      setTagsInput(f.tags.join(', '));
    } else {
      setEditing(null);
      setForm(EMPTY_FORM);
      setTagsInput('');
    }
    setOpen(true);
  };

  const seoValues: SeoFormFields = {
    seo_title_en: form.seo_title_en,
    seo_title_ar: form.seo_title_ar,
    seo_description_en: form.seo_description_en,
    seo_description_ar: form.seo_description_ar,
    focus_keyword_en: form.focus_keyword_en,
    focus_keyword_ar: form.focus_keyword_ar,
  };

  return (
    <>
      <PageHeader
        title="إدارة المدونة"
        subtitle="المقالات، الصور، وSEO"
        action={<Button onClick={() => handleOpen()}>+ مقالة جديدة</Button>}
      />

      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post: Record<string, unknown>) => {
              const f = blogToAdminForm(post);
              return (
                <div
                  key={String(post.id)}
                  className="p-4 bg-card border border-border rounded-lg flex justify-between gap-4 font-heading"
                >
                  <div className="flex gap-3 flex-1 min-w-0">
                    {f.cover_image ? (
                      <div className="w-14 h-14 rounded overflow-hidden border shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={getAssetPath(f.cover_image)} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{f.title_en || f.title_ar}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{f.summary_en}</p>
                      <span
                        className={`text-xs mt-2 inline-block px-2 py-1 rounded ${
                          f.status === 'published'
                            ? 'bg-green-500/10 text-green-700'
                            : 'bg-orange-500/10 text-orange-700'
                        }`}
                      >
                        {f.status === 'published' ? 'منشورة' : 'مسودة'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => handleOpen(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(String(post.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] flex flex-col p-0" dir="rtl">
          <DialogHeader className="p-6 pb-2 shrink-0">
            <DialogTitle className="font-heading text-right text-xl">
              {editing ? 'تعديل المقالة' : 'إضافة مقالة جديدة'}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate({
                ...form,
                tags: tagsInput
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              });
            }}
            className="flex-1 overflow-y-auto px-6 pb-6 space-y-6"
          >
            <FieldSet title="الأساسيات">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>العنوان (EN)</Label>
                  <Input
                    value={form.title_en}
                    onChange={(e) => setForm((f) => ({ ...f, title_en: e.target.value }))}
                    required
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>العنوان (AR)</Label>
                  <Input
                    value={form.title_ar}
                    onChange={(e) => setForm((f) => ({ ...f, title_ar: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Slug</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    dir="ltr"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) => setForm((f) => ({ ...f, status: v as 'draft' | 'published' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">منشورة</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الملخص (EN)</Label>
                  <Textarea
                    value={form.summary_en}
                    onChange={(e) => setForm((f) => ({ ...f, summary_en: e.target.value }))}
                    rows={3}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>الملخص (AR)</Label>
                  <Textarea
                    value={form.summary_ar}
                    onChange={(e) => setForm((f) => ({ ...f, summary_ar: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تاريخ النشر</Label>
                  <Input
                    type="date"
                    value={form.published_date}
                    onChange={(e) => setForm((f) => ({ ...f, published_date: e.target.value }))}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>الوسوم (مفصولة بفاصلة)</Label>
                  <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} dir="ltr" />
                </div>
              </div>
            </FieldSet>

            <FieldSet title="المحتوى الكامل (Markdown / HTML)">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>المحتوى (EN)</Label>
                  <Textarea
                    value={form.content_en}
                    onChange={(e) => setForm((f) => ({ ...f, content_en: e.target.value }))}
                    rows={12}
                    dir="ltr"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label>المحتوى (AR)</Label>
                  <Textarea
                    value={form.content_ar}
                    onChange={(e) => setForm((f) => ({ ...f, content_ar: e.target.value }))}
                    rows={12}
                    dir="rtl"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </FieldSet>

            <FieldSet title="الصور">
              <ImageUploadField
                label="صورة الغلاف"
                value={form.cover_image}
                onChange={(cover_image) => setForm((f) => ({ ...f, cover_image }))}
              />
            </FieldSet>

            <SeoFieldsGroup
              values={seoValues}
              onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
            />

            <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t mt-6">
              <Button type="submit" disabled={saveMutation.isPending} className="w-full font-heading h-12 text-lg">
                {saveMutation.isPending ? 'جاري الحفظ...' : 'حفظ المقالة'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
