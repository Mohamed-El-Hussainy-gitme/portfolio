import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Client — Lazy Singleton مع Graceful Fallback
 *
 * المشكلة القديمة: إذا غابت NEXT_PUBLIC_SUPABASE_URL أو NEXT_PUBLIC_SUPABASE_ANON_KEY
 * أثناء `next build`، كان التطبيق ينهار فوراً بـ runtime error.
 *
 * الحل: placeholder يُستخدم عند غياب القيم، مع تحذير واضح في console.
 * هذا يسمح للـ static pages بالبناء بنجاح، وأي استدعاء فعلي للـ API
 * سيفشل بشكل واضح ومتحكَّم به في المتصفح — لا انهيار صامت.
 */

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key';

if (
  process.env.NEXT_PUBLIC_SUPABASE_URL === undefined ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === undefined
) {
  if (typeof window !== 'undefined') {
    // تحذير في المتصفح فقط — لا في وقت البناء
    console.warn(
      '[Supabase] NEXT_PUBLIC_SUPABASE_URL أو NEXT_PUBLIC_SUPABASE_ANON_KEY غير موجودة.\n' +
        'تأكد من إضافتها في .env.local أو في إعدادات بيئة الاستضافة.'
    );
  }
}

// Lazy singleton — لا يُنشأ إلا عند أول استخدام فعلي في المتصفح
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    _client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop: string) {
    return (getClient() as unknown as Record<string, unknown>)[prop];
  },
});
