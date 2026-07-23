# لوحة تحكم Elhussainy Portfolio — SKILL.md

> **الإصدار:** 1.0  
> **المشروع:** Elhussainy Next — Portfolio Admin Dashboard  
> **النطاق:** لوحة تحكم كاملة لإدارة المحتوى

---

## 1. نظرة عامة على المشروع

| العنصر | التفاصيل |
|---|---|
| **Framework** | Next.js 14+ (App Router) |
| **Routing** | `app/` directory بصيغة Next.js |
| **State / Data** | TanStack Query (React Query) + SWR |
| **Database** | Supabase (PostgreSQL + RLS + Realtime) |
| **Auth** | Supabase Auth → `profiles` table → role-based |
| **UI System** | shadcn/ui + Tailwind CSS + Radix UI |
| **Animations** | Framer Motion |
| **Styling** | `font-heading` class على كل النصوص، `dir="rtl"` |
| **Notifications** | sonner (`toast.success` / `toast.error`) |
| **Image Upload** | `uploadSiteImage(file, bucket)` من `@/lib/storage/upload` |

---

## 2. بنية المسارات (Next.js App Router)

### المسارات العامة
```
/                          → app/(public)/page.tsx (Home)
/en                        → app/en/page.tsx
/ar                        → app/ar/page.tsx
/services                  → app/(public)/services/page.tsx
/services/[slug]           → app/(public)/services/[slug]/page.tsx
/projects                  → app/(public)/projects/page.tsx
/projects/[slug]           → app/(public)/projects/[slug]/page.tsx
/blog                      → app/(public)/blog/page.tsx
/blog/[slug]               → app/(public)/blog/[slug]/page.tsx
/about                     → app/(public)/about/page.tsx
/contact                   → app/(public)/contact/page.tsx
```

### مسارات Admin (يتطلب RequireAdmin wrapper)
```
/admin/login               → app/admin/login/page.tsx
/admin                     → app/admin/page.tsx (Dashboard)
/admin/services            → app/admin/services/page.tsx
/admin/projects            → app/admin/projects/page.tsx
/admin/blog                → app/admin/blog/page.tsx
/admin/reviews             → app/admin/reviews/page.tsx
/admin/messages            → app/admin/messages/page.tsx
/admin/settings            → app/admin/settings/page.tsx
/admin/home-page           → app/admin/home-page/page.tsx
/admin/about-page          → app/admin/about-page/page.tsx
```

### حماية المسارات
```tsx
// middleware.ts في جذر المشروع
// يتحقق من الجلسة + profile.role
// الأدوار المسموحة: 'admin' | 'editor'
// إعادة توجيه تلقائية إلى /admin/login عند انتهاء الجلسة
```

### Lazy Loading
```tsx
// في عناصر Admin، استخدم dynamic import مع ssr: false
import dynamic from 'next/dynamic';
const AdminServices = dynamic(() => import('@/components/admin/AdminServices'), { ssr: false });
```

---

## 3. بنية قاعدة البيانات (Supabase Schema)

### جدول `services` — الخدمات
```sql
CREATE TABLE IF NOT EXISTS public.services (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  description     text,
  category        text,
  image           text,
  gallery         jsonb DEFAULT '[]',
  sections        jsonb DEFAULT '[]',
  sort_order      int DEFAULT 0,
  is_active       boolean DEFAULT true,
  icon_name       text,
  price_min       numeric(10,2),
  price_max       numeric(10,2),
  price_label     text,
  price_currency  text DEFAULT 'SAR',
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS services_category_idx ON public.services(category, is_active);
```

### جدول `projects` — مشاريع المحفظة
```sql
CREATE TABLE IF NOT EXISTS public.projects (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  description     text,
  featured_image  text NOT NULL,
  gallery         jsonb DEFAULT '[]',
  technologies    jsonb DEFAULT '[]',  -- ["React", "Tailwind", ...]
  category        text,
  client_name     text,
  project_url     text,
  github_url      text,
  sort_order      int DEFAULT 0,
  is_featured     boolean DEFAULT false,
  is_active       boolean DEFAULT true,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_featured_idx ON public.projects(is_featured, is_active);
```

### جدول `blog_posts` — المدونة
```sql
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  content         text NOT NULL,
  excerpt         text,
  featured_image  text,
  category        text,
  tags            jsonb DEFAULT '[]',
  author_id       uuid REFERENCES public.profiles(id),
  views_count     int DEFAULT 0,
  is_published    boolean DEFAULT false,
  published_at    timestamptz,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON public.blog_posts(is_published, published_at DESC);
```

