'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type PageHeroProps = {
  label: string;
  heading: string;
  sub: string;
  actions?: ReactNode;
};

export default function PageHero({ label, heading, sub, actions }: PageHeroProps) {
  return (
    <div className="bg-surface border-b border-border pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-cobalt mb-2">{label}</p>
        <h1 className="text-4xl sm:text-5xl font-inter-tight font-black text-obsidian mb-4">{heading}</h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-6">{sub}</p>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}

export function HeroLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline';
}) {
  const base = 'inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-all';
  const styles =
    variant === 'primary'
      ? `${base} bg-cobalt text-white hover:bg-blue-700`
      : `${base} border border-border text-slate-700 hover:bg-white`;
  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
