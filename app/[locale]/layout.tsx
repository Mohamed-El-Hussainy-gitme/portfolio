export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

type Locale = "ar" | "en";

function normalizeLocale(locale: string): Locale {
  return locale === "en" ? "en" : "ar"; // default ar
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const loc = normalizeLocale(locale);
  const dir = loc === "ar" ? "rtl" : "ltr";

  return (
    <div lang={loc} dir={dir} data-locale={loc} suppressHydrationWarning>
      {children}
    </div>
  );
}