### جدول `service_reviews` — التقييمات
```sql
CREATE TABLE IF NOT EXISTS public.service_reviews (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id      uuid REFERENCES public.services(id) ON DELETE CASCADE,
  reviewer_name   text NOT NULL,
  reviewer_email  text,
  rating          int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body            text,
  is_approved     boolean DEFAULT false,
  is_featured     boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reviews_service_idx ON public.service_reviews(service_id, is_approved);

ALTER TABLE public.service_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read approved reviews"
  ON public.service_reviews FOR SELECT
  USING (is_approved = true);

CREATE POLICY "admins manage reviews"
  ON public.service_reviews FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin','editor')
  ));
```

### جدول `contact_messages` — رسائل التواصل
```sql
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  email           text NOT NULL,
  phone           text,
  subject         text,
  message         text NOT NULL,
  status          text DEFAULT 'new',  -- 'new' | 'read' | 'replied' | 'closed'
  priority        text DEFAULT 'normal',
  notes           text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS messages_status_idx ON public.contact_messages(status, created_at DESC);
```

### جدول `site_settings` — إعدادات الموقع
```sql
CREATE TABLE IF NOT EXISTS public.site_settings (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key     text UNIQUE NOT NULL,
  setting_value   text,
  data_type       text DEFAULT 'string',  -- 'string' | 'number' | 'boolean' | 'json'
  description     text,
  updated_at      timestamptz DEFAULT now()
);

-- أمثلة على الإعدادات:
INSERT INTO public.site_settings (setting_key, setting_value, data_type) VALUES
  ('site_title', 'Elhussainy Portfolio', 'string'),
  ('site_description', 'Full Stack Developer Portfolio', 'string'),
  ('cv_download_url', '/files/cv.pdf', 'string'),
  ('review_external_url', 'https://google.com/..', 'string'),
  ('contact_email', 'hello@elhussainy.com', 'string');
```

---

## 4. طبقة البيانات (`src/lib/db.ts`)

### دوال Services
```ts
// ── Services ──────────────────────────────────
export async function fetchServices(options?: { activePublicOnly?: boolean }) {
  let q = supabase
    .from('services')
    .select('id, slug, title, description, category, image, gallery, sections, sort_order, is_active, icon_name, price_min, price_max, price_label, price_currency, created_at')
    .order('sort_order', { ascending: true });

  if (options?.activePublicOnly) {
    q = q.eq('is_active', true);
  }

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function upsertService(row: ServiceRow) {
  const payload = toServicePayload(row);
  const { data, error } = await supabase
    .from('services')
    .upsert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteService(id: string) {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
}

export async function reorderServices(orderedIds: string[]) {
  const updates = orderedIds.map((id, idx) => ({ id, sort_order: idx }));
  const { error } = await supabase.from('services').upsert(updates);
  if (error) throw error;
}

function toServicePayload(data: any) {
  return {
    ...data,
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
    sections: Array.isArray(data.sections) ? data.sections : [],
    price_min: data.price_min ?? null,
    price_max: data.price_max ?? null,
    price_label: data.price_label ?? null,
    price_currency: data.price_currency ?? 'SAR',
  };
}
```

### دوال Projects
```ts
export async function fetchProjects(options?: { featuredOnly?: boolean }) {
  let q = supabase
    .from('projects')
    .select('id, slug, title, description, featured_image, gallery, technologies, category, client_name, project_url, github_url, sort_order, is_featured, is_active, created_at')
    .order('sort_order', { ascending: true });

  if (options?.featuredOnly) {
    q = q.eq('is_featured', true).eq('is_active', true);
  }

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function upsertProject(row: ProjectRow) {
  const { data, error } = await supabase
    .from('projects')
    .upsert(row)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}
```

### دوال Blog
```ts
export async function fetchBlogPosts(options?: { publishedOnly?: boolean }) {
  let q = supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, featured_image, category, tags, author_id, views_count, is_published, published_at, created_at')
    .order('published_at', { ascending: false, nullsFirst: false });

  if (options?.publishedOnly) {
    q = q.eq('is_published', true);
  }

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function upsertBlogPost(row: BlogPostRow) {
  const { data, error } = await supabase
    .from('blog_posts')
    .upsert(row)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}
```

