import { getPostBySlug, type BlogPost } from '@/data/blog';
import type { ProjectDefinition } from '@/data/projects';
import type { LocalizedText } from '@/data/projects';
import type { VerifiedReview } from '@/data/verifiedReviews';

export type DisplayReview = {
  id: string;
  platform: string;
  reviewerName?: string;
  rating: number;
  reviewText: LocalizedText;
  reviewUrl?: string;
  screenshotUrl?: string;
};

export type DisplaySkill = {
  id: string;
  category: string;
  name: string;
  projectCount?: number;
};

function loc(en?: string | null, ar?: string | null): LocalizedText {
  return { en: en || '', ar: ar || en || '' };
}

function normalizeLocalizedText(value: unknown): LocalizedText {
  if (typeof value === 'string') {
    return { en: value, ar: value };
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return {
      en: typeof record.en === 'string' ? record.en : '',
      ar: typeof record.ar === 'string' ? record.ar : typeof record.en === 'string' ? record.en : '',
    };
  }

  return { en: '', ar: '' };
}

function normalizeFaqs(rawFaqs: unknown): Array<{ q: LocalizedText; a: LocalizedText }> {
  if (!Array.isArray(rawFaqs)) return [];

  return rawFaqs.map((faq) => {
    const item = (faq as Record<string, unknown>) || {};
    return {
      q: normalizeLocalizedText(item.q ?? item.q_en ?? item.question),
      a: normalizeLocalizedText(item.a ?? item.a_en ?? item.answer),
    };
  });
}

export function mapProjectRow(row: Record<string, unknown>): ProjectDefinition {
  const faqs = normalizeFaqs(row.faqs);
  return {
    id: String(row.slug),
    universe: Number(row.universe) || 0,
    slug: String(row.slug),
    name: loc(row.name_en as string, row.name_ar as string),
    tagline: loc(row.tagline_en as string, row.tagline_ar as string),
    description: loc(row.description_en as string, row.description_ar as string),
    focusKeyword: loc(row.focus_keyword_en as string, row.focus_keyword_ar as string),
    seoTitle: loc(row.seo_title_en as string, row.seo_title_ar as string),
    seoDescription: loc(row.seo_description_en as string, row.seo_description_ar as string),
    techStack: (row.tech_stack as string[]) || [],
    tags: (row.tags as string[]) || [],
    repoUrl: (row.repo_url as string) || '',
    liveUrl: (row.live_url as string) || '',
    screens: (row.screens as ProjectDefinition['screens']) || [],
    highlights: [
      {
        id: 'keyPoints',
        label: { en: 'Key points', ar: 'نقاط رئيسية' },
        body: loc(row.highlight_key_points_en as string, row.highlight_key_points_ar as string),
      },
      {
        id: 'focus',
        label: { en: 'Focus', ar: 'التركيز' },
        body: loc(row.highlight_focus_en as string, row.highlight_focus_ar as string),
      },
      {
        id: 'role',
        label: { en: 'Role', ar: 'الدور' },
        body: loc(row.highlight_role_en as string, row.highlight_role_ar as string),
      },
    ],
    caseStudy: {
      problem: loc(row.case_study_problem_en as string, row.case_study_problem_ar as string),
      solution: loc(row.case_study_solution_en as string, row.case_study_solution_ar as string),
      outcome: loc(row.case_study_outcome_en as string, row.case_study_outcome_ar as string),
      role: loc(row.case_study_role_en as string, row.case_study_role_ar as string),
      stack: loc(row.case_study_stack_en as string, row.case_study_stack_ar as string),
      steps: {
        en: (row.case_study_steps_en as string[]) || [],
        ar: (row.case_study_steps_ar as string[]) || [],
      },
      faqs,
    },
    isFeatured: Boolean(row.is_featured),
  };
}

export function mapServiceRow(row: Record<string, unknown>) {
  const includesEn = (row.includes_en as string[]) || [];
  const includesAr = (row.includes_ar as string[]) || [];
  const keyword = loc(row.keyword_en as string, row.keyword_ar as string);
  const title = loc(row.title_en as string, row.title_ar as string);
  const summary = loc(row.description_en as string, row.description_ar as string);

  return {
    slug: String(row.slug),
    icon: String(row.icon || ''),
    title,
    summary,
    bullets: { en: includesEn, ar: includesAr },
    focusKeyword: keyword,
    deliverables: includesEn.map((en, i) => ({
      en,
      ar: includesAr[i] || en,
    })),
    outcomes: [],
    process: [],
  };
}

export function mapBlogRow(row: Record<string, unknown>): BlogPost {
  const slug = String(row.slug);
  const dateISO = String(row.published_date || new Date().toISOString().slice(0, 10));
  const title = loc(row.title_en as string, row.title_ar as string);
  const description = loc(row.summary_en as string, row.summary_ar as string);
  const tags = (row.tags as string[]) || [];
  const staticPost = getPostBySlug(slug);

  return {
    slug,
    title,
    description,
    focusKeyword: loc(row.seo_title_en as string, row.seo_title_ar as string),
    blocks: staticPost?.blocks ?? [],
    tags,
    dateISO,
    coverImage: row.cover_image ? String(row.cover_image) : undefined,
    readingTimeMin: Number(row.reading_time_min) || 5,
  };
}

export function mapReviewRow(row: Record<string, unknown>): DisplayReview {
  return {
    id: String(row.id ?? ''),
    platform: String(row.platform ?? ''),
    reviewerName: row.reviewer_name ? String(row.reviewer_name) : undefined,
    rating: Number(row.rating) || 5,
    reviewText: loc(row.review_text_en as string, row.review_text_ar as string),
    reviewUrl: row.review_url ? String(row.review_url) : undefined,
    screenshotUrl: row.screenshot_url ? String(row.screenshot_url) : undefined,
  };
}

export function mapVerifiedReviewToDisplay(review: VerifiedReview): DisplayReview {
  return {
    id: review.id,
    platform: review.platform,
    reviewerName: review.reviewerName,
    rating: review.rating,
    reviewText: review.reviewText,
    reviewUrl: review.platformUrl,
    screenshotUrl: review.screenshot?.src,
  };
}

export function mapSkillRow(row: Record<string, unknown>): DisplaySkill {
  const count = row.project_count;
  return {
    id: String(row.id ?? ''),
    category: String(row.category ?? 'Other'),
    name: String(row.name ?? ''),
    projectCount: count === null || count === undefined ? undefined : Number(count),
  };
}
