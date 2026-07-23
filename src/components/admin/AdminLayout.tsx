'use client';

/**
 * AdminLayout — مُعاد كتابته بالكامل
 *
 * التغييرات عن النسخة القديمة:
 * 1. يستخدم useAuth() من AuthContext بدل useEffect متفرق لكل render
 * 2. QueryClient مشترك مع staleTime + gcTime محددان
 * 3. RequireAdmin component منفصل وواضح
 */

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AdminSidebar from './AdminSidebar';

// ─── Shared QueryClient ───────────────────────────────────────────────────────
// مثيل واحد مشترك بين كل صفحات الأدمن — لا يُعاد إنشاؤه عند كل render
const adminQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 دقائق قبل إعادة الجلب
      gcTime: 1000 * 60 * 10,    // 10 دقائق قبل حذف الـ cache
      retry: 1,
    },
  },
});

// ─── RequireAdmin ─────────────────────────────────────────────────────────────
function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== 'undefined' && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
    return null;
  }

  return <>{children}</>;
}

// ─── AdminLayout ──────────────────────────────────────────────────────────────

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <QueryClientProvider client={adminQueryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={adminQueryClient}>
      <RequireAdmin>
        <div className="flex h-screen bg-background">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </RequireAdmin>
    </QueryClientProvider>
  );
}
