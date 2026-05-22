'use client';

import React from 'react';
import { ArrowUpDown, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

const SORT_OPTIONS = [
  { value: 'sort_order', label: 'الترتيب الافتراضي' },
  { value: 'newest', label: 'الأحدث أولاً' },
  { value: 'price_asc', label: 'السعر: من الأقل' },
  { value: 'price_desc', label: 'السعر: من الأعلى' },
  { value: 'title_asc', label: 'الاسم: أ → ي' },
  { value: 'title_desc', label: 'الاسم: ي → أ' },
];

interface SortFilterBarProps {
  categories?: string[];
  sortBy: string;
  setSortBy: (value: string) => void;
  filterCategory?: string;
  setFilterCategory?: (value: string) => void;
  totalCount: number;
}

export function SortFilterBar({
  categories = [],
  sortBy,
  setSortBy,
  filterCategory = 'الكل',
  setFilterCategory,
  totalCount,
}: SortFilterBarProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-card border border-border rounded-lg"
      dir="rtl"
    >
      {/* فلتر التصنيف */}
      {categories.length > 0 && setFilterCategory && (
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
      )}

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
      <span className="text-xs text-muted-foreground font-heading">{totalCount} عنصر</span>
    </div>
  );
}
