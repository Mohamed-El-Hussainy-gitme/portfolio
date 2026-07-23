'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, Mail, MailOpen, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchContactMessages, updateMessageStatus, deleteMessage } from '@/lib/db';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: 'جديدة', color: 'bg-blue-500/10 text-blue-700' },
  read: { label: 'مقروءة', color: 'bg-muted text-muted-foreground' },
  replied: { label: 'تم الرد', color: 'bg-green-500/10 text-green-700' },
  closed: { label: 'مغلقة', color: 'bg-gray-500/10 text-gray-600' },
};

export default function AdminMessages() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: fetchContactMessages,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status, note }: { id: string; status: string; note?: string }) =>
      updateMessageStatus(id, status, note),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-messages'] });
      toast.success('تم تحديث حالة الرسالة');
    },
    onError: (error: any) => toast.error(error.message || 'فشل التحديث'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-messages'] });
      toast.success('تم حذف الرسالة');
    },
    onError: (error: any) => toast.error(error.message || 'فشل الحذف'),
  });

  const filtered = messages.filter((m: any) =>
    filterStatus === 'all' ? true : m.status === filterStatus
  );

  const newCount = messages.filter((m: any) => m.status === 'new').length;

  const toggleExpand = (id: string, message: any) => {
    if (expandedId !== id && message.status === 'new') {
      statusMutation.mutate({ id, status: 'read' });
    }
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <PageHeader
        title="الرسائل"
        subtitle={`${messages.length} رسالة — ${newCount} جديدة`}
      />

      <div className="p-6">
        {/* فلتر */}
        <div className="flex items-center gap-3 mb-6" dir="rtl">
          <span className="font-heading text-sm text-muted-foreground">الحالة:</span>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 font-heading">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-heading">الكل ({messages.length})</SelectItem>
              <SelectItem value="new" className="font-heading">جديدة ({newCount})</SelectItem>
              <SelectItem value="read" className="font-heading">مقروءة</SelectItem>
              <SelectItem value="replied" className="font-heading">تم الرد</SelectItem>
              <SelectItem value="closed" className="font-heading">مغلقة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-heading">
            لا توجد رسائل
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((msg: any) => {
              const isExpanded = expandedId === msg.id;
              const statusInfo = STATUS_LABELS[msg.status] || STATUS_LABELS.new;

              return (
                <div
                  key={msg.id}
                  className={`bg-card border rounded-lg font-heading overflow-hidden ${
                    msg.status === 'new' ? 'border-blue-500/40' : 'border-border'
                  }`}
                  dir="rtl"
                >
                  {/* Header */}
                  <button
                    className="w-full p-4 flex items-center justify-between gap-4 text-right hover:bg-muted/30 transition-colors"
                    onClick={() => toggleExpand(msg.id, msg)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {msg.status === 'new' ? (
                        <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                      ) : (
                        <MailOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground">{msg.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {msg.subject || msg.message?.slice(0, 60)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleDateString('ar-SA')}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* تفاصيل موسّعة */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-border space-y-4 pt-4">
                      {/* معلومات المرسل */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">البريد: </span>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-accent hover:underline"
                            dir="ltr"
                          >
                            {msg.email}
                          </a>
                        </div>
                        {msg.phone && (
                          <div>
                            <span className="text-muted-foreground">الهاتف: </span>
                            <span dir="ltr">{msg.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* محتوى الرسالة */}
                      <div className="p-3 bg-muted/40 rounded-lg">
                        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </p>
                      </div>

                      {/* ملاحظات */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                          ملاحظات داخلية
                        </label>
                        <Textarea
                          value={notes[msg.id] ?? msg.notes ?? ''}
                          onChange={(e) =>
                            setNotes((n) => ({ ...n, [msg.id]: e.target.value }))
                          }
                          rows={2}
                          placeholder="أضف ملاحظة..."
                          className="font-heading text-sm"
                        />
                      </div>

                      {/* أزرار الإجراءات */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex gap-2 flex-wrap">
                          {msg.status !== 'replied' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="font-heading text-green-600 border-green-600/30 hover:bg-green-500/10"
                              onClick={() =>
                                statusMutation.mutate({
                                  id: msg.id,
                                  status: 'replied',
                                  note: notes[msg.id] ?? msg.notes,
                                })
                              }
                              disabled={statusMutation.isPending}
                            >
                              تم الرد
                            </Button>
                          )}
                          {msg.status !== 'closed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="font-heading"
                              onClick={() =>
                                statusMutation.mutate({
                                  id: msg.id,
                                  status: 'closed',
                                  note: notes[msg.id] ?? msg.notes,
                                })
                              }
                              disabled={statusMutation.isPending}
                            >
                              إغلاق
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="font-heading"
                            onClick={() =>
                              statusMutation.mutate({
                                id: msg.id,
                                status: msg.status,
                                note: notes[msg.id] ?? msg.notes,
                              })
                            }
                            disabled={statusMutation.isPending}
                          >
                            حفظ الملاحظة
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(msg.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}