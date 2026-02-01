"use client";

import { verifiedReviews } from "@/data/verifiedReviews";
import { useLanguage } from "@/core/i18n/LanguageContext";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-yellow-400" : "text-slate-600"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { language } = useLanguage();

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">
        {language === "ar" ? "آراء عملاء موثّقة" : "Verified client reviews"}
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {verifiedReviews.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5"
            aria-label={`${r.platform} review`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-300">{r.platform}</p>

                <div
                  role="img"
                  className="mt-1 flex items-center gap-2"
                  aria-label={`Rating ${r.rating} out of 5`}
                >
                  <Stars count={r.rating} />
                  <span className="text-xs text-slate-400">{r.rating}/5</span>
                </div>
              </div>

              <a
                className="text-sm text-cyan-300 hover:underline"
                href={r.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === "ar" ? "رابط التقييم" : "View review"}
              </a>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {language === "ar" ? r.reviewText.ar : r.reviewText.en}
            </p>

            {r.screenshot && (
              <figure className="mt-4 overflow-hidden rounded-xl border border-slate-800">
                <img
                  alt={language === "ar" ? "لقطة شاشة للتقييم" : "Review screenshot"}
                  className="h-auto w-full"
                  loading="lazy"
                  decoding="async"
                  src={r.screenshot.src}
                  width={r.screenshot.width}
                  height={r.screenshot.height}
                />
              </figure>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
