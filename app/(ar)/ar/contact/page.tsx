import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage";
import { buildMetadata } from "@/core/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("ar", {
    title: "تواصل",
    description: "تواصل لطلب عرض سعر أو خطة تنفيذ: مواقع شركات، متاجر إلكترونية، لوحات تحكم، وSEO تقني.",
    path: "/contact",
  });
}

export default function Page() {
  return <ContactPage locale="ar" />;
}
