'use client';

import React from 'react';
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
