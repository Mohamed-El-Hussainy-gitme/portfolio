'use client';

import { useQuery } from '@tanstack/react-query';
import { getPageContent, mergePagesMeta } from '@/lib/pageContent';
import type { PageKey } from '@/types/pageContent';
import { apiClient } from './apiClient';

export function usePagesMeta() {
  return useQuery({
    queryKey: ['pages-meta'],
    queryFn: async () => {
      const rows = await apiClient.entities.SiteSettings.list();
      const row = rows[0] as Record<string, unknown> | undefined;
      return mergePagesMeta(row?.pages_meta);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePageContent(page: PageKey) {
  const { data: meta, ...rest } = usePagesMeta();
  return {
    ...rest,
    data: getPageContent(meta ?? mergePagesMeta(undefined), page),
  };
}
