'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Phone, Youtube, Facebook, Instagram, Send } from 'lucide-react';
import { useSettings } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';

export default function SiteFooter() {
  const { data: s } = useSettings();
  const { language, href } = useLanguage();
  const isAr = language === 'ar';

  const socialIcons = [
    s?.github_url && { icon: Github, href: s.github_url, label: 'GitHub' },
    s?.linkedin_url && { icon: Linkedin, href: s.linkedin_url, label: 'LinkedIn' },
    s?.twitter_url && { icon: Twitter, href: s.twitter_url, label: 'Twitter' },
    s?.youtube_url && { icon: Youtube, href: s.youtube_url, label: 'YouTube' },
    s?.facebook_url && { icon: Facebook, href: s.facebook_url, label: 'Facebook' },
    s?.instagram_url && { icon: Instagram, href: s.instagram_url, label: 'Instagram' },
    s?.telegram_url && { icon: Send, href: s.telegram_url, label: 'Telegram' },
    s?.email && { icon: Mail, href: `mailto:${s.email}`, label: 'Email' },
  ].filter(Boolean) as { icon: typeof Github; href: string; label: string }[];

  const navLinks = isAr
    ? [
        ['الرئيسية', '/'],
        ['المشاريع', '/projects'],
        ['الخدمات', '/services'],
        ['المدونة', '/blog'],
        ['عني', '/about'],
        ['تواصل', '/contact'],
      ]
    : [
        ['Home', '/'],
        ['Projects', '/projects'],
        ['Services', '/services'],
        ['Blog', '/blog'],
        ['About', '/about'],
        ['Contact', '/contact'],
      ];

  const phones = Array.isArray(s?.phone_numbers) ? s.phone_numbers : [];

  return (
    <footer className="bg-obsidian text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-600">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="ME Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold">{s?.owner_name || 'Mohamed El-Husseiny'}</p>
                <p className="text-sm text-slate-400">
                  {isAr ? s?.tagline_ar || 'معرض أعمال مطور ويب' : s?.tagline_en || 'Developer portfolio'}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {isAr
                ? 'بنفذ مشاريع ويب من الصفر أو بالقوالب — أختار الأنسب لك. متخصص في SEO تقني، أداء عالٍ، وتجربة مستخدم عربية/إنجليزية.'
                : 'I build web projects from scratch or with templates — whichever fits best. Specialized in technical SEO, high performance, and flawless AR/EN UX.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              {socialIcons.map(({ icon: Icon, href: socialHref, label }) => (
                <a
                  key={label}
                  href={socialHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              {isAr ? 'التنقل' : 'Navigation'}
            </p>
            <div className="space-y-2">
              {navLinks.map(([label, path]) => (
                <Link key={path} href={href(path)} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              {isAr ? 'تواصل' : 'Contact'}
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              {s?.email && (
                <a href={`mailto:${s.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {s.email}
                </a>
              )}
              {phones.map((phone: string, i: number) => (
                <a key={i} href={`tel:${phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {phone}
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${s?.whatsapp || '201018557413'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cobalt text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isAr ? 'اطلب عرض سعر' : 'Request a quote'}
              </a>
              <Link
                href={href('/projects')}
                className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg hover:border-slate-500 transition-colors"
              >
                {isAr ? 'المشاريع' : 'View projects'}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© 2026 {s?.owner_name || 'Mohamed El-Husseiny'}. All rights reserved.</p>
          <p>{isAr ? 'مطور ويب متكامل · SEO تقني · ثنائي اللغة' : 'Full-stack web developer · Technical SEO · Bilingual'}</p>
        </div>
      </div>
    </footer>
  );
}
