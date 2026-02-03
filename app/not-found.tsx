import NotFoundPage from "@/views/NotFoundPage";
import { LanguageProvider } from "@/core/i18n/LanguageContext";
import { DEFAULT_LOCALE } from "@/core/i18n/locale";

export default function NotFound() {
  return (
    <LanguageProvider initialLanguage={DEFAULT_LOCALE}>
      <NotFoundPage />
    </LanguageProvider>
  );
}
