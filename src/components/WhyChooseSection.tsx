"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../core/i18n/LanguageContext";

export default function WhyChooseSection() {
  const { language, href, direction } = useLanguage();
  const isArabic = language === "ar";

  const title = isArabic ? "لماذا تختارني؟" : "Why choose me?";
  const items = [
    {
      t: isArabic ? "•	إدارة المشروع بمراحل" : "•	Milestone-Based Project Management",
      d: isArabic ? "أعتمد خطة عمل مقسّمة إلى مراحل (Milestones) بحيث يمكنك متابعة التقدم ومراجعة كل مرحلة لضمان تلبية جميع المتطلبات" : "I offer a milestone-based workflow, so you can review progress in stages and ensure your requirements are met at every step.",
    },
    {
      t: isArabic ? "•	دعم ما بعد التسليم" : "•	Post-Delivery Support",
      d: isArabic ? "أقدّم دعمًا وصيانة لمدة 30 يومًا بعد تسليم المشروع، لمعالجة أي مشاكل أو تعديلات بسيطة عند الحاجة." : "I provide 30 days of maintenance and support after the project is delivered, helping fix any issues or make minor adjustments if needed.",
    },
    {
      t: isArabic ? "•	كود نظيف ومُوثّق" : "•	Clean and Well-Documented Code",
      d: isArabic ? "سيكون كود المشروع مكتوبًا بشكل نظيف ومنظم مع تعليقات توضيحية لتسهيل الصيانة أو التحديثات المستقبلية." : "Your project’s source code will be clean, well-structured, and commented for easier future maintenance or updates.",
    },
      {
      t: isArabic ? "•	تسليم ملفات التصميم" : "•	Design Deliverables",
      d: isArabic ? "سَيتم تسليم ملفات التصميم الأصلية (مثل Figma) عند إكمال المشروع." : "If the project involves design work, I will share the original Figma design files or prototypes upon completion.",
    },
      {
      t: isArabic ? "•	تواصل واضح وفعّال" : "•	Clear and Effective Communication",
      d: isArabic ? "أنا مُتقن اللغة الإنجليزية والعربية، مما يضمن تواصلًا واضحًا وسلسًا. يمكننا مناقشة تفاصيل مشروعك باللغة التي تشعر بالراحة بها." : "I am fluent in English and Arabic, ensuring smooth communication and understanding. We can discuss your project details in the language you’re most comfortable with.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="font-semibold text-white">{x.t}</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{x.d}</p>
            </div>
          ))}
        </div>

        <div className={`mt-8 flex flex-wrap gap-3 ${direction === "rtl" ? "justify-end" : "justify-start"}`}>
          <Link href={href("/services")} className="rounded-full border border-white/10 bg-slate-950/50 px-5 py-2.5 text-sm text-slate-100 hover:border-violet-400">
            {isArabic ? "تصفح الخدمات" : "Browse services"}
          </Link>

          <Link href={href("/blog")} className="rounded-full border border-white/10 bg-slate-950/50 px-5 py-2.5 text-sm text-slate-100 hover:border-violet-400">
            {isArabic ? "اقرأ المدونة" : "Read the blog"}
          </Link>

          <Link href={href("/projects")} className="rounded-full border border-white/10 bg-slate-950/50 px-5 py-2.5 text-sm text-slate-100 hover:border-violet-400">
            {isArabic ? "شاهد المشاريع" : "View projects"}
          </Link>
        </div>
      </div>
    </section>
  );
}
