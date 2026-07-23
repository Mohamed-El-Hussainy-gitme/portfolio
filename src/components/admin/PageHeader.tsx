'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="border-b border-border p-6" dir="rtl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-1">{title}</h1>
          {subtitle && (
            <p className="font-heading text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex gap-3">{action}</div>}
      </div>
    </div>
  );
}
