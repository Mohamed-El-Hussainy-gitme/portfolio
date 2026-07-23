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
import StringArrayEditor from '@/components/admin/StringArrayEditor';
import FaqEditor, { type FaqItem } from '@/components/admin/FaqEditor';
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
  case_study_problem_en: '',
  case_study_problem_ar: '',
  case_study_solution_en: '',
  case_study_solution_ar: '',
  case_study_outcome_en: '',
  case_study_outcome_ar: '',
  case_study_role_en: '',
  case_study_role_ar: '',
  case_study_stack_en: '',
  case_study_stack_ar: '',
  case_study_steps_en: [] as string[],
  case_study_steps_ar: [] as string[],
  faqs: [] as FaqItem[],
  highlight_key_points_en: '',
  highlight_key_points_ar: '',
  highlight_focus_en: '',
  highlight_focus_ar: '',
  highlight_role_en: '',
  highlight_role_ar: '',
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

function FieldSet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-border rounded-lg p-4 space-y-4 bg-muted/10">
      <legend className="px-2 font-heading text-lg text-primary">{title}</legend>
      {children}
    </fieldset>
  );
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
        case_study_problem_en: String(project.case_study_problem_en ?? ''),
        case_study_problem_ar: String(project.case_study_problem_ar ?? ''),
        case_study_solution_en: String(project.case_study_solution_en ?? ''),
        case_study_solution_ar: String(project.case_study_solution_ar ?? ''),
        case_study_outcome_en: String(project.case_study_outcome_en ?? ''),
        case_study_outcome_ar: String(project.case_study_outcome_ar ?? ''),
        case_study_role_en: String(project.case_study_role_en ?? ''),
        case_study_role_ar: String(project.case_study_role_ar ?? ''),
        case_study_stack_en: String(project.case_study_stack_en ?? ''),
        case_study_stack_ar: String(project.case_study_stack_ar ?? ''),
        case_study_steps_en: (project.case_study_steps_en as string[]) ?? [],
        case_study_steps_ar: (project.case_study_steps_ar as string[]) ?? [],
        faqs: (project.faqs as FaqItem[]) ?? [],
        highlight_key_points_en: String(project.highlight_key_points_en ?? ''),
        highlight_key_points_ar: String(project.highlight_key_points_ar ?? ''),
        highlight_focus_en: String(project.highlight_focus_en ?? ''),
        highlight_focus_ar: String(project.highlight_focus_ar ?? ''),
        highlight_role_en: String(project.highlight_role_en ?? ''),
        highlight_role_ar: String(project.highlight_role_ar ?? ''),
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
        <DialogContent className="max-w-4xl max-h-[95vh] flex flex-col p-0" dir="rtl">
          <DialogHeader className="p-6 pb-2 shrink-0">
            <DialogTitle className="font-heading text-right text-xl">
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
            className="flex-1 overflow-y-auto px-6 pb-6 space-y-6"
          >
            <FieldSet title="الأساسيات">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الاسم (EN)</Label>
                  <Input value={form.name_en} onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))} required dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>الاسم (AR)</Label>
                  <Input value={form.name_ar} onChange={(e) => setForm((f) => ({ ...f, name_ar: e.target.value }))} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Slug</Label>
                  <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} dir="ltr" required />
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v as 'draft' | 'published' }))}>
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
                  <Label>Tagline (EN)</Label>
                  <Textarea value={form.tagline_en} onChange={(e) => setForm((f) => ({ ...f, tagline_en: e.target.value }))} rows={2} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>Tagline (AR)</Label>
                  <Textarea value={form.tagline_ar} onChange={(e) => setForm((f) => ({ ...f, tagline_ar: e.target.value }))} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>الوصف (EN)</Label>
                  <Textarea value={form.description_en} onChange={(e) => setForm((f) => ({ ...f, description_en: e.target.value }))} rows={3} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>الوصف (AR)</Label>
                  <Textarea value={form.description_ar} onChange={(e) => setForm((f) => ({ ...f, description_ar: e.target.value }))} rows={3} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>التقنيات (مفصولة بفاصلة)</Label>
                  <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>الوسوم</Label>
                  <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} dir="ltr" />
                </div>
              </div>
            </FieldSet>

            <FieldSet title="دراسة الحالة (Case Study)">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>المشكلة (EN)</Label>
                  <Textarea value={form.case_study_problem_en} onChange={(e) => setForm((f) => ({ ...f, case_study_problem_en: e.target.value }))} rows={3} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>المشكلة (AR)</Label>
                  <Textarea value={form.case_study_problem_ar} onChange={(e) => setForm((f) => ({ ...f, case_study_problem_ar: e.target.value }))} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>الحل (EN)</Label>
                  <Textarea value={form.case_study_solution_en} onChange={(e) => setForm((f) => ({ ...f, case_study_solution_en: e.target.value }))} rows={3} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>الحل (AR)</Label>
                  <Textarea value={form.case_study_solution_ar} onChange={(e) => setForm((f) => ({ ...f, case_study_solution_ar: e.target.value }))} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>النتيجة (EN)</Label>
                  <Textarea value={form.case_study_outcome_en} onChange={(e) => setForm((f) => ({ ...f, case_study_outcome_en: e.target.value }))} rows={3} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>النتيجة (AR)</Label>
                  <Textarea value={form.case_study_outcome_ar} onChange={(e) => setForm((f) => ({ ...f, case_study_outcome_ar: e.target.value }))} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>الدور (EN)</Label>
                  <Input value={form.case_study_role_en} onChange={(e) => setForm((f) => ({ ...f, case_study_role_en: e.target.value }))} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>الدور (AR)</Label>
                  <Input value={form.case_study_role_ar} onChange={(e) => setForm((f) => ({ ...f, case_study_role_ar: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>التقنيات المستخدمة بالدراسة (EN)</Label>
                  <Input value={form.case_study_stack_en} onChange={(e) => setForm((f) => ({ ...f, case_study_stack_en: e.target.value }))} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>التقنيات المستخدمة بالدراسة (AR)</Label>
                  <Input value={form.case_study_stack_ar} onChange={(e) => setForm((f) => ({ ...f, case_study_stack_ar: e.target.value }))} dir="ltr" />
                </div>
              </div>
            </FieldSet>

            <FieldSet title="خطوات العمل والأسئلة الشائعة">
              <div className="grid grid-cols-2 gap-4">
                <StringArrayEditor
                  label="خطوات العمل (EN)"
                  items={form.case_study_steps_en}
                  onChange={(items) => setForm((f) => ({ ...f, case_study_steps_en: items }))}
                  dir="ltr"
                  placeholder="Step..."
                />
                <StringArrayEditor
                  label="خطوات العمل (AR)"
                  items={form.case_study_steps_ar}
                  onChange={(items) => setForm((f) => ({ ...f, case_study_steps_ar: items }))}
                  dir="rtl"
                  placeholder="الخطوة..."
                />
              </div>

              <FaqEditor
                items={form.faqs}
                onChange={(items) => setForm((f) => ({ ...f, faqs: items }))}
              />
            </FieldSet>

            <FieldSet title="الإضافات (Highlights)">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>النقاط الرئيسية (EN)</Label>
                  <Textarea value={form.highlight_key_points_en} onChange={(e) => setForm((f) => ({ ...f, highlight_key_points_en: e.target.value }))} rows={2} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>النقاط الرئيسية (AR)</Label>
                  <Textarea value={form.highlight_key_points_ar} onChange={(e) => setForm((f) => ({ ...f, highlight_key_points_ar: e.target.value }))} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>التركيز (EN)</Label>
                  <Input value={form.highlight_focus_en} onChange={(e) => setForm((f) => ({ ...f, highlight_focus_en: e.target.value }))} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>التركيز (AR)</Label>
                  <Input value={form.highlight_focus_ar} onChange={(e) => setForm((f) => ({ ...f, highlight_focus_ar: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>الدور (EN)</Label>
                  <Input value={form.highlight_role_en} onChange={(e) => setForm((f) => ({ ...f, highlight_role_en: e.target.value }))} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>الدور (AR)</Label>
                  <Input value={form.highlight_role_ar} onChange={(e) => setForm((f) => ({ ...f, highlight_role_ar: e.target.value }))} />
                </div>
              </div>
            </FieldSet>

            <FieldSet title="الروابط والصور">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input value={form.live_url} onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input value={form.repo_url} onChange={(e) => setForm((f) => ({ ...f, repo_url: e.target.value }))} dir="ltr" />
                </div>
              </div>
              <ScreensEditor
                screens={form.screens}
                onChange={(screens) => setForm((f) => ({ ...f, screens }))}
              />
            </FieldSet>

            <SeoFieldsGroup
              values={seoValues}
              onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
            />

            <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t mt-6">
              <Button type="submit" disabled={saveMutation.isPending} className="w-full font-heading h-12 text-lg">
                {saveMutation.isPending ? 'جاري الحفظ...' : 'حفظ المشروع'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
