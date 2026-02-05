import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage";
import { buildMetadata } from "@/core/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("en", {
    title: "Contact",
    description: "Contact me for a quote or an execution plan: company sites, e-commerce, dashboards, and technical SEO.",
    path: "/contact",
  });
}

export default function Page() {
  return <ContactPage locale="en" />;
}
