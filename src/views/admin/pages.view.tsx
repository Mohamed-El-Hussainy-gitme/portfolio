'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, Loader2, Save, Layout } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fetchPagesMeta, savePagesMeta } from '@/lib/db';
import { PAGE_KEYS, PAGE_LABELS, emptyPageContent } from '@/lib/pageContent';
import type { PageContent, PageKey, PagesMetaMap } from '@/types/pageContent';

function PageEditor({
  page,
  content,
  onChange,
}: {
  page: PageKey;
  content: PageContent;
  onChange: (next: PageContent) => void;
}) {
  const patchHero = (patch: Partial<PageContent['hero']>) =>
    onChange({ ...content, hero: { ...content.hero, ...patch } });
  const patchSeo = (patch: Partial<PageContent['seo']>) =>
    onChange({ ...content, seo: { ...content.seo, ...patch } });

  return (
    <div className="p-5 space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-sm mb-3">قسم الهيرو (Hero)</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs">Label (EN)</Label>
            <Input
              value={content.hero.label_en}
              onChange={(e) => patchHero({ label_en: e.target.value })}
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Label (AR)</Label>
            <Input value={content.hero.label_ar} onChange={(e) => patchHero({ label_ar: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Heading (EN)</Label>
            <Input
              value={content.hero.heading_en}
              onChange={(e) => patchHero({ heading_en: e.target.value })}
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Heading (AR)</Label>
            <Input
              value={content.hero.heading_ar}
              onChange={(e) => patchHero({ heading_ar: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Subtext (EN)</Label>
            <Textarea
              value={content.hero.sub_en}
              onChange={(e) => patchHero({ sub_en: e.target.value })}
              rows={2}
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Subtext (AR)</Label>
            <Textarea
              value={content.hero.sub_ar}
              onChange={(e) => patchHero({ sub_ar: e.target.value })}
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="font-heading font-semibold text-sm mb-3">SEO — {PAGE_LABELS[page]}</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs">Meta Title (EN)</Label>
            <Input
              value={content.seo.title_en}
              onChange={(e) => patchSeo({ title_en: e.target.value })}
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Meta Title (AR)</Label>
            <Input
              value={content.seo.title_ar}
              onChange={(e) => patchSeo({ title_ar: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Meta Description (EN)</Label>
            <Textarea
              value={content.seo.description_en}
              onChange={(e) => patchSeo({ description_en: e.target.value })}
              rows={2}
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Meta Description (AR)</Label>
            <Textarea
              value={content.seo.description_ar}
              onChange={(e) => patchSeo({ description_ar: e.target.value })}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Focus Keyword (EN)</Label>
            <Input
              value={content.seo.focus_keyword_en}
              onChange={(e) => patchSeo({ focus_keyword_en: e.target.value })}
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Focus Keyword (AR)</Label>
            <Input
              value={content.seo.focus_keyword_ar}
              onChange={(e) => patchSeo({ focus_keyword_ar: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPages() {
  const qc = useQueryClient();
  const [meta, setMeta] = useState<PagesMetaMap>({});
  const [expanded, setExpanded] = useState<PageKey | null>('projects');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-pages-meta'],
    queryFn: fetchPagesMeta,
  });

  useEffect(() => {
    if (data) setMeta(data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => savePagesMeta(meta),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-pages-meta'] });
      qc.invalidateQueries({ queryKey: ['pages-meta'] });
      toast.success('تم حفظ صفحات الموقع');
    },
    onError: (err: Error) => toast.error(err.message || 'فشل الحفظ'),
  });

  return (
    <>
      <PageHeader
        title="صفحات الموقع"
        subtitle="هيرو و SEO لكل صفحة (مشاريع، خدمات، مدونة، تواصل، من نحن)"
        action={
          <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="gap-2">
            {saveMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            حفظ الكل
          </Button>
        }
      />

      <div className="p-6" dir="rtl">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {PAGE_KEYS.map((page) => {
              const content = meta[page] ?? emptyPageContent();
              const isOpen = expanded === page;
              return (
                <div key={page} className="bg-card border border-border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : page)}
                  >
                    <div className="flex items-center gap-3">
                      <Layout className="h-4 w-4 text-muted-foreground" />
                      <span className="font-heading font-semibold">{PAGE_LABELS[page]}</span>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {isOpen ? (
                    <PageEditor
                      page={page}
                      content={content}
                      onChange={(next) => setMeta((m) => ({ ...m, [page]: next }))}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