### دوال Reviews
```ts
export async function fetchReviews(serviceId?: string) {
  let q = supabase
    .from('service_reviews')
    .select('id, reviewer_name, rating, body, is_approved, is_featured, created_at')
    .order('created_at', { ascending: false });

  if (serviceId) {
    q = q.eq('service_id', serviceId);
  }

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function submitReview(review: ReviewInput) {
  const { data, error } = await supabase
    .from('service_reviews')
    .insert({ ...review, is_approved: false })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function approveReview(id: string, approved: boolean) {
  const { data, error } = await supabase
    .from('service_reviews')
    .update({ is_approved: approved })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteReview(id: string) {
  const { error } = await supabase.from('service_reviews').delete().eq('id', id);
  if (error) throw error;
}
```

### دوال Contact Messages
```ts
export async function fetchContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateMessageStatus(id: string, status: string, notes?: string) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ status, notes, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
```

---

## 5. هيكل لوحة التحكم

### AdminLayout
`src/components/admin/AdminLayout.tsx` — يُغلف كل صفحة admin.

```tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
```

### AdminSidebar — المجموعات
```tsx
const NAV_GROUPS = [
  // Group 1: الرئيسي
  {
    title: null,
    items: [
      { label: 'لوحة التحكم', path: '/admin', icon: LayoutDashboard },
    ]
  },
  // Group 2: إدارة الصفحات
  {
    title: 'إدارة الصفحات',
    items: [
      { label: 'الصفحة الرئيسية', path: '/admin/home-page', icon: Home },
      { label: 'من نحن', path: '/admin/about-page', icon: Info },
    ]
  },
  // Group 3: المحتوى
  {
    title: 'المحتوى',
    items: [
      { label: 'الخدمات', path: '/admin/services', icon: Briefcase },
      { label: 'المشاريع', path: '/admin/projects', icon: FolderOpen },
      { label: 'المدونة', path: '/admin/blog', icon: BookOpen },
    ]
  },
  // Group 4: الإدارة
  {
    title: 'الإدارة',
    items: [
      { label: 'التقييمات', path: '/admin/reviews', icon: Star },
      { label: 'الرسائل', path: '/admin/messages', icon: Mail, badge: 'pending' },
      { label: 'إعدادات الموقع', path: '/admin/settings', icon: Settings },
    ]
  },
];
```

---

## 6. نمط صفحة Admin القياسي

```tsx
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminXxx() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data = [], isLoading } = useQuery({
    queryKey: ['admin-xxx'],
    queryFn: fetchXxx,
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editing ? upsertXxx({ ...data, id: editing.id }) : upsertXxx(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-xxx'] });
      setOpen(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      toast.success('تم الحفظ بنجاح');
    },
    onError: (error: any) => toast.error(error.message || 'فشل الحفظ'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteXxx,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-xxx'] });
      toast.success('تم الحذف بنجاح');
    },
    onError: (error: any) => toast.error(error.message || 'فشل الحذف'),
  });

  return (
    <AdminLayout>
      <PageHeader
        title="عنوان الصفحة"
        subtitle="وصف مختصر"
        action={<Button onClick={() => { setEditing(null); setOpen(true); }}>+ جديد</Button>}
      />
      
      {/* قائمة البيانات */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.id} className="p-4 bg-card border border-border rounded-lg flex justify-between items-center font-heading">
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setEditing(item); setForm(item); setOpen(true); }}
                  >
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(item.id)}
                    disabled={deleteMutation.isPending}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialog الفورم */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-heading text-right">
              {editing ? 'تعديل' : 'إضافة جديد'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="space-y-4">
            {/* Form fields here */}
            <Button type="submit" disabled={saveMutation.isPending} className="w-full font-heading">
              {saveMutation.isPending ? 'جاري الحفظ...' : 'حفظ'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

const EMPTY_FORM = {
  title: '',
  description: '',
};
```

---

## 7. الإضافة 1 — نظام التقييمات

### 7.1 مكوّن النجوم `StarRating.tsx`

```tsx
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ value, onChange, readOnly = false, size = 'md' }: StarRatingProps) {
  const sizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-7 w-7' };

  return (
    <div className="flex gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(star)}
          className={`${sizes[size]} transition-colors ${
            star <= value ? 'text-yellow-400' : 'text-muted-foreground/30'
          } ${!readOnly ? 'hover:text-yellow-300 cursor-pointer' : 'cursor-default'}`}
        >
          <Star fill={star <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
}
```

### 7.2 مكوّن تقديم التقييم `ReviewForm.tsx`

