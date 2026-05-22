'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Trash2, CheckCircle, XCircle, Star } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchReviews, approveReview, deleteReview } from '@/lib/db';

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

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: () => fetchReviews(),
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, approved }: { id: string; approved: boolean }) =>
      approveReview(id, approved),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success(vars.approved ? 'تم قبول التقييم' : 'تم رفض التقييم');
    },
    onError: (error: any) => toast.error(error.message || 'فشلت العملية'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success('تم حذف التقييم');
    },
    onError: (error: any) => toast.error(error.message || 'فشل الحذف'),
  });

  const filtered = reviews.filter((r: any) => {
    if (filterStatus === 'approved') return r.is_approved;
    if (filterStatus === 'pending') return !r.is_approved;
    return true;
  });

  const pendingCount = reviews.filter((r: any) => !r.is_approved).length;

  return (
    <>
      <PageHeader
        title="إدارة التقييمات"
        subtitle={`${reviews.length} تقييم إجمالي — ${pendingCount} بانتظار الموافقة`}
      />

      <div className="p-6">
        {/* فلتر */}
        <div className="flex items-center gap-3 mb-6" dir="rtl">
          <span className="font-heading text-sm text-muted-foreground">عرض:</span>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-44 font-heading">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-heading">الكل ({reviews.length})</SelectItem>
              <SelectItem value="pending" className="font-heading">
                بانتظار الموافقة ({pendingCount})
              </SelectItem>
              <SelectItem value="approved" className="font-heading">
                مقبولة ({reviews.length - pendingCount})
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
                key={review.id}
                className={`p-4 bg-card border rounded-lg font-heading ${
                  review.is_approved ? 'border-border' : 'border-orange-500/40'
                }`}
                dir="rtl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {review.reviewer_name}
                      </span>
                      <StarDisplay value={review.rating} />
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          review.is_approved
                            ? 'bg-green-500/10 text-green-700'
                            : 'bg-orange-500/10 text-orange-700'
                        }`}
                      >
                        {review.is_approved ? 'مقبول' : 'بانتظار الموافقة'}
                      </span>
                    </div>
                    {review.body && (
                      <p className="text-sm text-muted-foreground">{review.body}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {review.is_approved ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          approveMutation.mutate({ id: review.id, approved: false })
                        }
                        disabled={approveMutation.isPending}
                        title="إلغاء الموافقة"
                      >
                        <XCircle className="h-4 w-4 text-orange-500" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          approveMutation.mutate({ id: review.id, approved: true })
                        }
                        disabled={approveMutation.isPending}
                        title="قبول التقييم"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(review.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}