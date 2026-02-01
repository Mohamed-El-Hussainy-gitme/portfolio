import {
  CONTACT_EMAIL,
  CONTACT_GITHUB,
  CONTACT_LINKEDIN,
  WHATSAPP_NUMBER,
} from "@/data/contact";

const WHATSAPP_DIRECT = `https://wa.me/${WHATSAPP_NUMBER}`;

export const ICONS = {
  github: {
    label: "GitHub",
    href: CONTACT_GITHUB,
  },
  linkedin: {
    label: "LinkedIn",
    href: CONTACT_LINKEDIN,
  },
  email: {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
  },
  whatsapp: {
    label: "WhatsApp",
    href: WHATSAPP_DIRECT,
  },
} as const;
