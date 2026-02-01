export type VerifiedReview = {
  id: string;
  platform: "Khamsat" | "Upwork";
  platformUrl: string;
  rating: number;
  reviewText: { ar: string; en: string };
  screenshot?: { src: string; width: number; height: number };
};

export const verifiedReviews: VerifiedReview[] = [
  {
    id: "khamsat-1114962",
    platform: "Khamsat",
    platformUrl:
      "https://khamsat.com/user/mohamed_elhussainy?published-only=true",
    rating: 5,
    reviewText: {
      ar: "تنفيذ ممتاز و سرعة في التسليم. شكراً لك.",
      en: "Excellent execution and fast delivery. Thank you.",
    },
    screenshot: {
      src: "/reviews/khamsat/khamsat-01.png",
      width: 815,
      height: 444,
    },
  },
  {
    id: "khamsat-1203871",
    platform: "Khamsat",
    platformUrl:
      "https://khamsat.com/user/mohamed_elhussainy?published-only=true",
    rating: 5,
    reviewText: {
      ar: "متميز جداً. أنصح بالتعامل معه.",
      en: "Very professional. Highly recommended.",
    },
    screenshot: {
      src: "/reviews/khamsat/khamsat-02.png",
      width: 815,
      height: 444,
    },
  },
  {
    id: "upwork-01",
    platform: "Upwork",
    platformUrl: "https://www.upwork.com/freelancers/~0123456789",
    rating: 5,
    reviewText: {
      ar: "تواصل ممتاز، ونتيجة احترافية.",
      en: "Great communication and professional results.",
    },
    // screenshot removed لأن ملف الصورة غير موجود في public حاليا
  },
];
