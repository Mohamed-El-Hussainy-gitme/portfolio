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
import { fetchServices, upsertService, deleteService, serviceToAdminForm } from '@/lib/db';
import SeoFieldsGroup, { type SeoFormFields } from '@/components/admin/SeoFieldsGroup';
import ImageUploadField from '@/components/admin/ImageUploadField';
import StringArrayEditor from '@/components/admin/StringArrayEditor';
import { getAssetPath } from '@/core/utils/assetPath';

const EMPTY_FORM = {
  slug: '',
  status: 'published' as 'draft' | 'published',
  order: 0,
  icon: '',
  cover_image: '',
  title_en: '',
  title_ar: '',
  description_en: '',
  description_ar: '',
  keyword_en: '',
  keyword_ar: '',
  seo_title_en: '',
  seo_title_ar: '',
  seo_description_en: '',
  seo_description_ar: '',
  focus_keyword_en: '',
  focus_keyword_ar: '',
  includes_en: [] as string[],
  includes_ar: [] as string[],
};

function FieldSet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-border rounded-lg p-4 space-y-4 bg-muted/10">
      <legend className="px-2 font-heading text-lg text-primary">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function AdminServices() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: () => fetchServices(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      editing?.id ? upsertService({ ...data, id: editing.id }) : upsertService(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-services'] });
      qc.invalidateQueries({ queryKey: ['services'] });
      setOpen(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      toast.success('تم الحفظ بنجاح');
    },
    onError: (error: Error) => toast.error(error.message || 'فشل الحفظ'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-services'] });
      qc.invalidateQueries({ queryKey: ['services'] });
      toast.success('تم الحذف بنجاح');
    },
  });

  const handleOpen = (service?: Record<string, unknown>) => {
    if (service) {
      setEditing(service);
      const f = serviceToAdminForm(service);
      setForm(f);
    } else {
      setEditing(null);
      setForm(EMPTY_FORM);
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
        title="إدارة الخدمات"
        subtitle="الخدمات، الصور، وSEO"
        action={<Button onClick={() => handleOpen()}>+ خدمة جديدة</Button>}
      />

      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service: Record<string, unknown>) => {
              const f = serviceToAdminForm(service);
              return (
                <div
                  key={String(service.id)}
                  className="p-4 bg-card border border-border rounded-lg flex justify-between items-start gap-4 font-heading"
                >
                  <div className="flex gap-3 flex-1 min-w-0">
                    {f.cover_image ? (
                      <div className="w-14 h-14 rounded overflow-hidden border shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getAssetPath(f.cover_image)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{f.title_en || f.title_ar}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{f.description_en}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {f.status} · {f.slug}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => handleOpen(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(String(service.id))}
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
              {editing ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate({
                ...form,
                keyword_en: form.focus_keyword_en,
                keyword_ar: form.focus_keyword_ar,
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
                      <SelectItem value="published">منشور</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الوصف (EN)</Label>
                  <Textarea
                    value={form.description_en}
                    onChange={(e) => setForm((f) => ({ ...f, description_en: e.target.value }))}
                    rows={3}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>الوصف (AR)</Label>
                  <Textarea
                    value={form.description_ar}
                    onChange={(e) => setForm((f) => ({ ...f, description_ar: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </FieldSet>

            <FieldSet title="المخرجات (Includes)">
              <div className="grid grid-cols-2 gap-4">
                <StringArrayEditor
                  label="المخرجات (EN)"
                  items={form.includes_en}
                  onChange={(items) => setForm((f) => ({ ...f, includes_en: items }))}
                  dir="ltr"
                  placeholder="Included feature..."
                />
                <StringArrayEditor
                  label="المخرجات (AR)"
                  items={form.includes_ar}
                  onChange={(items) => setForm((f) => ({ ...f, includes_ar: items }))}
                  dir="rtl"
                  placeholder="ميزة مضمنة..."
                />
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
                {saveMutation.isPending ? 'جاري الحفظ...' : 'حفظ الخدمة'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
