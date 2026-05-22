import { AuthProvider } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Toaster } from 'sonner';

import '@/styles/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="font-arabic antialiased">
        <AuthProvider>
          <AdminLayout>{children}</AdminLayout>
        </AuthProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
