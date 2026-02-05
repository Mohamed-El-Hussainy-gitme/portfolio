import type { Metadata } from "next";
import HomePage from "@/views/HomePage";
import { buildMetadata } from "@/core/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("en", {
    title: "Web Developer Portfolio",
    description: "Projects, services, and blog — technical SEO, performance, and bilingual (AR/EN) UX.",
  });
}

export default function Page() {
  return <HomePage locale="en" />;
}
