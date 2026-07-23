'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Save, Home } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fetchSiteSettings, updateSiteSetting } from '@/lib/db';

// حقول الصفحة الرئيسية المُدارة عبر site_settings
const HOME_FIELDS = [
  {
    group: 'قسم الهيرو (Hero)',
    fields: [
      { key: 'hero_heading_en', label: 'العنوان الرئيسي (EN)', type: 'text', placeholder: 'Hi, I am Mohamed', dir: 'ltr' },
      { key: 'hero_heading_ar', label: 'العنوان الرئيسي (AR)', type: 'text', placeholder: 'مرحباً، أنا محمد الحسيني' },
      { key: 'hero_subheading_en', label: 'العنوان الفرعي (EN)', type: 'text', placeholder: 'Full Stack Developer', dir: 'ltr' },
      { key: 'hero_subheading_ar', label: 'العنوان الفرعي (AR)', type: 'text', placeholder: 'مطوّر Full Stack' },
      { key: 'tagline_en', label: 'النص التعريفي (EN)', type: 'textarea', placeholder: 'I build professional web apps...', dir: 'ltr' },
      { key: 'tagline_ar', label: 'النص التعريفي (AR)', type: 'textarea', placeholder: 'أبني تطبيقات ويب احترافية...' },
      { key: 'hero_cta_label', label: 'نص زر الدعوة للعمل', type: 'text', placeholder: 'تواصل معي' },
      { key: 'hero_cta_link', label: 'رابط زر الدعوة للعمل', type: 'text', placeholder: '/contact', dir: 'ltr' },
    ],
  },
  {
    group: 'قسم المهارات (Skills)',
    fields: [
      { key: 'skills_title', label: 'عنوان القسم', type: 'text', placeholder: 'مهاراتي التقنية' },
      { key: 'skills_description', label: 'وصف القسم', type: 'textarea', placeholder: 'اعمل بأحدث التقنيات...' },
    ],
  },
  {
    group: 'قسم لماذا أنا؟ (Why Choose)',
    fields: [
      { key: 'why_title', label: 'عنوان القسم', type: 'text', placeholder: 'لماذا تختارني؟' },
      { key: 'why_description', label: 'وصف القسم', type: 'textarea', placeholder: 'خبرة واحترافية في...' },
    ],
  },
  {
    group: 'قسم التواصل (CTA Strip)',
    fields: [
      { key: 'cta_title', label: 'عنوان قسم التواصل', type: 'text', placeholder: 'هل لديك مشروع؟' },
      { key: 'cta_subtitle', label: 'نص قسم التواصل', type: 'text', placeholder: 'تواصل معي لنبدأ العمل' },
      { key: 'cta_button_label', label: 'نص الزر', type: 'text', placeholder: 'ابدأ الآن' },
    ],
  },
];

export default function AdminHomePage() {
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [isSavingAll, setIsSavingAll] = useState(false);

  const { data: settings = [], isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: fetchSiteSettings,
  });

  useEffect(() => {
    if (settings.length > 0) {
      const map: Record<string, string> = {};
      settings.forEach((s: any) => {
        map[s.setting_key] = s.setting_value ?? '';
      });
      setValues((prev) => ({ ...prev, ...map }));
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      updateSiteSetting(key, value),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: (error: any) => toast.error(error.message || 'فشل الحفظ'),
  });

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    const allFields = HOME_FIELDS.flatMap((g) => g.fields);
    try {
      await Promise.all(
        allFields.map((f) => updateSiteSetting(f.key, values[f.key] ?? ''))
      );
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('تم حفظ إعدادات الصفحة الرئيسية بنجاح');
    } catch (err: any) {
      toast.error(err.message || 'فشل الحفظ');
    } finally {
      setIsSavingAll(false);
    }
  };

  return (
    <>
      <PageHeader
        title="الصفحة الرئيسية"
        subtitle="تحكم في محتوى الصفحة الرئيسية للموقع"
        action={
          <Button onClick={handleSaveAll} disabled={isSavingAll} className="font-heading gap-2">
            {isSavingAll ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            حفظ الكل
          </Button>
        }
      />

      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6" dir="rtl">
            {HOME_FIELDS.map((group) => (
              <div
                key={group.group}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                {/* Group Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-heading font-semibold text-foreground">
                    {group.group}
                  </h2>
                </div>

                {/* Fields */}
                <div className="p-5 space-y-4">
                  {group.fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label className="font-heading text-sm">{field.label}</Label>
                      <div className="flex gap-2">
                        {field.type === 'textarea' ? (
                          <Textarea
                            value={values[field.key] ?? ''}
                            onChange={(e) =>
                              setValues((v) => ({ ...v, [field.key]: e.target.value }))
                            }
                            placeholder={field.placeholder}
                            rows={3}
                            className="font-heading flex-1"
                            dir={(field as any).dir ?? 'rtl'}
                          />
                        ) : (
                          <Input
                            type={field.type}
                            value={values[field.key] ?? ''}
                            onChange={(e) =>
                              setValues((v) => ({ ...v, [field.key]: e.target.value }))
                            }
                            placeholder={field.placeholder}
                            className="font-heading flex-1"
                            dir={(field as any).dir ?? 'rtl'}
                          />
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="font-heading shrink-0"
                          onClick={() =>
                            saveMutation.mutate({
                              key: field.key,
                              value: values[field.key] ?? '',
                            })
                          }
                          disabled={saveMutation.isPending}
                        >
                          {saveMutation.isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Save className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}