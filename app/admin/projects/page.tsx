'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Lazy load — كود إدارة المشاريع لا يُحمَّل إلا عند دخول الأدمن لهذه الصفحة
const AdminProjects = dynamic(
  () => import('@/views/admin/projects.view'),
  {
    loading: () => (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ),
    ssr: false,
  }
);

export default AdminProjects;
