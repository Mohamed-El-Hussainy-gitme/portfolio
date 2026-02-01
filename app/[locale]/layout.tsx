// app/[locale]/layout.tsx

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isAr = locale === "ar";
  const lang = isAr ? "ar" : "en";
  const dir = isAr ? "rtl" : "ltr";

  return (
    <div lang={lang} dir={dir}>
      {children}
    </div>
  );
}
