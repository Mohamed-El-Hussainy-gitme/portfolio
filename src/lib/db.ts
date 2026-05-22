/**
 * Admin data layer — unified bilingual Supabase schema (dashboard 001).
 */
import { mergePagesMeta } from '@/lib/pageContent';
import type { PageKey, PagesMetaMap } from '@/types/pageContent';
import { apiClient } from './apiClient';

export async function fetchProjects() {
  return apiClient.entities.Project.list('universe');
}

export async function upsertProject(row: Record<string, unknown>) {
  const payload = {
    ...row,
    tech_stack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
    tags: Array.isArray(row.tags) ? row.tags : [],
    screens: Array.isArray(row.screens) ? row.screens : [],
    faqs: Array.isArray(row.faqs) ? row.faqs : [],
    case_study_steps_en: Array.isArray(row.case_study_steps_en) ? row.case_study_steps_en : [],
    case_study_steps_ar: Array.isArray(row.case_study_steps_ar) ? row.case_study_steps_ar : [],
  };
  if (row.id) return apiClient.entities.Project.update(String(row.id), payload);
  return apiClient.entities.Project.create(payload);
}

export async function deleteProject(id: string) {
  return apiClient.entities.Project.delete(id);
}

export async function fetchServices() {
  return apiClient.entities.Service.list('order');
}

export async function upsertService(row: Record<string, unknown>) {
  const payload = {
    ...row,
    includes_en: Array.isArray(row.includes_en) ? row.includes_en : [],
    includes_ar: Array.isArray(row.includes_ar) ? row.includes_ar : [],
  };
  if (row.id) return apiClient.entities.Service.update(String(row.id), payload);
  return apiClient.entities.Service.create(payload);
}

export async function deleteService(id: string) {
  return apiClient.entities.Service.delete(id);
}

export async function fetchBlogPosts() {
  return apiClient.entities.BlogPost.list('-published_date');
}

export async function upsertBlogPost(row: Record<string, unknown>) {
  const payload = {
    ...row,
    tags: Array.isArray(row.tags) ? row.tags : [],
  };
  if (row.id) return apiClient.entities.BlogPost.update(String(row.id), payload);
  return apiClient.entities.BlogPost.create(payload);
}

export async function deleteBlogPost(id: string) {
  return apiClient.entities.BlogPost.delete(id);
}

export async function fetchReviews() {
  return apiClient.entities.Review.list('order');
}

export async function upsertReview(row: Record<string, unknown>) {
  if (row.id) return apiClient.entities.Review.update(String(row.id), row);
  return apiClient.entities.Review.create(row);
}

export async function deleteReview(id: string) {
  return apiClient.entities.Review.delete(id);
}

export async function fetchSkills() {
  return apiClient.entities.Skill.list('order');
}

export async function upsertSkill(row: Record<string, unknown>) {
  if (row.id) return apiClient.entities.Skill.update(String(row.id), row);
  return apiClient.entities.Skill.create(row);
}

export async function deleteSkill(id: string) {
  return apiClient.entities.Skill.delete(id);
}

