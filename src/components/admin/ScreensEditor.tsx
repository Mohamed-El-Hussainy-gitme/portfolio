'use client';

import React, { useRef, useState } from 'react';
import { GripVertical, Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient } from '@/lib/apiClient';
import { getAssetPath } from '@/core/utils/assetPath';
import type { ProjectScreen } from '@/types/pageContent';

type Props = {
  screens: ProjectScreen[];
  onChange: (screens: ProjectScreen[]) => void;
};

export default function ScreensEditor({ screens, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const addScreen = (src: string) => {
    const id = `screen-${Date.now()}`;
    onChange([...screens, { id, src, alt: '' }]);
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      const next = [...screens];
      for (const file of Array.from(files)) {
        const { file_url } = await apiClient.integrations.Core.UploadFile({ file });
        next.push({ id: `screen-${Date.now()}-${Math.random().toString(36).slice(2)}`, src: file_url, alt: '' });
      }
      onChange(next);
      toast.success('تم رفع الصور');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الرفع');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3 border-t border-border pt-4" dir="rtl">
      <div className="flex items-center justify-between">
        <Label className="font-heading font-semibold text-sm">صور المشروع (معرض)</Label>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) void handleFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            رفع صور
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => addScreen('')}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">الصورة الأولى تُستخدم كغلاف في بطاقة المشروع.</p>

      <div className="space-y-3">
        {screens.map((screen, index) => (
          <div
            key={screen.id}
            className="flex gap-3 p-3 border border-border rounded-lg bg-muted/20 items-start"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground mt-2 shrink-0" />
            {screen.src ? (
              <div className="w-24 h-16 rounded overflow-hidden border border-border shrink-0 bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getAssetPath(screen.src)} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-16 rounded bg-muted shrink-0" />
            )}
            <div className="flex-1 space-y-2 min-w-0">
              <Input
                value={screen.src}
                onChange={(e) => {
                  const next = [...screens];
                  next[index] = { ...screen, src: e.target.value };
                  onChange(next);
                }}
                placeholder="رابط الصورة"
                dir="ltr"
                className="font-heading text-sm"
              />
              <Input
                value={screen.alt}
                onChange={(e) => {
                  const next = [...screens];
                  next[index] = { ...screen, alt: e.target.value };
                  onChange(next);
                }}
                placeholder="نص بديل (alt)"
                className="font-heading text-sm"
              />
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-destructive shrink-0"
              onClick={() => onChange(screens.filter((_, i) => i !== index))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {!screens.length ? (
          <p className="text-sm text-muted-foreground text-center py-4">لا توجد صور — أضف صورة غلاف على الأقل.</p>
        ) : null}
      </div>
    </div>
  );
}
