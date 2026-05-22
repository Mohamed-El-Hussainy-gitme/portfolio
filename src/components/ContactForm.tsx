"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";

interface ContactFormProps {
  locale: "en" | "ar";
}

const translations = {
  en: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    sending: "Sending...",
    send: "Send Message",
    success: "Message sent successfully! We'll get back to you soon.",
    error: "Failed to send message. Please try again.",
    validationName: "Please enter your name",
    validationEmail: "Please enter a valid email",
    validationPhone: "Please enter your phone number",
    validationSubject: "Please enter a subject",
    validationMessage: "Please enter your message",
  },
  ar: {
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    subject: "الموضوع",
    message: "الرسالة",
    sending: "جاري الإرسال...",
    send: "إرسال الرسالة",
    success: "تم إرسال الرسالة بنجاح! سنرد عليك قريبًا.",
    error: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    validationName: "يرجى إدخال اسمك",
    validationEmail: "يرجى إدخال بريد إلكتروني صحيح",
    validationPhone: "يرجى إدخال رقم هاتفك",
    validationSubject: "يرجى إدخال الموضوع",
    validationMessage: "يرجى إدخال رسالتك",
  },
};

export default function ContactForm({ locale }: ContactFormProps) {
  const t = translations[locale];
  const isRTL = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage(t.validationName);
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage(t.validationEmail);
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage(t.validationPhone);
      return false;
    }
    if (!formData.subject.trim()) {
      setErrorMessage(t.validationSubject);
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage(t.validationMessage);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // Create message with all fields - database schema should have phone, subject, message
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: "new",
      };

      await apiClient.entities.ContactMessage.create(payload);

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (err) {
      console.error("Failed to send message:", err);
      
      // Provide helpful error message
      if (err instanceof Error) {
        if (err.message.includes("400")) {
          setErrorMessage(
            locale === "ar"
              ? "خطأ في البيانات. تأكد من أن قاعدة البيانات تم تحديثها."
              : "Data error. Please ensure the database schema is up to date."
          );
        } else {
          setErrorMessage(err.message || t.error);
        }
      } else {
        setErrorMessage(t.error);
      }
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 max-w-2xl mx-auto p-6 rounded-lg bg-slate-50 border border-slate-200 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            {t.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
            disabled={status === "loading"}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            {t.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            {t.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
            disabled={status === "loading"}
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
            {t.subject}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
            disabled={status === "loading"}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent ${
            isRTL ? "text-right" : ""
          }`}
          disabled={status === "loading"}
        />
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
          {t.success}
        </div>
      )}

      {status === "error" && errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 rounded-lg bg-cobalt text-white font-medium hover:bg-cobalt/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? t.sending : t.send}
      </button>
    </form>
  );
}
