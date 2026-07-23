'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSettings } from '@/lib/useSiteData';
import { useLanguage } from '@/core/i18n/LanguageContext';
import LangToggle from '@/components/LangToggle';

const navLinks = [
  { en: 'Home', ar: 'الرئيسية', path: '/' },
  { en: 'Projects', ar: 'المشاريع', path: '/projects' },
  { en: 'Services', ar: 'الخدمات', path: '/services' },
  { en: 'Blog', ar: 'المدونة', path: '/blog' },
  { en: 'About', ar: 'عني', path: '/about' },
  { en: 'Contact', ar: 'تواصل', path: '/contact' },
];

function stripLocale(pathname: string) {
  const cleaned = pathname.replace(/^\/(en|ar)(?=\/|$)/, '');
  return cleaned === '' ? '/' : cleaned;
}

export default function Navbar() {
  const { data: settings } = useSettings();
  const { language, href } = useLanguage();
  const isAr = language === 'ar';
  const pathname = usePathname() || '/';
  const logicalPath = stripLocale(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const consultText = isAr ? 'احجز استشارة' : 'Book a Consult';
  const availText = isAr ? 'متاح للعمل' : 'Available for work';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={href('/')} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-blue-200 shadow-sm bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="ME Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-obsidian leading-tight">
                {settings?.owner_name || 'Mohamed El-Husseiny'}
              </p>
              <p className="text-[10px] text-slate-500">
                {isAr ? settings?.tagline_ar || 'معرض أعمال مطور ويب' : settings?.tagline_en || 'Web developer portfolio'}
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = logicalPath === link.path;
              return (
                <Link
                  key={link.path}
                  href={href(link.path)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active ? 'text-cobalt bg-blue-50' : 'text-slate-600 hover:text-obsidian hover:bg-slate-50'
                  }`}
                >
                  {isAr ? link.ar : link.en}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LangToggle />
            {settings?.available_for_work !== false && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {availText}
              </span>
            )}
            <a
              href={`https://wa.me/${settings?.whatsapp || '201018557413'}?text=${encodeURIComponent(
                settings?.whatsapp_quote_message_en || "Hi Mohamed, I'd like a quote."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cobalt text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {consultText}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LangToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border py-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={href(link.path)}
                className={`block px-4 py-2.5 text-sm font-medium ${
                  logicalPath === link.path ? 'text-cobalt' : 'text-slate-700'
                }`}
              >
                {isAr ? link.ar : link.en}
              </Link>
            ))}
            <div className="px-4 pt-3">
              <a
                href={`https://wa.me/${settings?.whatsapp || '201018557413'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-cobalt text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center"
              >
                {consultText}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
