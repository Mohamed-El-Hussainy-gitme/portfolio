'use client';

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import { supabase } from '@/lib/supabase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    blog: 0,
    messages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, projectsRes, blogRes, messagesRes] = await Promise.all([
          supabase.from('services').select('count', { count: 'exact' }),
          supabase.from('projects').select('count', { count: 'exact' }),
          supabase.from('blog_posts').select('count', { count: 'exact' }),
          supabase.from('contact_messages').select('count', { count: 'exact' }),
        ]);

        setStats({
          services: servicesRes.count || 0,
          projects: projectsRes.count || 0,
          blog: blogRes.count || 0,
          messages: messagesRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const STAT_CARDS = [
    { label: 'الخدمات', value: stats.services, color: 'bg-blue-500' },
    { label: 'المشاريع', value: stats.projects, color: 'bg-purple-500' },
    { label: 'مقالات المدونة', value: stats.blog, color: 'bg-green-500' },
    { label: 'الرسائل', value: stats.messages, color: 'bg-orange-500' },
  ];

  return (
    <>
      <PageHeader
        title="لوحة التحكم"
        subtitle="مرحباً بك في لوحة التحكم الرئيسية"
      />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STAT_CARDS.map((card) => (
            <Card key={card.label}>
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${card.color} h-2 rounded-full mb-2`} />
                <p className="font-heading text-3xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">مرحباً بك</CardTitle>
            <CardDescription className="font-heading">
              لوحة التحكم الشاملة لإدارة محتوى موقعك
            </CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-muted-foreground space-y-3">
            <p>• إدارة الخدمات والمشاريع والمدونة</p>
            <p>• الرد على رسائل العملاء</p>
            <p>• إدارة التقييمات والمراجعات</p>
            <p>• تحديث إعدادات الموقع</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
