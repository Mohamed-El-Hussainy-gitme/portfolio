import { buildLangUrl, getSiteOrigin, SITE_NAME } from "./siteMeta";
import type { Locale } from "../i18n/locale";
import type { BlogPost } from "../../data/blog";
import type { ServiceDefinition } from "../../data/services";
import type { ProjectDefinition } from "../../data/projects";

export type BreadcrumbCrumb = { name: string; path: string };

export function breadcrumbList(locale: Locale, crumbs: BreadcrumbCrumb[]) {
  const itemListElement = crumbs.map((c, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: c.name,
    item: buildLangUrl(locale, c.path),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function blogPostingSchema(locale: Locale, post: BlogPost) {
  const origin = getSiteOrigin();
  const url = buildLangUrl(locale, `/blog/${post.slug}`);
  const focus = (post.focusKeyword?.[locale] || "").trim();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.description[locale],
    inLanguage: locale,
    keywords: [...post.tags, focus].filter(Boolean).join(", "),
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: SITE_NAME, url: origin },
    publisher: { "@type": "Person", name: SITE_NAME, url: origin },
    url,
  };
}

export function blogItemListSchema(locale: Locale, posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "http://schema.org/ItemListOrderDescending",
    numberOfItems: posts.length,
    itemListElement: posts.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "WebPage",
        name: p.title[locale],
        url: buildLangUrl(locale, `/blog/${p.slug}`),
      },
    })),
  };
}

/**
 * Service schema should point to the canonical service detail URL.
 */
function resolveServicePath(service: ServiceDefinition, baseOrFullPath?: string): string {
  // Default canonical: /services/{slug}
  if (!baseOrFullPath) return `/services/${service.slug}`;

  // If caller already passed a full path that contains the slug, trust it.
  if (baseOrFullPath.includes(service.slug)) return baseOrFullPath;

  // Treat it as a base path (e.g. "/services") and append slug.
  const p = baseOrFullPath.endsWith("/") ? baseOrFullPath.slice(0, -1) : baseOrFullPath;
  return `${p}/${service.slug}`;
}

export function serviceSchema(locale: Locale, service: ServiceDefinition, baseOrFullPath?: string) {
  const origin = getSiteOrigin();
  const url = buildLangUrl(locale, resolveServicePath(service, baseOrFullPath));

  const serviceType = (service.focusKeyword?.[locale] || service.title[locale]).trim();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title[locale],
    description: service.summary[locale],
    url,
    provider: { "@type": "Person", name: SITE_NAME, url: origin },
    areaServed: "Worldwide",
    serviceType,
  };
}

export function servicesItemListSchema(locale: Locale, services: ServiceDefinition[], basePath?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "http://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: serviceSchema(locale, s, basePath),
    })),
  };
}

export function projectCaseStudySchema(locale: Locale, project: ProjectDefinition) {
  const origin = getSiteOrigin();
  const url = buildLangUrl(locale, `/projects/${project.slug}`);

  const focusKeyword = (project.focusKeyword?.[locale] || "").trim();

  return {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: project.seoTitle?.[locale] || project.name[locale],
    description: project.seoDescription?.[locale] || project.description[locale],
    inLanguage: locale,
    url,
    creator: { "@type": "Person", name: SITE_NAME, url: origin },
    author: { "@type": "Person", name: SITE_NAME, url: origin },
    keywords: [...project.tags, ...project.techStack, focusKeyword].filter(Boolean).join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function projectsItemListSchema(locale: Locale, projects: ProjectDefinition[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "http://schema.org/ItemListOrderAscending",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "WebPage",
        name: p.seoTitle?.[locale] || p.name[locale],
        url: buildLangUrl(locale, `/projects/${p.slug}`),
      },
    })),
  };
}

export function websiteSchema(locale: Locale) {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: origin,
    inLanguage: locale,
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: origin,
    },
  };
}

export function personSchema(locale: Locale) {
  const origin = getSiteOrigin();
  const name = locale === "ar" ? "محمد الحسيني" : "Mohamed El-Husseiny";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: origin,
    jobTitle: locale === "ar" ? "مطور فل ستاك" : "Full-stack developer",
    knowsAbout:
      locale === "ar"
        ? ["إنشاء مواقع", "Next.js", "React", "SEO تقني", "أداء الموقع"]
        : ["website development", "Next.js", "React", "technical SEO", "web performance"],
  };
}