/** Maps admin UI keys → site_settings columns (all conflicts resolved) */
const SETTING_COLUMN_MAP: Record<string, string> = {
  // Hero section
  hero_title: 'hero_heading_ar',
  hero_subtitle: 'hero_subheading_ar',
  hero_description: 'tagline_ar',
  hero_cta_label: 'whatsapp_quote_message_en',
  hero_cta_link: 'hero_cta_link',
  hero_heading_en: 'hero_heading_en',
  hero_heading_ar: 'hero_heading_ar',
  hero_subheading_en: 'hero_subheading_en',
  hero_subheading_ar: 'hero_subheading_ar',

  // Taglines
  tagline_en: 'tagline_en',
  tagline_ar: 'tagline_ar',

  // Site metadata
  site_title: 'meta_title',
  site_description: 'meta_description',
  meta_title: 'meta_title',
  meta_description: 'meta_description',
  meta_keywords: 'meta_keywords',
  google_analytics_id: 'google_analytics_id',
  og_image: 'og_image',
  cv_download_url: 'cv_download_url',
  review_external_url: 'review_external_url',

  // Contact information
  contact_email: 'email',
  whatsapp_number: 'whatsapp',

  // Social media
  github_url: 'github_url',
  linkedin_url: 'linkedin_url',
  twitter_url: 'twitter_url',
  instagram_url: 'instagram_url',
  social_github: 'github_url',
  social_linkedin: 'linkedin_url',
  social_twitter: 'twitter_url',
  social_instagram: 'instagram_url',

  // About section (now with distinct columns)
  about_name: 'owner_name',
  about_bio_en: 'about_bio_en',
  about_bio_ar: 'about_bio_ar',
  about_bio: 'about_bio_ar',
  about_title_en: 'about_title_en',
  about_title_ar: 'about_title_ar',
  about_title: 'about_title_ar',
  about_location_en: 'about_location_en',
  about_location_ar: 'about_location_ar',
  about_location: 'about_location_en',
  about_avatar_url: 'about_avatar_url',
  about_experience_years: 'years_experience',
  about_projects_count: 'projects_count',
  about_clients_count: 'clients_count',

  // Story section (now with distinct columns)
  story_title_en: 'story_title_en',
  story_title_ar: 'story_title_ar',
  story_title: 'story_title_ar',
  story_content_en: 'story_content_en',
  story_content_ar: 'story_content_ar',
  story_content: 'story_content_ar',

  // Long bio (for backward compatibility)
  about_long_bio: 'about_bio_ar',
};

const NUMERIC_SETTING_KEYS = new Set([
  'about_experience_years',
  'about_projects_count',
  'about_clients_count',
  'clients_count',
]);

export async function fetchSiteSettings() {
  const rows = await apiClient.entities.SiteSettings.list();
  const row = rows[0] as Record<string, unknown> | undefined;
  if (!row) return [];

  const flat = Object.entries(SETTING_COLUMN_MAP).map(([setting_key, column]) => {
    const raw = row[column];
    const setting_value =
      raw === null || raw === undefined
        ? ''
        : typeof raw === 'number'
          ? String(raw)
          : String(raw);
    return { setting_key, setting_value };
  });

  const homeSections = (row.home_sections as Record<string, string>) || {};
  for (const [key, value] of Object.entries(homeSections)) {
    flat.push({ setting_key: key, setting_value: value ?? '' });
  }

  return flat;
}

export async function fetchSiteSettingsRow() {
  const rows = await apiClient.entities.SiteSettings.list();
  return (rows[0] as Record<string, unknown>) ?? null;
}

export async function fetchPagesMeta(): Promise<PagesMetaMap> {
  const row = await fetchSiteSettingsRow();
  return mergePagesMeta(row?.pages_meta);
}

export async function savePagesMeta(meta: PagesMetaMap) {
  const row = await fetchSiteSettingsRow();
  const payload = { pages_meta: meta };
  if (row?.id) return apiClient.entities.SiteSettings.update(String(row.id), payload);
  return apiClient.entities.SiteSettings.create({ key: 'main', ...payload });
}

export async function savePageContent(page: PageKey, content: PagesMetaMap[PageKey]) {
  const current = await fetchPagesMeta();
  return savePagesMeta({ ...current, [page]: content });
}

export async function updateSiteSetting(key: string, value: string) {
  const homeSectionKeys = [
    'skills_title',
    'skills_description',
    'why_title',
    'why_description',
    'cta_title',
    'cta_subtitle',
    'cta_button_label',
  ];

  if (homeSectionKeys.includes(key)) {
    const row = await fetchSiteSettingsRow();
    const home_sections = {
      ...((row?.home_sections as Record<string, string>) || {}),
      [key]: value,
    };
    if (row?.id) {
      return apiClient.entities.SiteSettings.update(String(row.id), { home_sections });
    }
    return apiClient.entities.SiteSettings.create({ key: 'main', home_sections });
  }

  const column = SETTING_COLUMN_MAP[key];
  if (!column) return null;

  let parsed: string | number = value;
  if (NUMERIC_SETTING_KEYS.has(key)) {
    const n = parseInt(value, 10);
    parsed = Number.isNaN(n) ? 0 : n;
  }

  const rows = await apiClient.entities.SiteSettings.list();
  const row = rows[0] as { id?: string } | undefined;
  if (row?.id) {
    return apiClient.entities.SiteSettings.update(row.id, { [column]: parsed });
  }
  return apiClient.entities.SiteSettings.create({ key: 'main', [column]: parsed });
}

