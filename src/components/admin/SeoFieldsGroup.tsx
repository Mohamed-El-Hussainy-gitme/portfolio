'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type SeoFormFields = {
  seo_title_en: string;
  seo_title_ar: string;
  seo_description_en: string;
  seo_description_ar: string;
  focus_keyword_en: string;
  focus_keyword_ar: string;
};

type Props = {
  values: SeoFormFields;
  onChange: (patch: Partial<SeoFormFields>) => void;
};

export default function SeoFieldsGroup({ values, onChange }: Props) {
  return (
    <div className="space-y-4 border-t border-border pt-4" dir="rtl">
      <h3 className="font-heading font-semibold text-sm text-foreground">SEO / Meta</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="font-heading text-xs">Meta Title (EN)</Label>
          <Input
            value={values.seo_title_en}
            onChange={(e) => onChange({ seo_title_en: e.target.value })}
            className="font-heading"
            dir="ltr"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-heading text-xs">Meta Title (AR)</Label>
          <Input
            value={values.seo_title_ar}
            onChange={(e) => onChange({ seo_title_ar: e.target.value })}
            className="font-heading"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="font-heading text-xs">Meta Description (EN)</Label>
          <Textarea
            value={values.seo_description_en}
            onChange={(e) => onChange({ seo_description_en: e.target.value })}
            rows={2}
            className="font-heading"
            dir="ltr"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-heading text-xs">Meta Description (AR)</Label>
          <Textarea
            value={values.seo_description_ar}
            onChange={(e) => onChange({ seo_description_ar: e.target.value })}
            rows={2}
            className="font-heading"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="font-heading text-xs">Focus Keyword (EN)</Label>
          <Input
            value={values.focus_keyword_en}
            onChange={(e) => onChange({ focus_keyword_en: e.target.value })}
            className="font-heading"
            dir="ltr"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-heading text-xs">Focus Keyword (AR)</Label>
          <Input
            value={values.focus_keyword_ar}
            onChange={(e) => onChange({ focus_keyword_ar: e.target.value })}
            className="font-heading"
          />
        </div>
      </div>
    </div>
  );
}
