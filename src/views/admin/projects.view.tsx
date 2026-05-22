'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Edit, Trash2, ImageIcon } from 'lucide-react';
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
import { fetchProjects, upsertProject, deleteProject } from '@/lib/db';
import SeoFieldsGroup, { type SeoFormFields } from '@/components/admin/SeoFieldsGroup';
import ScreensEditor from '@/components/admin/ScreensEditor';
import { getAssetPath } from '@/core/utils/assetPath';
import type { ProjectScreen } from '@/types/pageContent';

const EMPTY_FORM = {
  slug: '',
  status: 'draft' as 'draft' | 'published',
  featured: false,
  universe: 0,
  name_en: '',
  name_ar: '',
  tagline_en: '',
  tagline_ar: '',
  description_en: '',
  description_ar: '',
  live_url: '',
  repo_url: '',
  tech_stack: [] as string[],
  tags: [] as string[],
  screens: [] as ProjectScreen[],
  seo_title_en: '',
  seo_title_ar: '',
  seo_description_en: '',
  seo_description_ar: '',
  focus_keyword_en: '',
  focus_keyword_ar: '',
};

function parseList(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminProjects() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [techInput, setTechInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => fetchProjects(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      editing?.id ? upsertProject({ ...data, id: editing.id }) : upsertProject(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      qc.invalidateQueries({ queryKey: ['projects'] });
      setOpen(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      setTechInput('');
      setTagsInput('');
      toast.success('تم الحفظ بنجاح');
    },
    onError: (error: Error) => toast.error(error.message || 'فشل الحفظ'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      qc.invalidateQueries({ queryKey: ['projects'] });
      toast.success('تم الحذف بنجاح');
    },
  });

  const handleOpen = (project?: Record<string, unknown>) => {
    if (project) {
      setEditing(project);
      const screens = (project.screens as ProjectScreen[]) ?? [];
      setForm({
        ...EMPTY_FORM,
        slug: String(project.slug ?? ''),
        status: (project.status as 'draft' | 'published') ?? 'draft',
        featured: Boolean(project.featured),
        universe: Number(project.universe) || 0,
        name_en: String(project.name_en ?? ''),
        name_ar: String(project.name_ar ?? ''),
        tagline_en: String(project.tagline_en ?? ''),
        tagline_ar: String(project.tagline_ar ?? ''),
        description_en: String(project.description_en ?? ''),
        description_ar: String(project.description_ar ?? ''),
        live_url: String(project.live_url ?? ''),
        repo_url: String(project.repo_url ?? ''),
        tech_stack: (project.tech_stack as string[]) ?? [],
        tags: (project.tags as string[]) ?? [],
        screens,
        seo_title_en: String(project.seo_title_en ?? ''),
        seo_title_ar: String(project.seo_title_ar ?? ''),
        seo_description_en: String(project.seo_description_en ?? ''),
        seo_description_ar: String(project.seo_description_ar ?? ''),
        focus_keyword_en: String(project.focus_keyword_en ?? ''),
        focus_keyword_ar: String(project.focus_keyword_ar ?? ''),
      });
      setTechInput(((project.tech_stack as string[]) ?? []).join(', '));
      setTagsInput(((project.tags as string[]) ?? []).join(', '));
    } else {
      setEditing(null);
      setForm(EMPTY_FORM);
      setTechInput('');
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
        title="إدارة المشاريع"
        subtitle="المشاريع، الصور، وSEO لكل مشروع"
        action={<Button onClick={() => handleOpen()}>+ مشروع جديد</Button>}
      />

      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project: Record<string, unknown>) => {
              const screens = (project.screens as ProjectScreen[]) ?? [];
              const cover = screens[0]?.src;
              return (
                <div
                  key={String(project.id)}
                  className="p-4 bg-card border border-border rounded-lg flex justify-between items-start gap-4 font-heading"
                >
                  <div className="flex gap-3 flex-1 min-w-0">
                    {cover ? (
                      <div className="w-16 h-12 rounded overflow-hidden border border-border shrink-0 bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getAssetPath(cover)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-12 rounded border border-dashed border-border flex items-center justify-center shrink-0">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{String(project.name_en)}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {String(project.tagline_en)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {String(project.status)} · {String(project.slug)} · {screens.length} صورة
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => handleOpen(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(String(project.id))}
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
        <DialogContent className="max-w-3xl max-h-[90vh]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-heading text-right">
              {editing ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate({
                ...form,
                tech_stack: parseList(techInput),
                tags: parseList(tagsInput),
                screens: form.screens.filter((s) => s.src.trim()),
              });
            }}
            className="space-y-4 overflow-y-auto max-h-[70vh] pr-1"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="font-heading">الاسم (EN)</Label>
                <Input
                  value={form.name_en}
                  onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="font-heading">الاسم (AR)</Label>
                <Input
                  value={form.name_ar}
                  onChange={(e) => setForm((f) => ({ ...f, name_ar: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2 col-span-2">
                <Label className="font-heading">Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  dir="ltr"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="font-heading">الحالة</Label>
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="font-heading">Tagline (EN)</Label>
                <Textarea
                  value={form.tagline_en}
                  onChange={(e) => setForm((f) => ({ ...f, tagline_en: e.target.value }))}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-heading">Tagline (AR)</Label>
                <Textarea
                  value={form.tagline_ar}
                  onChange={(e) => setForm((f) => ({ ...f, tagline_ar: e.target.value }))}
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="font-heading">التقنيات (مفصولة بفاصلة)</Label>
                <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label className="font-heading">الوسوم</Label>
                <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} dir="ltr" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="font-heading">Live URL</Label>
                <Input
                  value={form.live_url}
                  onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-heading">GitHub</Label>
                <Input
                  value={form.repo_url}
                  onChange={(e) => setForm((f) => ({ ...f, repo_url: e.target.value }))}
                  dir="ltr"
                />
              </div>
            </div>

            <ScreensEditor
              screens={form.screens}
              onChange={(screens) => setForm((f) => ({ ...f, screens }))}
            />

            <SeoFieldsGroup
              values={seoValues}
              onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
            />

            <Button type="submit" disabled={saveMutation.isPending} className="w-full font-heading">
              {saveMutation.isPending ? 'جاري الحفظ...' : 'حفظ'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