export async function upsertSiteSettings(row: Record<string, unknown>) {
  if (row.id) return apiClient.entities.SiteSettings.update(String(row.id), row);
  return apiClient.entities.SiteSettings.create({ ...row, key: row.key || 'main' });
}

export const fetchContactMessages = fetchContactMessagesImpl;

async function fetchContactMessagesImpl() {
  return apiClient.entities.ContactMessage.list('-created_at');
}

export async function updateMessageStatus(id: string, status: string, _note?: string) {
  return apiClient.entities.ContactMessage.update(id, { status });
}

export async function deleteMessage(id: string) {
  return deleteContactMessage(id);
}

export async function approveReview(id: string, approved: boolean) {
  return apiClient.entities.Review.update(id, { visible: approved });
}

export async function updateContactMessage(id: string, payload: Record<string, unknown>) {
  return apiClient.entities.ContactMessage.update(id, payload);
}

export async function deleteContactMessage(id: string) {
  return apiClient.entities.ContactMessage.delete(id);
}

/** Normalize DB service row → admin form */
export function serviceToAdminForm(row: Record<string, unknown>) {
  return {
    id: row.id as string | undefined,
    slug: String(row.slug ?? ''),
    status: (row.status as 'published' | 'draft') ?? 'published',
    order: Number(row.order) || 0,
    icon: String(row.icon ?? ''),
    cover_image: String(row.cover_image ?? ''),
    title_en: String(row.title_en ?? ''),
    title_ar: String(row.title_ar ?? ''),
    description_en: String(row.description_en ?? ''),
    description_ar: String(row.description_ar ?? ''),
    keyword_en: String(row.keyword_en ?? ''),
    keyword_ar: String(row.keyword_ar ?? ''),
    seo_title_en: String(row.seo_title_en ?? ''),
    seo_title_ar: String(row.seo_title_ar ?? ''),
    seo_description_en: String(row.seo_description_en ?? ''),
    seo_description_ar: String(row.seo_description_ar ?? ''),
    focus_keyword_en: String(row.keyword_en ?? ''),
    focus_keyword_ar: String(row.keyword_ar ?? ''),
    includes_en: (row.includes_en as string[]) ?? [],
    includes_ar: (row.includes_ar as string[]) ?? [],
  };
}

export function blogToAdminForm(row: Record<string, unknown>) {
  return {
    id: row.id as string | undefined,
    slug: String(row.slug ?? ''),
    status: (row.status as 'published' | 'draft') ?? 'draft',
    title_en: String(row.title_en ?? ''),
    title_ar: String(row.title_ar ?? ''),
    summary_en: String(row.summary_en ?? ''),
    summary_ar: String(row.summary_ar ?? ''),
    content_en: String(row.content_en ?? ''),
    content_ar: String(row.content_ar ?? ''),
    cover_image: String(row.cover_image ?? ''),
    published_date: String(row.published_date ?? ''),
    reading_time_min: Number(row.reading_time_min) || 5,
    tags: (row.tags as string[]) ?? [],
    seo_title_en: String(row.seo_title_en ?? ''),
    seo_title_ar: String(row.seo_title_ar ?? ''),
    seo_description_en: String(row.seo_description_en ?? ''),
    seo_description_ar: String(row.seo_description_ar ?? ''),
    focus_keyword_en: '',
    focus_keyword_ar: '',
  };
}
