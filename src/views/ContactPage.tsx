"use client";

import type { ReactNode, SVGProps } from "react";
import type { Locale } from "@/core/i18n/locale";
import { buildWhatsAppLink, CONTACT_EMAIL, CONTACT_WHATSAPP_PHONE, GITHUB_URL, LINKEDIN_URL } from "@/data/contact";
import { useLanguage } from "@/core/i18n/LanguageContext";
import { usePageContent } from "@/lib/usePageContent";
import { pageHeroField } from "@/lib/pageContent";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/ContactForm";

function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="m4 6 8 7 8-7" />
    </svg>
  );
}

function IconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.76.6-3.34-1.33-3.34-1.33-.45-1.14-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.2-.25-4.51-1.1-4.51-4.9 0-1.08.39-1.96 1.03-2.65-.1-.25-.45-1.26.1-2.62 0 0 .84-.27 2.75 1.01A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.12 2.51.34 1.91-1.28 2.75-1.01 2.75-1.01.55 1.36.2 2.37.1 2.62.64.69 1.03 1.57 1.03 2.65 0 3.81-2.31 4.65-4.52 4.9.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function IconLinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.48 1c1.38 0 2.5 1.12 2.5 2.5zM.5 8H4.5V23H.5V8zM8.5 8H12.3v2.05h.05C12.88 8.8 14.24 7.6 16.45 7.6 20.55 7.6 21.5 10.25 21.5 14.05V23H17.5v-7.85c0-1.87-.03-4.28-2.6-4.28-2.6 0-3 2.03-3 4.14V23H8.5V8z" />
    </svg>
  );
}

function IconWhatsApp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.48 0 .14 5.33.14 11.9c0 2.09.55 4.13 1.6 5.93L0 24l6.33-1.66a11.87 11.87 0 0 0 5.73 1.46h.01c6.58 0 11.92-5.33 11.92-11.9 0-3.18-1.24-6.17-3.47-8.42Zm-8.46 18.3h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.66-.23-.38a9.86 9.86 0 0 1-1.52-5.24c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 6.98 2.89 9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.45 9.88-9.87 9.88Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.5.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.25-.6-.5-.52-.66-.53h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.11c.15.2 2.1 3.2 5.08 4.48.7.3 1.24.49 1.67.62.7.22 1.33.19 1.83.11.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.56-.35Z" />
    </svg>
  );
}

type Action = {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
  sublabel?: string;
  targetBlank?: boolean;
  accent?: "default" | "cobalt" | "success";
};

export default function ContactPage({ locale }: { locale: Locale }) {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  const { data: page } = usePageContent("contact");
  const lang = language === "ar" ? "ar" : "en";
  const heroLabel = pageHeroField(page.hero, "label", lang);
  const title = pageHeroField(page.hero, "heading", lang);
  const subtitle = pageHeroField(page.hero, "sub", lang);

  const actions: Action[] = [
    {
      key: "whatsapp",
      label: language === "ar" ? "WhatsApp" : "WhatsApp",
      href: buildWhatsAppLink(
        language === "ar" ? "مرحبًا، أريد عرض سعر لموقع جديد." : "Hi, I want a quote for a new website."
      ),
      icon: <IconWhatsApp className="h-5 w-5" />,
      sublabel: `+${CONTACT_WHATSAPP_PHONE}`,
      targetBlank: true,
      accent: "success",
    },
    {
      key: "email",
      label: "Email",
      href: `mailto:${CONTACT_EMAIL}`,
      icon: <IconMail className="h-5 w-5" />,
      sublabel: CONTACT_EMAIL,
      accent: "cobalt",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: LINKEDIN_URL,
      icon: <IconLinkedIn className="h-5 w-5" />,
      targetBlank: true,
      accent: "default",
    },
    {
      key: "github",
      label: "GitHub",
      href: GITHUB_URL,
      icon: <IconGithub className="h-5 w-5" />,
      targetBlank: true,
      accent: "default",
    },
  ];

  const tip =
    language === "ar"
      ? "أرسل تفاصيل سريعة: نوع الموقع، عدد الصفحات، اللغة، المحتوى/التصميم، وموعد التسليم — للحصول على تقدير أدق."
      : "Share quick details: site type, page count, language, content/design, and deadline for a sharper quote.";

  return (
    <div className="min-h-screen bg-white">
      <PageHero label={heroLabel} heading={title} sub={subtitle} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {actions.map((a) => {
            const cardClass =
              a.accent === "success"
                ? "border-emerald-200 bg-emerald-50/50 hover:border-emerald-300"
                : a.accent === "cobalt"
                  ? "border-cobalt/20 bg-blue-50/30 hover:border-cobalt/40"
                  : "border-border bg-white hover:border-cobalt/30";

            return (
              <a
                key={a.key}
                href={a.href}
                target={a.targetBlank ? "_blank" : undefined}
                rel={a.targetBlank ? "noopener noreferrer" : undefined}
                className={`flex items-start gap-4 rounded-2xl border p-5 transition hover:shadow-md ${cardClass} ${isRTL ? "flex-row-reverse text-right" : ""}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-border text-cobalt">
                  {a.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-inter-tight font-bold text-obsidian">{a.label}</span>
                  {a.sublabel ? (
                    <span className="block text-xs text-slate-500 mt-1 truncate" dir="ltr">
                      {a.sublabel}
                    </span>
                  ) : null}
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500 max-w-xl mx-auto">{tip}</p>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-slate-200">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${isRTL ? "text-right" : "text-left"}`}>
          {language === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
        </h2>
        <ContactForm locale={language === "ar" ? "ar" : "en"} />
      </section>
    </div>
  );
}
