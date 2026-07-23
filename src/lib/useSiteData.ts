'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';
import {
  mapBlogRow,
  mapProjectRow,
  mapReviewRow,
  mapServiceRow,
  mapSkillRow,
  mapVerifiedReviewToDisplay,
} from './mappers';
import { projects as fallbackProjects } from '@/data/projects';
import { services as fallbackServices } from '@/data/services';
import { blogPosts as fallbackBlog } from '@/data/blog';
import { verifiedReviews as fallbackReviews } from '@/data/verifiedReviews';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const rows = await apiClient.entities.SiteSettings.list();
      return rows[0] ?? null;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const rows = await apiClient.entities.Project.list('universe');
      if (!rows.length) return fallbackProjects;
      return rows
        .filter((r) => r.status === 'published')
        .map((r) => mapProjectRow(r as Record<string, unknown>));
    },
    staleTime: 2 * 60 * 1000,
    placeholderData: fallbackProjects,
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const rows = await apiClient.entities.Project.filter({ slug, status: 'published' });
      if (!rows.length) {
        return fallbackProjects.find((p) => p.slug === slug) ?? null;
      }
      return mapProjectRow(rows[0] as Record<string, unknown>);
    },
    enabled: !!slug,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const rows = await apiClient.entities.Service.list('order');
      if (!rows.length) return fallbackServices;
      return rows
        .filter((r) => r.status === 'published')
        .map((r) => mapServiceRow(r as Record<string, unknown>));
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: fallbackServices,
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: async () => {
      const rows = await apiClient.entities.Service.filter({ slug, status: 'published' });
      if (!rows.length) return fallbackServices.find((s) => s.slug === slug) ?? null;
      return mapServiceRow(rows[0] as Record<string, unknown>);
    },
    enabled: !!slug,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const rows = await apiClient.entities.Skill.list('order');
      return rows.filter((r) => r.visible !== false).map((r) => mapSkillRow(r as Record<string, unknown>));
    },
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const rows = await apiClient.entities.Review.list('order');
      if (!rows.length) return fallbackReviews.map(mapVerifiedReviewToDisplay);
      return rows
        .filter((r) => r.visible !== false)
        .map((r) => mapReviewRow(r as Record<string, unknown>));
    },
    placeholderData: fallbackReviews.map(mapVerifiedReviewToDisplay),
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const rows = await apiClient.entities.BlogPost.list('-published_date');
      if (!rows.length) return fallbackBlog;
      return rows
        .filter((r) => r.status === 'published')
        .map((r) => mapBlogRow(r as Record<string, unknown>));
    },
    placeholderData: fallbackBlog,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const rows = await apiClient.entities.BlogPost.filter({ slug, status: 'published' });
      if (!rows.length) return fallbackBlog.find((b) => b.slug === slug) ?? null;
      return mapBlogRow(rows[0] as Record<string, unknown>);
    },
    enabled: !!slug,
  });
}