```tsx
'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StarRating } from './StarRating';
import { submitReview } from '@/lib/db';
import { toast } from 'sonner';

interface ReviewFormProps {
  serviceId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ serviceId, onSuccess }: ReviewFormProps) {
  const [form, setForm] = useState({ reviewer_name: '', reviewer_email: '', rating: 0, body: '' });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: () => submitReview({ ...form, service_id: serviceId }),
    onSuccess: () => {
      setSubmitted(true);
      onSuccess?.();
      toast.success('شكراً! سيظهر تقييمك بعد المراجعة');
    },
    onError: (error: any) => toast.error(error.message || 'فشل الإرسال'),
  });

  if (submitted) {
    return (
      <div className="text-center py-8 text-emerald-500 font-heading">
        شكراً على تقييمك! ✓
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
      className="space-y-4 p-6 bg-card border border-border rounded-lg"
      dir="rtl"
    >
      <h3 className="font-heading font-bold text-foreground text-right">أضف تقييمك</h3>

      <div className="space-y-2">
        <Label className="font-heading text-right block">اسمك</Label>
        <Input
          value={form.reviewer_name}
          onChange={(e) => setForm((f) => ({ ...f, reviewer_name: e.target.value }))}
          required
          className="font-heading"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-heading text-right block">تقييمك</Label>
        <div className="flex justify-end">
          <StarRating value={form.rating} onChange={(r) => setForm((f) => ({ ...f, rating: r }))} size="lg" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-heading text-right block">تعليقك (اختياري)</Label>
        <Textarea
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          rows={3}
          className="font-heading"
        />
      </div>

      <Button
        type="submit"
        disabled={form.rating === 0 || mutation.isPending}
        className="w-full font-heading"
      >
        {mutation.isPending ? 'جاري الإرسال...' : 'إرسال التقييم'}
      </Button>
    </form>
  );
}
```

---

## 8. الإضافة 2 — نظام الترتيب والفلترة

### 8.1 Hook `useServiceSort.ts`

```ts
import { useMemo, useState } from 'react';

export function useServiceSort(services: any[] = []) {
  const [sortBy, setSortBy] = useState('sort_order');
  const [filterCategory, setFilterCategory] = useState('الكل');

  const sorted = useMemo(() => {
    let list =
      filterCategory === 'الكل'
        ? [...services]
        : services.filter((s) => s.category === filterCategory);

    switch (sortBy) {
      case 'title_asc':
        return list.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
      case 'title_desc':
        return list.sort((a, b) => b.title.localeCompare(a.title, 'ar'));
      case 'newest':
        return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'price_asc':
        return list.sort((a, b) => {
          if (!a.price_min) return 1;
          if (!b.price_min) return -1;
          return Number(a.price_min) - Number(b.price_min);
        });
      case 'price_desc':
        return list.sort((a, b) => {
          if (!a.price_min) return 1;
          if (!b.price_min) return -1;
          return Number(b.price_min) - Number(a.price_min);
        });
      default:
        return list.sort((a, b) => a.sort_order - b.sort_order);
    }
  }, [services, sortBy, filterCategory]);

  return { sorted, sortBy, setSortBy, filterCategory, setFilterCategory };
}
```

### 8.2 مكوّن `SortFilterBar.tsx`

```tsx
import { ArrowUpDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SORT_OPTIONS = [
  { value: 'sort_order', label: 'الترتيب الافتراضي' },
  { value: 'newest', label: 'الأحدث أولاً' },
  { value: 'price_asc', label: 'السعر: من الأقل' },
  { value: 'price_desc', label: 'السعر: من الأعلى' },
  { value: 'title_asc', label: 'الاسم: أ → ي' },
  { value: 'title_desc', label: 'الاسم: ي → أ' },
];

interface SortFilterBarProps {
  categories: string[];
  sortBy: string;
  setSortBy: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  totalCount: number;
}

export function SortFilterBar({
  categories,
  sortBy,
  setSortBy,
  filterCategory,
  setFilterCategory,
  totalCount,
}: SortFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-card border border-border rounded-lg" dir="rtl">
      {/* فلتر التصنيف */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {['الكل', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-heading transition-colors ${
              filterCategory === cat
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Sorted by */}
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-heading">ترتيب حسب:</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-44 h-8 text-sm font-heading">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="font-heading text-sm">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* عدد النتائج */}
      <span className="text-xs text-muted-foreground font-heading">{totalCount} خدمة</span>
    </div>
  );
}
```

---

## 9. مثال — صفحة `/admin/services`

