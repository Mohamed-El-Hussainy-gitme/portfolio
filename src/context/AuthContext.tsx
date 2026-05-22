'use client';

/**
 * AuthContext — مصدر واحد لحالة المصادقة في كامل التطبيق
 *
 * بدلاً من استدعاء supabase.auth.getSession() في كل component،
 * هذا الـ context يستمع لـ onAuthStateChange مرة واحدة فقط،
 * وكل component يقرأ منه مباشرة.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// ─── Types ──────────────────────────────────────────────────────────────────

interface AuthState {
  /** null = لم يُحدَّد بعد (جاري التحقق)، undefined = لا يوجد مستخدم */
  user: User | null | undefined;
  session: Session | null | undefined;
  /** true طالما لم يتم التحقق من الجلسة بعد */
  loading: boolean;
  /** هل المستخدم مسجّل دخول فعلاً */
  isAuthenticated: boolean;
  /** تسجيل الخروج */
  signOut: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthState | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب الجلسة الحالية فور التحميل
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // الاستماع لأي تغيير في حالة المصادقة (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value: AuthState = {
    user,
    session,
    loading,
    isAuthenticated: !!session,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
}
