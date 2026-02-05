import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { buildMetadata } from "@/core/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("en", {
    title: "About",
    description: "About me, skills, and my approach to building fast, SEO-friendly websites.",
    path: "/about",
  });
}

export default function Page() {
  return <AboutPage locale="en" />;
}