```tsx
'use client';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import PageHeader from '@/components/admin/PageHeader';
import { fetchServices, upsertService, deleteService } from '@/lib/db';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AdminServices() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    image: '',
    is_active: true,
    sort_order: 0,
    price_min: '',
    price_max: '',
    price_label: '',
    price_currency: 'SAR',
  });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: fetchServices,
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editing
        ? upsertService({ ...data, id: editing.id })
        : upsertService(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-services'] });
      setOpen(false);
      setEditing(null);
      setForm({
        title: '',
        slug: '',
        description: '',
        category: '',
        image: '',
        is_active: true,
        sort_order: 0,
        price_min: '',
        price_max: '',
        price_label: '',
        price_currency: 'SAR',
      });
      toast.success('تم الحفظ بنجاح');
    },
    onError: (error: any) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-services'] });
      toast.success('تم الحذف بنجاح');
    },
  });

  return (
    <AdminLayout>
      <PageHeader
        title="إدارة الخدمات"
        subtitle="أضف وعدّل الخدمات التي تقدمها"
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            + خدمة جديدة
          </Button>
        }
      />

      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-4 bg-card border border-border rounded-lg flex justify-between items-center font-heading"
              >
                <div>
                  <h3 className="font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(service);
                      setForm(service);
                      setOpen(true);
                    }}
                  >
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(service.id)}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-heading text-right">
              {editing ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate(form);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label className="font-heading">العنوان</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="font-heading"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="font-heading">الوصف</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={4}
                className="font-heading"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label className="font-heading">السعر الأدنى</Label>
                <Input
                  type="number"
                  value={form.price_min}
                  onChange={(e) => setForm((f) => ({ ...f, price_min: e.target.value }))}
                  placeholder="0"
                  className="font-heading"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-heading">السعر الأعلى</Label>
                <Input
                  type="number"
                  value={form.price_max}
                  onChange={(e) => setForm((f) => ({ ...f, price_max: e.target.value }))}
                  placeholder="0"
                  className="font-heading"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-heading">العملة</Label>
                <Input
                  value={form.price_currency}
                  onChange={(e) => setForm((f) => ({ ...f, price_currency: e.target.value }))}
                  className="font-heading"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={saveMutation.isPending}
              className="w-full font-heading"
            >
              {saveMutation.isPending ? 'جاري الحفظ...' : 'حفظ'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
```

---

## 10. قواعس الكود والأنماط الثابتة

```
✅  'use client'           → على صفحات Admin (Client Components)
✅  font-heading           → على كل نص في Admin
✅  dir="rtl"              → على كل Dialog/Form
✅  toast.success()        → بعد كل عملية ناجحة
✅  toast.error()          → عند الفشل مع e.message
✅  qc.invalidateQueries() → بعد كل mutation
✅  AdminLayout            → يغلف كل صفحة admin
✅  PageHeader             → أعلى كل صفحة admin
✅  useQuery + useMutation → من @tanstack/react-query
✅  select('col1,col2')    → لا select('*') في البيانات
✅  upsert pattern         → if(row.id) update else insert
```

---

## 11. متغيرات البيئة المطلوبة

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## 12. الملفات المطلوب إنشاؤها

### ملفات جديدة
```
app/admin/
  layout.tsx
  page.tsx (Dashboard)
  login/
    page.tsx
  services/
    page.tsx
  projects/
    page.tsx
  blog/
    page.tsx
  reviews/
    page.tsx
  messages/
    page.tsx
  settings/
    page.tsx

src/components/admin/
  AdminLayout.tsx
  AdminSidebar.tsx
  PageHeader.tsx
  RequireAdmin.tsx (middleware)

src/components/ui/
  StarRating.tsx
  ReviewForm.tsx
  SortFilterBar.tsx

src/lib/
  db.ts (database functions)
  auth.ts (Supabase client)

src/hooks/
  useServiceSort.ts

src/middleware.ts (Next.js middleware للحماية)
```

### ملفات معدَّلة
```
app/layout.tsx           → إضافة Providers (QueryClientProvider, Toaster)
src/lib/db.ts           → جميع دوال CRUD
src/pages/services/page.tsx  → إضافة SortFilterBar
src/pages/projects/page.tsx  → إضافة SortFilterBar + نظام الترتيب
src/pages/[slug]/page.tsx    → إضافة ReviewForm
```

---

## 13. Next.js Middleware للحماية

```tsx
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // حماية مسارات /admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // التحقق من الدور
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || !['admin', 'editor'].includes(profile.role)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

*آخر تحديث: مايو 2026 — Elhussainy Portfolio Admin Dashboard v1.0*
