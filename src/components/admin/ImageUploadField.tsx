'use client';

import React, { useRef, useState } from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient } from '@/lib/apiClient';
import { getAssetPath } from '@/core/utils/assetPath';

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

export default function ImageUploadField({ label, value, onChange, hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const { file_url } = await apiClient.integrations.Core.UploadFile({ file });
      onChange(file_url);
      toast.success('تم رفع الصورة');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل رفع الصورة';
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  const preview = value ? getAssetPath(value) : '';

  return (
    <div className="space-y-2" dir="rtl">
      <Label className="font-heading text-sm">{label}</Label>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/assets/... أو رابط Supabase"
          className="font-heading flex-1"
          dir="ltr"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = '';
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        </Button>
        {value ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange('')}>
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      {preview ? (
        <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="" className="w-full h-full object-cover" />
        </div>
      ) : null}
    </div>
  );
}
