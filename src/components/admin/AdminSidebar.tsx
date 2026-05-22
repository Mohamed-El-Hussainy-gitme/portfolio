'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Info,
  Layout,
  Briefcase,
  FolderOpen,
  BookOpen,
  Star,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const NAV_GROUPS = [
  {
    title: null,
    items: [{ label: 'لوحة التحكم', path: '/admin', icon: LayoutDashboard }],
  },
  {
    title: 'إدارة الصفحات',
    items: [
      { label: 'الصفحة الرئيسية', path: '/admin/home-page', icon: Home },
      { label: 'صفحات الموقع', path: '/admin/pages', icon: Layout },
      { label: 'من نحن', path: '/admin/about-page', icon: Info },
    ],
  },
  {
    title: 'المحتوى',
    items: [
      { label: 'الخدمات', path: '/admin/services', icon: Briefcase },
      { label: 'المشاريع', path: '/admin/projects', icon: FolderOpen },
      { label: 'المدونة', path: '/admin/blog', icon: BookOpen },
    ],
  },
  {
    title: 'الإدارة',
    items: [
      { label: 'التقييمات', path: '/admin/reviews', icon: Star },
      { label: 'الرسائل', path: '/admin/messages', icon: Mail },
      { label: 'إعدادات الموقع', path: '/admin/settings', icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-card border border-border rounded-lg"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-card border-l border-border flex flex-col transition-all duration-300 ${
          isOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'
        } md:translate-x-0 fixed md:relative h-screen md:h-auto z-40`}
        dir="rtl"
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h1 className="font-heading font-bold text-lg text-foreground">
            لوحة التحكم
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {NAV_GROUPS.map((group, idx) => (
            <div key={idx}>
              {group.title && (
                <h3 className="font-heading text-xs font-semibold text-muted-foreground uppercase px-3 mb-3">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-heading text-sm transition-colors ${
                          isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          {user && (
            <div className="px-3 py-2 text-xs font-heading text-muted-foreground truncate">
              {user.email}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-heading text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
