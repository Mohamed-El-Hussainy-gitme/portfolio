'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  backHref: string;
  backLabel: string;
  action?: ReactNode;
};

export default function DetailPageBar({ backHref, backLabel, action }: Props) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <Link href={backHref} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-cobalt transition-colors">
          <span aria-hidden>←</span>
          {backLabel}
        </Link>
        {action}
      </div>
    </div>
  );
}
