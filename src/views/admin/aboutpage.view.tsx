'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Save, Info } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fetchSiteSettings, updateSiteSetting } from '@/lib/db';

const ABOUT_FIELDS = [
  {
    group: 'المعلومات الشخصية',
    fields: [
      { key: 'about_name', label: 'الاسم الكامل', type: 'text', placeholder: 'محمد الحسيني' },
      { key: 'about_title', label: 'المسمى الوظيفي', type: 'text', placeholder: 'مطوّر Full Stack' },
      { key: 'about_bio', label: 'السيرة الذاتية المختصرة', type: 'textarea', placeholder: 'أنا مطوّر متخصص في...' },
      { key: 'about_long_bio', label: 'السيرة الذاتية التفصيلية', type: 'textarea', placeholder: 'بدأت رحلتي في البرمجة...' },
      { key: 'about_avatar_url', label: 'رابط الصورة الشخصية', type: 'text', placeholder: '/images/avatar.jpg', dir: 'ltr' },
    ],
  },
  {
    group: 'تفاصيل إضافية',
    fields: [
      { key: 'about_location', label: 'الموقع / المدينة', type: 'text', placeholder: 'الرياض، المملكة العربية السعودية' },
      { key: 'about_experience_years', label: 'سنوات الخبرة', type: 'text', placeholder: '5+' },
      { key: 'about_projects_count', label: 'عدد المشاريع المنجزة', type: 'text', placeholder: '50+' },
      { key: 'about_clients_count', label: 'عدد العملاء', type: 'text', placeholder: '30+' },
    ],
  },
  {
    group: 'قسم القصة (Story)',
    fields: [
      { key: 'story_title', label: 'عنوان قسم القصة', type: 'text', placeholder: 'قصتي مع التطوير' },
      { key: 'story_content', label: 'محتوى قسم القصة', type: 'textarea', placeholder: 'بدأت شغفي بالبرمجة منذ...' },
    ],
  },
  {
    group: 'روابط التواصل الاجتماعي',
    fields: [
      { key: 'social_github', label: 'GitHub', type: 'text', placeholder: 'https://github.com/username', dir: 'ltr' },
      { key: 'social_linkedin', label: 'LinkedIn', type: 'text', placeholder: 'https://linkedin.com/in/username', dir: 'ltr' },
      { key: 'social_twitter', label: 'X (Twitter)', type: 'text', placeholder: 'https://x.com/username', dir: 'ltr' },
      { key: 'social_instagram', label: 'Instagram', type: 'text', placeholder: 'https://instagram.com/username', dir: 'ltr' },
    ],
  },
];

export default function AdminAboutPage() {
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
    const allFields = ABOUT_FIELDS.flatMap((g) => g.fields);
    try {
      await Promise.all(
        allFields.map((f) => updateSiteSetting(f.key, values[f.key] ?? ''))
      );
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('تم حفظ إعدادات صفحة "من نحن" بنجاح');
    } catch (err: any) {
      toast.error(err.message || 'فشل الحفظ');
    } finally {
      setIsSavingAll(false);
    }
  };

  return (
    <>
      <PageHeader
        title='صفحة "من نحن"'
        subtitle="تحكم في المحتوى الشخصي وصفحة التعريف"
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
            {ABOUT_FIELDS.map((group) => (
              <div
                key={group.group}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                {/* Group Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
                  <Info className="h-4 w-4 text-muted-foreground" />
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