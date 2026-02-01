export type LocaleText = { en: string; ar: string };

export type PlatformKey = "linkedin" | "upwork" | "fiverr" | "clutch" | "other";

export type VerifiedPlatformReview = {
  id: string;
  platform: PlatformKey;
  platformLabel: LocaleText;

  /** Optional privacy-safe: "A.M." or full name */
  reviewerName?: string;

  /** Optional */
  context?: LocaleText;

  /** Screenshot in /public/reviews/... */
  screenshotSrc: string;

  /** Strong alt text describing what the screenshot shows */
  screenshotAlt: LocaleText;

  /** Original source link (profile/review) */
  sourceUrl: string;

  dateISO?: string;
};

export const verifiedPlatformReviews: VerifiedPlatformReview[] = [
  {
    id: "linkedin-1",
    platform: "linkedin",
    platformLabel: { en: "LinkedIn", ar: "LinkedIn" },
    reviewerName: "—",
    context: { en: "Recommendation", ar: "توصية" },
    screenshotSrc: "/reviews/linkedin/linkedin-1.webp",
    screenshotAlt: {
      en: "Screenshot of a LinkedIn recommendation mentioning delivery quality and communication",
      ar: "لقطة شاشة لتوصية على LinkedIn تتحدث عن جودة التسليم والتواصل",
    },
    sourceUrl: "https://www.linkedin.com/in/mohamed-el-hussainy",
    dateISO: "2024-11-05",
  },
  {
    id: "upwork-1",
    platform: "upwork",
    platformLabel: { en: "Upwork", ar: "Upwork" },
    reviewerName: "—",
    context: { en: "Client feedback", ar: "تقييم عميل" },
    screenshotSrc: "/reviews/upwork/upwork-1.webp",
    screenshotAlt: {
      en: "Screenshot of an Upwork client feedback with rating and review text",
      ar: "لقطة شاشة لتقييم على Upwork يظهر التقييم ونص المراجعة",
    },
    sourceUrl: "https://www.upwork.com/freelancers/~013703cd025bad427c", 
    dateISO: "2025-01-10",
  },
];
