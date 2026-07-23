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
        return list.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
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
