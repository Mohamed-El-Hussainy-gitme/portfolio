'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Trash2, CheckCircle, XCircle, Star, Edit, ExternalLink, ImageIcon } from 'lucide-react';
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
import { fetchReviews, approveReview, deleteReview, upsertReview } from '@/lib/db';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { getAssetPath } from '@/core/utils/assetPath';

const EMPTY_FORM = {
  reviewer_name: '',
  platform: 'Google',
  rating: 5,
  review_text_en: '',
  review_text_ar: '',
  review_url: '',
  screenshot_url: '',
  visible: true,
};

function FieldSet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-border rounded-lg p-4 space-y-4 bg-muted/10">
      <legend className="px-2 font-heading text-lg text-primary">{title}</legend>
      {children}
    </fieldset>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= value ? 'text-yellow-400' : 'text-muted-foreground/30'}`}
          fill={star <= value ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState('all');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: () => fetchReviews(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      editing?.id ? upsertReview({ ...data, id: editing.id }) : upsertReview(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-reviews'] });
      setOpen(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      toast.success('تم حفظ التقييم بنجاح');
    },
    onError: (error: Error) => toast.error(error.message || 'فشل الحفظ'),
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, approved }: { id: string; approved: boolean }) =>
      approveReview(id, approved),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success(vars.approved ? 'تم نشر التقييم' : 'تم إخفاء التقييم');
    },
    onError: (error: Error) => toast.error(error.message || 'فشلت العملية'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success('تم حذف التقييم');
    },
    onError: (error: Error) => toast.error(error.message || 'فشل الحذف'),
  });

  const filtered = reviews.filter((r: any) => {
    if (filterStatus === 'approved') return r.visible;
    if (filterStatus === 'pending') return !r.visible;
    return true;
  });

  const pendingCount = reviews.filter((r: any) => !r.visible).length;

  const handleOpen = (review?: any) => {
    if (review) {
      setEditing(review);
      setForm({
        reviewer_name: String(review.reviewer_name ?? ''),
        platform: String(review.platform ?? 'Google'),
        rating: Number(review.rating) || 5,
        review_text_en: String(review.review_text_en ?? ''),
        review_text_ar: String(review.review_text_ar ?? ''),
        review_url: String(review.review_url ?? ''),
        screenshot_url: String(review.screenshot_url ?? ''),
        visible: Boolean(review.visible),
      });
    } else {
      setEditing(null);
      setForm(EMPTY_FORM);
    }
    setOpen(true);
  };

  return (
    <>
      <PageHeader
        title="إدارة التقييمات"
        subtitle={`${reviews.length} تقييم إجمالي — ${pendingCount} مخفي / بانتظار الموافقة`}
        action={<Button onClick={() => handleOpen()}>+ إضافة تقييم</Button>}
      />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-6" dir="rtl">
          <span className="font-heading text-sm text-muted-foreground">عرض:</span>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-44 font-heading">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-heading">الكل ({reviews.length})</SelectItem>
              <SelectItem value="pending" className="font-heading">
                مخفي ({pendingCount})
              </SelectItem>
              <SelectItem value="approved" className="font-heading">
                منشور ({reviews.length - pendingCount})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-heading">
            لا توجد تقييمات
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((review: any) => (
              <div
                key={String(review.id)}
                className={`p-4 bg-card border rounded-lg font-heading flex gap-4 items-start ${
                  review.visible ? 'border-border' : 'border-orange-500/40'
                }`}
                dir="rtl"
              >
                {/* Avatar / Screenshot */}
                <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden border bg-muted flex items-center justify-center">
                  {review.screenshot_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={getAssetPath(String(review.screenshot_url))} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">
                      {String(review.reviewer_name)}
                    </span>
                    <StarDisplay value={Number(review.rating) || 5} />
                    <span className="text-xs text-muted-foreground">منصة: {String(review.platform)}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        review.visible
                          ? 'bg-green-500/10 text-green-700'
                          : 'bg-orange-500/10 text-orange-700'
                      }`}
                    >
                      {review.visible ? 'منشور' : 'مخفي'}
                    </span>
                    {review.review_url && (
                      <a
                        href={String(review.review_url)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs flex items-center gap-1 text-blue-500 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> رابط
                      </a>
                    )}
                  </div>
                  {review.review_text_en && (
                    <p className="text-sm text-muted-foreground" dir="ltr">{String(review.review_text_en)}</p>
                  )}
                  {review.review_text_ar && (
                    <p className="text-sm text-muted-foreground" dir="rtl">{String(review.review_text_ar)}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(String(review.created_at)).toLocaleDateString('ar-SA')}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => handleOpen(review)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  {review.visible ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => approveMutation.mutate({ id: String(review.id), approved: false })}
                      disabled={approveMutation.isPending}
                      title="إخفاء التقييم"
                    >
                      <XCircle className="h-4 w-4 text-orange-500" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => approveMutation.mutate({ id: String(review.id), approved: true })}
                      disabled={approveMutation.isPending}
                      title="نشر التقييم"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(String(review.id))}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-heading text-right">
              {editing ? 'تعديل التقييم' : 'إضافة تقييم جديد'}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate(form);
            }}
            className="space-y-4 overflow-y-auto max-h-[70vh] p-1 pr-3"
          >
            <FieldSet title="معلومات المقيّم والمنصة">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم المقيّم</Label>
                  <Input
                    value={form.reviewer_name}
                    onChange={(e) => setForm((f) => ({ ...f, reviewer_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>المنصة</Label>
                  <Input
                    value={form.platform}
                    onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}
                    placeholder="مثال: Google, Upwork, مستقل"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>التقييم (من 1 إلى 5)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select
                    value={form.visible ? 'visible' : 'hidden'}
                    onValueChange={(v) => setForm((f) => ({ ...f, visible: v === 'visible' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible">منشور</SelectItem>
                      <SelectItem value="hidden">مخفي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>رابط التقييم (اختياري)</Label>
                <Input
                  value={form.review_url}
                  onChange={(e) => setForm((f) => ({ ...f, review_url: e.target.value }))}
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>
            </FieldSet>

            <FieldSet title="صورة المقيّم (أو سكرين شوت للتقييم)">
              <ImageUploadField
                label="اختر صورة"
                value={form.screenshot_url}
                onChange={(screenshot_url) => setForm((f) => ({ ...f, screenshot_url }))}
              />
            </FieldSet>

            <FieldSet title="نص التقييم">
              <div className="space-y-2">
                <Label>النص (EN)</Label>
                <Textarea
                  value={form.review_text_en}
                  onChange={(e) => setForm((f) => ({ ...f, review_text_en: e.target.value }))}
                  dir="ltr"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>النص (AR)</Label>
                <Textarea
                  value={form.review_text_ar}
                  onChange={(e) => setForm((f) => ({ ...f, review_text_ar: e.target.value }))}
                  dir="rtl"
                  rows={3}
                />
              </div>
            </FieldSet>

            <Button type="submit" disabled={saveMutation.isPending} className="w-full h-12 text-lg font-heading mt-4">
              {saveMutation.isPending ? 'جاري الحفظ...' : 'حفظ التقييم'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}