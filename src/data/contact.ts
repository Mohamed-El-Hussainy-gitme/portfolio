export const CONTACT_EMAIL = "mohamed.noda.b2@gmail.com";

/**
 * Optional: direct Gmail compose URL.
 * (We keep it for convenience, but the UI uses a clean "Send email" button.)
 */
export const CONTACT_EMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=mohamed.noda.b2@gmail.com";

export const CONTACT_GITHUB = "https://github.com/Mohamed-El-Hussainy-gitme";

export const CONTACT_LINKEDIN =
  "https://www.linkedin.com/in/mohamed-el-hussainy";

export const WHATSAPP_NUMBER = "201018557413";

// Backward-compatible aliases used in some views/pages
export const CONTACT_WHATSAPP_PHONE = WHATSAPP_NUMBER;
export const GITHUB_URL = CONTACT_GITHUB;
export const LINKEDIN_URL = CONTACT_LINKEDIN;

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
