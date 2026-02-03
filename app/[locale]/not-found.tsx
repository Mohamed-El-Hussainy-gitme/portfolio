import NotFoundPage from "@/views/NotFoundPage";
import { LanguageProvider } from "@/core/i18n/LanguageContext";
import { DEFAULT_LOCALE } from "@/core/i18n/locale";
import PageLayout from "@/layout/PageLayout";

export default function NotFound() {
  return (
    <LanguageProvider initialLanguage={DEFAULT_LOCALE}>
      <PageLayout>
        <NotFoundPage />
      </PageLayout>
    </LanguageProvider>
  );
}
