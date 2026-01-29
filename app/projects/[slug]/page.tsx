import RedirectClient from "./RedirectClient";
import { Suspense } from "react";
import { projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <Suspense fallback={null}>
      <RedirectClient slug={slug} />
    </Suspense>
  );
}
