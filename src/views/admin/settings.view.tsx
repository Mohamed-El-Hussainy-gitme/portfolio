'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Save, Globe, Mail, Link, FileText } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fetchSiteSettings, updateSiteSetting } from '@/lib/db';
import ImageUploadField from '@/components/admin/ImageUploadField';

// مجموعات الإعدادات مع التفاصيل
const SETTINGS_GROUPS = [
  {
    title: 'معلومات الموقع',
    icon: Globe,
    fields: [
      { key: 'site_title', label: 'عنوان الموقع', type: 'text', placeholder: 'Elhussainy Portfolio' },
      { key: 'site_description', label: 'وصف الموقع', type: 'textarea', placeholder: 'Full Stack Developer...' },
    ],
  },
  {
    title: 'روابط التواصل',
    icon: Mail,
    fields: [
      { key: 'contact_email', label: 'البريد الإلكتروني', type: 'email', placeholder: 'hello@example.com', dir: 'ltr' },
      { key: 'whatsapp_number', label: 'رقم واتساب', type: 'text', placeholder: '+966500000000', dir: 'ltr' },
    ],
  },
  {
    title: 'روابط مهمة',
    icon: Link,
    fields: [
      { key: 'cv_download_url', label: 'رابط تحميل السيرة الذاتية (CV)', type: 'text', placeholder: '/files/cv.pdf', dir: 'ltr' },
      { key: 'review_external_url', label: 'رابط صفحة التقييمات الخارجية', type: 'text', placeholder: 'https://google.com/...', dir: 'ltr' },
      { key: 'github_url', label: 'رابط GitHub', type: 'text', placeholder: 'https://github.com/...', dir: 'ltr' },
      { key: 'linkedin_url', label: 'رابط LinkedIn', type: 'text', placeholder: 'https://linkedin.com/in/...', dir: 'ltr' },
    ],
  },
  {
    title: 'إعدادات SEO',
    icon: FileText,
    fields: [
      { key: 'meta_keywords', label: 'الكلمات المفتاحية (مفصولة بفاصلة)', type: 'text', placeholder: 'portfolio, developer, design' },
      { key: 'google_analytics_id', label: 'معرّف Google Analytics', type: 'text', placeholder: 'G-XXXXXXXXXX', dir: 'ltr' },
    ],
  },
];

export default function AdminSettings() {
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  const { data: settings = [], isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: fetchSiteSettings,
  });

  // تحميل القيم من قاعدة البيانات
  useEffect(() => {
    if (settings.length > 0) {
      const map: Record<string, string> = {};
      settings.forEach((s: any) => {
        map[s.setting_key] = s.setting_value ?? '';
      });
      setValues(map);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      updateSiteSetting(key, value),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      setSaving((s) => ({ ...s, [vars.key]: false }));
      toast.success('تم الحفظ');
    },
    onError: (error: any, vars) => {
      setSaving((s) => ({ ...s, [vars.key]: false }));
      toast.error(error.message || 'فشل الحفظ');
    },
  });

  const handleSaveAll = async () => {
    const allFields = SETTINGS_GROUPS.flatMap((g) => g.fields);
    const newSaving: Record<string, boolean> = {};
    allFields.forEach((f) => {
      newSaving[f.key] = true;
    });
    setSaving(newSaving);

    try {
      await Promise.all(
        allFields.map((f) =>
          updateSiteSetting(f.key, values[f.key] ?? '')
        )
      );
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('تم حفظ جميع الإعدادات بنجاح');
    } catch (err: any) {
      toast.error(err.message || 'فشل الحفظ');
    } finally {
      setSaving({});
    }
  };

  const handleFieldSave = (key: string) => {
    setSaving((s) => ({ ...s, [key]: true }));
    saveMutation.mutate({ key, value: values[key] ?? '' });
  };

  return (
    <>
      <PageHeader
        title="إعدادات الموقع"
        subtitle="إدارة الإعدادات العامة للموقع"
        action={
          <Button onClick={handleSaveAll} className="font-heading gap-2">
            <Save className="h-4 w-4" />
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
            <div className="bg-card border border-border rounded-lg overflow-hidden p-5 mb-6">
              <ImageUploadField
                label="صورة OG (مشاركة السوشيال)"
                value={values.og_image ?? ''}
                onChange={(url) => {
                  setValues((v) => ({ ...v, og_image: url }));
                  void updateSiteSetting('og_image', url);
                }}
              />
            </div>

            {SETTINGS_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  {/* Group Header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <h2 className="font-heading font-semibold text-foreground">{group.title}</h2>
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
                              rows={2}
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
                            onClick={() => handleFieldSave(field.key)}
                            disabled={saving[field.key]}
                          >
                            {saving[field.key] ? (
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
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}