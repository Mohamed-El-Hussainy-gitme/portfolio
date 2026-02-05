import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { buildMetadata } from "@/core/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("ar", {
    title: "من أنا",
    description: "نبذة عني، المهارات، وطريقة العمل لبناء مواقع سريعة ومحسنة لمحركات البحث.",
    path: "/about",
  });
}

export default function Page() {
  return <AboutPage locale="ar" />;
}
