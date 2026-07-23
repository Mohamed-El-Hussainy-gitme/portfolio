'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const AdminServices = dynamic(
  () => import('@/views/admin/services.view'),
  {
    loading: () => (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ),
    ssr: false,
  }
);

export default AdminServices;
