import RedirectClient from "./RedirectClient";
import { Suspense } from "react";
import { services } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
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
